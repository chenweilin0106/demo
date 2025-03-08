<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <div class="inner-bgc">
        <p v-if="type == 1">每充值30元可获得1扭蛋券</p>
        <p v-else-if="type == 2">扭蛋次数不足，请前往充值</p>
        <div class="buttons">
          <div class="cancel" @click="showPopup = false">取消</div>
          <div class="confirm" @click="toRecharge">充值</div>
        </div>
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
      showPopup: false,
      type: 1
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
    openPrompt(type) {
      this.type = type
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
  background-color: #eee1ff;
  border: 8px solid #c59ce8;
  padding: 4px;
  border-radius: 32px;
  pointer-events: auto;

  .inner-bgc {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #8360c3, #b75059);
    //overflow: hidden;
    border-radius: 20px;
    padding-bottom: 42px;
    padding-top: 60px;

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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 178px;
        height: 78px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 3px solid #ffffff;
        border-radius: 39px;
        font-size: 32px;
        color: #4d7ddd;
      }

      .confirm {
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 178px;
        height: 78px;
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border: 3px solid #ffffff;
        border-radius: 39px;
        font-size: 32px;
        color: #a9792c;
      }
    }
  }
}
</style>
