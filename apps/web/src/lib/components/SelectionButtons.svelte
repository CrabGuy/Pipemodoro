<script lang="ts">
    import { ConnectedButtons, Button } from "m3-svelte";
    let {options, selected = $bindable(), format} = $props()
</script>

<ConnectedButtons>
    {#each options as option}
        <Button variant="filled" square label size="m">
            <input
            type="radio"
            checked = {JSON.stringify(selected) == JSON.stringify(option)}
            onclick={() => selected = option}
            />
            {format ? format(option) : option}
        </Button>
    {/each}
</ConnectedButtons>