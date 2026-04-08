<script>
    import { supabase } from "$lib/supabase_client";
    import {CircularProgress, TextFieldMultiline, Button} from "m3-svelte"
    import { Tween } from "svelte/motion";
    import { linear } from "svelte/easing";
    import { SvelteDate } from "svelte/reactivity";
    import { timer_store, canceled_timers } from "$lib/timers.svelte";
    const {id} = $props()    
    
    $inspect(timer_store)
    $inspect(id)
    

    const timer = $derived(timer_store.timers.find((timer) => timer.id === id))

    const started_at = $derived((new Date(timer.created_at)).getTime())
    const ends_at = $derived((new Date(timer.ends_at)).getTime())

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

    async function cancel_timer() {
        timer.canceled = true

        if (!id) {
            console.log("Isnt synced yet");
            canceled_timers.add(timer.client_timer_id)
            return
        }

        const {data, error} = await supabase.from("Timers")
        .update({canceled: true})
        .eq("id", String(id))
        .select()

        if (error) {
            timer.canceled = false
            alert(error.message)
        }
    }
</script>

{#if timer_percent.current < 100}
    <div class="wrapper">
        <Button onclick={cancel_timer}>Cancel</Button>
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
{/if}

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