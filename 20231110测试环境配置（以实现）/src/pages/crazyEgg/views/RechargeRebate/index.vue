<template>
  <div class="RechargeRebate">
    <!-- 充值礼包组件 -->
    <Single_RechargeGift
      :single_recharge_status="single_recharge_status"
      @goRecharge="handleRecharge"
      @getRechargeGift="getRechargeGift"
    />
    <crazy-egg-box
      class="RechargeRebate_BottomBox"
      :class="{ box_active: RechargeGiftListMark == '连续充值有礼' }"
    >
      <div class="recharge_rebate_main">
        <div
          class="RechargeRebate_BottomBox_Tab"
          @click.self="
            RechargeGiftListMark =
              RechargeGiftListMark == '累计充值有礼'
                ? '连续充值有礼'
                : '累计充值有礼'
          "
        >
          <div
            v-if="RechargeGiftListMark === '累计充值有礼'"
            class="left-tab"
            @click.self="RechargeGiftListMark = '累计充值有礼'"
          ></div>
          <div
            v-else-if="RechargeGiftListMark === '连续充值有礼'"
            class="right-tab"
            @click.self="RechargeGiftListMark = '连续充值有礼'"
          ></div>
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
      </div>
    </crazy-egg-box>
  </div>
</template>

<script>
// 充值列表组件
import RechargeGiftList from './components/RechargeGiftList'
// 充值礼包组件
import Single_RechargeGift from './components/Single_RechargeGift'
// 导入默认数据
import { rechargeRebate } from '@/pages/crazyEgg/utils/pageData'
// 充值方法导入
import { recharge } from '@/pages/crazyEgg/utils/toApp'
// 接口导入
import { getPageData } from '@/pages/crazyEgg/api/index'

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
      return await getPageData({
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
    width: 732px;
    margin-top: 27px;
    margin-bottom: 180px;

    .recharge_rebate_main {
      position: absolute;
      z-index: 3;
      top: -82px;
      left: 50%;
      transform: translateX(-50%);
      height: fit-content;
    }

    .RechargeRebate_BottomBox_Tab {
      position: relative;
      width: 672px;
      height: 92px;
      background: url('@/pages/crazyEgg/assets/tab_bg.png') no-repeat left
        top/100% auto;
      margin-bottom: 19px;

      .left-tab {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 342px;
        height: 92px;
        background: url('@/pages/crazyEgg/assets/tab_z.png') no-repeat left
          top/100% auto;
      }

      .right-tab {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 342px;
        height: 92px;
        background: url('@/pages/crazyEgg/assets/tab_y.png') no-repeat left
          top/100% auto;
      }
    }

    ::v-deep .main {
      height: 1718px;
    }
  }

  .box_active {
    ::v-deep .main {
      height: 1028px !important;
    }
  }
}
</style>
