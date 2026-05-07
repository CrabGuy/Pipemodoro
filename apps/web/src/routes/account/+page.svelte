<script lang="ts">
    import { Button } from "m3-svelte";
    import {goto} from "$app/navigation"
    import { user } from "$lib/auth.svelte";
    import { get_timers } from "$lib/timers.svelte";
    import { supabase } from "$lib/supabase_client";
    import AccountDisplay from "$lib/components/AccountPage/AccountDisplay.svelte";
    import AccountStats from "$lib/components/AccountPage/AccountStats.svelte";

    if (!(user.value && user.value.email)) {
        goto("/account/auth/login")
    }

    const email = $derived(user?.value?.email || "")
    const timers = $derived(get_timers())
</script>

<div class="main_container1">
    <div style="align-self:flex-end; height: 1rem; margin: 1rem">
        <Button
        onclick={() => {
            supabase.auth.signOut()
            goto("/account/auth/login")
        }}
        >Sign out</Button>
    </div>
    <h1>Account details</h1>
    <div style="display: flex; width: 100%; gap: 1rem; justify-content: space-around;">
        <AccountDisplay
            {email}
        />

        <AccountStats
            {timers}
        />
    </div>
</div>

<style>
    .main_container1 {
        display: flex;
        flex-direction: column;
        align-items: baseline;
        gap: 3rem;
        width: 100vw;
        height: 100vh;
        margin: 0rem 5rem;
        overflow: auto;
    }
</style>