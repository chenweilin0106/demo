<template>
  <div class="outBox position-relative margin-row-center" :class="bottomGap && 'bottomGap'">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <template v-if="hasCostume">
      <img :src="IconPath('back_2.png')" class="bottomIcon position-row-center position-absolute pointer-none" />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    hasCostume: { type: Boolean, default: false },
    bottomGap: { type: Boolean, default: true } // todo 是否需要底部边距 一般最底部的不需要
  }
}
</script>

<style lang="scss" scoped>
$borderImageTopWidth: 192; /*todo 顶部边框的高度*/
$borderImageBottomWidth: 290; /*todo 底部边框的高度*/
$borderImageLeftWidth: 0; /*todo 左边框的宽度*/
$borderImageRightWidth: 0; /*todo 右边框的宽度*/
.outBox {
  position: relative;
  width: 723px; /*todo 宽度*/
  border-image-source: url('@/pages/qiXi/assets/mk1_1.png'); /*todo*/
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  padding-top: 115px; /*todo 上内边距*/
  padding-bottom: 88.5px; /*todo 下内边距*/
  .titleIcon {
    top: -85px;
    width: auto;
    height: 173px;
    z-index: 1;
  }
  .bottomIcon {
    bottom: -166px;
    z-index: -1;
    width: 750px;
    height: 424px;
  }
}
.bottomGap {
  margin-bottom: 102px; /*todo 下外边距 */
}
</style>
