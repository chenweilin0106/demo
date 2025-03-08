<template>
  <div class="RechargeRebate">
    <!-- 充值礼包组件 -->
    <Single_RechargeGift
      :single_recharge_status="single_recharge_status"
      :is_last_day="pageData.is_last_day"
      @recharge="recharge(hiddenFn)"
      @getRechargeGift="getRechargeGift"
    />
    <GiftBox
      :giftBoxData="giftBoxData"
      @updateGiftBoxData="updateGiftBoxData"
      @recharge="recharge(hiddenFn)"
      @updatePageData="getPageData({ type: 'tab', mark: 'm2' })"
    />
    <ThemeBox class="consume-list">
      <div class="consume-tabs">
        <img :src="IconPath('mk2_21.png')" class="update position-absolute pointer-none" />
        <div
          v-for="item in RechargeGiftList_Text"
          :key="item"
          :class="['tab', 'flex-center', { 'tab-active': RechargeGiftListMark == item }]"
          @click="switchTab(item)"
        >
          {{ item }}
        </div>
      </div>
      <RechargeGiftList
        v-show="RechargeGiftListMark == '累计充值有礼'"
        :RechargeGiftListData="pageData.recharge_status"
        :transitionClass="transitionClass"
        @updateRechargeData="updateRechargeData"
        @recharge="recharge(hiddenFn)"
      />
      <RechargeGiftList
        v-show="RechargeGiftListMark == '连续充值有礼'"
        :RechargeGiftListData="pageData.accruing_days_list"
        :transitionClass="transitionClass"
        @updateRechargeData="updateRechargeData"
        @recharge="recharge(hiddenFn)"
      />
      <div class="rule-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
        </ul>
      </div>
    </ThemeBox>
    <SingleAwardPopup v-if="showSingleAwardPopup" :list="singleAwardPopupData" @clickClose="showSingleAwardPopup = false" />
  </div>
</template>

<script>
import GiftBox from '@/pages/skillGift/views/RechargeRebate/components/giftBox/index.vue'
import RechargeGiftList from '@/pages/skillGift/views/RechargeRebate/components/RechargeGiftList.vue'
import Single_RechargeGift from './components/Single_RechargeGift'
import { rechargeRebate } from '../../utils/pageData'
import { recharge } from '../../utils/toApp'
import { getPageData } from '../../api/index'
import { _throttle } from '@/pages/skillGift/utils/tool'
const SingleAwardPopup = () => import('@/pages/skillGift/popups/singleAwardPopup.vue')
export default {
  name: 'RechargeRebate',
  components: {
    SingleAwardPopup,
    Single_RechargeGift,
    RechargeGiftList,
    GiftBox
  },
  data() {
    return {
      singleAwardPopupData: [],
      showSingleAwardPopup: false,
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼'
    }
  },
  computed: {
    giftBoxData() {
      return { user_tickets: this.pageData.user_tickets, user_recharges: this.pageData.user_recharges }
    },
    RechargeGiftListData() {
      return this.RechargeGiftListMark == '累计充值有礼' ? this.pageData.recharge_status : this.pageData.accruing_days_list
    },
    single_recharge_status() {
      return this.pageData.single_recharge_status // 充值礼包
    }
  },
  async created() {
    // 导入默认数据
    this.pageData = rechargeRebate
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm2' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    updateGiftBoxData(user_tickets) {
      this.pageData.user_tickets = user_tickets
    },
    async switchTab(item) {
      this.RechargeGiftListMark = item
    },
    // 更新充值列表数据
    updateRechargeData(mark) {
      // 判断更新的是累计充值还是连续充值
      const type = this.RechargeGiftListMark === '累计充值有礼' ? 'recharge_status' : 'accruing_days_list'
      this.pageData[type][mark].has_right = 2
    },
    // 充值礼包领取按钮点击事件
    getRechargeGift: _throttle(async function () {
      const res = await getPageData({ type: 'recharge_single_reward' })
      if (res.errno) return this.$toast(res.errmsg)
      this.singleAwardPopupData = res.data.data
      this.showSingleAwardPopup = true
      this.pageData.single_recharge_status.has_right = 2
    }, 1000),
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData({ type: 'tab', mark: 'm2' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    recharge
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

.RechargeRebate {
  position: relative;
  .consume-list {
    margin-top: 39px;
    overflow: hidden;
    padding-bottom: 100px;
    .consume-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: 11px 0 15px;
      //height: 50px;
      .update {
        z-index: 1;
        top: -11px;
        left: 292px;
        width: 68px;
        height: 103px;
      }
      .tab {
        position: relative;
        width: 348px;
        height: 75px;
        background: linear-gradient(0deg, rgba(54, 46, 156, 0.5), rgba(42, 63, 188, 0.5));
        border: 2px solid #3b8aed;
        font-size: 32px;
        color: #7bdeff;
      }
      // 底部tab栏活动
      .tab-active {
        font-size: 38px !important;
        font-weight: 500 !important;
        color: #ffffff !important;
        width: 352px !important;
        height: 96px !important;
        background: url('@/pages/skillGift/assets/mk2_4.png') no-repeat left top/100% 100%;
        border: none;
      }
    }
  }
}
.rule-text {
  //margin-top: 11px;
  width: 612px;
  height: 67px;
  margin-left: 66px;
  img {
    width: 49px;
    height: 41px;
  }
}
</style>
