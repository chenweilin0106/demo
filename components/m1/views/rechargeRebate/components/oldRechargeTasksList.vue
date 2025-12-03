<template>
  <transition-group class="rechargeTasksList flex-column align-center" :name="transitionClass" tag="ul">
    <PublicCard v-for="rechargeAward in totalList" size="2" :key="rechargeAward.condition||rechargeAward.amount_cond" :class="['taskCard position-relative flex align-center justify-between',{specialCard:isSpecial(rechargeAward)}]">
      <div class="taskInfo h-100 line-height-1 flex-column justify-between">
        <p class="desc">
          <template v-if="rechargeAward.condition">
            <span class="">累计</span>充值满<span class="">{{rechargeAward.condition}}元</span>
            <span class="nums yellow">（{{rechargeAward.recharge_nums}}/{{rechargeAward.condition}}）</span>
          </template>
          <template v-else>
            <span class="">累计{{rechargeAward.days_cond}}天</span>每天充值满{{rechargeAward.amount_cond}}元
            <span class="nums yellow">（{{rechargeAward.reach_days}}/{{rechargeAward.days_cond}}）</span>
          </template>
        </p>
        <div v-if="!isSpecial(rechargeAward)" class="awardsList radius-999 flex align-center width-fit flex-no-wrap">
          <span v-for="(item,index) in rechargeAward.awards" :key="index" class="awardSpan flex-shrink-0 flex-no-wrap flex align-center">
            <!-- <img class="awardIcon flex-shrink-0" v-lazy="IconPath(item.icon)" />+{{item.text}}{{index!=rechargeAward.awards.length-1?',&nbsp;':''}} -->
            <img class="awardIcon flex-shrink-0" v-lazy="IconPath(item.icon)" />+{{item.text}}
            <!-- <template v-if="item.text_add">
              <i :key="index+10" class="updateIcon"></i>
              <span :key="index+100" class="updateNum light">{{item.text_add}}</span>,&nbsp;
            </template> -->
          </span>
        </div>
        <div v-else class="specialAwardsList flex w-100 flex-no-wrap position-relative">
          <div v-for="(item,index) in rechargeAward.awards.filter(item=>item.type!='prestige')" :key="index" class="specialAward flex-shrink-0 position-relative" :class="`${item.type} ${item.tool_id}`">
            <!-- <div v-if="item.text_add" class="updateBox position-absolute flex align-center">
              <img :src="IconPath('mk2_7.png')" /><span>{{item.text_add}}</span>
            </div> -->
            <div class="award flex-column">
              <div class="icon flex align-center justify-center"><PublicImg :imgName="titleMap[item.id]||item.icon" :class="item.type" /></div>
              <div class="text flex-1 flex align-center justify-center">+{{item.text}}</div>
            </div>
          </div>
          <p class="prestigeText position-absolute">{{rechargeAward.awards[rechargeAward.awards.length-1].text.length>2?rechargeAward.awards[rechargeAward.awards.length-1].text:''}}</p>
          <p class="prestigeText position-absolute" v-if="rechargeAward.amount_cond==3000">{{rechargeAward.awards[rechargeAward.awards.length-1].desc}}</p>
        </div>
      </div>
      <PublicButton class="receiveBtn" :class="[isSpecial(rechargeAward)?'specialReceiveBtn':type==1?'nosp':'', rechargeAward.amount_cond==2000?'spmarginb':null]" textType="2" :disabled="[2]" :hasRight="rechargeAward.has_right" @click="receiveAward(rechargeAward)" />
    </PublicCard>
  </transition-group>
</template>

<script>
import { getPageData } from '@/api'

export default {
  props: ['type', 'RechargeGiftListData', 'transitionClass'],
  data() {
    return {
      titleMap: Object.freeze({ 4676: 'ch_rsyj_1', 4907: 'ch_zfz1', 5434: 'ch_zfzw' }),
      iconMap: Object.freeze({ gamegold: 'yb_43_27.png', 1: 'zjs_42_38.png', 2: 'ljs_40_36.png', pretty_card: 'lhq_61_31.png', 158: 'cbt_43_35.png', 159: 'hjcbt_45_37.png' }), // 用于id/type映射图标
      iconClassMap: Object.freeze({ gamegold: 'yb', 1: 'zjs', 2: 'ljs', pretty_card: 'lhq', 158: 'cbt', 159: 'hjcbt' }) // 用于添加图标样式
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
    isSpecial(info) {
      return info.awards[info.awards.length - 1]?.type == 'prestige' || info.amount_cond == 3000 // 特殊样式判断
    },
    async receiveAward({ has_right, condition, amount_cond }) {
      if (!has_right) return this.$emit('recharge')
      const params = { mark: condition || amount_cond, type: condition ? 'recharge_reward' : 'recharge_accruing_reward' }
      const res = await getPageData(params)
      this.$toast(res.errmsg)
      if (!res.errno) this.$emit('updateRechargeData', params.mark)
    }
  }
}
</script>

<style scoped lang="scss">
.rechargeTasksList {
  .taskCard {
    width: 664px;
    height: 136px;
    background: linear-gradient(-90deg, #6662AF, #827ECB);
    border-radius: 14px;
    border: 2px solid #564F9B;
    margin-bottom: 21px;
    padding: 18px 0 18px 18px;
    .taskInfo {
      .desc {
        margin-bottom: 30px;
        font-size: 30px;
        color: #fff;
        font-weight: 500;
        .nums {
          font-size: 24px;
          color: #FFE25E;
          font-weight: 500;
        }
      }
      .awardsList {
        .awardSpan {
          height: 37px;
          padding: 0 12px 0 0;
          background: linear-gradient(90deg, rgba(66,73,141,0) 40%, rgba(66,73,141,0.76));
          border-radius: 10px;
          margin-right: 20px;
          font-weight: 500;
          font-size: 24px;
          color: #FFE25E;
          &:last-child {
            margin-right: 0;
          }
          >img {
            width: 50px;
            height: 50px;
            margin-left: -3px;
            margin-right: 8px;
          }
          .light {
            color: #FFFAA6;
          }
        }
        // .updateIcon {
        //   width: 34px;
        //   height: 40px;
        //   background: url('@/pages/springFestival/assets/mk2_7.png') no-repeat left top/100% 100%;
        // }
      }
    }
    .receiveBtn {
      position: absolute;
      top: 46px;
      right: 30px;
      width: 124px;
      height: 64px;
      font-size: 28px;
    }
  }
  .specialCard {
    height: 270px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    .taskInfo {
      height: fit-content;
      justify-content: flex-start;
      color: #fff;
      .desc {
        margin-bottom: 17px;
      }
      .specialAwardsList {
        .specialAward {
          margin-right: 16px;
          .award {
            width: 128px;
            height: 128px;
            border-radius: 16px;
            padding: 4px;
            background-color: #BCC9FE;
            &:first-child {
              margin-right: 0;
            }
            .icon {
              width: 100%;
              height: 90px;
              background: #6D67BF;
              border-radius: 12px 12px 0 0;
            }
            .text {
              font-size: 24px;
              border-radius: 0 0 12px 12px;
              background-color: #42498D;
            }
          }
          .updateBox {
            position: absolute;
            bottom: -45px;
            left: -10px;
            >img {
              width: 33px;
              height: 40px;
            }
            font-size: 22px;
            font-weight: 500;
            color: #ffed51;
          }
          // &.gamegold {
          //   .award {
          //     background-color: #FBDC61;
          //   }
          //   .text {
          //     background-color: #BB891D;
          //   }
          // }
          &.title {
            .award {
              width: 168px;
            }
          }
        }
        .prestigeText {
          left: 0;
          bottom: -29px;
          transform: translateY(100%);
          color: #fffaa6;
          font-size: 22px;
        }
      }
    }
    .specialReceiveBtn {
      position: absolute;
      top: 96px;
      right: 30px;
      width: 124px;
      height: 64px;
    }
  }
}
</style>
