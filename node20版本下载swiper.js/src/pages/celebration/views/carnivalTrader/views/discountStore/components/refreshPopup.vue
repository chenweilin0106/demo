<template>
  <PopupBox title="title_12.png" :size="2" @clickClose="clickClose">
    <div class="tip1">确认刷新当前卡片吗？</div>
    <div class="tip3" v-if="isTaskTip">刷新后悬赏任务将会失效</div>
    <div class="tip2" v-if="refresh_price == 0">本次无需花费钻石</div>
    <div class="tip2" v-else>花费：{{refresh_price}}<img :src="IconPath('zs_42_32.png')" /></div>
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
  props: ['refresh_price', 'gift_list'],
  components: {},
  data() {
    return {
      isTaskTip: false, // 是否有任务
      popupType: 'A', // 弹窗类型
      isTodayTipV: false // 是否今日提示
    }
  },
  created() {
    for (let it of this.gift_list) {
      if (it.task_id != 0) {
        this.popupType = 'B'
        break
      }
    }
    this.isTodayTipV = localStorage.getItem(`isTodayTip${this.popupType}`) ? localStorage.getItem(`isTodayTip${this.popupType}`) !== 'false' : false
    for (let item of this.gift_list) {
      if (item.task_id != 0 && item.task_status != 2) {
        this.isTaskTip = true
        break
      }
    }
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
      localStorage.setItem(`isTodayTip${this.popupType}`, this.isTodayTipV)
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
  margin: 20px auto 0 auto;
  img{
    width: 43px;
    height: 32px;
    margin: 0 5px;
  }
}
.tip3{
  font-weight: 500;
  font-size: 34px;
  color: #F13A21;
  text-align: center;
  margin: 10px auto 0 auto;
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
      background: url('@/pages/celebration/assets/tk_23.png') no-repeat left top/100% 100%;
    }
    &.statustrue{
      background: url('@/pages/celebration/assets/tk_22.png') no-repeat left top/100% 100%;
    }
  }
}

</style>
