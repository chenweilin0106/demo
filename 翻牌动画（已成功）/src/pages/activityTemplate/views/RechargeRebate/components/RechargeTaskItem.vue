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
          >({{ itemValue.recharge_nums }}/{{ itemValue.condition }})</span
        >
      </p>
      <!-- 连续充值 -->
      <p v-else>
        <span class="speical_color">累计{{ itemValue.days_cond }}</span
        >天每天充值满{{ itemValue.amount_cond }}元<span class="speical_color">
          ({{ itemValue.reach_days }}/{{ itemValue.days_cond }})</span
        >
      </p>
      <!-- 奖励渲染 -->
      <p v-if="!isLevel5000">
        <template v-for="(item, index) in itemValue.awards">
          <span
            :key="item.type"
            :class="{ goldCard: item.name == '24小时金币卡' }"
          >
            <img
              :class="ButtonStyle(iconStyle, item.type)"
              v-lazy="IconPath(item.icon)"
              alt=""
          /></span>
          {{ awardNumText(item.text, index) }}
        </template>
      </p>
      <!-- 5000档特殊奖励列表渲染 -->
      <div v-else class="PresentList">
        <template v-for="item in itemValue.awards">
          <div
            class="theme_item PresentItem"
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
                <lazy-component v-else class="rsyj_lottie">
                  <PublicJson
                    :lottieJson_name="'ic_ch_rsyj'"
                    :lottieJson="rsyj"
                  ></PublicJson>
                </lazy-component>
              </div>
              <div class="img-bottom text-bottom">+{{ item.text }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 按钮 -->
    <div
      class="RechargeTaskItem_Button theme_botton_undid flex_across"
      @click="getAward(itemValue.has_right, itemValue.condition)"
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
// 人生赢家称号json
import rsyj from '../../../assets/lottie/ic_ch_rsyj/data.json'
// 公用json组件
import PublicJson from '../../../components/PublicJson.vue'
export default {
  name: 'RechargeTaskItem',
  data() {
    return {
      rsyj,
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
        // 1 领取 发送请求
        this.$emit('getAward', id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.RechargeTaskItem {
  width: 332px;
  height: 66px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 12px;
  .reset {
    position: absolute;
    width: 61px;
    height: 34px;
    top: 0;
    right: 0;
    img {
      width: 100%;
    }
  }
  .RechargeTaskItem_LeftContent {
    margin-left: 11px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #fff;
    p:nth-child(1),
    .speical_color {
      font-size: 15px;
      &:nth-last-of-type(1) {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    p:nth-child(2) {
      width: fit-content;
      text-align: center;
      line-height: 24px;
      height: 24px;
      background-color: #1647af;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px 0 6px;
      font-size: 12px;
      span {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        img {
          vertical-align: middle;
          margin-right: 2px;
          width: auto;
          height: 27px;
        }
        &:nth-of-type(2),
        &:nth-of-type(3) {
          > img {
            margin-left: -5px;
            margin-right: 1px;
          }
        }
        .property {
          width: auto !important;
          height: 25px !important;
        }
        .pretty_card {
          width: auto !important;
          height: 30px;
        }
        .hero_tools {
          width: auto !important;
          height: 23px !important;
          margin-right: 0px !important;
        }
      }
      .goldCard {
        > img {
          width: auto !important;
          height: 28px !important;
        }
      }
    }
  }
  // 按钮
  // 去完成
  .RechargeTaskItem_Button {
    z-index: 100;
    position: absolute;
    top: 24px;
    right: 12px;
    width: 62px;
    height: 32px;
    border-radius: 32px;
  }
  // 领取
  .RechargeLevel5000_Button {
    position: relative;
    top: 0;
    left: 0;
    margin: 12px auto 0 !important;
    width: 102px !important;
    height: 32px !important;
    border-radius: 32px !important;
  }
  .titleInfo {
    margin: 10px 0px 10px 12px;
    font-size: 12px;
    // margin-left: 12px;
  }
}
.RechargeLevel5000 {
  height: fit-content;
  margin-bottom: 10px;
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
      margin: 8px 0 4px 11px !important;
      font-size: 15px;
      > span {
        font-size: 15px;
      }
    }
    .PresentList {
      margin-top: 4px;
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      .PresentItem {
        width: 66px;
        height: 66px;
        // margin-right: 5px;
        border-radius: 6px;
        // 图片样式
        .img-box {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .img-top {
            width: 100%;
            height: 45px;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              height: 100%;
            }
            .PublicJson {
              ::v-deep .PublicJsonLottieic_ch_rsyj {
                width: 80%;
              }
            }
          }
          // .img-bottom {
          //   background: #f27335;
          // }
        }
      }
    }
    .gift-item_title {
      width: 82px !important;
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
