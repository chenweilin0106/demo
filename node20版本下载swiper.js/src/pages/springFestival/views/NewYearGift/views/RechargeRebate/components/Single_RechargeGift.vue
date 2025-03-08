<template>
  <out-box class="Single_RechargeGift" title="title_2.png">
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>充值<span class="focus-color">任意金额</span>即可领取超值礼包</p>
      <p>每个ID仅限领取一次</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body">
      <div
        class="RechargeRebate_TopBox_Body_Item"
        v-for="(item, index) in single_recharge_status.awards"
        :key="index"
      >
        <div class="img-box flex-center">
          <img
            v-if="awardObj[item.type].icon"
            :src="IconPath(awardObj[item.type].icon)"
          />
        </div>
        <div class="img-bottom flex-center">
          {{ awardObj[item.type].text }}
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div
      class="RechargeRebate_TopBox_Button flex-center"
      @click="getRechargeGift"
      :class="
        ButtonStyle({ 1: 'did', 2: 'done' }, single_recharge_status.has_right)
      "
    >
      {{ ButtonText('4', +single_recharge_status.has_right) }}
    </div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <img :src="IconPath('mk2_8.png')" class="bottom-icon" />
      <div class="article-title"><span></span> 首充重置 <span></span></div>
      <p>
        1.活动开始后重置<span class="focus-color">安卓、IOS、代充</span
        >所有额度首充
      </p>
      <p>
        2.活动期间<span class="focus-color">所有额度</span>首充双倍福利每日重置
      </p>
      <button
        class="theme_botton_did article-button flex-center"
        @click="$emit('goRecharge')"
      >
        立即充值
      </button>
    </div>
  </out-box>
</template>

<script>
export default {
  name: 'Single_RechargeGift',
  props: ['single_recharge_status'],
  data() {
    return {
      awardObj: Object.freeze({
        property: { icon: 'yb_120_120.png', text: '元宝+3万' },
        tool: { icon: 'ljs_120_120.png', text: '绿晶石+10' },
        car: { icon: 'cfplh_120_120.png', text: '座驾+1天' }
      })
    }
  },
  methods: {
    // 领取充值礼包
    getRechargeGift() {
      const flag = this.single_recharge_status.has_right
      if (!flag) {
        this.$emit('goRecharge')
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
  height: 868px;
  margin-top: 140px;
  padding-top: 90px;
  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #ab5e1a;
    //margin-top: 26px;

    .focus-color {
      color: #f52f0e !important;
    }

    p {
      text-align: center;
    }

    p:nth-child(1) {
      margin-bottom: 13px;
    }

    p:nth-child(2) {
      margin-bottom: 27px;
    }
  }

  .RechargeRebate_TopBox_Body {
    width: 100%;
    //height: 105px;
    display: flex;
    justify-content: center;
    // justify-content: space-between;
    .RechargeRebate_TopBox_Body_Item {
      display: flex;
      flex-direction: column;
      width: 168px;
      height: 168px;
      background-color: #fe8d50;
      border-radius: 16px;
      padding: 4px;
      &:last-of-type {
        img {
          width: 80% !important;
        }
      }
      .img-box {
        position: relative;
        width: 100%;
        height: 112px;
        background: linear-gradient(180deg, #ffdc70, #fffae1);
        border-radius: 12px 12px 0 0;

        img {
          position: relative;
          z-index: 2;
          width: 80%;
        }
      }

      .img-bottom {
        flex: 1;
        width: 100%;
        font-size: 28px;
        background-color: #c7341b;
        color: #f5f5f8;
        border-radius: 0px 0px 12px 12px;
      }

      &:nth-child(2) {
        margin: 0 48px;
      }

      &:nth-child(3) {
        img {
          position: relative;
          top: 2px;
        }
      }
    }
  }

  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 36px auto 31px;
    width: 282px;
    height: 79px;
    font-size: 32px;
    color: #fff;
    background: url('@/pages/springFestival/assets/mk2_2.png') no-repeat left
      top/100% 100%;
  }

  .did {
    background: url('@/pages/springFestival/assets/mk2_3.png') no-repeat left
      top/100% 100%;
  }

  .done {
    background: url('@/pages/springFestival/assets/mk2_4.png') no-repeat left
      top/100% 100%;
  }

  .RechargeRebate_TopBox_Article {
    position: relative;
    padding: 28px 34px 0;
    margin: 0 auto;
    width: 660px;
    height: 320px;
    background: linear-gradient(180deg, #ea6243, #f9bb4f);
    border-radius: 30px;

    .bottom-icon {
      position: absolute;
      z-index: 1;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 660px;
      height: 137px;
    }

    .article-title {
      text-align: center;
      margin: 0 0 16px;
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
        top: -8px;
      }
    }

    p {
      font-size: 28px;
      color: #fff;
      line-height: 50px;
      white-space: nowrap;

      .focus-color {
        color: #fffaa6 !important;
      }
    }

    // 充值礼包立即充值按钮
    .article-button {
      position: relative;
      z-index: 2;
      margin: 34px auto 0;
      width: 284px;
      height: 76px;
      border-radius: 38px;
      font-size: 32px;
    }

    .theme_botton_did {
      color: #a9792c !important;
      background: linear-gradient(0deg, #fff5b0, #ffffff) !important;
    }
  }
}
</style>
