<script>
    import { SelectOutlined } from "m3-svelte";
    
    let selected_label = $state("Work")
    let {labels = $bindable([])} = $props()

    $effect(() => {
        labels = selected_label
            .split(",")
            .map((label) => label.split(" ").filter((v) => v.length > 0).join("_"))
    })
</script>

<!-- TODO: make this query the labels database -->
<SelectOutlined label="Labels" bind:value={selected_label} options={[
    {"text": "Work"},
    {"text": "Homework"},
    {"text": "Passion project"}
]}></SelectOutlined>