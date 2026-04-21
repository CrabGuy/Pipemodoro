import { json } from "@sveltejs/kit";

export const POST = async ({locals, params}) => {
    
    const label = params.name

    const {data, error} = await locals.supabase.from("Labels")
    .delete()
    .eq("name", label)
    .select()

    if (error) {
        return error(500, {message: error.message})
    }

    return json({success: true})
}