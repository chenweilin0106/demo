<template>
  <van-popup
    v-model="isShowPo"
    :close-on-click-overlay="false"
    @click-overlay="clickClose"
  >
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
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popupContent {
  position: relative;
  margin: 0 auto;
  width: 622px;
  min-height: 400px;
  border-image-source: url('@/pages/mayDay2024/assets/tk_bg_1.png');
  border-image-slice: 100 0 100 0 fill;
  border-image-width: 100px 0 100px 0;
  padding: 70px 10px 20px 10px;
  pointer-events: auto;
  .titleIcon {
    width: 350px;
    height: 91px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -36px;
  }
  .main{
    max-height: 900px;
    overflow-y: scroll;
  }
}
</style>
