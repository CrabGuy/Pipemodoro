<script>
    import { supabase } from "$lib/supabase_client";
    import { Button } from "m3-svelte";
    import { create_timer } from "$lib/timers.svelte";
    let {timer_duration, timer_type} = $props()
</script>

<div style="align-self: center;">
    <Button
    size="l"
    onclick={() => {create_timer(timer_duration[timer_type])}}
    >
        Start
    </Button>
</div>
