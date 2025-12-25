<template>
  <PopupBox size="1" @clickClose="clickClose">
    <div class="desc">开启次数不足，请前往充值</div>
    <div class="buttons">
      <div class="cancel" @click="clickClose">取消</div>
      <div class="confirm" @click="confirm">立即前往</div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  methods: {
    confirm() {
      this.$emit('handleRecharge')
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.desc {
  text-align: center;
  margin: 0 auto 45px auto;
  font-size: 32px;
  color: #FFFFFF;
  line-height: 1;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  >div {
    width: 176px;
    height: 76px;
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    border: 2px solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
  }
  .cancel {
    background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
  }
  .confirm {
    margin-left: 24px;
    background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
  }
}
</style>
