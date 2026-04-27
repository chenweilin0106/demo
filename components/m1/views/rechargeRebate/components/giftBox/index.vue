<template>
  <OutBox class="giftBox" title="好运礼盒" :class="isLottery&&'pointer-none'">
    <div class="tip line-height-1 position-absolute position-row-center">每充值{{rechargeNum}}元可获得1次开启{{lotteryText}}</div>
    <div class="giftBg position-absolute position-row-center"></div>
    <div class="residueNum flex align-center line-height-1 position-absolute radius-999">剩余开启{{lotteryText}}：{{config.user_tickets}}</div>
    <div class="rechargeNum flex align-center line-height-1 position-absolute radius-999">充值金额：{{config.user_recharges}}</div>
    <div class="rulesBtn position-absolute" @click="showRulesPopup=true"></div>
    <div class="buttons position-absolute position-row-center flex">
      <div class="button1 status0" @click="open(1)">开启1次</div>
      <div class="button2 status1" @click="open(2)">开启10次</div>
    </div>
    <div v-if="isLottery" class="lotteryAn position-absolute position-row-center">
      <PublicImg imgName="20240614_m2_lottery.svga" :loop="1" @animOnFinished="animOnFinished" />
    </div>
    <RulesPopup v-if="showRulesPopup" :config="{rechargeNum,lotteryText}" @clickClose="showRulesPopup=false" />
    <ReceivePopup v-if="showReceivePopup" :config="configReceivePopup" @clickClose="showReceivePopup=false" />
    <FailPopup v-if="showFailPopup" :config="lotteryText" @clickClose="showFailPopup=false" @recharge="$emit('recharge')" />
  </OutBox>
</template>

<script>
import axios from 'axios'
import { getPageData } from '@/api'
import FailPopup from '@/pages/motherDay/views/rechargeRebate/components/giftBox/popups/failPopup.vue' // 抽奖次数不足弹窗
import ReceivePopup from '@/pages/motherDay/views/rechargeRebate/components/giftBox/popups/receivePopup.vue' // 恭喜获得弹窗
import RulesPopup from '@/pages/motherDay/views/rechargeRebate/components/giftBox/popups/rulesPopup.vue'// 礼盒规则弹窗

export default {
  name: 'giftBox',
  props: ['config'],
  components: { RulesPopup, ReceivePopup, FailPopup },
  data() {
    return {
      isLottery: false,
      lotteryText: Object.freeze('次数'),
      rechargeNum: Object.freeze(10),
      showFailPopup: false,
      configReceivePopup: [],
      showReceivePopup: false,
      showRulesPopup: false
    }
  },
  created() {
    // 预加载合成动画
    axios({ url: `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/20240614_m2_lottery.svga`, method: 'get', responseType: 'arraybuffer' })
  },
  methods: {
    animOnFinished() {
      this.showReceivePopup = true
      this.isLottery = false
    },
    /**
     * @description 抽奖
     * @param {number} mark 1:开启1次 2:开启10次
     */
    async open (mark) {
      const lotteryNum = mark == 1 ? 1 : 10
      if (lotteryNum > this.config.user_tickets) return (this.showFailPopup = true)
      const res = await getPageData({ mark, type: 'comm_lottery' })
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = res.data.awards
      this.isLottery = true
      this.$emit('updateGiftBoxData', res.data.user_tickets)
    }
  }
}
</script>

<style lang="scss" scoped>
.lotteryAn {
  z-index: 1;
  top: 120px;
  width: 550px;
  height: 660px;
  overflow: hidden;
}
.giftBox {
  width: 720px;
  height: 740px;
  .tip {
    top: 109px;
    font-weight: bold;
    font-size: 36px;
    color: #6C4C68;
  }
  .giftBg{
    top: 163px;
    width: 654px;
    height: 528px;
    background: url('@/pages/motherDay/assets/mk2_20.png') no-repeat left top/100% 100%;
  }
  .infoCommon {
    top: 195px;
    padding: 0 17px;
    height: 48px;
    background: linear-gradient(0deg, #D35A39, #B96646);
    box-shadow: inset 0 0 7px 0 rgba(255, 255, 255, 0.96);
    font-size: 28px;
    color: #ffffff;
  }
  .residueNum {
    @extend .infoCommon;
    left: 54px;
  }
  .rechargeNum {
    @extend .infoCommon;
    right: 54px;
  }
  .rulesBtn {
    top: 276px;
    right: 42px;
    width: 110px;
    height: 110px;
    background: url('@/pages/motherDay/assets/mk2_8.png') no-repeat left top/100% 100%;
  }
  .buttons {
    bottom: 78px;
    > div {
      width: 286px;
      height: 78px;
      font-size: 32px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
      // 渐变
      border: 3px solid transparent;
      border-radius: 99999px;
      -webkit-background-clip: padding-box, border-box;
      -webkit-background-origin: padding-box, border-box;
      &.status0{
        color: #4D7DDD;
        background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
      }
      &.status1{
        margin-left: 45px;
        color: #A9792C;
        background-image: linear-gradient(0deg, #FFF5B0, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
      }
    }
  }
}
</style>
