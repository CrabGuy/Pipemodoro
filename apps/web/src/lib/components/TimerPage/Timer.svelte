<script lang="ts">
    import {CircularProgress, TextFieldMultiline, Button} from "m3-svelte"
    import { Tween } from "svelte/motion";
    import { linear } from "svelte/easing";
    import { SvelteDate } from "svelte/reactivity";

    const {ms_total, ms_left} = $props()

    const seconds_total = $derived(Math.ceil(ms_total / 1000))
    const seconds_left = $derived(Math.ceil(ms_left / 1000))

    const minutes_left = $derived(Math.floor((seconds_left / 60) % 60))
    const hours_left = $derived(Math.floor((minutes_left / 60) % 60))

    const ms_passed = $derived(ms_total - ms_left)
    const percentage_passed = $derived(ms_passed / ms_total * 100)
</script>

<div class="wrapper">
    <output>
        <time datetime="PT{hours_left}H{minutes_left}M{String(seconds_left % 60).padStart(2, "0")}S">
        {hours_left? hours_left + ":" : ""}{minutes_left || "0"}:{String(seconds_left % 60).padStart(2, "0")}
        </time>
    </output>
    <div class="timer_container">
        <CircularProgress
        percent = {percentage_passed}
        thickness = {3}
        // ?????? i have no idea what this is for but it gives an error if i dont set it
        aria-labelledby = ""
        ></CircularProgress>
    </div>
</div>

<style>
    .wrapper {
        display: grid;
    }

    output, .timer_container {
        grid-area: 1 / 1;
    }

    output {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: 6cqi;
        place-self: center;
        z-index: 0;
    }

    .timer_container :global(svg) {
        width: 60vw;
        height: 60vh;
        aspect-ratio: 1 / 1;
    }

    .timer_container {
        display: flex;
        justify-content: center;
    }
</style>