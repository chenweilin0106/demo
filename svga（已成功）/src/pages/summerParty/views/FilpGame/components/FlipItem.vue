<template>
  <div
    class="FlipItem"
    ref="FlipItem"
    @click="handleFlip"
    :class="{ flip: isFlip, alreadyFlip: !isFlip && flip_data.open_status }"
    @animationend="FlipEnd"
  >
    <!-- 背面 -->
    <div class="Card front" />
    <!-- 正面 -->
    <div
      ref="cardBack"
      class="Card back"
      :class="{ specialBack: flip_data.times >= 10 }"
    >
      <!-- 倍数 -->
      <img
        v-if="flip_data.open_status"
        :src="IconPath(`sz_${flip_data.times}.png`)"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlipItem',
  props: ['flip_data'],
  data() {
    return {
      isFlip: false // 是否翻转
    }
  },
  computed: {},
  methods: {
    onFlip() {
      // 翻牌
      this.isFlip = true
    },
    offFlip() {
      // 重置翻牌
      this.isFlip = false
      this.$refs.FlipItem.classList.remove('back_front')
    },
    FlipEnd() {
      // 翻牌结束
      this.$refs.FlipItem.classList.add('back_front')
      this.$emit('flipEnd')
    },
    handleFlip() {
      // 发送翻牌请求
      this.$emit('handleFlip')
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes CardRotate {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
}
// 翻牌动画类名
.flip {
  animation: CardRotate 0.6s;
  // transform: rotateY(180deg); // 点击容器，翻转图片
}
.FlipItem {
  width: 108px;
  height: 133px;
  position: relative;
  transform-style: preserve-3d; // 开启3D透视
  backface-visibility: hidden;
  // transition: 1s all;
  .Card {
    left: 0;
    top: 0;
    position: absolute; // 绝对定位，两张图片要重叠在一块
    backface-visibility: hidden; // 隐藏div背后的显示
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .front {
    background: url('../../../assets/mk5_7.png') no-repeat top center/100% auto;
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../../../assets/mk5_7_1.png') no-repeat top center/100%
      auto;

    // background-image: url('back.png');
    transform: rotateY(
      180deg
    ); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
    img {
      margin-top: 20px;
      width: 80%;
    }
  }
}
// // 已完成翻转
// .finishFlip {
//   transform: rotateY(0deg);
// }
// 牌面向前
.back_front {
  transform: rotateY(180deg);
}
.alreadyFlip {
  transform: rotateY(180deg);
}
.specialBack {
  background: url('../../../assets/mk5_7_2.png') no-repeat top center/100% auto !important;
}
</style>
