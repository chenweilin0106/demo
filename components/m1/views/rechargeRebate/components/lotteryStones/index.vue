<template>
  <OutBox title="mk1_title_15.png" class="lotteryStones">
    <p class="flex justify-center text-center">活动期间，累计充值达到对应价格<br>即可领取或抽取对应奖励</p>
    <div class="totalNum flex align-center justify-center line-height-100 width-fit margin-row-center">活动期间累计充值：{{ config.tot_amount }}</div>
    <img :src="IconPath('mk2_2.png')" class="ruleBtn position-absolute" @click="isShowRulesPopup = true"/>
    <div class="main flex">
      <PublicCard class="leftBox">
        <p class="flex justify-center line-height-100">每充值<i>满1000</i>可抽</p>
        <div class="award flex-column align-center margin-row-center">
          <div class="icon w-100 position-relative" ><div class="iconMain" @click="iconMainCk(1)"><PublicImg imgName="fslb_120_120.png" /></div></div>
          <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">神运六件套</div>
        </div>
        <PublicButton class="button margin-row-center" hasRight="1" @click="lottery">抽取({{ config.res_num }}/1)</PublicButton>
      </PublicCard>
      <PublicCard class="rightBox">
        <p class="flex justify-center line-height-100">充值<i>满5000</i>必得</p>
        <div class="award flex-column align-center margin-row-center">
          <div class="icon w-100 position-relative" ><div class="iconMain" @click="iconMainCk(2)"><PublicImg imgName="sy.png" /></div></div>
          <div class="text w-100 flex align-center justify-center line-height-100 text-nowrap">神运</div>
        </div>
        <PublicButton class="button margin-row-center" :hasRight="config.gift_status ? config.tot_amount >= 5000 ? 1 : 0 : 2" @click="receive">{{ config.gift_status ? config.tot_amount >= 5000 ? '领取' : '去完成' : '已领取' }}</PublicButton>
      </PublicCard>
    </div>
    <RechargePopup v-if="isShowRechargePopup" @clickClose="isShowRechargePopup = false" @recharge="$emit('recharge')" />
    <RulesPopup v-if="isShowRulesPopup" :config="config.server_id" @clickClose="isShowRulesPopup = false" />
    <FsRulesPopup v-if="isShowFsRulesPopup" :config="configFsRulesPopup" @clickClose="isShowFsRulesPopup = false" />
    <BackpackFull v-if="isShowBackpackFull" :typeBackpackFull="typeBackpackFull" @clickClose="isShowBackpackFull = false" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />
  </OutBox>
</template>

<script>
import { compareVersions } from '@/utils/toApp.js'
import { getPageData } from '@/api'
import BackpackFull from './components/backpackFull.vue'
import FsRulesPopup from './components/fsRulesPopup.vue'
import RulesPopup from './components/rulesPopup.vue'
import RechargePopup from './components/rechargePopup.vue'
import ReceivePopup from './components/receivePopup.vue'

// <LotteryStones :config="surprise_data" @updateLotteryStones="updateLotteryStones" @recharge="recharge" />
// import LotteryStones from '@/pages/yearCelebration/views/m1/views/rechargeRebate/components/lotteryStones
// import { recharge } from '@/utils/toApp'
// updateLotteryStones(param) {
//   Object.assign(this.surprise_data, param)
// },
// recharge
export default {
  name: 'lotteryStones',
  props: ['config'],
  components: { ReceivePopup, RechargePopup, RulesPopup, FsRulesPopup, BackpackFull },
  data() {
    return {
      isShowReceivePopup: false, // 恭喜获得弹窗
      configReceivePopup: [], // 恭喜获得弹窗数据
      isShowRechargePopup: false, // 确认弹窗
      isShowRulesPopup: false, // 规则弹窗
      isShowFsRulesPopup: false, // 符石说明弹窗
      configFsRulesPopup: 1,
      isShowBackpackFull: false, // 背包已满弹窗
      typeBackpackFull: 1
    }
  },
  methods: {
    async receive() {
      if (this.config.tot_amount < 5000) return this.$emit('recharge')
      const res = await getPageData({ type: 'recharge_other_rev_rune' })
      if (res.errno == -5 || res.errno == -6) return this.backpackFull(res.errno)
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = [res.data]
      this.isShowReceivePopup = true
      this.$emit('updateLotteryStones', { gift_status: false })
    },
    async lottery() {
      if (this.config.res_num == 0) return (this.isShowRechargePopup = true)
      const res = await getPageData({ type: 'recharge_other_draw_rune' })
      if (res.errno == -5 || res.errno == -6) return this.backpackFull(res.errno)
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = [res.data]
      this.configReceivePopup.forEach(item => (item.text = item.name + item.text))
      this.isShowReceivePopup = true
      this.$emit('updateLotteryStones', { res_num: this.config.res_num - 1 })
    },
    iconMainCk(type) {
      this.configFsRulesPopup = { type, server_id: this.config.server_id }
      this.isShowFsRulesPopup = true
    },
    /**
     * 符石背包已满弹框处理
     * @param {Number} errno -5: 符石背包已满 -6: 符石背包已满，请升级到最新版本分解符石
     */
    backpackFull(errno) {
      const flag = compareVersions('5.7.8')
      if (flag == -1) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      this.openBackpackFullPopup(errno == -5 ? 1 : 2)
    },
    /**
     * 打开背包已满弹窗
     */
    openBackpackFullPopup(type) {
      console.log('背包已满弹窗')
      // this.clickClose()
      setTimeout(() => {
        this.typeBackpackFull = type
        this.isShowBackpackFull = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lotteryStones {
  >p{
    font-weight: 500;
    font-size: 28px;
    color: #6E56E7;
  }
  .ruleBtn {
    top: 59px;
    right: 42px;
    width: 56px;
  }
  .totalNum {
    margin-top: 20px;
    height: 48px;
    padding: 0 33px;
    background: #877FF1;
    border-radius: 9999999px;
    font-weight: 500;
    font-size: 26px;
    color: #FFFFFF;
  }
  .main {
    margin-top: 21px;
    margin-left: 60px;
    .leftBox,.rightBox {
      width: 304px;
      height: 349px;
      font-size: 28px;
      color: #fff;
      padding-top: 33px;
      background: linear-gradient(180deg, #B76AFF, #937CF9, #93AAFF);
      -webkit-background-clip: padding-box;
      border-radius: 32px;
      >p {
        font-size: 28px;
        color: #FFFFFF;
        >i {
          color: #FFF77B;
        }
      }
      .award {
        margin-top: 14px;
        $awardSize: 128px; /*todo 奖励容器大小*/
        width: $awardSize;
        margin-bottom: 18px; /*todo 奖励容器底部间距*/
        .icon {
          height: $awardSize;
          $radius: 16px; /*todo 圆角*/
          $borderWidth: 4px; /*todo 边框粗细*/
          border-radius: $radius;
          background-color: #DBC1FF; /*todo 边框颜色*/
          padding: 4px;
          .iconMain {
            width: 100%;
            height: 100%;
            background-color: #fff; /*todo 图标背景色*/
            border-radius: $radius - $borderWidth;
            overflow: hidden;
          }
        }
        .text {
          margin-top: 11px;
          font-size: 24px;
          color: #FFFFFF;
        }
      }
      .button {
        width: 184px;
        height: 64px;
        font-size: 28px;
        &.button-finish {
          pointer-events: none;
        }
      }
    }
    .rightBox {
      margin-left: 31px;
    }
  }
}
</style>
