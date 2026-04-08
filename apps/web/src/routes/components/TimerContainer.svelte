<script>
    import { supabase } from "$lib/supabase_client";
    import { onDestroy, onMount } from "svelte";
    import Timer from "./Timer.svelte";
    import { LoadingIndicator } from "m3-svelte";
    import { timer_store, canceled_timers } from "$lib/timers.svelte";
    
    let {active_timers} = $props()

    //! TODO: refactor this code and every other update to the database to call the website API
    async function cancel_timer(id) {
        const {data, error} = await supabase.from("Timers")
        .update({canceled: true})
        .eq("id", String(id))
        .select()
    }

    $effect(() => {
        timer_store.timers.forEach((timer) => {
            if (canceled_timers.has(timer.client_timer_id) && timer.id && !timer.canceled) {
                cancel_timer(timer.id)
            }
        })
    })

</script>

<div class="timer_container">
    {#each active_timers as timer}
        <Timer id={timer.id} ></Timer>
    {/each}
</div>


<style>
    .timer_container :global(svg) {
        width: 30rem;
        height: 30rem;
    }

    .timer_container {
        display: flex;
        justify-content: center;
    }
</style>