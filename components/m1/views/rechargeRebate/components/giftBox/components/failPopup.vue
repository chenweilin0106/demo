<template>
  <PopupBox @clickClose="clickClose">
    <div class="desc text-center margin-row-center">开启{{config}}不足，请前往充值</div>
    <div class="buttons flex align-center justify-center">
      <div class="cancel status0" @click="clickClose">取消</div>
      <div class="confirm status1" @click="confirm">立即前往</div>
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
  color: #6C4C68;
}
.buttons{
  >div {
    width: 246px;
    height: 78px;
    font-size: 32px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    // 渐变
    border: 3px solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    &.status0{
      color: #4D7DDD;
      background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
    }
    &.status1{
      margin-left: 18px;
      color: #A9792C;
      background-image: linear-gradient(0deg, #FFF5B0, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
    }
  }
}
</style>
