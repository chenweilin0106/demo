<template>
  <!-- 兑换好礼弹框 -->
  <ThemeDialog
    class="dialog"
    :isShow="isshow"
    dialogMark="exchargeGift"
    :titleIconObj="{ exchargeGift: 'title_16.png' }"
    @closeDialog="
      isshow = false
      closeDialog()
    "
  >
    <div class="content">
      <div class="chatBg" v-if="isshow">
        <img v-show="chagBgFlag == 1" src="../../../assets/tk_14.png" alt="" />
        <img v-show="chagBgFlag == 2" src="../../../assets/tk_15.png" alt="" />
        <img v-show="chagBgFlag == 3" src="../../../assets/tk_16.png" alt="" />
        <img v-show="chagBgFlag == 4" src="../../../assets/tk_17.png" alt="" />
        <PublicSvga
          v-if="chagBgFlag == 1"
          class="lottie"
          svgaName="gift_xymf"
        />
      </div>
      <div v-show="chagBgFlag == 1" class="tit">雪夜魔法·礼物赠送权</div>
      <div v-show="chagBgFlag == 2" class="tit">亲密糖果·礼物冠名权</div>
      <div v-show="chagBgFlag == 3" class="tit">一帆风顺·礼物冠名权</div>
      <div v-show="chagBgFlag == 4" class="tit">浪漫木马·礼物冠名权</div>
      <div
        class="close"
        @click="
          isshow = false
          closeDialog()
        "
      ></div>
    </div>
  </ThemeDialog>
</template>

<script>
import ThemeDialog from '../../../components/Dialog/ThemeDialog'
import PublicSvga from '../../../components/PublicSvga.vue'
export default {
  props: ['show', 'chagBgFlag'],
  components: { ThemeDialog, PublicSvga },
  watch: {
    show: {
      handler(newValue) {
        this.isshow = newValue
      },
      immediate: true
    }
  },
  data() {
    return {
      isshow: false
    }
  },
  methods: {
    closeDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped lang="scss">
.dialog {
  width: 626px;
  margin-top: 100px;
  ::v-deep .van-dialog__content {
    border-radius: 40px;
    .ThemeDialog_bgc {
      border-radius: 32px;
    }
  }
}
.content {
  width: 100%;
  height: 897px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-bottom: 23px;
  .chatBg {
    width: 427px;
    height: 740px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 59px;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
    }
    .lottie {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  .tit {
    margin-top: 26px;
    white-space: nowrap;
    height: 27px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .close {
    width: 78px;
    height: 77px;
    background-image: url('../../../assets/tk_18.png');
    background-size: 100% 100%;
    position: absolute;
    top: -61px;
    right: -4px;
  }
  /**
  <div class="chatBg"></div>
      <div class="tit">雪夜魔法·礼物赠送权</div>
      <div
        class="close"
        @click="
          isshow = false
          closeDialog()
        "
      ></div>
  */
}
</style>
