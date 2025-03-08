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
    size: { type: [String, Number], default: 2 },
    // isBottom: { type: Boolean, default: true },
    hasCostume: { type: Boolean, default: false } // 左右两边
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
$borderImageTopWidth: 255; /*todo 顶部边框的高度*/
$borderImageBottomWidth: 278; /*todo 底部边框的高度*/
$borderImageLeftWidth: 0; /*todo 左边框的宽度*/
$borderImageRightWidth: 0; /*todo 右边框的宽度*/
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
  pointer-events: auto;
  padding: 164px 0 110px;
  border-image-slice: $borderImageTopWidth $borderImageRightWidth $borderImageBottomWidth $borderImageLeftWidth fill;
  border-image-width: #{$borderImageTopWidth}px #{$borderImageRightWidth}px #{$borderImageBottomWidth}px #{$borderImageLeftWidth}px;
  .titleIcon {
    z-index: 4;
    width: auto;
    height: 170px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -31px;
  }
  .main {
    position: relative;
    z-index: 3;
    min-height: 180px;
    max-height: 920px;
  }
  //.leftIcon {
  //  z-index: 2;
  //  width: 119px;
  //  height: 232px;
  //  left: -61px;
  //  top: -29px;
  //}
  //.rightIcon {
  //  z-index: 2;
  //  width: 146px;
  //  height: 310px;
  //  right: -60px;
  //  top: -38px;
  //}
}
.popupSize-1 {
  width: 536px;
  border-image-source: url('@/pages/celebration/assets/tk_2.png');
}
.popupSize-2 {
  width: 648px;
  border-image-source: url('@/pages/celebration/assets/tk_1.png');
}
.popupSize-3 {
  width: 650px;
  border-image-source: url('@/pages/celebration/assets/tk_3.png');
  border-image-slice: 0 0 0 0 fill;
  border-image-width: 0 0 0 0;
}
</style>
