<template>
  <OutBox class="giftBox" size="2_2" title="title_3.png" :class="isLottery&&'pointer-none'">
    <div class="tip line-height-1 position-absolute position-row-center">每充值{{rechargeNum}}元可获得1次开启{{lotteryText}}</div>
    <div class="giftBg position-absolute position-row-center"></div>
    <div class="residueNum flex align-center line-height-1 position-absolute radius-999">剩余开启{{lotteryText}}：{{config.user_tickets}}</div>
    <div class="rechargeNum flex align-center line-height-1 position-absolute radius-999">充值金额：{{config.user_recharges}}</div>
    <img :src="IconPath('mk2_5.png')" class="rulesBtn position-absolute" @click="showRulesPopup=true" />
    <div class="buttons position-absolute position-row-center flex">
      <PublicButton hasRight="4" @click="open(1)">开启1次</PublicButton>
      <PublicButton class="openTen" hasRight="3" @click="open(2)">开启10次</PublicButton>
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
import { getPageData } from '@/api/index'
import FailPopup from './components/failPopup.vue' // 抽奖次数不足弹窗
import ReceivePopup from './components/receivePopup.vue' // 恭喜获得弹窗
import RulesPopup from './components/rulesPopup.vue'// 礼盒规则弹窗

export default {
  name: 'giftBox',
  props: ['config'],
  components: { RulesPopup, ReceivePopup, FailPopup },
  data() {
    return {
      isLottery: false,
      lotteryText: Object.freeze('次数'),
      rechargeNum: Object.freeze(10), // todo 每充值xx元... 需要更新
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
  top: 120px; /*todo 动画位置*/
  width: 550px;
  height: 660px;
  overflow: hidden;
}
.giftBox {
  .tip {
    top: 79px;
    font-weight: bold;
    font-size: 32px;
    color: #fff; /*todo 每充值30元...字体颜色*/
  }
  .giftBg{
    top: 138px;
    width: 680px;
    height: 550px;
    background: url('@/pages/womenDay/assets/mk2_4.png') no-repeat left top/100% 100%;
  }
  .infoCommon {
    top: 170px;
    padding: 0 17px;
    height: 48px;
    background: linear-gradient(90deg, #5E2D0A, #8B2F23); /*todo 剩余开启次数，充值金额背景颜色*/
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
    top: 248px; /*todo*/
    right: 47px; /*todo*/
    width: 96px; /*todo*/
  }
  .buttons {
    bottom: 137px;
  }
  .openTen {
    margin-left: 45px; /*todo 中间间隔*/
  }
}
</style>
