<template>
  <div class="pointReward">
    <!-- 任务列表 -->
    <TasksList :config="configTasksList" @clickTaskBtn="clickTaskBtn" />
    <!-- 兑换列表 -->
    <ExchangeList :config="configExchangeList" @clickExchangeBtn="clickExchangeBtn" />
    <Jump2024 :pointName="pointName" :show_full="show_full" />
    <!-- 兑换好礼弹框 -->
    <ExchangePopup v-if="isShowExchangePopup" v-bind="configExchangePopup" @exchangeSuccess="exchangeSuccess" @clickClose="isShowExchangePopup=false" />
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import { recharge } from '@/utils/toApp'
import visibilityMixin from '@/mixins/visibilityMixin'
import TasksList from './components/tasksList.vue'
import ExchangeList from './components/exchangeList.vue'
import Jump2024 from './components/jump2024.vue'
import ExchangePopup from './components/exchangePopup.vue'

export default {
  name: 'pointReward',
  mixins: [visibilityMixin],
  components: { ExchangePopup, TasksList, ExchangeList, Jump2024 },
  data() {
    return {
      user_icon: '', // 用户头像
      show_full: 1, // 跳转晶石淬炼是否显示全屏 1:非全屏 2:全屏
      my_goods: 0, // 拥有的道具数量
      spend_point: 0, // 花费道具数量
      task_list: {
        login: { award_nums: 5, finish_times: 0, has_right: '0', is_recharge: false, max_times: 1, need_rev: 1, show_text: '5', task_name: '每日登录', piece: 2 },
        // keju: { award_nums: 5, finish_times: 0, has_right: 0, is_recharge: false, max_times: 5000, need_rev: 1, show_text: '5', task_name: '在科举游戏中至少获得5000元宝奖励', piece: 2 },
        keju: { task_name: '家族秘境', award_nums: 5, show_text: '5', finish_times: 0, max_times: 10000, need_rev: true, has_right: 0, is_recharge: false, attend_times: 0, attend_max: 2 },
        recharge_once: { award_nums: 5, finish_times: 0, has_right: 0, is_recharge: true, max_times: 1, need_rev: 1, show_text: '5', task_name: '完成一笔充值', piece: 2 },
        masonry_consume: { award_nums: 10, finish_times: 0, has_right: 0, is_recharge: false, max_times: 1000, need_rev: 1, piece: 4, show_text: '10', task_name: '消费1000钻' },
        recharge: { award_nums: 6, finish_times: 0, has_right: 0, is_recharge: false, max_times: 10, need_rev: 0, show_text: '6', task_name: '每充值10元' }
      }, // 任务列表
      goods_list: [
        { type: 'tools_ljs', goods_name: '绿晶石', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 1, price_text: '1', max_times: 0, goods_icon: 'ljs_120_120.png', goods_icon_t: 'ljs_120_120.png', goods_num_text: '绿晶石+1', desc: '用于提升技能等级，可增加成功率', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'lucky_key', goods_name: '钥匙', goods_type: 'keys', goods_id: 0, goods_num: 1, price: 50, price_text: '50', max_times: 2, goods_icon: 'xyys_120_120.png', goods_icon_t: 'xyys_120_120.png', goods_num_text: '钥匙+1', is_second_half: false, is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'keju', goods_name: '科举双倍卡', goods_type: 'keju', goods_id: 1, goods_num: 1, price: 8, price_text: '8', max_times: 5, goods_icon: 'sbk_120_120.png', goods_icon_t: 'sbk_120_120.png', goods_num_text: '科举双倍卡+1', desc: '可在科举中使获得的元宝变为双倍', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'tools_pjw', goods_name: '破甲丸', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 80, price_text: '80', max_times: 2, goods_icon: 'pjw_120_120.png', goods_icon_t: 'pjw_120_120.png', goods_num_text: '破甲丸+1', desc: '', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'tools_fsjc', goods_name: '符石精粹', goods_type: 'tool', goods_id: 2, goods_num: 20, price: 10, price_text: '10', max_times: 10, goods_icon: 'fsjc_120_120.png', goods_icon_t: 'fsjc_120_120.png', goods_num_text: '符石精粹+20', desc: '', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'title', goods_name: '永久称号', goods_type: 'title', mark: 600, goods_id: 4987, goods_num: 0, price: 550, max_times: 1, goods_icon: 'ch_mfth', goods_icon_t: 'ch_mfth', goods_num_text: '永久称号+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { exchange_times: 0, goods_icon: 'yght_120_120.png', goods_icon_t: 'yght_120_120.png', goods_id: 80, goods_name: '阳光海滩', goods_num: 7, goods_num_text: '主页特效+7天', goods_type: 'costume', has_right: 1, is_lock: false, is_owned: false, max_times: 1, price: 100, price_text: '100', type: 'costume' },
        // { type: 'car_cfplh', goods_name: '乘风破浪号', goods_type: 'car', goods_id: 58, goods_num: 7, price: 300, price_text: '300', max_times: 1, goods_icon: 'cfplh_120_120.png', goods_icon_t: 'cfplh_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { desc: '用于提升技能等级，可增加成功率', exchange_times: '0', goods_icon: 'zjs_120_120.png', goods_icon_t: 'zjs_120_120.png', goods_id: 1, goods_name: '紫晶石', goods_num: 1, goods_num_text: '紫晶石+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 100, no_unlocked: 'zjs_120_120.png', price: 10, price_text: 10, spend_cond: 1000, type: 'tools_zjs' },
        // { exchange_times: 0, goods_icon: 'okb_120_120.png', goods_icon_t: 'okb_120_120.png', goods_id: 5, goods_name: 'OK绷', goods_num: 1, goods_num_text: 'OK绷+1', goods_type: 'tool', has_right: 1, is_lock: false, is_owned: false, max_times: 10, price: 50, price_text: '50', type: 'tools_okb' },
        // { exchange_times: 0, goods_icon: 'jbp_120_120.png', goods_icon_t: 'jbp_120_120.png', goods_id: 5, goods_name: '聚宝盆', goods_num: 1, goods_num_text: '聚宝盆+1', goods_type: 'tool', has_right: 1, is_lock: false, is_owned: false, max_times: 10, price: 50, price_text: '50', type: 'tools_jbp' },
        // { exchange_times: 0, goods_icon: 'sgw_120_120.png', goods_icon_t: 'sgw_120_120.png', goods_id: 5, goods_name: '神功丸', goods_num: 1, goods_num_text: '神功丸+1', goods_type: 'tool', has_right: 1, is_lock: false, is_owned: false, max_times: 10, price: 50, price_text: '50', type: 'tools_sgw' },
        // { type: 'tools_msm', goods_name: '口香糖', goods_type: 'tool', goods_id: 5, goods_num: 1, price: 50, price_text: '50', max_times: 10, goods_icon: 'kxt_120_120.png', goods_icon_t: 'kxt_120_120.png', goods_num_text: '口香糖+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'tools_msm', goods_name: '魔术帽', goods_type: 'tool', goods_id: 5, goods_num: 1, price: 50, price_text: '50', max_times: 10, goods_icon: 'msm_120_120.png', goods_icon_t: 'msm_120_120.png', goods_num_text: '魔术帽+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'tools_msm', goods_name: 'ok'ban', goods_type: 'tool', goods_id: 5, goods_num: 1, price: 50, price_text: '50', max_times: 10, goods_icon: 'msm_120_120.png', goods_icon_t: 'msm_120_120.png', goods_num_text: '魔术帽+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { exchange_times: 0, goods_icon: 'ts_hmxh.svga', goods_icon_t: 'ts_hmxh.svga', goods_id: 80, goods_name: '绘梦星河', goods_num: 7, goods_num_text: '头饰+7天', goods_type: 'mic', has_right: 1, is_lock: false, is_owned: false, max_times: 1, price: 100, price_text: '100', type: 'mic_hql' },
        // { exchange_times: 0, goods_icon: 'zahj_120_120.png', goods_icon_t: 'zahj_120_120.png', goods_id: 80, goods_name: '真爱花嫁', goods_num: 3, goods_num_text: '私聊气泡+3天', goods_type: 'chat_bubble', has_right: 1, is_lock: false, is_owned: false, max_times: 2, price: 45, price_text: '45', type: 'chat_bubble' },
        // { exchange_times: 0, goods_icon: 'qp_fhff_sc', goods_icon_t: 'qp_fhff_sc', goods_id: 80, goods_name: '星河幻境', goods_num: 3, goods_num_text: '公屏气泡+3天', goods_type: 'chat_bubble_pub', has_right: 1, is_lock: false, is_owned: false, max_times: 2, price: 45, price_text: '45', type: 'chat_bubble_pub' },
        // { type: 'car_rhty', goods_name: '如虎添翼', goods_type: 'car', goods_id: 58, goods_num: 3, price: 130, price_text: '130', max_times: 2, goods_icon: 'rhty_184_108.png', goods_icon_t: 'rhty_184_108.png', goods_num_text: '座驾+3天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'car_rhty', goods_name: '福瑞祥龙', goods_type: 'car', goods_id: 58, goods_num: 3, price: 130, price_text: '130', max_times: 2, goods_icon: 'frxl_120_120.png', goods_icon_t: 'frxl_120_120.png', goods_num_text: '座驾+3天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'car_cfplh', goods_name: '爱神丘比特', goods_type: 'car', goods_id: 58, goods_num: 7, price: 300, price_text: '300', max_times: 2, goods_icon: 'asqbt_120_120.png', goods_icon_t: 'asqbt_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'car_cfplh', goods_name: '雪糕车', goods_type: 'car', goods_id: 58, goods_num: 3, price: 130, price_text: '130', max_times: 2, goods_icon: 'xgc_120_120.png', goods_icon_t: 'xgc_120_120.png', goods_num_text: '座驾+3天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { type: 'pretty_card', goods_name: '靓号券', goods_type: 'pretty_card', goods_id: 58, goods_num: 5, price: 30, price_text: '30', max_times: 10, goods_icon: 'lhq_120_120.png', goods_icon_t: 'lhq_120_120.png', goods_num_text: '靓号券+5', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        // { exchange_times: '0', goods_icon: 'cbt_120_120.png', goods_icon_t: 'cbt_120_120.png', goods_id: 1, goods_name: '藏宝图', goods_num: 1, goods_num_text: '藏宝图+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 30, no_unlocked: 'cbt_120_120.png', price: 30, price_text: 30, spend_cond: 300, type: 'tools_cbt' },
        // { exchange_times: '0', goods_icon: 'pyd_120_120.png', goods_icon_t: 'pyd_120_120.png', goods_id: 1, goods_name: '永久培元丹', goods_num: 10, goods_num_text: '永久培元丹+10', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 20, no_unlocked: 'pyd_120_120.png', price: 10, price_text: '10', spend_cond: 300, type: 'tools_pyd' }
      ], // 兑换好礼列表
      configExchangePopup: { pointIcon: '', pointName: '', type: '' }, // 兑换好礼弹框数据
      isShowExchangePopup: false, // 兑换好礼弹框显示状态
      pointIcon: Object.freeze('mg_67_55.png'), // 道具图标
      pointName: Object.freeze('玫瑰') // 道具名称
    }
  },
  computed: {
    configTasksList() {
      return { task_list: this.task_list, pointIcon: this.pointIcon, pointName: this.pointName }
    },
    configExchangeList() {
      return { my_goods: this.my_goods, goods_list: this.goods_list, pointIcon: this.pointIcon, pointName: this.pointName, spend_point: this.spend_point }
    }
  },
  created() {
    this.getPageData()
    this.configExchangePopup.pointIcon = this.pointIcon
    this.configExchangePopup.pointName = this.pointName
  },
  methods: {
    exchangeSuccess(params) {
      this.my_goods = params.goods
      this.goods_list = params.goods_list
    },
    // 任务列表领取按钮点击事件（key标识点击的是哪个任务，isRecharge标识是否跳转充值）
    async clickTaskBtn({ has_right }, key) {
      if (has_right == 0) {
        this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getPageData }))
        return recharge()
      }
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno != 0) return // 请求出错
      this.my_goods = res.data.goods
      this.task_list[key].has_right = res.data.has_right
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    clickExchangeBtn(param) {
      this.configExchangePopup = { goods_detail: param, pointIcon: this.pointIcon, pointName: this.pointName, my_goods: this.my_goods }
      this.isShowExchangePopup = true
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

<style scoped lang="scss">
</style>
