<template>
  <OutBox class="FirstDouble" title="title_2.png">
    <img :src="IconPath('mk2_2.png')" class="ruleIcon position-absolute" @click="isShowRulesPopup = true" alt="" />
    <!-- <img :src="IconPath('mk2_31.png')" class="yearCelebrationLabel position-absolute" /> -->
    <div class="RechargeRebate_TopBox_Title line-height-1 text-center">
      <p>天天首充礼·充值任意金额</p>
      <p>每日重置，请及时领取</p>
    </div>
    <div class="RechargeRebate_TopBox_Body margin-row-center align-center flex flex-no-wrap justify-between" :class="single_recharge_status.awards.length == 3 && 'children3'">
      <div
        v-for="(award, index) in single_recharge_status.awards"
        :key="index"
        class="RechargeRebate_TopBox_Body_Item position-relative flex-column align-center justify-center flex-shrink-0"
      >
        <div class="img-box w-100 flex align-center justify-center position-relative">
          <img v-if="award.mark" :src="IconPath(award.mark)" class="label position-absolute" alt="" />
          <!-- <img v-if="award.type == 'mic'" :src="$store.state.user_icon" class="avatar position-absolute" @error="imgAtError" /> -->
          <PublicImg :imgName="award.icon" :imgType="award.type" :class="award.type" />
          <!-- <img :src="IconPath('mk2_32.png')" class="bottomLabel position-absolute" /> -->
        </div>
        <div class="img-bottom text-nowrap flex-1 w-100 line-height-100 flex align-center justify-center">{{ award.show_text }}</div>
      </div>
    </div>
    <div class="RechargeRebate_TopBox_Button" :class="`status${single_recharge_status.has_right}`" @click="getRechargeGift">
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
      <div class="immediatelyRecharge margin-row-center" @click="$emit('recharge')">立即充值</div>
    </div>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="isShowRulesPopup = false" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />
  </OutBox>
</template>

<script>
import { _throttle, imgAtError } from '@/utils/tool'
import { getPageData } from '@/api/'
import ReceivePopup from './popups/receivePopup.vue'
import RulesPopup from './popups/rulesPopup.vue'

export default {
  name: 'FirstDouble',
  props: ['single_recharge_status', 'is_last_day'],
  data() {
    return {
      awardButtonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '已领取，明日再来', 3: '已领取' }),
      isShowRulesPopup: false, // 首充翻倍规则弹窗
      isShowReceivePopup: false, // 恭喜获得弹框
      configReceivePopup: [
        // { type: 'mic', tool_id: 2, icon: 'ts_8zn_01.png', name: '永久头饰', double_nums: 0, nums: 20, show_text: '永久头饰', text: '永久头饰', mark: '' },
        // { icon: 'ljs_120_120.png', text: '123', double_nums: 2, mark: 'X2.png' },
        // { icon: 'ljs_120_120.png', text: '123', double_nums: 2 },
        // { icon: 'ljs_120_120.png', text: '123', double_nums: 2 }
      ]
    }
  },
  components: { RulesPopup, ReceivePopup },
  computed: {
    hasRight() {
      if (this.is_last_day && this.single_recharge_status.has_right == 2) return 3
      return this.single_recharge_status.has_right // 0: 去完成, 1: 领取, 2: 今日已领取, 3: 已领取
    }
  },
  methods: {
    /**
     * 领取充值礼包
     */
    getRechargeGift: _throttle(async function () {
      if (this.hasRight == 2) return
      if (this.hasRight == 0) {
        this.$emit('recharge')
      } else if (this.hasRight == 1) {
        const res = await getPageData({ type: 'recharge_single_reward' })
        if (res.errno) return this.$toast(res.errmsg)
        if (!res.errno) this.$emit('updateFirstDoubleData', res.data.data)
        this.configReceivePopup = res.data.data
        this.isShowReceivePopup = true
      }
    }),
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.FirstDouble {
  padding-top: 120px !important;
  .RechargeRebate_TopBox_Title {
    color: #9B4E28;
    p:nth-child(1) {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 17px;
    }
    p:nth-child(2) {
      font-size: 28px;
      margin-bottom: 42px;
    }
  }
  .ruleIcon {
    top: 67px;
    right: 47px;
    width: 56px;
    height: auto;
  }
  //.yearCelebrationLabel {
  //  z-index: 2;
  //  top: -57px;
  //  right: 100px;
  //  width: 167px;
  //  height: 159px;
  //}
  .RechargeRebate_TopBox_Body {
    padding: 0 48px 0 48px;
     &.children3 {
       padding: 0 108px 0 117px;
     }
    .RechargeRebate_TopBox_Body_Item {
      width: 148px;
      height: 168px;
      padding: 4px;
      background-color: #E9CC7B;
      border-radius: 16px;
      .img-box {
        height: 112px;
        background: linear-gradient(180deg, #FFFCDA, #FFFFFF);
        border-radius: 12px 12px 0 0;
        .avatar {
          width: 113px * 0.7;
          height: 113px * 0.7;
          object-fit: cover;
          border-radius: 50%;
        }
        .label {
          z-index: 1;
          top: 0;
          transform: translateY(-50%);
          right: -10px;
          height: 40px;
          width: auto;
        }
        //.bottomLabel {
        // right: -20px;
        // bottom: -8px;
        // width: 77px;
        // height: 36px;
        //}
        > img {
          height: 100%;
        }
        .mic {
          width: 112px;
        }
      }
      .img-bottom {
        background: #6D6DC3;
        border-radius: 0 0 12px 12px;
        font-size: 24px;
        color: #fff;
      }
      //&:nth-child(2) {
      //  margin: 0 33px;
      //}
      // 随机奖励
      &:last-child {
        background-color: #EA5927;
        .img-box {
          background: linear-gradient(180deg, #FCF2C3, #FFFFFF);
        }
        .img-bottom {
          background-color: #D54E34;
          font-size: 23px;
        }
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 18px auto 22px;
    width: 304px;
    height: 93px;
    font-size: 32px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    font-weight: normal;
    &.status0 {
      color: #FFFFFF;
      background: url('@/pages/womenDay/assets/mk2_17.png') no-repeat left top/100% 100%;
    }
    &.status1 {
      color: #FFFFFF;
      background: url('@/pages/womenDay/assets/mk2_18.png') no-repeat left top/100% 100%;
    }
    &.status2 {
      color: #FFFFFF;
      font-size: 29px;
      background: url('@/pages/womenDay/assets/mk2_19.png') no-repeat left top/100% 100%;
    }
    &.status3 {
      color: #FFFFFF;
      background: url('@/pages/womenDay/assets/mk2_19.png') no-repeat left top/100% 100%;
    }
  }
  .RechargeRebate_TopBox_Article {
    margin: 0 auto;
    padding: 28px 34px 0;
    width: 660px;
    height: 320px;
    background: linear-gradient(0deg, #FFAC7F, #D65F53);
    border-radius: 30px;
    //box-shadow: inset 0 0 27px 15px rgba(232, 153, 255, 0.5);
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
      font-size: 32px;
      $width: 280px;
      $height: 72px;
      $border: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
      font-weight: normal;
      width: $width + $border * 2;
      height: $height + $border * 2;
      // 渐变
      border: $border solid transparent;
      border-radius: 99999px;
      -webkit-background-clip: padding-box, border-box;
      -webkit-background-origin: padding-box, border-box;
      color: #a9792c;
      background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
    }
  }
}
</style>
