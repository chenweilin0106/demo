<template>
  <div
    class="RechargeTaskItem bgc_horizontal"
    :class="{ RechargeLevel5000: isLevel5000 }"
  >
    <div class="RechargeTaskItem_LeftContent">
      <!-- 累计充值 -->
      <p v-if="itemValue.condition">
        <span class="speical_color">累计</span>充值满<span class="speical_color"
          >{{ itemValue.condition }}元</span
        >
        <span class="speical_color"
          >（{{ itemValue.recharge_nums }}/{{ itemValue.condition }}）</span
        >
      </p>
      <!-- 连续充值 -->
      <p v-else>
        <span class="speical_color">累计{{ itemValue.days_cond }}</span
        >天每天充值满{{ itemValue.amount_cond }}元<span class="speical_color">
          （{{ itemValue.reach_days }}/{{ itemValue.days_cond }}）</span
        >
      </p>
      <!-- 奖励渲染 -->
      <p v-if="!isLevel5000" class="award_contain">
        <template v-for="item in itemValue.awards.slice(0, 1)">
          <span
            :key="item.type"
            :class="{ goldCard: item.name == '24小时金币卡' }"
          >
            <img
              :class="ButtonStyle(iconStyle, item.type)"
              :src="IconPath(item.icon)"
              alt=""
          /></span>
          +{{ item.text }}，
        </template>
        <template v-if="itemValue.condition">
          <span> <img class="add" :src="IconPath('mk2_7.png')" alt="" /></span>
          <i class="yellow">{{ itemValue.awards[0].text_add }}，</i>
        </template>
        <template v-for="(item, index) in itemValue.awards.slice(1, 3)">
          <span
            :key="item.type"
            :class="{ goldCard: item.name == '24小时金币卡' }"
          >
            <img
              :class="ButtonStyle(iconStyle, item.type)"
              :src="IconPath(item.icon)"
              alt=""
          /></span>
          {{ awardNumText(item.text, index + 1) }}
        </template>
      </p>
      <!-- 5000档特殊奖励列表渲染 -->
      <div v-else class="PresentList">
        <template v-for="(item, index) in itemValue.awards">
          <div
            class="theme_item PresentItem"
            :key="item.name"
            v-if="!(item.name === '威望值')"
            :class="{ 'gift-item_title': item.type === 'title' }"
          >
            <div class="add_value" v-if="index == 0">
              <img src="../../../assets/mk2_7.png" alt="" />{{ item.text_add }}
            </div>
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
    <p class="speical_color titleInfo" v-if="isLevel5000">
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
        return `+${text}${
          index !== this.itemValue.awards.length - 1 ? '，' : ''
        }`
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
  width: 668px;
  height: 132px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  border-radius: 12px;
  border: 2px solid #fbe9ff;
  // .reset {
  //   position: absolute;
  //   width: 60px;
  //   height: 33px;
  //   top: 0;
  //   right: 0;
  //   background: url('../../../assets/mk2_1.png') no-repeat top center/100% auto;
  // }
  .RechargeTaskItem_LeftContent {
    margin-left: 22px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    // color: #fff;
    p:nth-child(1),
    .speical_color {
      font-size: 30px;
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
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px 0 11px;
      font-size: 24px;
      margin-top: 15px;
      margin-left: -9px;

      .add {
        width: 33px;
        height: 40px;
        margin-right: 4px !important;
        // margin-left: -14px;
      }
      span {
        height: 100%;
        display: flex;
        align-items: center;
        img {
          vertical-align: middle;
          margin-right: 4px;
          width: auto;
          height: 43px;
        }
        &:nth-of-type(2),
        &:nth-of-type(3),
        &:nth-of-type(4) {
          margin-left: -15px;

          > img {
            margin-right: -4px;
          }
        }

        .property {
          width: auto !important;
          height: 43px !important;
        }
        .pretty_card {
          width: auto !important;
          height: 70px;
          margin-right: 4px !important;
        }
        .hero_tools {
          width: auto !important;
          height: 43px !important;
          margin-right: 0px !important;
        }
      }
      .yellow {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fffaa6;
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
    top: 33px;
    right: 11px;
    width: 124px;
    height: 64px;
    border-radius: 64px;
  }
  // 领取
  .RechargeLevel5000_Button {
    position: relative;
    top: 0;
    left: 0;
    margin: 24px auto 0 !important;
    width: 204px !important;
    height: 64px !important;
    border-radius: 64px !important;
  }
  .titleInfo {
    margin: 20px 0px 20px 24px;
    font-size: 24px;
    // margin-left: 12px;
  }
}
.RechargeLevel5000 {
  height: fit-content;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  .RechargeTaskItem_LeftContent {
    width: 100%;
    height: fit-content;
    justify-content: flex-start;
    color: #fff;
    margin-left: 0px;
    p {
      margin: 16px 0 8px 22px !important;
      font-size: 30px;
      > span {
        font-size: 30px;
      }
    }
    .PresentList {
      margin-top: 8px;
      display: flex;
      width: 100%;
      justify-content: center;
      flex-wrap: nowrap;
      .PresentItem {
        flex-shrink: 0;
        width: 132px;
        height: 132px;
        margin-left: 16px;
        border-radius: 18px;
        position: relative;
        overflow: visible;
        .add_value {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffea8a;
          white-space: nowrap;
          bottom: -54px;

          > img {
            width: 33px;
            height: 40px;
            margin-right: 3px;
          }
        }
        // 图片样式
        .img-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
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
            border-radius: 0 0 12px 12px;
          }
        }

        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
      .PresentItem:first-child {
        border: 4px solid #f4c064;
        .img-box {
          .img-bottom {
            border-radius: 0 0 12px 12px;
            background: #af7110;
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
}
</style>
