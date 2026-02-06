<template>
  <transition-group class="rechargeTasksList flex-column align-center" :name="transitionClass" tag="ul" :key="currentTab.listKey">
    <PublicCard v-for="rechargeAward in totalList" size="2" :key="rechargeAward.condition||rechargeAward.amount_cond" :class="['taskCard position-relative flex align-center justify-between',{specialCard:isSpecial(rechargeAward)}]">
      <div class="taskInfo h-100 line-height-1 flex-column justify-between">
        <p class="desc">
          <template v-if="rechargeAward.condition">
            <span class="light">累计</span>充值满<span class="light">{{rechargeAward.condition}}元</span>
            <span class="nums text-indent-left light">（{{rechargeAward.recharge_nums}}/{{rechargeAward.condition}}）</span>
          </template>
          <template v-else>
            <span class="light">累计{{rechargeAward.days_cond}}天</span>每天充值满{{rechargeAward.amount_cond}}元
            <span class="nums text-indent-left light">（{{rechargeAward.reach_days}}/{{rechargeAward.days_cond}}）</span>
          </template>
        </p>
        <div v-if="!isSpecial(rechargeAward)" class="awardsList radius-999 flex align-center width-fit flex-no-wrap">
          <span v-for="(item,index) in rechargeAward.awards" :key="index" class="awardSpan flex-shrink-0 flex-no-wrap flex align-center text-indent-right">
            <img class="awardIcon flex-shrink-0" v-lazy="IconPath(item.icon)" />+{{item.text}}{{index!=rechargeAward.awards.length-1?',&nbsp;':''}}
            <template v-if="item.text_add">
              <i :key="index+10" class="updateIcon"></i>
              <span :key="index+100" class="updateNum light">{{item.text_add}},&nbsp;</span>
            </template>
          </span>
        </div>
        <div v-else class="specialAwardsList flex w-100 justify-center flex-no-wrap position-relative">
          <div v-for="(item,index) in rechargeAward.awards.filter(item=>item.type!='prestige')" :key="index" class="specialAward flex-shrink-0 position-relative" :class="`${item.type} ${item.tool_id}`">
            <div v-if="item.text_add" class="updateBox position-absolute flex align-center">
              <img :src="IconPath('mk2_7.png')" /><span>{{item.text_add}}</span>
            </div>
            <div class="award flex-column">
              <lazy-component class="icon flex align-center justify-center"><PublicImg :imgName="titleMap[item.id]||item.icon" :class="item.type" /></lazy-component>
              <div class="text flex-1 flex align-center justify-center">+{{item.text}}</div>
            </div>
          </div>
        </div>
        <p v-if="rechargeAward.awards[rechargeAward.awards.length-1].type=='prestige'" class="prestigeText">{{rechargeAward.awards[rechargeAward.awards.length-1].text}}</p>
      </div>
      <PublicButton class="receiveBtn" :class="isSpecial(rechargeAward)?'specialReceiveBtn':''" :disabled="[2]" :hasRight="rechargeAward.has_right" @click="receiveAward(rechargeAward)">
        {{rechargeAward.has_right==0?'去完成':rechargeAward.has_right==1?'领取':'已领取'}}
      </PublicButton>
      <img v-if="labelMap[rechargeAward.condition||rechargeAward.amount_cond]" :src="IconPath('mk2_3.png')" class="pointer-none position-absolute label" />
    </PublicCard>
  </transition-group>
</template>

<script>
import { getPageData } from '@/api'

export default {
  props: ['RechargeGiftListData', 'transitionClass'],
  data() {
    return {
      labelMap: Object.freeze({}), // 角标map
      titleMap: Object.freeze({ 4676: 'ch_rsyj_1', 4907: 'ch_zfz1' })
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
      return info.awards[info.awards.length - 1]?.type == 'prestige' // 特殊样式判断
    },
    async receiveAward({ has_right, condition, amount_cond }) {
      if (has_right == 0) return this.$emit('recharge')
      const params = { mark: condition || amount_cond, type: condition ? 'recharge_reward' : 'recharge_accruing_reward' }
      const res = await getPageData(params)
      this.$toast(res.errmsg)
      if (!res.errno) this.$emit('updateRechargeData', params.mark)
    }
  }
}
</script>

<style scoped lang="scss">
.light{
  color: #FFFAA6;
}
.rechargeTasksList{
  margin-top: 15px; /*todo 距离tab的距离*/
  .taskCard {
    width: 664px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
    margin-bottom: 16px; /*todo 卡片底部间距*/
    .taskInfo{
      padding: 20px 0 13px 8px;
      .desc{
        margin-bottom: 19px;
        font-size: 30px;
        color: #fff;
      }
      .nums{
        font-size: 28px;
      }
      .awardsList{
        height: 52px;
        background: rgba(156, 93, 137, 0.9); /*todo 奖励背景色*/
        padding: 0 20px 0 8px;
        font-size: 24px;
        .updateIcon{
          width: 34px;
          height: 40px;
          background: url('@/pages/springFestival/assets/mk2_7.png') no-repeat left top/100% 100%;
        }
        .awardSpan{
          >img{
            width: 50px;
            height: 50px;
          }
        }
      }
    }
    .receiveBtn{
      position: absolute;
      right: 20px;
      top: 8px;
    }
  }
  .specialCard{
    height: fit-content;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    .taskInfo{
      width: 100%;
      height: fit-content;
      justify-content: flex-start;
      color: #fff;
      padding: 0;
      .specialAwardsList{
        .specialAward{
          margin-right: 8px;
          .award{
            width: 128px;
            height: 128px;
            border-radius: 16px;
            padding: 4px;
            background-color: #EFA5D2; /*todo 奖励边框颜色*/
            .icon{
              width: 100%;
              height: 90px;
              background: #FEFAEF; /*todo 奖励图标背景色*/
              border-radius: 12px 12px 0 0;
            }
            .text{
              font-size: 24px;
              border-radius: 0 0 12px 12px;
              background-color: #C25E94; /*todo 奖励文字背景色*/
            }
          }
          .updateBox{
            bottom: -45px;
            left: -10px;
            > img{
              width: 33px;
              height: 40px;
            }
            font-size: 22px;
            font-weight: 500;
            color: #ffed51;
          }
          &.gamegold{
            .award{
              background-color: #FBDC61;
            }
            .text{
              background-color: #BB891D;
            }
          }
          &.title {
            .award {
              width: 164px;
              .title {
                width: 143px;
                height: 66px;
              }
            }
          }
        }
      }
    }
    .prestigeText{
      margin-top: 16px;
      color: #fff;
      font-size: 22px;
      line-height: 1;
    }
  }
  .label{
    top: -4px;
    right: -4px;
    width: 79px;
  }
}
</style>
