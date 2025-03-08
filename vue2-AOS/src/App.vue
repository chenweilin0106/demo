<template>
  <div id="app">
    <ScorllBox></ScorllBox>
  </div>
</template>

<script>
import ScorllBox from './components/scrollBox.vue'
export default {
  name: 'App',
  components: {
    ScorllBox
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
