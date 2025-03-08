<template>
  <PopupBox :title="'title_14.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span><i>【基础规则】</i>玩家<em>每充值20元</em>可获得1枚【寻宝币】</li>
        <li>，每日首次寻宝不消耗寻宝币</li>
        <li><span></span><i>【奖池设定】</i>每层设有【秘宝】，抽到秘宝奖励<em>可</em></li>
        <li><em>获得双倍数量</em>。在1、2层为不放回式抽奖，奖励不</li>
        <li>可重复获得，抽到秘宝<em>可解锁下一层</em>，第3层为放</li>
        <li>回式抽奖，<em>奖励可重复获得</em></li>
        <li><span></span><i>【活动重置】</i><em>每天0点重置</em>活动进度为初始状态</li>
        <li><span></span><i>【buff加成】</i>每日进入活动页面可翻开一张卡牌，</li>
        <li>有机会获得<i>神秘加成效果</i>~若次日0点后前一天加成</li>
        <li>未结束，则需等待当前加成效果结束时再次获得加</li>
        <li>成</li>
        <li><span></span>十连寻宝时每次寻宝单独判定是否触发buff</li>
      </ul>
    </div>
    <div class="img1"></div>
    <div class="img2"></div>
    <div class="img3"></div>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: [],
  components: {},
  data() {
    return {
      rewards: [
        { id: 1, type: 'tool', icon: 'hd_120_120.png', text: '花灯', price: '99' },
        { id: 2, type: 'tool', icon: 'xsl_120_120.png', text: '小神龙', price: '299' },
        { id: 3, type: 'tool', icon: 'axzsj_120_120.png', text: '爱心直升机', price: '520' }
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

<style scoped lang="scss">
.titleText{
  font-weight: 400;
  font-size: 24px;
  color: #FFFFFF;
  line-height: 36px;
  margin-left: 5px;
}
.img1{
  width: 555px;
  height: 375px;
  background: url('@/pages/nationalDay/assets/tk_21.png') no-repeat left top/100% 100%;
  margin: 0 auto 20px auto;
}
.img2{
  width: 555px;
  height: 439px;
  background: url('@/pages/nationalDay/assets/tk_22.png') no-repeat left top/100% 100%;
  margin: 0 auto 20px auto;
}
.img3{
  width: 555px;
  height: 566px;
  background: url('@/pages/nationalDay/assets/tk_23.png') no-repeat left top/100% 100%;
  margin: 0 auto;
}
.rewardsShowDiv{
  display: flex;
  flex-direction: row;
  margin: 20px 10px 40px 10px;
  justify-content: center;
  .reward{
    width: 120px;
    height: 120px;
    background: linear-gradient(180deg, #FFF5C3, #FFFFFF);
    border-radius: 12px;
    border: 4px solid #E06224;
    position: relative;
    margin: 0px 20px;
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
    .rewardPrice{
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 17px;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
      padding: 5px 0px 5px 10px;
      position: absolute;
      right: -10px;
      top: -16px;
      img{
        width: 27px;
        height: 20px;
        margin: 0 5px;
      }
    }
  }
}
</style>
