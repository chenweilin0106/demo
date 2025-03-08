<template>
  <div class='layoutPage'>
    <div class="svgaBox"><PublicImg :imgName="'xc_1.svga'"></PublicImg></div>
  </div>
</template>

<script>
export default {
  name: 'layoutPage',
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang='scss'>
.layoutPage {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .svgaBox {
    width: 750px;
    height: 550px;
  }
}
</style>
