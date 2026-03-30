<script>
    import { supabase } from "$lib/supabase_client";
    import { Button } from "m3-svelte";
    import { timer_store } from "$lib/timers.svelte";
    let {timer_duration, timer_type} = $props()
    
    async function add_timer(started_at, ends_at) {
        timer_store.timers.push({
            created_at: started_at,
            ends_at: ends_at,
        })

        const {data: {user}} = await supabase.auth.getUser()
        await supabase.from("Timers").insert({
            created_at: started_at,
            ends_at: ends_at,
            uuid: user.id,
        })
    }
</script>

<div style="align-self: center;">
    <Button
    size="l"
    onclick={() => {console.log((new Date()).toISOString());
    add_timer((new Date()).toISOString(), new Date(Date.now() + timer_duration[timer_type]).toISOString())}}
    >
        Start
    </Button>
</div>
