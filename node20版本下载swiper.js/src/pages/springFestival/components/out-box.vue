<template>
  <div class="out-box">
    <img class="title" v-if="title" :src="IconPath(title)" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'out-box',
  props: ['title']
}
</script>

<style scoped lang="scss">
.out-box {
  position: relative;
  z-index: 2;
  margin: 0 auto;
  width: 710px;
  border-image-source: url('@/pages/springFestival/assets/mk1_1.png');
  border-image-slice: 61 61 61 61 fill;
  border-image-width: 61px 61px 61px 61px;
  .title {
    position: absolute;
    width: 614px;
    height: 191px;
    top: -139px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
