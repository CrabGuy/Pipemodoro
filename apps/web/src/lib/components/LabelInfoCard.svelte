<script>
    import { get_timers } from "$lib/timers.svelte";
    import { Card, Button, Divider, Icon } from "m3-svelte";
    const { selected_label, on_delete } = $props()
    import {duration, format_time} from "$lib/utils"
    import label_off from "@ktibow/iconset-material-symbols/label-off"

    const timers = $derived(get_timers())
    const label_timers = $derived(timers.filter(timer => timer.label == selected_label.name))
    const finished_timers = $derived(label_timers.filter(timer => !timer.canceled))

    const total_time_spent = $derived(finished_timers.map(duration).reduce((total, current) => total + current, 0))
</script>

<Card variant="elevated">
    <div style="height: 80vh; display: flex; flex-direction: column; gap: 1rem">
        <h1 style="align-self: center; font-size: 4rem;">{selected_label.name}</h1>
        <Divider/>
        <Card variant="outlined">
            <div>Total time spent</div>
            <h1>{format_time(total_time_spent)}</h1>
        </Card>
        <Card variant="outlined">
            <div>Timers finished</div>
            <h1>{finished_timers.length}</h1>
        </Card>
        {#if selected_label.webhook}
            <Divider/>
            <Card variant="outlined">
                <h3>Webhook connected: <a href="{selected_label.webhook}" >{selected_label.webhook ? selected_label.webhook.split("/")[2] : ""}</a></h3>
            </Card>
        {/if}
    </div>
    <Button variant="tonal" style="width: 6rem; align-self: flex-end;" onclick={on_delete}>
        <Icon icon={label_off}></Icon>
        Delete
    </Button>
</Card>
