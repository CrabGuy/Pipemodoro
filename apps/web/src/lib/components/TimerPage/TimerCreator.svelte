<script lang="ts">
    import TimerTypeSelector from "$lib/components/TimerPage/TimerTypeSelector.svelte";
    import StillTimer from "$lib/components/TimerPage/StillTimer.svelte";
    import LabelSelector from "$lib/components/TimerPage/LabelSelector.svelte";
    import StartButton from "$lib/components/TimerPage/StartButton.svelte";

    const {
        labels
    }: {
        labels: string[]
    } = $props()

    const MINUTE = 60 * 1000
    const TIMER_TYPES = [
        {
            name: "Pomodoro",
            duration: 1/3 * MINUTE
        },
        {
            name: "Rest",
            duration: 5 * MINUTE
        },
        {
            name: "Long rest",
            duration: 15 * MINUTE
        }
    ]

    let selected_timer_type = $state(TIMER_TYPES[0])
    let selected_label = $state("")
</script>

<div class="main_container">
    <TimerTypeSelector
        timer_types={TIMER_TYPES}
        bind:selected_timer_type
    />

    <StillTimer
        ms={selected_timer_type.duration}
    />

    <LabelSelector
        {labels}
        bind:selected_label
    />

    <StartButton
        timer_duration={selected_timer_type.duration}
        timer_type={selected_timer_type.name}
        label={selected_label}
    />
</div>
