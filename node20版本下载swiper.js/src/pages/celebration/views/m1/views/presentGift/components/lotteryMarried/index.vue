<template>
  <OutBox class="lotteryMarried" title="mk1_title_6.png">
    <p class="flex justify-center line-height-100">每日0点随机抽取<i>10对</i>当天新婚CP双方赠送</p>
    <div class="award flex-column margin-row-center position-relative">
      <div class="icon flex align-center justify-center"><PublicImg :imgName="'yyjz_120_120.png'" /></div>
      <div class="text flex-1 flex align-center justify-center line-height-100">戒指+1</div>
      <div class="priceLabel position-absolute line-height-100 flex align-center justify-center">520<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
    </div>
    <img :src="IconPath('mk2_10.png')" class="winningBtn position-absolute" @click="isShowWinningPopup = true" />
    <WinningPopup v-if="isShowWinningPopup" @clickClose="isShowWinningPopup = false" />
  </OutBox>
</template>

<script>
const WinningPopup = () => import('./winningPopup.vue')
export default {
  name: 'lotteryMarried', // 新婚加赠
  props: [''],
  components: { WinningPopup },
  data() {
    return {
      timer: null,
      isShowWinningPopup: false
    }
  },
  created() {
    this.startCountdown()
  },
  watch: {},
  computed: {},
  methods: {
    // 清除定时器
    clearTimer() {
      clearTimeout(this.timer)
      this.timer = null
    },
    // 0点倒计时
    startCountdown() {
      const now = new Date() // 当前时间
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999) // 当天结束时间
      const remainingTime = endOfDay - now // 计算剩余时间
      this.timer = setTimeout(() => {
        this.$emit('update')
        this.clearTimer()
      }, remainingTime)
    }
  },
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style lang="scss" scoped>
.lotteryMarried {
  border-image-source: none !important;
  background: url('@/pages/celebration/assets/mk3_7.png') no-repeat left top/100% 100%;
  width: 742px;
  height: 489px;
  p {
    margin-bottom: 29px;
    font-weight: bold;
    font-size: 28px;
    color: #6E56E7;
    i {
      color: #F552AE;
    }
  }
  .award {
    $radius: 12px; /*todo 圆角*/
    $borderWidth: 4px; /*todo 边框宽度*/
    width: 160px + $borderWidth * 2; /*todo 宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
    height: 160px + $borderWidth * 2; /*todo 高度 蓝湖上选区不包括边框 所以加上边框宽度*/
    background-color: #BDA2FA; /*todo 边框颜色*/
    border-radius: 12px + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
    padding: $borderWidth;
    .icon {
      width: 100%;
      height: 112px;
      background: linear-gradient(0deg, #FFFFFF, #EECEFF);
      border-radius: $radius $radius 0 0;
      .mic {
        width: 102px;
        height: 105px;
      }
    }
    .text {
      width: 100%;
      font-size: 28px;
      background-color: #7954E4; /*todo 文字背景色*/
      border-radius: 0 0 $radius $radius;
    }
    .priceLabel {
      top: -14px;
      right: -14px;
      padding: 10px;
      height: 34px;
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 17px;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
      .diamond {
        width: 27px;
        height: 20px;
      }
    }
  }
  .winningBtn {
    width: 158px;
    height: 48px;
    top: 320px;
    right: 42px;
  }
}
</style>
