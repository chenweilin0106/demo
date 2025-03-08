<template>
  <ThemeBox class="Single_RechargeGift" :title="'title_2.png'">
    <img :src="IconPath('mk2_20.png')" class="ruleIcon position-absolute" @click="showSingleRulePopup = true" />
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>充值<span class="speical_color">任意金额</span>即可领取超值礼包</p>
      <p>每个ID仅限领取一次</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body flex-center">
      <div class="RechargeRebate_TopBox_Body_Item flex-center" v-for="item in single_recharge_status.awards" :key="item.show_text">
        <div class="icon position-relative">
          <img v-if="item.mark" :src="IconPath(item.mark)" class="label position-absolute" />
          <PublicImg :imgName="item.icon" />
        </div>
        <div class="text">
          {{ item.show_text }}
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div
      @click="getRechargeGift"
      :class="[
        'flex-center',
        'RechargeRebate_TopBox_Button',
        { 'button-receive': hasRight == 1 },
        { 'button-finish': hasRight == 2 || hasRight == 3 }
      ]"
    >
      {{ awardButtonTextMap[hasRight] }}
    </div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <div class="article-title flex-center">首充重置</div>
      <div class="article-content">
        <p>1.活动开始后重置<span class="speical_color">安卓、IOS、代充</span>所有额度首充</p>
        <!-- <p>
        2.活动期间<span class="speical_color">所有额度首充</span
        >双倍福利每日重置
      </p> -->
        <p>2.活动期间<span>648及以下</span>额度首充双倍福利每日重置</p>
      </div>
      <div class="article-button flex-center" @click="$emit('recharge')">立即充值</div>
    </div>
    <SingleRulePopup v-if="showSingleRulePopup" @clickClose="showSingleRulePopup = false" />
  </ThemeBox>
</template>

<script>
const SingleRulePopup = () => import('@/pages/skillGift/popups/singleRulePopup.vue')
export default {
  name: 'Single_RechargeGift',
  components: { SingleRulePopup },
  props: ['single_recharge_status', 'is_last_day'],
  data() {
    return {
      showSingleRulePopup: false,
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
      if (!this.single_recharge_status.has_right) {
        this.$emit('recharge')
      } else if (this.single_recharge_status.has_right == 1) {
        this.$emit('getRechargeGift')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Single_RechargeGift {
  margin-top: 69px;
  margin-bottom: 40px;
  height: 849px;
  padding-top: 75px;
  .ruleIcon {
    top: 48px;
    right: 36px;
    width: 58px;
    height: 58px;
  }
  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #ffffff;

    span {
      color: #f7f26a !important;
    }

    p {
      text-align: center;
    }

    p:nth-child(1) {
      margin-bottom: 10px;
    }
  }

  .RechargeRebate_TopBox_Body {
    width: 100%;

    .RechargeRebate_TopBox_Body_Item {
      position: relative;
      flex-direction: column;
      justify-content: flex-start;
      margin-right: 54px;
      width: 159px;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        margin-top: 10px;
        height: 161px;
        background: url('@/pages/skillGift/assets/mk2_1.png') no-repeat left top/100% 100%;
        .label {
          z-index: 1;
          top: 0;
          right: 0;
          height: 32px;
        }
      }

      .text {
        position: relative;
        z-index: 1;
        margin-top: 19px;
        white-space: nowrap;
        font-size: 28px;
        color: #f5f5f8;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 100%;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 10px auto 0;
    width: 272px;
    height: 98px;
    background: url('@/pages/skillGift/assets/mk2_6.png') no-repeat left top/100% 100%;
    font-size: 32px;
    color: #1069ff;
  }

  // 首充重置说明
  .RechargeRebate_TopBox_Article {
    padding: 50px 0 0;
    margin: 0 auto 0;
    width: 677px;
    height: 339px;
    font-size: 28px;
    background: url('@/pages/skillGift/assets/mk2_8.png') no-repeat left top/100% 100%;

    .article-title {
      margin: 0px auto 20px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
    }

    .article-content {
      margin-left: 30px;
      width: 604px;
      height: 76px;
      white-space: nowrap;
      p {
        margin: 0 auto;
        color: #fff;
        width: 604px;
        line-height: 50px;
        white-space: nowrap;

        span {
          color: #f7f26a;
        }
      }
    }

    // 充值礼包立即充值按钮
    .article-button {
      margin: 31px auto 0;
      width: 272px;
      height: 98px;
      background: url('@/pages/skillGift/assets/mk2_5.png') no-repeat left top/100% 100%;
      font-size: 32px;
      color: #1069ff;
    }
  }

  .button-receive {
    background: url('@/pages/skillGift/assets/mk2_5.png') no-repeat left top/100% 100%;
  }

  .button-finish {
    color: #fff;
    background: url('@/pages/skillGift/assets/mk2_7.png') no-repeat left top/100% 100%;
  }
}
</style>
