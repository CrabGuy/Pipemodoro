import { writable } from "svelte/store";
import { supabase } from "$lib/supabase_client";

export let user = $state({value: null});

const {data} = await supabase.auth.getUser()

user.value = data?.user ?? null

supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
})
