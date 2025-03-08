<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <p>次数不足，请前往充值</p>
      <div class="buttons">
        <div class="cancel flex-center" @click="showPopup = false">取消</div>
        <div class="confirm flex-center" @click="toRecharge">充值</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { recharge } from '@/pages/labaFestival/utils/toApp'

export default {
  props: {},
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.$emit('update')
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    toRecharge() {
      recharge(this.hiddenFn)
      this.showPopup = false
    },
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt() {
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 436px;
  height: 256px;
  background: linear-gradient(0deg, #5e243a, #7e2725);
  border: 8px solid #f9c66c;
  border-radius: 26px;
  pointer-events: auto;
  padding-top: 64px;

  p {
    margin: 0 auto 44px;
    width: fit-content;
    font-size: 32px;
    color: #ffffff;
    white-space: nowrap;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .cancel {
      width: 136px;
      height: 64px;
      background: url('@/pages/lanternFestival/assets/btn_3.png') no-repeat left
        top/100% 100%;
      font-size: 28px;
      color: #ffffff;
    }

    .confirm {
      margin-left: 44px;
      width: 136px;
      height: 64px;
      background: url('@/pages/lanternFestival/assets/btn_2.png') no-repeat left
        top/100% 100%;
      font-size: 28px;
      color: #e73d27;
    }
  }
}
</style>
