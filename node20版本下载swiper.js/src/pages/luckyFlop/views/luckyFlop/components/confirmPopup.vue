<template>
  <PopupBox :title="'title_13.png'" @clickClose="clickClose">
    <div :class="['main']">
      <div class="ownedNumText" v-if="config.is_all">剩余全套卡牌：{{ config.ownedNum }}套</div>
      <div class="needNumDiv" v-if="config.is_all">是否消耗{{ Number(config.needNum) }}套卡牌兑换</div>
      <!-- <div class="tip1">是否消耗2套卡牌兑换声波自选券？</div> -->
      <div class="icon">
        <PublicImg :imgName="config.rewardIcon"></PublicImg>
      </div>
      <div class="rewardText">{{config.rewardName}}{{config.rewardDesc}}<span v-if="config.rewardType!='wave_ticket'">天</span></div>
      <div class="btns">
        <div class="cancel" @click="clickClose">我再想想</div>
        <div class="confirm" @click="confirmCk">确认兑换</div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/pages/luckyFlop/api/index.js'

export default {
  props: ['config'],
  components: {},
  data() {
    return {
      isShowPo: true
    }
  },
  created() {},
  mounted() {
    console.log(this.config)
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 弹窗关闭
     */
    clickClose() {
      this.$emit('closePopups')
    },
    /**
     * 确认兑换
     */
    confirmCk() {
      getPageData({ type: 'love_card_exchange', mark: { id: this.config.exchangeId, num: 1 } }).then((res) => {
        if (res.errno == 0) {
          this.$toast(res.errmsg)
          this.$emit('getUserInformation')
          // this.$emit('closePopups')
          this.$emit('openReceivePopup', res.data)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  // height: calc(100% - 80px);
  // background-color: red;
  // position: absolute;
  // left: 0;
  // top: 50px;
  text-align: center;
  text-align: -webkit-center;
  color: #fff;
  // overflow-y: scroll;
  .ownedNumText{
    font-size: 32px;
    margin: 20px auto 0 auto;
    white-space: nowrap;
  }
  .needNumDiv{
    font-weight: 600;
    font-size: 32px;
    color: #FFFAA6;
    margin: 20px auto 0 auto;
    white-space: nowrap;
  }
  .icon{
    width: 128px;
    height: 128px;
    background: #FEFAEF;
    border-radius: 12px;
    border: 4px solid #FFBDFD;
    margin: 20px auto 0 auto;
  }
  .rewardText{
    font-weight: 400;
    font-size: 28px;
    color: #FFFFFF;
    margin: 20px auto 0 auto;
  }
  .tip1{
    white-space: nowrap;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 60px;
  }
  .btns{
    margin: 40px auto 0 auto;
    display: flex;
    justify-content: center;
    position: relative;
    .cancel {
      width: 240px;
      height: 72px;
      background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
      border-radius: 36px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
      font-size: 32px;
      color: #4A50D1;
      line-height: 72px;
      overflow: hidden;
      margin: 0 20px;
      // position: absolute;
      // left: 27%;
      // transform: translate(-50%);
      // bottom: 30px;
    }
    .confirm {
      width: 240px;
      height: 72px;
      background: linear-gradient(180deg, #F599FF, #8A6AF3);
      border-radius: 36px;
      border: 2px solid #F9C9FF;
      font-size: 32px;
      color: #fff;
      line-height: 72px;
      overflow: hidden;
      margin: 0 20px;
      // position: absolute;
      // left: 73%;
      // transform: translate(-50%);
      // bottom: 30px;
    }
  }
}
</style>
