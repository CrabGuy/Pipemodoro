<script lang="ts">
    import type { LabelType } from "$lib/Types";
    import Icon from "@iconify/svelte";
    import { Button } from "m3-svelte";
    import label_off from "@ktibow/iconset-material-symbols/label-off"

    let {
        label,
        onclick,
    }: {
        label: LabelType,
        onclick: (label: LabelType) => void
    } = $props()
</script>

<Button variant="tonal" style="width: 6rem; align-self: flex-end;" onclick={() => onclick(label)}>
    <Icon icon={label_off}></Icon>
    Delete
</Button>