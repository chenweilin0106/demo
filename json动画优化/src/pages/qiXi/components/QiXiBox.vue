<template>
  <div class="QiXiBox" data-html2canvas-ignore>
    <div class="head flex_across">
      <img v-if="themeTitleImg" :src="IconPath(themeTitleImg)" alt="" />
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
export default {
  name: 'QiXiBox',
  props: ['themeTitleImg']
}
</script>

<style scoped lang="scss">
.QiXiBox {
  margin-left: auto;
  margin-right: auto;
  width: 355px;
  .head {
    width: 100%;
    height: 44px;
    background: url('../assets/mk1_2.png') no-repeat top center/100% auto;
    > img {
      width: 229px;
      height: auto;
      margin: -63px 0 0;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    background: url('../assets/mk1_3.png') no-repeat top center/100% 100%;
    padding: 0 4px;
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
        color: #6f59c3;

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
          background: #fb97cd;
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 45px;
    background: url('../assets/mk1_4.png') no-repeat top center/100% auto;
  }
}
</style>
