<script>
    import "../app.css"
    import NavigationMenu from "$lib/components/NavigationMenu.svelte";
    import { pwaInfo } from 'virtual:pwa-info';

    const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

    let { children } = $props();
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.webmanifest" />
</svelte:head>

<NavigationMenu></NavigationMenu>
{@render children()}