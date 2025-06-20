<template>
  <PopupBox title="title_13.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值{{config.rechargeNum}}元可获得1次开启{{config.lotteryText}}，每</li>
        <li>次随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、</li>
        <li>活力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_13.png')" class="table block margin-row-center" />
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.table{
  margin-top: 10px;
  width: 549px;
}
</style>
