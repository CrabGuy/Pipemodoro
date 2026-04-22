<script>
    import Timer from "./Timer.svelte";
    const { ms } = $props()
</script>

<Timer
ms_left={ms}
ms_total={ms}
/>