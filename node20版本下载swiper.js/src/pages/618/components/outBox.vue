<template>
  <div class="outBox position-relative margin-row-center">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <template v-if="hasCostume">
      <img :src="IconPath('back_4.png')" class="LeftTorch position-absolute pointer-none" />
      <img :src="IconPath('back_4.png')" class="rightTorch position-absolute pointer-none" />
      <img :src="IconPath('back_2.png')" class="leftStar position-absolute pointer-none" />
      <img :src="IconPath('back_3.png')" class="rightStar position-absolute pointer-none" />
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
$borderImageTopWidth: 214; // 顶部边框的高度
$borderImageBottomWidth: 100; // 底部边框的高度
$borderImageLeftWidth: 0; // 左边框的宽度
$borderImageRightWidth: 0; // 右边框的宽度
.outBox {
  position: relative;
  width: 738px;
  min-height: 400px; // 根据切图的高度来设置，一般切图会给最小高度进行拉伸
  border-image-source: url('@/pages/618/assets/mk1_1.png');
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  padding-bottom: 50px;
  .titleIcon {
    top: 80px;
    width: 300px;
    height: 50px;
    z-index: 1;
  }
  $torchPosition: 143px;
  .torch {
    top: -35px;
    z-index: -1;
    width: 74px;
    height: 306px;
  }
  .LeftTorch {
    left: $torchPosition;
    @extend .torch;
  }
  .rightTorch {
    right: $torchPosition;
    @extend .torch;
  }
  @mixin star($width, $height, $top, $left: auto, $right: auto) {
    top: $top;
    left: $left;
    right: $right;
    width: $width;
    height: $height;
  }
  .leftStar {
    @include star($width: 153px, $height: 207px, $top: -42px, $left: 33px);
  }
  .rightStar {
    @include star($width: 152px, $height: 224px, $top: -31px, $right: 18px);
  }
}
</style>
