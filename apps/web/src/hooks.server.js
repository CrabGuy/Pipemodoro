import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { redirect } from '@sveltejs/kit';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const AUTH_ROUTES = ["/account/auth"]

export const handle = async ({ event, resolve }) => {
  const authHeader = event.request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (token) {
    event.locals.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  } else {
    event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll: () => event.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            event.cookies.set(name, value, { ...options, path: '/' });
          });
        }
      }
    });
  }

  const {
    data: { user },
    error
  } = token
    ? await event.locals.supabase.auth.getUser(token)
    : await event.locals.supabase.auth.getUser();

  event.locals.user = error ? null : user ?? null;
  
  const is_auth_route = AUTH_ROUTES.some((route) => event.url.pathname.startsWith(route))

  if (!user && !is_auth_route) {
    redirect(301, "/account/auth/login")
  }

  return resolve(event);
};