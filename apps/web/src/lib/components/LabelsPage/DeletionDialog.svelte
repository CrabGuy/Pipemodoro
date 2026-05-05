<script lang="ts">
    import { remove_label } from "$lib/labels.svelte";
    import type { LabelType } from "$lib/Types";
    import { Button, Dialog } from "m3-svelte";

    let {
        selected_label,
        on_deletion,
        on_cancel,
    }: {
        selected_label?: LabelType,
        on_deletion: () => void,
        on_cancel: () => void,
    } = $props()
</script>

<Dialog headline="Bad label!" open>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
        <p>Are you sure you want to delete this label?</p>
    </div>
    {#snippet buttons()}
        <Button variant="outlined" onclick={on_cancel}>Nevermind</Button>
        <Button onclick={() => {
            if (!selected_label) {
                throw new Error("Inconsistent state: selected label doesnt exist while deletion dialog is open")
                return
            }
            remove_label(selected_label.name)
            on_deletion()
        }}>Delete</Button>
    {/snippet}
</Dialog>