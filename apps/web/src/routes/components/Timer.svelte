<script>
    import { supabase } from "$lib/supabase_client";
    import {CircularProgress, TextFieldMultiline, Button} from "m3-svelte"
    import { Tween } from "svelte/motion";
    import { linear } from "svelte/easing";
    import { SvelteDate } from "svelte/reactivity";
    import { timer_store, canceled_timers } from "$lib/timers.svelte";
    const {timer, still} = $props()

    const started_at = $derived((new Date(timer.created_at)).getTime())
    const ends_at = $derived((new Date(timer.ends_at)).getTime())

    const timer_percent = new Tween(0.1, { easing: linear })

    const total_duration = $derived(ends_at - started_at)

    const passed_duration = $derived(Date.now() - started_at)
    const percentage_done = $derived(Math.max((passed_duration / total_duration) * 100, 0.1))
    
    const now = new SvelteDate(Date.now())
    
    const milliseconds = $derived(still? ends_at - started_at : Math.max(0, ends_at - now.getTime()))
    
    const seconds = $derived(Math.floor((milliseconds / 1000) % 60));
    const minutes = $derived(Math.floor((milliseconds / 1000 / 60) % 60));
    const hours   = $derived(Math.floor(milliseconds / 1000 / 60 / 60));

    $effect(() => {
        if (still) {
            timer_percent.set(0, {duration: 0})
            return
        }

        timer_percent.set(percentage_done, { duration: 0 })
        timer_percent.set(100, { duration: ends_at - Date.now(), easing: linear })

        // still needs to poll because of the time left text
        const interval = setInterval(() => {
            now.setTime(Date.now())

            if (Date.now() > ends_at) {
                if (timer) {
                    timer.expired = true
                }
            }

        }, 500)

        return () => clearInterval(interval)
    })
</script>

<div class="wrapper">
    {#if timer.id}
        <Button onclick={() => {fetch(`/api/v1/timers/cancel/${timer.id}`, {method: "POST"})}}>Cancel</Button>
    {/if}
    <output>
        <time datetime="PT{hours}H{minutes}M{seconds}S">
        {hours? hours + ":" : ""}{minutes || "0"}:{seconds}
        </time>
    </output>
    <div class="timer_container">
        <CircularProgress
        percent = {timer_percent.current}
        thickness = 3
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
        font-size: 3rem;
        place-self: center;
        z-index: 1;
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