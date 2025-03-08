<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popupContent">
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <div class="main overflow-x-hidden overflow-y-scroll">
        <slot></slot>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
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
  min-width: 520px;
  max-width: 600px;
  background: linear-gradient(0deg, #f1d36b, #5db8be);
  border-radius: 40px;
  border: 4px solid #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
  pointer-events: auto;
  .titleIcon {
    width: 462px;
    height: 140px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -87px;
    z-index: 1;
  }
  .main {
    min-height: 280px;
    max-height: 1000px;
    padding: 71px 0 20px 0;
  }
}
</style>
