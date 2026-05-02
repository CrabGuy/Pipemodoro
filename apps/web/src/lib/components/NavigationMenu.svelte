<script>
    import { NavigationRail, NavigationRailItem, addBadge } from "m3-svelte";
    import timer from "@ktibow/iconset-material-symbols/timer"
    import person from "@ktibow/iconset-material-symbols/person";
    import book from "@ktibow/iconset-material-symbols/book"
    import { settings } from "$lib/settings.svelte";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";


    const SECTIONS = [
        {
            url: "/",
            label: "Timers",
            icon: timer
        },
        {
            url: "/labels",
            label: "Labels",
            icon: book
        },
        {
            url: "/account",
            label: "Account",
            icon: person
        },
    ]
</script>

<NavigationRail iconType="full">
    {#each SECTIONS as section}
        <NavigationRailItem
        label={section.label}
        icon={section.icon}
        onclick={() => {goto(section.url)}}
        active={page.url.pathname == section.url}
        />
    {/each}
</NavigationRail>