<script lang="ts">
    import { Button, Divider, Card, Icon, Dialog, TextFieldOutlined, snackbar, Snackbar } from "m3-svelte";    
    import { get_labels, create_label, remove_label, is_updating } from "$lib/labels.svelte";
    import new_label from "@ktibow/iconset-material-symbols/new-label"
    import CreationDialog from "$lib/components/LabelsPage/CreationDialog.svelte";
    import DeletionDialog from "$lib/components/LabelsPage/DeletionDialog.svelte";
    import type { LabelType } from "$lib/Types";
    import LabelsList from "$lib/components/LabelsPage/LabelsList.svelte";
    import LabelInfoCard from "$lib/components/LabelsPage/LabelInfoCard.svelte";
    import DeleteButton from "$lib/components/LabelsPage/DeleteButton.svelte";
    import { get_timers } from "$lib/timers.svelte";

    let creation_open = $state(false)
    const toggle_creation = () => {creation_open = !creation_open}
    let deletion_open = $state(false)
    const toggle_deletion = () => {deletion_open = !deletion_open}

    const labels = $derived(get_labels())
    const updating = $derived(is_updating())
    
    const timers = $derived(get_timers())

    let selected_label: LabelType | undefined = $state(undefined)
</script>

{#if creation_open}
    <CreationDialog
        on_creation={toggle_creation}
        on_cancel={toggle_creation}
    />
{/if}

{#if deletion_open}
    <DeletionDialog
        {selected_label}
        on_deletion={toggle_deletion}
        on_cancel={toggle_deletion}
    />
{/if}

<div class="main_container1">
    <div class="labels_container">
        <div>
            <Button style="width: 10rem; heigth: 3rem"
            onclick={() => {creation_open = true}}
            >
            <Icon icon={new_label}></Icon>
            New Label</Button>
        </div>
        {#if !updating}
            <LabelsList
            {labels}
            on_selection={(label) => selected_label = label}
            />
        {:else}
            <!-- TODO: Make this modular -->
            {#each Array(3)}
                <Card
                variant="outlined"
                >
                <div style="display: flex; justify-items: center;">
                    <iconify-icon style="width: 1rem"></iconify-icon>
                    <h2>Loading...</h2>
                </div>
                </Card>
            {/each}
        {/if}
    </div>
    <div class="info_container">
        {#if selected_label && selected_label.name}
            <LabelInfoCard
            label={selected_label}
            {timers}
            >
                <DeleteButton
                    label={selected_label}
                    onclick={toggle_deletion}
                />
            </LabelInfoCard>
        {:else}
            <div class="idle_container">Select a label...</div>
        {/if}
    </div>

    <Snackbar/>
</div>

<style>
    .main_container1 {
        display: flex;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
        overflow: auto;
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
</style>