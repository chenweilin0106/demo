<template>
  <PopupBox title="title_4.png" @clickClose="clickClose">
    <div class="rule-text">
      <ul>
        <li><span></span>活动期间每充值{{ rechargeNum }}元可获得1次开启机会，</li>
        <li>每次随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）</li>
        <li>、活力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_11.png')" class="table-1 block margin-row-center" />
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
.rule-text {
  margin-left: 43px;
}
.table-1 {
  //margin-left: 43px;
  margin-top: 10px;
  width: 566px;
}
</style>
```
