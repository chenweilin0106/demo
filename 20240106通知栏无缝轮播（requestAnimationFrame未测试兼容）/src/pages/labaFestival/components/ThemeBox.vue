<template>
  <div class="ThemeBox">
    <!-- 标题图片 -->
    <div class="ThemeBox_head" v-if="themeTitleImg">
      <img :src="IconPath(themeTitleImg)" alt="" />
      <img
        class="img2"
        v-if="themeTitleImg2"
        :src="IconPath(themeTitleImg2)"
        alt=""
      />
      <div class="reset_tip" v-if="isresst"></div>
      <div
        v-if="isQuestion"
        class="question-icon"
        @click="$emit('onQuestion')"
      ></div>
    </div>
    <!-- 底部图片 -->
    <div class="ThemeBox_bottom">
      <img :src="IconPath('mk1_3.png')" alt="" />
    </div>
    <!-- 白色边框 -->
    <div class="white_border">
      <!-- 背景色 -->
      <div class="ThemeBox_main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @name ThemeBox
 * @description 主题盒子组件
 *
 * @prop {String} themeTitleImg 标题图片
 */
export default {
  name: 'ThemeBox',
  props: ['themeTitleImg', 'themeTitleImg2', 'isresst', 'isQuestion']
}
</script>

<style scoped lang="scss">
// 盒子主题
.ThemeBox {
  width: 100%;
  // 边框颜色
  margin-bottom: 118px;
  position: relative;
  // 圆角边框
  overflow: visible;
  border-radius: 26px;
  // 标题图片
  .ThemeBox_head {
    position: absolute;
    width: 750px;
    height: 105px;
    left: 50%;
    transform: translateX(-50%);
    top: -46px;
    text-align: center;
    z-index: 99;
    .img2 {
      position: absolute;
      top: -120px;
      left: 24px;
      width: 613px;
      height: 227px;
      z-index: 199;
    }
    .reset_tip {
      position: absolute;
      right: 229px;
      top: -56px;
      width: 124px;
      height: 42px;
      background-image: url('../assets/mk3_11.png');
      background-size: 100% 100%;
      z-index: 299;
    }
    .question-icon {
      position: absolute;
      top: 11px;
      right: 47px;
      background: url('@/pages/labaFestival/assets/mk4_1.png') no-repeat left
        top/100% 100%;
      width: 56px;
      height: 56px;
    }
  }
  .ThemeBox_bottom {
    width: 281px;
    height: 64px;
    position: absolute;
    right: -6px;
    bottom: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 内层白边框
  .white_border {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // background: #fff;
    padding: 1px;
    .ThemeBox_main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 20px;
    }
    // 下方说明字体样式
    ::v-deep .ThemeBox_BottomText {
      margin-left: 20px;
      margin-right: 38px;
      line-height: 50px;

      li {
        font-size: 28px;
        position: relative;
        list-style-type: none;
        margin-left: 30px;
        padding-left: 6px;

        img {
          position: relative;
          margin: 0 2px;
          width: 32px;
        }

        span {
          position: absolute;
          top: 18px;
          left: -30px;
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
