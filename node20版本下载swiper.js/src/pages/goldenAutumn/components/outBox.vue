<template>
  <div class="outBox position-relative margin-row-center" :class="title && 'hasTitle'">
    <template v-if="title">
      <img :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
      <img :src="IconPath('back_1.png')" class="leftLeaf position-absolute pointer-none" />
      <img :src="IconPath('back_2.png')" class="rightLeaf position-absolute pointer-none" />
    </template>
    <div class="main"><slot></slot></div>
    <img v-if="bottom" :src="IconPath('back_3.png')" class="bottomIcon position-row-center position-absolute pointer-none" />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    bottom: { type: Boolean, default: true }
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
  width: 716px; /*todo 宽度*/
  //border-image-source: url('@/pages/goldenAutumn/assets/mk1_1.png');
  //border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  //border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  -webkit-background-clip: content-box, padding-box, border-box;
  -webkit-background-origin: content-box, padding-box, border-box;
  background-image: -webkit-linear-gradient(90deg, #FFF7CF, #FFFAE9), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#FFBB48, #FFBB48);
  border-radius: 88px 88px 38px 38px;
  border: 8px solid transparent;
  padding: 4px;
  //margin-bottom: 96px; /*todo 下外边距 */
  margin-top: 42px; /*todo 无标题距离tab的距离*/
  //.leftLeaf {}
  .main {
    width: 100%;
    height: 100%;
    padding-top: 33px; /*todo 无标题顶部距离*/
    padding-bottom: 28px; /*todo 下内边距*/
  }
  &.hasTitle {
    margin-top: 107px; /*todo 有标题距离tab的距离*/
    .main {
      padding-top: 54px; /*todo 有标题顶部距离*/
    }
  }
  .titleIcon {
    top: -88px;
    width: auto;
    height: 133px;
    z-index: 1;
  }
  .bottomIcon {
    bottom: -162px;
    z-index: -1;
    width: 750px;
    height: 190px;
  }
  .leftLeaf {
    top: -56px;
    left: -23px;
    width: 177px;
    height: 157px;
  }
  .rightLeaf {
    top: -101px;
    right: -10px;
    width: 161px;
    height: 208px;
  }
  //&:first-child {
  //  margin-top: 42px; /*todo 无标题距离tab的距离*/
  //  //.leftLeaf {}
  //  &.hasTitle {
  //    margin-top: 107px; /*todo 有标题距离tab的距离*/
  //  }
  //}
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
    margin-bottom: 46px;
    .bottomIcon {
      display: none;
    }
  }
}
</style>
