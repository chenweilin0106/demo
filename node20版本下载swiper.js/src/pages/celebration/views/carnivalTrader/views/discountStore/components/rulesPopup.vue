<template>
  <PopupBox title="title_10.png" :size="3" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span><i>专属折扣</i>：玩家翻开卡片可获得随机商品的随机折</li>
        <li>扣。每次翻出的商品仅可购买一次</li>
        <li><span></span><i>刷新</i>：花费钻石或每日免费可使页面商品进行刷新，</li>
        <li>刷新后将重置卡片状态，玩家可重新翻开卡片获得</li>
        <li>专属折扣，刷新前翻出的商品不保留。每日可免费</li>
        <li>刷新三次全部商品列表，后续第4-20次刷新需<em>消</em></li>
        <li><em>费29钻</em>，第21-50次需<em>消费59钻</em>，第51次-200次</li>
        <li>需<em>消费99钻，200次为每日刷新上限</em></li>
        <li><span></span><i>悬赏任务</i>：在翻牌翻到此类商品后完成任务可免费</li>
        <li>领取商品。注：任务仅在卡片存在时生效，若未完</li>
        <li>成任务时刷新卡片则任务失效。</li>
        <li><span></span><i>商品库存</i><em>部分稀有商品有库存限制，每日0点、</em></li>
        <li><em>13点刷新库存数量</em>，若库存为0，则玩家翻牌时不</li>
        <li>会随机到为库存0的商品。若玩家翻卡时翻到部分</li>
        <li>商品购买时库存为0，可选择等待补充库存后购买</li>
      </ul>
    </div>
    <div class="areaTitle">待售商品</div>
    <div class="awardsArea">
      <div class="awardItem" v-for="(item) in awardsList" :key="item.id">
        <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
        <div class="awardText">{{item.text}}</div>
        <div class="awardNewMark" v-if="item.is_new"></div>
      </div>
    </div>
    <div class="areaTitle">折扣</div>
    <div class="img1"></div>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: [],
  components: {},
  data() {
    return {
      awardsList: [
        { id: 1, type: 'ring', icon: 'jz_hyzx.svga', text: '戒指' },
        { id: 2, type: 'ring', icon: 'jz_bysf.svga', text: '戒指' },
        { id: 3, type: 'ring', icon: 'hymd_120_120.png', text: '戒指', is_new: true },
        { id: 4, type: 'ring', icon: 'xyjz_120_120.png', text: '戒指' },
        { id: 5, type: 'tool', icon: 'zsmz_120_120.png', text: '戒指' },
        { id: 6, type: 'tool', icon: 'xsjz_120_120.png', text: '戒指' },
        { id: 10, type: 'car', icon: 'fsjc_120_120.png', text: '符石精粹' },
        { id: 7, type: 'tool', icon: 'tk_17.png', text: '绿晶石/紫晶石' },
        { id: 8, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图' },
        { id: 9, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' },
        { id: 11, type: 'car', icon: 'jffc_120_120.png', text: '座驾' },
        { id: 12, type: 'mic', icon: 'sb_tsqs', text: '声波' }
      ]
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.areaTitle{
  width: 240px;
  height: 44px;
  background: rgba(185, 78, 0, 0.5);
  border-radius: 22px;
  text-align: center;
  line-height: 44px;
  font-size: 26px;
  color: #FFF089;
  margin: 10px auto 30px auto;
}
.awardsArea{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  .awardItem{
    width: 120px;
    height: 120px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 4px solid #FBE590;
    margin: 0 30px 60px 30px;
    position: relative;
    .awardText{
      font-weight: 400;
      font-size: 26px;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -40px;
    }
    .awardNewMark{
      width: 46px;
      height: 39px;
      background: url('@/pages/celebration/assets/mk5_4.png') no-repeat left top/100% 100%;
      position: absolute;
      left: -14px;
      top: 0;
      transform: translateY(-50%);
    }
  }
}
.img1{
  width: 440px;
  height: 374px;
  background: url('@/pages/celebration/assets/tk_13.png') no-repeat left top/100% 100%;
  margin: 0 auto;
}
</style>
