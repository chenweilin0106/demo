<template>
  <PopupBox title="title_21.png" size="2" @clickClose="clickClose">
    <div class="scrollBox">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>活动期间每日充值任意金额可领取超值礼包，内</li>
          <li>含随机倍数的绿晶石奖励、藏宝图+1及随机稀有</li>
          <li>奖励，最高可得1000绿晶石</li>
          <li><span></span>奖励如下：</li>
          <!-- <li><span></span>年度盛典期间奖励翻倍（下表数据已为双倍结果）</li> -->
        </ul>
      </div>
      <table class="publicTable">
        <thead class="tableHead">
        <tr class="tableTr">
          <th class="tableCell tableTh" style="width: 30%">倍数</th>
          <th class="tableCell tableTh" style="width: 30%">概率</th>
          <th class="tableCell tableTh" style="width: 40%">可得绿晶石</th>
        </tr>
        </thead>
        <tbody class="tableBody">
        <tr class="tableTr">
          <td class="tableCell tableTd">2</td>
          <td class="tableCell tableTd borderRight borderLeft">39.9%</td>
          <td class="tableCell tableTd">40</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">3</td>
          <td class="tableCell tableTd borderRight borderLeft">25%</td>
          <td class="tableCell tableTd">60</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">4</td>
          <td class="tableCell tableTd borderRight borderLeft">20%</td>
          <td class="tableCell tableTd">80</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">5</td>
          <td class="tableCell tableTd borderRight borderLeft">10%</td>
          <td class="tableCell tableTd">100</td>
        </tr>
        <tr class="tableTr ">
          <td class="tableCell tableTd">10</td>
          <td class="tableCell tableTd borderRight borderLeft">5%</td>
          <td class="tableCell tableTd">200</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">50</td>
          <td class="tableCell tableTd borderRight borderLeft">0.1%</td>
          <td class="tableCell tableTd">1000</td>
        </tr>
        </tbody>
      </table>
      <div class="table2Div">
        <div class="firstLabel">首次必得</div>
        <table class="publicTable">
          <thead class="tableHead">
          <tr class="tableTr">
            <th class="tableCell tableTh" style="width: 68%">稀有奖励</th>
            <th class="tableCell tableTh" style="width: 32%">概率</th>
          </tr>
          </thead>
          <tbody class="tableBody">
          <tr class="tableTr">
            <td class="tableCell tableTd position-relative">
              【<i>趣玩卡丁车</i>】座驾+1天
            </td>
            <td class="tableCell tableTd deep">25%</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd">元宝+2万</td>
            <td class="tableCell tableTd deep">25%</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd">靓号券+1</td>
            <td class="tableCell tableTd deep">20%</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd">钥匙+1</td>
            <td class="tableCell tableTd deep">10%</td>
          </tr>
          <tr class="tableTr ">
            <td class="tableCell tableTd">藏宝图+1</td>
            <td class="tableCell tableTd deep">20%</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </PopupBox>
</template>

<script>
export default {
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
.scrollBox {
  position: relative;
  max-height: 880px;
  overflow-x: hidden;
  overflow-y: scroll;
  .publicTable1 {
    margin-top: 14px;
  }
  .table2Div {
    width: fit-content;
    margin: 18px auto 0;
    position: relative;
    .publicTable2 {
      margin-top: 18px;
    }
    .firstLabel {
      position: absolute;
      top: 56px;
      left: -13px;
      transform: translateY(-50%);
      width: 107px;
      height: 33px;
      background: url('@/pages/labaFestival/assets/tk_11.png') no-repeat left top/100% 100%;
      color: transparent;
    }
  }
}
</style>
