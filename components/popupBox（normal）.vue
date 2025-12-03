<template>
  <transition name="popup-fade" appear>
    <div class="popupOverly position-fixed flex align-center justify-center" @click.self="$emit('clickClose')">
      <div class="popupContent position-relative" :class="`size_${size}`">
        <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
        <!-- <div class="leftIcon1 position-absolute pointer-none"></div> -->
        <slot name="topSlot"></slot>
        <div class="main overflow-y-scroll overflow-x-hidden">
          <slot></slot>
        </div>
        <slot name="bottomSlot"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { isIOS } from '@/utils/toApp'

export default {
  props: {
    title: { type: String, default: '' },
    size: { type: String, default: '' },
    son: { type: Boolean, default: false }
  },
  data() {
    return {
      sonPopup: this.son,
      pageScroll: undefined
    }
  },
  created() {
    if (!this.sonPopup) this.sonPopup = Boolean(document.querySelectorAll('.popupContent').length)
  },
  mounted() {
    document.querySelector('body').append(this.$el)
    if (this.sonPopup) return
    if (!isIOS()) this.stopScroll()
  },
  beforeDestroy() {
    if (this.sonPopup) return
    if (!isIOS()) this.autoScroll()
  },
  methods: {
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
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
  .popupContent {
    transition: transform 0.3s ease-in-out;
  }
}
.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
  .popupContent {
    transform: scale(0.7);
  }
}
.popupOverly {
  z-index: 1999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .popupContent {
    width: 637px;
    min-height: 941px;
    // border-image-source: url('@/assets/tk_1.png');
    $sliceTop: 118; // 顶部切割位置
    $sliceBottom: 167; // 底部切割位置
    border-image-slice: $sliceTop 0 $sliceBottom 0 fill;
    border-image-width: #{$sliceTop}px 0 #{$sliceBottom}px 0;
    padding-top: 55px;
    padding-bottom: 86px;
    // will-change: transform;
    // background: url('@/assets/tk_1_1.png') no-repeat center #{$sliceTop - 4}px/610px calc(100% - #{$sliceTop}px - #{$sliceBottom}px + 8px); // 解决部分安卓机上border-image切割后出现缝隙
    // &.gradient {
    //   border-radius: 40px; // 半透明边框圆角
    //   padding: 5px; // 淡黄色边框宽度
    //   border: 5px solid transparent; // 半透明边框宽度
    //   -webkit-background-clip: content-box, padding-box, border-box;
    //   -webkit-background-origin: content-box, padding-box, border-box;
    //   background-image: linear-gradient(180deg, #fda6bc, #82c9d8), linear-gradient(#ffffff, #ffffff), linear-gradient(#99cfde, #99cfde); // 从左到右：中心背景色，内层边框色，外层边框色
    //   &::after {
    //     content: '';
    //     position: absolute;
    //     top: 5px;
    //     left: 5px;
    //     right: 5px;
    //     bottom: 5px;
    //     box-shadow: inset 0 0 10px 2px #fff;
    //     border-radius: 29px;
    //   }
    // }
    .main {
      // max-height: 70vh;
      // overflow-y: scroll;
      // overflow-x: hidden;
    }
    .titleIcon {
      z-index: 1;
      top: -111px;
      width: auto;
      height: 168px;
    }
    &.size_1 {
      width: 550px;
      min-height: 496px;
      padding-top: 71px;
      padding-bottom: 93px;
      // border-image-source: url('@/assets/tk_2.png');
      $sliceTop: 88;
      $sliceBottom: 140;
      border-image-slice: $sliceTop 0 $sliceBottom 0 fill;
      border-image-width: #{$sliceTop}px 0 #{$sliceBottom}px 0;
      // background: url('@/assets/tk_2_1.png') no-repeat center #{$sliceTop - 4}px/520px calc(100% - #{$sliceTop}px - #{$sliceBottom}px + 8px);
      .leftIcon1 {
        display: none;
      }
    }
    .leftIcon1 {
      left: -40px;
      top: 93px;
      width: 97px;
      height: 399px;
      // background: url('@/assets/tk_3.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
