<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content" @touchmove.prevent.stop>
        <!--标题图片-->
        <img class="title-image position-absolute position-row-center pointer-none" :src="IconPath('title_8.png')" />
        <div class="RuleText">
          <div v-for="(item, index) in textList" :key="index" class="row position-relative line-height-100">
            <span v-if="item.circle" class="circle position-absolute radius-50 position-column-center"></span>
            <p v-html="item.text" class="flex align-center flex-no-wrap text-nowrap"></p>
          </div>
        </div>
        <img :src="IconPath('tk_3.png')" class="tableImg block margin-row-center" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      textList: Object.freeze([
        { text: '活动期间每日充值任意金额可领取超值礼包，内含', circle: true },
        { text: "随机倍数的绿晶石奖励，<i style='color: #FFED77'>最高可得1000绿晶石 </i>", circle: false },
        { text: "活动首次领取超值礼包可获得<i style='color: #FFED77'>限定座驾【趣玩卡丁</i>", circle: true },
        { text: "<i style='color: #FFED77'>车】</i>+1天", circle: false },
        { text: '翻倍绿晶石概率如下：', circle: true }
      ])
    }
  },
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .popup-content {
    position: relative;
    width: 643px;
    height: 791px;
    padding-top: 75px;
    border-image-source: url('@/pages/gardenParty/assets/tk_16.png');
    border-image-slice: 84 0 82 0 fill;
    border-image-width: 84px 0 82px 0;
    .title-image {
      width: 410px;
      height: 130px;
      z-index: 3;
      top: -65px;
    }
  }
}
.RuleText {
  margin-left: 66px;
  width: 527px;
  .row {
    font-size: 24px;
    color: #fff;
    line-height: 36px;
    .circle {
      left: -30px;
      width: 12px;
      height: 12px;
      background: #ffec95;
    }
    ::v-deep img {
      flex-shrink: 0;
      width: 43px;
      height: 42px;
    }
  }
}
.tableImg {
  margin-top: 20px;
  width: 554px;
  height: 438px;
}
</style>
