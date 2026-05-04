import * as local_database from "$lib/LocalDatabase.svelte"
import { supabase } from "$lib/supabase_client"
import { nothing } from "$lib/utils"

export const insert = (record) =>
    async (database) => {
        supabase.from(database.name).insert(record).select().then(nothing)
        return local_database.insert(record)(database)
    }

export const remove = ({column, value}) =>
    async (database) => {
        supabase.from(database.name).delete().eq(column, value).select().then(nothing)
        return local_database.remove((record) => record[column] == value)(database)
    }

export const update = ({column, value}, updater) =>
    async (database) => {
        const is_correct_record = (record) => record[column] == value

        const original_value = local_database.select(is_correct_record)(database)
        const updated_value = updater(original_value)
        supabase.from(database.name).update(updated_value).eq(column, value).select().then(nothing)
        return local_database.update(is_correct_record, updater)(database)
    }

export const select = local_database.select
export const apply = local_database.apply

function merge_values(local_values, online_values = []) {
    const merged = new Map()

    for (const item of online_values) {
        merged.set(item.name || item.id, item)
    }

    for (const item of local_values) {
        merged.set(item.name || item.id, item)
    }

    return Array.from(merged.values())
}

function load_local_values(name) {
    return local_database.load_values(name)
}

async function load_online_values(name) {
    return (await (await supabase.from(name).select("*")).data)
}

export async function load_values(name) {
    const local_values = load_local_values(name)
    const online_values = await load_online_values(name)

    if (!online_values) {
        console.warn("Online values not present")
    }

    return merge_values(local_values, online_values)
}

function sync_to_database(name, load_function) {
    supabase.channel(`${name}-changes`)
        .on("postgres_changes", { event: '*', schema: 'public', table: name }, load_function).subscribe()
}

export const refresh_values = (name) => async (database) =>
    {
        local_database.apply(database, local_database.set(load_local_values(name)))
        database.updating = true
        let refreshed = await local_database.apply(database, local_database.set(await load_values(name)))
        database.updating = false
        return refreshed
    }

export async function create_database(name) {
    let database = $state({
        ...local_database.create_database(name),
        updating: true
    })

    sync_to_database(database.name, async () => await refresh_values(database.name)(database))

    refresh_values(database.name)(database).then(nothing)

    return database
}
