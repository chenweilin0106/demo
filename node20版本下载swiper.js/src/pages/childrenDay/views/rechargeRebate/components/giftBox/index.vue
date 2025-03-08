<template>
  <OutBox class="giftBox" title="title_3.png">
    <div class="tip width-fit margin-row-center line-height-100">每充值10元可获得1次开启次数</div>
    <div class="main position-relative margin-row-center">
      <div class="info flex align-center justify-between">
        <div class="residueNum flex align-center justify-center line-height-100 text-nowrap">剩余开启次数：{{ giftBoxData.user_tickets }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100 text-nowrap">充值金额：{{ giftBoxData.user_recharges }}</div>
      </div>
      <img :src="IconPath('mk2_4.png')" class="priceBtn position-absolute" @click="showGiftBoxRulesPopup = true" />
      <div class="buttons flex align-center justify-between">
        <PublicButton class="openOne" :has-right="0" @click="open(1)">开启1次</PublicButton>
        <PublicButton class="openTen" :has-right="1" @click="open(2)">开启10次</PublicButton>
      </div>
    </div>
    <GiftBoxRulesPopup v-if="showGiftBoxRulesPopup" @clickClose="showGiftBoxRulesPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
    <LotteryFailPopup v-if="showLotteryFailPopup" @clickClose="showLotteryFailPopup = false" @recharge="recharge(hiddenFn)" />
  </OutBox>
</template>

<script>
import { _throttle } from '@/pages/childrenDay/utils/tool'
import { getPageData } from '@/pages/childrenDay/api/index' // 恭喜获得弹窗
import PublicButton from '@/pages/childrenDay/components/publicButton.vue'
import { recharge } from '@/pages/childrenDay/utils/toApp'
const LotteryFailPopup = () => import('./components/lotteryFailPopup.vue') // 抽奖次数不足弹窗
const GiftBoxRulesPopup = () => import('./components/giftBoxRulesPopup.vue') // 礼盒规则弹窗
const CongratsGetPopup = () => import('@/pages/childrenDay/components/congratsGetPopup.vue') // 公共按钮
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
  components: { GiftBoxRulesPopup, PublicButton, CongratsGetPopup, LotteryFailPopup },
  data() {
    return {
      showLotteryFailPopup: false,
      congratsGetPopupData: [
        // { icon: 'ljs_120_120.png', text: '+10', type: 'costume' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' }
      ],
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
    }, 1000),
    recharge,
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.$emit('updatePageData')
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.giftBox {
  padding-top: 70px;
  margin-top: 146px;
  height: 700px;
  .tip {
    margin-bottom: 28px;
    font-weight: bold;
    font-size: 36px;
    color: #fff;
  }
  .main {
    width: 664px;
    height: 528px;
    background: url('@/pages/childrenDay/assets/mk2_7.png') no-repeat left top/100% 100%;
    padding-top: 53px;
    .info {
      padding: 0 16px;
      margin-bottom: 298px;
      .residueNum,
      .rechargeNum {
        width: fit-content;
        height: 48px;
        padding: 0 17px;
        border-image-source: url('@/pages/childrenDay/assets/mk2_11.png');
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
      width: 256px;
      height: 83px;
      font-size: 32px;
      &.button-receive {
        background-image: url('@/pages/childrenDay/assets/btn_6.png');
      }
      &.button-noFinish {
        background-image: url('@/pages/childrenDay/assets/btn_4.png');
      }
    }
  }
}
</style>
