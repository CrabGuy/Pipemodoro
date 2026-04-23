import { SvelteSet } from "svelte/reactivity"
import { supabase } from "./supabase_client"
import { snackbar } from "m3-svelte"
import { goto } from "$app/navigation"
import { settings } from "./settings.svelte"
import { create_local_database, insert, remove, update, set, load_values } from "$lib/LocalDatabase.svelte"

let timer_store = $state(create_local_database("Timers"))

export const is_active = (timer) =>
    ((new Date(timer.ends_at)).getTime() >= Date.now())
    && !timer.expired
    && !timer.canceled

const active_timers = $derived(timer_store.values.filter(is_active))

export const get_active_timers = () => active_timers

async function load_timers() {
    timer_store.apply(set(load_values("Timers")))
}

export async function refresh_timers() {
    await load_timers()
}

export async function create_timer(duration, label) {    
    const client_timer_id = crypto.randomUUID()

    timer_store.apply(insert({
        created_at: Date.now(),
        ends_at: Date.now() + duration,
        client_timer_id: client_timer_id,
        label: label,
    }))
}

export async function cancel_timer(client_id) {
    const is_correct_timer = (record) => record.client_timer_id == client_id
    const set_canceled = (record) => ({...record, canceled: true})
    
    timer_store.apply(update(is_correct_timer, set_canceled))
}