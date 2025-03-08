<template>
  <PopupBox @clickClose="clickClose">
    <p class="text-nowrap line-height-100">开启次数不足，请前往充值</p>
    <div class="buttons flex align-center justify-center">
      <div class="cancel-button" @click="clickClose">取消</div>
      <div class="confirm-button" @click="toRecharge">立即前往</div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  methods: {
    toRecharge() {
      this.$emit('recharge')
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep.popupContent {
  width: 484px;
  height: 292px;
}
p {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #FFFFFF;
  margin-bottom: 53px;
}
.button {
  width: 240px;
  height: 76px;
  font-size: 28px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
}
.cancel-button {
  @extend .button;
  background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left top/100% 100%;
}
.confirm-button {
  margin-left: 40px;
  @extend .button;
  background: url('@/pages/sparParty/assets/btn_4.png') no-repeat left top/100% 100%;
}
</style>
