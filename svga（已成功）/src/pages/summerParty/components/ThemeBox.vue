<template>
  <div class="ThemeBox">
    <!-- 标题图片 -->
    <div class="ThemeBox_TitleImg" v-if="themeTitleImg">
      <img :src="IconPath(themeTitleImg)" alt="" />
    </div>
    <!-- 夹层边框 -->
    <div class="white_border">
      <slot></slot>
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
  props: ['themeTitleImg']
}
</script>

<style scoped lang="scss">
// 盒子主题
.ThemeBox {
  width: 100%;
  // 边框颜色
  // border: $theme_box_border;
  margin-bottom: 38px;
  position: relative;
  // 圆角边框
  // border-radius: 28px !important;
  // background-color: #b4ebff;
  // padding: 2px;
  // padding: $theme_box_padding;
  // background: $theme_box_border_linear;
  overflow: visible;
  // 标题图片
  > .ThemeBox_TitleImg {
    position: absolute;
    width: 100%;
    // top: -26px;
    text-align: center;

    // > img {
    //   width: 201px;
    // }
  }
  // 内层白边框
  .white_border {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    border: 1px solid #fff;

    // 圆角边框
    // border-radius: 22px !important;
    // 背景色
    // background: $theme_box_bgc;

    // 下方说明字体样式
    .ThemeBox_BottomText {
      margin-left: 10px;
      margin-right: 8px;
      // color: $theme_box_text_color;
      line-height: 25px;

      li {
        font-size: 14px;
        position: relative;
        list-style-type: none;
        margin-left: 10px;
        padding-left: 3px;

        img {
          position: relative;
          margin: 0 1px;
          width: 22px;
        }

        span {
          position: absolute;
          top: 9px;
          left: -10px;
          display: block;
          width: 6px;
          height: 6px;
          // background: $theme_box_circle_color;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
