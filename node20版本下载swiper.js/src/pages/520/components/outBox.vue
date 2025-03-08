<template>
  <div class="outBox position-relative margin-row-center">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <img v-if="right" :src="IconPath('back_3.png')" class="rightIcon position-absolute pointer-none position-column-center" />
    <slot></slot>
    <template v-if="bottom">
      <img :src="IconPath('back_4.png')" class="bottomLeftIcon position-absolute pointer-none" />
      <img :src="IconPath('back_5.png')" class="bottomRightIcon position-absolute pointer-none" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    right: { type: Boolean, default: true },
    bottom: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  position: relative;
  width: 750px;
  min-height: 500px;
  border-image-source: url('@/pages/520/assets/mk1_1.png');
  border-image-slice: 211 0 212 0 fill;
  border-image-width: 211px 0 212px 0;
  .titleIcon {
    top: -88px;
    width: 480px;
    height: 179px;
  }
  .rightIcon {
    right: 10px;
    width: 31px;
    height: 32px;
  }
  .bottomLeftIcon {
    bottom: -88px;
    left: 33px;
    width: 86px;
    height: 86px;
  }
  .bottomRightIcon {
    right: 63px;
    bottom: -95px;
    width: 122px;
    height: 181px;
  }
}
</style>
