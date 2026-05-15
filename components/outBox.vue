<template>
  <div class="outBox position-relative margin-row-center" :class="[title && 'hasTitle', `size-${size}`]">
    <div v-if="title" :class="['titleIcon', 'pointer-none', 'position-absolute', {'longSp': title.length > 7}]">
      <div class="titleText"><div>{{title}}</div><div>{{title}}</div></div>
    </div>
    <div v-if="left" class="leftIcon position-absolute pointer-none"></div>
    <div v-if="right" class="rightIcon position-absolute pointer-none"></div>
    <div class="bottomIcon position-absolute pointer-none"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    left: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    size: { type: String, default: '1' }
  },
  methods: {
    /**
     * 将px转换为vw
     * @param {number} px - 需要转换的px值
     * @param {number} baseWidth - 基准宽度，默认为750
     * @param {number} fixed - 保留的小数位数，默认为2
     * @returns {string} 转换后的vw值
     */
    pxToVw({ px, baseWidth = 750, fixed = 2 }) {
      return ((px / baseWidth) * 100).toFixed(fixed) + 'vw'
    }
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  margin-top: 60px; /*todo 无标题顶部距离*/
  position: relative;
  //z-index: 5; /*不能添加层级 会导致内部元素的负数层级无法放到父元素下方*/
  &.size-1 {
    width: 730px;
    min-height: 652px;
    border-image-source: url('@/pages/childrenDay/assets/bg_1.png');
    border-image-slice: 100 0 208 0 fill;
    border-image-width: 100px 0 208px 0;
    padding-top: 39px; /*todo 无标题顶部距离*/
    padding-bottom: 43px; /*todo 下内边距*/
  }
  &.size-2 {
    width: 730px;
    height: 270px;
    background: url('@/pages/childrenDay/assets/bg_2.png') no-repeat left top/100% 100%;
  }
  .titleIcon {
    z-index: 2;
    top: -37px;
    left: 50%;
    transform: translateX(-50%);
    width: 501px;
    height: 96px;
    background: url('@/pages/childrenDay/assets/title_1.png') no-repeat left top/100% 100%;
    &.longSp {
      width: 750px;
      height: 116px;
      //background: url('@/pages/childrenDay/assets/title_3.png') no-repeat left top/100% 100%;
      padding-top: 5px;
    }
    .titleText {
      @font-face {
        font-family: "zywyh";
        src: url("@/pages/childrenDay/assets/zt_zywyh.ttf");
        font-weight: normal;
        font-style: normal;
      }
      font-family: zywyh;
      font-weight: 400;
      font-size: 40px;
      //letter-spacing: 4px;
      position: absolute;
      width: 100%;
      height: 100%;
      //position: absolute;
      //left: 50%;
      //top: 50%;
      //transform: translateX(-50%);
      > div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        &:nth-child(1) {
          color: #FFF3DE;
          text-shadow:
            1px 0 #C14D48, -1px 0 #C14D48, 0 1px #C14D48, 0 -1px #C14D48,
            1px 1px #C14D48, -1px -1px #C14D48, 1px -1px #C14D48, -1px 1px #C14D48,
            2px 0 #C14D48, -2px 0 #C14D48, 0 2px #C14D48, 0 -2px #C14D48,
            2px 2px #C14D48, -2px -2px #C14D48, 2px -2px #C14D48, -2px 2px #C14D48,
            3px 0 #C14D48, -3px 0 #C14D48, 0 3px #C14D48, 0 -3px #C14D48,
            3px 3px #C14D48, -3px -3px #C14D48, 3px -3px #C14D48, -3px 3px #C14D48,
            4px 0 #C14D48, -4px 0 #C14D48, 0 4px #C14D48, 0 -4px #C14D48,
            4px 4px #C14D48, -4px -4px #C14D48, 4px -4px #C14D48, -4px 4px #C14D48;
        }
        &:nth-child(2) {
          background: linear-gradient(180deg, #FFF3DE 0%, #FFF3DE 50%, #FFF3DE 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
  .leftIcon {
    z-index: 2;
    top: -143px;
    left: -10px;
    width: 149px;
    height: 245px;
    background: url('@/pages/childrenDay/assets/img_4.png') no-repeat left top/100% 100%;
  }
  .rightIcon {
    z-index: 2;
    top: -159px;
    right: -10px;
    width: 104px;
    height: 279px;
    background: url('@/pages/childrenDay/assets/img_5.png') no-repeat left top/100% 100%;
  }
  .bottomIcon {
    z-index: -1;
    bottom: -227px;
    left: 50%;
    transform: translateX(-50%);
    width: 750px;
    height: 384px;
    background: url('@/pages/childrenDay/assets/img_2.png') no-repeat left top/100% 100%;
  }
  &.hasTitle {
    margin-top: 102px; /*todo 有标题顶部距离*/
    padding-top: 82px; /*todo 有标题顶部距离*/
  }
  &:first-child {
    margin-top: 36px; /*todo 无标题距离tab的距离*/
    &.hasTitle {
      margin-top: 70px; /*todo 有标题距离tab的距离*/
    }
  }
  &:last-child {
    .bottomIcon {
      display: none;
    }
  }
}
</style>
