<script>
    import { Button, Divider, Card, Icon, Dialog, TextFieldOutlined } from "m3-svelte";    
    import "iconify-icon";
    import LabelInfoCard from "$lib/components/LabelInfoCard.svelte";
    import { get_values, create_label, remove_label, is_updating } from "$lib/labels.svelte";
    
    const labels = $derived(get_values())
    const updating = $derived(is_updating())

    let selected_label = $state({})
    let creation_open = $state(false)
    let deletion_open = $state(false)

    let name_new_label = $state("")
    let webhook_new_label = $state("")
</script>

<Dialog headline="New label!" bind:open={creation_open}>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
        <p>Do you want to create a new label?</p>
        <TextFieldOutlined bind:value={name_new_label} label="Name"></TextFieldOutlined>
        <TextFieldOutlined bind:value={webhook_new_label} label="Webhook"></TextFieldOutlined>
        <a class="helper_link"
        href="https://example.com"
        >What is a webhook?</a>
    </div>
    {#snippet buttons()}
        <Button variant="outlined">Cancel</Button>
        <Button onclick={() => {
            create_label(name_new_label, webhook_new_label)
            creation_open = false
        }} >Create</Button>
    {/snippet}
</Dialog>

<Dialog headline="Bad label!" bind:open={deletion_open}>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
        <p>Are you sure you want to delete this label?</p>
    </div>
    {#snippet buttons()}
        <Button variant="outlined">Nevermind</Button>
        <Button onclick={() => {
            remove_label(selected_label.name)
            deletion_open = false
            selected_label = {}
        }}>Delete</Button>
    {/snippet}
</Dialog>

<div class="main_container">
    <div class="labels_container">
        <Button style="width: 10rem"
        onclick={() => {creation_open = true}}
        >Create new label</Button>
        {#if !updating}
            {#each labels as label}
                <Card
                variant={selected_label.name == label.name? "filled" : "outlined"}
                onclick={() => selected_label = label}
                >
                <div style="display: flex; justify-items: center;">
                    <iconify-icon style="width: 1rem" icon={label.icon}></iconify-icon>
                    <p>{label.name}</p>
                </div>
                </Card>
            {/each}
        {:else}
            {#each Array(3) as _}
                <Card
                variant="outlined"
                >
                <div style="display: flex; justify-items: center;">
                    <iconify-icon style="width: 1rem"></iconify-icon>
                    <p>Loading...</p>
                </div>
                </Card>
            {/each}
        {/if}
    </div>
    <div class="info_container">
        {#if selected_label.name}
            <LabelInfoCard {selected_label} on_delete={() => {deletion_open = true}} />
        {:else}
            <div class="idle_container">Select a label...</div>
        {/if}
    </div>
</div>

<style>
    .main_container {
        display: flex;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
    }
    
    .labels_container {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 2rem;
        gap: 1rem;
    }
    
    .info_container {
        flex: 1;
        justify-items: center;
        align-items: center;
        align-content: center;
        margin: 2rem 2rem;
    }
    
    .idle_container {
        align-self: center;
        color: var(--m3c-surface-container-high);
        text-align: center;
    }

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