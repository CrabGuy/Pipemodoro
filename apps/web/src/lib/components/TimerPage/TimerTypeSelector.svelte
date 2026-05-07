<script lang="ts">
    import SelectionButtons from "$lib/components/SelectionButtons.svelte";

    type TimerType = {name: string, duration: number}

    let {
        timer_types,
        selected_timer_type = $bindable(),
        on_selection,
    }: {
        timer_types: TimerType[],
        selected_timer_type : TimerType,
        on_selection: (timer_type: TimerType) => void
    } = $props()
</script>

<div style="align-self: center;">
    <SelectionButtons
    options={timer_types}
    selected = {selected_timer_type}
    {on_selection}
    format={(timer_type: TimerType) => timer_type.name}
    />
</div>