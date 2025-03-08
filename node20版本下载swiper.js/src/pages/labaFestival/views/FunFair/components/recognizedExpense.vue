<template>
  <!-- 弹框 -->
  <van-dialog
    class="ThemeDialog"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
    @closed="showDialog = false"
  >
    <div class="content">
      <div class="tit1">
        确认花费 <i>{{ currentPrice }}钻石</i>
      </div>
      <div class="tit2">购买该{{ currentBoxName }}吗</div>
      <div class="btns">
        <div class="leftBtn" @click="showDialog = false">取消</div>
        <div class="rightBtn" @click="sureBuy">确认</div>
      </div>
      <div class="checkBox">
        <div class="circle" v-if="tipsFlag == 1" @click="check"></div>
        <div class="circle circle2" v-else @click="check"></div>
        <div class="tit3">今日不再提示</div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
/**
 * @name recognizedExpense
 * @description: 弹框组件
 */
export default {
  name: 'recognizedExpense',
  props: ['currentPrice', 'currentBoxName'],
  data() {
    return {
      showDialog: false,
      tipsFlag: window.localStorage.getItem(new Date().toLocaleDateString())
    }
  },
  methods: {
    sureBuy() {
      this.showDialog = false
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
    // height: 330px;
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
        margin-left: 4px;
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
      margin-top: 37px;
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
      margin-top: 14px;
      margin-bottom: 18px;
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
