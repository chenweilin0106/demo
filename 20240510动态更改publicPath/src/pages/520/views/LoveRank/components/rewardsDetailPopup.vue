<template>
  <div class="compo">
    <PopupBox :title="'title_19.png'" @clickClose="clickClose">
      <div class="img1"></div>
      <div class="rewardsArea">
        <div class="rewardsDivItem" v-for="(item) in rewardsList" :key="item.id">
          <div class="nameDiv">{{item.name}}</div>
          <div class="rewardsShowDiv">
            <div class="reward" v-for="(it,i) in item.rewards" :key="i">
              <PublicImg :imgName="it.icon" :userAvatar="it.type=='mic'?$store.state.user_icon:''"></PublicImg>
              <div class="rewardText" v-html="it.text"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="rulesText-popup">
        <ul>
          <li><span></span>总榜前10上榜条件：热恋值达到99,999</li>
          <li>&ensp;</li>
          <li><span></span><i>【甜蜜遨游】双人座驾</i>：当情侣双方在同一个房间</li>
          <li>时，乘坐该座驾将触发双人特效；若未结婚或仅有</li>
          <li>一人在房间则只展示普通效果</li>
          <li>激活奖励：</li>
          <li><span></span><i>【5202024&2024520】靓号</i>：7位靓号，</li>
          <li>CP双方为5202024&2024520</li>
          <li><span></span><i>【520ABCD&ABCD520】靓号</i>：7位靓号，</li>
          <li>例如5201234&1234520（ABCD不可带有520）</li>
          <li><span></span><i>【520AABB&AABB520】靓号</i>：7位靓号，</li>
          <li>例如5201122&1122520（AABB不可为3344）</li>
          <li><span></span>若未达到对应热恋值但达到对应名次<i>可获得其他奖</i></li>
          <li><i>励</i>，不可获得靓号</li>
          <li><span></span>靓号奖励只可获取其中<i>一款</i></li>
          <li><span></span>注：靓号ABCD各数字不可相同，不与520、1314、</li>
          <li>3344重复。获奖时需与<i>官方确认</i>可选范围内的号</li>
          <li>段。若与其他分组获奖玩家意向号码相同，则优先</li>
          <li>热恋值高的玩家进行选号</li>
        </ul>
      </div>
    </PopupBox>
  </div>
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
            { type: 'mic', icon: 'ts_yhzs_01.svga', text: '【永恒之誓】头饰\n<em>定制版</em>+180天' },
            { type: 'ring', icon: 'jz_ydss.svga', text: '【缘定三生】\n戒指+1' },
            { type: 'car', icon: 'car_tmay.png', text: '【甜蜜遨游】\n双人座驾+15天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝+300万' }
          ]
        }, {
          id: 2,
          name: '第2名',
          rewards: [
            { type: 'mic', icon: 'ts_yhzs_02.svga', text: '【永恒之誓】头饰\n限定版+15天' },
            { type: 'ring', icon: 'jz_ydss.svga', text: '【缘定三生】\n戒指+1' },
            { type: 'car', icon: 'car_tmay.png', text: '【甜蜜遨游】\n双人座驾+7天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝+150万' }
          ]
        }, {
          id: 3,
          name: '第3名',
          rewards: [
            { type: 'mic', icon: 'ts_yhzs_02.svga', text: '【永恒之誓】头饰\n限定版+7天' },
            { type: 'ring', icon: 'jz_ydss.svga', text: '【缘定三生】\n戒指+1' },
            { type: 'car', icon: 'car_tmay.png', text: '【甜蜜遨游】\n双人座驾+5天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝+100万' }
          ]
        }, {
          id: 4,
          name: '第4~5名',
          rewards: [
            { type: 'mic', icon: 'ts_yhzs_02.svga', text: '【永恒之誓】头饰\n限定版+5天' },
            { type: 'car', icon: 'car_tmay.png', text: '【甜蜜遨游】\n双人座驾+3天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝+50万' }
          ]
        }, {
          id: 5,
          name: '第6~10名',
          rewards: [
            { type: 'mic', icon: 'ts_yhzs_02.svga', text: '【永恒之誓】头饰\n限定版+3天' },
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝+30万' }
          ]
        }, {
          id: 6,
          name: '第11~30名',
          rewards: [
            { type: 'tool', icon: 'yb_120_120.png', text: '元宝+10万' }
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
.compo{
  .img1 {
    width: 580px;
    height: 1020px;
    background: url('@/pages/520/assets/tk_29.png') no-repeat left top/100% 100%;
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
      .nameDiv{
        width: 200px;
        height: 42px;
        background: rgb(217, 76, 129, 0.7);
        border-radius: 21px;
        text-align: center;
        line-height: 42px;
        font-size: 26px;
      }
      .rewardsShowDiv{
        display: flex;
        flex-direction: row;
        margin: 20px 0px 80px 0px;
        justify-content: center;
        .reward{
          width: 120px;
          height: 120px;
          background: linear-gradient(180deg, #FFD7EC, #FFFFFF);
          border-radius: 12px;
          border: 4px solid #F598BB;
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
    width: 580px;
    margin: 0 auto;
    background: rgba(179, 40, 91, 0.3);
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
        background: #fff;
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
}
</style>
