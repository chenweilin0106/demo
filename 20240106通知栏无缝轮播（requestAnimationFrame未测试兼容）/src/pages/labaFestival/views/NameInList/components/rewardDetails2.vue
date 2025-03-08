<template>
  <!-- 兑换好礼弹框 -->
  <ThemeDialog
    class="dialog"
    :isShow="isshow"
    dialogMark="exchargeGift"
    :titleIconObj="{ exchargeGift: 'title_15.png' }"
    @closeDialog="
      isshow = false
      closeDialog()
    "
  >
    <div class="content">
      <div class="tit1">
        <div class="leftarrow"></div>
        <div class="tit">礼物代言人榜</div>
        <div class="rightarrow"></div>
      </div>
      <img class="day_award" :src="IconPath('tk_13.png')" alt="" />
    </div>
  </ThemeDialog>
</template>

<script>
import ThemeDialog from '../../../components/Dialog/ThemeDialog'
export default {
  props: ['show'],
  components: { ThemeDialog },
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
}
.content {
  width: 610px;
  // height: 589px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-bottom: 23px;
  div {
    flex-shrink: 0;
  }

  .tit1 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 37px;

    .leftarrow,
    .rightarrow {
      width: 140px;
      height: 26px;
      background-size: 100% 100%;
    }

    .leftarrow {
      background-image: url('../../../assets/tk_11.png');
    }

    .tit {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin: 0 33px;
      height: 29px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .rightarrow {
      background-image: url('../../../assets/tk_12.png');
    }
  }

  .day_award {
    width: 554px;
    height: 429px;
    margin-top: 20px;
    margin-bottom: 26px;
  }
}
</style>
