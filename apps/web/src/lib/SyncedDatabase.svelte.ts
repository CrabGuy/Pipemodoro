import * as local_database from "$lib/LocalDatabase.svelte"
import { supabase } from "$lib/supabase_client"
import { nothing } from "$lib/utils"

type SyncedDatabase<T extends Record<string, unknown>> = local_database.LocalDatabase<T> & {updating: boolean}

export const insert = <T extends Record<string, unknown>>(record: local_database.Entry<T>) =>
    async (database: SyncedDatabase<T>) => {
        supabase.from(database.name).insert(record).select().then(nothing)
        return local_database.insert(record)(database)
    }

export const remove = <T extends Record<string, unknown>>({column, value}: {column: string, value: any}) =>
    async (database: SyncedDatabase<T>) => {
        supabase.from(database.name).delete().eq(column, value).select().then(nothing)
        return local_database.remove((record: Record<string, unknown>) => record[column] == value)(database)
    }

export const update = <T extends Record<string, unknown>>({column, value}: {column: string, value: unknown}, updater: local_database.Updater) =>
    async (database: SyncedDatabase<T>) => {
        const is_correct_record = (record: local_database.Entry<T>) => record[column] == value

        const original_value = local_database.select(is_correct_record)(database)

        if (original_value != undefined) {
            const updated_value = updater(original_value)
            supabase.from(database.name).update(updated_value).eq(column, value).select().then(nothing)
        }

        return local_database.update(is_correct_record, updater)(database)
    }

export const select = local_database.select
export const apply = local_database.apply

function merge_values<T extends Record<string, unknown>>(local_values: local_database.Values<T>, online_values: local_database.Values<T> = []): local_database.Values<T> {
    const merged = new Map()

    for (const item of online_values) {
        merged.set(item.name || item.client_timer_id, item)
    }

    for (const item of local_values) {
        merged.set(item.name || item.client_timer_id, item)
    }

    return Array.from(merged.values())
}

function load_local_values(name: string) {
    return local_database.load_values(name)
}

async function load_online_values(name: string) {
    try {
        const { data, error } = await supabase.from(name).select("*");
        if (error) throw error;
        return data
    } catch (err) {
        console.error(`Failed to load online data for ${name}`, err);
        return []
    }
}

export async function load_values(name: string) {
    const local_values = load_local_values(name)
    const online_values = await load_online_values(name)

    if (!online_values || online_values.length == 0) {
        console.warn("Online values not present")
    }

    return merge_values(local_values, online_values)
}

function sync_to_database(name: string, load_function: () => void) {
    supabase.channel(`${name}-changes`)
        .on("postgres_changes", { event: '*', schema: 'public', table: name }, load_function).subscribe()
}

export const refresh_values = <T extends Record<string, unknown>>(name: string) => async (database: SyncedDatabase<T>) =>
    {
        local_database.apply(database, local_database.set(load_local_values(name)))
        database.updating = true
        let refreshed = await local_database.apply(database, local_database.set(await load_values(name)))
        database.updating = false
        return refreshed
    }

export async function create_database<T extends Record<string, unknown>>(name: string) {
    let database: SyncedDatabase<T> = $state({
        ...local_database.create_database(name),
        updating: true
    })

    sync_to_database(database.name, async () => await refresh_values(database.name)(database))

    refresh_values(database.name)(database).then(nothing)

    return database
}
