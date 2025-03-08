<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from '@/layout/index.vue'
export default {
  name: 'App',
  components: { Layout }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  overscroll-behavior-y: none;
}
</style>
