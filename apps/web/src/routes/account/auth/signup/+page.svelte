<script lang="ts">
    import { goto } from "$app/navigation";
    import AccountForm from "$lib/components/AccountPage/AccountForm.svelte";
    import { Button } from "m3-svelte";
    import { supabase } from "$lib/supabase_client";
    import { resolve } from "$app/paths";

    async function signup(email: string, password: string) {
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message)
            return
        }
        goto(resolve("/account"))
    }
</script>

<AccountForm header_text="Welcome!" on_submit={signup}>
    <div style="align-self: center;">
        <Button size="m" type="submit">Signup</Button>
    </div>
    <div style="align-self: center;">
        <Button size="m" variant="outlined"
        onclick={() => {goto(resolve("/account/auth/login"))}}
        >Already have an account?</Button>
    </div>
</AccountForm>