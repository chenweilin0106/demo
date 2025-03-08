<template>
  <PopupBox title="title_10.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值{{ rechargeNum }}元可获得1次开启机会，每次</li>
        <li>随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活</li>
        <li>力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_3.png')" class="table-1 block margin-row-center" />
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
::v-deep .popupContent {
  width: 600px !important;
}
::v-deep .main {
  position: relative;
  height: 762px;
}
.rules-text-popup {
  width: fit-content;
  margin-left: 45px;
  margin-right: auto;
  li {
    line-height: 36px;
  }
}
.table-1 {
  margin-top: 10px;
  width: 555px;
  height: 502px;
}
</style>
