<template>
  <div class="content">
    <div v-if="rightSide" class="right-side-icon"></div>
    <!-- 标题图片 -->
    <img class="title" v-if="title" :src="IconPath(title)" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'rightSide']
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 720px;
  height: fit-content;
  border-image-source: url('@/pages/skillGift/assets/mk1_9.png');
  border-image-slice: 30 28 30 28 fill;
  border-image-width: 30px 28px 30px 28px;
  .right-side-icon {
    position: absolute;
    right: -4px;
    width: 15px;
    height: 164px;
    background: url('@/pages/skillGift/assets/back_1.png') no-repeat left
      top/100% 100%;
  }
  // 标题图片
  .title {
    position: absolute;
    left: 50%;
    top: -48px;
    transform: translateX(-50%);
    width: 524px;
    height: 99px;
  }
}
</style>
