<script>
    import { Card, Button, Divider } from "m3-svelte";
    const { selected_label, on_delete } = $props()
</script>

<Card variant="elevated">
    <div style="height: 80vh;">
        <h1>{selected_label.name}</h1>
        <Divider/>
        <h1>Total time spent: {"X"}</h1>
        <h2>Timers finished: {"X"}</h2>
        <h3>Creation date: {"X"}</h3>
        <h3>Webhook connected: {"X"}</h3>
    </div>
    <Button variant="tonal" style="width: 6rem" onclick={on_delete}>Delete</Button>
</Card>
