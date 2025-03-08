<template>
  <div class="RechargeTaskItem" :class="{ RechargeLevel5000: isLevel5000 }">
    <div class="RechargeTaskItem_LeftContent">
      <!-- 累计充值 -->
      <p v-if="itemValue.condition">
        <span class="">累计</span>充值满<span class=""
          >{{ itemValue.condition }}元</span
        >
        <span class="speical_color"
          >（{{ itemValue.recharge_nums }}/{{ itemValue.condition }}）</span
        >
      </p>
      <!-- 连续充值 -->
      <p v-else>
        <span class="">累计{{ itemValue.days_cond }}</span
        >天每天充值满{{ itemValue.amount_cond }}元<span class="speical_color">
          （{{ itemValue.reach_days }}/{{ itemValue.days_cond }}）</span
        >
      </p>
      <!-- 奖励渲染 -->
      <div v-if="!isLevel5000" class="award_contain">
        <div
          class="award-line"
          v-for="item in itemValue.awards"
          :key="item.type"
        >
          <span :class="{ goldCard: item.name == '24小时金币卡' }">
            <img
              :class="ButtonStyle(iconStyle, item.type)"
              :src="IconPath(item.icon)"
              alt=""
            />
          </span>
          {{ awardNumText(item.text) }}
        </div>
      </div>
      <!-- 5000档特殊奖励列表渲染 -->
      <div v-else class="PresentList">
        <template v-for="item in itemValue.awards">
          <div
            class="PresentItem"
            :key="item.name"
            v-if="!(item.name === '威望值')"
            :class="{ 'gift-item_title': item.type === 'title' }"
          >
            <div class="img-box">
              <div class="img-top">
                <img
                  v-if="item.type !== 'title'"
                  :src="IconPath(item.icon)"
                  alt=""
                />
                <div v-else class="rsyj_lottie">
                  <PublicJson jsonName="ch_rsyj_1" />
                </div>
              </div>
              <div class="img-bottom">+{{ item.text }}</div>
            </div>
          </div>
        </template>
      </div>
      <!-- 重置 -->
      <div class="reset" v-if="itemValue.is_daily"></div>
    </div>
    <!-- 按钮 -->
    <div
      class="RechargeTaskItem_Button theme_botton_undid flex_across"
      @click="
        getAward(
          itemValue.has_right,
          itemValue.condition || itemValue.amount_cond
        )
      "
      :class="[
        ButtonStyle('GoodsTask', itemValue.has_right),
        { RechargeLevel5000_Button: isLevel5000 }
      ]"
    >
      {{ ButtonText('rechargeStatus', itemValue.has_right) }}
    </div>
    <!-- 5000档特殊显示 -->
    <p class="titleInfo" v-if="isLevel5000">
      {{ itemValue.awards[4].text }}
    </p>
  </div>
</template>

<script>
// 公用json组件
import PublicJson from '@/pages/crazyEgg/components/PublicJson'

export default {
  name: 'RechargeTaskItem',
  data() {
    return {
      // 用于添加图标样式
      iconStyle: {
        property: 'property',
        pretty_card: 'pretty_card',
        hero_tools: 'hero_tools'
      }
    }
  },
  components: {
    PublicJson
  },
  computed: {
    // 奖励数量文本
    awardNumText() {
      return (text, index) => {
        return `+${text}`
      }
    },
    // 判断是否5000档
    isLevel5000() {
      return (
        this.itemValue.condition === 5000 || this.itemValue.condition === 10000
      )
    }
  },
  props: ['itemValue'],
  methods: {
    // 点击按钮
    getAward(flag, id) {
      if (!flag) {
        // 0 去充值 跳转充值界面
        this.$emit('toRecharge')
      } else if (flag == 1) {
        if (this.itemValue.condition) {
          // 累计充值
          this.$emit('getAward', id, 'recharge_reward')
        } else {
          // 连续充值
          this.$emit('getAward', id, 'recharge_accruing_reward')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.RechargeTaskItem {
  position: relative;
  width: 664px;
  height: 136px;
  margin-bottom: 21px;
  //border-radius: 12px;
  padding: 3px;
  background: url('@/pages/crazyEgg/assets/bg_1.png') no-repeat left top/100%
    auto;

  //.reset {
  //  position: absolute;
  //  width: 121px;
  //  height: 67px;
  //  top: 0;
  //  right: 0;
  //  background: url('@/pages/crazyEgg/assets/mk2_1.png') no-repeat left top/100%
  //    100%;
  //}

  .RechargeTaskItem_LeftContent {
    margin-left: 22px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    //color: #fffaa6;

    p:nth-child(1) {
      color: #692e19;
      font-size: 30px;
    }

    .speical_color {
      color: #c35716 !important;

      &:nth-last-of-type(1) {
        font-size: 28px;
        margin-left: -10px;
      }
    }

    .award_contain {
      width: fit-content;
      text-align: center;
      line-height: 48px;
      height: 48px;
      // background-color: #1647af;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -5px;
      padding: 0 20px 0 0px;
      font-size: 24px;

      .award-line {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 37px;
        margin-right: 10px;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 500;
        color: #c35716;
        background: linear-gradient(
          90deg,
          rgba(255, 184, 152, 0),
          rgba(255, 184, 152, 0.76)
        );
        padding-right: 13px;
      }

      span {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        img {
          vertical-align: middle;
          margin-right: 4px;
          width: auto;
          height: 52px;
        }

        &:nth-of-type(2),
        &:nth-of-type(3) {
          > img {
            margin-left: -10px;
            margin-right: 2px;
          }
        }

        .property {
          width: auto !important;
          height: 70px !important;
        }

        .pretty_card {
          width: auto !important;
          height: 70px;
        }

        .hero_tools {
          margin-top: 2px;
          width: auto !important;
          height: 60px !important;
          margin-right: 0px !important;
        }
      }

      .goldCard {
        > img {
          width: auto !important;
          height: 56px !important;
        }
      }
    }
  }

  // 按钮
  // 去完成
  .RechargeTaskItem_Button {
    z-index: 100;
    position: absolute;
    top: 48px;
    right: 24px;
    width: 124px;
    height: 64px;
    border-radius: 64px;
  }

  // 领取
  .RechargeLevel5000_Button {
    position: relative;
    top: 0 !important;
    right: 0 !important;
    margin: 24px auto 0 !important;
    width: 206px !important;
    height: 66px !important;
    font-size: 28px !important;
    border-radius: 33px !important;
  }

  .titleInfo {
    color: #692e19;
    margin: 21px 0px 14px 24px;
    font-size: 24px;
    // margin-left: 12px;
  }
}

.RechargeLevel5000 {
  width: 664px;
  height: 364px;
  //margin-bottom: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: url('@/pages/crazyEgg/assets/bg_8.png') no-repeat left top/100%
    auto;

  .RechargeTaskItem_LeftContent {
    width: 100%;
    height: fit-content;
    justify-content: flex-start;
    color: #fff;
    margin-left: 0;

    p {
      margin: 16px 0 15px 20px !important;
      font-size: 30px;

      > span {
        font-size: 30px;
      }
    }

    .PresentList {
      margin-top: 0px;
      display: flex;
      width: 100%;
      justify-content: space-evenly;

      .PresentItem {
        width: 128px;
        height: 128px;
        // margin-right: 5px;
        border-radius: 18px;
        font-size: 24px;
        // 图片样式
        .img-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 4px;
          border-radius: 16px;
          background-color: #c86325;

          .img-top {
            width: 100%;
            height: 90px;
            background: #fefaef;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 12px 12px 0 0;

            img {
              // width: 100%;
              height: 100%;
            }

            .PublicJson {
              ::v-deep .PublicJson_ch_rsyj_1 {
                width: 80%;
              }
            }
          }

          .img-bottom {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30px;
            background-color: #f2ab73;
            border-radius: 0 0 12px 12px;
            font-size: 24px;
            color: #ffffff;
          }
        }
      }
    }

    .gift-item_title {
      width: 164px !important;

      .img-box {
        .img-top {
          img {
            height: 80% !important;
          }
        }
      }
    }
  }
}
</style>
