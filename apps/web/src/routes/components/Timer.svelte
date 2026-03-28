<script>
    import {CircularProgress, TextFieldMultiline} from "m3-svelte"
    import { Tween } from "svelte/motion";
    import { linear } from "svelte/easing";
    import { SvelteDate } from "svelte/reactivity";

    const {
        started_at: started_at_string,
        ends_at: ends_at_string,
    } = $props()
    const started_at = $derived((new Date(started_at_string)).getTime())
    const ends_at = $derived((new Date(ends_at_string)).getTime())
    
    const timer_percent = new Tween(0.1, { easing: linear })
    
    const total_duration = $derived(ends_at - started_at)
    const passed_duration = $derived(Date.now() - started_at)
    const percentage_done = $derived(Math.max((passed_duration / total_duration) * 100, 0.1))
    
    const now = new SvelteDate(Date.now())
    
    const milliseconds = $derived(Math.max(0, ends_at - now.getTime()))
    
    const seconds = $derived(Math.floor((milliseconds / 1000) % 60));
    const minutes = $derived(Math.floor((milliseconds / 1000 / 60) % 60));
    const hours   = $derived(Math.floor(milliseconds / 1000 / 60 / 60));

    $effect(() => {
        timer_percent.set(percentage_done, { duration: 0 })
        timer_percent.set(100, { duration: ends_at - Date.now(), easing: linear })

        const interval = setInterval(() => {
            now.setTime(Date.now())
        }, 500)
        
        return () => clearInterval(interval)
    })
</script>

<div class="wrapper">
    <output>
        <time datetime="PT{hours}H{minutes}M{seconds}S">
        {hours? hours + ":" : ""}{minutes || "0"}:{seconds}
        </time>
    </output>
    <div class="timer">
        <CircularProgress
        percent = {timer_percent.current}
        thickness = 5
        ></CircularProgress>
    </div>
</div>

<style>
    .wrapper {
        display: grid;
    }
    
    output, .timer {
        grid-area: 1 / 1;
    }

    output {
        display: block;
        font-family: 'Inter', sans-serif;
        font-size: 3rem;
        place-self: center;
        z-index: 1;
    }
</style>