import { supabase } from "$lib/supabase_client";
import { fail, json } from "@sveltejs/kit";

export const POST = async ({request}) => {
    const {timer_id} = await request.json()

    const {data: {user}} = await supabase.auth.getUser()
    
    const {error} = await supabase.from("Timers")
    .update({canceled: true})
    .eq("id", timer_id)

    if (error) {
        return fail(500, {message: error.message})
    }

    return json({success: true})
}