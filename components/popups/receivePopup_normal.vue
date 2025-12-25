<template>
  <transition name="popup-fade" appear>
    <div class="popupOverly position-fixed flex align-center justify-center" @click.self="$emit('clickClose')">
      <div class="popupContent position-relative" :class="`size_${size}`">
        <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
        <div class="leftIcon1 position-absolute pointer-none"></div>
        <div class="leftIcon2 position-absolute pointer-none"></div>
        <div class="rightIcon1 position-absolute pointer-none"></div>
        <div class="rightIcon2 position-absolute pointer-none"></div>
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
      isShowPo: true,
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
    border-image-source: url('@/assets/tk_1.png');
    border-image-slice: 118 0 167 0 fill;
    border-image-width: 118px 0 167px 0;
    padding-top: 55px;
    padding-bottom: 86px;
    will-change: transform;
    background: url('@/assets/tk_1_1.png') no-repeat center 114px/610px calc(100% - 118px - 167px + 8px);
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
      border-image-source: none;
      border-image-source: url('@/assets/tk_2.png');
      border-image-slice: 88 0 140 0 fill;
      border-image-width: 88px 0 140px 0;
      background: url('@/assets/tk_2_1.png') no-repeat center 84px/520px calc(100% - 88px - 140px + 8px);
      .leftIcon2 {
        display: none;
      }
      .rightIcon2 {
        display: none;
      }
    }
    .leftIcon1 {
      left: -40px;
      top: 93px;
      width: 97px;
      height: 399px;
      background: url('@/assets/tk_3.png') no-repeat left top/100% 100%;
    }
    .leftIcon2 {
      left: -31px;
      bottom: -2px;
      width: 199px;
      height: 380px;
      background: url('@/assets/tk_5.png') no-repeat left top/100% 100%;
    }
    .rightIcon1 {
      right: -47px;
      top: -78px;
      width: 164px;
      height: 600px;
      background: url('@/assets/tk_4.png') no-repeat left top/100% 100%;
    }
    .rightIcon2 {
      right: -57px;
      bottom: 3px;
      width: 196px;
      height: 332px;
      background: url('@/assets/tk_6.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
