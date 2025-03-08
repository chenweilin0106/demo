<template>
  <div class="RuleText">
    <div v-for="(item, index) in textList" :key="index" class="row position-relative line-height-100">
      <span v-if="item.circle" class="circle position-absolute radius-50 position-column-center"></span>
      <p v-html="item.text" class="flex align-center flex-no-wrap text-nowrap"></p>
    </div>
  </div>
</template>

<script>
// 需要设置组件width margin-left
// [{text: `活动期间完成以上每日任务可领取樱花<img src='${this.IconPath('icon_yh.png')}' />，樱花`, circle: true}]
// { text: '活动期间完成以上每日任务可领取樱花，樱花', circle: true },
// { text: '可在本活动中兑换超值好礼', circle: false },
// { text: '购买礼包、会员（含超值兑换中兑换会员）、活力', circle: true },
// { text: '卡不计入充值', circle: false }
export default {
  props: {
    textList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
.RuleText {
  .row {
    font-weight: 500;
    font-size: 28px;
    color: #c16d6f;
    line-height: 40px;
    .circle {
      left: -41px;
      width: 31px;
      height: 31px;
      background: url('@/assets/mk1_13.png') no-repeat left top/100% 100%;
    }
    ::v-deep img {
      flex-shrink: 0;
      width: 43px;
      height: 42px;
    }
  }
}
</style>
