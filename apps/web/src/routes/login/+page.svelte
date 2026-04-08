<script>
    import { TextFieldOutlined, Button } from "m3-svelte";
    import { supabase } from "$lib/supabase_client";   
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { onMount } from "svelte";

    // ciao@example.com
    let email = $state("")
    // ciao@example.com
    let password = $state("")

    async function login() {
        const {error} = await supabase.auth.signInWithPassword({email, password})

        if (error) {
            alert(error.message)
            return
        }
        goto("/")
    }

    async function signup() {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.message)
        }
    }
</script>

<div class="main_container" style="align-self: center;">
    <h1 style="align-self: center;">
        Welcome back!
    </h1>
    <TextFieldOutlined label="Email" bind:value={email}></TextFieldOutlined>
    <TextFieldOutlined label="Password" type="Password" bind:value={password}></TextFieldOutlined>
    <div style="align-self: center;">
        <Button size="m" onclick={login}>Login</Button>
    </div>
    <div style="align-self: center;">
        <Button size="m" onclick={signup}>Signup</Button>
    </div>
</div>

<style>
    .main_container {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 60vw;
        height: 60vh;
    }
</style>
