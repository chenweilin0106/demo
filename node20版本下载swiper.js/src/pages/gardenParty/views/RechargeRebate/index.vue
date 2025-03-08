<template>
  <div class="RechargeRebate">
    <FirstDouble
      :fist-double-data="single_recharge_status"
      @updatePageData="getPageData({ type: 'tab', mark: 'm2' })"
      @updateFirstDoubleData="updateFirstDoubleData"
    />
    <out-box class="RechargeRebate_BottomBox">
      <div
        class="RechargeRebate_BottomBox_Tab"
        :class="{
          'active-tab-bg': RechargeGiftListMark == '连续充值有礼'
        }"
      >
        <div class="reset-icon"></div>
        <div class="update-1"></div>
        <div
          v-for="item in RechargeGiftList_Text"
          :key="item"
          class="tab"
          @click="switchTab(item)"
          :class="{
            theme_tabs_item_active: RechargeGiftListMark == '连续充值有礼'
          }"
        >
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
      <div class="rule-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
        </ul>
      </div>
    </out-box>
  </div>
</template>

<script>
import RechargeTasksList from '@/pages/gardenParty/views/RechargeRebate/components/RechargeTasksList.vue'
import FirstDouble from '@/pages/gardenParty/views/RechargeRebate/components/FirstDouble'
import { rechargeRebate } from '@/pages/gardenParty/utils/pageData'
import { recharge } from '@/pages/gardenParty/utils/toApp'

export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList },
  data() {
    return {
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  computed: {
    RechargeGiftListData() {
      return this.RechargeGiftListMark == '累计充值有礼' ? this.pageData.recharge_status : this.pageData.accruing_days_list
    },
    single_recharge_status() {
      return this.pageData.single_recharge_status
    }
  },
  async created() {
    this.pageData = rechargeRebate
    await this.getPageData({ type: 'tab', mark: 'm2' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    updateFirstDoubleData(params) {
      this.pageData.single_recharge_status.awards = params
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
    margin-bottom: 170px;
    //width: 734px;
    margin-top: 146px; //tab图片高度 + 距离上方盒子高度
    padding-bottom: 80px;
    border-image-width: 0 0 110px 0;
    padding-top: 106px; // tab图片高度

    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 106px; //tab图片高度
      background: url('@/pages/gardenParty/assets/zs_1.png') no-repeat left top/100% 100%;
      margin-top: -212px; //tab图片高度 * 2

      .reset-icon {
        position: absolute;
        top: 5px;
        left: 15px;
        width: 124px;
        height: 42px;
        background: url('@/pages/gardenParty/assets/mk2_1.png') no-repeat left top/100% 100%;
      }

      .update-1 {
        position: absolute;
        bottom: 0;
        left: 294px;
        width: 96px;
        height: 126px;
        background: url('@/pages/valentineDay/assets/mk2_5.png') no-repeat left top/100% 100%;
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

      // 底部tab栏活动
      .theme_tabs_item_active {
        font-weight: 500 !important;
        font-size: 38px !important;
        height: 100px !important;
      }
    }

    .active-tab-bg {
      background: url('@/pages/gardenParty/assets/zs_2.png') no-repeat left top/100% 100%;
    }

    .rechargeAwardList {
      padding-top: 15px;
    }
    .rule-text {
      margin-left: 72px;
    }
  }
}
</style>
