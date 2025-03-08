<template>
  <div class="RechargeRebate">
    <!-- 充值礼包组件 -->
    <Single_RechargeGift
      :single_recharge_status="single_recharge_status"
      @goRecharge="handleRecharge"
      @getRechargeGift="getRechargeGift"
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
        <!--<div class="update-2"></div>-->
        <div
          v-for="item in RechargeGiftList_Text"
          :key="item"
          class="tab"
          @click="RechargeGiftListMark = item"
          :class="{
            theme_tabs_item_active: RechargeGiftListMark == '连续充值有礼'
          }"
        >
          {{ item }}
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 累积充值有礼和连续充值有礼组件 -->
        <RechargeGiftList
          :RechargeGiftListData="RechargeGiftListData"
          :RechargeGiftListMark="RechargeGiftListMark"
          @toRecharge="handleRecharge"
          @updateRechargeData="updateRechargeData"
        />
      </div>
    </out-box>
  </div>
</template>

<script>
// 充值列表组件
import RechargeGiftList from './components/RechargeGiftList'
// 充值礼包组件
import Single_RechargeGift from './components/Single_RechargeGift'
// 导入默认数据
import { rechargeRebate } from '../../../../utils/pageData'
// 充值方法导入
import { recharge } from '../../../../utils/toApp'
// 接口导入
import { moduleTwo } from '../../../../api/index'

export default {
  name: 'RechargeRebate',
  components: {
    Single_RechargeGift,
    RechargeGiftList
  },
  data() {
    return {
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      // tab标识
      RechargeGiftListMark: '累计充值有礼'
    }
  },
  computed: {
    // 充值返利列表数据
    RechargeGiftListData() {
      if (this.RechargeGiftListMark === '累计充值有礼') {
        return this.pageData.recharge_status
      } else {
        return this.pageData.accruing_days_list
      }
    },
    // 充值礼包
    single_recharge_status() {
      return this.pageData.single_recharge_status
    }
  },
  async created() {
    // 导入默认数据
    this.pageData = rechargeRebate
    // 页面数据请求
    this.getPageData({ type: 'tab', mark: 'm2' })
  },
  methods: {
    // 更新充值列表数据
    updateRechargeData(mark) {
      // 判断更新的是累计充值还是连续充值
      const type =
        this.RechargeGiftListMark === '累计充值有礼'
          ? 'recharge_status'
          : 'accruing_days_list'
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
    // 充值礼包领取按钮点击事件
    async getRechargeGift() {
      const res = await this.rechargeGift()
      this.$toast(res.errmsg)
      this.pageData.single_recharge_status.has_right = !res.errno ? 2 : 1
    },
    // 充值礼包领取接口
    async rechargeGift() {
      return await moduleTwo({
        type: 'recharge_single_reward'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.RechargeRebate {
  position: relative;

  .RechargeRebate_BottomBox {
    //width: 734px;
    margin-top: 130px;
    padding-bottom: 80px;
    border-image-width: 0 0 170px 0;
    padding-top: 108px;

    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 108px;
      background: url('@/pages/valentineDay/assets/zs_1.png') no-repeat left
        top/100% 100%;
      margin-top: -216px;

      .reset-icon {
        position: absolute;
        top: 5px;
        left: 15px;
        width: 124px;
        height: 42px;
        background: url('@/pages/valentineDay/assets/mk2_1.png') no-repeat left
          top/100% 100%;
      }

      .update-1 {
        position: absolute;
        bottom: 0;
        left: 294px;
        width: 96px;
        height: 126px;
        background: url('@/pages/valentineDay/assets/mk2_5.png') no-repeat left
          top/100% 100%;
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
      background: url('@/pages/valentineDay/assets/zs_2.png') no-repeat left
        top/100% 100%;
    }

    .tabs_contain {
      //width: 708px;
      padding-top: 15px;
    }
  }
}
</style>
