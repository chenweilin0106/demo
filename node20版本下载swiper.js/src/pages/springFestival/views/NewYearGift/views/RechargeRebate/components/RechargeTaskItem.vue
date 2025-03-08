<template>
  <div class="RechargeTaskItem" :class="{ RechargeLevel5000: isLevel5000 }">
    <div class="bgc_horizontal_main">
      <div class="RechargeTaskItem_LeftContent">
        <!-- 累计充值 -->
        <p v-if="itemValue.condition">
          <span class="focus-color">累计</span>充值满<span class="focus-color"
            >{{ itemValue.condition }}元</span
          >
          <span class="focus-color"
            >（{{ itemValue.recharge_nums }}/{{ itemValue.condition }}）</span
          >
        </p>
        <!-- 连续充值 -->
        <p v-else>
          <span class="focus-color">累计{{ itemValue.days_cond }}天</span
          >每天充值满{{ itemValue.amount_cond }}元<span class="focus-color">
            （{{ itemValue.reach_days }}/{{ itemValue.days_cond }}）</span
          >
        </p>
        <!-- 奖励渲染 -->
        <p v-if="!isLevel5000" class="award_contain">
          <template v-for="(item, index) in itemValue.awards">
            <span
              :key="index"
              :class="{ goldCard: item.name == '24小时金币卡' }"
            >
              <img
                :class="[ButtonStyle(iconStyle, item.type)]"
                :src="IconPath(item.icon)"
              />
            </span>
            {{ awardNumText(item.text, index) }}
            <span
              v-if="item.name == '元宝'"
              :key="index + 10"
              class="update-icon"
            ></span>
            <span
              v-if="item.name == '元宝'"
              :key="index + 100"
              class="update-text"
            >
              {{ item.text_add }}<i>，</i></span
            >
          </template>
        </p>
        <!-- 5000档特殊奖励列表渲染 -->
        <div v-else class="PresentList">
          <template v-for="(item, index) in itemValue.awards">
            <div
              class="PresentItem"
              :key="index"
              v-if="!(item.name === '威望值')"
              :class="{ 'gift-item_title': item.type === 'title' }"
            >
              <div v-if="index == 0" class="update-text-2">
                <img :src="IconPath('mk2_7.png')" />
                <span>{{ item.text_add }}</span>
              </div>
              <div class="img-box">
                <div class="img-top">
                  <img
                    v-if="item.type !== 'title'"
                    :src="IconPath(item.icon)"
                    alt=""
                  />
                  <div v-else class="rsyj_lottie">
                    <public-json
                      v-if="item.id == '4676'"
                      jsonName="ch_rsyj_1"
                    />
                    <public-json v-else jsonName="ch_zfz1" />
                  </div>
                </div>
                <div class="img-bottom">+{{ item.text }}</div>
              </div>
            </div>
          </template>
        </div>
        <!-- 重置 -->
        <!--<div class="reset" v-if="itemValue.is_daily"></div>-->
      </div>
      <!-- 按钮 -->
      <div
        class="RechargeTaskItem_Button button-noFinish flex-center"
        @click="
          getAward(
            itemValue.has_right,
            itemValue.condition || itemValue.amount_cond
          )
        "
        :class="[
          ButtonStyle('1', itemValue.has_right),
          { RechargeLevel5000_Button: isLevel5000 }
        ]"
      >
        {{ ButtonText('4', itemValue.has_right) }}
      </div>
      <!-- 5000档特殊显示 -->
      <p class="titleInfo" v-if="isLevel5000">
        {{
          itemValue.condition == '20000'
            ? itemValue.awards[3].title_text
            : itemValue.awards[4].text
        }}
      </p>
    </div>
  </div>
</template>

<script>
// 公用json组件
import PublicJson from '../../../../../components/PublicJson'

export default {
  name: 'RechargeTaskItem',
  data() {
    return {
      // 用于添加图标样式
      iconStyle: {
        tool: 'tool',
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
  width: 672px;
  height: 140px;
  margin-bottom: 16px;
  border-radius: 16px;
  background-color: #ffe6a3;
  padding: 4px;
  color: #fff;

  .bgc_horizontal_main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #e55d3e, #f5b93a);
    border-radius: 12px;
  }

  .RechargeTaskItem_LeftContent {
    margin-left: 6px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //color: #fffaa6;

    p:nth-child(1) {
      margin-left: 10px;
      font-size: 30px;
      margin-bottom: 10px;
    }

    .focus-color {
      color: #fffaa6 !important;

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
      background-color: #c7341b;
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px 0 8px;
      font-size: 24px;

      .update-icon {
        width: 34px;
        height: 40px;
        background: url('@/pages/springFestival/assets/mk2_7.png') no-repeat
          left top/100% 100%;
        //margin: 0px;
        margin-left: -10px;
      }

      //.fsjc-class {
      //  margin: 0 -10px;
      //}

      .update-text {
        color: #fffaa6 !important;

        > i {
          color: #fff;
        }
      }

      span {
        height: 100%;
        display: flex;
        align-items: center;

        > img {
          vertical-align: middle;
          margin-right: 0px;
          width: auto;
          height: 52px;
        }

        &:nth-of-type(4),
        &:nth-of-type(5) {
          > img {
            margin-left: -15px;
            //margin-right: 2px;
          }
        }

        .property {
          width: auto !important;
          height: 50px !important;
          margin-right: 2px !important;
        }

        .tool {
          margin-right: -5px !important;
        }

        .pretty_card {
          margin-left: -10px !important;
          width: auto !important;
          height: 70px;
        }

        .hero_tools {
          width: auto !important;
          height: 42px !important;
          margin-right: 0px !important;
        }
      }

      .goldCard {
        > img {
          width: auto !important;
          height: 56px !important;
          margin-right: -2px !important;
        }
      }
    }
  }

  // 按钮
  // 去完成
  .RechargeTaskItem_Button {
    z-index: 100;
    position: absolute;
    top: 34px;
    right: 12px;
    width: 124px;
    height: 64px;
    border-radius: 32px;
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
    color: #fffaa6;
    margin: 10px 0px 15px 24px;
    font-size: 24px;
    line-height: 34px;
    // margin-left: 12px;
  }
}

.RechargeLevel5000 {
  //height: 343px;
  height: fit-content;
  //margin-bottom: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .bgc_horizontal_main {
    //height: 337px;
    height: fit-content;
  }

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
      justify-content: center;
      flex-wrap: nowrap;

      .PresentItem {
        flex-shrink: 0;
        position: relative;
        font-size: 24px;
        overflow: visible;
        margin-left: 22px;
        // 图片样式
        .img-box {
          width: 128px;
          height: 128px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          padding: 4px;
          background-color: #e55d3e;

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
              height: 115%;
            }

            .PublicJson {
              ::v-deep .PublicJson_ch_rsyj_1 {
                width: 80%;
              }
            }
          }

          .img-bottom {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0 0 12px 12px;
            background-color: #c7341b;
          }
        }

        .update-text-2 {
          position: absolute;
          bottom: -45px;
          left: -10px;
          display: flex;
          justify-content: center;
          align-items: center;
          white-space: nowrap;

          > img {
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

        &:nth-of-type(1) {
          margin-left: 0;
          .img-box {
            background-color: #f4c64b;
          }
          .img-bottom {
            background-color: #b46e00;
          }
        }
      }
    }

    .gift-item_title {
      .img-box {
        width: 164px !important;

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
