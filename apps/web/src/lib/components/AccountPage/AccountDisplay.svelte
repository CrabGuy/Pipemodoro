<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { UserMetadata } from "@supabase/supabase-js";
    import { Card } from "m3-svelte";

    const {
        email,
        metadata
    }: {
        email: string,
        metadata?: UserMetadata
    } = $props()
    </script>


<Card variant="elevated">
    <div style="display: flex; margin: 1rem; gap: 2rem; width: 30rem">
        {#if metadata && metadata.avatar_url}
            <img src={metadata.avatar_url} alt={metadata.full_name} width="80" height="80" 
                style="border-radius: 50%;" />
        {/if}
        <!-- <Icon icon="material-symbols:{get_face()}" style="width: 10rem; height: 10rem"></Icon> -->
        <div style="align-self: center;">
            <div style="font-size: 4rem;">{metadata?.full_name || ""}</div>
            <div style="text-align: center; font-size: small;">({email})</div>
        </div>
    </div>
</Card>