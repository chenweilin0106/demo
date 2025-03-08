<template>
  <div class="RechargeRebate" @click="showBubble = false">
    <FirstDouble
      :fist-double-data="single_recharge_status"
      @recharge="recharge(hiddenFn)"
      @updateFirstDoubleData="updateFirstDoubleData"
      @changeBubble="showBubble = !showBubble"
    />
    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @recharge="recharge(hiddenFn)" />
    <OutBox class="RechargeRebate_BottomBox" :right="false" :bottom="false">
      <div
        class="RechargeRebate_BottomBox_Tab"
        :class="{
          'active-tab-bg': RechargeGiftListMark == '连续充值有礼'
        }"
      >
        <div class="reset-icon"></div>
        <div class="update-1"></div>
        <div v-for="item in RechargeGiftList_Text" :key="item" class="tab" @click="switchTab(item)">
          {{ item }}
        </div>
      </div>
      <RechargeTasksList
        v-show="RechargeGiftListMark == '累计充值有礼'"
        :RechargeGiftListData="pageData.recharge_status"
        :transitionClass="transitionClass"
        @recharge="recharge(hiddenFn)"
        @updateRechargeData="updateRechargeData"
      />
      <RechargeTasksList
        v-show="RechargeGiftListMark == '连续充值有礼'"
        :RechargeGiftListData="pageData.accruing_days_list"
        :transitionClass="transitionClass"
        @recharge="recharge(hiddenFn)"
        @updateRechargeData="updateRechargeData"
      />
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
import GiftBox from './components/giftBox/index.vue'
import RechargeTasksList from './components/rechargeTasksList.vue'
import FirstDouble from './components/firstDouble/index.vue'
import { rechargeRebate } from '@/pages/520/utils/pageData'
import { recharge } from '@/pages/520/utils/toApp'
import { getPageData } from '@/pages/520/api'

export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList, GiftBox },
  data() {
    return {
      pageData: {},
      showBubble: true,
      bubbleTimer: null,
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  watch: {
    showBubble: {
      handler(val) {
        if (val) {
          this.bubbleTimer = setTimeout(() => {
            this.showBubble = false
            this.clearBubbleTimer()
          }, 5000)
        } else {
          this.clearBubbleTimer()
        }
      },
      immediate: true
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
      return { ...this.pageData.single_recharge_status, is_last_day: this.pageData.is_last_day, showBubble: this.showBubble }
    }
  },
  async created() {
    this.pageData = rechargeRebate
    await this.getPageData({ type: 'tab', mark: 'm2' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    clearBubbleTimer() {
      clearTimeout(this.bubbleTimer)
      this.bubbleTimer = null
    },
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    updateGiftBoxData(user_tickets) {
      this.pageData.user_tickets = user_tickets
    },
    updateFirstDoubleData() {
      this.pageData.single_recharge_status.has_right = 2
    },
    switchTab(item) {
      this.RechargeGiftListMark = item
    },
    updateRechargeData(mark) {
      const type = this.RechargeGiftListMark === '累计充值有礼' ? 'recharge_status' : 'accruing_days_list'
      this.pageData[type][mark].has_right = 2 // 更新列表数据
    },
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
    async getPageData(data) {
      const res = await getPageData(data)
      res.errno != 0 ? this.$toast(res.errmsg) : (this.pageData = res.data)
      const arr = this.pageData.accruing_days_list[3000].awards
      const text = arr[arr.length - 1].desc
      this.pageData.accruing_days_list[3000].awards.push({ text, name: '威望值' })
    },
    recharge
  },
  beforeDestroy() {
    this.clearBubbleTimer()
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

  .RechargeRebate_BottomBox {
    //width: 734px;
    margin-top: 138px; //tab图片高度 + 距离上方盒子高度
    padding-bottom: 60px;
    border-image-width: 0 0 212px 0;
    padding-top: 110px; // tab图片高度

    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 750px;
      height: 110px;
      background: url('@/pages/520/assets/zs_2.png') no-repeat left top/100% 100%;
      margin-top: -220px; //tab图片高度 * 2
      padding: 0 20px;
      .reset-icon {
        position: absolute;
        top: 0;
        left: 22px;
        width: 124px;
        height: 42px;
        background: url('@/pages/520/assets/mk2_1.png') no-repeat left top/100% 100%;
      }
      .update-1 {
        position: absolute;
        bottom: -2px;
        left: 297px;
        width: 96px;
        height: 128px;
        background: url('@/pages/520/assets/mk2_5.png') no-repeat left top/100% 100%;
      }
      .tab {
        position: relative;
        flex: 1;
        height: 100%;
        font-size: 32px;
        opacity: 0;
        line-height: 72px;

        &:nth-child(1) {
          margin-right: 24px;
        }
      }
    }

    .active-tab-bg {
      background: url('@/pages/520/assets/zs_1.png') no-repeat left top/100% 100%;
    }

    .rechargeAwardList {
      padding-top: 15px;
    }
    .rules-text {
      margin-left: 72px;
      img {
        width: 50px;
        height: auto;
      }
    }
  }
}
</style>
