<template>
  <PopupBox title="title_24.png" @clickClose="clickClose">
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
            <td class="tableCell tableTd">【玫瑰载月】礼物赠送权+5天<br>符石精粹+2000</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第2名</td>
            <td class="tableCell tableTd">【玫瑰载月】礼物赠送权+3天<br>符石精粹+1500</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第3名</td>
            <td class="tableCell tableTd">【玫瑰载月】礼物赠送权+2天<br>符石精粹+1000</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第4~5名</td>
            <td class="tableCell tableTd">【玫瑰载月】礼物赠送权+1天<br>符石精粹+800</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第6~10名</td>
            <td class="tableCell tableTd">【玫瑰载月】礼物赠送权+1天<br>符石精粹+500</td>
          </tr>
        </tbody>
      </table>
      <div class="rules-text-popup">
        <ul>
          <li><span></span><i>礼物【玫瑰载月】</i>：价格为1888钻石，仅钻石可赠</li>
          <li>送</li>
        </ul>
      </div>
      <div class="img2"></div>
      <div class="rewardsArea">
        <div :class="['rewardsDivItem',item.id<4?'nSp':null]" v-for="(item) in rewardsList" :key="item.id">
          <div :class="['nameDiv',item.id<4?'nSp':null]">{{item.name}}</div>
          <div class="rewardsShowDiv">
            <div class="reward" v-for="(it,i) in item.rewards" :key="i">
              <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
              <div class="rewardText" v-html="it.text"></div>
              <div class="rewardMark" v-if="it.mark">{{ it.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
            </div>
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
            <td class="tableCell tableTd">【花期漫游】世界消息皮肤+5天<br>【招财疾跑】座驾+5天</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第2名</td>
            <td class="tableCell tableTd">【花期漫游】世界消息皮肤+3天<br>【招财疾跑】座驾+3天</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第3名</td>
            <td class="tableCell tableTd">【花期漫游】世界消息皮肤+2天<br>【招财疾跑】座驾+2天</td>
          </tr>
          <tr class="tableTr stripe">
            <td class="tableCell tableTd deep">第4~5名</td>
            <td class="tableCell tableTd">【花期漫游】世界消息皮肤+1天<br>【招财疾跑】座驾+1天</td>
          </tr>
          <tr class="tableTr">
            <td class="tableCell tableTd deep">第6~10名</td>
            <td class="tableCell tableTd">招财疾跑】座驾+1天</td>
          </tr>
        </tbody>
      </table>
      <div class="rules-text-popup">
        <ul>
          <li><span></span><i>礼物【玫瑰载月】</i>：价格为1888钻石，仅钻石可赠</li>
          <li>送</li>
        </ul>
      </div>
      <div class="img4"></div>
      <div class="rewardsArea">
        <div :class="['rewardsDivItem',item.id<4?'nSp':'margin2']" v-for="(item) in rewardsList2" :key="item.id">
          <div :class="['nameDiv',item.id<4?'nSp':null]">{{item.name}}</div>
          <div class="rewardsShowDiv">
            <div class="reward reward2" v-for="(it,i) in item.rewards" :key="i">
              <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
              <div class="rewardText" v-html="it.text"></div>
              <div class="rewardMark" v-if="it.mark">{{ it.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- <div class="rules-text-border">
      <ul>
        <li><span></span>总榜前10上榜条件：宠爱值达到99,999</li>
        <li><span></span><i>【爱心敞篷】双人座驾</i>：当情侣双方在同一个房间</li>
        <li>时，乘坐该座驾将触发<i>双人特效</i>；若未结婚或仅有</li>
        <li>一人在房间则只展示普通效果</li>
        <br>
        <li><span></span>激活奖励：</li>
        <li><span></span><i>【5202025&2025520】靓号</i>：7位靓号，</li>
        <li>CP双方为5202025&2025520</li>
        <li><span></span><i>【520ABCD&ABCD520】靓号</i>：7位靓号，</li>
        <li>例如5201234&1234520（ABCD不可带有520）</li>
        <li><span></span><i>【520AABB&AABB520】靓号</i>：7位靓号，</li>
        <li>例如5201122&1122520（AABB不可为3344）</li>
        <li><span></span>若未达到对应宠爱值但达到对应名次<i>可获得其他奖</i></li>
        <li><i>励</i>，不可获得靓号</li>
        <li><span></span>靓号奖励只可获取其中<i>一款</i></li>
        <li><span></span>注：靓号ABCD各数字不可相同，不与520、1314、</li>
        <li>3344重复。获奖时需<i>与官方确认</i>可选范围内的号</li>
        <li>段。若与其他分组获奖玩家意向号码相同，则优先</li>
        <li>宠爱值高的玩家进行选号</li>
      </ul>
    </div> -->
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
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '【蝶语旧梦】\n头饰\n+30天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+1' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'mic', icon: 'ts_dyjm.svga', text: '【蝶语旧梦】\n头饰\n+15天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+1' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'mic', icon: 'ts_dyjm.svga', text: '【蝶语旧梦】\n头饰\n+7天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+1' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'mic', icon: 'ts_dyjm.svga', text: '【蝶语旧梦】\n头饰\n+5天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+1' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'mic', icon: 'ts_dyjm.svga', text: '【蝶语旧梦】\n头饰\n+3天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝\n+1' }
          ]
        }
      ]),
      rewardsList2: Object.freeze([
        {
          id: 1,
          name: '第1名',
          rewards: [
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+2' },
            { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星（1h）\n+3' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+1' },
            { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星（1h）\n+2' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+20' },
            { type: 'tool', icon: 'mjfyx_120_120.png', text: '摸金符·一星（1h）\n+1' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+15' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+10' }
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
  }
}
.img1{
  width: 494px;
  height: 28px;
  background: url('@/pages/618/assets/tk_50.png') no-repeat left top/100% 100%;
  margin: 0 auto 20px auto;
}
.img2{
  width: 488px;
  height: 27px;
  background: url('@/pages/618/assets/tk_51.png') no-repeat left top/100% 100%;
  margin: 10px auto;
}
.img3{
  width: 494px;
  height: 28px;
  background: url('@/pages/618/assets/tk_52.png') no-repeat left top/100% 100%;
  margin: 0 auto 20px auto;
}
.img4{
  width: 488px;
  height: 27px;
  background: url('@/pages/618/assets/tk_53.png') no-repeat left top/100% 100%;
  margin: 10px auto;
}
.rewardsArea{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto 0px auto;
  .rewardsDivItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
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
      background: rgba(107, 63, 190, 0.6);
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
      margin: 20px 0 100px 0;
      justify-content: center;
      .reward{
        width: 120px;
        height: 120px;
        background: linear-gradient(180deg, #FFFCC9, #FFFFFF);
        border-radius: 16px;
        border: 4px solid #FBE0A7;
        position: relative;
        margin: 0px 10px;
        .rewardText{
          font-size: 20px;
          color: #FFFFFF;
          line-height: 30px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 120px;
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
