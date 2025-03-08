<template>
  <div class="outBox position-relative margin-row-center">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <img v-if="bottom" :src="IconPath('back_2.png')" class="bottomIcon position-absolute pointer-none" />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    bottom: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  position: relative;
  width: 718px;
  min-height: 375px;
  border-image-source: url('@/pages/dragonBoat/assets/mk1_1.png');
  border-image-slice: 83 0 83 0 fill;
  border-image-width: 83px 0 83px 0;
  .titleIcon {
    top: -86px;
    width: 462px;
    height: 140px;
    z-index: 1;
  }
  .bottomIcon {
    width: 100%;
    height: auto;
    bottom: -195px;
    left: 0;
    z-index: -1;
  }
}
</style>
