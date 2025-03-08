<template>
  <OutBox class="FirstDouble" title="title_11.png" bowKnot="true">
    <img :src="IconPath('mk2_3.png')" class="ruleIcon position-absolute" @click="showFirstDoubleRulesPopup = true" />
    <div class="RechargeRebate_TopBox_Title">
      <p class="text-center line-height-100 text-nowrap">天天首充礼·充值任意金额</p>
      <p class="text-center line-height-100 text-nowrap">每日重置，请及时领取</p>
    </div>
    <div class="RechargeRebate_TopBox_Body margin-row-center align-center flex justify-center">
      <div
        v-for="(award, index) in fistDoubleData.awards"
        :key="index"
        class="RechargeRebate_TopBox_Body_Item position-relative flex-column align-center justify-center flex-shrink-0"
      >
        <div class="img-box w-100 flex align-center justify-center position-relative">
          <img
            v-if="award.mark"
            :src="IconPath(award.mark)"
            class="label flex align-center justify-center line-height-100 text-nowrap position-absolute"
          />
          <!-- <div v-if="index == 1" class="bubble position-absolute" @click.stop.self="$emit('changeBubble')">
            <div v-if="fistDoubleData.showBubble" class="bubbleMain position-absolute flex-column align-center justify-between line-height-100">
              <p class="w-100 line-height-100 text-nowrap">限时加赠，用</p>
              <p class="w-100 line-height-100 text-nowrap">于符石寻宝</p>
            </div>
          </div> -->
          <img :src="IconPath(award.icon)" />
        </div>
        <div class="img-bottom text-nowrap flex-1 w-100 line-height-100 flex align-center justify-center">
          {{ award.show_text }}
        </div>
      </div>
    </div>
    <div
      :class="awardButtonClassMap[hasRight]"
      class="RechargeRebate_TopBox_Button margin-row-center flex align-center justify-center line-height-100"
      @click="getRechargeGift"
    >
      {{ awardButtonTextMap[hasRight] }}
    </div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <div class="article-title">首充重置</div>
      <p>1.活动开始后重置<span class="speical_color">安卓、IOS、代充</span>所有额度首充</p>
      <p>2.活动期间<span class="speical_color">648及以下额度</span>首充双倍福利每日重置</p>
      <button class="article-button flex_across" @click="$emit('recharge')"></button>
    </div>
    <FirstDoubleRulesPopup v-if="showFirstDoubleRulesPopup" @clickClose="showFirstDoubleRulesPopup = false" />
    <FirstDoubleAwardPopup
      v-if="showFirstDoubleAwardPopup"
      :first-double-award-popup-data="firstDoubleAwardPopupData"
      @clickClose="showFirstDoubleAwardPopup = false"
    />
  </OutBox>
</template>

<script>
import { _throttle } from '@/pages/crazyEgg/utils/tool'
import { getPageData } from '@/pages/crazyEgg/api/index.js'
const FirstDoubleAwardPopup = () => import('./fistDoubleAwardPopup.vue') // 奖励弹框
const FirstDoubleRulesPopup = () => import('./firstDoubleRulesPopup.vue') // 规则弹框

export default {
  name: 'FirstDouble',
  props: ['fistDoubleData'],
  data() {
    return {
      awardButtonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '今日已领取', 3: '已领取' }),
      awardButtonClassMap: Object.freeze({ 0: 'button-noFinish', 1: 'button-receive', 2: 'button-finish', 3: 'button-finish' }),
      showFirstDoubleRulesPopup: false, // 首充翻倍规则弹窗
      showFirstDoubleAwardPopup: false, // 首充翻倍领取奖励弹窗
      firstDoubleAwardPopupData: [
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 10, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'X10.png' },
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20' },
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'tk_13.png' }
      ] // 首充翻倍领取奖励弹窗配置
    }
  },
  components: { FirstDoubleRulesPopup, FirstDoubleAwardPopup },
  computed: {
    hasRight() {
      if (this.fistDoubleData.is_last_day && this.fistDoubleData.has_right == 2) return 3
      return this.fistDoubleData.has_right // 0: 去完成, 1: 领取, 2: 今日已领取, 3: 已领取
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
  height: 910px;
  margin-top: 54px;
  padding-top: 104px;
  .RechargeRebate_TopBox_Title {
    color: #ffffff;
    p:nth-child(1) {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 17px;
    }
    p:nth-child(2) {
      font-size: 28px;
      margin-bottom: 35px;
    }
  }
  .ruleIcon {
    top: 118px;
    right: 47px;
    width: 58px;
    height: 58px;
  }
  .RechargeRebate_TopBox_Body {
    width: 664px;
    //height: 248px;
    padding: 0 17px;
    .RechargeRebate_TopBox_Body_Item {
      width: 168px;
      height: 168px;
      padding: 4px;
      background-color: #c86325;
      border-radius: 16px;
      .img-box {
        height: 112px;
        background-color: #fffbdd;
        border-radius: 12px 12px 0 0;
        .label {
          z-index: 1;
          top: -4px;
          right: -4px;
          height: 32px;
          background-image: linear-gradient(90deg, #f2ab73, #ec896a);
          border-radius: 0 16px 0 14px;
          //padding: 0 10px;
          //font-weight: 500;
          font-size: 20px;
          color: #ffffff;
        }
        .bubble {
          z-index: 2;
          top: -4px;
          right: -4px;
          width: 32px;
          height: 32px;
          background: url('@/pages/crazyEgg/assets/mk4_6.png') no-repeat left top/100% 100%;
          .bubbleMain {
            top: -86px;
            right: -20px;
            width: 170px;
            height: 86px;
            background: url('@/pages/crazyEgg/assets/mk2_10.png') no-repeat left top/100% 100%;
            padding: 14px 0 21px 0;
            font-size: 24px;
            color: #6e3628;
            p {
              width: 141px;
            }
          }
        }
        > img {
          height: 100%;
        }
      }
      .img-bottom {
        background: #f2ab73;
        border-radius: 0 0 12px 12px;
        font-size: 25px;
        color: #fff;
      }
      .tip {
        bottom: -40px;
        font-size: 26px;
        color: #cb6d95;
      }
      &:nth-child(2) {
        margin: 0 40px;
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin-top: 34px;
    margin-bottom: 34px;
    width: 286px;
    height: 78px;
    border-radius: 39px;
    border: 2px solid #fff;
    color: #fff;
  }
  .button-noFinish {
    background-image: linear-gradient(0deg, #e07336, #fff68f);
  }
  .button-receive {
    background-image: linear-gradient(0deg, #34a38f, #9adbb9);
  }
  .button-finish {
    background-image: linear-gradient(0deg, #8a8a8a, #d4d4d4);
  }
  .RechargeRebate_TopBox_Article {
    width: 660px;
    height: 320px;
    padding: 0 34px;
    margin: 27px auto 0;
    overflow: hidden;
    background: url('@/pages/crazyEgg/assets/bg_7.png') no-repeat left top/100% 100%;

    .article-title {
      text-align: center;
      margin: 8px 0 40px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;

      span {
        display: inline-block;
        width: 60px;
        height: 4px;
        background: #ffffff;
        border-radius: 2px;
        position: relative;
        top: -10px;
      }
    }

    p {
      font-size: 28px;
      color: #fff;
      line-height: 50px;
      white-space: nowrap;

      .speical_color {
        color: #fffaa6 !important;
      }
    }

    // 充值礼包立即充值按钮
    .article-button {
      margin: 30px auto 0;
      width: 284px;
      height: 79px;
      background: url('@/pages/crazyEgg/assets/btn_cz.png') no-repeat left top/100% auto;
    }
  }
}
</style>
