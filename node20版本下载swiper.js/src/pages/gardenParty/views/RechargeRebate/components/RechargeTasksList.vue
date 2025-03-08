<template>
  <transition-group class="rechargeTasksList flex-column align-center" :name="transitionClass" tag="ul">
    <div
      v-for="rechargeAward in totalList"
      :key="rechargeAward.condition || rechargeAward.amount_cond"
      :class="['RechargeTaskItem', { RechargeLevel5000: isLevel5000(rechargeAward.condition) }]"
    >
      <div class="bgc_horizontal_main">
        <div class="RechargeTaskItem_LeftContent">
          <!-- 累计充值 -->
          <p v-if="rechargeAward.condition">
            <span class="focus-color">累计</span>充值满<span class="focus-color">{{ rechargeAward.condition }}元</span>
            <span class="focus-color">（{{ rechargeAward.recharge_nums }}/{{ rechargeAward.condition }}）</span>
          </p>
          <!-- 连续充值 -->
          <p v-else>
            <span class="focus-color">累计{{ rechargeAward.days_cond }}天</span>每天充值满{{ rechargeAward.amount_cond }}元<span class="focus-color">
              （{{ rechargeAward.reach_days }}/{{ rechargeAward.days_cond }}）</span
            >
          </p>
          <!-- 奖励渲染 -->
          <p v-if="!isLevel5000(rechargeAward.condition)" class="award_contain">
            <template v-for="(item, index) in rechargeAward.awards">
              <span :key="index" :class="{ goldCard: item.name == '24小时金币卡' }">
                <img :class="[ButtonStyle(iconStyle, item.type)]" :src="IconPath(item.icon)" />
              </span>
              +{{ item.text }}{{ index != rechargeAward.awards.length - 1 ? '，' : '' }}
              <span v-if="item.name == '元宝'" :key="index + 10" class="update-icon"></span>
              <span v-if="item.name == '元宝'" :key="index + 100" class="update-text"> {{ item.text_add }}<i>，</i></span>
            </template>
          </p>
          <!-- 5000档特殊奖励列表渲染 -->
          <div v-else class="PresentList">
            <template v-for="(item, index) in rechargeAward.awards">
              <div class="PresentItem" :key="index" v-if="!(item.name === '威望值')" :class="{ 'gift-item_title': item.type === 'title' }">
                <div v-if="index == 0" class="update-text-2">
                  <img :src="IconPath('mk2_7.png')" />
                  <span>{{ item.text_add }}</span>
                </div>
                <div class="img-box">
                  <div class="img-top">
                    <img v-if="item.type !== 'title'" :src="IconPath(item.icon)" alt="" />
                    <div v-else class="rsyj_lottie">
                      <public-json v-if="item.id == '4676'" jsonName="ch_rsyj_1" />
                      <public-json v-else jsonName="ch_zfz1" />
                    </div>
                  </div>
                  <div class="img-bottom">+{{ item.text }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
          class="RechargeTaskItem_Button button-noFinish flex-center"
          :class="[ButtonStyle('1', rechargeAward.has_right), { RechargeLevel5000_Button: isLevel5000(rechargeAward.condition) }]"
          @click="receiveAward(rechargeAward)"
        >
          {{ ButtonText('4', rechargeAward.has_right) }}
        </div>
        <!-- 5000档特殊显示 -->
        <p class="titleInfo" v-if="isLevel5000(rechargeAward.condition)">
          {{ rechargeAward.condition == '20000' ? rechargeAward.awards[3].title_text : rechargeAward.awards[4].text }}
        </p>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { getPageData } from '@/pages/gardenParty/api'
import { _throttle } from '@/pages/gardenParty/utils/tool'
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'

export default {
  components: { PublicJson },
  props: ['RechargeGiftListData', 'transitionClass'],
  data() {
    return {
      // transitionClassName: 'noTransition',
      // 用于添加图标样式
      iconStyle: Object.freeze({ tool: 'tool', property: 'property', pretty_card: 'pretty_card', hero_tools: 'hero_tools' })
    }
  },
  computed: {
    consumeStatusArray() {
      return Object.values(this.RechargeGiftListData) // 累积消费返利列表数据类型转换
    },
    unFinishList() {
      return this.consumeStatusArray.filter((item) => item.has_right == 0 || item.has_right == 1)
    },
    finishList() {
      return this.consumeStatusArray.filter((item) => item.has_right == 2)
    },
    totalList() {
      return this.unFinishList.concat(this.finishList)
    }
  },
  watch: {
    // transitionClass(value) {
    //   this.changeTransitionClass(value)
    // }
  },
  methods: {
    // changeTransitionClass(value) {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       this.transitionClassName = value
    //       resolve(true)
    //     }, 0)
    //   })
    // },
    isLevel5000(condition) {
      return condition >= 5000 // 特殊样式判断
    },
    receiveAward: _throttle(async function ({ has_right, condition, amount_cond }) {
      if (!has_right) {
        this.$emit('recharge') // 0 去充值 跳转充值界面
      } else if (has_right == 1) {
        const params = { mark: condition || amount_cond, type: condition ? 'recharge_reward' : 'recharge_accruing_reward' }
        const res = await getPageData(params)
        this.$toast(res.errmsg)
        res.errno == 0 && this.$emit('updateRechargeData', params.mark)
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.noTransition-move {
  transition: none;
}
.hasTransition-move {
  transition: all 0.7s;
}
.rechargeTasksList {
  padding-top: 15px;
}
.RechargeTaskItem {
  position: relative;
  width: 672px;
  height: 140px;
  margin-bottom: 16px;
  border-radius: 16px;
  background-color: #ffcfea;
  padding: 4px;
  color: #fff;

  .bgc_horizontal_main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #8ab3ff, #cfbced, #ffbed6);
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
      background: #7c81e1;
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px 0 8px;
      font-size: 24px;

      .update-icon {
        width: 34px;
        height: 40px;
        background: url('@/pages/valentineDay/assets/mk2_7.png') no-repeat left top/100% 100%;
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
    font-size: 28px;
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
          background-color: #ffd0e7;

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
            background-color: #cb6d95;
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
