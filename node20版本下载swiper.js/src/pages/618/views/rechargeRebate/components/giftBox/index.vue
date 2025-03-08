<template>
  <OutBox class="giftBox" title="title_3.png" :hasCostume="true" :class="isLottery && 'pointer-none'">
    <div class="tip width-fit margin-row-center line-height-100">每充值{{ rechargeNum }}元可获得1次开启机会</div>
    <div class="main w-100 h-100">
      <div class="info flex align-center justify-between">
        <div class="residueNum flex align-center justify-center line-height-100 text-nowrap">剩余开启次数：{{ giftBoxData.user_tickets }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100 text-nowrap">充值金额：{{ giftBoxData.user_recharges }}</div>
      </div>
      <img :src="IconPath('mk2_6.png')" class="priceBtn position-absolute" @click="showGiftBoxRulesPopup = true" />
      <div class="buttons flex align-center justify-center">
        <img :src="IconPath('mk2_10.png')" class="openOne" @click="open(1)" />
        <img :src="IconPath('mk2_11.png')" class="openTen" @click="open(2)" />
      </div>
      <div v-if="isLottery" class="lotteryBox position-absolute position-row-center">
        <PublicImg imgName="20240614_m2_lottery.svga" :loop="1" @animOnFinished="animOnFinished" />
      </div>
    </div>
    <GiftBoxRulesPopup v-if="showGiftBoxRulesPopup" :rechargeNum="rechargeNum" @clickClose="showGiftBoxRulesPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
    <LotteryFailPopup v-if="showLotteryFailPopup" @clickClose="showLotteryFailPopup = false" @recharge="$emit('recharge')" />
  </OutBox>
</template>

<script>
import axios from 'axios'
import { _throttle } from '@/pages/618/utils/tool'
import { getPageData } from '@/pages/618/api/index' // 恭喜获得弹窗
const LotteryFailPopup = () => import('./components/lotteryFailPopup.vue') // 抽奖次数不足弹窗
const GiftBoxRulesPopup = () => import('./components/giftBoxRulesPopup.vue') // 礼盒规则弹窗
const CongratsGetPopup = () => import('@/pages/618/components/congratsGetPopup.vue') // 公共按钮
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
      isLottery: false,
      rechargeNum: Object.freeze(30),
      showLotteryFailPopup: false,
      congratsGetPopupData: [],
      showCongratsGetPopup: false,
      showGiftBoxRulesPopup: false
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
  top: 245px;
  width: 550px;
  height: 660px;
  overflow: hidden;
}
.giftBox {
  padding-top: 174px; // 需要更新
  margin-top: 60px; // 需要更新
  width: 738px; // 需要更新
  height: 1121px; // 需要更新
  border-image-source: none;
  background: url('@/pages/618/assets/mk2_12.png') no-repeat left top/100% 100%;
  .tip {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
    color: #7f3900; // 背景颜色 需要更新
  }
  .main {
    //width: 660px;
    //height: 500px;
    //background: url('@/pages/618/assets/mk2_12.png') no-repeat left top/100% 100%;
    //padding-top: 27px;
    .info {
      padding: 0 10px;
      margin-bottom: 654px; // 和抽奖按钮之间的距离 需要更新
      .infoCommon {
        padding: 0 17px;
        width: fit-content;
        height: 48px;
        background: #aa673a; // 背景颜色 需要更新
        font-size: 28px;
        color: #ffffff;
      }
      .residueNum {
        @extend .infoCommon;
        border-radius: 0 24px 24px 0;
      }
      .rechargeNum {
        @extend .infoCommon;
        border-radius: 24px 0 0 24px;
      }
    }
    .priceBtn {
      top: 292px; // 需要更新
      right: 29px; // 需要更新
      width: 86px; // 需要更新
      height: 86px; // 需要更新
    }
    .buttons {
      padding: 0 36px; // 两边距离边框距离 需要更新
    }
    .open {
      width: 316px; // 需要更新
      height: 139px; // 需要更新
    }
    .openOne {
      @extend .open;
    }
    .openTen {
      @extend .open;
      margin-left: 38px; // 中间间隔 需要更新
    }
  }
}
</style>
