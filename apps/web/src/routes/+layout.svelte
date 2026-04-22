<script>
    import "../app.css"
    import NavigationMenu from "$lib/components/NavigationMenu.svelte";
    let { children } = $props();
</script>

<!-- TODO: it doesnt look properly when on another section -->
<NavigationMenu></NavigationMenu>
{@render children()}