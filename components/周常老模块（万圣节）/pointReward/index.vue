<template>
  <div class="pointReward">
    <!-- 任务列表 -->
    <OutBox class="tasksBox">
      <div v-for="(taskItem, taskKey) in task_list" :key="taskKey" class="taskItemDiv" :class="taskKey">
        <div class="taskItemAward">
          <div class="taskItemAwardIcon"><img :src="IconPath(pointIcon)" /></div>
          <div class="taskItemAwardText">{{ pointName }}+{{ taskItem.award_nums }}</div>
        </div>
        <div class="taskItemDesc">
          <div class="taskItemDescText1">
            {{ taskItem.task_name }}&nbsp;<van-popover v-if="taskKey == 'keju'" v-model="taskItem.showPopover" trigger="click" placement="top" get-container=".tasksBox" :close-on-click-outside="true" class="taskBubble">
              <div class="popoverMain">参与科举答题或竞猜<br>所得元宝都计算在内</div>
            </van-popover>
          </div>
          <div class="taskItemDescText2">
            <div v-if="taskItem.task_name == '每充值10元'" class="taskItemDescText2Div1">系统自动派发，无需手动领取</div>
            <div v-else class="taskItemDescText2Div2">（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</div>
          </div>
        </div>
        <div v-if="taskItem.need_rev" class="taskItemBtn" :class="`status${taskItem.has_right}`" @click="receive(taskItem, taskKey)">{{taskItem.has_right == 0 ? (taskItem.is_recharge ? '去完成' : '未完成') : taskItem.has_right == 1 ? '领取' : '已领取'}}</div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" />，{{ pointName }}</li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
    </OutBox>
    <!-- 兑换好礼 -->
    <OutBox class="exchangeBox" title="mk1_04.png">
      <div class="exchangeBoxPointNum">我的{{ pointName }}&nbsp;<img :src="IconPath(pointIcon)" />：{{ my_goods }}</div>
      <div v-for="(goods, index) in goods_list" :key="index" class="exchangeItemDiv">
        <div class="exchangeItemAward">
          <div class="exchangeItemAwardIcon">
            <PublicImg :class="goods.goods_type" :imgName="goods.goods_icon" :imgType="goods.goods_type" />
            <div v-if="goods.spend_cond && goods.spend_cond > spend_point" class="lockOverly"></div>
          </div>
          <div class="exchangeItemAwardText">{{ goods.goods_num_text }}</div>
        </div>
        <div class="exchangeItemDesc">
          <p v-if="goods.type == 'lucky_key'" class="exchangeItemDescP1">消耗<span>{{ goods.price }}个{{ pointName }}</span>兑换 第二个<span>半价</span></p>
          <p v-else class="exchangeItemDescP2">消耗<i v-if="goods.mark" class="oldPrice">{{ goods.mark }}</i><span>{{ goods.price }}个{{ pointName }}</span>兑换</p>
          <p v-if="goods.max_times == 0" class="exchangeItemDescP3">不限兑换次数</p>
          <p v-else class="exchangeItemDescP4">限兑：{{ goods.exchange_times }}/{{ goods.max_times }}</p>
          <p v-if="goods.spend_cond && goods.spend_cond > spend_point" class="exchangeItemDescP5">累计消耗{{ goods.spend_cond }}个{{ pointName }}解锁</p>
        </div>
        <div v-if="!goods.spend_cond || goods.spend_cond <= spend_point" class="exchangeBtn" :class="`status${goods.has_right}`" @click="openExchangePopup(goods)">{{ goods.has_right == 1 ? '兑换' : '已兑完' }}</div>
        <div v-if="['tools_cbt', 'tools_pyd'].includes(goods.type)" class="discountLabel"></div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中获得限定奖励</li>
          <li><span></span>消耗<img :src="IconPath('pyd_60_60.png')" />可抵用一次天赋修炼</li>
        </ul>
      </div>
    </OutBox>
    <!-- 跳转晶石淬炼活动 -->
    <OutBox class="jumpBox">
      <div class="rules-text">
        <ul>
          <li>本活动<i>首日消耗的{{ pointName }}</i>额外转化为淬炼币<img :src="IconPath('clb_45_46.png')">，淬</li>
          <li>炼币<img :src="IconPath('clb_45_46.png')">可用于【晶石淬炼】活动</li>
        </ul>
      </div>
      <div class="jumpBtn" @click="jump"></div>
    </OutBox>
    <ExchangePopup v-if="isShowExchangePopup" :pointIcon="pointIcon" :pointName="pointName" :my_goods="my_goods" :config="configExchangePopup" @getHomePage="getHomePage" @clickClose="isShowExchangePopup = false" />
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import { recharge, compareVersions, urlRouterWithApp } from '@/utils/toApp'
import { _throttle } from '@/utils/tool'
import visibilityMixin from '@/mixins/visibilityMixin'
import ExchangePopup from './popups/exchangePopup.vue'

export default {
  name: 'pointReward',
  mixins: [visibilityMixin],
  components: { ExchangePopup },
  data() {
    return {
      user_icon: '', // 用户头像
      show_full: 1, // 跳转晶石淬炼是否显示全屏 1:非全屏 2:全屏
      my_goods: 0, // 拥有的道具数量
      spend_point: 0, // 花费道具数量
      task_list: {
        login: { task_name: '每日登录', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: false },
        keju: { task_name: '在科举游戏中至少获得5000元宝奖励', award_nums: 5, show_text: '5', finish_times: 0, max_times: 5000, need_rev: true, has_right: 0, is_recharge: false },
        recharge_once: { task_name: '完成一笔充值', award_nums: 5, show_text: '5', finish_times: 0, max_times: 1, need_rev: true, has_right: 0, is_recharge: true },
        masonry_consume: { task_name: '消费1000钻', award_nums: 10, show_text: '10', finish_times: 0, max_times: 1000, need_rev: true, has_right: 0, is_recharge: false },
        recharge: { task_name: '每充值10元', award_nums: 6, show_text: '6', finish_times: 0, max_times: 10, need_rev: false, has_right: 0, is_recharge: false }
      }, // 任务列表
      goods_list: [
        { type: 'tools_ljs', goods_name: '绿晶石', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 1, price_text: '1', max_times: 0, goods_icon: 'ljs_120_120.png', goods_icon_t: 'ljs_120_120.png', goods_num_text: '绿晶石+1', desc: '用于提升技能等级，可增加成功率', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'keju', goods_name: '科举双倍卡', goods_type: 'keju', goods_id: 1, goods_num: 1, price: 8, price_text: '8', max_times: 0, goods_icon: 'sbk_120_120.png', goods_icon_t: 'sbk_120_120.png', goods_num_text: '科举双倍卡+1', desc: '可在科举中使获得的元宝变为双倍', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'pretty_card', goods_name: '靓号券', goods_type: 'pretty_card', goods_id: 58, goods_num: 5, price: 20, price_text: '20', max_times: 10, goods_icon: 'lhq_120_120.png', goods_icon_t: 'lhq_120_120.png', goods_num_text: '靓号券+5', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'lucky_key', goods_name: '钥匙', goods_type: 'keys', goods_id: 0, goods_num: 1, price: 40, price_text: '40', max_times: 2, goods_icon: 'xyys_120_120.png', goods_icon_t: 'xyys_120_120.png', goods_num_text: '钥匙+1', is_second_half: false, is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'car_mfmc', goods_name: '魔法马车', goods_type: 'car', goods_id: 58, goods_num: 7, price: 60, price_text: '60', max_times: 4, goods_icon: 'mfmc_120_120.png', goods_icon_t: 'mfmc_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { type: 'title', goods_name: '永久称号', goods_type: 'title', mark: 0, goods_id: 4987, goods_num: 0, price: 600, max_times: 1, goods_icon: 'ch_gmjl', goods_icon_t: 'ch_gmjl', goods_num_text: '永久称号+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
        { exchange_times: '0', goods_icon: 'cbt_120_120.png', goods_icon_t: 'cbt_120_120.png', goods_id: 1, goods_name: '藏宝图', goods_num: 1, goods_num_text: '藏宝图+1', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 30, no_unlocked: 'cbt_120_120.png', price: 25, price_text: '25', spend_cond: 100, type: 'tools_cbt' },
        { exchange_times: '0', goods_icon: 'pyd_120_120.png', goods_icon_t: 'pyd_120_120.png', goods_id: 1, goods_name: '培元丹', goods_num: 15, goods_num_text: '培元丹+15', goods_type: 'tool', has_right: 0, is_lock: false, is_owned: false, max_times: 50, no_unlocked: 'pyd_120_120.png', price: 10, price_text: '10', spend_cond: 300, type: 'tools_pyd' },
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
      pointIcon: Object.freeze('mk1_01.png'), // 道具图标
      pointName: Object.freeze('南瓜') // 道具名称
    }
  },
  mounted() {
    this.getHomePage()
  },
  methods: {
    /**
     * 跳转晶石淬炼活动
     */
    jump() {
      if (compareVersions('5.9.6') != -1) {
        urlRouterWithApp(`dandan-${window.location.origin}/vue/normal/game2048/index.html?show_full=${this.show_full == 1 ? 0 : this.show_full == 2 ? 1 : null}`)
      } else {
        this.$toast('因客户端版本较低，跳转后可能无法游戏，请更新版本或从聊天室功能盒中进入晶石淬炼')
      }
    },
    /**
     * 兑换成功
     */
    exchangeSuccess(params) {
      this.my_goods = params.goods
      this.goods_list = params.goods_list
    },
    /**
     * 领取任务奖励
     */
    receive: _throttle(async function (task, key) {
      if (task.has_right == 2) return
      if (task.has_right == 0) {
        if (!task.is_recharge) return
        this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getHomePage }))
        return recharge()
      }
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      this.$toast(res.errmsg)
      if (res.errno) return // 请求出错
      this.my_goods = res.data.goods
      task.has_right = 2
    }),
    /**
     * 打开兑换好礼弹框
     */
    openExchangePopup(goods) {
      if (goods.has_right == 2) return
      if (!this.isEnough(goods)) return
      this.configExchangePopup = { ...goods, price: goods.discount_price && Number(goods.discount_price) ? goods.discount_price : goods.price }
      this.isShowExchangePopup = true
    },
    /**
     * 判断道具是否足够
     */
    isEnough({ task_type, goods_type, exchange_times, price, discount_price }) {
      // console.log(goods_type, exchange_times, price)
      let res = true
      let actualPrice
      if (discount_price && Number(discount_price) > 0) {
        actualPrice = Number(discount_price)
      } else {
        actualPrice = Number(price)
      }
      if ((goods_type == 'keys' && exchange_times == 1) || (task_type == 2 && exchange_times == 1)) {
        actualPrice = Number(price) / 2
      }
      // console.log(task_type, exchange_times, actualPrice)
      if (this.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      return res
    },
    /**
     * 获取首页数据
     */
    async getHomePage() {
      const res = await getPageData({ type: 'tab', mark: 'm1' })
      if (res.errno) return this.$toast(res.errmsg)
      this.my_goods = res.data.my_goods
      this.task_list = res.data.task_list
      this.goods_list = res.data.goods_list
      this.show_full = res.data.show_full
      this.user_icon = res.data.user_icon
      this.spend_point = res.data.spend_point
    }
  }
}
</script>

<style scoped lang="scss">
.pointReward {
  .tasksBox {
    .rules-text {
      img {
        height: 32px;
      }
    }
    .taskBubble {
      width: 32px;
      height: 36px;
      margin-top: -5px;
      vertical-align: middle;
      background: url('@/pages/halloween/assets/mk1_02.png') no-repeat center center/32px 32px;
    }
    ::v-deep .van-popover {
      top: 242px !important;
      // left: 322px !important;
      .van-popover__content {
        width: fit-content;
        height: fit-content;
        background: none;
        box-shadow: none;
        overflow: visible;
        .popoverMain {
          // margin-left: 0; // 对准按钮图标
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          line-height: 30px;
          width: 200px;
          height: 92px;
          background: url('@/pages/halloween/assets/mk1_03.png') no-repeat left top/100% 100%; // 气泡文本背景
          padding: 0 0 7px;
          white-space: nowrap;
        }
      }
      .van-popover__arrow {
        display: none;
      }
    }
    .taskItemDiv {
      position: relative;
      display: flex;
      align-items: center;
      width: 664px;
      height: 136px;
      background: url('@/pages/halloween/assets/mk1_07.png') no-repeat left top/100% 100%;
      margin: 0 auto 25px;
      .taskItemAward {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 108px;
        height: 108px;
        padding: 4px;
        margin: 0 26px 0 28px;
        border-radius: 16px;
        background-color: #BCC9FE;
        .taskItemAwardIcon {
          width: 100%;
          height: 68px;
          border-radius: 12px 12px 0 0;
          background-color: #6D67BF;
          display: flex;
          align-items: center;
          justify-content: center;
          > img {
            width: 50px;
            height: auto;
          }
        }
        .taskItemAwardText {
          border-radius: 0 0 12px 12px;
          font-weight: 500;
          font-size: 24px;
          background-color: #42498D;
          color: #fff;
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
      }
      .taskItemDesc {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 300px;
        min-width: 0;
        line-height: 1;
        .taskItemDescText1 {
          white-space: normal;
          &:nth-child(1) {
            font-size: 30px;
            color: #fff;
          }
        }
        .taskItemDescText2 {
          .taskItemDescText2Div1 {
            font-weight: 500;
            font-size: 24px;
            color: #FFE25E;
            margin-top: 24px;
          }
          .taskItemDescText2Div2 {
            font-weight: 500;
            font-size: 24px;
            color: #FFE25E;
            margin-top: 24px;
            text-indent: -0.5em;
          }
        }
      }
      .taskItemBtn {
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        width: 124px;
        height: 64px;
        font-size: 28px;
        font-weight: 500;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        // 渐变
        border: 2px solid transparent;
        border-radius: 99999px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        &.status0{
          background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
        }
        &.status1{
          background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2{
          background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
        }
      }
      &.keju{
        .taskItemDesc{
          .taskItemDescText1{
            line-height: 36px;
          }
        }
        .taskItemDescText2{
          .taskItemDescText2Div2{
            margin-top: 5px;
          }
        }
      }
    }
  }
  .exchangeBox {
    .exchangeBoxPointNum {
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      border-radius: 24px;
      margin: 0 auto 20px;
      padding: 0 10px;
      min-width: 320px;
      height: 48px;
      font-size: 28px;
      background-color: #6D69B6;
      color: #FFFFFF;
      > img {
        width: auto;
        height: 32px;
      }
    }
    .exchangeItemDiv {
      position: relative;
      margin: 0 auto 17px;
      width: 668px;
      height: 168px;
      -webkit-background-clip: content-box, padding-box;
      -webkit-background-origin: content-box, padding-box;
      background-image: linear-gradient(-90deg, #6662AF 10%, #827ECB 70%), linear-gradient(#564F9B, #564F9B);
      border-radius: 14px;
      padding: 2px;
      display: flex;
      .discountLabel {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 77px;
        height: 77px;
        background: url('@/pages/halloween/assets/mk1_4.png') no-repeat left top/100% 100%;
      }
      .exchangeItemAward {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 240px;
        .exchangeItemAwardIcon {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          height: 124px;
          background: linear-gradient(180deg, #BDC9FE, #BDC9FE);
          border-radius: 12px 0 0 0;
          .chat_bubble,
          .chat_bubble_pub {
            width: 180px;
            height: 180px;
          }
          .title {
            width: 210px;
            height: 96px;
          }
          .mic,
          .voice {
            width: 120px;
            height: 120px;
          }
          .lockOverly {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.3) url('@/pages/halloween/assets/mk1_5.png') no-repeat center center/30px 33px;
            border-radius: 12px 0 0 0;
          }
        }
        .exchangeItemAwardText {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          border-radius: 0 0 0 12px;
          font-size: 24px;
          font-weight: 500;
          background-color: #42498D;
          color: #FFF1E5;
          line-height: 1;
        }
      }
      .exchangeItemDesc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1;
        position: relative;
        height: 100%;
        width: fit-content;
        z-index: 1;
        padding: 31px 0 33px 24px;
        .exchangeItemDescP1{
          font-size: 28px;
          font-weight: bold;
          color: #FFFFFF;
          >span {
            color: #FFE25E;
          }
        }
        .exchangeItemDescP2 {
          font-size: 28px;
          font-weight: bold;
          color: #FFFFFF;
          .oldPrice {
            position: relative;
            color: #B55832; /*老价格颜色*/
            margin: 0 5px;
            font-weight: bold;
            &::before {
              content: '';
              position: absolute;
              width: 115%;
              height: 2px;
              background: #FDC877; /*todo 删除线颜色*/
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(0deg); /*todo 删除线倾斜*/
            }
          }
          >span {
            color: #FFE25E;
          }
        }
        .exchangeItemDescP3 {
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
        }
        .exchangeItemDescP4 {
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
        }
        .exchangeItemDescP5 {
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
        }
      }
      // 兑换按钮
      .exchangeBtn {
        position: absolute;
        z-index: 2;
        bottom: 18px;
        right: 22px;
        width: 124px;
        height: 52px;
        font-size: 28px;
        font-weight: 500;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        border: 2px solid transparent;
        border-radius: 99999px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        &.status1{
          background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2{
          background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
        }
      }
    }
  }
  .jumpBox {
    padding-top: 150px;
    .jumpBtn {
      margin: 45px auto 0;
      width: 353px;
      height: 85px;
      background: url('@/pages/halloween/assets/mk1_08.png') no-repeat left top/100% 100%;
    }
    .rules-text{
      li {
        color: #C0B4F4;
      }
      i {
        color: #FFE25E;
      }
      img {
        margin: 0 5px;
        width: 45px;
        height: auto;
      }
    }
  }
}
</style>
