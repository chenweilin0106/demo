<template>
  <out-box class="FirstDouble" title="title_2.png" bowKnot="true">
    <img :src="IconPath('mk2_2.png')" class="ruleIcon position-absolute" @click="showFirstDoubleRulesPopup = true" />
    <div class="RechargeRebate_TopBox_Title">
      <p class="text-center">每日充值<span class="focus-color">任意金额</span>即可领取超值礼包</p>
      <p class="text-center">礼包每日重置，当天奖励需当天领取</p>
    </div>
    <div class="RechargeRebate_TopBox_Body flex justify-center">
      <div
        v-for="(award, index) in fistDoubleData.awards"
        :key="index"
        class="RechargeRebate_TopBox_Body_Item position-relative flex-column"
        :class="index == 0 ? 'goldTheme' : 'pinkTheme'"
      >
        <template v-if="index == 0">
          <div v-if="hasRight == 2" class="label position-absolute flex align-center justify-center line-height-100">{{ award.double_nums }}倍</div>
          <img v-else :src="IconPath('mk2_3.png')" class="label position-absolute" />
        </template>
        <img v-else-if="index == 1" :src="IconPath('mk2_4.png')" class="label position-absolute" />
        <div class="img-box flex align-center justify-center">
          <img v-if="award.icon" :src="IconPath(award.icon)" />
        </div>
        <div class="img-bottom flex align-center justify-center">
          {{ award.show_text }}
        </div>
        <div v-if="hasRight != 2" class="tip position-absolute position-row-center text-nowrap">
          {{ index == 0 ? '最高可得1000' : '仅首次附赠' }}
        </div>
      </div>
    </div>
    <div
      class="RechargeRebate_TopBox_Button flex align-center justify-center margin-row-center"
      :class="buttonStyleMap[hasRight]"
      @click="getRechargeGift"
    >
      {{ buttonTextMap[hasRight] }}
    </div>
    <div class="RechargeRebate_TopBox_Article margin-row-center position-relative">
      <div class="article-title flex align-center justify-center"><span></span>&ensp;首充重置&ensp;<span></span></div>
      <p class="text-nowrap">1.活动开始后重置<span class="focus-color">安卓、IOS、代充</span>所有额度首充</p>
      <p class="text-nowrap">2.活动期间<span class="focus-color">所有额度</span>首充双倍福利每日重置</p>
      <button class="immediatelyRecharge flex align-center justify-center position-relative margin-row-center" @click="recharge(hiddenFn)">
        立即充值
      </button>
    </div>
    <FirstDoubleRulesPopup v-if="showFirstDoubleRulesPopup" @close="showFirstDoubleRulesPopup = false" />
    <FirstDoubleAwardPopup
      v-if="showFirstDoubleAwardPopup"
      :first-double-award-popup-data="firstDoubleAwardPopupData"
      @close="showFirstDoubleAwardPopup = false"
    />
  </out-box>
</template>

<script>
import { _throttle } from '@/pages/gardenParty/utils/tool'
import { getPageData } from '@/pages/gardenParty/api/index.js'
import { recharge } from '@/pages/gardenParty/utils/toApp.js' // 跳转APP充值界面
import FirstDoubleAwardPopup from './FistDoubleAwardPopup.vue' // 奖励弹框
import FirstDoubleRulesPopup from './FirstDoubleRulesPopup.vue' // 规则弹框

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
  data() {
    return {
      buttonStyleMap: Object.freeze({ 0: 'buttonStyle-1', 1: 'buttonStyle-2', 2: 'buttonStyle-3' }), // 按钮样式映射
      buttonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '今日已领取' }), // 按钮文本映射
      showFirstDoubleRulesPopup: false, // 首充翻倍规则弹窗
      showFirstDoubleAwardPopup: false, // 首充翻倍领取奖励弹窗
      firstDoubleAwardPopupData: [] // 首充翻倍领取奖励弹窗配置
    }
  },
  components: { FirstDoubleRulesPopup, FirstDoubleAwardPopup },
  computed: {
    hasRight() {
      return this.fistDoubleData.has_right // 0: 去完成, 1: 领取, 2: 今日已领取
    }
  },
  methods: {
    // 领取充值礼包
    getRechargeGift: _throttle(async function () {
      if (this.hasRight == 2) return
      if (this.hasRight == 0) {
        this.recharge(this.hiddenFn)
      } else if (this.hasRight == 1) {
        const res = await getPageData({ type: 'recharge_single_reward' })
        if (res.errno) return this.$toast(res.errmsg)
        if (!res.errno) this.$emit('updateFirstDoubleData', res.data.data)
        this.firstDoubleAwardPopupData = res.data.data
        this.showFirstDoubleAwardPopup = true
      }
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

<style scoped lang="scss">
.FirstDouble {
  height: 920px;
  margin-top: 58px;
  padding-top: 93px;
  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #96526f;
    .focus-color {
      color: #4f85ff !important;
    }
    p:nth-child(1) {
      margin-bottom: 13px;
    }
    p:nth-child(2) {
      margin-bottom: 27px;
    }
  }
  .ruleIcon {
    top: 57px;
    right: 22px;
    width: 56px;
    height: 56px;
  }
  .RechargeRebate_TopBox_Body {
    .RechargeRebate_TopBox_Body_Item {
      width: 168px;
      height: 168px;
      background-color: #b18aff;
      border-radius: 16px;
      padding: 4px;
      .label {
        z-index: 3;
        top: -28px;
        right: -39px;
        width: 97px;
        height: 78px;
      }
      div.label {
        font-weight: 800;
        font-size: 28px;
        color: #c58236;
        text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
        background: url('@/pages/gardenParty/assets/mk2_8.png') no-repeat top left / 100% 100%;
      }

      .img-box {
        height: 112px;
        background-image: linear-gradient(180deg, #ffd9fd, #ffffff);
        border-radius: 12px 12px 0 0;

        img {
          z-index: 2;
          width: 80%;
        }
      }

      .img-bottom {
        flex: 1;
        width: 100%;
        font-size: 28px;
        background-color: #865ee3;
        color: #f5f5f8;
        border-radius: 0px 0px 12px 12px;
      }
      .tip {
        bottom: -40px;
        font-size: 26px;
        color: #cb6d95;
      }

      &:nth-child(2) {
        margin-left: 68px;
      }
    }
    .goldTheme {
      background-color: #ebc95b;
      .img-box {
        background-image: linear-gradient(180deg, #ffe08e, #ffffff);
      }
      .img-bottom {
        background-color: #d2a436;
      }
    }
    .pinkTheme {
      background-color: #eb98c2;
      .img-box {
        background-image: linear-gradient(180deg, #ffd7ec, #ffffff);
      }
      .img-bottom {
        background-color: #cb6d95;
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin-top: 53px;
    margin-bottom: 21px;
    width: 286px;
    height: 78px;
    border-radius: 39px;
    font-size: 32px;
    color: #ffffff;
    border: 3px solid #fff;
  }
  .buttonStyle-1 {
    background-image: linear-gradient(0deg, #7ec1c0, #d5eb93);
  }
  .buttonStyle-2 {
    background-image: linear-gradient(0deg, #e775a6, #ffb7e6);
  }
  .buttonStyle-3 {
    background-image: linear-gradient(0deg, #9d9d9d, #e7e7e7);
  }
  .RechargeRebate_TopBox_Article {
    padding: 28px 34px 0;
    width: 660px;
    height: 320px;
    background-image: linear-gradient(180deg, #8fa4f4, #b3acfa, #ffbed6);
    border-radius: 30px;
    .article-title {
      margin-bottom: 15px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      span {
        width: 60px;
        height: 4px;
        background: #ffffff;
        border-radius: 2px;
      }
    }
    p {
      font-size: 28px;
      color: #fff;
      line-height: 50px;
      .focus-color {
        color: #fffaa6 !important;
      }
    }
    // 充值礼包立即充值按钮
    .immediatelyRecharge {
      z-index: 2;
      margin-top: 30px;
      width: 286px;
      height: 78px;
      background: linear-gradient(0deg, #fff5b0, #ffffff);
      border-radius: 39px;
      border: 3px solid #ffffff;
      font-size: 32px;
      color: #a9792c;
    }
  }
}
</style>
