import { create_database, insert, remove, apply } from "$lib/SyncedDatabase.svelte";
import { user } from "$lib/auth.svelte";

let labels_store = (await create_database("Labels"))

export async function create_label(name, webhook) {
    const user_id = user?.value?.id
    
    apply(labels_store, insert({
        user_id: user_id,
        webhook: webhook,
        name: name
    }))
}

export async function remove_label(name) {
    apply(labels_store, remove({
        column: "name",
        value: name
    }))
}

export const get_values = () => labels_store.values
export const is_updating = () => labels_store.updating