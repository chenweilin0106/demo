<template>
  <skill-gift-box class="giftBox" title="title_5.png">
    <div class="tip width-fit margin-row-center line-height-100">每充值10元可获得1次开启次数</div>
    <div class="main position-relative margin-row-center">
      <div class="info flex align-center justify-between">
        <div class="residueNum flex align-center justify-center line-height-100 text-nowrap">剩余开启次数：{{ giftBoxData.user_tickets }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100 text-nowrap">充值金额：{{ giftBoxData.user_recharges }}</div>
      </div>
      <img :src="IconPath('mk2_12.png')" class="priceBtn position-absolute" @click="showGiftBoxRulesPopup = true" />
      <div class="buttons flex align-center justify-between">
        <PublicButton class="openOne" :has-right="1" @click="open(1)">开启1次</PublicButton>
        <PublicButton class="openTen" :has-right="0" @click="open(2)">开启10次</PublicButton>
      </div>
    </div>
    <GiftBoxRulesPopup v-if="showGiftBoxRulesPopup" @close="showGiftBoxRulesPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @close="showCongratsGetPopup = false" />
    <LotteryFailPopup v-if="showLotteryFailPopup" @close="showLotteryFailPopup = false" @recharge="$emit('recharge')" />
  </skill-gift-box>
</template>

<script>
import { _throttle } from '@/pages/skillGift/utils/tool'
import { getPageData } from '@/pages/skillGift/api/index' // 恭喜获得弹窗
import PublicButton from '@/pages/skillGift/components/publicButton.vue'
import SkillGiftBox from '@/pages/skillGift/components/skill-gift-box.vue'
const LotteryFailPopup = () => import('./components/lotteryFailPopup.vue') // 抽奖次数不足弹窗
const GiftBoxRulesPopup = () => import('./components/giftBoxRulesPopup.vue') // 礼盒规则弹窗
const CongratsGetPopup = () => import('@/pages/skillGift/popups/congratsGetPopup.vue') // 恭喜获得弹窗
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
  components: { SkillGiftBox, GiftBoxRulesPopup, PublicButton, CongratsGetPopup, LotteryFailPopup },
  data() {
    return {
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
  padding-top: 79px;
  margin-top: 71px;
  width: 720px;
  height: 709px;
  .tip {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 36px;
    color: #ffffff;
  }
  .main {
    width: 677px;
    height: 509px;
    background: url('@/pages/skillGift/assets/mk2_14.png') no-repeat left top/100% 100%;
    padding-top: 31px;
    .info {
      padding: 0 16px;
      margin-bottom: 298px;
      .residueNum,
      .rechargeNum {
        width: fit-content;
        height: 59px;
        padding: 0 17px;
        border-image-source: url('@/pages/skillGift/assets/mk2_13.png');
        border-image-slice: 0 30 0 30 fill;
        border-image-width: 0 30px 0 30px;
        font-size: 28px;
        color: #ffffff;
      }
    }
    .priceBtn {
      top: 121px;
      right: 17px;
      width: 96px;
      height: 96px;
    }
    .buttons {
      padding: 0 52px;
    }
    .openOne,
    .openTen {
      width: 272px;
      height: 98px;
      font-size: 32px;
      color: #1069ff;
    }
    .openOne {
      background: url('@/pages/skillGift/assets/mk2_6.png') no-repeat left top/100% 100%;
    }
    .openTen {
      background: url('@/pages/skillGift/assets/mk2_5.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
