import { json } from "@sveltejs/kit";

export const GET = async ({ locals, request }) => {
    if (!locals.user) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await locals.supabase
        .from('Timers')
        .select('*')

    return json({ user_id: locals.user.id, data, error })
}