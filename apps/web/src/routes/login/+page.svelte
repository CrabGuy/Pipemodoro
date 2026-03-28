<script>
    import { TextFieldOutlined, Button } from "m3-svelte";
</script>

<div class="main_container" style="align-self: center;">
    <h1 style="align-self: center;">
        Welcome back!
    </h1>
    <TextFieldOutlined label="Username"></TextFieldOutlined>
    <TextFieldOutlined label="Password" type="Password"></TextFieldOutlined>
    <div style="align-self: center;"><Button size="m">Login</Button></div>
</div>

<style>
    .main_container {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 60vw;
        height: 40vh;
    }
</style>
