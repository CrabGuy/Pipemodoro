<script>
    import { Chip, Button, Icon, LoadingIndicator } from "m3-svelte";
    import add from "@ktibow/iconset-material-symbols/add-2"
    import { goto } from "$app/navigation";
    import { get_values, is_updating } from "$lib/labels.svelte";

    let {selected_label} = $props()

    const labels = $derived(get_values())
    const updating = $derived(is_updating())
    
    $inspect(updating)
</script>

<div>
    {#if !updating}
        {#each labels as label}
            <Chip
            variant="general"
            onclick={() => {selected_label.label?.name == label.name ? (selected_label.label = null) : (selected_label.label = label)}}
            selected={selected_label.label?.name == label.name}
            >
                {label.name}
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
    div {
        align-self: center;
        display: flex;
        width: 30vw;
        gap: 1rem;
        justify-content: center;
        align-items:center;
    }
</style>