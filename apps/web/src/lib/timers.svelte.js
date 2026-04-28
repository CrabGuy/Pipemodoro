import { supabase } from "$lib/supabase_client"
import { snackbar } from "m3-svelte"
import { goto } from "$app/navigation"
import { settings } from "$lib/settings.svelte"
import { create_database, insert, remove, update, refresh_values, apply } from "$lib/SyncedDatabase.svelte"
import { user } from "$lib/auth.svelte"

let timer_store = (await create_database("Timers"))

$effect.root(() => {
    $inspect(timer_store)
})

export const is_active = (timer) =>
    ((new Date(timer.ends_at)).getTime() >= Date.now())
    && !timer.expired
    && !timer.canceled

export const get_active_timers = () => timer_store.values.filter(is_active)

export async function refresh_timers() {
    await refresh_values(timer_store.name)(timer_store)
}

export async function create_timer(duration, label) {    
    const client_timer_id = crypto.randomUUID()
    const user_id = user.value.id

    apply(timer_store, insert({
        uuid: user_id,
        created_at: (new Date(Date.now())).toISOString(),
        ends_at: (new Date(Date.now() + duration)).toISOString(),
        client_timer_id: client_timer_id,
        label: label,
    }))
}

export async function cancel_timer(client_id) {
    const set_canceled = (record) => ({...record, canceled: true})

    apply(timer_store, update({column: 'client_timer_id', value: client_id}, set_canceled))
}