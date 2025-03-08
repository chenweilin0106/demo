<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <p>礼包发送次数不足</p>
      <p>每充值2000元可获得发送次数+1</p>
      <div class="button button-receive" @click="handleRecharge">去充值</div>
    </div>
  </van-popup>
</template>

<script>
import { recharge } from '@/pages/springFestival/utils/toApp'
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
        // 页面呼出 需要更新发送次数
        this.$emit('update')
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt() {
      this.showPopup = true
    },
    // 跳转APP充值界面
    handleRecharge() {
      recharge(this.hiddenFn)
      this.showPopup = false
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
  width: 468px;
  height: 248px;
  background: linear-gradient(0deg, #ffbc4a, #eb6d3b);
  border: 4px solid #ffdc7a;
  border-radius: 28px;
  padding-top: 35px;
  pointer-events: auto;

  p {
    width: fit-content;
    margin: 0 auto;
    white-space: nowrap;
  }

  p:nth-of-type(1) {
    font-size: 32px;
    color: #ffffff;
  }
  p:nth-of-type(2) {
    margin: 19px auto 26px;
    font-size: 24px;
    color: #ffee93;
  }

  .button {
    margin: 0 auto;
    width: 176px;
    height: 76px;
    font-size: 32px;
    border-radius: 38px;
  }
}
</style>
