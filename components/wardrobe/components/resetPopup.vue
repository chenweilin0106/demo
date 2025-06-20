<template>
  <PopupBox :hasCostume="false" size="4" @clickClose="clickClose">
    <div class="desc text-center margin-row-center">确认重置已创建的形象吗？</div>
    <div class="buttons flex align-center justify-center">
      <PublicButton has-right="0" class="cancel" @click="clickClose">取消</PublicButton>
      <PublicButton has-right="1" class="confirm" @click="confirm">确认</PublicButton>
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
    font-size: 32px !important;
  }
  .cancel{
    margin-right: 22px;
  }
}
</style>
