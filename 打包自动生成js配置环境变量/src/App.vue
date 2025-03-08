<template>
    <div id="app">
        <h1>{{ appTest }}</h1>
        <h2>{{ appTest2 }}</h2>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            appTest: window.config.VUE_APP_TEST,
            appTest2: window.config.VUE_APP_TEST2
        }
    },
    mounted() {
        console.log(process.env)
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
