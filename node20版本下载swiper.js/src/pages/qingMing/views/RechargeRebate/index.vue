<template>
  <div class="RechargeRebate">
    <!-- 充值礼包组件 -->
    <Single_RechargeGift :single_recharge_status="single_recharge_status" @goRecharge="handleRecharge" @getRechargeGift="getRechargeGift" />
    <out-box class="consume-list">
      <div class="consume-tabs">
        <div
          v-for="item in RechargeGiftList_Text"
          :key="item"
          :class="['tab', { 'tab-active': RechargeGiftListMark == item }]"
          @click="RechargeGiftListMark = item"
        >
          <div class="inner w-100 flex align-center justify-center">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tabs_contain" :class="['tabs_contain', { 'special-class': RechargeGiftListMark == '连续充值有礼' }]">
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
  .consume-list {
    position: relative;
    z-index: 2;
    //margin-top: 18px;
    padding-bottom: 55px;
    padding-top: 34px;
    margin-bottom: 170px;
    .consume-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: -73px 0 20px;
      //height: 50px;
      .tab {
        position: relative;
        width: 295px;
        height: 93px;
        background: no-repeat left top/100% 100%;
        align-items: flex-start;
        font-size: 32px;
        color: #ffffff;
        padding-top: 2px;

        .inner {
          width: 100%;
          height: 74px;
        }
      }
      .tab:nth-child(1) {
        background-image: url('@/pages/qingMing/assets/mk2_4_3.png');
      }
      .tab:nth-child(2) {
        background-image: url('@/pages/qingMing/assets/mk2_4_1.png');
      }
      // 底部tab栏活动
      .tab-active {
        padding-top: 4px;
        font-weight: bold;
        font-size: 38px;
        color: #16474a;
      }
      .tab:nth-child(1).tab-active {
        background-image: url('@/pages/qingMing/assets/mk2_4.png');
      }
      .tab:nth-child(2).tab-active {
        background-image: url('@/pages/qingMing/assets/mk2_4_2.png');
      }
    }
  }
}
</style>
