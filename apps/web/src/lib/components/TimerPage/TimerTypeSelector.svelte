<script lang="ts">
    import SelectionButtons from "$lib/components/SelectionButtons.svelte";

    type TimerType = {name: string, duration: number}

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
    bind:selected = {selected_timer_type}
    format={(timer_type: TimerType) => timer_type.name}
    />
</div>