<template>
  <PopupBox title="title_12.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每日充值任意金额可领取超值礼包，内含</li>
        <li>随机倍数的绿晶石奖励、藏宝图+1及随机稀有奖励</li>
        <li>最高可得1000绿晶石。</li>
        <li><span></span>奖励如下：</li>
      </ul>
    </div>
    <img :src="IconPath('tk_11.png')" class="table" />
    <img :src="IconPath('tk_12.png')" class="table" />
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
.table{
  display: block;
  margin: 10px auto 0;
  width: 549px;
}
</style>
