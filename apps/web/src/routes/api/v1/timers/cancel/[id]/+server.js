import { json } from "@sveltejs/kit";

export const POST = async ({locals, params}) => {
    
    const timer_id = params.id
    console.log("Called", timer_id, typeof(timer_id));

    const {data, error} = await locals.supabase.from("Timers")
    .update({canceled: true})
    .eq("id", parseInt(timer_id))
    .select()

    if (error) {
        return error(500, {message: error.message})
    }

    return json({success: true})
}