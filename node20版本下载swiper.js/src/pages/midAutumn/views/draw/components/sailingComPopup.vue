<template>
  <PopupBox @clickClose="clickClose">
    <div class="tipDiv1">确认花费{{config.drawNum==1?(config.drawType==1?49:config.drawType==2?0:null):config.drawNum==10?(config.drawType==1?450:config.drawType==2?270:config.drawType==3?405:config.drawType==4?382:config.drawType==5?360:config.drawType==6?360:null):null}}<img :src="IconPath('zs_27_20.png')"/></div>
    <div class="tipDiv2">进行<i>{{config.drawNum}}次飞行</i>吗</div>
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
      this.$emit('drawApi', this.config.drawNum, this.config.drawType)
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
.tipDiv1{
  font-weight: bold;
  font-size: 32px;
  color: #FFFFFF;
  text-align: center;
  margin: 40px auto 0px auto;
  i{
    color: #FFEF83;
  }
  img{
    width: 27px*1.8;
    height: 20px*1.8;
    margin: 0 5px;
  }
}
.tipDiv2{
  font-weight: 500;
  font-size: 30px;
  color: #FFFFFF;
  text-align: center;
  margin: 20px auto 60px auto;
  i{
    color: #FFEF83;
  }
}
.btn{
  display: flex;
  justify-content: space-evenly;
  .cancelBtn{
    width: 200px;
    height: 72px;
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    border-radius: 36px;
    border: 3px solid #FFFFFF;
    font-size: 32px;
    color: #4A50D1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .confirmBtn{
    width: 200px;
    height: 72px;
    background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
    border-radius: 36px;
    border: 2px solid #FFFFFF;
    font-size: 32px;
    color: #A9792C;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.isTodayNoTipArea{
  font-size: 28px;
  color: #FFFFFF;
  line-height: 50px;
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0;
  .isTodayNoTipIcon{
    width: 46px;
    height: 46px;
    &.act{
      background: url('@/pages/midAutumn/assets/tk_16.png') no-repeat left top/100% 100%;
    }
    &.unact{
      background: url('@/pages/midAutumn/assets/tk_17.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
