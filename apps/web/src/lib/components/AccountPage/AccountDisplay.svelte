<script lang="ts">
    import Icon from "@iconify/svelte";
    import { Card } from "m3-svelte";

    const {
        email,
    }: {
        email: string,
    } = $props()
    
    const FACES = ["face", "face-2", "face-3", "face-4", "face-5", "face-6"]

    const hash = (str: string) => Math.abs(str.split('').reduce((hash, char) => char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash,0))

    const get_face = () => FACES[hash(email) % FACES.length]
</script>


<Card variant="elevated">
    <div style="display: flex; margin: 1rem; gap: 2rem; width: 30rem">
        <Icon icon="material-symbols:{get_face()}" style="width: 10rem; height: 10rem"></Icon>
        <div style="align-self: center;">
            <div style="font-size: 4rem;">{email.split("@")[0][0].toUpperCase() + email.split("@")[0].slice(1)}</div>
            <div style="text-align: center; font-size: small;">({email})</div>
        </div>
    </div>
</Card>