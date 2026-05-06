import { supabase } from "$lib/supabase_client";
import type { User } from "@supabase/supabase-js";

export let user: {value: User | null} = $state({value: null});

const {data} = await supabase.auth.getUser()

user.value = data?.user ?? null

supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
})
