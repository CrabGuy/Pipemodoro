import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { functionsMixins } from "vite-plugin-functions-mixins";
import { tokenShaker } from "vite-plugin-token-shaker";
import { SvelteKitPWA } from "@vite-pwa/sveltekit"


export default defineConfig({
    plugins: [
        sveltekit(),
        functionsMixins({ deps: ["m3-svelte"] }),
        tokenShaker(),
        SvelteKitPWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Pipemodoro",
                short_name: "Pipemodoro",
                start_url: "/",
                display: "standalone",
                background_color: "#faf4ed",
                theme_color: "#d7827e",
            }
        })
    ],
});
