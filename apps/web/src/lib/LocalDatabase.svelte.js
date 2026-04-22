import { browser } from "$app/environment"
/* import { supabase } from "./supabase_client"

async function database_items(name) {
    const { data, error } = supabase.from(name)
    .select("*")

    return data
}

function react_to_database_changes(name, sync_function) {
    supabase.channel(`${name}-changes`)
        .on("postgres_changes",
            { event: '*', schema: 'public', table: `${name}` },
            sync_function
        ).subscribe()
} */

export const insert = (record) => 
    (database) => [...database, record]

export const remove = (predicate) =>
    (database) => database.filter((record) => !predicate(record))

export const update = (predicate, updater) =>
    (database) => database.map((record) => predicate(record) ? updater(record) : record)

export const set = (new_database) =>
    (database) => new_database

function sync_local_storage(name, database) {
    if (browser) {
        localStorage.setItem(name, JSON.stringify(database))
    }
}

export function create_optimistic_database(name) {
    let local_database = $state(JSON.parse( browser ? localStorage.getItem(name) : "[]"))

    return {
        get local_database() {return local_database},
        apply(operation) {
            local_database = operation(local_database)
            sync_local_storage(name, database)
        }
    }
}
