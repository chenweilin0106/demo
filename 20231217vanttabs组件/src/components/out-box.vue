<template>
  <div class="content">
    <!-- 标题图片 -->
    <img class="title" v-if="title" :src="IconPath(title)" />
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
  width: 720px;
  height: fit-content;
  border-image-source: url('@/assets/mk1_1.png');
  border-image-slice: 48 26 48 26 fill;
  border-image-width: 48px 26px 48px 26px;
  // 标题图片
  .title {
    position: absolute;
    left: 50%;
    top: -87px;
    transform: translateX(-50%);
    width: 486px;
    height: 170px;
  }
}
</style>
