<script>
    import { page } from "$app/state";
    import { supabase } from "$lib/supabase_client";
    import { redirect } from "@sveltejs/kit";
    import { Button } from "m3-svelte";
    
    const user = page.data.user
</script>

<div>Welcome back!</div>
<div>You are currently logged in as {user.email}</div>

<form action="/api/v1/signout" method="POST">
    <Button type="submit">Sign out</Button>
</form>