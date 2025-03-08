<template>
  <ThemeBox
    class="Single_RechargeGift"
    themeTitleImg="mk1_1.png"
    themeTitleImg2="title_2.png"
  >
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>充值<span class="speical_color">任意金额</span>即可领取超值礼包</p>
      <p>每个ID仅限领取一次</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body">
      <div
        class="theme_item RechargeRebate_TopBox_Body_Item"
        v-for="item in single_recharge_status.awards"
        :key="item.show_text"
      >
        <div class="img-box flex_across">
          <img :src="IconPath(singleRechargeAwardIcon(item.type))" alt="" />
        </div>
        <div class="img-bottom">
          {{ singleRechargeAwardText(item) }}
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div
      class="RechargeRebate_TopBox_Button flex_across"
      @click="getRechargeGift"
      :class="ButtonStyle('GoodsTask', single_recharge_status.has_right)"
    >
      {{ ButtonText('rechargeStatus', +single_recharge_status.has_right) }}
    </div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <div class="article-title"><span></span> 首充重置 <span></span></div>
      <p>
        1.活动开始后重置<span class="speical_color">安卓、IOS、代充</span
        >所有额度首充
      </p>
      <!-- <p>
        2.活动期间<span class="speical_color">所有额度首充</span
        >双倍福利每日重置
      </p> -->
      <p>
        2.活动期间<span class="speical_color">所有额度</span
        >首充双倍福利每日重置
      </p>
      <button
        class="theme_botton_did article-button flex_across"
        @click="$emit('goRecharge')"
      >
        立即充值
      </button>
    </div>
  </ThemeBox>
</template>

<script>
export default {
  name: 'Single_RechargeGift',
  props: ['single_recharge_status'],
  computed: {
    // 充值礼包道具图标
    singleRechargeAwardIcon() {
      return (type) => {
        return type === 'property'
          ? 'yb_120_120.png'
          : type === 'tool'
          ? 'ljs_120_120.png'
          : 'hj_120_120.png'
      }
    },
    // 充值礼包道具名称
    singleRechargeAwardText() {
      return ({ type, show_text }) => {
        return (
          (type === 'property' ? '元宝' : type === 'tool' ? '绿晶石' : '座驾') +
          '+' +
          show_text
        )
      }
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
  margin-top: 70px;
  margin-bottom: 20px !important;
  ::v-deep .ThemeBox_main {
    padding: 28px 20px 18px;
    // > .theme_botton_did {
    //   background: linear-gradient(0deg, #eb5b4c, #ffb98e) !important;
    //   border: 1px solid #ffffff !important;
    //   color: #fff !important;
    // }
  }
  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #fff;
    margin-top: 26px;
    .speical_color {
      color: #f7f26a !important;
    }
    p {
      text-align: center;
    }
    p:nth-child(1) {
      margin-bottom: 20px;
    }
    p:nth-child(2) {
      margin-bottom: 36px;
    }
  }
  .RechargeRebate_TopBox_Body {
    width: 100%;
    height: 210px;
    display: flex;
    // justify-content: space-between;
    .RechargeRebate_TopBox_Body_Item {
      width: 168px;
      height: 168px;
      background: #6648bc;
      border-radius: 12px;
      margin-right: 48px;
      padding: 0;
      border: none;
      padding: 4px;
      .img-box {
        width: 100%;
        height: 112px;
        background-color: #fefaef;
        border-radius: 8px 8px 0 0;
        img {
          height: 100%;
        }
      }
      .img-bottom {
        width: 100%;
        font-size: 28px;
        border-radius: 0px 0px 8px 8px;
      }
      &:nth-child(1) {
        margin-left: 20px;
      }
      &:nth-child(3) {
        margin-right: 0;
      }
    }
  }
  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 0 auto;
    width: 284px;
    height: 76px;
    border-radius: 76px;
    font-size: 32px;
  }
  // 首充重置说明
  .RechargeRebate_TopBox_Article {
    padding: 0 24px;
    margin: 30px auto 0;
    width: 100%;
    overflow: hidden;
    font-size: 28px;
    border-radius: 12px;
    .article-title {
      text-align: center;
      margin: 28px 0 16px;
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
      color: #fff;
      line-height: 50px;
      white-space: nowrap;
    }
    // 充值礼包立即充值按钮
    .article-button {
      margin: 30px auto 36px;
      width: 284px;
      height: 76px;
      border-radius: 76px;
      font-size: 32px;
    }
  }
}
</style>
