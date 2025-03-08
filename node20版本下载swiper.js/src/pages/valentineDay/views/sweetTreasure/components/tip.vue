<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <div class="white_box">
        <div class="inner_box">
          <div class="tit" v-if="tipflag == 1">寻珍币不足，请进行充值</div>
          <div class="tit" v-if="tipflag == 2">完成奖池选择后即可参与抽奖</div>
          <div class="btn" @click="gonow">立即前往</div>
        </div>
      </div>
      <!--列表-->
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'tIp',
  props: ['tipflag'],
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    clickClose() {},
    gonow() {
      this.showPopup = false
      if (this.tipflag == 1) {
        this.$emit('rechargeNow')
      }
      if (this.tipflag == 2) {
        this.$emit('drawNow')
      }
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
  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border: 10px solid rgba(236, 211, 255, 0.5);
    border-radius: 40px;
    pointer-events: auto;
    .white_box {
      border: 4px solid #ffffff;

      border-radius: 30px;
      overflow: hidden;
      .inner_box {
        width: 500px;
        height: 240px;
        background: linear-gradient(0deg, #ed96fd, #866ae0);
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 61px;
        .tit {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
        .btn {
          margin-top: 44px;
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #fff9d1, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #a9792c;
        }

        // <div class="tit">完成奖池选择后即可参与抽奖</div>
        //   <div class="btn">立即前往</div>
      }
    }
  }
}
</style>
