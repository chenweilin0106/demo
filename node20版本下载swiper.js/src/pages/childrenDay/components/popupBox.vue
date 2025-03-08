<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popupContent">
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <div class="main">
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
      console.log('stop')
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
      console.log('auto')
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
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.popupContent {
  position: relative;
  margin: 0 auto;
  width: 600px;
  background-image: linear-gradient(0deg, #75b0ff, #7ac8ff);
  box-shadow: 0 0 0 4px #dff6fb, 0 0 0 8px #aae4fd;
  border-radius: 24px;
  pointer-events: auto;
  .titleIcon {
    width: 535px;
    height: 162px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -119px;
    z-index: 2;
  }
  .main {
    z-index: 1;
    max-height: 900px;
    min-height: 320px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 50px 0 20px;
  }
}
</style>
