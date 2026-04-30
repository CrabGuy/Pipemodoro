create or replace function notify_timer_webhook()
returns trigger as $$
declare
  v_webhook text;
begin
  if NEW.fired = true and OLD.fired = false then

    select webhook into v_webhook
    from "Labels"
    where name = NEW.label;

    if v_webhook is not null then
      perform net.http_post(
        url     := v_webhook,
        body    := jsonb_build_object(
                     'timer_id',   NEW.id,
                     'created_at', NEW.created_at,
                     'ends_at',    NEW.ends_at,
                     'label',      NEW.label
                   ),
        headers := '{"Content-Type": "application/json"}'::jsonb,
        timeout_milliseconds := 5000
      );
    end if;

  end if;
  return NEW;
end;
$$ language plpgsql;

drop trigger if exists on_timer_expired on "Timers";
create trigger on_timer_expired
after update on "Timers"
for each row
execute function notify_timer_webhook();