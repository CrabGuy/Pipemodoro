import { create_database, insert, remove, apply } from "$lib/SyncedDatabase.svelte";
import { user } from "$lib/auth.svelte";
import type { LabelType } from "$lib/Types";

let labels_store = (await create_database<LabelType>("Labels"))

export async function create_label(name: string, webhook: string) {
    const user_id = user?.value?.id

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