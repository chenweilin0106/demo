<template>
  <div class="RechargeTaskItem" :class="{ RechargeLevel5000: isLevel5000 }">
    <div class="RechargeTaskItem_LeftContent h-100 flex-column justify-center">
      <!-- 累计充值 -->
      <p v-if="itemValue.condition">
        <span>累计</span>充值满<span>{{ itemValue.condition }}元</span>
        <span>（{{ itemValue.recharge_nums }}/{{ itemValue.condition }}）</span>
      </p>
      <!-- 连续充值 -->
      <p v-else>
        <span>累计{{ itemValue.days_cond }}</span
        >天每天充值满{{ itemValue.amount_cond }}元<span>（{{ itemValue.reach_days }}/{{ itemValue.days_cond }}）</span>
      </p>
      <!-- 奖励渲染 -->
      <p v-if="!isLevel5000" class="award_contain flex-center">
        <template v-for="(item, index) in itemValue.awards">
          <span :key="item.type" :class="{ goldCard: item.name == '24小时金币卡' }"> <img :class="ButtonStyle(iconStyle, item.type)" :src="IconPath(item.icon)" alt="" /></span>
          {{ awardNumText(item.text, index) }}
          <span v-if="item.name == '元宝'" :key="index + 10" class="update-icon"></span>
          <span v-if="item.name == '元宝'" :key="index + 100" class="update-text"> {{ item.text_add }}， </span>
        </template>
      </p>
      <!-- 5000档特殊奖励列表渲染 -->
      <div v-else class="PresentList">
        <template v-for="(item, index) in itemValue.awards">
          <div :key="item.name" v-if="!(item.name === '威望值')" :class="['PresentItem flex-column', 'position-relative', { 'gift-item_title': item.type === 'title' }]">
            <div v-if="index == 0" class="update-text-2">
              <img :src="IconPath('mk2_7.png')" />
              <span>{{ item.text_add }}</span>
            </div>
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
      <!-- 按钮 -->
      <div class="RechargeTaskItem_Button position-absolute" :class="['flex-center', this.ButtonStyle('1', this.itemValue.has_right), this.isLevel5000 && 'special-button']" @click="getAward(itemValue.has_right, itemValue.condition || itemValue.amount_cond)">
        {{ ButtonText('4', itemValue.has_right) }}
      </div>
      <!-- 5000档特殊显示 -->
      <p class="titleInfo" v-if="isLevel5000">
        {{ itemValue.awards[4].text }}
      </p>
    </div>
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
        return `+${text}${index !== this.itemValue.awards.length - 1 ? '，' : ''}`
      }
    },
    // 判断是否5000档
    isLevel5000() {
      return this.itemValue.condition >= 5000
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
  width: 684px;
  height: 136px;
  margin-bottom: 21px;
  background: linear-gradient(-90deg, #f6ced1, #f696a8);
  border-radius: 16px;
  border: 2px solid #d97683;

  .RechargeTaskItem_LeftContent {
    margin-left: 12px;
    color: #fff;

    p:nth-child(1),
    span {
      font-size: 30px;

      span {
        color: #fff79a;
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
      background-color: #df7472;
      border-radius: 25px;
      padding: 0 10px 0 12px;
      font-size: 24px;
      color: #fff79a;
      margin-top: 17px;
      margin-left: -5px;

      .update-icon {
        width: 34px;
        height: 40px;
        background: url('@/pages/valentineDay/assets/mk2_7.png') no-repeat left top/100% 100%;
        //margin: 0px;
        margin-left: -15px;
      }

      .fsjc-class {
        margin: 0 -10px;
      }

      .update-text {
        font-size: 24px;
        color: #fffaa6 !important;

        > i {
          color: #fff;
        }
      }

      span {
        height: 100%;
        display: flex;
        align-items: center;

        img {
          vertical-align: middle;
          //margin-right: 4px;
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
          margin-left: -6px;
        }

        .pretty_card {
          width: auto !important;
          height: 70px;
          margin-left: 0px !important;
        }

        .hero_tools {
          width: auto !important;
          height: 48px !important;
          margin-right: -3px !important;
          margin-left: -5px;
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
          margin-left: -10px;
          margin-right: -2px;
        }
      }
    }
  }

  // 按钮
  // 去完成
  .RechargeTaskItem_Button {
    z-index: 100;
    top: 45px;
    right: 8px;
    width: 126px;
    height: 66px;
    border-radius: 33px;
    font-size: 28px;
  }

  // 领取
  .special-button {
    position: relative;
    top: 0;
    left: 0;
    transform: translateY(0);
    margin: 27px auto 18px !important;
    width: 286px;
    height: 78px;
    border-radius: 39px;
    font-weight: 500;
    font-size: 32px;
  }

  .titleInfo {
    margin: 0px 0px 10px 23px !important;
    font-size: 24px !important;
    color: #fffaa6;
  }
}

.RechargeLevel5000 {
  //margin-bottom: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 364px;

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
        width: 128px;
        height: 128px;
        background: #f6cacf;
        padding: 4px;
        border-radius: 16px;

        .update-text-2 {
          position: absolute;
          bottom: -45px;
          left: -10px;
          display: flex;
          justify-content: center;
          align-items: center;
          white-space: nowrap;

          > img {
            margin-right: 10px;
            width: 33px;
            height: 40px;
          }

          > span {
            font-size: 24px;
            font-weight: 500;
            color: #ffed51;
            transform: translate(-5px, 3px) scale(0.91);
          }
        }
        // 图片样式
        .icon-box {
          width: 100%;
          height: 90px;
          background: #ffeff3;
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
          flex: 1;
          background-color: #c16d6f;
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
