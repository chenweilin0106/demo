<template>
  <OutBox class="firstDouble" title="title_2.png">
    <img :src="IconPath('mk2_2.png')" class="ruleIcon position-absolute" @click="showRulesPopup=true" />
    <div class="RechargeRebate_TopBox_Title">
      <p class="text-center line-height-1 text-nowrap">天天首充礼·充值任意金额</p>
      <p class="text-center line-height-1 text-nowrap">每日重置，请及时领取</p>
    </div>
    <div class="RechargeRebate_TopBox_Body margin-row-center align-center flex flex-no-wrap justify-between" :class="single_recharge_status.awards.length==3&&'children3'">
      <div v-for="(award,index) in single_recharge_status.awards" :key="index" class="RechargeRebate_TopBox_Body_Item position-relative flex-column align-center justify-center flex-shrink-0">
        <div class="img-box w-100 flex align-center justify-center position-relative">
          <img v-if="award.mark" :src="IconPath(award.mark)" class="label position-absolute" />
          <!--<img v-if="award.type == 'mic'" :src="IconPath($store.state.user_icon)" class="avatar position-absolute" @error="imgAtError" />-->
          <PublicImg :imgName="award.icon" :imgType="award.type" :class="award.type" />
          <!--<img v-if="index > 0" :src="IconPath('mk2_23.png')" class="bottomLabel position-absolute" />-->
        </div>
        <div class="img-bottom text-nowrap flex-1 w-100 line-height-1 flex align-center justify-center">{{award.show_text}}</div>
      </div>
    </div>
    <PublicButton class="RechargeRebate_TopBox_Button" :disabled="[5]" :hasRight="awardButtonClassMap[single_recharge_status.has_right]" @click="getRechargeGift">
      {{awardButtonTextMap[hasRight]}}
    </PublicButton>
    <div class="RechargeRebate_TopBox_Article margin-row-center position-relative">
      <div class="articleTitle flex justify-center align-center line-height-1">
        <div class="line"></div>
        <span>首充重置</span>
        <div class="line"></div>
      </div>
      <p class="text-nowrap">1.活动开始后重置<span class="focus-color">安卓、iOS和代充</span>所有额度首充</p>
      <p class="text-nowrap">2.活动期间<span class="focus-color">所有额度</span>首充双倍福利每日重置</p>
      <PublicButton class="immediatelyRecharge margin-row-center" hasRight="1" @click="$emit('recharge')">立即充值</PublicButton>
    </div>
    <RulesPopup v-if="showRulesPopup" @clickClose="showRulesPopup=false" />
    <ReceivePopup v-if="showReceivePopup" :config="configReceivePopup" @clickClose="showReceivePopup=false" />
  </OutBox>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'
import ReceivePopup from './components/receivePopup.vue'
import RulesPopup from './components/rulesPopup.vue'

export default {
  name: 'firstDouble',
  props: ['single_recharge_status', 'is_last_day'],
  components: { RulesPopup, ReceivePopup },
  data() {
    return {
      awardButtonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '已领取，明日再来', 3: '已领取' }),
      awardButtonClassMap: Object.freeze({ 0: 3, 1: 4, 2: 5, 3: 5 }),
      showRulesPopup: false, // 首充翻倍规则弹窗
      showReceivePopup: false,
      configReceivePopup: []
    }
  },
  computed: {
    hasRight() {
      if (this.is_last_day && this.single_recharge_status.has_right == 2) return 3
      return this.single_recharge_status.has_right // 0: 去完成, 1: 领取, 2: 今日已领取, 3: 已领取
    }
  },
  methods: {
    imgAtError,
    // 领取充值礼包
    async getRechargeGift() {
      if (this.hasRight == 0) {
        this.$emit('recharge')
      } else if (this.hasRight == 1) {
        const res = await getPageData({ type: 'recharge_single_reward' })
        if (res.errno) return this.$toast(res.errmsg)
        if (!res.errno) this.$emit('updateFirstDoubleData', res.data.data)
        this.configReceivePopup = res.data.data
        this.showReceivePopup = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.firstDouble {
  margin-bottom: 27px;
  .RechargeRebate_TopBox_Title {
    color: #BC4B91; /*todo*/
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
    top: 87px;
    right: 34px;
    width: 56px;
    height: auto;
  }
  //.springFestivalLabel {
  //  top: -68px;
  //  right: 88px;
  //  width: 167px;
  //  height: 159px;
  //}
  .RechargeRebate_TopBox_Body {
    padding: 0 47px 0 55px;
    &.children3 {
      padding: 0 108px 0 117px;
    }
    .RechargeRebate_TopBox_Body {
    padding: 0 47px 0 55px;
    &.children3 {
      padding: 0 60px;
      .RechargeRebate_TopBox_Body_Item{
        width: 168px;
        height: 168px;
      }
    }
    .RechargeRebate_TopBox_Body_Item {
      width: 148px;
      height: 168px;
      padding: 4px;
      background-color: #95634E; /*todo 奖励边框颜色*/
      border-radius: 16px;
      .img-box {
        height: 112px;
        background: linear-gradient(180deg, #FFEFD9, #FFEFD9); /*todo 奖励图标背景色*/
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
        .bottomLabel {
          right: -20px;
          bottom: -8px;
          width: 77px;
          height: 36px;
        }
        > img {
          height: 100%;
        }
        .mic {
          width: 112px;
        }
      }
      .img-bottom {
        background: #82512E; /*todo 奖励文字背景色*/
        border-radius: 0 0 12px 12px;
        font-size: 23px;
        color: #fff;
      }
      // 随机奖励
      //&:last-child {
      //  background-color: #F57644; /*todo 随机奖励边框颜色*/
      //  .img-box {
      //    background: linear-gradient(180deg, #FCF2C3, #FFFFFF); /*todo 随机奖励图标背景色*/
      //  }
      //  .img-bottom {
      //    background-color: #E44D12; /*todo 随机奖励文字背景色*/
      //  }
      //}
    }
  }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 18px auto 35px;
  }
  .RechargeRebate_TopBox_Article {
    margin: 0 auto; /*todo*/
    padding: 28px 34px 0;
    width: 660px;
    height: 320px;
    background: linear-gradient(180deg, #D07FC2, #F6ACC8, #FFDBB4);
    border-radius: 30px;
    //box-shadow: inset 0 0 5px 2px #fff;
    //border: 3px solid #FFEAA1;
    //-webkit-background-clip: padding-box;
    .articleTitle {
      position: relative;
      margin: 0 auto 20px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      span {
        margin: 0 9px;
      }
      .line {
        width: 131px;
        height: 24px;
        background: #ffffff;
        border-radius: 2px;
        // background: url('@/pages/womenDay/assets/mk2_3.png') no-repeat left top/100% 100%;
        // &:nth-child(3) {
        //   background: url('@/pages/womenDay/assets/mk2_3_1.png') no-repeat left top/100% 100%;
        // }
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
      width: 286px;
      height: 78px;
      font-size: 32px;
    }
  }
}
</style>
