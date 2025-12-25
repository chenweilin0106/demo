<template>
  <PopupBox title="title_42.png" @clickClose="clickClose">
    <template v-if="rankChosen==1">
      <div class="img1"></div>
      <table class="publicTable publicTable1">
        <thead class="tableHead">
          <tr class="tableTr">
            <th class="tableCell tableTh">日榜排名</th>
            <th class="tableCell tableTh">奖励</th>
          </tr>
        </thead>
        <tbody class="tableBody">
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第1名</td>
            <td class="tableCell tableTd">【鸿运噼啪】礼物赠送权+7天<br>绿晶石+1000</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第2名</td>
            <td class="tableCell tableTd">【鸿运噼啪】礼物赠送权+5天<br>绿晶石+600</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第3名</td>
            <td class="tableCell tableTd">【鸿运噼啪】礼物赠送权+3天<br>绿晶石+400</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第4~5名</td>
            <td class="tableCell tableTd">【鸿运噼啪】礼物赠送权+1天<br>绿晶石+200</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第6~10名</td>
            <td class="tableCell tableTd">【鸿运噼啪】礼物赠送权+1天<br>绿晶石+100</td>
          </tr>
          <!-- <tr class="tableTr"> -->
          <!--   <td class="tableCell tableTd deep">第11~20名</td> -->
          <!--   <td class="tableCell tableTd">【一路繁花】礼物赠送权+1天</td> -->
          <!-- </tr> -->
        </tbody>
      </table>
      <div class="rules-text-popup">
        <ul>
          <li><span></span><i>【鸿运噼啪】礼物</i>：价格为1888钻，仅钻石可赠送</li>
        </ul>
      </div>
      <div class="img2"></div>
      <div class="rewardsArea">
        <!-- 最后排名奖励有两项 使用：item.id<4?'nSp':'noMargin'；最后排名奖励有一项 使用：item.id<4?'nSp':null  -->
        <div :class="['rewardsDivItem',item.id<4?'nSp':'null']" v-for="(item) in rewardsList" :key="item.id">
          <div :class="['nameDiv',item.id<4?'nSp':'null']">{{item.name}}</div>
          <div class="rewardsShowDiv">
            <lazy-component class="reward" v-for="(it,i) in item.rewards" :key="i">
              <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
              <div class="rewardText" v-html="it.text"></div>
              <div class="rewardMark" v-if="it.mark">{{ it.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
            </lazy-component>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="rankChosen==2">
      <div class="img3"></div>
      <table class="publicTable publicTable1">
        <thead class="tableHead">
          <tr class="tableTr">
            <th class="tableCell tableTh">日榜排名</th>
            <th class="tableCell tableTh">奖励</th>
          </tr>
        </thead>
        <tbody class="tableBody">
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第1名</td>
            <td class="tableCell tableTd">【橇动心声】世界消息皮肤+7天<br>靓号券+40</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第2名</td>
            <td class="tableCell tableTd">【橇动心声】世界消息皮肤+5天<br>靓号券+25</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第3名</td>
            <td class="tableCell tableTd">【橇动心声】世界消息皮肤+3天<br>靓号券+15</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第4~5名</td>
            <td class="tableCell tableTd">【橇动心声】世界消息皮肤+1天<br>靓号券+8</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第6~10名</td>
            <td class="tableCell tableTd">【橇动心声】世界消息皮肤+1天<br>靓号券+5</td>
          </tr>
          <!-- <tr class="tableTr"> -->
          <!--   <td class="tableCell tableTd deep">第11~20名</td> -->
          <!--   <td class="tableCell tableTd">【光年絮语】世界消息皮肤+1天</td> -->
          <!-- </tr> -->
        </tbody>
      </table>
      <div class="img4"></div>
      <!-- <div class="img5"></div> -->
      <div class="rewardsArea">
        <div :class="['rewardsDivItem',item.id<4?'nSp':null]" v-for="(item) in rewardsList2" :key="item.id">
          <div :class="['nameDiv',item.id<4?'nSp':null]">{{item.name}}</div>
          <div class="rewardsShowDiv">
            <lazy-component class="reward reward2" v-for="(it,i) in item.rewards" :key="i">
              <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
              <div class="rewardText" v-html="it.text"></div>
              <div class="rewardMark" v-if="it.mark">{{ it.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
            </lazy-component>
          </div>
        </div>
      </div>
      <!-- <div class="rules-text-border"> -->
        <!-- <ul> -->
          <!-- <li><span></span>总榜前10上榜条件：宠爱值达到99,999</li>
          <li><span></span><i>【爱心敞篷】双人座驾</i>：当情侣双方在同一个房间</li>
          <li>时，乘坐该座驾将触发<i>双人特效</i>；若未结婚或仅有</li>
          <li>一人在房间则只展示普通效果</li>
          <br> -->
          <!-- <li><span></span>激活奖励：</li> -->
          <!-- <li><span></span><i>【7701314&1314770】靓号</i>：7位靓号，</li>
          <li>双方为【7701314&1314770】</li>
          <li><span></span><i>【520ABCD&ABCD520】靓号</i>：7位靓号，</li>
          <li>例如5201234&1234520（ABCD不可带有520）</li>
          <li><span></span><i>【520AABB&AABB520】靓号</i>：7位靓号，</li>
          <li>例如5201122&1122520（AABB不可为3344）</li>
          <li><span></span>若未达到对应神豪值但达到对应名次<i>可获得其他奖</i></li>
          <li><i>励</i>，不可获得靓号</li>
          <li><span></span>靓号奖励只可获取其中<i>一组，</i>前三名用户在一组中</li>
          <li>除自己使用一个外，可以保留另一个靓号或者赠送</li>
          <li>给其他用户</li>
          <li><span></span>注：靓号ABCD各数字不可相同，不与520、1314、</li>
          <li>3344重复。获奖时需<i>与官方确认</i>可选范围内的号</li>
          <li>段。若与其他分组获奖玩家意向号码相同，则优先</li>
          <li>神豪值高的玩家进行选号</li> -->
        <!-- </ul> -->
      <!-- </div> -->
    </template>
    <div class="img5"></div>
    <!-- <table class="publicTable" style="width: 70%;"> -->
    <!--   <thead class="tableHead"> -->
    <!--     <tr class="tableTr"> -->
    <!--       <th class="tableCell tableTh" style="width: 60%">奖励</th> -->
    <!--       <th class="tableCell tableTh" style="width: 40%">概率</th> -->
    <!--     </tr> -->
    <!--   </thead> -->
    <!--   <tbody class="tableBody"> -->
    <!--     <tr class="tableTr"> -->
    <!--       <td class="tableCell tableTd">元宝+188</td> -->
    <!--       <td class="tableCell tableTd deep">50%</td> -->
    <!--     </tr> -->
    <!--     <tr class="tableTr stripe"> -->
    <!--       <td class="tableCell tableTd">元宝+588</td> -->
    <!--       <td class="tableCell tableTd deep">30%</td> -->
    <!--     </tr> -->
    <!--     <tr class="tableTr"> -->
    <!--       <td class="tableCell tableTd">元宝+1888</td> -->
    <!--       <td class="tableCell tableTd deep">12%</td> -->
    <!--     </tr> -->
    <!--     <tr class="tableTr stripe"> -->
    <!--       <td class="tableCell tableTd">元宝+2888</td> -->
    <!--       <td class="tableCell tableTd deep">5%</td> -->
    <!--     </tr> -->
    <!--     <tr class="tableTr"> -->
    <!--       <td class="tableCell tableTd">元宝+5888</td> -->
    <!--       <td class="tableCell tableTd deep">3%</td> -->
    <!--     </tr> -->
    <!--   </tbody> -->
    <!-- </table> -->
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: ['rankChosen'],
  components: {},
  data() {
    return {
      rewardsList: Object.freeze([
        {
          id: 1,
          name: '第1名',
          rewards: [
            { type: 'mic', icon: 'ts_glgl.svga', text: '【咕噜咕噜】\n头饰+60天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+5' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'mic', icon: 'ts_glgl.svga', text: '【咕噜咕噜】\n头饰+30天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+3' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'mic', icon: 'ts_glgl.svga', text: '【咕噜咕噜】\n头饰+15天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+2' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'mic', icon: 'ts_glgl.svga', text: '【咕噜咕噜】\n头饰+7天' },
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+15' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'mic', icon: 'ts_glgl.svga', text: '【咕噜咕噜】\n头饰+5天' },
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+5' }
          ]
        }, {
          id: 6,
          name: '第11~20名',
          rewards: [
            { type: 'mic', icon: 'ts_glgl.svga', text: '【咕噜咕噜】\n头饰+7天' }
          ]
        }
      ]),
      rewardsList2: Object.freeze([
        {
          id: 1,
          name: '第1名',
          rewards: [
            { type: 'car', icon: 'qdxs_120_120.png', text: '【橇动心声】\n座驾+60天' },
            { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星(1h)\n+3' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'car', icon: 'qdxs_120_120.png', text: '【橇动心声】\n座驾+30天' },
            { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星(1h)\n+2' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'car', icon: 'qdxs_120_120.png', text: '【橇动心声】\n座驾+15天' },
            { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星(1h)\n+1' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'car', icon: 'qdxs_120_120.png', text: '【橇动心声】\n座驾+7天' }
            // { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星(1h)\n+1' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'car', icon: 'qdxs_120_120.png', text: '【橇动心声】\n座驾+5天' }
          ]
        }, {
          id: 6,
          name: '第11~20名',
          rewards: [
            { type: 'car', icon: 'qdxs_120_120.png', text: '【橇动心声】\n座驾+3天' }
          ]
        }
      ])
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.publicTable1{
  line-height: 28px;
  .tableCell{
    padding: 13px 0;
    // height: 76px;
  }
  .tableHead{
    font-size: 24px;
    font-weight: bold;
    .tableTh{
      height: 55px;
    }
  }
  .tableBody{
    font-size: 22px;
    font-weight: bold;
  }
  .deep{
    width: 179px;
    // font-size: 28px;
  }
}
.rules-text-popup{
  li{
    font-size: 24px;
    line-height: 36px;
    i {
      color: #FFEC95;
    }
  }
}
.img1{
  width: 494px;
  height: 28px;
  background: url('@/pages/labaFestival/assets/tk_42.png') no-repeat left top/100% 100%;
  margin: 0 auto 17px;
}
.img2{
  width: 488px;
  height: 27px;
  background: url('@/pages/labaFestival/assets/tk_43.png') no-repeat left top/100% 100%;
  margin: 14px auto 0;
}
.img3{
  width: 494px;
  height: 28px;
  background: url('@/pages/labaFestival/assets/tk_44.png') no-repeat left top/100% 100%;
  margin: 0 auto 17px;
}
.img4{
  width: 488px;
  height: 27px;
  background: url('@/pages/labaFestival/assets/tk_45.png') no-repeat left top/100% 100%;
  margin: 20px auto;
}
//.img5{
//  width: 488px;
//  height: 27px;
//  background: url('@/pages/labaFestival/assets/tk_46.png') no-repeat left top/100% 100%;
//  margin: 20px auto;
//}
.rewardsArea{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 25px auto 0;
  .rewardsDivItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 33px;
    &.nSp{
      margin: 0 100px;
    }
    &.noMargin{
      margin: 0 0;
    }
    &.margin2{
      margin: 0 60px;
    }
    .nameDiv{
      width: 140px;
      height: 42px;
      background: rgba(171, 53, 35, 0.6);
      border-radius: 21px;
      text-align: center;
      line-height: 42px;
      font-size: 26px;
      &.nSp{
        width: 200px;
      }
    }
    .rewardsShowDiv{
      display: flex;
      flex-direction: row;
      margin: 17px 0 84px 0;
      justify-content: center;
      .reward{
        width: 120px;
        height: 120px;
        background: linear-gradient(180deg, #FFFCC9, #FFFFFF 50%);
        border-radius: 16px;
        border: 4px solid #FBE0A7;
        position: relative;
        margin: 0px 8px;
        .rewardText{
          font-size: 21px;
          color: #FFFFFF;
          line-height: 30px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          bottom: -18px;
          white-space: pre;
          text-align: center;
        }
        .rewardMark{
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 17px;
          font-size: 20px;
          color: #FFFFFF;
          padding: 4px 5px 4px 10px;
          position: absolute;
          right: -20px;
          top: 0;
          transform: translateY(-50%);
          img{
            width: 27px;
            height: 20px;
            margin: 0 0 0 2px;
          }
        }
      }
      .reward2{
        margin: 0px 20px;
      }
    }
  }
}
//.textBorder{
//  width: 570px;
//  // height: 611px;
//  background: rgba(209, 86, 152, 0.4);
//  border-radius: 30px;
//  margin: 0 auto;
//  padding: 10px 6px;
//}
</style>
