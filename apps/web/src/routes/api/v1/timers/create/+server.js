import { supabase } from "$lib/supabase_client";
import { json } from "@sveltejs/kit";

export const POST = async ({request, locals}) => {    
    const {duration, client_timer_id} = await request.json()
    
    const auth_header = request.headers.get('authorization')
    const token = auth_header?.startsWith('Bearer ')
        ? auth_header.slice(7)
        : null;

    const {
        data: { user }
    } = await locals.supabase.auth.getUser(token || null);

    if (!user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    await locals.supabase.from("Timers").insert({
        created_at: (new Date(Date.now())).toISOString(),
        ends_at: (new Date(Date.now() + Math.floor(duration) * 1000)).toISOString(),
        uuid: user.id,
        canceled: false,
        client_timer_id: client_timer_id || crypto.randomUUID(),
    })

    return json({duration})
}