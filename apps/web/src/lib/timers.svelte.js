import { SvelteSet } from "svelte/reactivity"
import { supabase } from "./supabase_client"

export const timer_store = $state({timers: []})
export const canceled_timers = new SvelteSet()