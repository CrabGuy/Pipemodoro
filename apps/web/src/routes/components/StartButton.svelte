<script>
    import { supabase } from "$lib/supabase_client";
    import { Button } from "m3-svelte";
    let {timer_duration, timer_type} = $props()
    
    async function add_timer(started_at, ends_at) {
        await supabase.from("Timers").insert({
            created_at: started_at,
            ends_at: ends_at
        })
    }
    
    throw new Error("This doesnt work, it doesnt fire the request properly most likely")
</script>

<div style="align-self: center;">
    <Button
    size="l"
    onclick={() => add_timer(((new Date()).toISOString()), new Date(Date.now() + timer_duration[timer_type]).toISOString())}
    >
        Start
    </Button>
</div>
