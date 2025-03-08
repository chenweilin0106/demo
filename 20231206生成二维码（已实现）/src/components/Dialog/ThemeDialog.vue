<template>
  <!-- 弹框 -->
  <van-dialog
    class="ThemeDialog"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
    @closed="$emit('closeDialog')"
  >
    <!-- 标题 -->
    <template #title>
      <img
        v-if="dialogMark && titleIconObj[dialogMark]"
        :src="IconPath(titleIconObj[dialogMark])"
      />
      <!-- 关闭按钮 -->
      <div v-if="offBtn" class="off-btn" @click="showDialog = false"></div>
    </template>
    <div class="inside_border">
      <div class="bat_1"></div>
      <div class="bat_2"></div>
      <div class="bat_3"></div>
      <slot></slot>
    </div>
    <div class="foot"></div>
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
 *
 * showDialog，用于控制弹框的显示隐藏，组件内部使用监听器监听isShow的变化，当isShow变化时，更新showDialog的值，从而控制弹框的显示隐藏，弹框关闭会自动调用弹框组件的closeDialog方法
 * 点击弹框外部遮盖层，会将showDialog的值改为false，从而关闭弹框，同时会调用弹框组件的closeDialog方法
 */
export default {
  name: 'ThemeDialog',
  props: ['isShow', 'dialogMark', 'titleIconObj', 'offBtn'],
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
  top: 50% !important;
  background-color: transparent !important;

  // 标题
  ::v-deep .van-dialog__header {
    position: absolute;
    top: -143px;
    width: 100%;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      position: relative;
      width: 649px;
      height: 186px;
    }

    .off-btn {
      position: absolute;
      z-index: 10;
      top: 42px;
      right: -4px;
      width: 72px;
      height: 72px;
      background: url('../../assets/tk_14.png') no-repeat center top/100% auto;
    }
  }

  ::v-deep .van-dialog__content {
    position: relative;
    z-index: 4;
    width: 100%;
    height: 100%;
    background: #916fdf;
    border-radius: 38px;
    padding: 8px;

    .inside_border {
      width: 100%;
      height: 100%;
      border-radius: 30px;
      border: 4px solid #c1a8f5;
      background: linear-gradient(180deg, #382667, #466ec9);

      .bat_1,
      .bat_2,
      .bat_3 {
        position: absolute;
      }

      .bat_1 {
        z-index: 10;
        left: -57px;
        top: 231px;
        width: 89px;
        height: 44px;
        background: url('../../assets/tk_9.png') no-repeat left top/100% 100%;
      }

      .bat_2 {
        z-index: 10;
        right: -54px;
        top: 294px;
        width: 123px;
        height: 74px;
        background: url('../../assets/tk_8.png') no-repeat left top/100% 100%;
      }

      .bat_3 {
        z-index: 10;
        right: -48px;
        top: 119px;
        width: 67px;
        height: 32px;
        background: url('../../assets/tk_10.png') no-repeat left top/100% 100%;
      }
    }

    .foot {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 649px;
      height: 80px;
      background: url('../../assets/tk_2.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
