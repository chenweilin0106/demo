<template>
  <div class="outBox margin-row-center" :class="title && 'hasTitle'">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <div :class="`icon_${bottomIcon}`" class="bottomIcon position-row-center position-absolute pointer-none"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    bottomIcon: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>
$borderImageTopWidth: 332;
$borderImageBottomWidth: 159;
$borderImageLeftWidth: 0;
$borderImageRightWidth: 0;
.outBox {
  position: relative;
  //z-index: 1;
  width: 750px;
  border-image-source: url('@/assets/mk1_1.png');
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  padding-top: 184px;
  padding-bottom: 75px;
  margin-bottom: 4px;
  .titleIcon {
    top: 40px;
    width: auto;
    height: 104px;
    z-index: 1;
  }
  .bottomIcon,
  .topIcon {
    z-index: -1;
    &.icon_1 {
      bottom: -280px;
      width: 750px;
      height: 401px;
      background: url('@/assets/back_2.png') no-repeat left top/100% 100%;
    }
    &.icon_2 {
      bottom: -156px;
      width: 750px;
      height: 400px;
      background: url('@/assets/back_3.png') no-repeat left top/100% 100%;
    }
  }
  &:first-child {
    margin-top: -210px;
  }
  &:last-child {
    margin-bottom: 0;
    .bottomIcon {
      display: none;
    }
  }
}
</style>
