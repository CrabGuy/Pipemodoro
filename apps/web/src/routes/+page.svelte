<script>
    import { Button, ConnectedButtons } from "m3-svelte";
    import Timer from "../Timer.svelte"
    const timer_types = ["Pomodoro", "Rest", "Long rest"];
    
    const MINUTE = 1000 * 60
    let timer_duration = $state({
        "Pomodoro": MINUTE * 1,
        "Rest": MINUTE * 5,
        "Long rest": MINUTE * 15,
    })

    let timer_type = $state("Pomodoro")
    let active_timers = $state([{
        started_at: Date.now(),
        ends_at: Date.now() + 10000,
    }])
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
        {#each active_timers as timer}
            <Timer started_at={timer.started_at} ends_at={timer.ends_at} ></Timer>
        {/each}
    </div>
    <div>
        <Button size="l"
        onclick={() => active_timers.push({
            started_at: Date.now(),
            ends_at: Date.now() + timer_duration[timer_type]
        })}
        >
            Start
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