<template>
  <div class="publicContainer position-relative margin-row-center">
    <img v-if="titleIcon" :src="IconPath(titleIcon)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <img v-if="bubbleIcon" :src="IconPath('bg_1.png')" class="bubbleIcon position-absolute" />
  </div>
</template>

<script>
export default {
  props: {
    titleIcon: { type: String, default: '' },
    bubbleIcon: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss" scoped>
.publicContainer {
  position: relative;
  margin: 0 auto;
  width: 748px;
  height: fit-content;
  border-image-source: url('@/pages/mayDay2024/assets/mk1_bg_2.png');
  border-image-slice: 321 0 48 0 fill;
  border-image-width: 321px 0 48px 0;
  .titleIcon {
    top: -7px;
    width: 350px;
    height: 91px;
  }
  .bubbleIcon {
    bottom: -190px;
    left: 0;
    z-index: -1;
    width: 749px;
    height: 407px;
  }
}
</style>
