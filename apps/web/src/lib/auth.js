import { writable } from "svelte/store";
import { supabase } from "$lib/supabase_client";

export const user = writable(null);

supabase.auth.getSession().then(({data}) => {
    user.set(data.session?.user ?? null)
})

supabase.auth.onAuthStateChange((_event, session) => {
    user.set(session?.user ?? null)
})