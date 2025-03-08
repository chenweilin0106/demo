<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <img v-if="hasLight" :src="IconPath('tk_15.png')" class="light position-absolute" />
    <div :class="['popupContent', size]">
      <template v-if="hasCostume">
        <img :src="IconPath('tk_1.png')" class="leftIcon pointer-none position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightIcon pointer-none position-absolute" />
      </template>
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
    size: { type: String, default: 'big' },
    title: { type: String, default: '' },
    hasCostume: { type: Boolean, default: true }, // 左右两边
    hasLight: { type: Boolean, default: false } // 顶部光
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
.popupContent {
  position: relative;
  pointer-events: auto;
  z-index: 2;
  .titleIcon {
    width: auto;
    height: 149px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -42px;
  }
  .main {
    position: relative;
    min-height: 280px;
    max-height: 1000px;
    // padding: 62px 0 57px 0;
  }
}
.leftFish {
  width: 158px;
  height: 510px;
}
.rightFish {
  width: 139px;
  height: 476px;
}
.big {
  width: 663px;
  min-height: 622px;
  border-image-source: url('@/pages/summerParty2024/assets/tk_3.png');
  border-image-slice: 243 0 276 0 fill;
  border-image-width: 243px 0 276px 0;
  padding: 110px 0 70px 0;
  .leftIcon {
    @extend .leftFish;
    left: -42px;
    bottom: 91px;
  }
  .rightIcon {
    @extend .rightFish;
    right: -44px;
    bottom: 87px;
  }
}
.small {
  width: 581px;
  min-height: 516px;
  border-image-source: url('@/pages/summerParty2024/assets/tk_3_1.png');
  border-image-slice: 213 0 242 0 fill;
  border-image-width: 213px 0 242px 0;
  padding: 136px 0 70px 0;
  .leftIcon {
    @extend .leftFish;
    left: -83px;
    bottom: 50px;
  }
  .rightIcon {
    @extend .rightFish;
    right: -86px;
    bottom: 50px;
  }
}
</style>
