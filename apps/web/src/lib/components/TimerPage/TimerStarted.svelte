<script lang="ts">
    import type { TimerType } from "$lib/Types";
    import TimerTypeShower from "$lib/components/TimerPage/TimerTypeShower.svelte";
    import ActiveTimer from "$lib/components/TimerPage/ActiveTimer.svelte";
    import { refresh_timers } from "$lib/timers.svelte";
    import CancelButton from "$lib/components/TimerPage/CancelButton.svelte";
    import { send_notification } from "$lib/notification";

    const {
        active_timer
    }: {
        active_timer: TimerType
    } = $props()
    
    const milliseconds = (ISO: string) => (new Date(ISO)).getTime()
</script>

<div class="main_container">
    <TimerTypeShower
        timer_type={active_timer.timer_type}
    />
    
    <ActiveTimer
        created_at={milliseconds(active_timer.created_at)}
        ends_at={milliseconds(active_timer.ends_at)}
        on_expire={() => {send_notification("Timer finished!"); refresh_timers()}}
    />

    <CancelButton
        client_timer_id={active_timer.client_timer_id}
    />

</div>