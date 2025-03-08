<template>
  <!-- 弹框 -->
  <van-dialog
    class="ThemeDialog"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
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
      <!-- 关闭按钮 -->
      <div v-if="offBtn" class="off-btn" @click="showDialog = false"></div>
    </template>
    <!-- 弹框背景色-->
    <div class="ThemeDialog_bgc">
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
  props: ['isShow', 'dialogMark', 'titleIconObj', 'isSmall', 'offBtn'],
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
  width: 304px;
  overflow: visible;
  background-color: transparent !important;

  // 标题
  ::v-deep .van-dialog__header {
    width: 100%;
    position: absolute;
    // top: -46px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    // > img {
    //   width: 201px;
    // }

    .off-btn {
      position: absolute;
      z-index: 10;
      top: 32px;
      right: -6px;
      width: 24px;
      height: 24px;
      background: url('../../assets/pop_6.png') no-repeat center top/100% auto;
    }
  }

  ::v-deep .van-dialog__content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    // background: linear-gradient(0deg, #bfd9ff, #ffb6e3);
    border-radius: 15px;
    overflow: hidden;
    padding: 3px;
    // 弹框背景色
    .ThemeDialog_bgc {
      width: 100%;
      height: 100%;
      // border: 1px solid #fff;
      border-radius: 10px;
      padding-top: 25px;
      overflow: hidden;
      // background: linear-gradient(0deg, #5c6ef3, #ffb6e3);
    }
  }
}

// 小弹框
.DialogSmall {
  width: 248px !important;
}
</style>
