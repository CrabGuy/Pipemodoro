<script>
    import { supabase } from "$lib/supabase_client";
    import { create_timer } from "$lib/timers.svelte";
    import timer_play from "@ktibow/iconset-material-symbols/timer-play"
    import ControlButton from "./ControlButton.svelte";
    let {timer_duration, timer_type, label} = $props()
    
    function onclick() {
        create_timer(timer_duration[timer_type], label)
    }

</script>

<ControlButton
text="Start"
icon={timer_play}
{onclick}
/>
