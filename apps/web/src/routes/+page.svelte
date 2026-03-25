<script lang="ts">
    import { Button, ConnectedButtons } from "m3-svelte";
    let itemA = $state()
</script>

<Button variant="tonal" onclick={() => console.log("Clicked")}>Click me!</Button>