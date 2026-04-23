import { browser } from "$app/environment"

export const insert = (record) => 
    (database) => [...database, record]

export const remove = (predicate) =>
    (database) => database.filter((record) => !predicate(record))

export const update = (predicate, updater) =>
    (database) => database.map((record) => predicate(record) ? updater(record) : record)

export const set = (new_database) =>
    (database) => new_database

export const load_values = (name) => JSON.parse( browser ? (localStorage.getItem(name) || "[]") : "[]")

function sync_local_storage(name, database) {
    if (browser) {
        localStorage.setItem(name, JSON.stringify(database))
    }
}

export function create_local_database(name) {
    let values = $state(load_values(name))

    return {
        get values() {return values},
        apply(operation) {
            values = operation(values)
            sync_local_storage(name, values)
            return values
        }
    }
}
