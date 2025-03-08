<template>
  <PopupBox title="title_11.png" @clickClose="clickClose">
    <div class="scrollContainer overflow-x-hidden overflow-y-scroll w-100 h-100">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>活动期间每日充值任意金额可领取超值礼包，内</li>
          <li>含随机倍数的绿晶石奖励、藏宝图+1及随机稀有</li>
          <li>奖励最高可得1000绿晶石。</li>
          <li><span></span>奖励如下：</li>
        </ul>
      </div>
      <img :src="IconPath('tk_11.png')" class="tableImg1 block margin-row-center" />
      <img :src="IconPath('tk_12.png')" class="tableImg2 block" />
    </div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/520/components/popupBox.vue'
export default {
  components: { PopupBox },
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
  padding: 0;
  background: linear-gradient(0deg, #f9c984, #f378a6);
  border-radius: 144px 144px 84px 84px;
  border: 4px solid #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
}
::v-deep .main {
  height: 900px;
  max-height: none !important;
  overflow-y: visible !important;
  overflow-x: visible !important;
  border-radius: 140px 140px 80px 80px;
}
::v-deep .titleIcon {
  z-index: 1;
  top: -99px !important;
}
.scrollContainer {
  padding-top: 80px;
  padding-bottom: 30px;
  border-radius: 140px 140px 80px 80px;
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
