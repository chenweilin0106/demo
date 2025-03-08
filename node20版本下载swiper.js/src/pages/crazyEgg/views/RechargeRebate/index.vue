<template>
  <div class="RechargeRebate" @click="showBubble = false">
    <!-- 充值礼包组件 -->
    <FirstDouble
      :fist-double-data="single_recharge_status"
      @recharge="recharge(hiddenFn)"
      @updateFirstDoubleData="updateFirstDoubleData"
      @changeBubble="showBubble = !showBubble"
    />

    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @recharge="recharge(hiddenFn)" />
    <OutBox class="RechargeRebate_BottomBox" :class="{ box_active: RechargeGiftListMark == '连续充值有礼' }">
      <div
        class="RechargeRebate_BottomBox_Tab margin-row-center"
        @click.self="RechargeGiftListMark = RechargeGiftListMark == '累计充值有礼' ? '连续充值有礼' : '累计充值有礼'"
      >
        <img :src="IconPath('mk2_14.png')" class="update position-absolute pointer-none" />
        <div v-if="RechargeGiftListMark === '累计充值有礼'" class="left-tab" @click.self="RechargeGiftListMark = '累计充值有礼'"></div>
        <div v-else-if="RechargeGiftListMark === '连续充值有礼'" class="right-tab" @click.self="RechargeGiftListMark = '连续充值有礼'"></div>
      </div>
      <RechargeGiftList
        v-show="RechargeGiftListMark == '累计充值有礼'"
        :RechargeGiftListData="pageData.recharge_status"
        :transitionClass="transitionClass"
        @recharge="recharge(hiddenFn)"
        @updateRechargeData="updateRechargeData"
      />
      <RechargeGiftList
        v-show="RechargeGiftListMark == '连续充值有礼'"
        :RechargeGiftListData="pageData.accruing_days_list"
        :transitionClass="transitionClass"
        @recharge="recharge(hiddenFn)"
        @updateRechargeData="updateRechargeData"
      />
      <!-- 说明文字 -->
      <div class="RechargeGiftList_Footer">
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
import GiftBox from '@/pages/crazyEgg/views/RechargeRebate/components/giftBox/index.vue'
// 充值列表组件
import RechargeGiftList from './components/RechargeGiftList'
import FirstDouble from '@/pages/crazyEgg/views/RechargeRebate/components/firstDouble/index.vue'
// 导入默认数据
import { rechargeRebate } from '@/pages/crazyEgg/utils/pageData'
// 充值方法导入
import { recharge } from '@/pages/crazyEgg/utils/toApp'
// 接口导入
import { getPageData } from '@/pages/crazyEgg/api/index'

export default {
  name: 'RechargeRebate',
  components: {
    FirstDouble,
    RechargeGiftList,
    GiftBox
  },
  data() {
    return {
      showBubble: true,
      bubbleTimer: null,
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      // tab标识
      RechargeGiftListMark: '累计充值有礼'
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
    // 充值返利列表数据
    RechargeGiftListData() {
      if (this.RechargeGiftListMark === '累计充值有礼') {
        return this.pageData.recharge_status
      } else {
        return this.pageData.accruing_days_list
      }
    },
    single_recharge_status() {
      return { ...this.pageData.single_recharge_status, is_last_day: this.pageData.is_last_day, showBubble: this.showBubble }
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
    clearBubbleTimer() {
      clearTimeout(this.bubbleTimer)
      this.bubbleTimer = null
    },
    updateFirstDoubleData() {
      this.pageData.single_recharge_status.has_right = 2
    },
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    updateGiftBoxData(user_tickets) {
      this.pageData.user_tickets = user_tickets
    },
    // 更新充值列表数据
    updateRechargeData(mark) {
      // 判断更新的是累计充值还是连续充值
      const type = this.RechargeGiftListMark === '累计充值有礼' ? 'recharge_status' : 'accruing_days_list'
      this.pageData[type][mark].has_right = 2
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
    // 跳转APP充值界面
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    recharge,
    // 充值礼包领取按钮点击事件
    async getRechargeGift() {
      const res = await this.rechargeGift()
      this.$toast(res.errmsg)
      this.pageData.single_recharge_status.has_right = !res.errno ? 2 : 1
    },
    // 充值礼包领取接口
    async rechargeGift() {
      return await getPageData({
        type: 'recharge_single_reward'
      })
    }
  },
  beforeDestroy() {
    this.clearBubbleTimer()
  }
}
</script>

<style scoped lang="scss">
.RechargeRebate {
  position: relative;

  .RechargeRebate_BottomBox {
    //height: 1923px;
    margin-top: 23px;
    padding-top: 46px;
    margin-bottom: 180px;
    padding-bottom: 20px;

    .RechargeRebate_BottomBox_Tab {
      position: relative;
      width: 672px;
      height: 92px;
      background: url('@/pages/crazyEgg/assets/tab_bg.png') no-repeat left top/100% auto;
      margin-bottom: 19px;
      .update {
        z-index: 1;
        top: -13px;
        left: 0;
        width: 72px;
        height: 100px;
      }
      .left-tab {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 342px;
        height: 92px;
        background: url('@/pages/crazyEgg/assets/tab_z.png') no-repeat left top/100% auto;
      }
      .right-tab {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 342px;
        height: 92px;
        background: url('@/pages/crazyEgg/assets/tab_y.png') no-repeat left top/100% auto;
      }
    }
    ::v-deep .main {
      height: 1772px;
    }
  }
  .box_active {
    ::v-deep .main {
      height: 1062px !important;
    }
  }
  .RechargeGiftList_Footer {
    margin-top: 0;
    margin-left: 81px;
    color: #ffefcf;
    margin-bottom: 22px;
    width: 612px;

    li {
      position: relative;
      line-height: 42px;
      font-size: 28px;
      white-space: nowrap;

      span {
        position: absolute;
        top: 13px;
        left: -25px;
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #fffaa6;
      }
      img {
        width: 50px;
        height: auto;
      }
    }
  }
}
</style>
