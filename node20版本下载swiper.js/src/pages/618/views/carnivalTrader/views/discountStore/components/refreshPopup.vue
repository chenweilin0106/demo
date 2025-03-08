<template>
  <PopupBox title="title_12.png" @clickClose="clickClose">
    <div class="tip1">确认刷新当前卡片吗？</div>
    <div class="tip2" v-if="refresh_price == 0">本次无需花费钻石</div>
    <div class="tip2" v-else>花费：{{refresh_price}}<img :src="IconPath('mk5_8.png')" /></div>
    <div class="btnArea">
      <div class="cancelBtn" @click="clickClose">取消</div>
      <div class="confirmBtn" @click="$emit('refreshfn')">确认</div>
    </div>
    <div class="bottomArea" v-if="refresh_price != 0">
      <div :class="['isTodayTip', `status${isTodayTipV}`]" @click="isTodayTipEx"></div>
      <span>今日不再提示</span>
    </div>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: ['refresh_price'],
  components: {},
  data() {
    return {
      isTodayTipV: false // 是否今日提示
    }
  },
  created() {
    this.isTodayTipV = localStorage.getItem('isTodayTip') ? localStorage.getItem('isTodayTip') !== 'false' : false
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 切换今日是否提示
     */
    isTodayTipEx() {
      this.isTodayTipV = !this.isTodayTipV
      localStorage.setItem('isTodayTip', this.isTodayTipV)
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.tip1{
  font-weight: 500;
  font-size: 34px;
  color: #FFFFFF;
  text-align: center;
  margin: 40px auto 0 auto;
}
.tip2{
  font-weight: 400;
  font-size: 30px;
  color: #FFE671;
  text-align: center;
  margin: 40px auto 0 auto;
  img{
    width: 46px;
    height: 46px;
    margin: 0 5px;
  }
}
.btnArea{
  display: flex;
  justify-content: center;
  margin: 20px 0;
  .cancelBtn{
    width: 240px;
    height: 72px;
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    border-radius: 36px;
    border: 3px solid #FFFFFF;
    font-weight: 400;
    font-size: 32px;
    color: #4D7DDD;
    text-align: center;
    line-height: 72px;
    margin: 0 20px;
  }
  .confirmBtn{
    width: 240px;
    height: 72px;
    background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
    border-radius: 36px;
    border: 3px solid #FFFFFF;
    font-weight: 400;
    font-size: 32px;
    color: #A9792C;
    text-align: center;
    line-height: 72px;
    margin: 0 20px;
  }
}
.bottomArea{
  font-size: 28px;
  color: #9C591C;
  display: flex;
  justify-content: center;
  align-items: center;
  .isTodayTip{
    width: 37px;
    height: 37px;
    &.statusfalse{
      background: url('@/pages/618/assets/tk_23.png') no-repeat left top/100% 100%;
    }
    &.statustrue{
      background: url('@/pages/618/assets/tk_22.png') no-repeat left top/100% 100%;
    }
  }
}

</style>
