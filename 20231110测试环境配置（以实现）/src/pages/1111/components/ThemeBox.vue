<template>
  <div class="ThemeBox">
    <!-- 标题图片 -->
    <div class="ThemeBox_head" v-if="themeTitleImg">
      <img :src="IconPath(themeTitleImg)" alt="" />
    </div>
    <!--顶部样式-->
    <div class="no_title_head" v-if="isShowTop"></div>
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
  props: ['themeTitleImg', 'isShowTop']
}
</script>

<style scoped lang="scss">
// 盒子主题
.ThemeBox {
  width: 100%;
  // 边框颜色
  margin-bottom: 38px;
  position: relative;
  // 圆角边框
  overflow: visible;
  border-radius: 23px;
  // 标题图片
  .ThemeBox_head {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 364px;
    height: 68px;
    text-align: center;
    > img {
      width: 100%;
    }
  }

  .no_title_head {
    position: absolute;
    z-index: 2;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 364px;
    height: 58px;
    background: url('../assets/title_0.png') no-repeat left top/100% 100%;
  }

  // 内层白边框
  .white_border {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 18px;
    padding: 1px;

    .ThemeBox_main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 17px;
    }

    // 下方说明字体样式
    ::v-deep .ThemeBox_BottomText {
      margin-left: 10px;
      margin-right: 8px;
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
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
