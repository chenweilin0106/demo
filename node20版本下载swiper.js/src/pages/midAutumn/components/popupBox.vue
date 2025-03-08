<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" get-container="body" @click-overlay="clickClose">
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
  mounted() {
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
  display: flex;
  justify-content: center;
  align-items: center;
}
$innerBorderWidth: 4px;
.popupContent {
  position: relative;
  background: linear-gradient(180deg, #F38131, #FFC154); /*渐变背景*/
  box-shadow: 0 0 0 6px #56CABE; /*外描边*/
  border: 4px solid #fff; /*内描边*/
  pointer-events: auto;
  padding: 70px 0 40px 0;
  border-radius: 50px;
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
  .leftIcon {
    z-index: 2;
    width: 224px;
    height: 602px;
    left: -65px;
    top: -38px;
  }
  .rightIcon {
    z-index: 2;
    width: 224px;
    height: 602px;
    right: -62px;
    top: -38px;
  }
}
.popupSize-1 {
  width: 600px;
}
.popupSize-2 {
  width: 520px;
}
</style>
