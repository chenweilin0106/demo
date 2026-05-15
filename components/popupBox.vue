<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" transition-appear get-container="body" @click-overlay="clickClose">
    <template v-if="isLight">
      <div class="topLight"></div>
    </template>
    <div class="popupContent" :class="`popupSize-${size}`">
      <template v-if="hasCostume">
        <div class="leftIcon pointer-none position-absolute"></div>
        <div class="rightIcon pointer-none position-absolute"></div>
      </template>
      <div v-if="title" class="titleIcon pointer-none position-absolute">
        <div class="titleText"><div>{{title}}</div><div>{{title}}</div></div>
      </div>
      <slot name="topSlot"></slot>
      <div class="main overflow-x-hidden overflow-y-scroll">
        <slot></slot>
      </div>
      <slot name="bottomSlot"></slot>
    </div>
  </van-popup>
</template>

<script>
import { isIOS } from '@/utils/toApp'

export default {
  props: {
    title: { type: String, default: '' },
    size: { type: [String, Number], default: 2 }, // 1-小、固定 2-大、可拉伸
    hasCostume: { type: Boolean, default: true }, // 左右两边
    isSon: { type: Boolean, default: false }, // 是否是子弹窗
    isLight: { type: Boolean, default: false } // 是否有圣光
  },
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined
    }
  },
  mounted() {
    if (this.isSon) return
    if (!this.isIOS()) {
      this.stopScroll()
    }
  },
  beforeDestroy() {
    if (this.isSon) return
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
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.popupContent {
  position: relative;
  pointer-events: auto;
  &.gradient{
    border-radius: 64px;
    border: 4px solid transparent;
    -webkit-background-clip: content-box, padding-box, border-box;
    -webkit-background-origin: content-box, padding-box ,border-box;
    background-image: linear-gradient(180deg, #9E79EE, #9EB7FA), linear-gradient(#fff, #fff), -webkit-linear-gradient(transparent, transparent);
    box-shadow: inset 0 0 5px 0 #fff; // 内层阴影
  }
  &.popupSize-1 {
    width: 600px;
    min-height: 480px;
    border-image-source: url('@/pages/childrenDay/assets/tk_bg_1.png');
    $sliceTop: 90; // 顶部切割位置
    $sliceBottom: 188; // 底部切割位置
    border-image-slice: $sliceTop 0 $sliceBottom 0 fill;
    border-image-width: #{$sliceTop}px 0 #{$sliceBottom}px 0;
    background: url('@/pages/childrenDay/assets/tk_bg_1_1.png') no-repeat center #{$sliceTop - 4}px/600px calc(100% - #{$sliceTop}px - #{$sliceBottom}px + 8px); // 解决部分安卓机上border-image切割后出现缝隙
    .leftIcon {
      left: -116px;
    }
    .rightIcon {
      right: -116px;
    }
  }
  &.popupSize-2 {
    width: 600px;
    min-height: 480px;
    border-image-source: url('@/pages/childrenDay/assets/tk_bg_1.png');
    $sliceTop: 90; // 顶部切割位置
    $sliceBottom: 188; // 底部切割位置
    border-image-slice: $sliceTop 0 $sliceBottom 0 fill;
    border-image-width: #{$sliceTop}px 0 #{$sliceBottom}px 0;
    background: url('@/pages/childrenDay/assets/tk_bg_1_1.png') no-repeat center #{$sliceTop - 4}px/600px calc(100% - #{$sliceTop}px - #{$sliceBottom}px + 8px); // 解决部分安卓机上border-image切割后出现缝隙
  }
  &.popupSize-2_min {
    @extend .popupSize-2;
    min-height: 460px;
    .main {
      margin-top: 120px;
    }
  }
  &.popupSize-3 {
    width: 600px;
    height: 300px;
    background: url('@/pages/childrenDay/assets/tk_bg_2.png') no-repeat left top/100% 100%;
    .main {
      margin: 63px 0 0;
    }
  }
  .titleIcon {
    z-index: 2;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 501px;
    height: 96px;
    background: url('@/pages/childrenDay/assets/title_1.png') no-repeat left top/100% 100%;
    .titleText {
      @font-face {
        font-family: "zywyh";
        src: url("@/pages/childrenDay/assets/zt_zywyh.ttf");
        font-weight: normal;
        font-style: normal;
      }
      font-family: zywyh;
      font-weight: 400;
      font-size: 40px;
      letter-spacing: 4px;
      position: absolute;
      width: 100%;
      height: 100%;
      //position: absolute;
      //left: 50%;
      //top: 50%;
      //transform: translateX(-50%);
      > div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        &:nth-child(1) {
          color: #FFF3DE;
          text-shadow:
            1px 0 #C14D48, -1px 0 #C14D48, 0 1px #C14D48, 0 -1px #C14D48,
            1px 1px #C14D48, -1px -1px #C14D48, 1px -1px #C14D48, -1px 1px #C14D48,
            2px 0 #C14D48, -2px 0 #C14D48, 0 2px #C14D48, 0 -2px #C14D48,
            2px 2px #C14D48, -2px -2px #C14D48, 2px -2px #C14D48, -2px 2px #C14D48,
            3px 0 #C14D48, -3px 0 #C14D48, 0 3px #C14D48, 0 -3px #C14D48,
            3px 3px #C14D48, -3px -3px #C14D48, 3px -3px #C14D48, -3px 3px #C14D48,
            4px 0 #C14D48, -4px 0 #C14D48, 0 4px #C14D48, 0 -4px #C14D48,
            4px 4px #C14D48, -4px -4px #C14D48, 4px -4px #C14D48, -4px 4px #C14D48;
        }
        &:nth-child(2) {
          background: linear-gradient(180deg, #FFF3DE 0%, #FFF3DE 50%, #FFF3DE 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
  .main {
    position: relative;
    z-index: 3;
    min-height: 137px;
    max-height: 950px;
    margin: 70px 0 40px;
  }
  .leftIcon {
    z-index: 2;
    width: 156px;
    height: 359px;
    left: -70px;
    top: -42px;
    //background: url('@/pages/childrenDay/assets/tk_3.png') no-repeat left top/100% 100%;
  }
  .rightIcon {
    z-index: 2;
    width: 137px;
    height: 441px;
    right: -70px;
    top: -53px;
    //background: url('@/pages/childrenDay/assets/tk_3_1.png') no-repeat left top/100% 100%;
  }
}
.topLight{
  z-index: -2;
  width: 750px;
  height: 1086px;
  //background: url('@/pages/childrenDay/assets/tk_21.png') no-repeat left top/100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
