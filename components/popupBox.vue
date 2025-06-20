<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" get-container="body" @click-overlay="clickClose">
    <template v-if="isLight">
      <div class="topLight"></div>
      <div class="bottomLight"></div>
    </template>
    <div class="popupContent" :class="`popupSize-${size}`">
      <template v-if="hasCostume">
        <img :src="IconPath('tk_3.png')" class="leftIcon pointer-none position-absolute" />
        <img :src="IconPath('tk_3_1.png')" class="rightIcon pointer-none position-absolute" />
      </template>
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
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
    border-radius: 40px; // 半透明边框圆角
    padding: 5px; // 淡黄色边框宽度
    border: 5px solid transparent; // 半透明边框宽度
    -webkit-background-clip: content-box, padding-box, border-box;
    -webkit-background-origin: content-box, padding-box, border-box;
    background-image: linear-gradient(180deg, #E783C6, #FFBEAB), -webkit-linear-gradient(#FFFCEF, #FFFCEF), -webkit-linear-gradient(rgba(255, 255, 255, 0.30), rgba(255, 255, 255, 0.30)); // 从左到右：中心背景色，内层边框色，外层边框色
    box-shadow: inset 0 0 7px 7px #fff; // 内层阴影
  }
  &.popupSize-1 {
    width: 544px;
    min-height: 564px;
    border-image-source: url('@/pages/valentineDay/assets/tk_2.png');
    border-image-slice: 134 0 163 0 fill;
    border-image-width: 134px 0 163px 0;
    &::after{
      content: '';
      position: absolute;
      width: 517px; /*拉伸处图片宽度*/
      top: 132px; /*border-image-slice top - 4px*/
      left: 50%;
      transform: translateX(-50%);
      bottom: 161px; /*border-image-slice bottom - 4px*/
      z-index: -1; /*todo 父元素不能使用z-index 否则伪元素将不能放置底部 如果弹框背后还有特殊遮盖 要注意层级 伪元素只能在弹框下1层*/
      background: url('@/pages/valentineDay/assets/tk_2_1.png') no-repeat left top/100% 100%; /*todo 如果有透明边框就让UI去掉 不然两个透明边框叠加会出现问题*/
    }
  }
  &.popupSize-2 {
    width: 644px;
    min-height: 575px;
    border-image-source: url('@/pages/valentineDay/assets/tk_1.png');
    border-image-slice: 159 0 193 0 fill;
    border-image-width: 159px 0 193px 0;
    &::after{
      content: '';
      position: absolute;
      width: 612px;
      top: 157px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 191px;
      z-index: -1;
      background: url('@/pages/valentineDay/assets/tk_1_1.png') no-repeat left top/100% 100%;
    }
  }
  &.size_1{
    width: 580px;
    height: 248px;
    min-height: auto;
    padding: 46px 0;
  }
  &.popupSize-empty{
    border-image-source: none;
    border-image-slice: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .main {
      position: relative;
      z-index: 3;
      width: 100%;
      max-height: 100%;
      min-height: 100%;
      display: flex;
      pointer-events: none;
      margin: 0;
      ::v-deep >div{
        pointer-events: auto;
      }
    }
  }
  .titleIcon {
    z-index: 4;
    width: auto;
    height: 209px;
    pointer-events: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -97px;
  }
  .main {
    position: relative;
    z-index: 3;
    min-height: 200px;
    max-height: 930px;
    margin: 124px 0 80px;
  }
  .leftIcon {
    z-index: 2;
    width: 158px;
    height: 518px;
    left: -53px;
    top: -73px;
  }
  .rightIcon {
    z-index: 2;
    width: 210px;
    height: 565px;
    right: -38px;
    top: -91px;
  }
}
.topLight{
  z-index: -2;
  width: 750px;
  height: 948px;
  background: url('@/pages/valentineDay/assets/tk_24.png') no-repeat left top/100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
}
.bottomLight{
  z-index: -2;
  width: 750px;
  height: 660px;
  background: url('@/pages/valentineDay/assets/tk_25.png') no-repeat left top/100% 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
</style>
