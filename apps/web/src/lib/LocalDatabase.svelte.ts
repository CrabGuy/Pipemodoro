import { browser } from "$app/environment"

export type Entry<T extends Record<string, unknown>> = T
export type Values<T extends Record<string, unknown>> = Entry<T>[]
export type LocalDatabase<T extends Record<string, unknown>> = {
    name: string,
    values: Values<T>,
}

type Predicate = <T extends Record<string, unknown>>(record: Entry<T>) => boolean
export type Updater = <T extends Record<string, unknown>>(record: Entry<T>) => Entry<T>

export const insert = <T extends Record<string, unknown>>(record: Entry<T>) => 
    (database: LocalDatabase<T>): Values<T> => [...database.values, record]

export const remove = <T extends Record<string, unknown>>(predicate: Predicate) =>
    (database: LocalDatabase<T>): Values<T> => database.values.filter((record) => !predicate(record))

export const update = <T extends Record<string, unknown>>(predicate: Predicate, updater: Updater) =>
    (database: LocalDatabase<T>): Values<T> => database.values.map((record) => predicate(record) ? updater(record) : record)

export const select = <T extends Record<string, unknown>>(predicate: Predicate) =>
    (database: LocalDatabase<T>): Entry<T> | undefined => database.values.find(predicate)

export const set = <T extends Record<string, unknown>>(new_values: Values<T>) =>
    (database: LocalDatabase<T>) => new_values

export const load_values = (name: string) => JSON.parse( browser ? (localStorage.getItem(name) || "[]") : "[]")

function set_local_storage_values<T extends Record<string, unknown>>(name: string, values: Values<T>) {
    if (browser) {
        localStorage.setItem(name, JSON.stringify(values))
    }
}

export const apply = async <K extends Record<string, unknown>, T extends LocalDatabase<K>>(database: T, operation: (database: T) => Values<K> | Promise<Values<K>>) => {
    database.values = await operation(database)
    set_local_storage_values(database.name, database.values)
    return database
}

export function create_database<T extends Record<string, unknown>>(name: string) {

    let database: LocalDatabase<T> = $state({
        get name() {return name},
        values: load_values(name),
    })

    return database
}
