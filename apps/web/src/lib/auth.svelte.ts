import { supabase } from "$lib/supabase_client";
import type { User } from "@supabase/supabase-js";
import { delete_local_labels, refresh_labels } from "$lib/labels.svelte";
import { delete_local_timers, refresh_timers } from "$lib/timers.svelte";

export let user: { value: User | null } = $state({ value: null });

const {
    data: { user: initial_user }
} = await supabase.auth.getUser()

user.value = initial_user ?? null

async function reset_local_user_data() {
    await Promise.all([
        delete_local_labels(),
        delete_local_timers()
    ])
}

supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user ?? null

    if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event == "INITIAL_SESSION") {
        await reset_local_user_data()
    }

    // Necessary otherwise queries to the database get stuck
    if (event === "SIGNED_OUT") {
        window.location.reload()
    }
});