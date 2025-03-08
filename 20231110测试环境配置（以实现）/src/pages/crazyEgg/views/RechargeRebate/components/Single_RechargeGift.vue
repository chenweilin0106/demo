<template>
  <crazy-egg-box class="Single_RechargeGift" title-icon="title_1.png">
    <div class="single_recharge_main">
      <!-- 充值说明 -->
      <div class="RechargeRebate_TopBox_Title">
        <p>充值<span class="speical_color">任意金额</span>即可领取超值礼包</p>
        <p>每个ID仅限领取一次</p>
      </div>
      <!-- 充值奖励道具列表 -->
      <div class="RechargeRebate_TopBox_Body">
        <div
          class="RechargeRebate_TopBox_Body_Item"
          v-for="item in single_recharge_status.awards"
          :key="item.show_text"
        >
          <div class="img-box flex_across">
            <img
              v-if="awardObj[item.type].icon"
              :src="IconPath(awardObj[item.type].icon)"
              alt=""
            />
            <div
              v-if="awardObj[item.type].icon == 'ts_6zn_01.png'"
              class="avatar_box flex_across"
            >
              <img
                v-if="$store.getters.user_icon"
                :src="$store.getters.user_icon"
              />
            </div>
          </div>
          <div class="img-bottom">
            {{ awardObj[item.type].text }}
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
        <div class="article-title">首充重置</div>
        <p>
          1.活动开始后重置<span class="speical_color">安卓、IOS、代充</span
          >所有额度首充
        </p>
        <p>
          2.活动期间<span class="speical_color">500以下额度</span
          >首充双倍福利每日重置
        </p>
        <button
          class="article-button flex_across"
          @click="$emit('goRecharge')"
        ></button>
      </div>
    </div>
  </crazy-egg-box>
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
        mic: { icon: 'zj_jffc_120_120.png', text: '座驾+1天' }
      })
    }
  },
  computed: {
    // 充值礼包道具图标
    singleRechargeAwardIcon() {
      return (type) => {
        return type === 'property'
          ? 'yb_120_120.png'
          : type === 'tool'
          ? 'ljs_120_120.png'
          : 'ts_6zn_01.png'
      }
    },
    // 充值礼包道具名称
    singleRechargeAwardText() {
      return ({ type, show_text }) => {
        return (
          (type === 'property'
            ? '元宝'
            : type === 'tool'
            ? '绿晶石'
            : '永久头饰') +
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
  position: relative;

  width: 732px;
  margin-top: 76px;
  //overflow: hidden;
  // margin-bottom: 10px !important;
  //background-color: red;

  .single_recharge_main {
    position: absolute;
    z-index: 3;
    top: -40px;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
    //height: 737px;

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
        margin-bottom: 30px;
      }
    }

    .RechargeRebate_TopBox_Body {
      width: 100%;
      //height: 105px;
      display: flex;
      justify-content: center;
      // justify-content: space-between;
      .RechargeRebate_TopBox_Body_Item {
        width: 168px;
        height: 168px;
        background-color: #c86325;
        padding: 4px;
        border-radius: 16px;

        .img-box {
          position: relative;
          width: 100%;
          height: 112px;
          background-color: #fffbdd;
          border-radius: 12px 12px 0 0;

          img {
            position: relative;
            z-index: 2;
            //width: 100%;
            height: 100%;
          }
          .avatar_box {
            position: absolute;
            z-index: 1;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            > img {
              width: 90px;
              height: 90px;
              object-fit: cover;
              border-radius: 50%;
              //background-color: skyblue;
            }
          }
        }

        .img-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 48px;
          font-size: 28px;
          border-radius: 0px 0px 12px 12px;
          background-color: #f2ab73;
          color: #f5f5f8;
        }

        &:nth-child(2) {
          margin: 0 48px;
        }
      }
    }

    // 去完成按钮
    .RechargeRebate_TopBox_Button {
      margin: 41px auto 0;
      width: 284px;
      height: 76px;
      font-size: 32px;
      background: linear-gradient(0deg, #e07336, #fff68f);
      border: 2px solid #ffffff;
      border-radius: 38px;
      color: #ffffff;
    }

    .theme_botton_did {
      color: #fff !important;
      background: linear-gradient(0deg, #9e69ff, #f79dff) !important;
    }

    .RechargeRebate_TopBox_Article {
      width: 660px;
      height: 320px;
      padding: 0 34px;
      margin: 27px auto 0;
      overflow: hidden;
      background: url('@/pages/crazyEgg/assets/bg_7.png') no-repeat left
        top/100% 100%;

      .article-title {
        text-align: center;
        margin: 8px 0 40px;
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
        font-size: 28px;
        color: #fff;
        line-height: 50px;
        white-space: nowrap;

        .speical_color {
          color: #fffaa6 !important;
        }
      }

      // 充值礼包立即充值按钮
      .article-button {
        margin: 30px auto 36px;
        width: 284px;
        height: 79px;
        background: url('@/pages/crazyEgg/assets/btn_cz.png') no-repeat left
          top/100% auto;
      }

      .theme_botton_did {
        color: #a9792c !important;
        background: linear-gradient(0deg, #fff5b0, #ffffff) !important;
      }
    }
  }

  ::v-deep .main {
    height: 737px;
  }
}
</style>
