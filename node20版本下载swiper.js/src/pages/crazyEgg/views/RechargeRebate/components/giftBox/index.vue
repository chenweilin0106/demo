<template>
  <OutBox class="giftBox" title="title_13.png">
    <div class="tip width-fit margin-row-center line-height-100">每充值10元可获得1次开启次数</div>
    <div class="main position-relative margin-row-center">
      <div class="info flex align-center justify-between">
        <div class="residueNum flex align-center justify-center line-height-100 text-nowrap">剩余开启次数：{{ giftBoxData.user_tickets }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100 text-nowrap">充值金额：{{ giftBoxData.user_recharges }}</div>
      </div>
      <img :src="IconPath('mk2_8.png')" class="priceBtn position-absolute" @click="showGiftBoxRulesPopup = true" />
      <div class="buttons flex align-center justify-between">
        <div class="openOne flex align-center justify-center line-height-100" @click="open(1)">开启1次</div>
        <div class="openTen flex align-center justify-center line-height-100" @click="open(2)">开启10次</div>
      </div>
      <div v-if="isLottery" class="lotteryBox position-absolute position-row-center">
        <PublicImg imgName="20240614_m2_lottery.svga" :loop="1" @animOnFinished="animOnFinished" />
      </div>
    </div>
    <GiftBoxRulesPopup v-if="showGiftBoxRulesPopup" @clickClose="showGiftBoxRulesPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
    <LotteryFailPopup v-if="showLotteryFailPopup" @clickClose="showLotteryFailPopup = false" @recharge="$emit('recharge')" />
  </OutBox>
</template>

<script>
import axios from 'axios'
import { _throttle } from '@/pages/crazyEgg/utils/tool'
import { getPageData } from '@/pages/crazyEgg/api/index'
const LotteryFailPopup = () => import('./components/lotteryFailPopup.vue') // 抽奖次数不足弹窗
const GiftBoxRulesPopup = () => import('./components/giftBoxRulesPopup.vue') // 礼盒规则弹窗
const CongratsGetPopup = () => import('@/pages/crazyEgg/components/congratsGetPopup.vue') // 公共按钮
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
  created() {
    // 预加载合成动画
    axios({
      url: `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/20240614_m2_lottery.svga`,
      method: 'get',
      responseType: 'arraybuffer'
    })
  },
  components: { CongratsGetPopup, GiftBoxRulesPopup, LotteryFailPopup },
  data() {
    return {
      showLotteryFailPopup: false,
      showCongratsGetPopup: false,
      congratsGetPopupData: [
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10', egg_type: 6 }
      ],
      isLottery: false,
      showGiftBoxRulesPopup: false
    }
  },
  computed: {},
  methods: {
    animOnFinished() {
      this.showCongratsGetPopup = true
      this.isLottery = false
    },
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
      this.isLottery = true
      this.$emit('updateGiftBoxData', res.data.user_tickets)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.lotteryBox {
  z-index: 1;
  top: 0; /*todo 动画位置*/
  width: 550px;
  height: 660px;
  overflow: hidden;
}
.giftBox {
  padding-top: 122px;
  margin-top: 68px;
  height: 787px;
  .tip {
    margin-bottom: -40px;
    font-weight: bold;
    font-size: 36px;
    color: #ffffff;
  }
  .main {
    width: 658px;
    height: 593px;
    background: url('@/pages/crazyEgg/assets/mk2_20.png') no-repeat left top/100% 100%;
    padding-top: 92px;
    .info {
      padding: 0 16px;
      margin-bottom: 346px;
      .residueNum,
      .rechargeNum {
        width: fit-content;
        height: 48px;
        padding: 0 17px;
        border-image-source: url('@/pages/crazyEgg/assets/mk2_11.png');
        border-image-slice: 0 30 0 30 fill;
        border-image-width: 0 30px 0 30px;
        font-size: 28px;
        color: #ffffff;
      }
    }
    .priceBtn {
      top: 180px;
      right: 16px;
      width: 96px;
      height: 96px;
    }
    .buttons {
      padding: 0 32px;
    }
    .openOne,
    .openTen {
      width: 284px;
      height: 76px;
      border-radius: 38px;
      border: 2px solid #ffffff;
      font-size: 32px;
      color: #ffffff;
    }
    .openOne {
      background-image: linear-gradient(0deg, #e07336, #fff68f);
    }
    .openTen {
      background-image: linear-gradient(0deg, #34a38f, #9adbb9);
    }
  }
}
</style>
