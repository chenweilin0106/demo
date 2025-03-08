<template>
  <div class="content">
    <!-- 标题图片 -->
    <img v-if="title" class="title pointer-none" :src="IconPath(title)" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 726px;
  height: fit-content;
  border-image-source: url('@/pages/qingMing/assets/mk1_bg_1.png');
  border-image-slice: 70 0 70 0 fill;
  border-image-width: 70px 0 70px 0;

  // 标题图片
  .title {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: -68px;
    transform: translateX(-50%);
    width: 642px;
    height: 130px;
  }
}
</style>
