<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popupContent">
      <template v-if="hasStar">
        <img :src="IconPath('tk_1.png')" class="leftStar pointer-none position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightStar pointer-none position-absolute" />
      </template>
      <img v-if="hasBottom" :src="IconPath('tk_3.png')" class="bottomIcon position-absolute pointer-none position-row-center" />
      <img v-if="title" :src="IconPath(title)" class="titleIcon" />
      <div class="main overflow-x-hidden overflow-y-scroll">
        <slot></slot>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    hasStar: { type: Boolean, default: true }, // 左右两边星星
    hasBottom: { type: Boolean, default: true } // 底部图标
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
.popupContent {
  position: relative;
  // min-width: 580px;
  width: 600px;
  background: linear-gradient(0deg, #ecbc54 30%, #b16d3c);
  border-radius: 40px;
  box-shadow: 0 0 0 4px #ffdc75, 0 0 29px 10px #ffbc1b;
  pointer-events: auto;
  padding: 60px 0 30px 0;
  .titleIcon {
    width: 628px;
    height: 130px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -88px;
  }
  .main {
    position: relative;
    min-height: 280px;
    max-height: 1000px;
    // padding: 62px 0 57px 0;
  }
  @mixin star($width: 122px, $height, $top, $left: auto, $right: auto) {
    top: $top;
    left: $left;
    right: $right;
    width: $width;
    height: $height;
  }
  .leftStar {
    @include star($height: 166px, $top: 82px, $left: -70px);
  }
  .rightStar {
    @include star($height: 179px, $top: 195px, $right: -70px);
  }
  .bottomIcon {
    bottom: -22px;
    width: 750px;
    height: 158px;
  }
}
</style>
