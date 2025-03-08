<template>
  <OutBox class="FirstDouble" title="title_2.png">
    <img :src="IconPath('mk2_2.png')" class="ruleIcon position-absolute" @click="showFirstDoubleRulesPopup = true" />
    <div class="RechargeRebate_TopBox_Title">
      <p class="text-center line-height-100 text-nowrap">天天首充礼·充值任意金额</p>
      <p class="text-center line-height-100 text-nowrap">每日重置，请及时领取</p>
    </div>
    <div class="RechargeRebate_TopBox_Body margin-row-center align-center flex justify-center">
      <div
        v-for="(award, index) in single_recharge_status.awards"
        :key="index"
        class="RechargeRebate_TopBox_Body_Item position-relative flex-column align-center justify-center flex-shrink-0"
      >
        <div class="img-box w-100 flex align-center justify-center position-relative">
          <img v-if="award.mark" :src="IconPath(award.mark)" class="label position-absolute" />
          <img :src="IconPath(award.icon)" />
        </div>
        <div class="img-bottom text-nowrap flex-1 w-100 line-height-100 flex align-center justify-center">{{ award.show_text }}</div>
      </div>
    </div>
    <PublicButton class="RechargeRebate_TopBox_Button margin-row-center" :hasRight="single_recharge_status.has_right" @click="getRechargeGift">
      {{ awardButtonTextMap[hasRight] }}
    </PublicButton>
    <div class="RechargeRebate_TopBox_Article margin-row-center position-relative">
      <div class="articleTitle flex justify-center align-center line-height-100">
        <div class="line-icon"></div>
        <span>首充重置</span>
        <div class="line-icon"></div>
      </div>
      <p class="text-nowrap">1.活动开始后重置<span class="focus-color">安卓、iOS和代充</span>所有额度首充</p>
      <p class="text-nowrap">2.活动期间<span class="focus-color">所有额度</span>首充双倍福利每日重置</p>
      <PublicButton class="immediatelyRecharge margin-row-center" hasRight="1" @click="$emit('recharge')">立即充值</PublicButton>
    </div>
    <FirstDoubleRulesPopup v-if="showFirstDoubleRulesPopup" @clickClose="showFirstDoubleRulesPopup = false" />
    <FirstDoubleAwardPopup v-if="showFirstDoubleAwardPopup" :firstDoubleAwardPopupData="firstDoubleAwardPopupData" @clickClose="showFirstDoubleAwardPopup = false" />
  </OutBox>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api/'
const FirstDoubleAwardPopup = () => import('./popups/fistDoubleAwardPopup.vue')
const FirstDoubleRulesPopup = () => import('./popups/firstDoubleRulesPopup.vue')
export default {
  name: 'FirstDouble',
  props: ['single_recharge_status', 'is_last_day'],
  data() {
    return {
      awardButtonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '已领取，明日再来', 3: '已领取' }),
      awardButtonClassMap: Object.freeze({ 0: 'button-noFinish', 1: 'button-receive', 2: 'button-finish', 3: 'button-finish' }),
      showFirstDoubleRulesPopup: false, // 首充翻倍规则弹窗
      showFirstDoubleAwardPopup: false,
      firstDoubleAwardPopupData: []
    }
  },
  components: { FirstDoubleRulesPopup, FirstDoubleAwardPopup },
  computed: {
    hasRight() {
      if (this.is_last_day && this.single_recharge_status.has_right == 2) return 3
      return this.single_recharge_status.has_right // 0: 去完成, 1: 领取, 2: 今日已领取, 3: 已领取
    }
  },
  methods: {
    // 领取充值礼包
    getRechargeGift: _throttle(async function () {
      if (this.hasRight == 2) return
      if (this.hasRight == 0) {
        this.$emit('recharge')
      } else if (this.hasRight == 1) {
        const res = await getPageData({ type: 'recharge_single_reward' })
        if (res.errno) return this.$toast(res.errmsg)
        if (!res.errno) this.$emit('updateFirstDoubleData', res.data.data)
        this.firstDoubleAwardPopupData = res.data.data
        this.showFirstDoubleAwardPopup = true
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.FirstDouble {
  margin-bottom: 27px;
  .RechargeRebate_TopBox_Title {
    color: #AA4213; /*todo 一行文本字体颜色*/
    p:nth-child(1) {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 17px;
    }
    p:nth-child(2) {
      font-size: 28px;
      margin-bottom: 37px;
    }
  }
  .ruleIcon {
    top: -33px; /*todo 规则图标距离顶部距离*/
    right: 98px; /*todo 规则图标距离右侧距离*/
    width: 56px; /*todo 规则图标宽度*/
    height: 56px; /*todo 规则图标高度*/
  }
  .RechargeRebate_TopBox_Body {
    .RechargeRebate_TopBox_Body_Item {
      width: 168px;
      height: 168px;
      padding: 4px;
      background-color: #F59446; /*todo 奖励边框颜色*/
      border-radius: 16px;
      .img-box {
        height: 112px;
        background: linear-gradient(180deg, #FCF2C3, #FFFFFF); /*todo 奖励图标背景色*/
        border-radius: 12px 12px 0 0;
        .label {
          top: -19px;
          right: -20px;
          height: 40px;
          width: auto;
        }
        > img {
          height: 100%;
        }
      }
      .img-bottom {
        background: #E76C1A; /*todo 奖励文字背景色*/
        border-radius: 0 0 12px 12px;
        font-size: 25px;
        color: #fff;
      }
      &:nth-child(2) {
        margin: 0 33px; /*todo 中间奖励距离两边间距*/
      }
      // 随机奖励
      &:nth-child(3) {
        background-color: #EA5927; /*todo 随机奖励边框颜色*/
        .img-box {
          background: linear-gradient(180deg, #FCF2C3, #FFFFFF); /*todo 随机奖励图标背景色*/
        }
        .img-bottom {
          background-color: #D54E34; /*todo 随机奖励文字背景色*/
        }
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin-top: 32px; /*todo 按钮距离奖励列表的间距*/
    margin-bottom: 41px; /*todo 按钮距离首充充值文本的间距*/
    width: 276px;
    height: 68px;
    font-size: 32px;
    &.button-noFinish {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: linear-gradient(0deg, #FCA51B, #FFE775);
    }
    &.button-receive {
      color: #fff; /*todo 未完成状态按钮字体颜色*/
      background: linear-gradient(0deg, #E95533, #FFC74E); /*todo 未完成状态按钮背景色*/
    }
  }
  .RechargeRebate_TopBox_Article {
    padding: 28px 34px 0;
    width: 660px;
    height: 320px;
    background: linear-gradient(180deg, #FBB740, #F97F29); /*todo 首充充值文本背景 图片或者手写渐变*/
    border-radius: 30px;
    .articleTitle {
      position: relative;
      margin: 0 auto 20px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      span {
        margin: 0 9px;
      }
      .line-icon {
        width: 60px;
        height: 4px;
        background: #ffffff;
        border-radius: 2px;
      }
    }
    p {
      font-size: 28px;
      color: #ffffff;
      line-height: 50px;
      .focus-color {
        color: #ffef85 !important;
      }
    }
    // 充值礼包立即充值按钮
    .immediatelyRecharge {
      margin-top: 30px;
      width: 280px;
      height: 72px;
      font-size: 32px;
    }
  }
}
</style>
