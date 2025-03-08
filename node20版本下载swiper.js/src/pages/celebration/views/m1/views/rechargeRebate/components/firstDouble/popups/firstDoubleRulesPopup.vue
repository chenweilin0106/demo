<template>
  <PopupBox title="mk1_title_12.png" size="2" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每日充值任意金额可领取超值礼包，内含</li>
        <li>随机倍数的绿晶石奖励、藏宝图+1及随机稀有奖励</li>
        <li>最高可得1000绿晶石。</li>
        <li><span></span>奖励如下：</li>
      </ul>
    </div>
    <img :src="IconPath('tk_11.png')" class="tableImg1 block margin-row-center" />
    <img :src="IconPath('tk_12.png')" class="tableImg2 block" />
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
::v-deep .main {
  height: 255px + 653 + 278 - 274;
}
//.rules-text-popup {
//  margin-left: 50px;
//}
.tableImg1 {
  margin-top: 10px;
  width: 554px;
}
.tableImg2 {
  margin-top: 20px;
  margin-left: 35px; /*todo 边框两边步不均匀时手动居中*/
  width: 567px;
}
</style>
