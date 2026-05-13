<script lang="ts">
    import "../app.css"
    import NavigationMenu from "$lib/components/NavigationMenu.svelte";

    let { children } = $props();
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

<NavigationMenu></NavigationMenu>
{@render children()}