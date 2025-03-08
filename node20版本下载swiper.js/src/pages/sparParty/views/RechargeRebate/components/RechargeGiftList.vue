<template>
  <transition-group class="RechargeGiftList" :name="transitionClass" tag="ul">
    <div
      v-for="rechargeAward in totalList"
      :key="rechargeAward.condition || rechargeAward.amount_cond"
      class="RechargeTaskItem"
      :class="{ RechargeLevel5000: isLevel5000(rechargeAward.condition) }"
    >
      <div class="RechargeTaskItem_LeftContent">
        <!-- 累计充值 -->
        <p v-if="rechargeAward.condition">
          <span>累计</span>充值满<span>{{ rechargeAward.condition }}元</span>
          <span>（{{ rechargeAward.recharge_nums }}/{{ rechargeAward.condition }}）</span>
        </p>
        <!-- 连续充值 -->
        <p v-else>
          <span>累计{{ rechargeAward.days_cond }}</span
          >天每天充值满{{ rechargeAward.amount_cond }}元<span>（{{ rechargeAward.reach_days }}/{{ rechargeAward.days_cond }}）</span>
        </p>
        <!-- 奖励渲染 -->
        <div v-if="!isLevel5000(rechargeAward.condition)" class="award_contain line-height-100 flex-center">
          <div class="award-line flex align-center" v-for="(item, index) in rechargeAward.awards" :key="index">
            <span class="flex align-center">
              <img :src="IconPath(item.icon)" alt="" />
              +{{ item.text + (index == rechargeAward.awards.length - 1 ? '' : ',') }}
              <template v-if="item.name == '元宝'">
                <i :key="index + 10" class="update-icon"></i>
                <span :key="index + 100" class="update-text"> {{ item.text_add }}</span
                ><i>,</i>
              </template>
            </span>
          </div>
        </div>
        <!-- 5000档特殊奖励列表渲染 -->
        <div v-else class="PresentList">
          <template v-for="item in rechargeAward.awards">
            <div :key="item.name" v-if="!(item.name === '威望值')" :class="['PresentItem', { 'gift-item_title': item.type === 'title' }]">
              <div v-if="item.text_add" class="update-text-2">
                <img :src="IconPath('mk2_15.png')" />
                <span>{{ item.text_add }}</span>
              </div>
              <div class="icon-box">
                <PublicImg :imgName="item.icon == 'ch_rsyj.gif' ? 'ch_rsyj_1' : item.icon" />
              </div>
              <div class="text-box flex-center">+{{ item.text }}</div>
            </div>
          </template>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="RechargeTaskItem_Button" :class="['flex-center', ButtonStyle('1', rechargeAward.has_right)]" @click="receiveAward(rechargeAward)">
        {{ ButtonText('4', rechargeAward.has_right) }}
      </div>
      <!-- 5000档特殊显示 -->
      <p class="titleInfo" v-if="isLevel5000(rechargeAward.condition)">
        {{ rechargeAward.awards[3].text }}
      </p>
    </div>
  </transition-group>
</template>

<script>
import { getPageData } from '../../../api/index'
import { _throttle } from '@/pages/skillGift/utils/tool'
import PublicImg from '@/pages/skillGift/components/publicImg.vue'
export default {
  name: 'RechargeGiftList',
  props: ['RechargeGiftListData', 'transitionClass'],
  components: { PublicImg },
  data() {
    return {
      iconStyle: Object.freeze({
        gamegold: 'gamegold',
        142: 'fsjc',
        4: 'hero_tools',
        159: 'hjcbt',
        158: 'cbt',
        2: 'ljs',
        0: 'jbk'
      })
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
    },
    buttonStyle() {
      return (itemValue) => {
        return [
          {
            [this.ButtonStyle('1', itemValue.has_right)]: !this.isLevel5000(itemValue.condition)
          }
        ]
      }
    },
    awardNumText() {
      return (text, index) => {
        return `+${text}${index !== 3 ? '，' : ''}` // 奖励数量文本
      }
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
.RechargeGiftList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.RechargeTaskItem {
  position: relative;
  width: 664px;
  height: 140px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  background: url('@/pages/sparParty/assets/mk1_1.png') no-repeat left top/100% 100%;

  .RechargeTaskItem_LeftContent {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding-top: 23px;

    p:nth-child(1) {
      font-size: 30px;

      span {
        color: #fffaa6;
      }

      &:nth-last-of-type(1) {
        font-size: 28px;
        //margin-left: -8px;
      }
    }

    .award_contain {
      width: fit-content;
      text-align: center;
      line-height: 48px;
      height: 52px;
      background: #103469;
      border-radius: 26px;
      padding: 0 8px;
      font-size: 24px;
      color: #fff;
      margin-top: 17px;
      .award-line {
        height: 37px;
        //margin-right: 20px;
        //padding-right: 13px;
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
    top: 15px;
    right: 10px;
    width: 140px;
    height: 64px;
  }

  .titleInfo {
    margin: 38px 0 0 23px;
    font-size: 24px;
    color: #fffaa6;
  }
}
.RechargeLevel5000 {
  margin-bottom: 16px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 267px;
  background: url('@/pages/sparParty/assets/mk2_9.png') no-repeat left top/100% 100%;

  .RechargeTaskItem_LeftContent {
    width: fit-content;
    color: #fff;
    margin-left: 0;

    p {
      margin: 0 0 8px 22px !important;
      font-size: 30px;

      > span {
        font-size: 28px;
      }
    }
    .PresentList {
      margin-top: 6px;
      padding: 0 30px 0 16px;
      display: flex;
      width: 100%;
      .update-text-2 {
        position: absolute;
        bottom: 46px;
        left: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        font-size: 20px;
        color: #fffaa6;
        > img {
          width: 20px;
          height: 24px;
        }
      }
      .PresentItem {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        width: 120px;
        height: 120px;
        background: linear-gradient(to bottom, #103469 73%, #1b4e8b 27%);
        box-shadow: inset 0 0 5px 3px #fff;
        &:first-child {
          margin-left: 4px;
        }
        // 图片样式
        .icon-box {
          width: 100%;
          height: 88px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 100%;
          }
          .rsyj_lottie {
            width: 90%;
          }
        }

        .text-box {
          flex: 1;
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #ffffff;
          white-space: nowrap;
        }
      }
    }
    .gift-item_title {
      width: 168px !important;
      .imgCompo {
        width: 130px;
        height: 60px;
      }
    }
  }
  .RechargeTaskItem_Button {
    margin-top: 34px;
  }
}
</style>
