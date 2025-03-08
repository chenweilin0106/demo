<template>
  <div class="outBox position-relative margin-row-center">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  position: relative;
  width: 750px;
  border-image-source: url('@/pages/crazyEgg/assets/mk2_bg_1.png');
  border-image-slice: 129 0 75 0 fill;
  border-image-width: 129px 0 75px 0;
  .titleIcon {
    top: -44px;
    width: 685px;
    height: 173px;
  }
}
</style>
