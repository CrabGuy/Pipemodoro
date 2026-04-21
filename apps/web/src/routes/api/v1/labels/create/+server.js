import { supabase } from "$lib/supabase_client";
import { json } from "@sveltejs/kit";

export const POST = async ({request, locals}) => {    
    const { name, webhook } = await request.json()
    
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

    await locals.supabase.from("Labels").insert({
        name: name,
        webhook: webhook,
        id: user.id
    })

    return json({name, webhook})
}