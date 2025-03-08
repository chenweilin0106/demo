<template>
  <out-box class="Single_RechargeGift" :title="'title_2.png'">
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>充值<span>任意金额</span>即可领取超值礼包</p>
      <p>每个ID仅限领取一次</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body flex-center">
      <div
        :class="['RechargeRebate_TopBox_Body_Item', 'flex-center']"
        v-for="item in single_recharge_status.awards"
        :key="item.show_text"
      >
        <img :src="IconPath(singleRechargeAwardIcon(item.type))" alt="" />
        <div class="text flex-center">
          {{ singleRechargeAwardText(item) }}
        </div>
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
    >
      {{ ButtonText('4', +single_recharge_status.has_right) }}
    </div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <div class="article-title flex-center">
        <div class="label-icon"></div>
        <span>首充重置</span>
      </div>
      <div class="article-content">
        <p>1.活动开始后重置<span>安卓、IOS、代充</span>所有额度首充</p>
        <!-- <p>
        2.活动期间<span>所有额度首充</span
        >双倍福利每日重置
      </p> -->
        <p>2.活动期间<span>648及以下</span>额度首充双倍福利每日重置</p>
      </div>
      <div class="article-button flex-center" @click="$emit('goRecharge')">
        立即充值
      </div>
    </div>
  </out-box>
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
          : 'zj_hj.png'
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
  margin-top: 64px;
  margin-bottom: 31px;
  height: 860px;
  padding-top: 48px;

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

    p:nth-child(2) {
      margin-bottom: 18px;
    }
  }

  .RechargeRebate_TopBox_Body {
    width: 100%;

    .RechargeRebate_TopBox_Body_Item {
      position: relative;
      width: 185px;
      height: 185px;
      background: url('@/pages/lanternFestival/assets/mk2_1.png') no-repeat left
        top/100% 100%;

      > img {
        margin-top: -15px;
        width: 60%;
      }

      .text {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        white-space: nowrap;
        font-size: 28px;
        color: #f5f5f8;
        width: 160px;
        height: 40px;
        background: linear-gradient(90deg, #db6034, #ce442b);
        border-radius: 20px;
        font-weight: 400;
      }

      &:nth-child(2) {
        margin: 0 33px;
      }

      &:nth-child(3) {
        > img {
          margin-top: -10px;
          width: 70%;
        }
      }
    }
  }

  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 25px auto 13px;
    width: 256px;
    height: 84px;
    background: url('@/pages/lanternFestival/assets/btn_5.png') no-repeat left
      top/100% 100%;
    font-size: 32px;
    color: #e73d27;
    font-weight: 600;
  }

  // 首充重置说明
  .RechargeRebate_TopBox_Article {
    padding: 50px 0 0;
    margin: 15px auto 0;
    width: 674px;
    height: 356px;
    font-size: 28px;
    background: url('@/pages/lanternFestival/assets/mk2_3.png') no-repeat left
      top/100% 100%;

    .article-title {
      position: relative;
      margin: 0px auto 20px;
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;

      span {
        margin: 0 27px;
      }

      .label-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 442px;
        height: 24px;
        background: url('@/pages/lanternFestival/assets/mk2_2.png') no-repeat
          left top/100% 100%;
      }
    }

    .article-content {
      margin: 0 auto;
      width: fit-content;
      //height: 76px;
      white-space: nowrap;

      p {
        //margin: 0 0 0 40px;
        color: #fff;
        width: 604px;
        line-height: 50px;
        white-space: nowrap;

        span {
          color: #fffaa6;
        }
      }
    }

    // 充值礼包立即充值按钮
    .article-button {
      margin: 20px auto;
      width: 256px;
      height: 84px;
      background: url('@/pages/lanternFestival/assets/btn_5.png') no-repeat left
        top/100% 100%;
      font-size: 32px;
      color: #e73d27;
      font-weight: 600;
    }
  }

  .button-receive {
    color: #fff;
    background: url('@/pages/lanternFestival/assets/btn_4.png') no-repeat left
      top/100% 100%;
  }

  .button-finish {
    color: #fff;
    background: url('@/pages/lanternFestival/assets/btn_6.png') no-repeat left
      top/100% 100%;
  }
}
</style>
