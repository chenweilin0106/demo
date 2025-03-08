<template>
  <transition-group class="rechargeTasksList flex-column align-center" tag="ul" :name="transitionClass">
    <PublicCard
      v-for="rechargeAward in totalList"
      :key="rechargeAward.condition || rechargeAward.amount_cond"
      :class="['RechargeTaskItem', { RechargeLevel5000: isLevel5000(rechargeAward.condition) }]"
    >
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
            <span :key="index">
              <img :class="iconStyle[item.id || item.tool_id]" :src="IconPath(item.icon)" />
              +{{ item.text }}{{ index != rechargeAward.awards.length - 1 ? '，' : '' }}
            </span>
            <i v-if="item.name == '元宝'" :key="index + 10" class="update-icon"></i>
            <span v-if="item.name == '元宝'" :key="index + 100" class="update-text"> {{ item.text_add }}<i>，</i></span>
          </template>
        </p>
        <!-- 5000档特殊奖励列表渲染 -->
        <div v-else class="PresentList">
          <template v-for="(item, index) in rechargeAward.awards">
            <div class="PresentItem" :key="index" v-if="!(item.name === '威望值')" :class="{ 'gift-item_title': item.type === 'title' }">
              <div v-if="index == 0" class="update-text-2">
                <img :src="IconPath('mk2_16.png')" />
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
      <PublicButton
        class="RechargeTaskItem_Button"
        :class="[
          ButtonStyle('1', rechargeAward.has_right),
          { RechargeLevel5000_Button: isLevel5000(rechargeAward.condition) },
          { 'RechargeTaskItem_Button-special': !RechargeGiftListData[5000] }
        ]"
        @click="receiveAward(rechargeAward)"
      >
        {{ ButtonText(awardButtonText, rechargeAward.has_right) }}
      </PublicButton>
      <!-- 5000档特殊显示 -->
      <p class="titleInfo" v-if="isLevel5000(rechargeAward.condition)">
        {{ rechargeAward.condition == '20000' ? rechargeAward.awards[3].title_text : rechargeAward.awards[4].text }}
      </p>
    </PublicCard>
  </transition-group>
</template>

<script>
import PublicCard from '@/pages/mayDay2024/components/publicCard.vue'
import PublicJson from '@/pages/mayDay2024/components/publicJson.vue'
import PublicButton from '@/pages/mayDay2024/components/publicButton.vue'
import buttonMixin from '@/pages/mayDay2024/mixins/buttonMixin'
import { getPageData } from '@/pages/mayDay2024/api'
import { _throttle } from '@/pages/mayDay2024/utils/tool'

export default {
  components: { PublicButton, PublicJson, PublicCard },
  mixins: [buttonMixin],
  props: ['RechargeGiftListData', 'transitionClass'],
  data() {
    return {
      awardButtonText: Object.freeze({ 0: '去完成', 1: '领取', 2: '已领取' }),
      // 用于添加图标样式
      iconStyle: Object.freeze({ 142: 'fsjc', 4: 'hero_tools', 2: 'ljs' })
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
.noTransition-move {
  transition: none;
}
.hasTransition-move {
  transition: all 0.7s;
}
.rechargeTasksList {
}
.RechargeTaskItem {
  position: relative;
  width: 684px;
  height: 142px;
  margin-bottom: 14px;
  color: #fff;
  .RechargeTaskItem_LeftContent {
    margin-left: 22px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p:nth-child(1) {
      //margin-left: 10px;
      font-size: 30px;
      margin-bottom: 24px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px 0 8px;
      font-size: 24px;
      border-image-source: url('@/pages/mayDay2024/assets/mk2_6.png');
      border-image-slice: 0 24 0 24 fill;
      border-image-width: 0 24px 0 24px;
      .update-icon {
        width: 34px;
        height: 40px;
        background: url('@/pages/mayDay2024/assets/mk2_15.png') no-repeat left top/100% 100%;
      }
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
        margin-right: -0.5em;
        > img {
          vertical-align: middle;
          margin-right: 0;
          width: auto;
          height: 52px;
        }
        .fsjc {
          margin: 0 -10px;
        }
        .hero_tools {
          height: 45px;
        }
        .ljs {
          height: 40px;
        }
      }
    }
  }
  // 按钮
  .RechargeTaskItem_Button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 116px;
    height: 56px;
    font-size: 28px;
  }
  .RechargeTaskItem_Button-special {
    top: 50%;
    transform: translateY(-50%);
  }
  // 领取
  .RechargeLevel5000_Button {
    position: relative;
    top: 0;
    right: 0;
    transform: none;
    margin: 24px auto 0;
    width: 256px;
    height: 83px;
    font-weight: 600;
    font-size: 32px;
  }
  .titleInfo {
    color: #fffaa6;
    margin: 10px 0 15px 24px;
    font-size: 24px;
    line-height: 34px;
  }
}
.RechargeLevel5000 {
  //height: 343px;
  height: fit-content;
  //margin-bottom: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
          padding: 2px;
          background-color: #a2fffd;
          .img-top {
            width: 100%;
            height: 90px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 14px 14px 0 0;
            img {
              // width: 100%;
              height: 115%;
            }
            .PublicJson {
              ::v-deep .json_box {
                width: 80%;
              }
            }
          }
          .img-bottom {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0 0 14px 14px;
            background-color: #0668e1;
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
  .button-receive {
    background-image: url('@/pages/mayDay2024/assets/btn_6.png');
  }
  .button-noFinish {
    background-image: url('@/pages/mayDay2024/assets/btn_5.png');
  }
  .button-finish {
    background-image: url('@/pages/mayDay2024/assets/btn_7_1.png');
  }
}
</style>
