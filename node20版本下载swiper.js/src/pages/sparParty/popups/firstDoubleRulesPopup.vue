<template>
  <PopupBox title="title_5.png" @clickClose="clickClose">
    <div class="scrollBox overflow-x-hidden overflow-y-scroll">
      <div class="rule-text">
        <ul>
          <li><span></span>活动期间每日充值任意金额可领取超值礼</li>
          <li>包，内含随机倍数的绿晶石奖励、藏宝图</li>
          <li>+1及随机稀有奖励最高可得1000绿晶石。</li>
          <li><span></span>奖励如下：</li>
        </ul>
      </div>
      <img :src="IconPath('tk_12.png')" class="tableImg1 block margin-row-center" />
      <img :src="IconPath('tk_14.png')" class="tableImg2 block margin-row-center" />
    </div>
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.scrollBox {
  height: 800px;
}
.rule-text {
  margin-left: 50px;
}
.tableImg1 {
  margin-top: 10px;
  width: 554px;
}
.tableImg2 {
  margin-top: 20px;
  //margin-left: 42px;
  width: 567px;
}
</style>
