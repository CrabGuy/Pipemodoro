import { supabase } from "$lib/supabase_client";
import { json } from "@sveltejs/kit";

export const GET = async ({locals}) => {
    const {data: {user}} = await locals.supabase.auth.getUser()
    const timers = await supabase.from("Timers").select("*")

    return json(timers)
}