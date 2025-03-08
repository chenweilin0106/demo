<template>
  <OutBox class="FirstDouble" title="title_2.png" bowKnot="true">
    <img :src="IconPath('mk2_2.png')" class="ruleIcon position-absolute" @click="showFirstDoubleRulesPopup = true" />
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
          <img v-if="award.mark" :src="IconPath(award.mark)" class="label position-absolute" />
          <div v-if="index == 1" class="bubble position-absolute" @click.stop.self="$emit('changeBubble')">
            <div v-if="fistDoubleData.showBubble" class="bubbleMain position-absolute flex align-center justify-center line-height-100"></div>
          </div>
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
    <div class="RechargeRebate_TopBox_Article margin-row-center position-relative">
      <div class="articleTitle flex justify-center align-center line-height-100">
        <div class="line-icon"></div>
        <span>首充重置</span>
        <div class="line-icon"></div>
      </div>
      <p class="text-nowrap">1.活动开始后重置<span class="focus-color">安卓、iOS和代充</span>所有额度首充</p>
      <p class="text-nowrap">2.活动期间<span class="focus-color">所有额度</span>首充双倍福利每日重置</p>
      <button class="immediatelyRecharge flex align-center justify-center position-relative margin-row-center" @click="$emit('recharge')">
        立即充值
      </button>
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
import buttonMixin from '@/pages/520/mixins/buttonMixin'
import { _throttle } from '@/pages/520/utils/tool'
import { getPageData } from '@/pages/520/api/index.js'
const FirstDoubleAwardPopup = () => import('./fistDoubleAwardPopup.vue') // 奖励弹框
const FirstDoubleRulesPopup = () => import('./firstDoubleRulesPopup.vue') // 规则弹框

export default {
  name: 'FirstDouble',
  props: {
    fistDoubleData: {
      type: Object,
      default: () => {
        return {
          awards: [
            { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20' },
            { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 0, nums: 20, show_text: '绿晶石+20' }
          ],
          condition: 1,
          has_right: 0
        }
      }
    }
  },
  mixins: [buttonMixin],
  data() {
    return {
      awardButtonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '已领取，明日再来', 3: '已领取' }),
      awardButtonClassMap: Object.freeze({ 0: 'button-noFinish', 1: 'button-receive', 2: 'button-finish', 3: 'button-finish' }),
      showFirstDoubleRulesPopup: false, // 首充翻倍规则弹窗
      showFirstDoubleAwardPopup: false, // 首充翻倍领取奖励弹窗
      firstDoubleAwardPopupData: [
        // {
        //   type: 'tool',
        //   tool_id: 2,
        //   icon: 'ljs_120_120.png',
        //   double_nums: 5,
        //   nums: 20,
        //   show_text: '绿晶石+20',
        //   text: '+20',
        //   mark: 'X2.png',
        //   name: '绿晶石'
        // },
        // { type: 'tool', tool_id: 158, icon: 'cbt_120_120.png', nums: 1, show_text: '藏宝图+1', text: '藏宝图+20', mark: '', name: '藏宝图' },
        // { type: 'car', tool_id: 68, icon: 'qwkdc_120_120.png', nums: 1, text: '座驾+1天', mark: 'tk_8.png', name: '趣玩卡丁车】座驾' }
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
  height: 920px;
  margin-top: 100px;
  padding-top: 98px;
  .RechargeRebate_TopBox_Title {
    color: #96526f;
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
    top: 50px;
    right: 42px;
    width: 56px;
    height: 56px;
  }
  .RechargeRebate_TopBox_Body {
    width: 664px;
    //height: 248px;
    padding: 0 17px;
    .RechargeRebate_TopBox_Body_Item {
      width: 168px;
      height: 168px;
      padding: 4px;
      background-color: #ebc95b;
      border-radius: 16px;
      .img-box {
        height: 112px;
        background-image: linear-gradient(180deg, #ffe08e, #ffffff);
        border-radius: 12px 12px 0 0;
        .label {
          top: -19px;
          right: -20px;
          height: 40px;
          width: auto;
        }
        .bubble {
          z-index: 2;
          top: 1px;
          right: 1px;
          width: 32px;
          height: 32px;
          background: url('@/pages/520/assets/mk6_6.png') no-repeat left top/100% 100%;
          .bubbleMain {
            top: -61px;
            right: -53px;
            width: 286px;
            height: 59px;
            background: url('@/pages/520/assets/mk2_13.png') no-repeat left top/100% 100%;
          }
        }
        > img {
          height: 100%;
        }
      }
      .img-bottom {
        background: #cc9833;
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
      &:nth-child(3) {
        background-color: #f598bb;
        .img-box {
          background-image: linear-gradient(180deg, #ffd7ec, #ffffff);
        }
        .img-bottom {
          background-color: #d26388;
        }
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
    font-size: 32px;
    color: #fff;
  }
  .button-noFinish {
    background-image: linear-gradient(0deg, #87a9e7, #a3dffe);
  }
  .button-receive {
    background-image: linear-gradient(0deg, #eb6c99, #ffbcd8);
  }
  .RechargeRebate_TopBox_Article {
    margin-top: 34px;
    padding: 28px 34px 0;
    width: 660px;
    height: 320px;
    background: linear-gradient(0deg, #ffcbb1, #f378a6);
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
      margin-top: 25px;
      width: 286px;
      height: 78px;
      font-size: 32px;
      color: #a9792c;
      border-radius: 39px;
      background-image: linear-gradient(0deg, #fff5b0, #ffffff);
      border: 3px solid #fff;
    }
  }
}
</style>
