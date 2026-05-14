import { create_database, insert, remove, apply, delete_local_values, refresh_values } from "$lib/SyncedDatabase.svelte";
import type { LabelType } from "$lib/Types";

let labels_store = (await create_database<LabelType>("Labels"))

export async function create_label(user_id: string | undefined, name: string, webhook: string) {

    const new_label: LabelType = {
        user_id: user_id,
        webhook: webhook,
        name: name
    }

    apply(labels_store, insert(new_label))
}

export async function remove_label(name: string) {
    apply(labels_store, remove({
        column: "name",
        value: name
    }))
}

export const get_labels = () => labels_store.values
export const is_updating = () => labels_store.updating

export const delete_local_labels = async () => {
    await delete_local_values(labels_store.name)(labels_store)
}
export async function refresh_labels() {
    return await refresh_values(labels_store.name)(labels_store)
}