<template>
  <div class="RechargeRebate" @click="showBubble = false">
    <FirstDouble
      :fist-double-data="single_recharge_status"
      @updatePageData="getPageData({ type: 'tab', mark: 'm2' })"
      @updateFirstDoubleData="updateFirstDoubleData"
    />
    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @updatePageData="getPageData({ type: 'tab', mark: 'm2' })" />
    <OutBox class="RechargeRebate_BottomBox">
      <div class="consume-tabs">
        <div
          v-for="(item, index) in RechargeGiftList_Text"
          :key="item"
          class="flex align-center justify-center line-height-100"
          :class="['tab', { 'tab-active': RechargeGiftListMark == item }]"
          @click="RechargeGiftListMark = item"
        >
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
    </OutBox>
  </div>
</template>

<script>
import getPageDataMixin from '@/pages/childrenDay/mixins/getPageDataMixin' // 获取页面数据混入
import RechargeTasksList from '@/pages/childrenDay/views/rechargeRebate/components/rechargeTasksList.vue' // 充值任务列表
import FirstDouble from '@/pages/childrenDay/views/rechargeRebate/components/firstDouble' // 天天首充礼
import GiftBox from '@/pages/childrenDay/views/rechargeRebate/components/giftBox/index.vue' // 礼盒
import { rechargeRebate } from '@/pages/childrenDay/utils/pageData' // 默认数据
import { recharge } from '@/pages/childrenDay/utils/toApp' // 跳转APP充值界面

export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList, GiftBox },
  mixins: [getPageDataMixin],
  data() {
    return {
      // showBubble: true,
      // bubbleTimer: null,
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  watch: {
    // showBubble: {
    //   handler(val) {
    //     if (val) {
    //       this.bubbleTimer = setTimeout(() => {
    //         this.showBubble = false
    //         this.clearBubbleTimer()
    //       }, 5000)
    //     } else {
    //       this.clearBubbleTimer()
    //     }
    //   },
    //   immediate: true
    // }
  },
  computed: {
    giftBoxData() {
      return { user_tickets: this.pageData.user_tickets, user_recharges: this.pageData.user_recharges }
    },
    RechargeGiftListData() {
      return this.RechargeGiftListMark == '累计充值有礼' ? this.pageData.recharge_status : this.pageData.accruing_days_list
    },
    single_recharge_status() {
      return { ...this.pageData.single_recharge_status, is_last_day: this.pageData.is_last_day }
    }
  },
  async created() {
    this.pageData = rechargeRebate
    await this.getPageData({ type: 'tab', mark: 'm2' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    // clearBubbleTimer() {
    //   clearTimeout(this.bubbleTimer)
    //   this.bubbleTimer = null
    // },
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
  }
  // beforeDestroy() {
  //   this.clearBubbleTimer()
  // }
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
  padding-top: 110px;

  .RechargeRebate_BottomBox {
    border-radius: 0 0 24px 24px;
    margin-top: 136px;
    padding-bottom: 10px;
    padding-top: 30px;
    .consume-tabs {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -97px;
      display: flex;
      justify-content: center;
      .tab {
        position: relative;
        width: 336px;
        height: 90px;
        background: no-repeat left top/100% 100%;
        &:nth-child(1) {
          margin-right: 28px;
          background-image: url('@/pages/childrenDay/assets/mk2_12_1.png');
          .addIcon {
            right: 0;
            top: -8px;
            width: 68px;
            height: 103px;
          }
          &.tab-active {
            background-image: url('@/pages/childrenDay/assets/mk2_12.png');
          }
        }
        &:nth-child(2) {
          //margin-right: 6px;
          background-image: url('@/pages/childrenDay/assets/mk2_13.png');
          .addIcon {
            right: -8px;
            top: -15px;
            width: 72px;
            height: 100px;
          }
          &.tab-active {
            background-image: url('@/pages/childrenDay/assets/mk2_13_1.png');
          }
        }
      }
    }

    .rules-text {
      //margin-bottom: 20px;
      margin-left: 56px;
      img {
        width: 50px;
        height: auto;
      }
    }
  }
}
</style>
