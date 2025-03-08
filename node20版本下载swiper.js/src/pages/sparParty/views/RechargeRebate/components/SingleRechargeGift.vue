<template>
  <OutBox class="Single_RechargeGift" title="title_2.png">
    <img :src="IconPath('mk2_14.png')" class="ruleIcon" @click="showFirstDoubleRulesPopup = true" />
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>充值<span>任意金额</span>即可领取超值礼包</p>
      <p>每个ID仅限领取一次</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body flex-center">
      <div v-for="(item, index) in single_recharge_status.awards" :key="index" class="RechargeRebate_TopBox_Body_Item flex-center">
        <img v-if="item.mark" :src="IconPath(item.mark)" class="label position-absolute" />
        <div class="icon"><img :src="IconPath(item.icon)" /></div>
        <div class="text">{{ item.show_text }}</div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div
      @click="getRechargeGift"
      :class="[
        'flex-center',
        'RechargeRebate_TopBox_Button',
        { 'button-receive': single_recharge_status.has_right == 1 },
        { 'button-finish': single_recharge_status.has_right == 2 }
      ]"
    >{{ awardButtonTextMap[hasRight] }}</div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <div class="article-title flex-center">首充重置</div>
      <div class="article-content">
        <p>1.活动开始后重置<span>安卓、IOS、代充</span>所有额度首充</p>
        <p>2.活动期间<span>648及以下</span>额度首充双倍福利每日重置</p>
      </div>
      <div class="article-button flex-center" @click="$emit('recharge')">
        立即充值
      </div>
    </div>
    <FirstDoubleRulesPopup v-if="showFirstDoubleRulesPopup" @clickClose="showFirstDoubleRulesPopup = false" />
    <FirstDoubleAwardPopup v-if="showFirstDoubleAwardPopup" :list="firstDoubleAwardPopupData" @clickClose="showFirstDoubleAwardPopup = false" />
  </OutBox>
</template>

<script>
import FirstDoubleAwardPopup from '@/pages/sparParty/popups/fistDoubleAwardPopup.vue'
import FirstDoubleRulesPopup from '@/pages/sparParty/popups/firstDoubleRulesPopup.vue'
export default {
  name: 'Single_RechargeGift',
  props: ['single_recharge_status', 'is_last_day'],
  components: { FirstDoubleRulesPopup, FirstDoubleAwardPopup },
  data() {
    return {
      showFirstDoubleAwardPopup: false,
      firstDoubleAwardPopupData: [
        // { icon: 'ljs_120_120.png', text: '+10', type: 'costume', mark: 'X5.png' },
        // { icon: 'ljs_120_120.png', text: '+10' },
        // { icon: 'ljs_120_120.png', text: '+10' }
      ],
      showFirstDoubleRulesPopup: false,
      awardButtonTextMap: Object.freeze({ 0: '去完成', 1: '领取', 2: '今日已领取', 3: '已领取' })
    }
  },
  computed: {
    hasRight() {
      if (this.is_last_day && this.single_recharge_status.has_right == 2) return 3
      return this.single_recharge_status.has_right // 0: 去完成, 1: 领取, 2: 今日已领取, 3: 已领取
    }
  },
  methods: {
    // 领取充值礼包
    getRechargeGift() {
      const flag = this.single_recharge_status.has_right
      if (!flag) {
        this.$emit('recharge')
      } else if (flag == 1) {
        this.$emit('getRechargeGift')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Single_RechargeGift {
  position: relative;
  margin-top: 71px;
  margin-bottom: 71px;
  padding-top: 75px;
  .ruleIcon {
    position: absolute;
    top: 53px;
    right: 36px;
    width: 58px;
    height: 58px;
  }
  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #ffffff;

    span {
      color: #6fffff !important;
    }

    p {
      text-align: center;
    }

    p:nth-child(1) {
      margin-bottom: 10px;
    }

    p:nth-child(2) {
      margin-bottom: 18px;
    }
  }

  .RechargeRebate_TopBox_Body {
    width: 100%;

    .RechargeRebate_TopBox_Body_Item {
      position: relative;
      flex-direction: column;
      justify-content: flex-start;
      width: 173px;
      .label {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        height: 32px;
      }

      .icon {
        position: relative;
        z-index: 1;
        height: 175px;
        background: url('@/pages/sparParty/assets/mk2_10.png') no-repeat left
        top/100% 100%;
        img {
          width: 100%;
        }
      }
      &:nth-child(2) {
        margin: 0 43px;
      }
      .text {
        position: relative;
        z-index: 1;
        margin-top: 14px;
        width: fit-content;
        white-space: nowrap;
        font-size: 28px;
        color: #f5f5f8;
        line-height: 100%;
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 40px auto 0;
    width: 239px;
    height: 76px;
    background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left
      top/100% 100%;
    font-size: 32px;
    color: #fff;
  }
  // 首充重置说明
  .RechargeRebate_TopBox_Article {
    padding: 31px 0 0;
    margin: 34px auto 0;
    width: 660px;
    height: 320px;
    font-size: 28px;
    background: url('@/pages/sparParty/assets/mk2_1.png') no-repeat left
      top/100% 100%;

    .article-title {
      margin: 0px auto 20px;
      width: 334px;
      height: 24px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      background: url('@/pages/sparParty/assets/mk2_7.png') no-repeat left
        top/100% 100%;
    }

    .article-content {
      margin-left: 30px;
      width: 604px;
      //height: 76px;
      white-space: nowrap;
      p {
        margin: 0 auto;
        color: #fff;
        width: 604px;
        line-height: 50px;
        white-space: nowrap;

        span {
          color: #6fffff;
        }
      }
    }

    // 充值礼包立即充值按钮
    .article-button {
      margin: 28px auto 0;
      width: 239px;
      height: 76px;
      background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left
        top/100% 100%;
      font-size: 32px;
      color: #fff;
    }
  }

  .button-receive {
    background: url('@/pages/sparParty/assets/btn_4.png') no-repeat left
      top/100% 100%;
  }

  .button-finish {
    color: #fff;
    background: url('@/pages/sparParty/assets/btn_8.png') no-repeat left
      top/100% 100%;
  }
}
</style>
