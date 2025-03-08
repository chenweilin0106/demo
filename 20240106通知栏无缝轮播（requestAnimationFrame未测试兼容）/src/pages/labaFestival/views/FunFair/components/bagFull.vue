<template>
  <!-- 弹框 -->
  <ThemeDialog
    class="dialog"
    :isShow="showDialog"
    dialogMark="exchargeGift"
    :titleIconObj="{ exchargeGift: 'title_16.png' }"
    @closeDialog="showDialog = false"
  >
    <slot></slot>
  </ThemeDialog>
</template>

<script>
import ThemeDialog from '../../../components/Dialog/ThemeDialog'

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
  name: 'bagFull',
  components: { ThemeDialog },
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
    sureBuy() {
      this.$emit('sureBuy')
    },
    check() {
      if (window.localStorage.getItem(new Date().toLocaleDateString()) == 1) {
        window.localStorage.setItem(new Date().toLocaleDateString(), 0)
        this.tipsFlag = 0
      } else {
        window.localStorage.setItem(new Date().toLocaleDateString(), 1)
        this.tipsFlag = 1
      }
    },
    clickClose() {
      this.$emit('onClose')
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
  ::v-deep .van-dialog__content {
    background-color: #c59ce8;
    border-radius: 24px;
  }
  .content {
    width: 500px;
    height: 330px;
    background: linear-gradient(180deg, #8360c3, #b75059);
    border-radius: 20px;
    border: 4px solid #eee1ff;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tit1 {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin-top: 48px;

      i {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffe84d;
      }
    }

    .tit2 {
      margin-top: 16px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;

      i {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #a0f7ff;
      }
    }

    .btns {
      margin-top: 41px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 372px;

      .leftBtn,
      .rightBtn {
        width: 172px;
        height: 72px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 2px solid #ffffff;
        border-radius: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4d7ddd;
      }

      .rightBtn {
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        color: #a9792c;
      }
    }

    .checkBox {
      margin-top: 17px;
      display: flex;
      align-items: center;
      div {
        flex-shrink: 0;
      }

      .circle {
        width: 50px;
        height: 48px;
        background-image: url('../../../assets/tk_8.png');
        background-size: 100% 100%;
        margin-right: 1px;
      }

      .circle2 {
        background-image: url('../../../assets/tk_9.png');
      }

      .tit3 {
        margin-top: 7px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
