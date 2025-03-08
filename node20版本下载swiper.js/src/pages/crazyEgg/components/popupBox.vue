<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popupContent">
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <slot></slot>
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
      // console.log('stop')
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
      // console.log('auto')
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
  width: 653px;
  border-image-source: url('@/pages/crazyEgg/assets/tk_bg.png');
  border-image-slice: 137 0 66 0 fill;
  border-image-width: 137px 0 66px 0;
  padding: 10px;
  pointer-events: auto;
  .titleIcon {
    z-index: 1;
    width: 537px;
    height: 124px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -42px;
  }
}
</style>
