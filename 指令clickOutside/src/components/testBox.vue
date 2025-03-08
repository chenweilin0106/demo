<template>
  <div class="div">
    <div v-if="show1" class='testBox' v-click-outside="handleBlur"></div>
    <div v-if="show2" class='testBox' v-click-outside="handleBlur"></div>
    <button @click="show1 = false">show1</button>
    <button @click="show2 = false">show2</button>
  </div>
</template>

<script>
import { clickOutside } from '@/directives'
export default {
  name: 'testBox',
  data() {
    return {
      show1: true,
      show2: true
    }
  },
  directives: { 'click-outside': clickOutside },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleBlur(num) {
      console.log('click outside', num)
    },
  }
}
</script>

<style scoped>
.testBox {
  width: 200px;
  height: 200px;
  background-color: skyblue;
}
</style>