<template>
    <div id="app">
        <ListItem v-for="item in 5" :key="item" :index="item"></ListItem>
    </div>
</template>

<script>
import ListItem from './components/ListItem.vue'
export default {
    name: 'App',
    components: {
        ListItem
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
