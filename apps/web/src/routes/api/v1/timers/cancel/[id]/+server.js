import { json } from "@sveltejs/kit";

export const POST = async ({locals, params}) => {
    
    const timer_id = params.id

    const {data, error} = await locals.supabase.from("Timers")
    .update({canceled: true})
    .eq("id", parseInt(timer_id))
    .select()

    if (error) {
        return error(500, {message: error.message})
    }

    return json({success: true})
}