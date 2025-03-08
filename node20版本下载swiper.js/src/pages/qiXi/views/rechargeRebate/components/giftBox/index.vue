<template>
  <OutBox class="giftBox" title="title_3.png" hasCostume :class="isLottery && 'pointer-none'" :bottomGap="false">
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
import { _throttle } from '@//utils/tool'
import { getPageData } from '@/api/index'
const LotteryFailPopup = () => import('./popups/lotteryFailPopup.vue') // 抽奖次数不足弹窗
const CongratsGetPopup = () => import('@/pages/qiXi/components/congratsGetPopup.vue') // 恭喜获得弹窗
const GiftBoxRulesPopup = () => import('./popups/giftBoxRulesPopup.vue') // 礼盒规则弹窗
export default {
  name: 'giftBox',
  props: ['giftBoxData'],
  components: { GiftBoxRulesPopup, CongratsGetPopup, LotteryFailPopup },
  data() {
    return {
      isLottery: false,
      rechargeNum: Object.freeze(30), // todo 每充值xx元... 需要更新
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
  top: 200px; /*todo 动画位置*/
  width: 550px;
  height: 660px;
  overflow: hidden;
}
.giftBox {
  padding-top: 111px; /*todo 每充值30元...顶部距离*/
  margin-top: 85px; /*todo 距离天天首充礼距离*/
  width: 723px; /*todo 礼盒容器宽度*/
  height: 1068px; /*todo 礼盒容器高度*/
  border-image-source: none;
  background: url('@/pages/qiXi/assets/mk2_12.png') no-repeat left top/100% 100%; /*todo 礼盒容器背景*/
  .tip {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 28px;
    color: #9FF9FF; /*todo 每充值30元...字体颜色*/
  }
  .main {
    //width: 660px;
    //height: 500px;
    //background: url('@/pages/qiXi/assets/mk2_12.png') no-repeat left top/100% 100%;
    //padding-top: 27px;
    .info {
      padding: 0 10px 0 9px; /*todo 距离边框两边的距离*/
      margin-bottom: 627px; /*todo 和抽奖按钮之间的距离*/
      .infoCommon {
        padding: 0 17px;
        width: fit-content;
        height: 48px;
        background: #101F84; /*todo 剩余开启次数，充值金额背景颜色*/
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
      top: 225px; /*todo 奖池图标top*/
      right: 32px; /*todo 奖池图标right*/
      width: 86px; /*todo 奖池图标宽度*/
      height: 86px; /*todo 奖池图标高度*/
    }
    .buttons {
      padding: 0 35px; /*todo 两边距离边框距离*/
    }
    @mixin open($width: 319px, $height: 138px) { /*todo 默认高度需要更新*/
      width: $width;
      height: $height;
    }
    .openOne {
      @include open; /*todo 抽1次 按钮宽*/
    }
    .openTen {
      @include open; /*todo 抽10次 按钮宽*/
      margin-left: 14px; /*todo 中间间隔*/
    }
  }
}
</style>
