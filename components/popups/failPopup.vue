<template>
  <PopupBox size="1" @clickClose="clickClose">
    <div class="desc text-center margin-row-center">钻石余额不足，请充值</div>
    <div class="buttons flex align-center justify-center">
      <PublicButton has-right="0" class="cancel" @click="clickClose">取消</PublicButton>
      <PublicButton has-right="1" class="confirm" @click="confirm">充值</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  methods: {
    confirm() {
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
.desc{
  margin-bottom: 45px;
  font-size: 32px;
  color: #FFFFFF;
}
.buttons{
  .publicButton{
    font-size: 32px;
    width: 176px;
    height: 76px;
    &:first-child{
      margin-right: 24px;
    }
  }
}
</style>
