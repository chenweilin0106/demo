<template>
  <PopupBox title="title_12.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值30元可获得1次开启机会，每次</li>
        <li>随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活</li>
        <li>力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_13.png')" class="table-1 block margin-row-center" />
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
  position: relative;
  z-index: 1;
  height: 847px;
  max-height: none !important;
  overflow: hidden !important;
  border-radius: 140px 140px 80px 80px;
  padding-top: 86px;
}
::v-deep .titleIcon {
  z-index: 1;
  top: -99px !important;
}
.rules-text-popup {
  width: fit-content;
  margin-left: 45px;
  margin-right: auto;
  li {
    line-height: 36px;
  }
}
.table-1 {
  margin-top: 10px;
  width: 555px;
  height: 565px;
}
</style>
