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
  background: linear-gradient(0deg, #F3B8F0, #6B91FF, #46C4FF); /*渐变背景*/
  box-shadow: 0 0 0 6px rgba(255,255,255, 0.3), inset 0 0 20px 8px #fff; /*外描边*/
  pointer-events: auto;
  border-radius: 40px;
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 4px solid #fff; /*内描边*/
    background-color: transparent;
    box-sizing: border-box;
    pointer-events: none;
    border-radius: 40px;
  }
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
