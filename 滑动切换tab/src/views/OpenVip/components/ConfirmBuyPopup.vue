<template>
  <BasePopup title="tk_2.png" @close="clickClose">
    <div class="tip line-height-100 width-fit margin-row-center">7天银卡体验卡</div>
    <div class="awardIcon margin-row-center flex align-center justify-center">
      <img :src="IconPath('card_silver_120_120.png')" class="h-100" />
    </div>
    <div class="awardText line-height-100 width-fit margin-row-center">花费:￥6元</div>
    <div class="confirmButton margin-row-center">
      <div class="confirmButtonMain flex align-center justify-center line-height-100">确认购买</div>
    </div>
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/BasePopup.vue'
export default {
  components: { BasePopup },
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 462px;
  height: 491px;
}
.tip {
  margin-top: 19px;
  margin-bottom: 21px;
  font-weight: bold;
  font-size: 26px;
  color: #d57c00;
}
.awardIcon {
  width: 120px;
  height: 120px;
  background: linear-gradient(0deg, #f8ba4e, #fde181);
  border-radius: 20px;
}
.awardText {
  margin-top: 15px;
  font-weight: 500;
  font-size: 26px;
  color: #9c4d01;
}
.confirmButton {
  margin-top: 21px;
  width: 306px;
  height: 100px;
  background: url('@/assets/tk_7.png') no-repeat left top/100% 100%;
  .confirmButtonMain {
    margin-left: 16px;
    width: 280px;
    height: 85px;
    font-weight: 500;
    font-size: 30px;
    color: #ffffff;
  }
}
</style>
