import { create_database, insert, update, refresh_values, apply } from "$lib/SyncedDatabase.svelte"
import { user } from "$lib/auth.svelte"
import type { Timer } from "$lib/Types";

let timer_store = (await create_database<Timer>("Timers"))

$effect.root(() => {
    $inspect(timer_store)
})

export const is_active = (timer: Timer) =>
    ((new Date(timer.ends_at)).getTime() >= Date.now())
    && !timer.expired
    && !timer.canceled

export const get_active_timers = () => timer_store.values.filter(is_active)

export const get_timers = () => timer_store.values

export async function refresh_timers() {
    return await refresh_values(timer_store.name)(timer_store)
}

export async function create_timer(duration: number, timer_type: string, label: string) {    
    const client_timer_id = crypto.randomUUID()
    const user_id = user?.value?.id

    const new_timer: Timer = {
        user_id: user_id,
        created_at: (new Date(Date.now())).toISOString(),
        ends_at: (new Date(Date.now() + duration)).toISOString(),
        client_timer_id: client_timer_id,
        label: label || null,
        timer_type: timer_type,
        canceled: false,
        fired: false
    }

    apply(timer_store, insert(new_timer))
}

export async function cancel_timer(client_id: string) {
    const set_canceled = (record: Timer): Timer => ({...record, canceled: true})

    apply(timer_store, update({column: 'client_timer_id', value: client_id}, set_canceled))
}