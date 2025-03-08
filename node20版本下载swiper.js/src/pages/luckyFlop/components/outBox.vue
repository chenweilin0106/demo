<template>
  <div :class="['content', title?'haveTitle':null]">
    <!-- 标题图片 -->
    <img v-if="title" class="title pointer-none" :src="IconPath(title)" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'star', 'colouredRibbon']
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 745px;
  min-height: 800px;
  // height: 2000px;
  border-image-source: url('@/pages/luckyFlop/assets/mk1_bg_1.png');
  border-image-slice: 300 0 200 0 fill;
  border-image-width: 300px 0 200px 0;
  padding: 60px 0 100px 0;
  &.haveTitle{
    margin-top: 40px;
    padding: 100px 0 100px 0;
  }
  // 标题图片
  .title {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: -48px;
    transform: translateX(-50%);
    width: 716px;
    height: 150px;
  }
}
</style>
