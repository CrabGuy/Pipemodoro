import { browser } from "$app/environment"

export const insert = (record) => 
    (database) => [...database.values, record]

export const remove = (predicate) =>
    (database) => database.values.filter((record) => !predicate(record))

export const update = (predicate, updater) =>
    (database) => database.values.map((record) => predicate(record) ? updater(record) : record)

export const select = (predicate) =>
    (database) => database.values.find(predicate)

export const set = (new_values) =>
    (database) => new_values

export const load_values = (name) => JSON.parse( browser ? (localStorage.getItem(name) || "[]") : "[]")

function set_local_storage_values(name, values) {
    if (browser) {
        localStorage.setItem(name, JSON.stringify(values))
    }
}

export function create_database(name) {
    let values = $state(load_values(name))
    let database = {
        get name() {return name},
        get values() {return values},
        async apply(operation) {
            values = await operation(database)
            set_local_storage_values(name, values)
            return database
        }
    }

    return database
}
