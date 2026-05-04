<script lang="ts">
    import { Chip, Snackbar } from "m3-svelte";
    import StartButton from "$lib/components/TimerPage/StartButton.svelte";
    import PomodoroTypeSelector from "$lib/components/TimerPage/TimerTypeSelector.svelte";
    import { supabase } from "$lib/supabase_client";
    import { get_active_timers, refresh_timers } from "$lib/timers.svelte";
    import LabelSelection from "$lib/components/TimerPage/LabelSelector.svelte";
    import {LoadingIndicator} from "m3-svelte";
    import { user } from "$lib/auth.svelte";
    import { onMount, onDestroy } from "svelte";
    import Timer from "$lib/components/TimerPage/Timer.svelte";
    import StillTimer from "$lib/components/TimerPage/StillTimer.svelte";
    import ActiveTimer from "$lib/components/TimerPage/ActiveTimer.svelte";
    import CancelButton from "$lib/components/TimerPage/CancelButton.svelte";
    import { send_notification } from "$lib/notification";
    import TimerCreator from "$lib/components/TimerPage/TimerCreator.svelte";
    import { get_values } from "$lib/labels.svelte";
    import TimerStarted from "$lib/components/TimerPage/TimerStarted.svelte";

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

    const in_milliseconds = (ISO) => (new Date(ISO)).getTime()

    const labels_names = $derived(get_values().map(label => label.name))
</script>

{#if active_timer}
    <TimerStarted
        {active_timer}
    />
{:else}
    <TimerCreator
        labels={labels_names}
    />
{/if}

<Snackbar></Snackbar>
