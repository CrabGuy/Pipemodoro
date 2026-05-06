<script lang="ts">
    import SelectionButtons from '$lib/components/SelectionButtons.svelte';
    import type { TimerType } from '$lib/Types';
    import { average, duration, format_time, most_frequent } from '$lib/utils';
    import Icon from '@iconify/svelte';
    import { Card } from 'm3-svelte';
    
    const {
        timers
    }: {
        timers: TimerType[]
    } = $props()

    const TIME_PERIODS = [
        {
            name: "Week",
            duration: 1000 * 60 * 60 * 24 * 7,
        },
        {
            name: "Month",
            duration: 1000 * 60 * 60 * 24 * 30,
        },
        {
            name: "All time",
            duration: Infinity,
        }
    ]

    let time_period = $state(TIME_PERIODS[TIME_PERIODS.length - 1])


    const label = (timer: TimerType) => timer.label

    const succesful_timers = $derived(timers.filter((timer: TimerType) => !timer.canceled))
    const in_range_timers = $derived(succesful_timers.filter((timer: TimerType) => new Date(timer.created_at).getTime() > Date.now() - time_period.duration))

    const completed_timers = $derived(timers.length)
    const completion_rate = $derived(Math.round(in_range_timers.length / timers.length * 100) / 100 || 0)
    const average_duration = $derived(average(in_range_timers.map(duration)))
    const most_frequent_label = $derived(most_frequent(in_range_timers.map(label).filter((l: string | null) => l != null)))
</script>


{#snippet card(text: string, icon: string)}
    <Card variant="outlined" onclick={() => {}}>
        <div style="display: flex; gap: 1rem">
            <Icon icon="material-symbols:{icon}"></Icon>
            <div style="width: 20vw;">{text}</div>
        </div>
    </Card>
{/snippet}

<div style="display: flex; justify-content: space-around; flex-direction: column; gap: 2rem">
    <div style="height: 2rem; align-self: center">
        <SelectionButtons
        options = {TIME_PERIODS}
        selected = {time_period}
        format = {(period) => period.name}
        on_selection = {(period) => time_period = period}
        />
    </div>

    <div class="stats_div">
        {@render card(`Total timers started: ${completed_timers}`, "calculate")}
        {@render card(`Completion rate: ${completion_rate}`, "avg-pace")}
        {@render card(`Average timer: ${format_time(average_duration)}`, "avg-time")}
        {@render card(`Most used label: ${most_frequent_label == null ? "none" : most_frequent_label}`, "bookmark-heart")}
    </div>
</div>


<style>
    .stats_div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-self: center;
    }
</style>