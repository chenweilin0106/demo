<template>
  <PopupBox :hasCostume="false" size="3" @clickClose="clickClose">
    <div class="desc text-center margin-row-center">确认重置已创建的形象吗？</div>
    <div class="buttons flex align-center justify-center">
      <div class="cancel status0" @click="clickClose">取消</div>
      <div class="confirm status1" @click="confirm">确认</div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
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
  margin-top: 64px;
  margin-bottom: 46px;
  font-size: 32px;
  color: #FFFFFF;
}
p{
  font-size: 24px;
  color: #874124;
  margin-top: 20px;
  margin-bottom: 60px;
}
.buttons{
  //margin-bottom: 21px;
  padding-bottom: 22px;
  >div{
    width: 178px;
    height: 78px;
    $border: 3px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    font-size: 32px;
    font-weight: normal;
    // 渐变
    border: $border solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    // 没有状态变化 删除下方代码
    &.status0{
      color: #4d7ddd;
      background-image: linear-gradient(0deg, #cae7ff, #ffffff), linear-gradient(#fff, #fff);
    }
    &.status1{
      color: #a9792c;
      background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
    }
  }
  .cancel{
    margin-right: 22px;
  }
}
</style>
