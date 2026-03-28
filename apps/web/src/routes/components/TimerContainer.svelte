<script>
    import { supabase } from "$lib/supabase_client";
    import { onDestroy, onMount } from "svelte";
    import Timer from "./Timer.svelte";
    
    let active_timers = $state([])
    let channel
    
    async function load_timers() {
        const {data} = await supabase
        .from("Timers")
        .select("*")

        active_timers = data ?? []
    }
    
    onMount(async () => {
        await load_timers()
        
        channel = supabase
        .channel("Timers-changes")
        .on("postgres_changes", { event: '*', schema: 'public', table: 'timers' }, load_timers).subscribe()
    })
    
    onDestroy(() => {
        if (channel) {
            supabase.removeChannel(channel)
        }
    })
</script>

<div class="timer_container">
    {#each active_timers as timer}
        <Timer started_at={timer.started_at} ends_at={timer.ends_at} ></Timer>
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