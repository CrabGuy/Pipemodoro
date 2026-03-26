<script>
    import { CircularProgress, CircularProgressEstimate, LinearProgress, LoadingIndicator } from "m3-svelte";
    import { Button, ConnectedButtons } from "m3-svelte";
    const timer_types = ["Pomodoro", "Rest", "Long rest"];
    let timer_type = $state("Pomodoro")
    let timer_active = $state(false)
    let timer_percent = $state(0.1)

    $effect(() => console.log(timer_type))

    setInterval(() => timer_percent = timer_active? (timer_percent + 0.1) % 100 : timer_percent, 1)
</script>

<div class="main_container">
    <div class="button_container">
        <ConnectedButtons>
            {#each timer_types as type}
                <Button variant="filled" square label size="l">
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
    <div class="timer_container">
        <CircularProgress
        percent = {timer_percent}
        thickness = 5
        ></CircularProgress>
    </div>
    <div>
        <Button size="l"
        onclick={() => timer_active = !timer_active}
        >
            {timer_active? "Stop" : "Start"}
        </Button>
    </div>
</div>

<style>

    .main_container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
    }

    .button_container {
        display: flex;
        justify-items: center;
        justify-content: center;
    }

    .timer_container :global(svg) {
        width: 30rem;
        height: 30rem;
    }

    .timer_container {
        display: flex;
        justify-content: center;
    }


</style>