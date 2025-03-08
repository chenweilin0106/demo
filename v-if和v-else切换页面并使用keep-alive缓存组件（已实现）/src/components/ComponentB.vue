<template>
    <div>
        <h1>Component B</h1>
    </div>
</template>

<script>
export default {
    name: 'ComponentB',
    destroyed() {
        console.log('ComponentB destroyed')
    }
}
</script>

<style>

</style>