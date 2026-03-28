<script>
    import { Button } from "m3-svelte";
    let {add_timer, timer_duration, timer_type} = $props()
</script>

<div style="align-self: center;">
    <Button
    size="l"
    onclick={() => add_timer(Date.now(), Date.now() + timer_duration[timer_type])}
    >
        Start
    </Button>
</div>
