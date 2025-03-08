<template>
  <div class="RechargeRebate">
    <!-- 天天首充礼 -->
    <Single_RechargeGift
      :single_recharge_status="single_recharge_status"
      @goRecharge="handleRecharge"
      @getRechargeGift="getRechargeGift"
    />
    <!--累计首充礼-->
    <first-cumulative-reward />
    <!--累计充值有礼-->
    <out-box class="consume-list" title="title_4.png">
      <div class="tabs_contain">
        <!-- 累积充值有礼和连续充值有礼组件 -->
        <RechargeGiftList
          :RechargeGiftListData="pageData.recharge_status"
          @toRecharge="handleRecharge"
          @updateRechargeData="updateRechargeData"
        />
      </div>
    </out-box>
  </div>
</template>

<script>
import FirstCumulativeReward from './components/first-cumulative-reward.vue'
// 充值列表组件
import RechargeGiftList from './components/RechargeGiftList'
// 充值礼包组件
import Single_RechargeGift from './components/Single_RechargeGift'
// 导入默认数据
import { module2 } from '../../utils/pageData'
// 充值方法导入
import { recharge } from '../../utils/toApp'
// 接口导入
import { getPageData } from '../../api/index'

export default {
  name: 'RechargeRebate',
  components: {
    FirstCumulativeReward,
    Single_RechargeGift,
    RechargeGiftList
  },
  data() {
    return {}
  },
  computed: {
    // 充值礼包
    single_recharge_status() {
      return this.pageData.single_recharge_status
    }
  },
  async created() {
    // 导入默认数据
    this.pageData = module2
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
  //overflow: hidden;
  //margin-bottom: 1000px;

  .consume-list {
    margin-top: 18px;
    //overflow: hidden;
    padding-bottom: 55px;
    padding-top: 89px;
  }
}
</style>
