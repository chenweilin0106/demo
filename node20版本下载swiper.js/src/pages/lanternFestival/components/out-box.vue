<template>
  <div class="content">
    <!-- 标题图片 -->
    <img v-if="title" class="title" :src="IconPath(title)" />
    <img v-else :src="IconPath('mk1_1.png')" class="top-icon" />
    <img :src="IconPath('mk1_2.png')" class="bottom-icon" />
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
  border-image-source: url('@/pages/lanternFestival/assets/mk1_bg_1.png');
  border-image-slice: 20 12 20 12 fill;
  border-image-width: 20px 12px 20px 12px;
  // 标题图片
  .title {
    position: absolute;
    z-index: 3;
    left: 50%;
    top: -70px;
    transform: translateX(-50%);
    width: 742px;
    height: 126px;
  }

  .top-icon {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 742px;
    height: 56px;
    pointer-events: none;
  }

  .bottom-icon {
    position: absolute;
    z-index: 1;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 742px;
    height: 56px;
    pointer-events: none;
  }
}
</style>
