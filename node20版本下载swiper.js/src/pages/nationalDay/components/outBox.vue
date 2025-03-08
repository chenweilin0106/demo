<template>
  <div class="outBox position-relative margin-row-center" :class="title && 'hasTitle'">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
    <img :src="IconPath('back_3.png')" class="leftBamboo position-absolute" />
    <img :src="IconPath('back_2.png')" class="rightBamboo position-absolute" />
    <img :src="IconPath('back_4.png')" class="bottomIcon position-row-center position-absolute pointer-none" />
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
$borderImageTopWidth: 300; /*todo 顶部边框的高度*/
$borderImageBottomWidth: 300; /*todo 底部边框的高度*/
$borderImageLeftWidth: 0; /*todo 左边框的宽度*/
$borderImageRightWidth: 0; /*todo 右边框的宽度*/
.outBox {
  width: 714px; /*todo 宽度*/
  border-image-source: url('@/pages/nationalDay/assets/mk1_1.png');
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  padding-top: 110px; /*todo 上内边距*/
  padding-bottom: 80px; /*todo 下内边距*/
  margin-bottom: 110px; /*todo 下外边距 */
  .titleIcon {
    top: -110px;
    width: auto;
    height: 185px;
    z-index: 1;
  }
  .bottomIcon {
    bottom: -110px;
    z-index: -1;
    width: 750px;
    height: 431px;
  }
  &:first-child {
    margin-top: -25px; /*todo 无标题距离tab的距离*/
    &.hasTitle {
      margin-top: 69px; /*todo 有标题距离tab的距离*/
    }
  }
  .leftBamboo {
    z-index: -1;
    display: none;
    top: -74px;
    left: -18px;
    width: 705px;
    height: 339px;
  }
  .rightBamboo {
    z-index: -1;
    display: none;
    top: -142px;
    right: -18px;
    width: 720px;
    height: 339px;
  }
  &:nth-child(2) {
    .rightBamboo {
      display: block;
    }
  }
  &:nth-child(3) {
    .leftBamboo {
      display: block;
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
