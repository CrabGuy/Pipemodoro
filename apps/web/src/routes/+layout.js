import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'

const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const PUBLIC_SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY


export const load = async ({fetch, data, depends}) => {
    depends("supabase:auth")

    const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
        global: {fetch}
    })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
        global: {fetch},
        cookies: {getAll() {return data.cookies}}
    }) 

    const {data: claimsData, error} = await supabase.auth.getClaims()
    const claims = error ? null : claimsData?.claims

    return {supabase, claims}
}
