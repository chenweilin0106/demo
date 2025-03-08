<template>
  <div
    class="FlipItem"
    ref="FlipItem"
    @click="handleFlip"
    :class="{ flip: isFlip, alreadyFlip: !isFlip && awardData.icon }"
    @animationend="FlipEnd"
  >
    <!-- 牌背 -->
    <div class="Card front" />
    <!-- 牌面 -->
    <div ref="cardBack" class="Card back">
      <img v-if="awardData.icon" :src="IconPath(awardData.icon)" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlipItem',
  props: ['awardData'],
  data() {
    return {
      isFlip: false // 是否翻转
    }
  },
  computed: {},
  watch: {
    awardData: {
      handler(val) {
        // 当icon发生变化，请求回来数据更新，进行翻转
        if (val.icon) {
          this.isFlip = true
          console.log('数据更新，进行翻转')
        }
      },
      deep: true
    }
  },
  methods: {
    FlipEnd() {
      console.log('翻牌动画结束')
      this.$refs.FlipItem.classList.add('back_front')
    },
    handleFlip() {
      // 如果已经翻转，就不再翻转
      if (this.awardData.icon) return
      // 如果动画正在进行，就不再翻转
      if (!this.isFlip) {
        console.log('点击翻牌，发送请求')
        // 发送请求
        this.$emit('handleFlip', this.awardData.id)
      }
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
  width: 100px;
  height: 120px;
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
    background: red;
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    // background-image: url('back.png');
    transform: rotateY(
      180deg
    ); // 反面的图片要翻转过来，这样在翻转到部分的时候就能看到背面的图片
    img {
      width: 100%;
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
</style>
