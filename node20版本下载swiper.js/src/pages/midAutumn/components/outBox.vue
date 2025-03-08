<template>
  <div class="outBox position-relative margin-row-center" :class="title && 'hasTitle'">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <!--<template v-if="hasCostume">-->
    <img :src="IconPath('back_2.png')" class="bottomIcon position-row-center position-absolute pointer-none" />
    <!--</template>-->
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
    // hasCostume: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss" scoped>
$borderImageTopWidth: 252; /*todo 顶部边框的高度*/
$borderImageBottomWidth: 179; /*todo 底部边框的高度*/
$borderImageLeftWidth: 0; /*todo 左边框的宽度*/
$borderImageRightWidth: 0; /*todo 右边框的宽度*/
.outBox {
  position: relative;
  width: 714px; /*todo 宽度*/
  border-image-source: url('@/pages/midAutumn/assets/mk1_1.png');
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  padding-top: 110px; /*todo 上内边距*/
  padding-bottom: 80px; /*todo 下内边距*/
  margin-bottom: 112px; /*todo 下外边距 */
  .titleIcon {
    top: -111px;
    width: auto;
    height: 195px;
    z-index: 1;
  }
  .bottomIcon {
    bottom: -263px;
    z-index: -1;
    width: 750px;
    height: 431px;
  }
  &:first-child {
    margin-top: -124px; /*todo 无标题距离tab的距离*/
    &.hasTitle {
      margin-top: -30px; /*todo 有标题距离tab的距离*/
    }
  }
  &:last-child {
    margin-bottom: 0;
    .bottomIcon {
      display: none;
    }
  }
}
</style>
