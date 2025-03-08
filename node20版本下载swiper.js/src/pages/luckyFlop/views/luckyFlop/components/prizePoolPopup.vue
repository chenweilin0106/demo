<template>
  <PopupBox :title="'title_10.png'" @clickClose="clickClose">
    <div class="img1"></div>
    <div class="img2"></div>
    <div class="img3"></div>
    <div class="desText">
      每次翻牌还有8%概率出限时任务，倒计时1小时内完成任务可获得
      <i>卡牌L、卡牌U、卡牌C、卡牌K</i>，具体如下：
    </div>
    <div class="img4"></div>
  </PopupBox>
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
.img1 {
  width: 552px;
  height: 464px;
  background: url('@/pages/luckyFlop/assets/tk_3.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.img2 {
  width: 552px;
  height: 531px;
  background: url('@/pages/luckyFlop/assets/tk_4.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.img3 {
  width: 552px;
  height: 598px;
  background: url('@/pages/luckyFlop/assets/tk_5.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.desText {
  width: 552px;
  // height: 596px;
  color: #ffffff;
  font-size: 29px;
  margin-bottom: 10px;
  text-align: left;
  white-space: pre-wrap;
  i {
    color: #fffaa6;
  }
}
.img4 {
  width: 552px;
  height: 340px;
  background: url('@/pages/luckyFlop/assets/tk_6.png') no-repeat;
  background-size: 100% 100%;
}
</style>
