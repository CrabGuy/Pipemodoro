<script lang="ts">
    import Timer from "./Timer.svelte";
    
    let { 
        created_at,
        ends_at,
        on_expire
    }: {
        created_at: number,
        ends_at: number,
        on_expire: () => void
    } = $props()

    const ms_total = $derived(ends_at - created_at)

    // svelte-ignore state_referenced_locally
    let ms_left = $state(ends_at - Date.now())

    $effect(() => {
        let raf: number

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