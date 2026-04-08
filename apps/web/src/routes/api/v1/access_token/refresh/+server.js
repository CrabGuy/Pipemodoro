import { supabase } from "$lib/supabase_client";
import { json } from "@sveltejs/kit";

export const POST = async ({request}) => {
    const {refresh_token} = await request.json()

    const {data, error} = await supabase.auth.refreshSession({refresh_token})

    if (error) {
        return json({error: error.message}, {status: 401})
    }

    return json({
        access_token: data.session.access_token,
        expires_at: data.session.expires_at,
    })
}
