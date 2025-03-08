<template>
    <PopupBox :title="'title_16.png'" @clickClose="clickClose">
      <template v-if="rankChosen == 1">
        <div class="img1"></div>
        <div class="rules-text-popup">
          <ul>
            <li><span></span><i>礼物【英雄天命】</i>：价格为3344钻石，仅钻石可赠</li>
            <li>送</li>
          </ul>
        </div>
        <div class="img2"></div>
        <div class="rules-text-popup">
          <ul>
            <li><span></span><i>道具【摸金符·一星】</i>：每次【符石寻宝】额外加</li>
            <li>20%幸运值，获得后可在【符石寻宝】页面查看</li>
          </ul>
        </div>
        <div class="rewardsArea">
          <div :class="['rewardsDivItem',item.id<4?'nSp':null]" v-for="(item) in rewardsList" :key="item.id">
            <div :class="['nameDiv',item.id<4?'nSp':null]">{{item.name}}</div>
            <div class="rewardsShowDiv">
              <div class="reward" v-for="(it,i) in item.rewards" :key="i">
                <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
                <div class="rewardText" v-html="it.text"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="rulesText-popup" v-if="0">
          <ul>
            <li><span></span>总榜前10上榜条件：情缘值达到99,999</li>
            <li>&ensp;</li>
            <li>激活奖励：</li>
            <li><span></span><i>【5202024&2024520】靓号</i>：7位靓号，</li>
            <li>CP双方为5202024&2024520</li>
            <li><span></span><i>【520ABCD&ABCD520】靓号</i>：7位靓号，</li>
            <li>例如5201234&1234520（ABCD不可带有520）</li>
            <li><span></span><i>【520AABB&AABB520】靓号</i>：7位靓号，</li>
            <li>例如5201122&1122520（AABB不可为3344）</li>
            <li><span></span>若未达到对应情缘值但达到对应名次<i>可获得其他奖</i></li>
            <li><i>励</i>，不可获得靓号</li>
            <li><span></span>靓号奖励只可获取其中<i>一款</i></li>
            <li><span></span>注：靓号ABCD各数字不可相同，不与520、1314、</li>
            <li>3344重复。获奖时需与<i>官方确认</i>可选范围内的号</li>
            <li>段。若与其他分组获奖玩家意向号码相同，则优先</li>
            <li>情缘值高的玩家进行选号</li>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="img3"></div>
        <div class="rules-text-popup">
          <ul>
            <li><span></span><i>总榜奖励条件</i>：活动期间累计收到钻石礼物价值</li>
            <li>88888钻石且达到获奖名次</li>
          </ul>
        </div>
        <div class="rewardsArea">
          <div :class="['rewardsDivItem',item.id<4?'nSp':null]" v-for="(item) in rewardsList2" :key="item.id">
            <div :class="['nameDiv',item.id<4?'nSp':null]">{{item.name}}</div>
            <div class="rewardsShowDiv">
              <div class="reward" v-for="(it,i) in item.rewards" :key="i">
                <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
                <div class="rewardText" v-html="it.text"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </PopupBox>
</template>

<script>
export default {
  name: 'rewardsDetailPopup',
  props: ['rankChosen'],
  components: {},
  data() {
    return {
      rewardsList: [
        {
          id: 1,
          name: '第1名',
          rewards: [
            { type: 'tool', icon: 'mjf_120_120.png', text: '摸金符·一星\n+1天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+5' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'tool', icon: 'mjf_120_120.png', text: '摸金符·一星\n+1天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+3' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'tool', icon: 'mjf_120_120.png', text: '摸金符·一星\n+1天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+1' }
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
        }, {
          id: 6,
          name: '第11~20名',
          rewards: [
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+5' }
          ]
        }
      ],
      rewardsList2: [
        {
          id: 1,
          name: '第1名',
          rewards: [
            { type: 'tool', icon: 'mp_tmr', text: '【天命人】\n永久铭牌' },
            { type: 'ring', icon: 'jz_hysy.svga', text: '【花语誓约】\n戒指+3' },
            { type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹\n+10000' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'tool', icon: 'mp_tmr', text: '【天命人】\n永久铭牌' },
            { type: 'ring', icon: 'jz_hysy.svga', text: '【花语誓约】\n戒指+2' },
            { type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹\n+7000' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'tool', icon: 'mp_tmr', text: '【天命人】\n永久铭牌' },
            { type: 'ring', icon: 'jz_hysy.svga', text: '【花语誓约】\n戒指+1' },
            { type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹\n+5000' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'tool', icon: 'mp_tmr', text: '【天命人】\n永久铭牌' },
            { type: 'ring', icon: 'jz_hysy.svga', text: '【花语誓约】\n戒指+1' },
            { type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹\n+3000' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'tool', icon: 'mp_tmr', text: '【天命人】\n永久铭牌' },
            { type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹\n+2000' }
          ]
        }, {
          id: 6,
          name: '第11~20名',
          rewards: [
            { type: 'tool', icon: 'mp_tmr', text: '【天命人】\n铭牌+180天' },
            { type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹\n+1000' }
          ]
        }
      ]
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
<style>
em{
  color: #B3285B;
}
</style>
<style scoped lang="scss">
.img1 {
  width: 554px;
  height: 547px;
  background: url('@/pages/nationalDay/assets/tk_25.png') no-repeat left top/100% 100%;
  margin: 0px auto 20px auto;
}
.img2 {
  width: 488px;
  height: 27px;
  background: url('@/pages/nationalDay/assets/tk_26.png') no-repeat left top/100% 100%;
  margin: 0px auto 20px auto;
}
.img3 {
  width: 591px;
  height: 606px;
  background: url('@/pages/nationalDay/assets/tk_27.png') no-repeat left top/100% 100%;
  margin: 0px auto 20px auto;
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
    &.nSp{
      margin: 0 80px;
    }
    .nameDiv{
      width: 140px;
      height: 42px;
      background: rgba(230, 82, 30, 0.7);
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
      margin: 20px 10px 100px 10px;
      justify-content: center;
      .reward{
        width: 120px;
        height: 120px;
        background: linear-gradient(180deg, #FFF5C3, #FFFFFF);
        border-radius: 12px;
        border: 4px solid #E06224;
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
      }
    }
  }
}
</style>
