<script>
    import { Button, Icon } from "m3-svelte";
    import timer_play from "@ktibow/iconset-material-symbols/timer-play"
    let {text, onclick, icon, size = "l"} = $props()
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
