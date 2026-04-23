<script>
    import { redirect } from "@sveltejs/kit";
    import { Button } from "m3-svelte";
    import {goto} from "$app/navigation"

    import { user } from "$lib/auth.svelte";
    
    const email = $derived(user.value.email)
</script>

<div>Welcome back!</div>
<div>You are currently logged in as {email}</div>

<form action="/api/v1/signout" method="POST">
    <Button type="submit">Sign out</Button>
</form>