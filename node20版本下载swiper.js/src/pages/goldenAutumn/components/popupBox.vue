<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" get-container="body" @click-overlay="clickClose">
    <div class="popupContent" :class="`popupSize-${size}`">
      <!--<img v-if="isBottom" :src="IconPath('tk_2.png')" class="popupBg position-absolute pointer-none" />-->
      <!--<img v-if="isBottom" :src="IconPath('tk_3.png')" class="bottomIcon pointer-none position-absolute position-row-center" />-->
      <template v-if="hasCostume">
        <img :src="IconPath('tk_1.png')" class="leftIcon pointer-none position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightIcon pointer-none position-absolute" />
      </template>
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <div class="main overflow-x-hidden overflow-y-scroll">
        <slot></slot>
      </div>
      <!--<template v-if="hasCostume">-->
      <!--  <img :src="IconPath('tk_1.png')" class="leftIcon pointer-none position-absolute" />-->
      <!--  <img :src="IconPath('tk_2.png')" class="rightIcon pointer-none position-absolute" />-->
      <!--</template>-->
    </div>
  </van-popup>
</template>

<script>
import { isIOS } from '@/utils/toApp'

export default {
  props: {
    title: { type: String, default: '' },
    size: { type: [String, Number], default: 1 },
    // isBottom: { type: Boolean, default: true },
    hasCostume: { type: Boolean, default: true } // 左右两边
  },
  data() {
    return {
      isShowPo: true,
      pageScroll: undefined
    }
  },
  mounted() {
    if (!this.isIOS()) {
      this.stopScroll()
    }
  },
  beforeDestroy() {
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
}
.popupContent {
  position: relative;
  z-index: 3;
  -webkit-background-clip: content-box, padding-box, border-box;
  -webkit-background-origin: content-box, padding-box, border-box;
  background-image: -webkit-linear-gradient(-90deg, #EE7A27, #FFBC52), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#FFCE4A, #FFCE4A);
  pointer-events: auto;
  $innerBorderWidth: 4px;
  padding: $innerBorderWidth;
  border: 6px solid transparent;
  border-radius: 92px 92px 52px 52px;
  min-width: 492px;
  //.popupBg {
  //  z-index: 1;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //}
  .titleIcon {
    z-index: 4;
    width: auto;
    height: 133px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -81px;
  }
  .main {
    position: relative;
    z-index: 3;
    min-height: 180px;
    max-height: 900px;
    //padding: 77 - $innerBorderWidth 0 36 - $innerBorderWidth - 3 0;
    margin: 77 - $innerBorderWidth 0 36 - $innerBorderWidth - 3 0;
    //border-radius: 82px 82px 42px 42px;
  }
  .leftIcon {
    z-index: 2;
    width: 119px;
    height: 232px;
    left: -61px;
    top: -29px;
  }
  .rightIcon {
    z-index: 2;
    width: 146px;
    height: 310px;
    right: -60px;
    top: -38px;
  }
  //.bottomIcon {
  //  z-index: 2;
  //  width: calc(100% + 40px * 2);
  //  height: auto;
  //  bottom: -56px;
  //}
  //&::after {
  //  content: '';
  //  position: absolute;
  //  z-index: 1;
  //  top: 50%;
  //  left: 50%;
  //  transform: translate(-50%, -50%);
  //  width: calc(100% + 7px * 2);
  //  height: calc(100% + 7px * 2);
  //  background: rgba(227,114,54,0);
  //  border: 3px solid #FFDC7A;
  //  opacity: 0.5;
  //  border-radius: 59px;
  //}
}
.popupSize-1 {
  width: 492px;
}
.popupSize-2 {
  width: 532px;
}
.popupSize-3 {
  width: 612px;
}
</style>
