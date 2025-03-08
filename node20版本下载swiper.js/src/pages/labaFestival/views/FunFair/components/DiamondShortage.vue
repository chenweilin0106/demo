<template>
  <!-- 弹框 -->
  <van-dialog
    class="ThemeDialog"
    v-model="showDialog"
    :show-confirm-button="false"
    close-on-click-overlay
  >
    <div class="content">
      <div class="tit1">钻石不足，请充值</div>
      <div class="btns">
        <div class="leftBtn" @click="showDialog = false">取消</div>
        <div
          class="rightBtn"
          @click="
            showDialog = false
            recharge()
          "
        >
          充值
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
/**
 * @name DiamondShortage
 * @description: 钻石不足弹窗
 */
export default {
  name: 'DiamondShortage',
  props: [],
  data() {
    return {
      showDialog: false
    }
  },
  watch: {},
  methods: {
    recharge() {
      this.$emit('recharge')
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
    width: 420px;
    height: 240px;
    background: linear-gradient(180deg, #8360c3, #b75059);
    border: 4px solid #eee1ff;
    border-radius: 24px;
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
  }
}
</style>
