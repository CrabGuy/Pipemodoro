<script>
    import ControlButton from "./ControlButton.svelte";
    import timer_off from "@ktibow/iconset-material-symbols/timer-off"
    import { cancel_timer } from "$lib/timers.svelte";
    const {client_timer_id} = $props()

</script>

<ControlButton
size="m"
text="Cancel"
icon={timer_off}
onclick={() => cancel_timer(client_timer_id)}
/>