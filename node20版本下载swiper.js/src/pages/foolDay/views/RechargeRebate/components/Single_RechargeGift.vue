<template>
  <out-box class="Single_RechargeGift" title="title_2.png">
    <!-- 充值说明 -->
    <div class="RechargeRebate_TopBox_Title">
      <p>充值<span>任意金额</span>即可领取超值礼包</p>
      <p>每个ID仅限领取一次</p>
    </div>
    <!-- 充值奖励道具列表 -->
    <div class="RechargeRebate_TopBox_Body flex justify-center align-center flex-no-wrap">
      <div
        :class="['RechargeRebate_TopBox_Body_Item', 'flex-center', 'flex-shrink-0']"
        v-for="item in single_recharge_status.awards"
        :key="item.show_text"
      >
        <div class="inner flex-column">
          <div class="icon-box flex justify-center align-center">
            <img :src="IconPath(singleRechargeAwardIcon(item.type))" alt="" />
          </div>
          <div class="text flex justify-center align-center flex-1 text-nowrap">
            {{ singleRechargeAwardText(item) }}
          </div>
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div
      @click="getRechargeGift"
      :class="[
        'flex-center',
        'RechargeRebate_TopBox_Button',
        { 'button-noFinish': single_recharge_status.has_right == 0 },
        { 'button-receive': single_recharge_status.has_right == 1 },
        { 'button-finish': single_recharge_status.has_right == 2 }
      ]"
    >
      {{ ButtonText('4', +single_recharge_status.has_right) }}
    </div>
    <!-- 首充充值说明 -->
    <div class="RechargeRebate_TopBox_Article">
      <div class="article-title flex justify-center align-center">
        <div class="line-icon"></div>
        <span>首充重置</span>
        <div class="line-icon"></div>
      </div>
      <div class="article-content">
        <p>1.活动开始后重置<span>安卓、IOS、代充</span>所有额度首充</p>
        <p>2.活动期间<span>648及以下</span>额度首充双倍福利每日重置</p>
      </div>
      <div class="article-button flex justify-center align-center" @click="$emit('goRecharge')">立即充值</div>
    </div>
  </out-box>
</template>

<script>
import { _throttle } from '../../../utils/tool'
export default {
  name: 'Single_RechargeGift',
  props: ['single_recharge_status'],
  computed: {
    // 充值礼包道具图标
    singleRechargeAwardIcon() {
      return (type) => {
        return type === 'property' ? 'yb_120_120.png' : type === 'tool' ? 'ljs_120_120.png' : 'jffc_134_82.png'
      }
    },
    // 充值礼包道具名称
    singleRechargeAwardText() {
      return ({ type, show_text }) => {
        return (type === 'property' ? '元宝' : type === 'tool' ? '绿晶石' : '座驾') + '+' + show_text
      }
    }
  },
  methods: {
    // 领取充值礼包
    getRechargeGift: _throttle(function () {
      const flag = this.single_recharge_status.has_right
      if (!flag) {
        this.$emit('goRecharge')
      } else if (flag == 1) {
        this.$emit('getRechargeGift')
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.Single_RechargeGift {
  margin-top: 89px;
  margin-bottom: 34px;
  height: 934px;
  padding-top: 116px;

  .RechargeRebate_TopBox_Title {
    font-size: 28px;
    color: #77480c;

    span {
      color: #d9214e !important;
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
      width: 168px;
      height: 168px;
      padding: 4px;
      background-color: #b8668f;
      border-radius: 16px;

      .inner {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        .icon-box {
          width: 100%;
          height: 112px;
          background: linear-gradient(180deg, #f4c5d2, #ffffff);
          border-radius: 12px 12px 0 0;

          img {
            height: 100%;
          }
        }
      }

      .text {
        font-size: 28px;
        color: #f5f5f8;
        width: 100%;
        background: #883760;
        border-radius: 0 0 12px 12px;
      }

      &:nth-child(2) {
        margin: 0 48px;
      }

      &:last-child {
        img {
          width: 90%;
          height: auto !important;
        }
      }
    }
  }

  // 去完成按钮
  .RechargeRebate_TopBox_Button {
    margin: 37px auto 30px;
    width: 286px;
    height: 78px;
    border-radius: 39px;
    font-size: 32px;
  }

  // 首充重置说明
  .RechargeRebate_TopBox_Article {
    padding: 28px 0 0;
    margin: 0 auto;
    width: 660px;
    height: 320px;
    background: linear-gradient(0deg, #75a9b1, #a55e7c, #ab407c);
    border-radius: 30px;

    .article-title {
      position: relative;
      margin: 0px auto 20px;
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

    .article-content {
      margin: 0 auto;
      width: fit-content;
      //height: 76px;
      white-space: nowrap;

      p {
        width: 604px;
        line-height: 50px;
        white-space: nowrap;
        font-size: 28px;
        color: #ffffff;

        span {
          color: #fffaa6;
        }
      }
    }

    // 充值礼包立即充值按钮
    .article-button {
      margin: 20px auto;
      width: 286px;
      height: 78px;
      background: linear-gradient(0deg, #fff5b0, #ffffff);
      border-radius: 39px;
      border: 3px solid #ffffff;
      font-size: 32px;
      color: #a9792c;
    }
  }

  .button-noFinish {
    color: #fff;
    border: 3px solid #ffffff;
    background: linear-gradient(0deg, #5396a1, #80ddde);
  }

  .button-receive {
    color: #fff;
    border: 3px solid #ffffff;
    background: linear-gradient(0deg, #c1437d, #f697c0);
  }
}
</style>
