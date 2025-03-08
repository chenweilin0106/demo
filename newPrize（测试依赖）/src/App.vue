<template>
  <div id="app" style="width: 100%;overflow-x: hidden;">
    <index></index>
  </div>
</template>

<script>
import index from './index'
export default {
  components: { index },
  name: 'App',
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}
</style>
