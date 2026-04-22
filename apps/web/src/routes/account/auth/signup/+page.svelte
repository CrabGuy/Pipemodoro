<script>
    import { goto } from "$app/navigation";
    import AccountForm from "$lib/components/AccountForm.svelte";
    import { Button } from "m3-svelte";
    import { supabase } from "$lib/supabase_client";

    async function signup(email, password) {
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message)
            return
        }
        goto("/")
    }
</script>

<AccountForm header_text="Welcome!" on_submit={signup}>
    <div style="align-self: center;">
        <Button size="m" type="submit">Signup</Button>
    </div>
    <div style="align-self: center;">
        <Button size="m" variant="outlined"
        onclick={() => {goto("/account/auth/login")}}
        >Already have an account?</Button>
    </div>
</AccountForm>