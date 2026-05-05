<script lang="ts">
    import type { LabelType } from "$lib/Types";
    import { Card } from "m3-svelte";

    let {
        labels,
        selected_label,
        on_selection
    }: {
        labels: LabelType[],
        selected_label?: LabelType,
        on_selection: (label: LabelType) => void
    } = $props()

</script>

{#each labels as label}
    <Card
        variant={selected_label?.name == label.name? "filled" : "outlined"}
        onclick={() => on_selection(label)}
    >
    <div style="display: flex; justify-items: center; width: 30rem;">
        <h2 style="display: block;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{(label.name)}</h2>
    </div>
    </Card>
{/each}