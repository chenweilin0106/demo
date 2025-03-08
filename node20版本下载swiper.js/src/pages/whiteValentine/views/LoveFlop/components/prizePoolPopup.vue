<template>
  <van-popup
    v-model="isShowPo"
    :close-on-click-overlay="false"
    @click-overlay="clickClose"
  >
    <div class="popup-content">
      <img class="title-image" :src="IconPath('tk_6_05.png')" />
      <div class="main">
        <div class="img1"></div>
        <div class="img2"></div>
        <div class="img3"></div>
        <div class="desText">每次翻牌还有8%概率出限时任务，倒计时1小时内完成任务可获得<i>卡牌L、卡牌O、卡牌V、卡牌E</i>，具体如下：</div>
        <div class="img4"></div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ['isShow'],
  data() {
    return {
      isShowPo: false
    }
  },
  computed: {},
  mounted() {},
  watch: {
    isShow(newV, oldV) {
      // console.log(newV, oldV)
      this.isShowPo = this.isShow
    }
  },
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
  width: 620px;
  min-height: 480px;
  height: 940px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;
  background: linear-gradient(180deg, #FFF3F4, #F9C4C7);
  .title-image {
    width: 644px;
    height: 230px;
    position: absolute;
    z-index: 3;
    top: -85px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main{
    width: 100%;
    height: calc(100% - 80px);
    // background-color: red;
    position: absolute;
    left: 0;
    top: 50px;
    text-align: center;
    text-align: -webkit-center;
    overflow-y: scroll;
    .img1{
      width: 551px;
      height: 462px;
      background: url('@/pages/whiteValentine/assets/tk_6_06.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 10px;
    }
    .img2{
      width: 551px;
      height: 529px;
      background: url('@/pages/whiteValentine/assets/tk_6_07.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 10px;
    }
    .img3{
      width: 551px;
      height: 596px;
      background: url('@/pages/whiteValentine/assets/tk_6_08.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 10px;
    }
    .desText{
      width: 551px;
      // height: 596px;
      color: #B35553;
      font-size: 29px;
      margin-bottom: 10px;
      text-align: left;
      i{
        color: #94A1EE;
      }
    }
    .img4{
      width: 551px;
      height: 340px;
      background: url('@/pages/whiteValentine/assets/tk_6_09.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
