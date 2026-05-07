<script lang="ts" generics="T">
    import { ConnectedButtons, Button } from "m3-svelte";
    const {
        options,
        selected,
        on_selection,
        format,
        size = "m",
    }: {
        options: T[],
        selected: T,
        on_selection: (option: T) => void,
        format?: (option: T) => string
        size?: "s" | "l" | "xs" | "m" | "xl",
    } = $props()
</script>

<ConnectedButtons>
    {#each options as option}
        <Button variant="filled" square label {size}>
            <input
            type="radio"
            checked = {JSON.stringify(selected) == JSON.stringify(option)}
            onclick={() => on_selection(option)}
            />
            {format ? format(option) : option}
        </Button>
    {/each}
</ConnectedButtons>