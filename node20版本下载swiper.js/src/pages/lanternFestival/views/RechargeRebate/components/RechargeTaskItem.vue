<template>
  <div class="RechargeTaskItem" :class="{ RechargeLevel5000: isLevel5000 }">
    <div class="RechargeTaskItem_LeftContent">
      <!-- 累计充值 -->
      <p v-if="itemValue.condition">
        <span>累计</span>充值满<span>{{ itemValue.condition }}元</span>
        <span>（{{ itemValue.recharge_nums }}/{{ itemValue.condition }}）</span>
      </p>
      <!-- 连续充值 -->
      <p v-else>
        <span>累计{{ itemValue.days_cond }}</span
        >天每天充值满{{ itemValue.amount_cond }}元<span
          >（{{ itemValue.reach_days }}/{{ itemValue.days_cond }}）</span
        >
      </p>
      <!-- 奖励渲染 -->
      <p v-if="!isLevel5000" class="award_contain flex-center">
        <template v-for="(item, index) in itemValue.awards">
          <span
            :key="item.type"
            :class="{ goldCard: item.name == '24小时金币卡' }"
          >
            <img
              :class="ButtonStyle(iconStyle, item.type)"
              :src="IconPath(item.icon)"
              alt=""
          /></span>
          {{ awardNumText(item.text, index) }}
        </template>
      </p>
      <!-- 5000档特殊奖励列表渲染 -->
      <div v-else class="PresentList">
        <template v-for="item in itemValue.awards">
          <div
            :key="item.name"
            v-if="!(item.name === '威望值')"
            :class="[
              'PresentItem',
              { 'gift-item_title': item.type === 'title' }
            ]"
          >
            <div class="icon-box">
              <img v-if="item.type !== 'title'" :src="IconPath(item.icon)" />
              <div v-else class="rsyj_lottie">
                <PublicJson jsonName="ch_rsyj_1" />
              </div>
            </div>
            <div class="text-box flex-center">+{{ item.text }}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- 按钮 -->
    <div
      class="RechargeTaskItem_Button"
      :class="['flex-center', ...buttonStyle]"
      @click="
        getAward(
          itemValue.has_right,
          itemValue.condition || itemValue.amount_cond
        )
      "
    >
      {{ ButtonText('4', itemValue.has_right) }}
    </div>
    <!-- 5000档特殊显示 -->
    <p class="titleInfo" v-if="isLevel5000">
      {{ itemValue.awards[4].text }}
    </p>
  </div>
</template>

<script>
// 公用json组件
import PublicJson from '../../../components/PublicJson'

export default {
  name: 'RechargeTaskItem',
  data() {
    return {
      // 用于添加图标样式
      iconStyle: {
        property: 'property',
        pretty_card: 'pretty_card',
        hero_tools: 'hero_tools',
        tool: 'fsjc'
      }
    }
  },
  components: {
    PublicJson
  },
  computed: {
    buttonStyle() {
      return [
        {
          [this.ButtonStyle('1', this.itemValue.has_right)]: !this.isLevel5000
        },
        { 'special-button': this.isLevel5000 },
        {
          'special-button-1': this.isLevel5000 && this.itemValue.has_right == 1
        },
        {
          'special-button-2': this.isLevel5000 && this.itemValue.has_right == 2
        }
      ]
    },
    // 奖励数量文本
    awardNumText() {
      return (text, index) => {
        return `+${text}${
          index !== this.itemValue.awards.length - 1 ? '，' : ''
        }`
      }
    },
    // 判断是否5000档
    isLevel5000() {
      return this.itemValue.condition === 5000
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
  height: 142px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  background: url('@/pages/lanternFestival/assets/mk1_3.png') no-repeat left
    top/100% 100%;

  .RechargeTaskItem_LeftContent {
    margin-left: 22px;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding-top: 27px;

    p:nth-child(1),
    span {
      font-size: 30px;

      span {
        color: #fffaa6;
      }

      &:nth-last-of-type(1) {
        font-size: 28px;
        margin-left: -8px;
      }
    }

    .award_contain {
      width: fit-content;
      text-align: center;
      line-height: 48px;
      height: 48px;
      background-color: #77151d;
      border-radius: 25px;
      padding: 0 18px 0 12px;
      font-size: 24px;
      color: #fff;
      margin-top: 7px;
      margin-left: -5px;

      span {
        height: 100%;
        display: flex;
        align-items: center;

        img {
          vertical-align: middle;
          margin-right: 4px;
          width: auto;
          height: 50px;
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
          height: 50px !important;
        }

        .pretty_card {
          width: auto !important;
          height: 70px;
          margin-left: 0px !important;
        }

        .hero_tools {
          width: auto !important;
          height: 48px !important;
          margin-right: 0px !important;
        }

        .fsjc {
          margin-left: -10px;
          margin-right: -5px;
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
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 136px;
    height: 64px;
  }

  // 领取
  .special-button {
    position: relative;
    top: 0;
    left: 0;
    transform: translateY(0);
    margin: 18px auto 20px !important;
    width: 256px !important;
    height: 84px !important;
    background: url('@/pages/lanternFestival/assets/btn_5.png') no-repeat left
      top/100% 100% !important;
    color: #e73d27;
    font-size: 32px;
    font-weight: 700;
  }

  .special-button-1 {
    color: #fff;
    background: url('@/pages/lanternFestival/assets/btn_4.png') no-repeat left
      top/100% 100% !important;
  }

  .special-button-2 {
    color: #fff;
    background: url('@/pages/lanternFestival/assets/btn_6.png') no-repeat left
      top/100% 100% !important;
  }

  .titleInfo {
    margin: 0px 0px 10px 23px;
    font-size: 24px;
    color: #fffaa6;
  }
}

.RechargeLevel5000 {
  margin-bottom: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 368px;
  background: url('@/pages/lanternFestival/assets/mk2_5.png') no-repeat left
    top/100% 100%;

  .RechargeTaskItem_LeftContent {
    width: 100%;
    justify-content: flex-start;
    color: #fff;
    margin-left: 0px;
    padding-top: 24px !important;

    p {
      margin: 0px 0 8px 22px !important;
      font-size: 30px;

      > span {
        font-size: 28px;
      }
    }

    .PresentList {
      margin-top: 4px;
      padding: 0 32px 0 18px;
      display: flex;
      width: 100%;
      justify-content: space-between;

      .PresentItem {
        width: 124px;
        height: 124px;
        background: #ff9563;
        padding: 2px;
        border-radius: 14px;
        // 图片样式
        .icon-box {
          width: 100%;
          height: 90px;
          background: #570916;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px 12px 0 0;

          img {
            width: 80%;
            //height: 100%;
          }

          .PublicJson {
            ::v-deep .PublicJson_ch_rsyj_1 {
              width: 80%;
            }
          }
        }

        .text-box {
          width: 100%;
          height: 30px;
          background-color: #c03326;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #ffffff;
          white-space: nowrap;
          border-radius: 0 0 12px 12px;
        }
      }

      .PresentItem:nth-child(1),
      .PresentItem:nth-child(3) {
        .icon-box {
          > img {
            width: 100%;
          }
        }
      }
    }

    .gift-item_title {
      width: 168px !important;

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
