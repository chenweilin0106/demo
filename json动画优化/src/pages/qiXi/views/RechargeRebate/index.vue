<template>
  <div class="RechargeRebate">
    <!-- 充值领礼包组件 -->
    <Single_RechargeGift
      :single_recharge_status="single_recharge_status"
      @goRecharge="handleRecharge"
      @getRechargeGift="getRechargeGift"
    />
    <!-- 充值有礼列表 -->
    <QiXiBox
      class="RechargeRebate_BottomBox"
      :class="
        RechargeGiftListMark == '连续充值有礼' && [
          'RechargeRebate_BottomBox_active',
          'coiled_bgs'
        ]
      "
    >
      <div class="theme_children_tab RechargeRebate_BottomBox_Tab">
        <div
          v-for="item in RechargeGiftList_Text"
          :key="item"
          class="theme_tabs_item"
          @click="RechargeGiftListMark = item"
          :class="{
            theme_tabs_item_active: RechargeGiftListMark == item
          }"
        >
          <!-- {{ item }} -->
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 累积充值有列表和连续充值有礼列表组件 -->
        <RechargeGiftList
          :RechargeGiftListData="RechargeGiftListData"
          :RechargeGiftListMark="RechargeGiftListMark"
          @toRecharge="handleRecharge"
          @updateRechargeData="updateRechargeData"
        />
      </div>
    </QiXiBox>
  </div>
</template>

<script>
// 充值列表组件
import RechargeGiftList from './components/RechargeGiftList'
// 充值礼包组件
import Single_RechargeGift from './components/Single_RechargeGift'
// 导入默认数据
import { rechargeRebate } from '../../utils/pageData'
// 充值方法导入
import { recharge } from '../../utils/toApp'
// 接口导入
import { getPageData } from '../../api/index'
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
    margin-top: 23px !important;
    ::v-deep .head {
      position: relative;
      width: 359px;
      height: 70px;
      margin: 0 0 -5px -4px !important;
      background-image: url('../../assets/zs_1.png');
    }
    ::v-deep .main {
      width: 355px;
      margin-top: -4px;
      background-size: 100% 96.5%;
    }

    margin-top: 18px;
    .RechargeRebate_BottomBox_Tab {
      // background: url('../../assets/zs_1.png') no-repeat center top/100% auto;
      position: relative;
      margin-top: -50px;
      // margin-bottom: 10px;
      height: 50px;
      .theme_tabs_item {
        position: relative;
        height: 36.1px;
        font-size: 16px;
        line-height: 36px;
        margin-top: 14px;
      }
      // 底部tab栏活动
      .theme_tabs_item_active {
        font-weight: 500 !important;
        font-size: 19px !important;
        height: 50px !important;
        margin-top: 0px;
      }
    }
    ::v-deep .foot {
      width: 355px;
      margin-top: -35px;
      margin-bottom: 36px;
    }
  }
  .coiled_bgs {
    ::v-deep .main {
      background-size: 100% 94.5% !important;
    }
  }
  .RechargeRebate_BottomBox_active {
    ::v-deep .head {
      left: 4px;
      background-image: url('../../assets/zs_2.png') !important;
    }
  }
}
</style>
