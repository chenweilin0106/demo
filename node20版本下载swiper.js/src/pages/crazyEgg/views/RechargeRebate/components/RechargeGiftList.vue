<template>
  <transition-group :name="transitionClass" tag="ul" class="RechargeGiftList">
    <!-- 充值列表子组件 -->
    <div
      v-for="rechargeAward in totalList"
      :key="rechargeAward.condition || rechargeAward.amount_cond"
      :class="['RechargeTaskItem margin-row-center', { RechargeLevel5000: isLevel5000(rechargeAward.condition) }]"
    >
      <div class="RechargeTaskItem_LeftContent">
        <!-- 累计充值 -->
        <p v-if="rechargeAward.condition">
          <span class="">累计</span>充值满<span class="">{{ rechargeAward.condition }}元</span>
          <span class="speical_color">（{{ rechargeAward.recharge_nums }}/{{ rechargeAward.condition }}）</span>
        </p>
        <!-- 连续充值 -->
        <p v-else>
          <span class="">累计{{ rechargeAward.days_cond }}</span
          >天每天充值满{{ rechargeAward.amount_cond }}元<span class="speical_color">
            （{{ rechargeAward.reach_days }}/{{ rechargeAward.days_cond }}）</span
          >
        </p>
        <!-- 奖励渲染 -->
        <div v-if="!isLevel5000(rechargeAward.condition)" class="award_contain line-height-100 flex align-center">
          <div class="award-line flex align-center" v-for="(item, index) in rechargeAward.awards" :key="index">
            <span class="flex align-center">
              <img :src="IconPath(item.icon)" alt="" />
              +{{ item.text }}
              <template v-if="item.name == '元宝'">
                <i>,</i>
                <i :key="index + 10" class="update-icon"></i>
                <span :key="index + 100" class="update-text"> {{ item.text_add }}</span>
              </template>
            </span>
          </div>
        </div>
        <!-- 5000档特殊奖励列表渲染 -->
        <div v-else class="PresentList">
          <template v-for="item in rechargeAward.awards">
            <div
              class="PresentItem position-relative"
              :key="item.name"
              v-if="!(item.name === '威望值')"
              :class="{ 'gift-item_title': item.type === 'title' }"
            >
              <div v-if="item.text_add" class="update-text-2">
                <img :src="IconPath('mk2_15.png')" />
                <span>{{ item.text_add }}</span>
              </div>
              <div class="img-box">
                <div class="img-top">
                  <img v-if="item.type !== 'title'" :src="IconPath(item.icon)" alt="" />
                  <div v-else class="rsyj_lottie">
                    <PublicImg :imgName="'ch_rsyj_1'" imgType="title" />
                  </div>
                </div>
                <div class="img-bottom">+{{ item.text }}</div>
              </div>
            </div>
          </template>
          <!-- 按钮 -->
          <div
            v-if="isLevel5000(rechargeAward.condition)"
            class="RechargeTaskItem_Button theme_botton_undid flex_across"
            @click="receiveAward(rechargeAward)"
            :class="[
              ButtonStyle('GoodsTask', rechargeAward.has_right),
              { RechargeLevel5000_Button: isLevel5000(rechargeAward.condition) },
              { 'RechargeTaskItem_Button-special': !RechargeGiftListData[5000] }
            ]"
          >
            {{ ButtonText('rechargeStatus', rechargeAward.has_right) }}
          </div>
        </div>
        <div
          v-if="!isLevel5000(rechargeAward.condition)"
          class="RechargeTaskItem_Button theme_botton_undid flex_across"
          @click="receiveAward(rechargeAward)"
          :class="[
            ButtonStyle('GoodsTask', rechargeAward.has_right),
            { RechargeLevel5000_Button: isLevel5000(rechargeAward.condition) },
            { 'RechargeTaskItem_Button-special': !RechargeGiftListData[5000] }
          ]"
        >
          {{ ButtonText('rechargeStatus', rechargeAward.has_right) }}
        </div>
      </div>
      <!-- 5000档特殊显示 -->
      <p class="titleInfo" v-if="isLevel5000(rechargeAward.condition)">
        {{ rechargeAward.awards[3].text }}
      </p>
    </div>
  </transition-group>
</template>

<script>
import { _throttle } from '@/pages/crazyEgg/utils/tool'
import { getPageData } from '@/pages/crazyEgg/api/index'
export default {
  name: 'RechargeGiftList',
  props: ['RechargeGiftListData', 'transitionClass'],
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
  methods: {
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
.hasTransition-move {
  transition: transform 0.7s;
}
.noTransition-move {
  transition: none;
}
.RechargeGiftList {
  .RechargeTaskItem {
    position: relative;
    width: 664px;
    height: 136px;
    margin-bottom: 21px;
    padding: 3px;
    background: url('@/pages/crazyEgg/assets/bg_1.png') no-repeat left top/100% auto;

    .RechargeTaskItem_LeftContent {
      margin-left: 22px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0;
      //color: #fffaa6;

      p:nth-child(1) {
        color: #692e19;
        font-size: 30px;
        line-height: 100%;
      }

      .speical_color {
        color: #c35716 !important;
        &:nth-last-of-type(1) {
          font-size: 28px;
          margin-left: -10px;
        }
      }
      .award_contain {
        height: 48px;
        margin-left: -5px;
        padding: 0 20px 0 0;
        font-size: 24px;
        .award-line {
          height: 37px;
          margin-right: 20px;
          border-radius: 10px;
          font-size: 24px;
          font-weight: 500;
          color: #c35716;
          background: linear-gradient(90deg, rgba(255, 184, 152, 0), rgba(255, 184, 152, 0.76));
          padding-right: 13px;
        }
        span {
          height: 100%;
          img {
            width: auto;
            height: 52px;
          }
        }
        .update-icon {
          width: 34px;
          height: 40px;
          background: url('@/pages/crazyEgg/assets/mk2_15.png') no-repeat left top/100% 100%;
          //margin-left: -10px;
        }
        .update-text {
          display: flex;
          align-items: center;
        }
      }
    }

    // 按钮
    // 去完成
    .RechargeTaskItem_Button {
      z-index: 100;
      position: absolute;
      top: 8px;
      right: 24px;
      width: 124px;
      height: 64px;
      border-radius: 64px;
    }
    .RechargeTaskItem_Button-special {
      top: 50%;
      transform: translateY(-50%);
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
      margin: 45px 0 14px 24px;
      font-size: 24px;
      // margin-left: 12px;
    }
  }
  .RechargeLevel5000 {
    width: 664px;
    height: 304px;
    //margin-bottom: 40px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: url('@/pages/crazyEgg/assets/bg_8.png') no-repeat left top/100% 100%;

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
        margin-top: 0;
        display: flex;
        width: 100%;
        justify-content: center;
        padding: 0 20px;
        flex-wrap: nowrap;

        .PresentItem {
          flex-shrink: 0;
          width: 128px;
          height: 128px;
          margin-right: 16px;
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

              .rsyj_lottie {
                width: 130px;
                height: 60px;
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

          &:last-child {
            margin-right: 0;
          }

          .update-text-2 {
            position: absolute;
            bottom: -35px;
            left: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;

            > img {
              width: 19px;
              height: 24px;
            }

            > span {
              font-size: 20px;
              color: #692e19;
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
}
</style>
