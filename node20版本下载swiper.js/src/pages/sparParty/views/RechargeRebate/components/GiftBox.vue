<template>
  <OutBox class="giftBox" title="title_8.png" :hasCostume="true" :class="isLottery && 'pointer-none'">
    <div class="tip width-fit margin-row-center line-height-100">每充值{{ rechargeNum }}元可获得1次开启次数</div>
    <div class="main w-100 h-100">
      <div class="info flex align-center justify-between">
        <div class="residueNum flex align-center justify-center line-height-100 text-nowrap">剩余开启次数：{{ giftBoxData.user_tickets }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100 text-nowrap">充值金额：{{ giftBoxData.user_recharges }}</div>
      </div>
      <img :src="IconPath('mk2_12.png')" class="priceBtn position-absolute" @click="showGiftBoxRulesPopup = true" />
      <div class="buttons flex align-center justify-center">
        <div class="openOne" @click="open(1)">开启1次</div>
        <div class="openTen" @click="open(2)">开启10次</div>
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
import { _throttle } from '@/pages/sparParty/utils/tool'
import { getPageData } from '@/pages/sparParty/api/index'
import LotteryFailPopup from '@/pages/sparParty/popups/lotteryFailPopup.vue' // 抽奖次数不足弹窗
import GiftBoxRulesPopup from '@/pages/sparParty/popups/giftBoxRulesPopup.vue' // 礼盒规则弹窗
import CongratsGetPopup from '@/pages/sparParty/popups/congratsGetPopup.vue' // 恭喜获得弹窗
export default {
  name: 'giftBox',
  props: ['giftBoxData'],
  components: { GiftBoxRulesPopup, CongratsGetPopup, LotteryFailPopup },
  data() {
    return {
      isLottery: false,
      rechargeNum: Object.freeze(10), // 每充值xx元...
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
    })
  }
}
</script>

<style lang="scss" scoped>
.lotteryBox {
  z-index: 1;
  top: -60px;
  width: 550px;
  height: 660px;
  overflow: hidden;
}
.giftBox {
  padding-top: 81px;
  margin-top: 71px; // 距离天天首充礼距离 需要更新
  width: 724px; // 礼盒容器宽度 需要更新
  //height: 702px; // 礼盒容器高度 需要更新
  .tip {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
    color: #fff; // 每充值xx元...字体颜色 需要更新
  }
  .main {
    position: relative;
    margin: 0 auto;
    width: 668px;
    height: 500px;
    background: url('@/pages/sparParty/assets/mk2_11.png') no-repeat left top/100% 100%;
    padding-top: 27px;
    .info {
      padding: 0 29px; // 距离边框两边的距离 需要更新
      margin-bottom: 309px; // 和抽奖按钮之间的距离 需要更新
      .infoCommon {
        width: fit-content;
        height: 59px;
        padding: 0 17px;
        border-image-source: url('@/pages/sparParty/assets/mk2_13.png');
        border-image-slice: 0 30 0 30 fill;
        border-image-width: 0 30px 0 30px;
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
      top: 119px; // 奖池图标top 需要更新
      right: 20px; // 奖池图标right 需要更新
      width: 96px; // 奖池图标宽度 需要更新
      height: 96px; // 奖池图标高度 需要更新
    }
    .buttons {
      padding: 0 61px; // 两边距离边框距离 需要更新
    }
    // 默认高度需要更新
    @mixin open($width, $height: 76px) {
      width: $width;
      height: $height;
      font-size: 32px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 100%;
    }
    .openOne {
      @include open(240px); // 按钮宽 需要更新
      background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left top/100% 100%;
    }
    .openTen {
      @include open(240px); // 按钮宽 需要更新
      margin-left: 68px; // 中间间隔 需要更新
      background: url('@/pages/sparParty/assets/btn_4.png') no-repeat left top/100% 100%;
    }
  }
}
</style>
