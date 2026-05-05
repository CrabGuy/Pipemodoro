<script lang="ts">
    import { get_active_timers } from "$lib/timers.svelte";
    import { get_labels } from "$lib/labels.svelte";
    import TimerCreator from "$lib/components/TimerPage/TimerCreator.svelte";
    import TimerStarted from "$lib/components/TimerPage/TimerStarted.svelte";
    import type { LabelType } from "$lib/Types";

    let active_timers = $derived(get_active_timers())

    const active_timer = $derived(active_timers[0])

    const labels_names = $derived(get_labels().map((label: LabelType) => label.name))
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
