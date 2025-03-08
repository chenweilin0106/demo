<template>
  <PopupBox :title="'title_10.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值10元可获得1次开启次数，</li>
        <li>每次随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、</li>
        <li>活力卡不计算在内</li>
      </ul>
    </div>
    <div class="img1"></div>
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
  height: 534px;
  background: url('@/pages/luckyFlop/assets/tk_10.png') no-repeat;
  background-size: 100% 100%;
  margin-bottom: 10px;
}
</style>
