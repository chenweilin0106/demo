<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popup-content">
      <img class="title-image" :src="IconPath('title_9.png')" />
      <div class="main">
        <div class="loveImgDiv">
          <img class="loveIcon" :src="IconPath('mk4_1.png')" />
          <div class="loveText">星星+1</div>
        </div>
        <div class="text1">每消费100钻石</div>
        <div class="text2">当前已消费钻石：{{ diamondUsedNum }}</div>
        <div class="tip">自动发放</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: ['diamondUsedNum'],
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
  height: 409px;
  background: url('@/pages/qingMing/assets/tk_bg_3.png') no-repeat;
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
    .loveImgDiv {
      width: 120px;
      height: 120px;
      background: #fefaef;
      border-radius: 12px;
      border: 4px solid #75d093;
      position: absolute;
      left: 100px;
      top: 60px;
      .loveIcon {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 15px;
        width: 27 * 2px;
        height: 26 * 2px;
      }
      .loveText {
        width: 116px;
        height: 40px;
        background: #1a9e80;
        border-radius: 0px 0px 12px 12px;
        position: absolute;
        bottom: -1px;
        line-height: 40px;
        text-align: center;
        font-size: 26px;
      }
    }
    .text1 {
      font-size: 28px;
      color: #fff;
      position: absolute;
      left: 260px;
      top: 70px;
    }
    .text2 {
      font-size: 24px;
      color: #fff;
      position: absolute;
      left: 260px;
      top: 140px;
    }
    .tip {
      font-size: 26px;
      color: #ffffff;
      line-height: 40px;
      width: 449px;
      height: 40px;
      background: url('@/pages/qingMing/assets/tk_2.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 240px;
    }
  }
}
</style>
