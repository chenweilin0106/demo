<template>
  <div id="app">
    <TestBox></TestBox>
  </div>
</template>

<script>
import TestBox from './components/testBox.vue'
export default {
  name: 'App',
  components: { TestBox },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
