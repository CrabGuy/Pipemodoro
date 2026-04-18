<script>
    import Timer from "./Timer.svelte";
    
    const { created_at, ends_at } = $props()

    const ms_total = $derived(ends_at - created_at)
    let ms_left = $state(0)

    $effect(() => {
        let raf

        const tick = () => {
            ms_left = ends_at - Date.now()

            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        
        return () => cancelAnimationFrame(raf)
    })
</script>

<Timer
{ms_total}
{ms_left}
></Timer>