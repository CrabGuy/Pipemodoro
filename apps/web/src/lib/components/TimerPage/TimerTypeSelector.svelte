<script lang="ts">
    import SelectionButtons from "$lib/components/SelectionButtons.svelte";

    type TimerType = {name: string, duration: number}

    const {
        timer_types,
        selected_timer_type,
        on_selection,
    }: {
        timer_types: TimerType[],
        selected_timer_type : TimerType,
        on_selection: (timer_type: TimerType) => void
    } = $props()
</script>

<!-- Z-index 1 otherwise it gets clipped on big displays by the timer svg -->
<div style="align-self: center; z-index: 1;">
    <SelectionButtons
        options = {timer_types}
        selected = {selected_timer_type}
        format = {(timer_type: TimerType) => timer_type.name}
        {on_selection}
    />
</div>