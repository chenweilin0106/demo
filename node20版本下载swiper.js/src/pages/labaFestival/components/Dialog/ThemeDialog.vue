<template>
  <!-- 弹框 -->
  <van-dialog
    class="ThemeDialog"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
    @opened="$emit('opened')"
    @closed="$emit('closeDialog')"
    :class="{
      DialogSmall: isSmall
    }"
  >
    <!-- 标题 -->
    <template #title>
      <img
        v-if="dialogMark && titleIconObj[dialogMark]"
        :src="IconPath(titleIconObj[dialogMark])"
        alt=""
      />
    </template>
    <!-- 弹框背景色-->
    <div class="ThemeDialog_bgc">
      <div class="left_decorate"></div>
      <div class="right_decorate"></div>
      <div class="bottom_decorate"></div>
      <slot></slot>
    </div>
  </van-dialog>
</template>

<script>
/**
 * @name ThemeDialog
 * @description: 弹框组件
 *
 * @prop {Boolean} isShow 是否显示弹框（监听isShow更新showDialog）
 * @prop {String} dialogMark 弹框标识（如果没有传就标识不要标题图片）
 * @prop {Object} titleIconObj 标题图标对象
 * @prop {Boolean} isSmall 是否是小弹框
 *
 * showDialog，用于控制弹框的显示隐藏，组件内部使用监听器监听isShow的变化，当isShow变化时，更新showDialog的值，从而控制弹框的显示隐藏，弹框关闭会自动调用弹框组件的closeDialog方法
 * 点击弹框外部遮盖层，会将showDialog的值改为false，从而关闭弹框，同时会调用弹框组件的closeDialog方法
 */
export default {
  name: 'ThemeDialog',
  props: ['isShow', 'dialogMark', 'titleIconObj', 'isSmall'],
  data() {
    return {
      showDialog: false
    }
  },
  watch: {
    isShow: {
      handler(val) {
        this.showDialog = val
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
// 弹框样式
.ThemeDialog {
  width: 608px;
  overflow: visible;
  background-color: transparent !important;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 标题
  ::v-deep .van-dialog__header {
    width: 100%;
    position: absolute;
    top: -168px;
    width: 692px;
    height: 227px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  ::v-deep .van-dialog__content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    // background: linear-gradient(0deg, #bfd9ff, #ffb6e3);
    border-radius: 32px;
    // overflow: hidden;
    padding: 1px;
    // 弹框背景色
    .ThemeDialog_bgc {
      width: 100%;
      // height: 100%;
      // border: 1px solid #fff;
      border-radius: 24px;
      padding-top: 25px;
      overflow: hidden;
      // background: linear-gradient(0deg, #5c6ef3, #ffb6e3);
      // position: relative;
      .left_decorate {
        width: 99px;
        height: 252px;
        background-image: url('../../assets/tk_1.png');
        background-size: 100% 100%;
        position: absolute;
        top: 80px;
        left: -38px;
      }
      .right_decorate {
        width: 87px;
        height: 251px;
        background-image: url('../../assets/tk_2.png');
        background-size: 100% 100%;
        position: absolute;
        top: 98px;
        right: -34px;
      }
      .bottom_decorate {
        width: 224px;
        height: 50px;
        background-image: url('../../assets/tk_3.png');
        background-size: 100% 100%;
        position: absolute;
        right: -12px;
        bottom: -12px;
      }
    }
  }
}
// 小弹框
.DialogSmall {
  width: 248px !important;
}
</style>
