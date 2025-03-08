<template>
  <PopupBox :title="'mk9_title_7.png'" @clickClose="clickClose">
    <div class="titlesListArea">
      <div class="titleItem" v-for="(item, index) in titlesList" :key="index">
        <PublicImg :imgName="item.icon" :imgType="'title'"></PublicImg>
        <div class="titleText">戒指+1</div>
        <div class="priceMarkIcon" v-if="item.show_price&&item.show_price>0">
          {{item.show_price}}<img :src="IconPath('zs_27_20.png')" />
        </div>
        <div class="probMark">
          {{item.prob}}%
        </div>
      </div>
    </div>
    <div class="tip1">融合后随机获得一枚戒指</div>
  </PopupBox>
</template>

<script>
export default {
  name: 'ringGiftRulesPopup',
  props: [],
  components: {},
  data() {
    return {
      titlesList: [
        { icon: 'jz_fhyf.svga', show_price: 13140, prob: 30 },
        { icon: 'jz_zays.svga', show_price: 15999, prob: 25 },
        { icon: 'jz_qydz.svga', show_price: 15999, prob: 25 },
        { icon: 'jz_ydss.svga', show_price: 20999, prob: 20 }
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
.titlesListArea{
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .titleItem{
    width: 128px;
    height: 128px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 4px solid #DBC1FF;
    margin: 20px 40px 60px 40px;
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
    .priceMarkIcon{
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 15px;
      font-weight: bold;
      font-size: 20px;
      color: #FFFFFF;
      padding: 2px 12px;
      position: absolute;
      right: -20px;
      top: 0;
      transform: translateY(-50%);
      img{
        width: 27px;
        height: 20px;
      }
    }
    .probMark{
      background: #419BC4;
      border-radius: 14px;
      font-weight: 500;
      font-size: 18px;
      color: #FFFFFF;
      padding: 4px 10px 2px 10px;
      position: absolute;
      right: -20px;
      top: 0;
      transform: translateY(50%);
    }
  }
}
.tip1{
  font-weight: 400;
  font-size: 26px;
  color: #6E56E7;
  line-height: 36px;
  text-align: center;
  margin-top: 20px;
}
</style>
