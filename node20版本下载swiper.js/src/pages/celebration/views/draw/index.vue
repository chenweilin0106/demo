<template>
  <div class='drawPage'>
    <div class="lotteryBox position-relative">
      <img :src="IconPath('title_5.png')" class="title position-absolute position-row-center pointer-none" />
      <img :src="IconPath('mk2_2.png')" class="ruleBtn position-absolute" @click="isShowRulesPopup = true" />
      <div class="lotteryInfo flex align-center justify-between">
        <div class="lotteryNum flex align-center justify-center line-height-100">剩余开启次数：{{ lottery_nums }}</div>
        <div class="rechargeNum flex align-center justify-center line-height-100">充值金额：{{ recharges }}</div>
      </div>
      <div class="voiceBox position-absolute"><PublicImg imgName="sb_thsk" imgType="voice" /></div>
      <div class="lotteryButtons flex align-center justify-center">
        <div class="lotteryOne" :class="free_status && 'first'"><div class="clickBtn" @click="lottery(1)"></div></div>
        <div class="lotteryTen"><div class="clickBtn" @click="lottery(2)"></div></div>
      </div>
      <ul class="rules-text">
        <li><span></span>玩家每充值20元自动获得1次宝箱开启次数</li>
        <li><span></span>宝箱有机会开出不同数量的金秋币<img :src="IconPath('jqb_36_45.png')" class="coin" />、晶石道具、</li>
        <li>装扮赠送权等奖励，金秋币<img :src="IconPath('jqb_36_45.png')" class="coin" />可用于兑换限定奖励</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
        <li>卡不计算在内</li>
      </ul>
      <img :src="IconPath('back_3.png')" class="bottomIcon position-row-center position-absolute pointer-none" />
    </div>
    <OutBox class="progressBox" title="title_6.png">
      <div class="progressNum">累计开启次数：{{ spend_nums }}</div>
      <StepProgress :tot_num="spend_nums" :tot_list="tot_awards" @openCongratsGetPopup="openCongratsGetPopup"></StepProgress>
    </OutBox>
    <OutBox class="shopBox" title="title_7.png">
      <div class="myCoin">我的金秋币<img :src="IconPath('jqb_36_45.png')" class="coin" />：{{ bead_nums }}</div>
      <div class="normalList">
        <GoodsItem v-for="item in merge_list.slice(0,3)" :key="item.goods_id" :goods="item" @buy="buy(item)" />
      </div>
      <div class="costListBox">
        <div class="status line-height-100 flex align-center justify-center"><img :src="IconPath('mk5_7.png')" class="left" />&nbsp;&nbsp;消耗30金秋币解锁<i>（{{ numberLimit(use_nums, 30) }}/30）</i>&nbsp;&nbsp;<img :src="IconPath('mk5_8.png')" class="right" /></div>
        <div class="cost30List">
          <GoodsItem v-for="item in merge_list.slice(3,5)" :key="item.goods_id" :goods="item" @buy="buy(item)" />
        </div>
      </div>
      <div class="costListBox">
        <div class="status line-height-100 flex align-center justify-center"><img :src="IconPath('mk5_7.png')" class="left" />&nbsp;&nbsp;消耗150金秋币解锁<i>（{{ numberLimit(use_nums, 150) }}/150）</i>&nbsp;&nbsp;<img :src="IconPath('mk5_8.png')" class="right" /></div>
        <div class="cost150List">
          <GoodsItem v-for="item in merge_list.slice(5)" :key="item.goods_id" :goods="item" @buy="buy(item)" />
        </div>
      </div>
      <ul class="rules-text">
        <li><span></span>玩家获得的金秋币<img :src="IconPath('jqb_36_45.png')" class="coin" />可用于兑换道具、装扮等奖励</li>
        <li><span></span>金秋币<img :src="IconPath('jqb_36_45.png')" class="coin" />在活动结束后清零，请及时使用</li>
      </ul>
    </OutBox>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="isShowRulesPopup = false" />
    <ExchangePopup v-if="isShowExchangePopup" :num="bead_nums" :goods="exchangePopupData" @update="updateMergeList" @clickClose="isShowExchangePopup = false" />
    <CongratsGetPopup v-if="isShowCongratsGetPopup" :list="congratsGetPopupData" @clickClose="isShowCongratsGetPopup = false" />
  </div>
</template>

<script>
import { numberLimit } from '@/utils/tool'
import { getPageData } from '@/api/index'
import GoodsItem from '@/pages/celebration/views/draw/components/goodsItem.vue'
import StepProgress from '@/pages/celebration/views/draw/components/stepProgress.vue'
const RulesPopup = () => import('@/pages/celebration/views/draw/popups/rulesPopup.vue')
const ExchangePopup = () => import('@/pages/celebration/views/draw/popups/exchangePopup.vue')
const CongratsGetPopup = () => import('@/pages/celebration/components/congratsGetPopup.vue')
export default {
  name: 'drawVue',
  components: { GoodsItem, StepProgress, RulesPopup, ExchangePopup, CongratsGetPopup },
  data() {
    return {
      user_icon: '',
      recharges: 0,
      lottery_nums: 0,
      bead_nums: 0,
      spend_nums: 0,
      free_status: true,
      tot_awards: [
        { awardId: 6, id: 2, type: 'tool', icon: 'ljs_120_120.png', nums: 20, name: '绿晶石', text: '+20', need: 6, has_right: 0 },
        { awardId: 12, id: 1, type: 'tool', icon: 'zjs_120_120.png', nums: 10, name: '紫晶石', text: '+10', need: 12, has_right: 0 },
        { awardId: 32, id: 0, type: 'luck_key', icon: 'xyys_120_120.png', nums: 1, name: '钥匙', text: '+1', need: 32, has_right: 0 },
        { awardId: 50, id: 158, type: 'tool', icon: 'cbt_120_120.png', nums: 3, name: '藏宝图', text: '+3', need: 50, has_right: 0 },
        { awardId: 80, id: 142, type: 'tool', icon: 'fsjc_120_120.png', nums: 500, name: '符石精粹', text: '+500', need: 80, has_right: 0 },
        { awardId: 146, id: 0, type: 'pretty_card', icon: 'lhq_120_120.png', nums: 30, name: '靓号券', text: '+30', need: 146, has_right: 0 },
        { awardId: 175, id: 159, type: 'tool', icon: 'hjcbt_120_120.png', nums: 3, name: '黄金藏宝图', text: '+3', need: 175, has_right: 0 }
      ],
      merge_list: [
        { goods_id: 1, type: 'mic', id: 170, icon: 'ts_nhjm.svga', nums: 3, text: '头饰+3天', name: '霓虹旧梦', price: 10, max_times: 0, before_price: 0, unit: '天', exchange_times: 0, has_right: 1, lock: true },
        { goods_id: 2, type: 'tool', id: 142, icon: 'fsjc_120_120.png', nums: 120, text: '+120', name: '符石精粹', price: 15, max_times: 100, before_price: 0, unit: '', exchange_times: 0, has_right: 1, lock: true },
        { goods_id: 3, type: 'CP_card', id: 8, icon: 'lmby_120_120.png', nums: 3, text: '+3天', name: 'CP资料卡', price: 6, max_times: 0, before_price: 0, unit: '天', exchange_times: 0, has_right: 1, lock: true },
        { goods_id: 4, type: 'chat_bubble_pub', id: 28, icon: 'bgtx_120_120.png', nums: 5, text: '+5天', name: '公屏气泡', price: 18, max_times: 0, before_price: 30, is_new: true, unit: '天', exchange_times: 0, has_right: 1, lock: false },
        { goods_id: 5, type: 'tool', id: 159, icon: 'hjcbt_120_120.png', nums: 1, text: '+1', name: '黄金藏宝图', price: 166, max_times: 10, before_price: 30, unit: '', exchange_times: 0, has_right: 1, lock: false },
        { goods_id: 6, type: 'car', id: 66, icon: 'xybl_120_120.png', nums: 3, text: '座驾+3天', name: '座驾', price: 25, max_times: 20, before_price: 150, unit: '天', exchange_times: 0, has_right: 1, lock: false }
      ],
      use_nums: 0,
      isShowRulesPopup: false, // 规则弹窗
      isShowExchangePopup: false, // 兑换弹窗
      exchangePopupData: {}, // 兑换弹窗数据
      isShowCongratsGetPopup: false, // 恭喜获得弹窗
      congratsGetPopupData: [] // 恭喜获得弹窗数据
    }
  },
  computed: {},
  created() {
    this.getHomeDate()
  },
  methods: {
    async lottery(type) {
      const mark = type == 1 ? this.free_status ? type : 2 : 3
      const needNum = mark == 1 ? 0 : mark == 2 ? 1 : 10
      if (+this.lottery_nums < needNum) return this.$toast('开启次数不足')
      const res = await getPageData({ type: 'naughty_lottery', mark })
      if (res.errno == -2) {
        this.$toast('页面信息已变化，请刷新页面')
        return this.getHomeDate()
      }
      if (res.errno) return this.$toast(res.errmsg)
      if (this.free_status) this.free_status = false
      this.lottery_nums = res.data.lottery_nums
      this.bead_nums = res.data.bead_nums
      this.spend_nums = res.data.spend_nums
      this.congratsGetPopupData = res.data.awards
      this.isShowCongratsGetPopup = true
      this.tot_awards.forEach(item => { if (+item.need <= +this.spend_nums && !item.has_right) item.has_right = 1 }) // 手动更新进度条奖励has_right状态
    },
    buy(param) {
      if (param.price > this.bead_nums) return this.$toast('金秋币不足')
      this.exchangePopupData = param
      this.isShowExchangePopup = true
    },
    updateMergeList(param) {
      this.bead_nums = param.bead_nums
      this.use_nums = param.use_nums
      this.merge_list.forEach(item => {
        if (item.goods_id == param.awards.goods_id) {
          item.exchange_times = param.exchange_times
          if (item.max_times && item.exchange_times >= item.max_times) item.has_right = 2
        }
        if (+this.use_nums >= +item.before_price && !item.lock) item.lock = true
      })
      this.$nextTick(() => {
        this.congratsGetPopupData = [param.awards]
        this.isShowCongratsGetPopup = true
      })
    },
    /**
     * 获取页面数据
     */
    async getHomeDate() {
      const res = await getPageData({ type: 'tab', mark: 'm5' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    },
    /**
     * 打开恭喜获得弹窗
     */
    openCongratsGetPopup(list, id) {
      this.congratsGetPopupData = list
      this.isShowCongratsGetPopup = true
      this.tot_awards.find(item => item.awardId == id).has_right = 2
    },
    numberLimit
  }
}
</script>
<style lang='scss' scoped>
.coin {
  width: auto;
  height: 48px;
}
@mixin numBox() {
  padding: 0 65px;
  height: 48px;
  background: #B55023;
  border-radius: 24px;
  font-weight: 500;
  font-size: 26px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: fit-content;
}
.drawPage{
  .lotteryBox{
    margin: 91px auto 0;
    width: 718px;
    height: 1268px;
    background: url('@/pages/celebration/assets/mk5_6.png') no-repeat left top/100% 100%;
    padding: 9px;
    .title {
      width: 403px;
      height: 133px;
      top: -76px;
    }
    .ruleBtn {
      top: -20px;
      right: 52px;
      width: 56px;
      height: 56px;
    }
    .lotteryInfo {
      margin-top: 69px - 9;
      >div {
        height: 48px;
        background: #B55023;
        padding: 0 18px;
        font-weight: 500;
        font-size: 24px;
        color: #FFFFFF;
      }
      .lotteryNum{
        border-radius: 0 24px 24px 0;
      }
      .rechargeNum{
        border-radius: 24px 0 0 24px;
      }
    }
    .voiceBox {
      top: 256px;
      left: 208px;
      width: 95px;
      height: 94px;
    }
    .lotteryButtons {
      margin-top: 758px;
      margin-bottom: 22px - 13;
      >div {
        width: 316px;
        height: 125px;
        background: no-repeat left top/100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .lotteryOne {
        margin-right: 14px;
        background-image: url("@/pages/celebration/assets/mk5_2.png");
        &.first {
          background-image: url("@/pages/celebration/assets/mk5_1.png");
        }
      }
      .clickBtn {
        width: 280px;
        height: 90px;
        //background-color: #fff;
      }
      .lotteryTen {
        background-image: url("@/pages/celebration/assets/mk5_3.png");
      }
    }
    .bottomIcon {
      bottom: -162px;
      z-index: -1;
      width: 750px;
      height: 190px;
    }
  }
  .progressBox{
    height: 416px + 16;
    .progressNum {
      @include numBox();
    }
  }
  .shopBox{
    height: 1451px + 16;
    .myCoin {
      @include numBox();
    }
    .costListBox {
      margin: 20px auto 0;
      width: 642px;
      padding: 22px 0;
      background: #FFE6AF;
      border-radius: 40px;
      .status {
        font-weight: 500;
        font-size: 30px;
        color: #D96033;
        i {
          font-weight: 500;
          font-size: 26px;
          color: #4D7DDD;
          margin-right: -0.5em;
        }
        .left, .right {
          width: 160px;
          height: 21px;
        }
      }
    }
    .normalList, .cost30List, .cost150List {
      margin-top: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      .goodsItem:not(:first-child) {
        margin-left: 22px;
      }
    }
    .rules-text {
      margin-top: 21px;
    }
  }
}
</style>
