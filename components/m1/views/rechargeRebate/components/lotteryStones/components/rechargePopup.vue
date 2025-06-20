<template>
  <van-popup v-model="isShowPo" get-container="body" :close-on-click-overlay="false" @click-overlay="clickClose">
    <p class="text-center line-height-100">奖励条件未达成，请充值</p>
    <div class="buttons flex align-center justify-center">
      <PublicButton class="cancel-button" hasRight="0" @click="clickClose">取消</PublicButton>
      <PublicButton class="confirm-button" hasRight="1" @click="recharge">充值</PublicButton>
    </div>
  </van-popup>
</template>

<script>
import { isIOS } from '@/utils/toApp'

export default {
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined
    }
  },
  mounted() {
    if (!this.isIOS()) {
      this.stopScroll()
    }
  },
  beforeDestroy() {
    if (!this.isIOS()) {
      this.autoScroll()
    }
  },
  methods: {
    isIOS,
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
      // console.log('stop')
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
  width: 436px;
  height: 256px;
  background: linear-gradient(180deg, #B891FF, #937CF9, #93AAFF), linear-gradient(#EBE3FF, #EBE3FF), linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3));
  -webkit-background-clip: content-box, padding-box, border-box;
  -webkit-background-origin: content-box, padding-box, border-box;
  pointer-events: auto;
  $innerBorderWidth: 2px;
  padding: $innerBorderWidth;
  border: 6px solid transparent;
  border-radius: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
p {
  width: fit-content;
  font-size: 32px;
  color: #ffffff;
  margin: 42px auto 0;
}

.buttons {
  margin-bottom: 42px;
  .cancel-button,
  .confirm-button {
    width: 176px;
    height: 76px;
    font-size: 32px;
  }
  .confirm-button {
    margin-left: 24px;
  }
}
</style>
