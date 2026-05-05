<script lang="ts">
    import { create_label } from "$lib/labels.svelte";
    import { Button, Dialog, TextFieldOutlined, snackbar } from "m3-svelte";

    let {
        on_creation,
        on_cancel,
    }: {
        on_creation: () => void,
        on_cancel: () => void
    } = $props()

    let new_label_name = $state("")
    let new_label_webhook = $state("")

</script>

<Dialog headline="New label!" open>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
        <p>Do you want to create a new label?</p>
        <TextFieldOutlined bind:value={new_label_name} label="Name"></TextFieldOutlined>
        <TextFieldOutlined bind:value={new_label_webhook} label="Webhook"></TextFieldOutlined>
        <a class="helper_link"
        href="https://www.redhat.com/en/topics/automation/what-is-a-webhook"
        >What is a webhook?</a>
    </div>
    {#snippet buttons()}
        <Button variant="outlined" onclick={on_cancel}>Cancel</Button>
        <Button onclick={() => {
            if (!new_label_name) {
                snackbar("Invalid name")
                return
            }
            create_label(new_label_name, new_label_webhook)
            on_creation()
        }} >Create</Button>
    {/snippet}
</Dialog>


<style>
    .helper_link {
        color: var(--m3c-on-surface-variant);
        font-size: 0.75rem;
        text-decoration: none;
    }

    .helper_link:hover {
        text-decoration: underline;
        color: var(--m3c-on-surface);
    }
</style>