<script>
    import Timer from "./Timer.svelte";
    let {active_timers} = $props()
</script>

<div class="timer_container">
    {#each active_timers as timer}
        <Timer started_at={timer.started_at} ends_at={timer.ends_at} ></Timer>
    {/each}
</div>

<style>
    .timer_container :global(svg) {
        width: 30rem;
        height: 30rem;
    }

    .timer_container {
        display: flex;
        justify-content: center;
    }
</style>