<template>
  <div class="content">
    <!-- 标题图片 -->
    <img v-if="title" class="titleImg pointer-none" :src="IconPath(title)" />
    <img v-if="balloon" :src="IconPath('back_3.png')" class="leftBalloon position-absolute pointer-none" />
    <img v-if="balloon" :src="IconPath('back_4.png')" class="rightBalloon position-absolute pointer-none" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'bowKnot', 'balloon']
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 547px;
  height: fit-content;
  border-image-source: url('@/pages/gardenParty/assets/tk_17.png');
  border-image-slice: 100 0 110 0 fill;
  border-image-width: 100px 0 110px 0;
  .leftBalloon {
    position: absolute;
    left: -110px;
    top: -40px;
    width: 182px;
    height: 577px;
  }
  .rightBalloon {
    right: -110px;
    top: 0px;
    width: 191px;
    height: 373px;
  }

  // 标题图片
  .titleImg {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: -61px;
    transform: translateX(-50%);
    width: 410px;
    height: 130px;
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
