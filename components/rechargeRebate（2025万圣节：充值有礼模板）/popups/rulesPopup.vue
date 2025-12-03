<template>
  <PopupBox :title="config.type == 1 ? 'title_3.png' : 'title_7.png'" @clickClose="clickClose">
    <div class="scrollBox">
      <template v-if="config.type == 1">
        <div class="rules-text-popup">
          <ul>
            <li><span></span>活动期间<i>每日充值任意金额</i>可领取超值礼包，</li>
            <li>内含随机倍数的绿晶石奖励、藏宝图+1及随</li>
            <li>机稀有奖励，最高可得1000绿晶石</li>
            <li><span></span>奖励如下：</li>
          </ul>
        </div>
        <table class="publicTable publicTable1">
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
              <td class="tableCell tableTd deep">39.9%</td>
              <td class="tableCell tableTd">40</td>
            </tr>
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">3</td>
              <td class="tableCell tableTd deep">25%</td>
              <td class="tableCell tableTd">60</td>
            </tr>
            <tr class="tableTr">
              <td class="tableCell tableTd">4</td>
              <td class="tableCell tableTd deep">20%</td>
              <td class="tableCell tableTd">80</td>
            </tr>
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">5</td>
              <td class="tableCell tableTd deep">10%</td>
              <td class="tableCell tableTd">100</td>
            </tr>
            <tr class="tableTr ">
              <td class="tableCell tableTd">10</td>
              <td class="tableCell tableTd deep">5%</td>
              <td class="tableCell tableTd">200</td>
            </tr>
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">50</td>
              <td class="tableCell tableTd deep">0.1%</td>
              <td class="tableCell tableTd">1000</td>
            </tr>
          </tbody>
        </table>
        <table class="publicTable publicTable2">
          <thead class="tableHead">
            <tr class="tableTr">
              <th class="tableCell tableTh" style="width: 62%">稀有奖励</th>
              <th class="tableCell tableTh" style="width: 38%">概率</th>
            </tr>
          </thead>
          <tbody class="tableBody">
            <tr class="tableTr">
              <td class="tableCell tableTd position-relative">
                <div class="label">首次必得</div>
                【趣玩卡丁车】座驾+1天
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
      </template>
      <template v-else-if="config.type == 2">
        <div class="rules-text-popup">
          <ul>
            <li><span></span>活动期间<i>每充值10元</i>可获得1次开启次数，</li>
            <li>每次随机获得奖励。</li>
            <li><span></span>购买礼包、会员（含超值兑换中兑换会员）</li>
            <li>活力卡不计算在内</li>
          </ul>
        </div>
        <table class="publicTable publicTable3">
          <thead class="tableHead">
            <tr class="tableTr">
              <th class="tableCell tableTh" style="width: 63%">奖励</th>
              <th class="tableCell tableTh" style="width: 37%">概率</th>
            </tr>
          </thead>
          <tbody class="tableBody">
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">藏宝图+1</td>
              <td class="tableCell tableTd deep">28%</td>
            </tr>
            <tr class="tableTr ">
              <td class="tableCell tableTd">绿晶石+3</td>
              <td class="tableCell tableTd deep">20%</td>
            </tr>
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">聚宝盆+1</td>
              <td class="tableCell tableTd deep">10%</td>
            </tr>
            <tr class="tableTr ">
              <td class="tableCell tableTd">魔术帽+1</td>
              <td class="tableCell tableTd deep">10%</td>
            </tr>
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">靓号券+1</td>
              <td class="tableCell tableTd deep">5%</td>
            </tr>
            <tr class="tableTr">
              <td class="tableCell tableTd">紫晶石+1</td>
              <td class="tableCell tableTd deep">12%</td>
            </tr>
            <tr class="tableTr stripe">
              <td class="tableCell tableTd">口香糖+1</td>
              <td class="tableCell tableTd deep">15%</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
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
.scrollBox {
  position: relative;
  max-height: 855px;
  overflow-x: hidden;
  overflow-y: scroll;
  .publicTable1 {
    margin-top: 15px;
  }
  .publicTable2 {
    margin-top: 22px;
  }
  .publicTable3 {
    margin-top: 15px;
  }
  .label {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-50%);
    padding: 0 10px;
    height: 28px;
    background: linear-gradient(-90deg, #DD7D32, #EFA144 50%);
    border-radius: 0px 14px 14px 0px;
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 1;
    display: flex;
    align-items: center;
  }
}
// .icon1 {
//   width: 45px;
//   height: 44px;
//   background: url('@/pages/520/assets/tk_12.png') no-repeat left top/100% 100%;
//   position: absolute;
//   left: 0;
//   top: 46%;
//   transform: translateY(-50%);
// }
// .icon2{
//   background: linear-gradient(-90deg, #75B9FF, #FF84F8);
//   border-radius: 17px;
//   font-weight: 500;
//   font-size: 20px;
//   color: #FFFFFF;
//   padding: 4px 10px;
//   position: absolute;
//   right: 6px;
//   top: 0;
//   transform: translateY(-50%);
//   img {
//     width: 27px;
//     height: 20px;
//   }
// }
</style>
