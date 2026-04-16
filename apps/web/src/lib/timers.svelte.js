import { SvelteSet } from "svelte/reactivity"
import { supabase } from "./supabase_client"
import { snackbar } from "m3-svelte"
import { goto } from "$app/navigation"
import { settings } from "./settings.svelte"
import { get } from "svelte/store"

let timer_store = $state({timers: []})
let canceled_timers = new SvelteSet()

const is_active = (timer) =>
    ((new Date(timer.ends_at)).getTime() >= Date.now())
    && !timer.expired
    && !timer.canceled
    && !canceled_timers.has(timer.client_timer_id)

const active_timers = $derived(timer_store.timers.filter(is_active))

export const get_active_timers = () => active_timers

function clean_locally_canceled_timers() {

    timer_store.timers.forEach((timer) => {
        const is_canceled_locally = canceled_timers.has(timer.client_timer_id) && timer.id && !timer.canceled
        if (is_canceled_locally) {
            try {
                fetch(`/api/v1/timers/cancel/${timer.id}`, {method: "POST"})
            } catch(e) {
                alert("INTERNAL ERROR:" + e.message)
            }
        }
    })
}

async function load_timers() {
    const {data} = await (await fetch("/api/v1/timers")).json()

    timer_store.timers = data ?? []

    clean_locally_canceled_timers()
}

export async function create_timer(duration) {    
    const client_timer_id = crypto.randomUUID()

    timer_store.timers.push({
        created_at: Date.now(),
        ends_at: Date.now() + duration * 1000,
        client_timer_id: client_timer_id
    })
    
    try {
        const response = await fetch("/api/v1/timers/create", {
            method: "POST",
            body: JSON.stringify({
                duration: duration,
                client_timer_id: client_timer_id
            })
        })

        if (response.status == 401 && !settings.dismissed_login) {
            snackbar(
                'Sign in to sync this timer to the cloud',
                {
                    ["Sign in"]: () => goto('/login'),
                    ["Dismiss"]: () => {settings.dismissed_login = true},
                },
            );
        }
    } catch {
        alert("Interal server error while creating a new timer")
    }

}

export async function cancel_timer(client_id) {
    canceled_timers.add(client_id)
    load_timers()
}

async function sync_to_database() {
    supabase.channel("Timers-changes")
    .on("postgres_changes", { event: '*', schema: 'public', table: 'Timers' }, load_timers).subscribe()
}

$effect.root(() => {
    load_timers()
    sync_to_database()
})