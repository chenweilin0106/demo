<template>
  <div class="RechargeRebate" @click="showBubble = false">
    <FirstDouble
      :fist-double-data="single_recharge_status"
      @updatePageData="getPageData({ type: 'tab', mark: 'm2' })"
      @updateFirstDoubleData="updateFirstDoubleData"
      @changeBubble="showBubble = !showBubble"
    />
    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @updatePageData="getPageData({ type: 'tab', mark: 'm2' })" />
    <PublicContainer class="RechargeRebate_BottomBox">
      <div class="consume-tabs">
        <div
          v-for="(item, index) in RechargeGiftList_Text"
          :key="item"
          class="flex align-center justify-center line-height-100"
          :class="['tab', { 'tab-active': RechargeGiftListMark == item }]"
          @click="RechargeGiftListMark = item"
        >
          {{ item }}
          <img v-if="index === 0" :src="IconPath('mk2_14.png')" class="addIcon position-absolute pointer-none" />
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
    </PublicContainer>
  </div>
</template>

<script>
import getPageDataMixin from '@/pages/mayDay2024/mixins/getPageDataMixin' // 获取页面数据混入
import RechargeTasksList from '@/pages/mayDay2024/views/rechargeRebate/components/rechargeTasksList.vue' // 充值任务列表
import FirstDouble from '@/pages/mayDay2024/views/rechargeRebate/components/firstDouble' // 天天首充礼
import GiftBox from '@/pages/mayDay2024/views/rechargeRebate/components/giftBox/index.vue' // 礼盒
import { rechargeRebate } from '@/pages/mayDay2024/utils/pageData' // 默认数据
import { recharge } from '@/pages/mayDay2024/utils/toApp' // 跳转APP充值界面

export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList, GiftBox },
  mixins: [getPageDataMixin],
  data() {
    return {
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
    margin-top: 50px;
    padding-bottom: 20px;
    .consume-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: -12px 0 26px;
      //height: 50px;
      .tab {
        position: relative;
        width: 330px;
        height: 91px;
        background: url('@/pages/mayDay2024/assets/tab_4.png') no-repeat left top/100% 100%;
        font-weight: 600;
        font-size: 32px;
        color: #ffffff;
        text-shadow: 1px 0 #0592e8, -1px 0 #0592e8, 0 1px #0592e8, 0 -1px #0592e8, 1px 1px #0592e8, -1px -1px #0592e8, 1px -1px #0592e8,
          -1px 1px #0592e8;
        padding-bottom: 11px;
        &:nth-child(1) {
          margin-right: 6px;
          .addIcon {
            right: -8px;
            top: -15px;
            width: 72px;
            height: 100px;
          }
        }
      }
      // 底部tab栏活动
      .tab-active {
        background-image: url('@/pages/mayDay2024/assets/tab_3.png');
        color: #4277ff;
        text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
      }
    }

    .rules-text {
      //margin-bottom: 20px;
      margin-left: 72px;
      img {
        width: 50px;
        height: auto;
      }
    }
  }
}
</style>
