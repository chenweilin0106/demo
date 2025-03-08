<template>
  <PopupBox @clickClose="clickClose">
    <div class="tipDiv">确认花费{{config.sailingType==2?'49':config.sailingType==3?'450':null}}钻石，进行{{config.sailingType==2?'1':config.sailingType==3?'10':null}}次航行吗</div>
    <div class="btn">
      <div class="cancelBtn" @click="clickClose">取消</div>
      <div class="confirmBtn" @click="confirmBtnCk">确定</div>
    </div>
    <div class="isTodayNoTipArea">
      <div :class="['isTodayNoTipIcon',config.isTodayNoTip==1?'act':'unact']" @click="changeIsTodayNoTip"></div>
      <span>&ensp;今日不再提示</span>
    </div>
  </PopupBox>
</template>

<script>

export default {
  props: ['config'],
  data() {
    return {
      isShowPo: true
    }
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    confirmBtnCk() {
      this.$emit('drawApi', this.config.sailingType)
    },
    changeIsTodayNoTip () {
      // eslint-disable-next-line vue/no-mutating-props
      this.config.isTodayNoTip = this.config.isTodayNoTip == 1 ? 0 : 1
      localStorage.setItem('isTodayNoTip', this.config.isTodayNoTip)
    }
  }
}
</script>

<style scoped lang="scss">
.tipDiv{
  font-size: 32px;
  color: #FFFFFF;
  text-align: center;
  margin: 40px auto 60px auto;
}
.btn{
  display: flex;
  justify-content: space-evenly;
  .cancelBtn{
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
    border-radius: 36px;
    border: 2px solid;
    border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
    font-size: 32px;
    color: #4A50D1;
    line-height: 72px;
    text-align: center;
  }
  .confirmBtn{
    width: 240px;
    height: 72px;
    background: linear-gradient(180deg, #F599FF, #8A6AF3);
    border-radius: 36px;
    border: 2px solid #F9C9FF;
    font-size: 32px;
    color: #fff;
    line-height: 72px;
    text-align: center;
  }
}
.isTodayNoTipArea{
  font-size: 24px;
  color: #FFFFFF;
  line-height: 36px;
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0;
  .isTodayNoTipIcon{
    width: 36px;
    height: 36px;
    &.act{
      background: url('@/pages/mayDay2024/assets/tk_12_1.png') no-repeat left top/100% 100%;
    }
    &.unact{
      background: url('@/pages/mayDay2024/assets/tk_12.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
