<template>
  <OutBox class="FirstDouble" title="title_2.png">
    <img :src="IconPath('mk2_3.png')" class="ruleIcon position-absolute" @click="showFirstDoubleRulesPopup = true" />
    <div class="RechargeRebate_TopBox_Title">
      <p class="text-center line-height-100 text-nowrap">天天首充礼·充值任意金额</p>
      <p class="text-center line-height-100 text-nowrap">每日重置，请及时领取</p>
    </div>
    <div class="RechargeRebate_TopBox_Body margin-row-center align-center flex justify-between">
      <div
        v-for="(award, index) in fistDoubleData.awards"
        :key="index"
        class="RechargeRebate_TopBox_Body_Item position-relative flex-column align-center flex-shrink-0"
      >
        <div class="img-box flex justify-center position-relative">
          <img v-if="award.mark" :src="IconPath(award.mark)" class="label position-absolute" />
          <!--<div v-if="index == 1" class="bubble position-absolute" @click.stop.self="$emit('changeBubble')">-->
          <!--  <div v-if="fistDoubleData.showBubble" class="bubbleMain position-absolute flex-column justify-between line-height-100">-->
          <!--    <p class="text-nowrap line-height-100">限时加赠，用</p>-->
          <!--    <p class="text-nowrap line-height-100">于符石寻宝</p>-->
          <!--  </div>-->
          <!--</div>-->
          <img :src="IconPath(award.icon)" />
        </div>
        <div class="img-bottom line-height-100 flex align-center justify-center">
          {{ award.show_text }}
        </div>
      </div>
      <!--<img :src="IconPath(buttonIconMap[hasRight])" class="RechargeRebate_TopBox_Button flex-shrink-0" @click="getRechargeGift" />-->
    </div>
    <PublicButton class="RechargeRebate_TopBox_Button" :has-right="fistDoubleData.has_right" @click="getRechargeGift">{{
      buttonTextMap[hasRight]
    }}</PublicButton>
    <!--<img :src="IconPath(buttonIconMap[hasRight])" class="RechargeRebate_TopBox_Button flex-shrink-0"  />-->
    <div class="RechargeRebate_TopBox_Article margin-row-center position-relative">
      <p class="text-nowrap margin-row-center line-height-100 width-fit">
        1.活动开始后重置<span class="focus-color">安卓、iOS和代充</span>所有额度首充
      </p>
      <p class="text-nowrap margin-row-center line-height-100 width-fit">
        2.活动期间<span class="focus-color">648及以下额度</span>首充双倍福利每日重置
      </p>
      <PublicButton :has-right="0" class="immediatelyRecharge margin-row-center" @click="recharge(hiddenFn)"> 立即充值 </PublicButton>
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
import PublicButton from '@/pages/childrenDay/components/publicButton.vue'
import { _throttle } from '@/pages/childrenDay/utils/tool' // 节流
import { getPageData } from '@/pages/childrenDay/api/index.js'
import { recharge } from '@/pages/childrenDay/utils/toApp.js' // 跳转APP充值界面
const FirstDoubleAwardPopup = () => import('./fistDoubleAwardPopup.vue') // 奖励弹框
const FirstDoubleRulesPopup = () => import('./firstDoubleRulesPopup.vue') // 规则弹框

export default {
  name: 'FirstDouble',
  components: { FirstDoubleRulesPopup, FirstDoubleAwardPopup, PublicButton },
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
      buttonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '已领取，明日再来', 3: '已领取' }), // 按钮文字映射 0: 去完成, 1: 领取, 2: 今日已领取 3: 已领取
      buttonIconMap: Object.freeze({ 0: 'btn_4.png', 1: 'btn_4_1.png', 2: 'btn_4_2.png', 3: 'btn_4_2_1.png' }), // 按钮样式映射 0: 去完成, 1: 领取, 2: 今日已领取 3: 已领取
      showFirstDoubleRulesPopup: false, // 首充翻倍规则弹窗
      showFirstDoubleAwardPopup: false, // 首充翻倍领取奖励弹窗
      firstDoubleAwardPopupData: [
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', double_nums: '5', mark: 'X50.png', nums: 20, show_text: '绿晶石+20', text: '+20' },
        // { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', nums: 20, show_text: '绿晶石+20', text: '+20' },
        // { type: 'car', tool_id: 2, icon: 'ljs_120_120.png', nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'tk_13.png' }
      ] // 首充翻倍领取奖励弹窗配置
    }
  },
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
  height: 900px;
  padding-top: 68px;
  .RechargeRebate_TopBox_Title {
    .focus-color {
      color: #4f85ff !important;
    }
    p:nth-child(1) {
      font-weight: bold;
      font-size: 36px;
      color: #ffffff;
      margin-bottom: 20px;
    }
    p:nth-child(2) {
      font-size: 32px;
      color: #ffffff;
      margin-bottom: 30px;
    }
  }
  .ruleIcon {
    top: 61px;
    right: 22px;
    width: 58px;
    height: 58px;
  }
  .RechargeRebate_TopBox_Body {
    width: 100%;
    height: 208px;
    padding: 0 20px;
    .RechargeRebate_TopBox_Body_Item {
      width: 208px;
      height: 208px;
      background: url('@/pages/childrenDay/assets/mk2_1.png') no-repeat left top/100% 100%;
      .img-box {
        width: 100%;
        height: 152px;
        padding-top: 20px;
        .label {
          z-index: 1;
          top: 4px;
          right: 4px;
          width: auto;
          height: 32px;
        }
        > img {
          height: 100%;
        }
        //.bubble {
        //  top: 0;
        //  right: 0;
        //  width: 32px;
        //  height: 32px;
        //  background: url('@/pages/childrenDay/assets/mk2_19.png') no-repeat left top/100% 100%;
        //  .bubbleMain {
        //    top: -86px;
        //    right: -20px;
        //    width: 170px;
        //    height: 86px;
        //    font-size: 24px;
        //    color: #4a50d1;
        //    background: url('@/pages/childrenDay/assets/mk2_2.png') no-repeat left top/100% 100%;
        //    padding: 14px 14px 21px;
        //  }
        //}
      }
      .img-bottom {
        width: 192px;
        height: 48px;
        background: #5f96ea;
        border-radius: 0 0 12px 12px;
        font-size: 28px;
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
  // 去完成按钮（圆形-2024五一活动）
  //.RechargeRebate_TopBox_Button {
  //  width: 144px;
  //  height: 152px;
  //}
  // 去完成按钮（圆角矩形-2024六一活动）
  ::v-deep .RechargeRebate_TopBox_Button {
    margin: 43px auto 4px;
    min-width: 245px;
    width: fit-content;
    padding: 0 15px;
    height: 76px;
    font-size: 32px;
    &.button-receive {
      background-image: url('@/pages/childrenDay/assets/btn_6.png');
    }
    &.button-noFinish {
      background-image: url('@/pages/childrenDay/assets/btn_4.png');
    }
    &.button-finish {
      background-image: url('@/pages/childrenDay/assets/btn_5.png');
    }
  }
  .RechargeRebate_TopBox_Article {
    padding: 110px 0 0;
    width: 664px;
    height: 344px;
    background: url('@/pages/childrenDay/assets/mk2_6.png') no-repeat left top/100% 100%;
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
      width: 245px;
      height: 76px;
      font-size: 32px;
      &.button-noFinish {
        background-image: url('@/pages/childrenDay/assets/btn_4.png');
      }
    }
  }
}
</style>
