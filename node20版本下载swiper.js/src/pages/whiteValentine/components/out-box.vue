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
  width: 750px;
  height: fit-content;
  border-image-source: url('@/pages/whiteValentine/assets/mian_bg.png');
  border-image-slice: 610 0 75 0 fill;
  border-image-width: 610px 0 75px 0;

  // 标题图片
  .title {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 68px;
    transform: translateX(-50%);
    width: 441px;
    height: 92px;
  }
}
</style>
