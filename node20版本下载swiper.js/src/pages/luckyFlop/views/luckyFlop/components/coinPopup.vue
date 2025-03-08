<template>
  <PopupBox :title="'title_9.png'" @clickClose="clickClose">
    <div class="main">
      <div class="loveImgDiv">
        <img class="loveIcon" :src="IconPath('mk4_1.png')" />
        <div class="loveText">星星+1</div>
      </div>
      <div class="text1">每消费100钻石</div>
      <div class="text2">当前已消费钻石：{{ diamondUsedNum }}</div>
      <div class="tip">自动发放</div>
    </div>
  </PopupBox>
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
  mounted() { },
  watch: {},
  methods: {
    clickClose() {
      this.$emit('closePopups')
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: calc(100% - 80px);
  // background-color: red;
  position: absolute;
  left: 0;
  top: 50px;
  text-align: center;
  text-align: -webkit-center;
  .loveImgDiv {
    width: 120px;
    height: 120px;
    background: #fefaef;
    border-radius: 12px;
    border: 4px solid #FFBDFD;
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
      width: 112px;
      height: 40px;
      background: #6359E4;
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
    width: 450px;
    height: 40px;
    background: url('@/pages/luckyFlop/assets/tk_2.png') no-repeat left top/100% 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 240px;
  }
}
</style>
