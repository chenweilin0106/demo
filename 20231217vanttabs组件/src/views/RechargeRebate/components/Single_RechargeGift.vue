<template>
  <out-box class="Single_RechargeGift" title="title_2.png">
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>每日充值<span>任意金额</span>即可领取首充礼包</p>
      <p>礼包每日重置，当天奖励需当天领取</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body flex-center">
      <div
        class="RechargeRebate_TopBox_Body_Item flex-center"
        v-for="item in single_recharge_status.awards"
        :key="item.show_text"
      >
        <div class="icon flex-center">
          <img
            v-if="singleRechargeAwardIcon(item.type)"
            :src="IconPath(singleRechargeAwardIcon(item.type))"
            alt=""
          />
          <public-svga
            v-else-if="item.type === 'mic'"
            svgaName="ts_cbzy"
            :userAvatar="$store.state.user_icon"
          />
        </div>
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
        <span></span>
        <p>首充重置</p>
        <span></span>
      </div>
      <div class="article-content">
        <p>1.活动开始后重置<span>安卓、IOS、代充</span>所有额度首充</p>
        <p>2.活动期间<span>所有额度</span>首充双倍福利每日重置</p>
      </div>
      <div class="article-button flex-center" @click="$emit('goRecharge')">
        立即充值
      </div>
    </div>
  </out-box>
</template>

<script>
import PublicSvga from '@/components/PublicSvga.vue'
export default {
  name: 'Single_RechargeGift',
  props: ['single_recharge_status'],
  components: {
    PublicSvga
  },
  computed: {
    // 充值礼包道具图标
    singleRechargeAwardIcon() {
      return (type) => {
        return type === 'property'
          ? 'yb_120_120.png'
          : type === 'tool'
          ? 'ljs_120_120.png'
          : ''
      }
    },
    // 充值礼包道具名称
    singleRechargeAwardText() {
      return ({ type, show_text }) => {
        return (
          (type === 'property' ? '元宝' : type === 'tool' ? '绿晶石' : '头饰') +
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
  margin-top: 81px;
  margin-bottom: 127px;
  height: 874px;
  padding-top: 100px;

  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #aa4213;

    span {
      color: #f52300;
    }

    p {
      text-align: center;
    }

    p:nth-child(1) {
      margin-bottom: 16px;
    }

    p:nth-child(2) {
      margin-bottom: 26px;
    }
  }

  .RechargeRebate_TopBox_Body {
    width: 100%;

    .RechargeRebate_TopBox_Body_Item {
      position: relative;
      flex-direction: column;
      justify-content: flex-start;
      width: 168px;
      height: 168px;
      padding: 4px;
      border-radius: 16px;
      background-color: #d38232;

      .icon {
        width: 100%;
        height: 112px;
        background-color: #fff;
        border-radius: 12px 12px 0 0;
        overflow: hidden;

        img {
          height: 100%;
        }
      }

      .text {
        flex: 1;
        width: 100%;
        white-space: nowrap;
        font-size: 28px;
        color: #f5f5f8;
        background-color: #824414;
        border-radius: 0 0 12px 12px;
      }

      &:nth-child(2) {
        margin: 0 43px;
      }
    }

    .car-bgi {
      background: url('@/assets/mk2_2.png') no-repeat left top/100% 100%;
    }
  }

  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 44px auto 0;
    width: 280px;
    height: 72px;
    background: linear-gradient(0deg, #ef8620, #ffb932);
    border: 2px solid #ffffff;
    border-radius: 36px;
    font-size: 32px;
    color: #ffffff;
  }

  .button-receive {
    background: linear-gradient(0deg, #df4324, #ffa853);
  }

  .button-finish {
    background: linear-gradient(0deg, #9d9d9d, #d4d4d4);
  }

  // 首充重置说明
  .RechargeRebate_TopBox_Article {
    margin: 30px auto 0;
    padding: 50px 0 0;
    width: 660px;
    height: 320px;
    font-size: 28px;
    background: linear-gradient(0deg, #a16014, #d98428);
    border-radius: 30px;

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
      }

      p {
        margin: 0 9px;
      }
    }

    .article-content {
      margin-left: 33px;
      width: 594px;
      height: 77px;
      white-space: nowrap;

      p {
        margin: 0 auto;
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
      margin: 31px auto 0;
      width: 280px;
      height: 72px;
      font-size: 32px;
      color: #a9792c;
      border-radius: 38px;
      background: linear-gradient(0deg, #fff5b0, #ffffff);
    }
  }
}
</style>
