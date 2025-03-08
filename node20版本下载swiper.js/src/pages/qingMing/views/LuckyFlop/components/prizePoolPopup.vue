<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popup-content">
      <img class="title-image" :src="IconPath('title_10.png')" />
      <div class="main">
        <div class="img1"></div>
        <div class="img2"></div>
        <div class="img3"></div>
        <div class="desText">每次翻牌还有8%概率出限时任务，倒计时1小时内完成任务可获得<i>卡牌L、卡牌U、卡牌C、卡牌K</i>，具体如下：</div>
        <div class="img4"></div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      isShowPo: true
    }
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('closePopups')
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-content {
  position: relative;
  width: 628px;
  min-height: 480px;
  height: 969px;
  background: url('@/pages/qingMing/assets/tk_bg_4.png') no-repeat;
  background-size: 100% 100%;
  padding: 5px;
  pointer-events: auto;
  .title-image {
    width: 642px;
    height: 130px;
    position: absolute;
    z-index: 3;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main {
    width: 100%;
    height: calc(100% - 80px);
    // background-color: red;
    position: absolute;
    left: 0;
    top: 50px;
    text-align: center;
    text-align: -webkit-center;
    overflow-y: scroll;
    .img1 {
      width: 551px;
      height: 464px;
      background: url('@/pages/qingMing/assets/tk_3.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 10px;
    }
    .img2 {
      width: 551px;
      height: 531px;
      background: url('@/pages/qingMing/assets/tk_4.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 10px;
    }
    .img3 {
      width: 551px;
      height: 598px;
      background: url('@/pages/qingMing/assets/tk_5.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 10px;
    }
    .desText {
      width: 551px;
      // height: 596px;
      color: #ffffff;
      font-size: 29px;
      margin-bottom: 10px;
      text-align: left;
      i {
        color: #fffaa6;
      }
    }
    .img4 {
      width: 551px;
      height: 340px;
      background: url('@/pages/qingMing/assets/tk_6.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
