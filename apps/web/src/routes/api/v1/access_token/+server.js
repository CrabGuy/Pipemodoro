import { supabase } from "$lib/supabase_client";
import { json } from "@sveltejs/kit";


export const POST = async ({request}) => {
    const {email, password} = await request.json()

    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    if (error) {
        return json({error: error.message}, {status: 401})
    }

    return json({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
    })
}
