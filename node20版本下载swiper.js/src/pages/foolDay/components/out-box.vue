<template>
  <div class="content">
    <!-- 标题图片 -->
    <img v-if="title" class="title pointer-none" :src="IconPath(title)" />
    <img v-if="star" :src="IconPath('back_2.png')" class="star pointer-none" />
    <img v-if="colouredRibbon" :src="IconPath('back_3.png')" class="colouredRibbon pointer-none" />
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
  width: 738px;
  height: fit-content;
  border-image-source: url('@/pages/foolDay/assets/mk1_1.png');
  border-image-slice: 174 0 192 0 fill;
  border-image-width: 174px 0 192px 0;

  //.line-test {
  //  position: absolute;
  //  z-index: -1;
  //  top: 174px;
  //  left: 50%;
  //  transform: translateX(-50%);
  //  width: 680px;
  //  height: 30px;
  //  background-color: #f5eed9;
  //}

  // 标题图片
  .title {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: -48px;
    transform: translateX(-50%);
    width: 695px;
    height: 172px;
  }

  .star {
    position: absolute;
    z-index: -1;
    left: 24px;
    top: -121px;
    width: 229px;
    height: 164px;
  }

  .colouredRibbon {
    position: absolute;
    z-index: 3;
    top: -151px;
    right: 4px;
    width: 211px;
    height: 291px;
  }
}
</style>
