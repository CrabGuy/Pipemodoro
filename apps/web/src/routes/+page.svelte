<script>
    import { Chip, Snackbar } from "m3-svelte";
    import StartButton from "$lib/components/StartButton.svelte";
    import PomodoroTypeSelector from "$lib/components/PomodoroTypeSelector.svelte";
    import { supabase } from "$lib/supabase_client";
    import { get_active_timers, refresh_timers } from "$lib/timers.svelte";
    import LabelSelection from "$lib/components/LabelSelection.svelte";
    import {LoadingIndicator} from "m3-svelte";
    import { user } from "$lib/auth.svelte";
    import { onMount, onDestroy } from "svelte";
    import Timer from "$lib/components/Timer.svelte";
    import StillTimer from "$lib/components/StillTimer.svelte";
    import ActiveTimer from "$lib/components/ActiveTimer.svelte";
    import CancelButton from "$lib/components/CancelButton.svelte";
    import { send_notification } from "$lib/notification";

    let active_timers = $derived(get_active_timers())

    const MINUTE = 60 * 1000
    let timer_duration = $state({
        "Pomodoro": MINUTE * 2/6,
        "Rest": MINUTE * 5,
        "Long rest": MINUTE * 15,
    })
    
    const timer_types = Object.keys(timer_duration);
    let timer_type = $state("Pomodoro")
    let selected_label = $state({label: null})
    
    const active_timer = $derived(active_timers[0])

    $inspect(active_timers)
    $inspect(active_timer)

    const in_milliseconds = (ISO) => (new Date(ISO)).getTime()
</script>

<div class="main_container">
    <PomodoroTypeSelector {timer_types} bind:timer_type></PomodoroTypeSelector>

    {#if active_timer}
        <ActiveTimer
        on_expire={() => {
            active_timers = refresh_timers()
            send_notification("Timer finished!", {
                body: "Your timer has finished"
            })
        }}
        created_at = {in_milliseconds(active_timer.created_at)}
        ends_at = {in_milliseconds(active_timer.ends_at)}
        />
        <div style="align-self: center;">
            {#if selected_label.label}
                <Chip selected variant="general" >
                    <span style="max-width: 20rem; white-space: nowrap; overflow: hidden; display: block; text-overflow: ellipsis;">
                        {selected_label.label?.name}
                    </span>
                </Chip>
            {/if}
        </div>
        <CancelButton client_timer_id={active_timer.client_timer_id}/>
    {:else}
        <StillTimer ms={timer_duration[timer_type]} />
        <LabelSelection bind:selected_label></LabelSelection>
        <StartButton {timer_duration} {timer_type} label={selected_label.label?.name}></StartButton>
    {/if}

    <Snackbar></Snackbar>
</div>

<style>
    .main_container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>