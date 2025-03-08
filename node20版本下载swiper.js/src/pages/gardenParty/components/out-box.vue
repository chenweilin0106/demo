<template>
  <div class="content">
    <!-- 标题图片 -->
    <img v-if="bowKnot" :src="IconPath('back_2.png')" class="bowKnot position-absolute pointer-none" />
    <img v-if="title" class="title pointer-none" :src="IconPath(title)" />
    <img v-if="leftBalloon" :src="IconPath('back_3.png')" class="leftBalloon position-absolute pointer-none" />
    <img v-if="rightBalloon" :src="IconPath('back_4.png')" class="rightBalloon position-absolute pointer-none" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'bowKnot', 'leftBalloon', 'rightBalloon']
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 728px;
  height: fit-content;
  border-image-source: url('@/pages/gardenParty/assets/mk1_1.png');
  border-image-slice: 100 0 110 0 fill;
  border-image-width: 100px 0 110px 0;
  // 蝴蝶结
  .bowKnot {
    top: -48px;
    left: -11px;
    width: 195px;
    height: 149px;
  }
  .leftBalloon {
    left: -11px;
    top: -140px;
    width: 182px;
    height: 577px;
  }
  .rightBalloon {
    right: -11px;
    top: -197px;
    width: 191px;
    height: 373px;
  }
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
