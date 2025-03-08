<template>
  <PopupBox :title="'title_19.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每日充值任意金额可领取超值礼包，</li>
        <li>内含随机倍数的绿晶石奖励、藏宝图+1及随</li>
        <li>机稀有奖励，最高可得1000绿晶石。</li>
        <li><span></span>奖励如下：</li>
      </ul>
    </div>
    <div class="img1"></div>
    <div class="img2"></div>
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
  width: 551px;
  height: 467px;
  background: url('@/pages/luckyFlop/assets/tk_8.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
.img2 {
  width: 551px;
  height: 403px;
  background: url('@/pages/luckyFlop/assets/tk_9.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
</style>
