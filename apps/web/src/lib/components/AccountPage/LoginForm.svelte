<script lang="ts">
    import { resolve } from '$app/paths';
    import { supabase } from '$lib/supabase_client'

    const { header_text } = $props()
    
    const path = resolve("/account")
    const redirect_url = `${window.location.origin}${path}`

    async function signInWithGoogle() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirect_url
            }
        })
        if (error) console.error(error)
    }
</script>

<div class="main_container">
    <h1>{header_text}</h1>
    <button class="google_btn" onclick={signInWithGoogle}>
        <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            width="20" height="20"
        />
        Login with Google
    </button>
</div>

<style>
    .main_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        gap: 24px;
    }

    .google_btn {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 24px;
        border: 1px solid #dadce0;
        border-radius: 4px;
        background: white;
        color: #3c4043;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background 180ms ease;
    }

    .google_btn:hover { background: #f8f9fa; }
</style>