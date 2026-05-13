<script lang="ts">
    import "../app.css"
    import NavigationMenu from "$lib/components/NavigationMenu.svelte";

    let { children } = $props();
</script>

<svelte:head>
	<link rel="manifest" href="%sveltekit.base%/manifest.webmanifest" />
</svelte:head>

<NavigationMenu></NavigationMenu>
{@render children()}