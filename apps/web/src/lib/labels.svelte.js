import { supabase } from "./supabase_client"

export let labels_store = $state({labels: []})
export let labels_loaded = $state({state: false})

async function load_labels() {
    labels_loaded.state = false
    const {data} = await (await fetch("/api/v1/labels")).json()
    labels_loaded.state = true

    labels_store.labels = data ?? []
}

async function sync_to_database() {
    supabase.channel("Labels-changes")
    .on("postgres_changes", { event: '*', schema: 'public', table: 'Labels' }, load_labels).subscribe()
}

$effect.root(() => {
    load_labels()
    sync_to_database()
})

