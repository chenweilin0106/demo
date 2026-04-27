<template>
  <PopupBox title="奖池概率" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值{{config.rechargeNum}}元可获得1次开启{{config.lotteryText}}，每次随</li>
        <li>机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
        <li>卡不计算在内</li>
      </ul>
    </div>
    <table class="publicTable" :style="{ margin: '1em auto 0' }">
      <thead class="tableHead">
        <tr class="tableTr">
          <th class="tableCell tableTh" style="width: 64%">奖励</th>
          <th class="tableCell tableTh" style="width: 36%">概率</th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr class="tableTr">
          <td class="tableCell tableTd">藏宝图+1</td>
          <td class="tableCell tableTd deep">28%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">绿晶石+3</td>
          <td class="tableCell tableTd deep">20%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">聚宝盆+1</td>
          <td class="tableCell tableTd deep">10%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">魔术帽+1</td>
          <td class="tableCell tableTd deep">10%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">靓号券+1</td>
          <td class="tableCell tableTd deep">5%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">紫晶石+1</td>
          <td class="tableCell tableTd deep">12%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">口香糖+1</td>
          <td class="tableCell tableTd deep">15%</td>
        </tr>
      </tbody>
    </table>
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
::v-deep .popupContent.popupContent {
  .main {
    margin-top: 89px;
    margin-bottom: 65px;
  }
}
</style>
