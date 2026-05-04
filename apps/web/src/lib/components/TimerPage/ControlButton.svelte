<script lang="ts">
    import { Button, Icon } from "m3-svelte";
    import type { IconifyIcon } from "iconify-icon";
    let {text, onclick, icon, size = "l"}: {
        text: string,
        onclick: () => void,
        icon: IconifyIcon,
        size: "s" | "l" | "xs" | "m" | "xl",
    } = $props()
</script>

<div style="align-self: center;">
    <Button
    {size}
    iconType="left"
    {onclick}
    >
        <Icon {icon} />
        {text}
    </Button>
</div>
