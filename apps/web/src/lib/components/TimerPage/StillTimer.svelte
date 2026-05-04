<script>
    import Timer from "$lib/components/TimerPage/Timer.svelte";
    const { ms } = $props()
</script>

<Timer
ms_left={ms}
ms_total={ms}
/>