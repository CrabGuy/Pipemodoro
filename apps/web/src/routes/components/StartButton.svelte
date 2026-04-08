<script>
    import { supabase } from "$lib/supabase_client";
    import { Button } from "m3-svelte";
    import { timer_store, canceled_timers } from "$lib/timers.svelte";
    let {timer_duration, timer_type} = $props()
    
    async function add_timer(started_at, ends_at) {
        const client_timer_id = crypto.randomUUID()
        timer_store.timers.push({
            client_timer_id: client_timer_id,
            created_at: started_at,
            ends_at: ends_at,
        })

        const {data: {user}} = await supabase.auth.getUser()
        await supabase.from("Timers").insert({
            created_at: started_at,
            ends_at: ends_at,
            uuid: user.id,
            client_timer_id: client_timer_id,
            canceled: false,
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
