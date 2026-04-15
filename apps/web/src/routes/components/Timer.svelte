<script>
    import { supabase } from "$lib/supabase_client";
    import {CircularProgress, TextFieldMultiline, Button} from "m3-svelte"
    import { Tween } from "svelte/motion";
    import { linear } from "svelte/easing";
    import { SvelteDate } from "svelte/reactivity";
    import { cancel_timer } from "$lib/timers.svelte";

    const {timer, still} = $props()

    const created_at = $derived((new Date(timer.created_at)).getTime())
    const ends_at = $derived((new Date(timer.ends_at)).getTime())

    const timer_percent = new Tween(0.1, { easing: linear })

    const total_duration = $derived(ends_at - created_at)

    const passed_duration = $derived(Date.now() - created_at)
    const percentage_done = $derived(Math.max((passed_duration / total_duration) * 100, 0.1))
    
    const now = new SvelteDate(Date.now())

    const seconds = $derived(still? ends_at - created_at : Math.floor(Math.max(0, ends_at - now.getTime()) / 1000))

    const minutes = $derived(Math.floor((seconds / 60) % 60));
    const hours = $derived(Math.floor(seconds / 60 / 60));

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
    {#if !still}
        <Button onclick={() => {cancel_timer(timer.client_timer_id)}}>Cancel</Button>
    {/if}
    <output>
        <time datetime="PT{hours}H{minutes}M{seconds % 60}S">
        {hours? hours + ":" : ""}{minutes || "0"}:{seconds % 60}
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