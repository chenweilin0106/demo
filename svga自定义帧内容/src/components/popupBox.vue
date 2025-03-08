<template>
  <van-popup v-model="isShowPo" get-container="body" @click-overlay="clickClose">
    <div class="popupContent" :class="`size-${size}`">
      <img v-if="title" :src="IconPath(title)" class="title" />
        <slot></slot>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    size: { type: String, default: '1' }
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
      const scrollTop = window.scrollY
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
  pointer-events: auto;
  .title {
    width: auto;
    height: 104px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 27px;
  }
}
.size-1 {
  $borderImageTopWidth1: 298;
  $borderImageBottomWidth1: 143;
  $borderImageLeftWidth1: 0;
  $borderImageRightWidth1: 0;
  width: 669px;
  border-image-source: url('@/assets/tk_1.png');
  border-image-slice: $borderImageTopWidth1 $borderImageRightWidth1 $borderImageBottomWidth1 $borderImageLeftWidth1 fill;
  border-image-width: #{$borderImageTopWidth1}px #{$borderImageRightWidth1}px #{$borderImageBottomWidth1}px #{$borderImageLeftWidth1}px;
  padding-top: 189px;
  padding-bottom: 89px;
}
.size-2 {
  $borderImageTopWidth2: 225;
  $borderImageBottomWidth2: 123;
  $borderImageLeftWidth2: 0;
  $borderImageRightWidth2: 0;
  width: 576px;
  border-image-source: url('@/assets/tk_1.png');
  border-image-slice: $borderImageTopWidth2 $borderImageRightWidth2 $borderImageBottomWidth2 $borderImageLeftWidth2 fill;
  border-image-width: #{$borderImageTopWidth2}px #{$borderImageRightWidth2}px #{$borderImageBottomWidth2}px #{$borderImageLeftWidth2}px;
  padding-top: 189px;
  padding-bottom: 89px;
}
</style>
