<template>
  <PopupBox :title="'mk2_title_8.png'" @clickClose="clickClose">
    <div class="img1"></div>
    <div class="img2"></div>
    <div class="img4"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>玩法时间：11.18 0点至活动结束</li>
        <li><span></span>演奏次数可祝福为永恒值，绑定后双方永恒值累</li>
        <li>计计算</li>
        <li><span></span>根据累计永恒值进度领取对应奖励</li>
      </ul>
    </div>
    <div class="img3"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>玩法时间：11.22至活动结束</li>
        <li><span></span>统计活动期间所有消费钻石数量</li>
      </ul>
    </div>
    <div class="text1">返场称号列表：</div>
    <!-- <div class="titlesListArea">
      <div class="titleItem" v-for="(item, index) in titlesList" :key="index">
        <PublicImg :imgName="item.icon" :imgType="'title'"></PublicImg>
        <div class="titleText">永久称号</div>
      </div>
    </div> -->
    <div class="textArea">一代枭雄、一代枭雄、一代枭雄、一代枭
一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
雄、一代枭雄、一代枭雄、一代枭雄、一代枭雄、一
代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
雄、一代枭雄、一代枭雄、一代枭雄、一代枭雄、一
代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
一代枭雄、一代枭雄、一代枭雄、一代枭雄、一代枭
雄、一代枭雄、一代枭雄、一代枭雄、一代枭雄、一
代枭雄、一代枭雄、</div>
    <div class="text1">点亮礼物次数列表：</div>
    <div class="textArea"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span><em>注：若已获得列表所有称号、已经成功点亮列表礼</em></li>
        <li><em>物墙，则奖励将折算为绿晶石+500</em></li>
      </ul>
    </div>
    <!-- <div class="div1"></div> -->
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: [],
  components: {},
  data() {
    return {
      titlesList: [
        { icon: 'ch_dmt' },
        { icon: 'ch_dmt' },
        { icon: 'ch_dmt' },
        { icon: 'ch_dmt' }
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
.div1{
  height: 50px;
}
.img1{
  width: 453px;
  height: 33px;
  background: url('@/pages/celebration/assets/tk_49.png') no-repeat left top/100% 100%;
  margin: 0px auto 10px auto;
}
.img2{
  width: 555px;
  height: 566px;
  background: url('@/pages/celebration/assets/tk_51.png') no-repeat left top/100% 100%;
  margin: 0px auto 10px auto;
}
.img4{
  width: 453px;
  height: 33px;
  background: url('@/pages/celebration/assets/tk_62.png') no-repeat left top/100% 100%;
  margin: 0px auto 10px auto;
}
.img3{
  width: 479px;
  height: 33px;
  background: url('@/pages/celebration/assets/tk_50.png') no-repeat left top/100% 100%;
  margin: 0px auto 10px auto;
}
.text1{
  font-weight: 400;
  font-size: 26px;
  color: #FFFFFF;
  line-height: 36px;
  padding: 0 40px;
  margin-top: 10px;
}
.titlesListArea{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .titleItem{
    width: 180px;
    height: 120px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 4px solid #DBC1FF;
    margin: 0px 30px 60px 30px;
    position: relative;
    .titleText{
      font-weight: 400;
      font-size: 28px;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -46px;
    }
  }
}
.textArea{
  width: 589px;
  height: 349px;
  background: rgba(102, 51, 219, 0.3);
  border-radius: 20px;
  margin: 20px auto;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  font-weight: 400;
  font-size: 24px;
  color: #FFFFFF;
  white-space: pre-wrap;
}
</style>
