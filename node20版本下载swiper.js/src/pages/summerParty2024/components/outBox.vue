<template>
  <div class="outBox position-relative margin-row-center">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <template v-if="hasCostume">
      <img :src="IconPath('back_2.png')" class="topIcon position-absolute" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    hasCostume: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss" scoped>
$borderImageTopWidth: 263; // 顶部边框的高度
$borderImageBottomWidth: 321; // 底部边框的高度
$borderImageLeftWidth: 0; // 左边框的宽度
$borderImageRightWidth: 0; // 右边框的宽度
.outBox {
  position: relative;
  width: 738px;
  min-height: 400px; // 根据切图的高度来设置，一般切图会给最小高度进行拉伸
  border-image-source: url('@/pages/summerParty2024/assets/mk1_1.png');
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  padding-bottom: 75px;
  //overflow: hidden;
  .titleIcon {
    top: -68px;
    // width: 413px;
    height: 149px;
    z-index: 1;
  }
  @mixin moreCostume($width, $height, $top, $left: auto, $right: auto) {
    top: $top;
    left: $left;
    right: $right;
    width: $width;
    height: $height;
  }
  .topIcon {
    @include moreCostume($width: 750px, $height: 253px, $top: -135px, $left: 50%);
    transform: translateX(-50%);
    pointer-events: none;
  }
}
</style>
