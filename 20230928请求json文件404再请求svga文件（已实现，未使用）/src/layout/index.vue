<template>
  <div class="layoutPage">
    <div class="json-box">
      <public-json
        v-if="animationType == 'json'"
        jsonName="ch_mdjh"
        @fail="animationType = 'svga'"
      />
      <public-svga v-else svgaName="ch_mdjh" />
    </div>
  </div>
</template>

<script>
import PublicJson from '../components/PublicJson.vue'
import PublicSvga from '../components/PublicSvga.vue'
export default {
  name: 'layoutPage',
  data() {
    return {
      animationType: 'json'
    }
  },
  components: {
    PublicJson,
    PublicSvga
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.layoutPage {
  position: relative;
  margin: 0 auto;
  width: 735px;
  height: 1542px;
  background: linear-gradient(180deg, #7b87fd, #7070f9);
  border-radius: 50px;
  .json-box {
    width: 120px;
    height: 120px;
    background: linear-gradient(0deg, #8fbbff, #797cff);
    border-radius: 20px;
  }
}
</style>
