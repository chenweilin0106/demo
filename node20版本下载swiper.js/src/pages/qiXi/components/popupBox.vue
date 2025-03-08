<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popupContent" :class="`popupSize-${size}`">
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <div class="main overflow-x-hidden overflow-y-scroll">
        <slot></slot>
      </div>
      <template v-if="hasCostume">
        <img :src="IconPath('tk_1.png')" class="leftIcon pointer-none position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightIcon pointer-none position-absolute" />
      </template>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    size: { type: [String, Number], default: 1 },
    hasCostume: { type: Boolean, default: true } // 左右两边
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
.light {
  width: 729px;
  height: 1049px;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
$innerBorderWidth: 4px;
@mixin radius() {
  border-radius: 140px + $innerBorderWidth 140px + $innerBorderWidth 80px + $innerBorderWidth 80px + $innerBorderWidth;
}
.popupContent {
  position: relative;
  background: linear-gradient(0deg, #F3B8F0, #6B91FF, #46C4FF); /*渐变背景*/
  box-shadow: 0 0 0 6px rgba(255,255,255, 0.3), inset 0 0 20px 8px #fff; /*外描边*/
  pointer-events: auto;
  padding: 70px 0 40px 0;
  @include radius();
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: $innerBorderWidth solid #fff; /*内描边*/
    @include radius();
    background-color: transparent;
    box-sizing: border-box; /*伪元素需要单独设置*/
    pointer-events: none;
  }
  .titleIcon {
    z-index: 2;
    width: auto;
    height: 173px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -115px;
  }
  .main {
    position: relative;
    z-index: 3;
    min-height: 280px;
    max-height: 1100px;
  }
  .leftIcon {
    z-index: 2;
    width: 180px;
    height: 427px;
    left: -75px + $innerBorderWidth; /*内边框4px*/
    top: -14px;
  }
  .rightIcon {
    z-index: 2;
    width: 195px;
    height: 491px;
    right: -71px + $innerBorderWidth; /*内边框4px*/
    top: -7px;
  }
}
.popupSize-1 {
  width: 600px + $innerBorderWidth * 2; /*内边框4px*/
}
.popupSize-2 {
  width: 520px + $innerBorderWidth * 2; /*内边框4px*/
}
</style>
