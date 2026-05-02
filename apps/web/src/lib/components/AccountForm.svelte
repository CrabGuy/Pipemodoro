<script>
    import { TextFieldOutlined, Button } from "m3-svelte";
    import { supabase } from "$lib/supabase_client";   
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { onMount } from "svelte";
    
    let email = $state("")
    let password = $state("")

    // test email and password: ciao@example.com
    const {header_text, children, on_submit} = $props()

</script>

<form class="main_container" style="align-self: center;"
onsubmit={(e) => {e.preventDefault(); on_submit(email, password)}}
>
    <h1 style="align-self: center;">
        {header_text}
    </h1>
    <TextFieldOutlined label="Email" bind:value={email}></TextFieldOutlined>
    <TextFieldOutlined label="Password" type="Password" bind:value={password}></TextFieldOutlined>
    <div class="buttons_container">
        {@render children()}
    </div>
</form>

<style>
    .main_container {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100vw;
        height: 100vh;
        margin: 40vh 20vw;
        overflow: auto;
    }
    .buttons_container {
        display: flex;
        justify-content: space-around;
    }
</style>