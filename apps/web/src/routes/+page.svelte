<script>
    import { Button } from "m3-svelte";
    import { goto } from "$app/navigation";
    import StartButton from "./components/StartButton.svelte";
    import PomodoroTypeSelector from "./components/PomodoroTypeSelector.svelte";
    import { supabase } from "$lib/supabase_client";
    import { timer_store, canceled_timers } from "$lib/timers.svelte";
    import LabelSelection from "./components/LabelSelection.svelte";
    import {LoadingIndicator} from "m3-svelte";

    import { user } from "$lib/auth";
    import { onMount, onDestroy } from "svelte";
    import Timer from "./components/Timer.svelte";

    function is_active(timer) {
        return ((new Date(timer.ends_at)).getTime() >= Date.now())
        && !timer.expired
        && !timer.canceled
        && !canceled_timers.has(timer.client_timer_id)
    }

    let active_timers = $derived(timer_store.timers.filter(is_active))
    $inspect(active_timers)

    $effect(() => {
        timer_store.timers.forEach((timer) => {
            if (canceled_timers.has(timer.client_timer_id) && timer.id && !timer.canceled) {
                cancel_timer(timer.id)
            }
        })
    })

    let loading = $state(true)
    let channel

    async function load_timers() {
        console.log("Loading");

        const {data} = await (await fetch("/api/v1/timers")).json()
        
        console.log("Loaded");

        timer_store.timers = data ?? []
        loading = false
    }

    onMount(async () => {
        load_timers()

        channel = supabase
        .channel("Timers-changes")
        .on("postgres_changes", { event: '*', schema: 'public', table: 'Timers' }, load_timers).subscribe()
    })

    onMount(() => {
        const unsubscribe = user.subscribe(async (user) => {
            if (user !== undefined && !user?.id) {
                goto('/login');
            }
        });
        return unsubscribe;
    })

    onDestroy(() => {
        if (channel) {
            supabase.removeChannel(channel)
        }
    })

    const MINUTE = 1000 * 60
    let timer_duration = $state({
        "Pomodoro": MINUTE * 2/6,
        "Rest": MINUTE * 5,
        "Long rest": MINUTE * 15,
    })
    const timer_types = Object.keys(timer_duration);
    let timer_type = $state("Pomodoro")
    let labels = $state([])
    
</script>

<div style="position:fixed; top:1rem; right:1rem">
    <Button onclick={() => {supabase.auth.signOut(); goto("/login")}}>Logout</Button>
</div>

<div class="main_container">
    <PomodoroTypeSelector {timer_types} bind:timer_type></PomodoroTypeSelector>

    <!-- cannot use await on timer loads because it breaks the database sync -->
    {#if loading}
        <div class="timer_container">
            <LoadingIndicator></LoadingIndicator>
        </div>
    {:else if active_timers.length > 0}
        <Timer bind:timer={active_timers[0]}></Timer>
    {:else}
        <LabelSelection bind:labels></LabelSelection>
        <Timer still timer={{created_at: 0, ends_at: timer_duration[timer_type]}} ></Timer>
        <StartButton {timer_duration} {timer_type} {labels}></StartButton>
    {/if}
</div>

<style>
    .main_container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
    }
    
    .timer_container :global(svg) {
        width: 30rem;
        height: 30rem;
    }

    .timer_container {
        display: flex;
        justify-content: center;
    }
</style>