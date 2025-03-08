<template>
  <div class="pointReward">
    <!-- 任务列表 -->
    <TasksList v-bind="taskListData" @clickTaskBtn="clickTaskBtn" />
    <!-- 兑换列表 -->
    <ExchangeList v-bind="exchangeListData" @clickExchangeBtn="clickExchangeBtn" />
    <Jump2024 :pointName="pointName" />
    <!-- 兑换好礼弹框 -->
    <ExchangeGiftsPopup v-if="showExchangeGiftsPopup" v-bind="exchangeGiftsPopupData" @update="updateGoodsList" @clickClose="showExchangeGiftsPopup = false" />
  </div>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api/index'
import { recharge } from '@/utils/toApp'
import visibilityMixin from '@/mixins/visibilityMixin'
import TasksList from '@/pages/celebration/views/m1/views/pointReward/components/tasksList.vue'
import ExchangeList from '@/pages/celebration/views/m1/views/pointReward/components/exchangeList.vue'
import Jump2024 from '@/pages/celebration/views/m1/views/pointReward/components/jump2024.vue'
const ExchangeGiftsPopup = () => import('@/pages/celebration/views/m1/views/pointReward/popups/exchangeGiftsPopup.vue')
export default {
  name: 'pointReward',
  mixins: [visibilityMixin],
  components: { ExchangeGiftsPopup, TasksList, ExchangeList, Jump2024 },
  data() {
    return {
      user_icon: '', // 用户头像
      my_goods: 0, // 拥有的道具数量
      spend_point: 0, // 花费道具数量
      task_list: {
        login: { task_name: '每日登录', award_nums: 5, show_text: '5', finish_times: 1, max_times: 1, need_rev: true, has_right: 0, is_recharge: false },
        keju: { task_name: '在科举游戏中至少获得5000元宝奖励', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: false },
        recharge_once: { task_name: '完成一笔充值', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: true },
        masonry_consume: { task_name: '消费1000钻', award_nums: 10, show_text: '10', finish_times: 0, max_times: 1000, need_rev: true, has_right: 0, is_recharge: false },
        recharge: { task_name: '每充值10元', award_nums: 6, show_text: '6', finish_times: 0, max_times: 10, need_rev: false, has_right: 0, is_recharge: false }
      }, // 任务列表
      goods_list: [
        { type: 'tools_ljs', goods_name: '绿晶石', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 1, price_text: '1', max_times: 0, goods_icon: 'ljs_120_120.png', goods_icon_t: 'ljs_120_120.png', goods_num_text: '绿晶石+1', desc: '用于提升技能等级，可增加成功率', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'lucky_key', goods_name: '钥匙', goods_type: 'keys', goods_id: 0, goods_num: 1, price: 50, price_text: '50', max_times: 2, goods_icon: 'xyys_120_120.png', goods_icon_t: 'xyys_120_120.png', goods_num_text: '钥匙+1', is_second_half: false, is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'keju', goods_name: '科举双倍卡', goods_type: 'keju', goods_id: 1, goods_num: 1, price: 8, price_text: '8', max_times: 5, goods_icon: 'sbk_120_120.png', goods_icon_t: 'sbk_120_120.png', goods_num_text: '科举双倍卡+1', desc: '可在科举中使获得的元宝变为双倍', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'title', goods_name: '永久称号', goods_type: 'title', goods_id: 4987, goods_num: 0, price: 50, max_times: 1, goods_icon: 'ch_7nz.png', goods_icon_t: 'ch_7nz.png', goods_num_text: '永久称号+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1, spend_cond: 20 },
        // { exchange_times: 0, goods_icon: 'yght_120_120.png', goods_icon_t: 'yght_120_120.png', goods_id: 80, goods_name: '阳光海滩', goods_num: 7, goods_num_text: '主页特效+7天', goods_type: 'costume', has_right: 1, is_lock: false, is_owned: false, max_times: 1, price: 100, price_text: '100', type: 'costume' },
        // { type: 'car_cfplh', goods_name: '乘风破浪号', goods_type: 'car', goods_id: 58, goods_num: 7, price: 300, price_text: '300', max_times: 1, goods_icon: 'cfplh_120_120.png', goods_icon_t: 'cfplh_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { desc: '用于提升技能等级，可增加成功率', exchange_times: '0', goods_icon: 'zjs_120_120.png', goods_icon_t: 'zjs_120_120.png', goods_id: 1, goods_name: '紫晶石', goods_num: 1, goods_num_text: '紫晶石+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 100, no_unlocked: 'zjs_120_120.png', price: 10, price_text: 10, spend_cond: 1000, type: 'tools_zjs' }
        // { exchange_times: 0, goods_icon: 'ts_hmxh.svga', goods_icon_t: 'ts_hmxh.svga', goods_id: 80, goods_name: '绘梦星河', goods_num: 7, goods_num_text: '头饰+7天', goods_type: 'mic', has_right: 1, is_lock: false, is_owned: false, max_times: 1, price: 100, price_text: '100', type: 'mic_hql' },
        { exchange_times: 0, goods_icon: 'qp_yhzy_sc', goods_icon_t: 'qp_yhzy_sc', goods_id: 80, goods_name: '众星闪耀', goods_num: 3, goods_num_text: '私聊气泡+3天', goods_type: 'chat_bubble', has_right: 1, is_lock: false, is_owned: false, max_times: 2, price: 45, price_text: '45', type: 'chat_bubble' },
        // { exchange_times: 0, goods_icon: 'qp_fhff_sc', goods_icon_t: 'qp_fhff_sc', goods_id: 80, goods_name: '星河幻境', goods_num: 3, goods_num_text: '公屏气泡+3天', goods_type: 'chat_bubble_pub', has_right: 1, is_lock: false, is_owned: false, max_times: 2, price: 45, price_text: '45', type: 'chat_bubble_pub' },
        { type: 'car_rhty', goods_name: '如虎添翼', goods_type: 'car', goods_id: 58, goods_num: 3, price: 130, price_text: '130', max_times: 2, goods_icon: 'rhty_184_108.png', goods_icon_t: 'rhty_184_108.png', goods_num_text: '座驾+3天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'car_cfplh', goods_name: '爱神丘比特', goods_type: 'car', goods_id: 58, goods_num: 7, price: 300, price_text: '300', max_times: 1, goods_icon: 'asqbt_120_120.png', goods_icon_t: 'asqbt_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'car_cfplh', goods_name: '雪糕车', goods_type: 'car', goods_id: 58, goods_num: 3, price: 130, price_text: '130', max_times: 2, goods_icon: 'xgc_120_120.png', goods_icon_t: 'xgc_120_120.png', goods_num_text: '座驾+3天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'pretty_card', goods_name: '靓号券', goods_type: 'pretty_card', goods_id: 58, goods_num: 5, price: 30, price_text: '30', max_times: 10, goods_icon: 'lhq_120_120.png', goods_icon_t: 'lhq_120_120.png', goods_num_text: '靓号券+5', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { exchange_times: '0', goods_icon: 'cbt_120_120.png', goods_icon_t: 'cbt_120_120.png', goods_id: 1, goods_name: '藏宝图', goods_num: 1, goods_num_text: '藏宝图+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 20, no_unlocked: 'cbt_120_120.png', price: 30, price_text: 30, spend_cond: 600, type: 'tools_cbt' }
      ], // 兑换好礼列表
      exchangeGiftsPopupData: { pointIcon: '', pointName: '', my_goods: '', type: '' }, // 兑换好礼弹框数据
      showExchangeGiftsPopup: false, // 兑换好礼弹框显示状态
      pointIcon: Object.freeze('lh_68_68.png'), // 道具图标
      pointName: Object.freeze('礼花') // 道具名称
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
    updateGoodsList(res) {
      this.$toast(res.errmsg)
      // 兑换成功 更新数据
      if (res.errno != 0) return
      this.my_goods = res.data.goods
      this.goods_list = res.data.goods_list
    },
    // 任务列表领取按钮点击事件（key标识点击的是哪个任务，isRecharge标识是否跳转充值）
    clickTaskBtn: _throttle(async function ({ has_right, is_recharge }, key) {
      if (has_right == 0 && is_recharge) {
        this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getPageData }))
        return recharge()
      }
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
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm1' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    }
  }
}
</script>

<style scoped lang="scss"></style>
