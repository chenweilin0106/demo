<template>
  <PopupBox :title="'title_10.png'" @clickClose="clickClose">
    <div class="titleText">玩法规则：</div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span><i>【个人玩法】</i>玩家<em>每消费150钻石</em>可获得1次游历次</li>
        <li>数，<em>每日可免费游历1次</em></li>
        <li><span></span><i>【全服玩法】</i>每当<em>全服游历5000次后</em>，将激活纪</li>
        <li>念币双倍时刻，有效时间为10分钟，期间玩家获得</li>
        <li>的纪念币为<em>普通模式的2倍，且有机会获得开放时</em></li>
        <li><em>间已结束景点的纪念币</em></li>
        <li><span></span><i>【景点纪念币】</i>在景点对应的时间内游历江湖，获</li>
        <li>得的纪念币可用于《游历市集》模块兑换喜欢的奖</li>
        <li>励~</li>
        <li><span></span><i>【景点时间】</i>桃源深处（10月1日~2日）、绿水青</li>
        <li>山（10月3日~4日）、异域风情（10月5日~7日）</li>
      </ul>
    </div>
    <div class="titleText">普通游历奖励如下：</div>
    <div class="img1"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>随机技能道具：口香糖、神功丸、OK绷、聚宝盆、</li>
        <li>魔术帽、手铐</li>
        <li><span></span>活动返场礼物：</li>
      </ul>
    </div>
    <div class="rewardsShowDiv">
      <div class="reward" v-for="(it,i) in rewards" :key="i">
        <PublicImg :imgName="it.icon" :imgType="it.type"></PublicImg>
        <div class="rewardText" v-html="it.text"></div>
        <div class="rewardPrice" v-if="it.price">{{it.price}}<img :src="IconPath('zs_27_20.png')" /></div>
      </div>
    </div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>【繁花一梦】礼物：仅钻石可赠送</li>
      </ul>
    </div>
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
  height: 692px;
  background: url('@/pages/goldenAutumn/assets/tk_13.png') no-repeat left top/100% 100%;
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
