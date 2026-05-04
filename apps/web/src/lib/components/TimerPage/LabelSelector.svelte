<script lang="ts">
    import { Chip, Icon } from "m3-svelte";
    import add from "@ktibow/iconset-material-symbols/add-2"
    import { goto } from "$app/navigation";

    let {
        labels,
        selected_label = $bindable()
    }: {
        labels: string[],
        selected_label: string,
    } = $props()
</script>

<div class="container">
    {#each labels as label}
        <Chip
        variant="general"
        onclick={() => {selected_label == label ? (selected_label = "") : (selected_label = label)}}
        selected={selected_label == label}
        >
            <span style="max-width: 5rem; white-space: nowrap; overflow: hidden; display: block; text-overflow: ellipsis;">
                {label}
            </span>
        </Chip>
    {/each}
    <Chip variant="general"
    onclick={() => goto("/labels")}
    >
        <Icon icon={add}></Icon>
    </Chip>
</div>

<style>
    .container {
        align-self: center;
        display: flex;
        width: 40rem;
        gap: 1rem;
        justify-content: safe center;
        align-items:center;
        overflow: scroll scroll;
    }
</style>