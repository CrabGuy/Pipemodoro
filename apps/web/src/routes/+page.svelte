<script>
    import { Button } from "m3-svelte";
    import { goto } from "$app/navigation";
    import StartButton from "./components/StartButton.svelte";
    import PomodoroTypeSelector from "./components/PomodoroTypeSelector.svelte";
    import { supabase } from "$lib/supabase_client";
    import { get_active_timers } from "$lib/timers.svelte";
    import LabelSelection from "./components/LabelSelection.svelte";
    import {LoadingIndicator} from "m3-svelte";

    import { user } from "$lib/auth";
    import { onMount, onDestroy } from "svelte";
    import Timer from "./components/Timer.svelte";

    const active_timers = $derived(get_active_timers())

    const MINUTE = 60
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
    {#if active_timers.length > 0}
        <Timer timer={active_timers[0]}></Timer>
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
</style>