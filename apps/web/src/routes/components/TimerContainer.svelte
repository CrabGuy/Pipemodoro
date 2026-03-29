<script>
    import { supabase } from "$lib/supabase_client";
    import { onDestroy, onMount } from "svelte";
    import Timer from "./Timer.svelte";
    import { LoadingIndicator } from "m3-svelte";
    import { timer_store } from "$lib/timers.svelte";

    // cannot use await because it breaks the database sync
    let loading = $state(true)
    let channel

    async function load_timers() {
        const {data} = await supabase
        .from("Timers")
        .select("*")

        timer_store.active_timers = (data ?? []).filter((timer) => (new Date(timer.ends_at)).getTime() > Date.now())
        loading = false
    }


    onMount(async () => {
        load_timers()

        channel = supabase
        .channel("Timers-changes")
        .on("postgres_changes", { event: '*', schema: 'public', table: 'Timers' }, load_timers).subscribe()
    })
    
    onDestroy(() => {
        if (channel) {
            supabase.removeChannel(channel)
        }
    })
</script>

<div class="timer_container">
    {#if loading}
        <LoadingIndicator></LoadingIndicator>
    {:else}
        {#if (timer_store.active_timers.length > 0)}
            {#each timer_store.active_timers as timer}
                <Timer started_at={timer.created_at} ends_at={timer.ends_at} ></Timer>
            {/each}
        {:else}
            <div>Show something when there are no timers active</div>
        {/if}
    {/if}
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