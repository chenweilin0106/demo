<template>
  <PublicContainer class="FirstDouble" titleIcon="title_2.png" bowKnot="true">
    <img :src="IconPath('mk2_3.png')" class="ruleIcon position-absolute" @click="showFirstDoubleRulesPopup = true" />
    <div class="RechargeRebate_TopBox_Title">
      <p class="text-center line-height-100 text-nowrap">天天首充礼·充值任意金额</p>
      <p class="text-center line-height-100 text-nowrap">每日重置，请及时领取</p>
    </div>
    <PublicCard class="RechargeRebate_TopBox_Body margin-row-center align-center flex justify-between">
      <div
        v-for="(award, index) in fistDoubleData.awards"
        :key="index"
        class="RechargeRebate_TopBox_Body_Item position-relative flex-column align-center justify-center flex-shrink-0"
      >
        <div class="img-box flex align-center justify-center position-relative">
          <img v-if="award.mark" :src="IconPath(award.mark)" class="label position-absolute" />
          <div v-if="index == 1" class="bubble position-absolute" @click.stop.self="$emit('changeBubble')">
            <div v-if="fistDoubleData.showBubble" class="bubbleMain position-absolute flex-column justify-between line-height-100">
              <p class="text-nowrap line-height-100">限时加赠，用</p>
              <p class="text-nowrap line-height-100">于符石寻宝</p>
            </div>
          </div>
          <img :src="IconPath(award.icon)" />
        </div>
        <div class="img-bottom line-height-100 flex align-center justify-center">
          {{ award.show_text }}
        </div>
      </div>
      <img :src="IconPath(buttonIconMap[hasRight])" class="RechargeRebate_TopBox_Button flex-shrink-0" @click="getRechargeGift" />
    </PublicCard>
    <div class="RechargeRebate_TopBox_Article margin-row-center position-relative">
      <p class="text-nowrap margin-row-center line-height-100 width-fit">
        1.活动开始后重置<span class="focus-color">安卓、iOS和代充</span>所有额度首充
      </p>
      <p class="text-nowrap margin-row-center line-height-100 width-fit">
        2.活动期间<span class="focus-color">648及以下额度</span>首充双倍福利每日重置
      </p>
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
  </PublicContainer>
</template>

<script>
import { _throttle } from '@/pages/mayDay2024/utils/tool' // 节流
import { getPageData } from '@/pages/mayDay2024/api/index.js'
import { recharge } from '@/pages/mayDay2024/utils/toApp.js' // 跳转APP充值界面
import PublicCard from '@/pages/mayDay2024/components/publicCard.vue'
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
  data() {
    return {
      buttonIconMap: Object.freeze({ 0: 'btn_4.png', 1: 'btn_4_1.png', 2: 'btn_4_2.png', 3: 'btn_4_2_1.png' }), // 按钮样式映射 0: 去完成, 1: 领取, 2: 今日已领取 3: 已领取
      showFirstDoubleRulesPopup: false, // 首充翻倍规则弹窗
      showFirstDoubleAwardPopup: false, // 首充翻倍领取奖励弹窗
      firstDoubleAwardPopupData: [
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: 'X50.png', nums: 20, show_text: '绿晶石+20', text: '+20' },
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', nums: 20, show_text: '绿晶石+20', text: '+20' }
      ] // 首充翻倍领取奖励弹窗配置
    }
  },
  components: { PublicCard, FirstDoubleRulesPopup, FirstDoubleAwardPopup },
  computed: {
    hasRight() {
      if (this.fistDoubleData.is_last_day && this.fistDoubleData.has_right == 2) return 3
      return this.fistDoubleData.has_right
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
        if (!res.errno) this.$emit('updateFirstDoubleData')
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
  margin-top: 29px;
  padding-top: 114px;
  .RechargeRebate_TopBox_Title {
    .focus-color {
      color: #4f85ff !important;
    }
    p:nth-child(1) {
      font-weight: bold;
      font-size: 36px;
      color: #4a50d1;
      margin-bottom: 20px;
    }
    p:nth-child(2) {
      font-size: 32px;
      color: #4a50d1;
      margin-bottom: 30px;
    }
  }
  .ruleIcon {
    top: 57px;
    right: 22px;
    width: 58px;
    height: 58px;
  }
  .RechargeRebate_TopBox_Body {
    width: 664px;
    height: 248px;
    padding: 0 17px;
    .RechargeRebate_TopBox_Body_Item {
      width: 140px;
      .img-box {
        width: 140px;
        height: 140px;
        background: url('@/pages/mayDay2024/assets/mk2_2.png') no-repeat left top/100% 100%;
        .label {
          z-index: 1;
          top: 0;
          right: 0;
          width: auto;
          height: 32px;
        }
        > img {
          height: 100%;
        }
        .bubble {
          top: 0;
          right: 0;
          width: 32px;
          height: 32px;
          background: url('@/pages/mayDay2024/assets/mk2_19.png') no-repeat left top/100% 100%;
          .bubbleMain {
            top: -86px;
            right: -20px;
            width: 170px;
            height: 86px;
            font-size: 24px;
            color: #4a50d1;
            background: url('@/pages/mayDay2024/assets/mk2_20.png') no-repeat left top/100% 100%;
            padding: 14px 14px 21px;
          }
        }
      }
      .img-bottom {
        margin-top: 10px;
        max-width: 160px;
        min-width: 140px;
        height: 36px;
        padding: 0 10px;
        background: #bdffff;
        border-radius: 18px;
        font-size: 24px;
        color: #4a50d1;
      }
      .tip {
        bottom: -40px;
        font-size: 26px;
        color: #cb6d95;
      }
      &:nth-child(2) {
        //margin-left: 68px;
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    width: 144px;
    height: 152px;
  }
  .RechargeRebate_TopBox_Article {
    margin-top: 34px;
    padding: 110px 0 0;
    width: 660px;
    height: 340px;
    background: url('@/pages/mayDay2024/assets/mk2_9.png') no-repeat left top/100% 100%;
    p {
      font-size: 28px;
      color: #4a50d1;
      .focus-color {
        color: #ff78d0 !important;
      }
      &:nth-child(1) {
        margin-bottom: 20px;
      }
    }
    // 充值礼包立即充值按钮
    .immediatelyRecharge {
      margin-top: 25px;
      width: 256px;
      height: 83px;
      background: url('@/pages/mayDay2024/assets/btn_5.png') no-repeat left top/100% 100%;
      font-weight: 600;
      font-size: 32px;
      color: #ffffff;
    }
  }
}
</style>
