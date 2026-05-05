<script lang="ts">
    import type { LabelType, TimerType } from "$lib/Types";
    import { duration, format_time } from "$lib/utils";
    import { Card, Divider } from "m3-svelte";
    import type { Snippet } from "svelte";

    let {
        label,
        timers,
        children,
    }: {
        label: LabelType,
        timers: TimerType[],
        children: Snippet<[]>
    } = $props()

    const label_timers = $derived(timers.filter(timer => timer.label == label.name))
    const finished_timers = $derived(label_timers.filter(timer => !timer.canceled))
    const time_spent = $derived(finished_timers.map(duration).reduce((total, current) => total + current, 0))

</script>

<div style="position: fixed; top: 2rem">
    <Card variant="elevated">
        <div style="height: 35rem; width: 100%; display: flex; flex-direction: column; gap: 1rem">
            <h1 class="label_title">{label.name}</h1>
            <Divider/>
            <Card variant="outlined">
                <div>Total time spent</div>
                <h1>{format_time(time_spent)}</h1>
            </Card>
            <Card variant="outlined">
                <div>Timers finished</div>
                <h1>{finished_timers.length}</h1>
            </Card>
            {#if label.webhook}
                <Card variant="outlined">
                    <div>Webhook connected</div>
                    <h3><a href="{label.webhook}" >{label.webhook ? label.webhook.split("/")[2] : ""}</a></h3>
                </Card>
            {/if}
        </div>
        {@render children()}
    </Card>
</div>


<style>
    .label_title {
        display: block;
        font-size: 4rem;
        width: 30rem;
        text-align: center;
        white-space: nowrap;
        overflow: clip;
        text-overflow: ellipsis;
    }
</style>