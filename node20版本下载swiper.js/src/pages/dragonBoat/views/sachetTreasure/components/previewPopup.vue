<template>
  <div class="compo">
    <PopupBox :title="'title_12.png'" @clickClose="clickClose">
      <div :class="['previewImg',(config.type=='pst_privilege'||config.type=='car')?'gift':config.type=='title'?'title':'other']">
        <PublicImg :imgName="config.img" :imgType="config.type"></PublicImg>
      </div>
      <div class="tip1" v-html="config.tip1"></div>
      <!-- <div class="tip2" v-html="config.tip2"></div> -->
    </PopupBox>
  </div>
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
.compo{
  .previewImg{
    margin: 0px auto 0 auto;
    overflow: hidden;
    &.gift{
      width: 427px;
      height: 740px;
      background: url('@/pages/dragonBoat/assets/tk_39.png') no-repeat left top/100% 100%;
    }
    &.title{
      width: 210px*1.4;
      height: 96px*1.4;
    }
    &.other{
      width: 120px*1.4;
      height: 120px*1.4;
    }
  }
  .tip1{
    font-size: 28px;
    color: #1B9094;
    text-align: center;
    margin: 30px auto 0 auto;
    white-space: pre-wrap;
  }
  .tip2{
    font-size: 24px;
    color: #B06800;
    text-align: center;
    margin: 10px auto 0 auto;
    white-space: pre-wrap;
  }
}
</style>
