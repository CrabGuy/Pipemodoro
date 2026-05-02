<script>
    import { Chip, Button, Icon, LoadingIndicator } from "m3-svelte";
    import add from "@ktibow/iconset-material-symbols/add-2"
    import { goto } from "$app/navigation";
    import { get_values, is_updating } from "$lib/labels.svelte";

    let {selected_label} = $props()

    const labels = $derived(get_values())
    const updating = $derived(is_updating())

</script>

<div class="container">
    {#if !updating}
        {#each labels as label}
            <Chip
            variant="general"
            onclick={() => {selected_label.label?.name == label.name ? (selected_label.label = null) : (selected_label.label = label)}}
            selected={selected_label.label?.name == label.name}
            >
                <span style="max-width: 5rem; white-space: nowrap; overflow: hidden; display: block; text-overflow: ellipsis;">
                    {(label.name)}
                </span>
            </Chip>
        {/each}
        <Chip variant="general"
        onclick={() => goto("/labels")}
        >
            <Icon icon={add}></Icon>
        </Chip>
    {:else}
        <Chip variant="general">...</Chip>
        <Chip variant="general">...</Chip>
        <Chip variant="general">...</Chip>
    {/if}
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