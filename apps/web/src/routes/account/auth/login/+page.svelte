<script>
    import { goto } from "$app/navigation";
    import AccountForm from "$lib/components/AccountForm.svelte";
    import { Button } from "m3-svelte";
    import { supabase } from "$lib/supabase_client";

    async function login(email, password) {
        const {error} = await supabase.auth.signInWithPassword({email, password})

        if (error) {
            alert(error.message)
            return
        }
        goto("/")
    }
</script>

<AccountForm header_text="Welcome back!" on_submit={login}>
    <div style="align-self: center;">
        <Button size="m" type="submit">Login</Button>
    </div>
    <div style="align-self: center;">
        <Button size="m" variant="outlined"
        onclick={() => {goto("/account/auth/signup")}}
        >Don't have an account?</Button>
    </div>
</AccountForm>