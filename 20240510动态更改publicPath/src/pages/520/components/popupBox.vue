<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popupContent">
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <img v-if="left" :src="IconPath('tk_1.png')" class="leftIcon position-absolute pointer-none" />
      <img v-if="right" :src="IconPath('tk_2.png')" class="rightIcon position-absolute pointer-none" />
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    left: { type: Boolean, default: true },
    right: { type: Boolean, default: true }
  },
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
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popupContent {
  position: relative;
  margin: 0 auto;
  padding: 100px 0px 50px 0px;
  width: 600px;
  background: linear-gradient(0deg, #F9C984, #F378A6);
  border-radius: 140px 140px 80px 80px;
  border: 10px solid rgba(255,255,255,0.7);
  box-shadow: 0 0 0 8px #948c90;
  pointer-events: auto;
  .titleIcon {
    width: 480px;
    height: 179px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -90px;
  }
  .leftIcon {
    left: -43px;
    top: 137px;
    width: 126px;
    height: 180px;
  }
  .rightIcon {
    right: -55px;
    top: 115px;
    width: 115px;
    height: 262px;
  }
  .main{
    min-height: 200px;
    max-height: 1000px;
    overflow: hidden scroll;
  }
}
</style>
