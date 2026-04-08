import { supabase } from "$lib/supabase_client";
import { fail, json } from "@sveltejs/kit";

export const POST = async ({params}) => {
    const timer_id = params.id

    const {error} = await supabase.from("Timers")
    .update({canceled: true})
    .eq("id", timer_id)

    if (error) {
        return fail(500, {message: error.message})
    }

    return json({success: true})
}