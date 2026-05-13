<script lang="ts">
    import { NavigationRail, NavigationRailItem } from "m3-svelte";
    import timer from "@ktibow/iconset-material-symbols/timer"
    import person from "@ktibow/iconset-material-symbols/person";
    import book from "@ktibow/iconset-material-symbols/book"
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";

    const SECTIONS = [
        {
            url: resolve("/"),
            label: "Timers",
            icon: timer
        },
        {
            url: resolve("/labels"),
            label: "Labels",
            icon: book
        },
        {
            url: resolve("/account"),
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