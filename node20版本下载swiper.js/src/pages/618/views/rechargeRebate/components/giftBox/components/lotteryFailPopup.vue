<template>
  <PopupBox :hasBottom="false" :hasStar="false" @clickClose="clickClose">
    <p class="text-nowrap line-height-100">开启次数不足，请前往充值</p>
    <div class="buttons flex align-center justify-center">
      <PublicButton class="cancel-button" hasRight="0" @click="clickClose">取消</PublicButton>
      <PublicButton class="confirm-button" hasRight="1" @click="recharge">立即前往</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
export default {
  methods: {
    recharge() {
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
::v-deep .popupContent {
  width: 580px;
  padding: 0;
}
::v-deep .main {
  height: 280px;
}
p {
  width: fit-content;
  font-size: 32px;
  color: #ffffff;
  margin: 68px auto;
}

.buttons {
  .cancel-button,
  .confirm-button {
    width: 240px;
    height: 72px;
    border-radius: 36px;
    font-size: 32px;
  }
  .confirm-button {
    margin-left: 24px;
  }
}
</style>
