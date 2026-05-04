<script lang="ts">
    import { Button } from "m3-svelte";
    const {timer_type}: {timer_type: string} = $props()
</script>

<div style="align-self: center;">
    <Button
    variant="tonal"
    size="l"
    >
        {timer_type}
    </Button>
</div>