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
  border-image-source: url('@/pages/sparParty/assets/mk1_bg_1.png');
  border-image-slice: 28 28 28 28 fill;
  border-image-width: 28px 28px 28px 28px;
  padding: 36px 0;
  // 标题图片
  .title {
    position: absolute;
    left: 50%;
    top: -36px;
    transform: translateX(-50%);
    //width: 741px;
    height: 81px;
  }
}
</style>
