<script>
    import { ConnectedButtons, Button } from "m3-svelte";
    let {timer_types, timer_type = $bindable("Pomodoro")} = $props()
</script>

<div style="align-self: center;">
    <ConnectedButtons>
        {#each timer_types as type}
            <Button variant="filled" square label size="m">
                <input
                type="radio"
                checked = {timer_type == type}
                onclick={() => timer_type = type}
                />
                {type}
            </Button>
        {/each}
    </ConnectedButtons>
</div>