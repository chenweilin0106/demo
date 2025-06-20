<template>
  <OutBox class="lotteryMap" title="mk1_title_4.png">
    <!--长条展示-->
    <div class="list flex-column">
      <div v-for="(item, index) in list" :key="index" class="gift flex position-relative">
        <div class="icon position-relative flex-column align-center">
          <img class="giftIcon block" :src="IconPath(item.icon)" />
          <div class="giftText">{{ item.text }}</div>
        </div>
        <div class="text">
          <div class="desc line-height-1">每日抽100个玩家赠送</div>
          <div class="tip line-height-1">今日充值金额满50元即可报名</div>
        </div>
        <PublicButton :hasRight="configLotteryMap.id_add ? 2 : 1" class="button" @click="register">{{ configLotteryMap.id_add ? '今日已报名' : '报名' }}</PublicButton>
        <div class="info position-absolute flex justify-between align-center line-height-1"><i>报名仅限当天有效</i><i>已有{{ configLotteryMap.num }}人报名</i></div>
      </div>
    </div>
    <RechargePopup v-if="isShowRechargePopup" @clickClose="isShowRechargePopup = false" @recharge="$emit('recharge')" />
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import RechargePopup from './components/rechargePopup.vue'

export default {
  name: 'lotteryMap',
  props: ['configLotteryMap'],
  components: { RechargePopup },
  data() {
    return {
      isShowRechargePopup: false,
      list: Object.freeze([{ icon: 'cbt_120_120.png', text: '+10' }])
    }
  },
  methods: {
    async register() {
      if (this.configLotteryMap.day_recharge_amount < 50) return (this.isShowRechargePopup = true)
      const res = await getPageData({ type: 'recharge_other_sign_up' })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('updateLotteryMap')
    }
  }
}
</script>

<style lang="scss" scoped>
.lotteryMap {
  width: 742px; /*todo 宽度 去看图片原始宽度，不要看蓝湖*/
  height: 402px; /*todo 高度*/
  border-image-slice: 0 0 0 0 fill;
  border-image-width: 0 0 0 0;
  border-image-source: url('@/pages/springFestival/assets/mk2_13.png'); /*todo 连续充值有礼背景*/
  padding-top: 92px;
  padding-bottom: 0;
  // 长条展示 2024 springFestival
  .tip {
    margin-bottom: 36px;
    font-weight: 500;
    font-size: 28px;
    color: #A94214;
  }
  .list {
    .gift {
      width: 585px;
      height: 141px;
      background: linear-gradient(90deg, #B76AFF, #937CF9, #93AAFF);
      box-shadow: inset 0 0 20px 6px #fff;
      border: 2px solid rgba(255,255,255,0.4);
      border-radius: 0 68px 68px 0;
      -webkit-background-clip: padding-box;
      margin-left: 127px;
      //overflow: hidden;
      .icon {
        margin-top: -17px;
        margin-left: -98px;
        position: relative;
        width: 173px;
        height: 169px;
        //background: linear-gradient(180deg, #FFF3BD, #FFFFFF);
        //border-radius: 50%;
        //border: 4px solid #FFC05C;
        background: url('@/pages/springFestival/assets/mk2_12.png') no-repeat left top/100% 100%;
        //overflow: hidden;
        .giftIcon {
          margin: 10px 0 0 14px;
          width: auto;
          height: 120px;
          //height: 135px;
        }
        .giftText {
          margin-top: -7px;
          font-weight: 800;
          font-size: 22px;
          color: #FFFFFF;
        }
      }
      .text {
        //margin-left: 37px - 4;
        //.giftName {
        //  margin-top: 22px;
        //  margin-bottom: 18px - 4;
        //  font-weight: bold;
        //  font-size: 30px;
        //  color: #FFFFFF;
        //  .new {
        //    margin-left: 6px;
        //    width: 56px;
        //    height: 32px;
        //  }
        //}
        .desc {
          margin-top: 30px;
          font-weight: 500;
          font-size: 30px;
          color: #FFFFFF;
        }
        .tip {
          margin-top: 23px;
          font-weight: 500;
          font-size: 24px;
          color: #FFEF85;
        }
      }
      .button {
        margin: 43px 19px 0 auto;
        width: 156px;
        height: 52px;
        font-size: 26px;
        &.button-finish {
          pointer-events: none;
        }
      }
      .info {
        left: 36px;
        bottom: -11px;
        transform: translateY(100%);
        width: 522px;
        >i {
          font-weight: bold;
          font-size: 22px;
          color: #937EFF;
        }
      }
    }
  }
}
</style>
