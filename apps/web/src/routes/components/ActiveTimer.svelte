<script>
    import Timer from "./Timer.svelte";
    import { tweened } from "svelte/motion";
    
    let { created_at, ends_at, on_expire } = $props()

    const ms_total = $derived(ends_at - created_at)
    let ms_left = $state(0)

    $effect(() => {
        let raf

        const tick = () => {
            ms_left = ends_at - Date.now()
            
            if (ms_left <= 0) {
                on_expire()
            }

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