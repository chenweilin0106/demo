<template>
  <div class="PointReward">
    <!-- 任务列表 -->
    <TasksList v-bind="taskListData" @clickTaskBtn="clickTaskBtn" />
    <!-- 兑换列表 -->
    <ExchangeList v-bind="exchangeListData" @clickExchangeBtn="clickExchangeBtn" />
    <!-- 兑换好礼弹框 -->
    <ExchangeGiftsPopup v-if="showExchangeGiftsPopup" v-bind="exchangeGiftsPopupData" @update="updateGoodsList" @clickClose="showExchangeGiftsPopup = false" />
  </div>
</template>

<script>
import { _throttle } from '@/pages/summerParty2024/utils/tool'
import { getPageData } from '@/pages/summerParty2024/api/index'
import { recharge } from '@/pages/summerParty2024/utils/toApp'
import TasksList from '@/pages/summerParty2024/views/pointReward/components/tasksList.vue'
import ExchangeList from '@/pages/summerParty2024/views/pointReward/components/exchangeList.vue'
import ExchangeGiftsPopup from '@/pages/summerParty2024/views/pointReward/components/exchangeGiftsPopup.vue'
export default {
  name: 'pointReward',
  components: { ExchangeGiftsPopup, TasksList, ExchangeList },
  data() {
    return {
      user_icon: '', // 用户头像
      my_goods: 0, // 拥有的道具数量
      spend_point: 0, // 花费道具数量
      task_list: {
        login: { task_name: '每日登录', award_nums: 5, show_text: '5', finish_times: 1, max_times: 1, need_rev: true, has_right: 0, is_recharge: false },
        keju: { task_name: '完成一次科举', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: false },
        recharge_once: { task_name: '完成一笔充值', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: true },
        masonry_consume: { task_name: '消费1000钻', award_nums: 10, show_text: '10', finish_times: 0, max_times: 1000, need_rev: true, has_right: 0, is_recharge: false },
        recharge: { task_name: '每充值10元', award_nums: 6, show_text: '6', finish_times: 0, max_times: 10, need_rev: false, has_right: 0, is_recharge: false }
      }, // 任务列表
      goods_list: [
        { type: 'tools_ljs', goods_name: '绿晶石', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 1, price_text: '1', max_times: 0, goods_icon: 'ljs_120_120.png', goods_icon_t: 'ljs_120_120.png', goods_num_text: '绿晶石+1', desc: '用于提升技能等级，可增加成功率', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'lucky_key', goods_name: '钥匙', goods_type: 'keys', goods_id: 0, goods_num: 1, price: 50, price_text: '50', max_times: 2, goods_icon: 'xyys_120_120.png', goods_icon_t: 'xyys_120_120.png', goods_num_text: '钥匙+1', is_second_half: false, is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'keju', goods_name: '科举双倍卡', goods_type: 'keju', goods_id: 1, goods_num: 1, price: 8, price_text: '8', max_times: 5, goods_icon: 'sbk_120_120.png', goods_icon_t: 'sbk_120_120.png', goods_num_text: '科举双倍卡+1', desc: '可在科举中使获得的元宝变为双倍', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'title', goods_name: '永久称号', goods_type: 'title', goods_id: 4987, goods_num: 0, price: 550, max_times: 1, goods_icon: 'ch_zftl', goods_icon_t: 'ch_zftl', goods_num_text: '永久称号+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { exchange_times: 0, goods_icon: 'yght_120_120.png', goods_icon_t: 'yght_120_120.png', goods_id: 80, goods_name: '阳光海滩', goods_num: 7, goods_num_text: '主页特效+7天', goods_type: 'costume', has_right: 1, is_lock: false, is_owned: false, max_times: 1, price: 100, price_text: '100', type: 'costume' },
        { type: 'car_cfplh', goods_name: '乘风破浪号', goods_type: 'car', goods_id: 58, goods_num: 7, price: 300, price_text: '300', max_times: 1, goods_icon: 'cfplh_120_120.png', goods_icon_t: 'cfplh_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { desc: '用于提升技能等级，可增加成功率', exchange_times: '0', goods_icon: 'zjs_120_120.png', goods_icon_t: 'zjs_120_120.png', goods_id: 1, goods_name: '紫晶石', goods_num: 1, goods_num_text: '紫晶石+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 100, no_unlocked: 'zjs_120_120.png', price: 10, price_text: 10, spend_cond: 1000, type: 'tools_zjs' }
      ], // 兑换好礼列表
      exchangeGiftsPopupData: { pointIcon: '', pointName: '', my_goods: '', type: '' }, // 兑换好礼弹框数据
      showExchangeGiftsPopup: false, // 兑换好礼弹框显示状态
      pointIcon: Object.freeze('xg_68_56.png'), // 道具图标
      pointName: Object.freeze('西瓜') // 道具名称
    }
  },
  computed: {
    taskListData() {
      return { task_list: this.task_list, pointIcon: this.pointIcon, pointName: this.pointName }
    },
    exchangeListData() {
      return { my_goods: this.my_goods, goods_list: this.goods_list, pointIcon: this.pointIcon, pointName: this.pointName, spend_point: this.spend_point }
    }
  },
  async created() {
    await this.getPageData()
    this.$store.commit('getUserIcon', this.user_icon)
    this.exchangeGiftsPopupData = { pointIcon: this.pointIcon, pointName: this.pointName }
  },
  methods: {
    // 兑换好礼列表更新事件
    updateGoodsList(param) {
      this.goods_list = param.goods_list
      this.my_goods = param.goods
    },
    // 任务列表领取按钮点击事件（key标识点击的是哪个任务，isRecharge标识是否跳转充值）
    clickTaskBtn: _throttle(async function ({ has_right, is_recharge }, key) {
      if (has_right == 0 && is_recharge) return recharge(this.hiddenFn)
      if (has_right != 1) return
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno != 0) return // 请求出错
      this.my_goods = res.data.goods
      this.task_list[key].has_right = res.data.has_right
    }, 1000),
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    clickExchangeBtn(param) {
      if (param.has_right != 1) return
      if (!this.isEnough(param)) return
      this.exchangeGiftsPopupData = { ...this.exchangeGiftsPopupData, my_goods: this.my_goods, type: param.type }
      this.showExchangeGiftsPopup = true
    },
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.my_goods < actualPrice) res = false
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
        this.getPageData()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm1' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    }
  }
}
</script>

<style scoped lang="scss"></style>
