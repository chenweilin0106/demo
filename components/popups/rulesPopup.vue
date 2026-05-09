<template>
  <PopupBox title="玩法与概率" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>每累计消耗200钻石，抽奖次数+1，每次抽奖可获</li>
        <li>得随机奖励，每日首次单抽免费（金钻礼物不计算</li>
        <li>入内）</li>
        <li><span></span>产品中获得的道具均无法赠送或交易，仅可自己使</li>
        <li>用</li>
        <li><span></span>奖励概率如下：</li>
      </ul>
    </div>
    <table class="publicTable" :style="{ margin: '0.2em auto 0' }">
      <thead class="tableHead">
        <tr class="tableTr">
          <th class="tableCell tableTh" style="width: 68%">明星奖池</th>
          <th class="tableCell tableTh" style="width: 32%">概率</th>
        </tr>
      </thead>
      <tbody class="tableBody">
        <tr class="tableTr">
          <td class="tableCell tableTd">明星奖章+1</td>
          <td class="tableCell tableTd deep">25%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">绿晶石+10</td>
          <td class="tableCell tableTd deep">10%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">【酒心巧克力】赠送权+1天</td>
          <td class="tableCell tableTd deep">6%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">【梦幻水晶】头饰+1天</td>
          <td class="tableCell tableTd deep">6%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">猫爪币+10</td>
          <td class="tableCell tableTd deep">20%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">猫爪币+20</td>
          <td class="tableCell tableTd deep">15%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">猫爪币+30</td>
          <td class="tableCell tableTd deep">10%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">猫爪币+99</td>
          <td class="tableCell tableTd deep">2%</td>
        </tr>
        <tr class="tableTr">
          <td class="tableCell tableTd">
            <div class="newLabel"></div>
            【汪财进宝】戒指+1
            <div class="priceLabel radius-999 flex align-center position-absolute line-height-1">{{ 520 }}<img :src="IconPath('zs_42_32.png')" alt="" />
          </div></td>
          <td class="tableCell tableTd deep">5%</td>
        </tr>
        <tr class="tableTr stripe">
          <td class="tableCell tableTd">
            【软乎乎】戒指+1
            <div class="priceLabel radius-999 flex align-center position-absolute line-height-1">{{ 9999 }}<img :src="IconPath('zs_42_32.png')" alt="" /></div>
          </td>
          <td class="tableCell tableTd deep">1%</td>
        </tr>
      </tbody>
    </table>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
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
::v-deep .popupContent.popupContent {
  .main {
    .publicTable {
      .newLabel {
        position: absolute;
        left: 31px;
        top: 50%;
        transform: translateY(-50%);
        width: 45px;
        height: 44px;
        background: url('@/pages/520/assets/tk_12.png') no-repeat left top/100% 100%;
      }
      .priceLabel {
        z-index: 1;
        font-size: 16px;
        right: -4px;
        top: 0;
        color: #FFFFFF;
        transform: translateY(-50%);
        padding: 4px 5px 4px 10px;
        height: 28px;
        background: linear-gradient(-90deg, #75B9FF, #FF84F8);
        img {
          width: 22px;
          height: 16px;
          margin: 0 0 0 2px;
        }
      }
    }
  }
}
</style>
