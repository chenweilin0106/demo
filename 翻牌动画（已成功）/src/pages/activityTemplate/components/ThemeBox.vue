<template>
  <div class="ThemeBox">
    <!-- 标题图片 -->
    <div class="ThemeBox_TitleImg" v-if="themeTitleImg">
      <img :src="require(`../assets/${themeTitleImg}`)" alt="" />
    </div>
    <!-- 夹层边框 -->
    <div class="border_box">
      <div class="white_border">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeBox',
  props: {
    // 标题图片
    themeTitleImg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
// 盒子主题
.ThemeBox {
  width: 100%;
  // 边框颜色
  border: 1px solid #fff;
  margin-bottom: 38px;
  position: relative;
  // 圆角边框
  // border-radius: 28px !important;
  // background-color: #b4ebff;
  // padding: 2px;
  overflow: visible;
  // 中间边框
  .border_box {
    width: 100%;
    border: 4px solid;
    box-sizing: border-box;
    border-image: linear-gradient(0deg, #b93124, #ff935e) 1;
  }
  // 标题图片
  > .ThemeBox_TitleImg {
    position: absolute;
    width: 100%;
    top: -26px;
    text-align: center;

    > img {
      width: 201px;
    }
  }
  // 内层白边框
  .white_border {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    border: 1px solid #fff;
    box-sizing: border-box;
    // 圆角边框
    // border-radius: 22px !important;
    // 背景色
    background: linear-gradient(0deg, #0937a2, #205adc);

    // 下方说明字体样式
    .ThemeBox_BottomText {
      margin-left: 10px;
      margin-right: 8px;
      color: #fff;
      line-height: 25px;

      li {
        position: relative;
        list-style-type: none;
        margin-left: 10px;
        padding-left: 3px;
        box-sizing: border-box;

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
          background: #fffaa6;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
