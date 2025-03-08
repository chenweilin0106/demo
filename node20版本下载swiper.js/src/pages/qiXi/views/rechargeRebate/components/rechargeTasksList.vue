<template>
  <transition-group class="rechargeTasksList flex-column align-center" :name="transitionClass" tag="ul">
    <PublicCard
      v-for="rechargeAward in totalList"
      :key="rechargeAward.condition || rechargeAward.amount_cond"
      :class="['RechargeTaskItem', { RechargeLevel5000: isSpecial(rechargeAward) }]"
    >
      <div class="RechargeTaskItem_LeftContent">
        <!-- 累计充值 -->
        <p v-if="rechargeAward.condition">
          <span class="focus-color">累计</span>充值满<span class="focus-color">{{ rechargeAward.condition }}元</span>
          <span class="focus-color">（{{ rechargeAward.recharge_nums }}/{{ rechargeAward.condition }}）</span>
        </p>
        <!-- 连续充值 -->
        <p v-else>
          <span class="focus-color">累计{{ rechargeAward.days_cond }}天</span>每天充值满{{ rechargeAward.amount_cond }}元
          <span class="focus-color">（{{ rechargeAward.reach_days }}/{{ rechargeAward.days_cond }}）</span>
        </p>
        <!-- 奖励渲染 -->
        <p v-if="!isSpecial(rechargeAward)" class="award_contain">
          <template v-for="(item, index) in rechargeAward.awards">
            <span :key="index">
              <img :class="iconStyle[item.id || item.tool_id || item.type]" :src="IconPath(item.icon)" />
              +{{ item.text }}{{ index != rechargeAward.awards.length - 1 ? '，' : '' }}
            </span>
            <i v-if="item.name == '元宝'" :key="index + 10" class="update-icon"></i>
            <span v-if="item.name == '元宝'" :key="index + 100" class="update-text"> {{ item.text_add }}<i>，</i></span>
          </template>
        </p>
        <!-- 特殊奖励列表渲染 -->
        <div v-else class="PresentList">
          <template v-for="(item, index) in rechargeAward.awards">
            <div
              class="PresentItem"
              :key="index"
              v-if="!(item.name === '威望值')"
              :class="{ 'gift-item_title': item.type === 'title', goldClass: item.tool_id == 'gamegold' }"
            >
              <div v-if="index == 0 && item.text_add" class="update-text-2">
                <img :src="IconPath('mk2_7.png')" /><span>{{ item.text_add }}</span>
              </div>
              <div class="img-box">
                <div class="img-top">
                  <img v-if="item.type !== 'title'" :src="IconPath(item.icon)" alt="" />
                  <PublicImg v-else :imgName="item.id == '4676' ? 'ch_rsyj_1' : 'ch_zfz1'" :class="item.type" />
                </div>
                <div class="img-bottom line-height-100">+{{ item.text }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <PublicButton
        class="RechargeTaskItem_Button flex-center"
        textType="2"
        :hasRight="rechargeAward.has_right"
        :class="{ RechargeLevel5000_Button: isSpecial(rechargeAward) }"
        @click="receiveAward(rechargeAward)"
      />
      <!-- 5000档特殊显示 -->
      <p class="titleInfo" v-if="isSpecial(rechargeAward)">
        {{ rechargeAward.awards[3]?.text }}
      </p>
    </PublicCard>
  </transition-group>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
export default {
  props: ['RechargeGiftListData', 'transitionClass'],
  data() {
    return {
      specialAwardsArr: Object.freeze([5000, 10000, 3000]),
      // 用于添加图标样式
      iconStyle: Object.freeze({ 142: 'fsjc', 4: 'hero_tools', 2: 'ljs', pretty_card: 'lhq' })
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
    isSpecial({ amount_cond, condition }) {
      return this.specialAwardsArr.includes(condition || amount_cond) // 特殊样式判断
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
.rechargeTasksList {
  padding-top: 15px; /*todo 距离tab的距离*/
  .RechargeTaskItem {
  position: relative;
  width: 664px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
  height: 132px; /*todo 卡片高度 不需要加上外圈描边宽度*/
  margin-bottom: 24px; /*todo 卡片底部间距*/
  border-radius: 12px; /*todo 卡片圆角*/
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px;
  .RechargeTaskItem_LeftContent {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0 13px;
    p:nth-child(1) {
      margin-left: 9px;
      font-size: 30px;
      line-height: 100%;
    }
    .focus-color {
      color: #fffaa6 !important; /*todo 累计充满/累计4天/完成情况 字体颜色*/
      &:nth-last-of-type(1) {
        font-size: 28px;
        margin-left: -10px;
      }
    }
    .award_contain {
      width: fit-content;
      text-align: center;
      line-height: 100%;
      height: 48px;
      background: #466BD5; /*todo 奖励背景色*/
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px 0 8px;
      font-size: 24px;
      .update-icon {
        width: 34px;
        height: 40px;
        background: url('@/pages/valentineDay/assets/mk2_7.png') no-repeat left top/100% 100%;
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
          height: 50px;
        }
        .lhq {
          height: 60px;
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
  .RechargeTaskItem_Button {
    width: 116px;
    height: 56px;
    font-size: 28px;
    border-radius: 32px;
  }
}
  .RechargeLevel5000 {
  //height: 343px;
  height: fit-content;
  //margin-bottom: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  .RechargeTaskItem_LeftContent {
    width: 100%;
    height: fit-content;
    justify-content: flex-start;
    color: #fff;
    margin-left: 0;
    padding: 0;
    p {
      margin: 19px 0 16px 20px !important;
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
        // 图片样式
        .img-box {
          width: 128px;
          height: 128px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          padding: 4px;
          background-color: #A7DFFF; /*todo 奖励边框颜色*/
          .img-top {
            width: 100%;
            height: 90px;
            background: #FEFAEF; /*todo 奖励图标背景色*/
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 12px 12px 0 0;
            img {
              // width: 100%;
              height: 115%;
            }
            .title {
              width: 143px;
              height: 66px;
            }
          }
          .img-bottom {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0 0 12px 12px;
            background-color: #4F72D5; /*todo 奖励文字背景色*/
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
            font-size: 22px;
            font-weight: 500;
            color: #ffed51;
          }
        }
        &:nth-child(2) {
          margin: 0 49px;
        }
      }
      .goldClass {
        margin-left: 0;
        .img-box {
          background-color: #FBDC61;
        }
        //.img-bottom {
        //  background-color: #cc9833 !important;
        //}
      }
    }
    .gift-item_title {
      .img-box {
        width: 164px !important;
      }
    }
  }
  // 领取
  .RechargeLevel5000_Button {
    position: relative;
    top: 0;
    transform: none;
    right: 0;
    margin: 23px auto 26px;
    width: 200px;
    height: 60px;
    font-size: 28px;
    border-radius: 33px;
  }
  .titleInfo {
    color: #fffaa6;
    margin: 0 0 15px 15px;
    font-size: 22px;
    line-height: 100%;
    // margin-left: 12px;
  }
}
}
</style>
