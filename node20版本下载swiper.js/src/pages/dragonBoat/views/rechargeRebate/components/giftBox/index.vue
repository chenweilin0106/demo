<template>
  <OutBox class="giftBox" title="title_3.png" :bottom="true">
    <div class="tip width-fit margin-row-center line-height-100">每充值{{ rechargeNum }}元可获得1次开启机会</div>
    <div class="main position-relative margin-row-center">
      <div class="info flex align-center justify-between">
        <div class="residueNum flex align-center justify-center line-height-100 text-nowrap">剩余开启次数：{{ giftBoxData.user_tickets }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100 text-nowrap">充值金额：{{ giftBoxData.user_recharges }}</div>
      </div>
      <img :src="IconPath('mk2_9.png')" class="priceBtn position-absolute" @click="showGiftBoxRulesPopup = true" />
      <div class="buttons flex align-center justify-center">
        <img :src="IconPath('mk2_10.png')" class="openOne" @click="open(1)" />
        <img :src="IconPath('mk2_11.png')" class="openTen" @click="open(2)" />
      </div>
    </div>
    <GiftBoxRulesPopup v-if="showGiftBoxRulesPopup" :rechargeNum="rechargeNum" @clickClose="showGiftBoxRulesPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
    <LotteryFailPopup v-if="showLotteryFailPopup" @clickClose="showLotteryFailPopup = false" @recharge="$emit('recharge')" />
  </OutBox>
</template>

<script>
import { _throttle } from '@/pages/dragonBoat/utils/tool'
import { getPageData } from '@/pages/dragonBoat/api/index' // 恭喜获得弹窗
const LotteryFailPopup = () => import('./components/lotteryFailPopup.vue') // 抽奖次数不足弹窗
const GiftBoxRulesPopup = () => import('./components/giftBoxRulesPopup.vue') // 礼盒规则弹窗
const CongratsGetPopup = () => import('@/pages/dragonBoat/components/congratsGetPopup.vue') // 公共按钮
export default {
  name: 'giftBox',
  props: {
    giftBoxData: {
      type: Object,
      default: () => {
        return {
          user_tickets: 0,
          user_recharges: 0
        }
      }
    }
  },
  components: { GiftBoxRulesPopup, CongratsGetPopup, LotteryFailPopup },
  data() {
    return {
      rechargeNum: Object.freeze(10),
      showLotteryFailPopup: false,
      congratsGetPopupData: [],
      showCongratsGetPopup: false,
      showGiftBoxRulesPopup: false
    }
  },
  computed: {},
  methods: {
    /**
     * @description 抽奖
     * @param {number|string} mark 1:开启1次 2:开启10次
     */
    open: _throttle(async function (mark) {
      const lotteryNum = mark == 1 ? 1 : 10
      if (lotteryNum > this.giftBoxData.user_tickets) return (this.showLotteryFailPopup = true)
      const res = await getPageData({ mark, type: 'comm_lottery' })
      if (res.errno) return this.$toast(res.errmsg)
      this.congratsGetPopupData = res.data.awards
      this.showCongratsGetPopup = true
      this.$emit('updateGiftBoxData', res.data.user_tickets)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.giftBox {
  padding-top: 59px;
  margin-top: 131px;
  width: 736px;
  height: 577px;
  border-image-source: none;
  background: url('@/pages/dragonBoat/assets/mk2_12.png') no-repeat left top/100% 100%;
  .tip {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
    color: #fff588;
  }
  .main {
    //width: 660px;
    //height: 500px;
    //background: url('@/pages/dragonBoat/assets/mk2_12.png') no-repeat left top/100% 100%;
    //padding-top: 27px;
    .info {
      padding: 0 14px 0 13px;
      margin-bottom: 219px;
      .residueNum,
      .rechargeNum {
        padding: 0 17px;
        width: fit-content;
        height: 48px;
        background: #2d878d;
        font-size: 28px;
        color: #ffffff;
      }
      .residueNum {
        border-radius: 0 24px 24px 0;
      }
      .rechargeNum {
        border-radius: 24px 0 0 24px;
      }
    }
    .priceBtn {
      top: 94px;
      right: 34px;
      width: 86px;
      height: 86px;
    }
    .buttons {
      padding: 0 52px;
    }
    .openOne,
    .openTen {
      width: 186px;
      height: 179px;
    }
    .openOne {
      //background: url('@/pages/dragonBoat/assets/btn_6.png') no-repeat left top/100% 100%;
    }
    .openTen {
      margin-left: 166px;
      //background: url('@/pages/dragonBoat/assets/btn_5.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
