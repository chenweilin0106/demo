<template>
  <PopupBox title="title_9.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值{{ rechargeNum }}元可获得1次开启机会，每次</li>
        <li>随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活</li>
        <li>力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_13.png')" class="table-1 block margin-row-center" />
  </PopupBox>
</template>

<script>
export default {
  props: ['rechargeNum'],
  data() {
    return {}
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.table-1 {
  margin-top: 10px;
  width: 555px;
}
</style>
