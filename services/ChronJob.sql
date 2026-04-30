select cron.schedule(
  'mark-expired-timers',
  '5 seconds',
  $$
    update "Timers"
    set fired = true
    where fired = false
    and webhoook is not null
    and canceled = false
    and ends_at <= now()
  $$
)