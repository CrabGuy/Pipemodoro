<script>
    import { Button, Divider, Card, Icon, Dialog, TextFieldOutlined } from "m3-svelte";    
    import "iconify-icon";

    const LABELS = [
        {name: "Work", icon: "ic:home"},
        {name: "Study", icon: "ic:home"},
        {name: "Personal project", icon: "ic:home"},
    ]

    let selected_label = $state("")
    let creation_open = $state(false)
    let deletion_open = $state(false)
</script>

<Dialog headline="New label!" bind:open={creation_open}>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
        <p>Do you want to create a new label?</p>
        <TextFieldOutlined label="Name"></TextFieldOutlined>
        <TextFieldOutlined label="Webhook"></TextFieldOutlined>
        <a class="helper_link"
        href="https://example.com"
        >What is a webhook?</a>
    </div>
    {#snippet buttons()}
        <Button variant="outlined">Cancel</Button>
        <Button>Create</Button>
    {/snippet}
</Dialog>

<Dialog headline="Bad label!" bind:open={deletion_open}>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 30rem">
        <p>Are you sure you want to delete this label?</p>
    </div>
    {#snippet buttons()}
        <Button variant="outlined">Nevermind</Button>
        <Button>Delete</Button>
    {/snippet}
</Dialog>

<div class="main_container">
    <div class="labels_container">
        <Button style="width: 10rem"
        onclick={() => {creation_open = true}}
        >Create new label</Button>
        {#each LABELS as label}
            <Card 
            variant={selected_label == label.name? "filled" : "outlined"}
            onclick={() => selected_label = label.name}
            >
            <div style="display: flex; justify-items: center;">
                <iconify-icon style="width: 1rem" icon={label.icon}></iconify-icon>
                <p>{label.name}</p>
            </div>
            </Card>
        {/each}
    </div>
    <div class="info_container">
        {#if selected_label}
            <Card variant="elevated">
                <div style="height: 80vh;">
                    <h1>{selected_label}</h1>
                    <Divider/>
                    <h1>Total time spent: {"X"}</h1>
                    <h2>Timers finished: {"X"}</h2>
                    <h3>Creation date: {"X"}</h3>
                    <h3>Webhook connected: {"X"}</h3>
                </div>
                <Button variant="tonal" style="width: 6rem" onclick={() => {deletion_open = true}}>Delete</Button>
            </Card>
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