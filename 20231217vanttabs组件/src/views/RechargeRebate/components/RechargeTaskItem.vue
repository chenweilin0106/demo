<template>
  <div class="RechargeTaskItem" :class="{ RechargeLevel5000: isLevel5000 }">
    <div class="right-icon"></div>
    <div class="RechargeTaskItem_LeftContent">
      <!-- 累计充值 -->
      <p v-if="itemValue.condition">
        <span>累计</span>充值满<span>{{ itemValue.condition }}元</span>
        <span>（{{ itemValue.recharge_nums }}/{{ itemValue.condition }}）</span>
      </p>
      <!-- 连续充值 -->
      <p v-else>
        <span>累计{{ itemValue.days_cond }}</span
        >天每天充值满{{ itemValue.amount_cond }}元<span>
          （{{ itemValue.reach_days }}/{{ itemValue.days_cond }}）</span
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
      :class="[
        'RechargeTaskItem_Button',
        ButtonStyle('1', itemValue.has_right),
        { 'special-button': isLevel5000 }
      ]"
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
  margin-bottom: 24px;
  width: 664px;
  height: 132px;
  background: linear-gradient(90deg, #a16014, #e98e35);
  border: 3px solid #ffc956;
  border-radius: 18px;

  .right-icon {
    position: absolute;
    right: -3px;
    bottom: -3px;
    background: url('@/assets/mk1_9.png') no-repeat left top/100% 100%;
    width: 260px;
    height: 87px;
  }

  .RechargeTaskItem_LeftContent {
    margin-left: 17px;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding-top: 17px;

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
      background-color: #824414;
      padding: 0 12px 0 10px;
      font-size: 24px;
      color: #fff;
      margin-top: 13px;
      margin-left: -5px;
      border-radius: 24px;

      span {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
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
            margin-right: 0px;
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
    top: 45px;
    right: 21px;
    width: 124px;
    height: 64px;
    border-radius: 32px;
  }

  // 领取
  .special-button {
    position: relative;
    top: 0;
    left: 0;
    margin: 25px auto 22px !important;
    width: 204px !important;
    height: 64px !important;
    border-radius: 32px;
  }

  .titleInfo {
    margin: 8px 0px 10px 19px;
    font-size: 24px;
    color: #fffaa6;
  }
}

.RechargeLevel5000 {
  margin-bottom: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 343px;

  .RechargeTaskItem_LeftContent {
    width: 100%;
    justify-content: flex-start;
    color: #fff;
    margin-left: 0px;

    p {
      margin: 0px 0 8px 19px !important;
      font-size: 30px;

      > span {
        font-size: 28px;
      }
    }

    .PresentList {
      margin-top: 4px;
      //padding: 0 30px 0 16px;
      display: flex;
      width: 100%;
      justify-content: space-evenly;

      .PresentItem {
        display: flex;
        flex-direction: column;
        width: 128px;
        height: 128px;
        background: #d38232;
        padding: 4px;
        border-radius: 16px;
        // 图片样式
        .icon-box {
          width: 100%;
          height: 90px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px 12px 0 0;

          img {
            width: 90%;
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
          flex: 1;
          background-color: #824414;
          border-radius: 0 0 12px 12px;
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
