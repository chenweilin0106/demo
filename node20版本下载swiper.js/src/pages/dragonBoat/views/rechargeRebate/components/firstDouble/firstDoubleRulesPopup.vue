<template>
  <PopupBox title="title_9.png" @clickClose="clickClose">
    <div class="scrollContainer overflow-x-hidden overflow-y-scroll w-100 h-100">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>活动期间每日充值任意金额可领取超值礼包，内</li>
          <li>含随机倍数的绿晶石奖励、藏宝图+1及随机稀有</li>
          <li>奖励最高可得1000绿晶石。</li>
          <li><span></span>奖励如下：</li>
        </ul>
      </div>
      <img :src="IconPath('tk_1.png')" class="tableImg1 block margin-row-center" />
      <img :src="IconPath('tk_2.png')" class="tableImg2 block" />
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
::v-deep .popupContent {
  width: 608px !important;
}
::v-deep .main {
  //z-index: 0;
  height: 900px;
  padding: 0 !important;
}
.scrollContainer {
  padding-top: 71px;
  padding-bottom: 20px;
}
.tableImg1 {
  margin-top: 10px;
  width: 554px;
  height: 438px;
}
.tableImg2 {
  margin-top: 20px;
  margin-left: 10px;
  width: 567px;
  height: 374px;
}
.rules-text-popup {
  width: fit-content;
  margin-left: 45px;
  margin-right: auto;
}
</style>
