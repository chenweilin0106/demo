<template>
  <van-popup v-model="showPopup" @closed="clickClose" class="flex align-center justify-center" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <p class="margin-row-center text-nowrap">祈愿币不足，请充值</p>
        <div class="buttons flex align-center justify-center">
          <div class="cancel-button button-noFinish" @click="showPopup = false">取消</div>
          <div class="confirm-button flex align-center justify-center" @click="toRecharge">充值</div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  created() {},
  methods: {
    toRecharge() {
      this.showPopup = false
      this.$emit('recharge')
    },
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt(params) {
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: relative;
  width: 440px;
  height: 260px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;

  .inner {
    border-radius: 24px;
    background: linear-gradient(180deg, #fff3f4, #f9c4c7);
    padding-top: 60px;

    > p {
      margin-bottom: 42px;
      width: fit-content;
      font-size: 32px;
      color: #b35553;
    }

    .buttons {
      .cancel-button,
      .confirm-button {
        width: 178px;
        height: 78px;
        border-radius: 39px;
        font-size: 32px;
      }

      .cancel-button {
        color: #707ccb;
        background: linear-gradient(0deg, #bcc4f1, #ffffff);
      }
      .confirm-button {
        margin-left: 24px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 3px solid #ffffff;
        color: #a9792c;
      }
    }
  }
}
</style>
