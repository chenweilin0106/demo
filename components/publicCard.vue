<template>
  <div class="publicCard" :class="`publicCard_${size}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    size: { default: 1 }
  }
}
</script>

<style lang="scss" scoped>
.publicCard {
  &.publicCard_1{
    width: 686px;
    height: 146px;
    background: url('@/pages/valentineDay/assets/mk1_3.png') no-repeat left top/100% 100%;
  }
  &.publicCard_2{
    -webkit-background-clip: content-box, padding-box;
    -webkit-background-origin: content-box, padding-box;
    background-image: linear-gradient(90deg, #BE72B6, #EDA6CE, #FDCBAD), -webkit-linear-gradient(#FFD3F1, #FFD3F1); // 从左到右：中心背景色，内层边框色，外层边框色
    border-radius: 16px;
    //border: 4px solid transparent; // 会有缝隙
    padding: 4px;
  }
}
</style>
