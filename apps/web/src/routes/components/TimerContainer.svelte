<script>
    import { supabase } from "$lib/supabase_client";
    import { onDestroy, onMount } from "svelte";
    import Timer from "./Timer.svelte";
    import { LoadingIndicator } from "m3-svelte";
    import { timer_store } from "$lib/timers.svelte";

    let active_timers = $derived(timer_store.timers.filter((timer) => !timer.expired && !timer.canceled))
    let loading = $state(true)
    let channel

    async function load_timers() {
        const {data} = await supabase
        .from("Timers")
        .select("*")

        timer_store.timers = (data ?? []).filter((timer) => (new Date(timer.ends_at)).getTime() > Date.now())
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
    <!-- cannot use await on timer loads because it breaks the database sync -->
    {#if loading}
        <LoadingIndicator></LoadingIndicator>
    {:else}
        {#if (active_timers.length > 0)}
            {#each active_timers as timer}
                <Timer id={timer.id} ></Timer>
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