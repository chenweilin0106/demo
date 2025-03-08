<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <p class="text-nowrap line-height-100">开启次数不足，请前往充值</p>
    <div class="buttons flex align-center justify-center">
      <PublicButton class="cancel-button" hasRight="0" @click="clickClose">取消</PublicButton>
      <PublicButton class="confirm-button" hasRight="1" @click="recharge">立即前往</PublicButton>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined
    }
  },
  created() {
    this.stopScroll()
  },
  beforeDestroy() {
    this.autoScroll()
  },
  methods: {
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 阻止滚动条滚动
     */
    stopScroll() {
      let scrollTop = window.scrollY
      this.pageScroll = scrollTop
      document.body.style.width = '100%'
      document.body.style.position = 'fixed'
      document.body.style.top = '-' + scrollTop + 'px'
    },
    /**
     * 恢复滚动条滚动
     */
    autoScroll() {
      document.body.style.position = 'static'
      window.scrollTo(0, this.pageScroll)
    },
    recharge() {
      this.$emit('recharge')
      this.clickClose()
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  //position: relative;
  width: 580px;
  height: 280px;
  background: linear-gradient(180deg, #F38131, #FFC154); /*渐变背景*/
  box-shadow: 0 0 0 6px #56CABE; /*外描边*/
  border: 4px solid #fff; /*内描边*/
  pointer-events: auto;
  border-radius: 40px;
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
    font-size: 32px;
  }
  .confirm-button {
    margin-left: 24px;
  }
}
</style>
