<template>
  <div class="content">
    <div v-if="topIcon" class="top-side-icon"></div>
    <!-- 标题图片 -->
    <img v-if="title" class="title" :src="IconPath(title)" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'topIcon']
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 720px;
  height: fit-content;
  border-image-source: url('@/pages/leanYear/assets/mk1_9.png');
  border-image-slice: 26 26 26 26 fill;
  border-image-width: 26px 26px 26px 26px;
  .top-side-icon {
    position: absolute;
    z-index: 2;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 732px;
    height: 36px;
    background: url('@/pages/leanYear/assets/back_1.png') no-repeat left
      top/100% 100%;
  }
  // 标题图片
  .title {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: -59px;
    transform: translateX(-50%);
    width: 732px;
    height: 90px;
  }
}
</style>
