<script>
    import { create_timer } from "$lib/timers.svelte";
    import timer_play from "@ktibow/iconset-material-symbols/timer-play"
    import ControlButton from "$lib/components/ControlButton.svelte";
    let {timer_duration, timer_type, label} = $props()
    
    function onclick() {
        create_timer(timer_duration[timer_type], label)
        Notification.requestPermission()
    }

</script>

<ControlButton
text="Start"
icon={timer_play}
{onclick}
/>
