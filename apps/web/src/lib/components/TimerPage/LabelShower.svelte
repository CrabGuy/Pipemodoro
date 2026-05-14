<script lang="ts">
    import { nothing } from "$lib/utils";
    import { Chip } from "m3-svelte";

    const {
        label
    }: {
        label: string
    } = $props()
</script>

<div class="container">
    <Chip variant="general" selected onclick={nothing}>
        <span style="max-width: 5rem; white-space: nowrap; overflow: hidden; display: block; text-overflow: ellipsis;">
            {label}
        </span>
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