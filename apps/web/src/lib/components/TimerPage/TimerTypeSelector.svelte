<script lang="ts">
    import SelectionButtons from "$lib/components/SelectionButtons.svelte";

    type TimerType = {name: string, duration: number}

    // TODO: Fix this and make it return the value with a function and not a bidable
    let {
        timer_types,
        selected_timer_type = $bindable(),
    }: {
        timer_types: TimerType[],
        selected_timer_type : TimerType
    } = $props()
</script>

<div style="align-self: center;">
    <SelectionButtons
    options={timer_types}
    selected = {selected_timer_type}
    on_selection = {(option) => selected_timer_type = option}
    format={(timer_type: TimerType) => timer_type.name}
    />
</div>