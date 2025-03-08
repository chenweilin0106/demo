<template>
  <div class="content">
    <!--<div class="line-test"></div>-->
    <!-- 标题图片 -->
    <img v-if="title" class="title pointer-none" :src="IconPath(title)" />
    <img
      v-if="flower"
      :src="IconPath('back_1.png')"
      class="flower pointer-none"
    />
    <img
      v-if="candle"
      :src="IconPath('back_5.png')"
      class="candle pointer-none"
    />
    <img
      v-if="necklace"
      :src="IconPath('back_4.png')"
      class="necklace pointer-none"
    />
    <img
      v-for="(petal, index) in petalsArray"
      :key="index"
      :src="IconPath(petalObject[petal])"
      :class="['petal', 'pointer-none', petal]"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'flower', 'candle', 'petalsArray', 'necklace'],
  data() {
    return {
      petalObject: Object.freeze({
        'petal-1': 'back_2.png',
        'petal-2': 'back_3.png',
        'petal-3': 'back_6.png',
        'petal-4': 'back_7.png',
        'petal-5': 'back_8.png'
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 盒子主题
.content {
  position: relative;
  margin: 0 auto;
  width: 738px;
  height: fit-content;
  border-image-source: url('@/pages/womenDay/assets/mk1_1.png');
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
    top: -98px;
    transform: translateX(-50%);
    width: 593px;
    height: 176px;
  }

  .flower {
    position: absolute;
    z-index: -1;
    left: 50%;
    top: -176px;
    transform: translateX(-50%);
    width: 750px;
    height: 304px;
  }

  .candle {
    position: absolute;
    z-index: 3;
    top: -113px;
    right: -6px;
    width: 187px;
    height: 363px;
  }

  .necklace {
    position: absolute;
    bottom: -300px;
    left: -6px;
    z-index: -1;
    width: 531px;
    height: 392px;
  }

  .petal {
    position: absolute;
  }

  .petal-1 {
    width: 503px;
    height: 188px;
  }

  .petal-2 {
    width: 260px;
    height: 235px;
  }

  .petal-3 {
    width: 86px;
    height: 129px;
  }

  .petal-4 {
    width: 31px;
    height: 28px;
  }

  .petal-5 {
    width: 138px;
    height: 121px;
  }
}
</style>
