import { supabase } from "$lib/supabase_client";
import { json } from "@sveltejs/kit";

export const POST = async ({request}) => {
    const {duration} = await request.json()

    const {data: {user}} = await supabase.auth.getUser()
    await supabase.from("Timers").insert({
        created_at: (new Date(Date.now())).toISOString(),
        ends_at: (new Date(Date.now() + Math.floor(duration) * 1000)).toISOString(),
        uuid: user.id,
    })

    return json({duration})
}