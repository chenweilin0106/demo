<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" get-container="body" @click-overlay="clickClose">
    <div class="popupContent" :class="`popupSize-${size}`">
      <img v-if="isBottom" :src="IconPath('tk_2.png')" class="popupBg position-absolute pointer-none" />
      <img v-if="isBottom" :src="IconPath('tk_3.png')" class="bottomIcon pointer-none position-absolute position-row-center" />
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
    isBottom: { type: Boolean, default: true },
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
  border: 4px solid #ffdc7a;
  border-radius: 52px;
  background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
  pointer-events: auto;
  padding: 59px 0 11px 0;
  .popupBg {
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .titleIcon {
    z-index: 2;
    width: auto;
    height: 180px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -127px;
  }
  .main {
    position: relative;
    z-index: 3;
    min-height: 180px;
    max-height: 900px;
  }
  //.leftIcon {
  //  z-index: 2;
  //  width: 224px;
  //  height: 602px;
  //  left: -65px;
  //  top: -38px;
  //}
  //.rightIcon {
  //  z-index: 2;
  //  width: 224px;
  //  height: 602px;
  //  right: -62px;
  //  top: -38px;
  //}
  .bottomIcon {
    z-index: 2;
    width: calc(100% + 40px * 2);
    height: auto;
    bottom: -56px;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 7px * 2);
    height: calc(100% + 7px * 2);
    background: rgba(227,114,54,0);
    border: 3px solid #FFDC7A;
    opacity: 0.5;
    border-radius: 59px;
  }
}
.popupSize-1 {
  width: 608px;
}
.popupSize-2 {
  width: 518px;
}
</style>
