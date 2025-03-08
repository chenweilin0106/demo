<template>
  <PopupBox :title="'title_18.png'" @clickClose="clickClose">
    <div :class="['previewImg',(config.type=='pst_privilege'||config.type=='car')?'gift':config.type=='title'?'titleSp':config.type=='CP_card'?'cpCardSp':'other']">
      <PublicImg :imgName="config.img" :imgType="config.type"></PublicImg>
      <div class="cpIcon" v-if="config.type=='CP_card'"></div>
    </div>
    <div class="tip1Text" v-html="config.tip1"></div>
    <div class="tip2Text" v-html="config.tip2"></div>
  </PopupBox>
</template>

<script>
export default {
  name: 'previewPopup',
  props: ['config'],
  components: {},
  data() {
    return {

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
.previewImg{
  margin: 0px auto 0 auto;
  overflow: hidden;
  background: #FFFFFF;
  border-radius: 20px;
  border: 4px solid #E06224;
  &.gift{
    width: 427px;
    height: 740px;
    background: url('@/pages/midAutumn/assets/tk_20.png') no-repeat left top/100% 100%;
  }
  &.titleSp{
    width: 210px*1.4;
    height: 96px*1.4;
  }
  &.cpCardSp{
    width: 455px;
    height: 217px;
    position: relative;
    .cpIcon{
      width: 394px;
      height: 180px;
      background: url('@/pages/midAutumn/assets/tk_50.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      top: 46%;
      transform: translate(-50%,-50%);
    }
  }
  &.other{
    width: 120px*1.4;
    height: 120px*1.4;
  }
}
.tip1Text{
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin: 30px auto 0 auto;
  white-space: pre-wrap;
}
.tip2Text{
  font-size: 24px;
  color: #E63E03;
  text-align: center;
  margin: 10px auto 0 auto;
  white-space: pre-wrap;
}
</style>
