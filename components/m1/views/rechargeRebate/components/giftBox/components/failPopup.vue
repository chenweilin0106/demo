<template>
  <PopupBox size="3" @clickClose="clickClose">
    <div class="desc text-center margin-row-center">开启{{config}}不足，请前往充值</div>
    <div class="buttons flex align-center justify-center">
      <PublicButton has-right="0" class="cancel" @click="clickClose">取消</PublicButton>
      <PublicButton has-right="1" class="confirm" @click="confirm">立即前往</PublicButton>
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
    width: 246px;
    height: 78px;
    &:first-child{
      margin-right: 18px;
    }
  }
}
</style>
