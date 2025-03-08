<template>
    <PopupBox :title="'title_19.png'" @clickClose="clickClose">
        <div class="img1"></div>
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
    </PopupBox>
</template>

<script>
export default {
  name: 'rewardsDetailPopup',
  props: [],
  components: {},
  data() {
    return {
      rewardsList: [
        {
          id: 1,
          name: '第1名',
          rewards: [
            { type: 'mic', icon: 'ts_hysh.svga', text: '【皓月霜华】\n头饰+30天' },
            { type: 'car', icon: 'lgxyc_120_120.png', text: '【流光星月船】\n座驾+30天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+5' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'mic', icon: 'ts_hysh.svga', text: '【皓月霜华】\n头饰+15天' },
            { type: 'car', icon: 'lgxyc_120_120.png', text: '【流光星月船】\n座驾+15天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+3' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'mic', icon: 'ts_hysh.svga', text: '【皓月霜华】\n头饰+7天' },
            { type: 'car', icon: 'lgxyc_120_120.png', text: '【流光星月船】\n座驾+7天' },
            { type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图\n+1' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'car', icon: 'xyc_120_120.png', text: '【星月船】\n座驾+5天' },
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+15' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'car', icon: 'xyc_120_120.png', text: '【星月船】\n座驾+3天' },
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+10' }
          ]
        }, {
          id: 6,
          name: '第11~20名',
          rewards: [
            { type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图\n+5' }
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
    height: 520px;
    background: url('@/pages/midAutumn/assets/tk_38.png') no-repeat left top/100% 100%;
    margin: 0px auto 20px auto;
  }

  .rewardsArea{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .rewardsDivItem{
      display: flex;
      flex-direction: column;
      align-items: center;
      &.nSp{
        margin: 0 40px;
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
        margin: 20px 20px 100px 20px;
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
  .rulesText-popup{
    color: #fff;
    white-space: nowrap;
    width: 590px;
    margin: 0 auto;
    background: rgba(126, 38, 207, 0.3);
    border-radius: 30px;
    padding: 10px 10px 10px 30px;
    li {
      position: relative;
      list-style-type: none;
      font-size: 24px;
      display: flex;
      align-items: center;
      line-height: 45px;
      span {
        position: absolute;
        top: 50%;
        left: -24px;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background: #FFEC95;
        border-radius: 50%;
      }
      em {
        position: absolute;
        top: 16px;
        width: 12px;
        height: 12px;
        background: #fff;
        border-radius: 50%;
      }
      i {
        color: #FFE363;
      }
      img{
        width: 34px;
        height: 36px;
        margin: 0 5px;
      }
    }
  }

</style>
