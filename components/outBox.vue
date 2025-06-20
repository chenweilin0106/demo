<template>
  <div class="outBox position-relative margin-row-center" :class="[title && 'hasTitle',`size-${size}`]">
    <template v-if="title">
      <img :src="IconPath(title)" class="titleIcon pointer-none position-absolute" />
      <img :src="IconPath('back_3.png')" class="leftLeaf position-absolute pointer-none" />
      <img :src="IconPath('back_4.png')" class="rightLeaf position-absolute pointer-none" />
    </template>
    <div class="main position-relative"><slot></slot></div>
    <img v-if="bottom" :src="IconPath('back_1.png')" class="bottomIcon position-row-center position-absolute pointer-none" />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    bottom: { type: Boolean, default: true },
    size: { type: String, default: '' }
    // hasCostume: { type: Boolean, default: true }
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  margin-top: 23px; /*todo 无标题顶部距离*/
  &.gradient{
    $outBorder: 3px; // 外层边框宽度
    $innerBorder: 12px; // 内层边框宽度
    $borderRadius: 0px; // 外层边框圆角
    -webkit-background-clip: content-box, padding-box, border-box;
    -webkit-background-origin: content-box, padding-box, border-box;
    background-image: -webkit-linear-gradient(#FFB383, #FFB383), -webkit-linear-gradient(#B76830, #B76830), -webkit-linear-gradient(#954212, #954212);
    border: $outBorder solid transparent;
    padding: $innerBorder;
    border-radius: $borderRadius;
    &::before{
      $gap: $outBorder + $innerBorder;
      content: '';
      position: absolute;
      top: $gap;
      right: $gap;
      left: $gap;
      bottom: $gap;
      background: #A64B3B;
      z-index: -1;
    }
  }
  &.size-1{
    width: 730px;
    min-height: 388px;
    border-image-source: url('@/pages/valentineDay/assets/mk1_1.png');
    border-image-slice: 165 0 146 0 fill;
    border-image-width: 165px 0 146px 0;
    .main{
      padding-top: 95px; /*todo 无标题顶部距离*/
      padding-bottom: 97px; /*todo 下内边距*/
    }
  }
  &.size-2{
    width: 750px;
    height: 764px;
    background: url('@/pages/valentineDay/assets/mk3_1.png') no-repeat left top/100% 100%;
  }
  &.size-3{
    @extend .gradient;
    width: 706px;
    .main{
      padding-top: 20px; /*todo 无标题顶部距离*/
      padding-bottom: 97px; /*todo 下内边距*/
    }
  }
  .titleIcon {
    z-index: 2;
    top: -108px;
    left: 108px;
    // transform: translateX(-50%);
    width: auto;
    height: 209px;
  }
  .bottomIcon {
    bottom: -177px;
    z-index: -1;
    width: 750px;
    height: 366px;
  }
  .leftLeaf {
    top: -87px;
    left: -10px;
    width: 127px;
    height: 233px;
  }
  .rightLeaf {
    top: -107px;
    right: 20px;
    width: 208px;
    height: 197px;
  }
  &.hasTitle {
    margin-top: 70px; /*todo 有标题顶部距离*/
    padding-top: 105px; /*todo 有标题顶部距离*/
  }
  &:first-child {
    margin-top: -10px; /*todo 无标题距离tab的距离*/
    &.hasTitle {
      margin-top: 65px; /*todo 有标题距离tab的距离*/
    }
  }
  &:last-child {
    .bottomIcon {
      display: none;
    }
  }
}
</style>
