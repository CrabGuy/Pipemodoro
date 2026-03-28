<script>
    import { Button } from "m3-svelte";
    import { goto } from "$app/navigation";
    import StartButton from "./components/StartButton.svelte";
    import PomodoroTypeSelector from "./components/PomodoroTypeSelector.svelte";
    import TimerContainer from "./components/TimerContainer.svelte";

    import { user } from "$lib/auth";
    import { onMount } from "svelte";

    onMount(() => {
        const unsubscribe = user.subscribe((u) => {
            if (!u) {
                goto("/login")
            }
        })
        return unsubscribe    
    })

    const MINUTE = 1000 * 60
    let timer_duration = $state({
        "Pomodoro": MINUTE * 1,
        "Rest": MINUTE * 5,
        "Long rest": MINUTE * 15,
    })
    const timer_types = Object.keys(timer_duration);
    let timer_type = $state("Pomodoro")

</script>

<div style="position:fixed; top:1rem; right:1rem">
    <Button onclick={() => goto("/login")}>Login</Button>
</div>

<div class="main_container">
    <PomodoroTypeSelector {timer_types} bind:timer_type></PomodoroTypeSelector>

    <TimerContainer></TimerContainer>

    <StartButton {timer_duration} {timer_type}></StartButton>
</div>

<style>
    .main_container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
    }


</style>