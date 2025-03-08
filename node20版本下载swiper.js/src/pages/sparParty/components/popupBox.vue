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
  props: ['title'],
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
  width: 604px;
  pointer-events: auto;
  border-image-source: url('@/pages/sparParty/assets/tk_bg_1.png');
  border-image-slice: 28 28 28 28 fill;
  border-image-width: 28px 28px 28px 28px;
  padding: 78px 14px 36px;
  .titleIcon {
    width: 621px;
    height: 81px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -36px;
  }
}
</style>
