<template>
    <div>
        <h1>Component A</h1>
    </div>
</template>

<script>
export default {
    name: 'ComponentA',
    activated() {
        console.log('ComponentA activated')
    },
    deactivated() {
        console.log('ComponentA deactivated')
    },
    destroyed() {
        console.log('ComponentA destroyed')
    }
}
</script>

<style>

</style>