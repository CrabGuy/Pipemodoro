<script>
    import { Chip, Button, Icon } from "m3-svelte";
    import add from "@ktibow/iconset-material-symbols/add-2"
    import { goto } from "$app/navigation";
    
    let {label} = $props()

    const AVAILABLE_LABELS = ["Work", "Homework", "Passion project"]
</script>

<!-- TODO: make this query the labels database -->

<div>
    {#each AVAILABLE_LABELS as name}
        <Chip
        variant="general"
        onclick={() => {label = name}}
        selected={label==name}
        >
            {name}
        </Chip>
    {/each}
    <Chip variant="general"
    onclick={() => goto("/labels")}
    >
        <Icon icon={add}></Icon>
    </Chip>
</div>

<style>
    div {
        align-self: center;
        display: flex;
        width: 30vw;
        justify-content: space-evenly;
        align-items:center;
    }
</style>