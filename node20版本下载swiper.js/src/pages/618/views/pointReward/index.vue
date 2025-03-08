<template>
  <div class="PointReward">
    <!-- 任务列表 -->
    <TasksList v-bind="taskListData" @clickTaskBtn="clickTaskBtn" />
    <!-- 兑换列表 -->
    <ExchangeList v-bind="exchangeListData" @clickExchangeBtn="clickExchangeBtn" />
    <!-- 兑换好礼弹框 -->
    <ExchangeGiftsPopup
      v-if="showExchangeGiftsPopup"
      v-bind="exchangeGiftsPopupData"
      @update="updateGoodsList"
      @clickClose="showExchangeGiftsPopup = false"
    />
  </div>
</template>

<script>
import { _throttle } from '@/pages/618/utils/tool'
import { pointReward } from '@/pages/618/utils/pageData'
import { getPageData } from '@/pages/618/api/index'
import getPageDataMixin from '@/pages/618/mixins/getPageDataMixin'
import { recharge } from '@/pages/618/utils/toApp'
import TasksList from '@/pages/618/views/pointReward/components/tasksList.vue'
import ExchangeList from '@/pages/618/views/pointReward/components/exchangeList.vue'
const ExchangeGiftsPopup = () => import('./components/exchangeGiftsPopup.vue')

export default {
  name: 'PointReward',
  mixins: [getPageDataMixin],
  components: { ExchangeGiftsPopup, TasksList, ExchangeList },
  data() {
    return {
      exchangeGiftsPopupData: { pointIcon: '', pointName: '', my_goods: '', type: '' }, // 兑换好礼弹框数据
      showExchangeGiftsPopup: false, // 兑换好礼弹框显示状态
      pointIcon: Object.freeze('bk_60_57.png'), // 道具图标
      pointName: Object.freeze('贝壳') // 道具名称
    }
  },
  computed: {
    taskListData() {
      return {
        task_list: this.pageData.task_list,
        pointIcon: this.pointIcon,
        pointName: this.pointName
      }
    },
    exchangeListData() {
      return {
        my_goods: this.pageData.my_goods,
        goods_list: this.pageData.goods_list,
        pointIcon: this.pointIcon,
        pointName: this.pointName,
        spend_point: this.pageData.spend_point
      }
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm1' })
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
    this.exchangeGiftsPopupData = { pointIcon: this.pointIcon, pointName: this.pointName }
  },
  methods: {
    // 兑换好礼列表更新事件
    updateGoodsList(res) {
      this.$toast(res.errmsg)
      // 兑换成功 更新数据
      if (res.errno != 0) return
      this.pageData.my_goods = res.data.goods
      this.pageData.goods_list = res.data.goods_list
    },
    // 任务列表领取按钮点击事件（key标识点击的是哪个任务，isRecharge标识是否跳转充值）
    clickTaskBtn: _throttle(async function ({ has_right, is_recharge }, key) {
      if (has_right == 0 && is_recharge) return recharge(this.hiddenFn)
      if (has_right != 1) return
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno != 0) return // 请求出错
      this.pageData.my_goods = res.data.goods
      this.pageData.task_list[key].has_right = res.data.has_right
    }, 1000),
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    clickExchangeBtn(param) {
      if (param.has_right != 1) return
      if (!this.isEnough(param)) return
      this.exchangeGiftsPopupData = { ...this.exchangeGiftsPopupData, my_goods: this.pageData.my_goods, type: param.type }
      this.showExchangeGiftsPopup = true
    },
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.pageData.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      return res
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData({ type: 'tab', mark: 'm1' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
