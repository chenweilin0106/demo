<template>
    <div id="app">
        <button @click="id = id === 'A' ? 'B' : 'A'">切换</button>
        <keep-alive include="ComponentA">
            <component :is="`Component${id}`"></component>
        </keep-alive>
    </div>
</template>

<script>
const ComponentA = () => import('./components/ComponentA.vue')
const ComponentB = () => import('./components/ComponentB.vue')
export default {
    name: 'App',
    components: { ComponentA, ComponentB },
    data() {
        return {
            id: 'A'
        }
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
