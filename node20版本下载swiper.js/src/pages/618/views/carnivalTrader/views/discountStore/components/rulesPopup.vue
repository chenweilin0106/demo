<template>
  <PopupBox title="title_8.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>专属折扣：玩家翻开卡片可获得随机商品的随机折</li>
        <li>扣。每次翻出的商品仅可购买一次</li>
        <li><span></span>刷新：花费钻石或每日首次免费可使页面商品进行</li>
        <li>刷新，刷新后将重置卡片状态，玩家可重新翻开卡</li>
        <li>片获得专属折扣，刷新前翻出的商品不保留</li>
      </ul>
    </div>
    <div class="areaTitle">待售商品</div>
    <div class="awardsArea">
      <div class="awardItem" v-for="(item) in awardsList" :key="item.id">
        <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
        <div class="awardText">{{item.text}}</div>
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
        { id: 2, type: 'ring', icon: 'jz_llzh.svga', text: '戒指' },
        { id: 3, type: 'ring', icon: 'prxd_120_120.png', text: '戒指' },
        { id: 4, type: 'ring', icon: 'byg_120_120.png', text: '戒指' },
        { id: 5, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券' },
        { id: 6, type: 'tool', icon: 'fsjc_120_120.png', text: '精粹' },
        { id: 7, type: 'tool', icon: 'tk_17.png', text: '绿晶石/紫晶石' },
        { id: 8, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图' },
        { id: 9, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' },
        { id: 10, type: 'car', icon: 'asqbt_120_120.png', text: '座驾' },
        { id: 11, type: 'car', icon: 'lmdc_120_120.png', text: '座驾' },
        { id: 12, type: 'mic', icon: 'ts_yhcl.svga', text: '头饰' }
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
  background: #9F5926;
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
  }
}
.img1{
  width: 440px;
  height: 374px;
  background: url('@/pages/618/assets/tk_18.png') no-repeat left top/100% 100%;
  margin: 0 auto;
}
</style>
