<script>
    import { redirect } from "@sveltejs/kit";
    import { Button, Card, Chip, ConnectedButtons } from "m3-svelte";
    import {goto} from "$app/navigation"
    import Icon from "@iconify/svelte";
    import account_circle from "@ktibow/iconset-material-symbols/account-circle-full"
    
    import { nothing, average, most_frequent, duration, format_time } from "$lib/utils";

    import { user } from "$lib/auth.svelte";
    import { get_timers } from "$lib/timers.svelte";
    import { supabase } from "$lib/supabase_client";
    import { onMount } from "svelte";

    if (!user.value) {
        goto("/account/auth/login")
    }

    const hash = (str) => Math.abs(str.split('').reduce((hash, char) => char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash,0))

    const email = $derived(user?.value?.email || "ciao@example.com")

    const FACES = ["face", "face-2", "face-3", "face-4", "face-5", "face-6"]
    const get_face = () => FACES[hash(email) % FACES.length]

    const TIME_PERIODS = [
        {
            name: "Week",
            duration: 1000 * 60 * 60 * 24 * 7,
        },
        {
            name: "Month",
            duration: 1000 * 60 * 60 * 24 * 30,
        },
        {
            name: "All time",
            duration: Infinity,
        }
    ]

    let time_period = $state(TIME_PERIODS[2].duration)

    const label = (timer) => timer.label

    const timers = $derived(get_timers())
    const succesful_timers = $derived(timers.filter((timer) => !timer.canceled))
    const in_range_timers = $derived(succesful_timers.filter(timer => new Date(timer.created_at).getTime() > Date.now() - time_period))

    const completed_timers = $derived(timers.length)
    const completion_rate = $derived(Math.round(in_range_timers.length / timers.length * 100) / 100)
    const average_duration = $derived(average(in_range_timers.map(duration)))
    const most_frequent_label = $derived(most_frequent(in_range_timers.map(label).filter(l => l != null)))
</script>

{#snippet card(text, icon)}
    <Card variant="outlined" onclick={() => {}}>
        <div style="display: flex; gap: 1rem">
            <Icon icon="material-symbols:{icon}"></Icon>
            <div style="width: 20vw;">{text}</div>
        </div>
    </Card>
{/snippet}

<div class="main_container">
    <div style="align-self:flex-end; height: 1rem; padding: 1rem">
        <Button
        onclick={() => {
            supabase.auth.signOut()
            goto("/account/auth/login")
        }}
        >Sign out</Button>
    </div>
    <h1>Account details</h1>
    <div style="display: flex; width: 100%; gap: 1rem; justify-content: space-around;">
        <Card variant="elevated">
            <div style="display: flex; margin: 1rem; gap: 2rem; width: 30rem">
                <Icon icon="material-symbols:{get_face()}" style="width: 10rem; height: 10rem"></Icon>
                <div style="align-self: center;">
                    <div style="font-size: 4rem;">{email.split("@")[0][0].toUpperCase() + email.split("@")[0].slice(1)}</div>
                    <div style="text-align: center; font-size: small;">({email})</div>
                </div>
            </div>
        </Card>

        <div style="display: flex; justify-content: space-around; flex-direction: column; gap: 2rem">
            <div style="height: 2rem; align-self: center">
                <ConnectedButtons>
                    {#each TIME_PERIODS as period}
                        <Button variant="filled" square label size="s">
                            <input
                            type="radio"
                            checked={time_period == period.duration}
                            onclick={() => {time_period = period.duration}}
                            />
                            {period.name}
                        </Button>
                    {/each}
                </ConnectedButtons>
            </div>
        
            <div class="stats_div">
                {@render card(`Total timers completed: ${completed_timers}`, "calculate")}
                {@render card(`Completion rate: ${completion_rate}`, "avg-pace")}
                {@render card(`Average pomodoro: ${format_time(average_duration)}`, "avg-time")}
                {@render card(`Most used label: ${most_frequent_label == null ? "none" : most_frequent_label}`, "bookmark-heart")}
            </div>
        </div>
        
    </div>
</div>

<style>
    .main_container {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 3rem;
        width: 100vw;
        height: 100vh;
        padding: 0rem 5rem;
    }
    
    .stats_div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-self: center;
    }
</style>