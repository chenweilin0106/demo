<template>
  <!-- 弹框 -->
  <van-dialog
    class="ThemeDialog"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
    @opened="opened"
    @closed="closed"
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
  },
  methods: {
    opened() {
      document.querySelector('html').style.overflow = 'hidden'
    },
    closed() {
      document.querySelector('html').style.overflow = 'auto'
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped lang="scss">
// 弹框样式
.ThemeDialog {
  width: 628px;
  overflow: visible;
  background-color: transparent !important;
  top: 50%;

  // 标题
  ::v-deep .van-dialog__header {
    position: absolute;
    top: -122px;
    left: 50%;
    transform: translateX(-50%);
    width: 515px;
    height: 199px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    pointer-events: none;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  ::v-deep .van-dialog__content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: rgba(236, 211, 255, 0.5);
    border-radius: 50px;
    overflow: hidden;
    padding: 6px;
    // 弹框背景色
    .ThemeDialog_bgc {
      width: 100%;
      height: 100%;
      border: 4px solid #fff;
      border-radius: 44px;
      padding-top: 50px;
      overflow: hidden;
      background: linear-gradient(0deg, #ed96fd, #866ae0);
    }
  }
}
// 小弹框
.DialogSmall {
  width: 500px !important;
}
</style>
