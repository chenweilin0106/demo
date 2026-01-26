<template>
  <div class="RechargeRebate">
    <OutBox class="rechargeBox" title="mk2_11.png">
      <div class="rulesBtn" @click="openRulesPopup(1)"></div>
      <div class="rechargeBoxText1Div">
        <p class="rechargeBoxText1P1">天天首充礼·充值任意金额</p>
        <p class="rechargeBoxText1P2">每日重置，请及时领取</p>
      </div>
      <div class="rechargeBoxList" :class="single_recharge_status.awards.length == 3 && 'children3'">
        <div v-for="(award, index) in single_recharge_status.awards" :key="index" class="rechargeBoxListItem">
          <div class="rechargeBoxListItemIcon">
            <div v-if="award.mark" class="rechargeBoxListItemIconLabel">{{ index == 0 ? '2~50倍' : '首次得座驾' }}</div>
            <PublicImg :imgName="award.icon" :imgType="award.type" :class="award.type" />
          </div>
          <div class="rechargeBoxListItemText">{{award.show_text}}</div>
        </div>
      </div>
      <div class="rechargeBoxReceiveBtn" :class="`status${single_recharge_status.has_right}`" @click="receiveGift">
        {{ single_recharge_status.has_right == 2 ? is_last_day ? '已领取' : '已领取，明日再来' : single_recharge_status.has_right == 1 ? '领取' : '去完成' }}
      </div>
      <div class="rechargeDesc">
        <div class="articleTitle">首充重置</div>
        <div class="articleContent">
          <p>1.活动开始后重置<span class="speical_color">安卓、IOS、代充</span>所有额度首充</p>
          <p>2.活动期间<span>648及以下</span>额度首充双倍福利每日重置</p>
        </div>
        <div class="articleButton" @click="handleRecharge"></div>
      </div>
    </OutBox>
    <OutBox class="giftBox" title="mk2_10.png">
      <div class="tip">每充值10元可获得1次开启次数</div>
      <div class="main">
        <div class="info">
          <div class="residueNum">剩余开启次数：{{ user_tickets }}</div>
          <div class="rechargeNum">充值金额：{{ user_recharges }}</div>
        </div>
        <img :src="IconPath('mk2_03.png')" class="priceBtn" @click="openRulesPopup(2)" />
        <div class="buttons">
          <div class="openOne" @click="open(1)">开启1次</div>
          <div class="openTen" @click="open(2)">开启10次</div>
        </div>
        <div v-if="isLottery" class="lotteryBox">
          <PublicImg imgName="20240614_m2_lottery.svga" :loop="1" @animOnFinished="animOnFinished" />
        </div>
      </div>
    </OutBox>
    <OutBox class="tasksBox">
      <div class="tabs" :class="`status${currentTab.id}`">
        <!-- <div class="resetIcon pointer-none position-absolute"></div> -->
        <!-- <div v-if="recharge_status[Object.keys(recharge_status)[0]].awards[0].text_add" class="leftUpdateIcon"></div> -->
        <!-- <div v-if="accruing_days_list[Object.keys(accruing_days_list)[0]].awards[0].text_add" class="rightUpdateIcon"></div> -->
        <div v-for="tabItem in tabsArray" :key="tabItem.id" class="tab" @click="switchTab(tabItem)">{{ tabItem.tabName }}</div>
      </div>
      <transition-group class="rechargeTaskList" :name="transitionClass" tag="ul">
        <div v-for="taskItem in rechargeListShow" :key="`${currentTab.listKey}_${taskItem.condition || taskItem.amount_cond}`" class="rechargeTaskItem" :class="{ bigAwardsTask: taskItem.bigAwardsTask }">
          <div class="taskDetail">
            <p v-if="taskItem.condition" class="taskDetailP1">
              <span class="taskDetailP1Span1">累计</span>
              <span class="taskDetailP1Span2">充值满</span>
              <span class="taskDetailP1Span3">{{ taskItem.condition }}元</span>
              <span class="taskDetailP1Span4 taskDetailP1DeepSpan">（{{ taskItem.recharge_nums }}/{{ taskItem.condition }}）</span>
            </p>
            <p v-else class="taskDetailP1">
              <span class="taskDetailP1Span1">累计{{ taskItem.days_cond }}</span>
              <span class="taskDetailP1Span2">天每天充值满{{ taskItem.amount_cond }}元</span>
              <span class="taskDetailP1Span3 taskDetailP1DeepSpan">（{{ taskItem.reach_days }}/{{ taskItem.days_cond }}）</span>
            </p>
            <div v-if="!taskItem.bigAwardsTask" class="awards">
              <div class="awardItemBox" v-for="(awardItem, awardIndex) in taskItem.awards" :key="awardIndex">
                <img :src="IconPath(awardItem.icon)" alt="" />
                +{{ awardItem.text }}
                <div class="awardItemUpdate" v-if="awardItem.text_add">
                  <i>,</i>
                  <img :src="IconPath('mk2_15.png')" class="" />
                  <span :key="awardIndex + 100"> {{ awardItem.text_add }}</span>
                  <!-- <i>,</i> -->
                </div>
              </div>
            </div>
            <div v-else class="bigAwards">
              <div v-for="bigAwardItem in taskItem.awards.filter((item) => item.type !== 'prestige')" :key="bigAwardItem.name" class="bigAwardItem" :class="{ titleAward: bigAwardItem.type === 'title' }">
                <div v-if="bigAwardItem.text_add" class="bigAwardItemUpdate">
                  <i>,</i>
                  <img :src="IconPath('mk2_15.png')" />
                  <span>{{ bigAwardItem.text_add }}</span>
                </div>
                <div class="bigAwardItemIcon">
                  <PublicImg :class="bigAwardItem.type" :imgName="bigAwardItem.type == 'title' ? bigAwardItem.id == 4676 ? 'ch_rsyj_1' : 'ch_zfz' : bigAwardItem.icon" />
                </div>
                <div class="bigAwardItemText">+{{ bigAwardItem.text }}</div>
              </div>
              <p class="prestigeText">{{ taskItem.awards[taskItem.awards.length - 1]?.text }}</p>
            </div>
          </div>
          <div class="taskBtn position-absolute" :class="`status${taskItem.has_right}`" @click="receive(taskItem)">
            {{ taskItem.has_right == 0 ? '去完成' : taskItem.has_right == 1 ? '领取' : '已领取' }}
          </div>
        </div>
      </transition-group>
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_43_35.png')" />及<img :src="IconPath('hjcbt_45_37.png')" />分别可进行1/30次符石寻宝</li>
          <!-- <li><span></span>消耗<img class="pydIcon" :src="IconPath('pyd_60_60.png')" />可抵用一次天赋修炼</li> -->
        </ul>
      </div>
    </OutBox>
    <RulesPopup v-if="isShowRulesPopup" :config="configRulesPopup" @clickClose="isShowRulesPopup = false" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />
    <FailPopup v-if="isShowFailPopup" @clickClose="isShowFailPopup = false" @handleRecharge="handleRecharge" />
    <GiftPopup v-if="isShowGiftPopup" :config="configGiftPopup" @clickClose="isShowGiftPopup = false" />
  </div>
</template>

<script>
import { recharge } from '@/utils/toApp'
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
import visibilityMixin from '@/mixins/visibilityMixin'
import axios from 'axios'
import RulesPopup from './popups/rulesPopup.vue'
import ReceivePopup from './popups/receivePopup.vue'
import FailPopup from './popups/failPopup.vue'
import GiftPopup from './popups/giftPopup.vue'

export default {
  name: 'RechargeRebate',
  components: { RulesPopup, ReceivePopup, FailPopup, GiftPopup },
  mixins: [visibilityMixin],
  data() {
    return {
      is_last_day: false, // 天天首充礼 是否为最后一天 用于按钮文本显示
      single_recharge_status: {
        condition: 1,
        has_right: 0,
        awards: [
          { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', name: '绿晶石', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'mk2_17.png' },
          { type: 'tool', tool_id: 158, icon: 'cbt_120_120.png', name: '藏宝图', nums: 1, show_text: '藏宝图+1', text: '藏宝图+1', mark: '' },
          { type: '', icon: 'sjjl_120_120.png', tool_id: 0, name: '随机稀有奖励', nums: 1, show_text: '随机稀有奖励', text: '随机稀有奖励', mark: 'mk2_18.png' }
        ]
      }, // 天天首充礼 奖励
      accruing_days_list: {
        10: { amount_cond: 10, awards: [{ icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 8, text: '8', type: 'tool' }, { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }], days_cond: '3', has_right: 0, reach_days: 0 },
        30: { amount_cond: 30, awards: [{ icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 24, text: '24', type: 'tool' }, { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }], days_cond: '3', has_right: 0, reach_days: 0 },
        50: { amount_cond: 50, awards: [{ icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 40, text: '40', type: 'tool' }, { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }], days_cond: '3', has_right: 0, reach_days: 0 },
        100: { amount_cond: 100, awards: [{ icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 80, text: '80', type: 'tool' }, { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 3, text: '3', type: 'pretty_card' }], days_cond: '3', has_right: 0, reach_days: 0 },
        300: { amount_cond: 300, awards: [{ icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 160, text: '160', type: 'tool' }, { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 5, text: '5', type: 'pretty_card' }], days_cond: '3', has_right: 0, reach_days: 0 },
        500: { amount_cond: 500, awards: [{ icon: 'zjs_120_120.png', id: 1, name: '紫晶石', nums: 220, text: '220', type: 'tool' }, { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 5, text: '5', type: 'pretty_card' }, { icon: '', id: 4907, name: '称号', nums: 7, text: '7天', type: 'title', desc: '称号属性：佛山无影脚技能基础命中增加10%，基础闪避增加10%' }], days_cond: '3', has_right: 0, reach_days: 0 }
        // 1000: { amount_cond: 1000, awards: [{ icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 330, text: '330', type: 'tool' }, { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 10, text: '10', type: 'pretty_card' }], days_cond: '4', has_right: 0, reach_days: 0 },
        // 3000: { amount_cond: 3000, awards: [{ icon: 'zjs_120_120.png', id: 1, name: '紫晶石', nums: 660, text: '660', type: 'tool' }, { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 10, text: '10', type: 'pretty_card' }, { icon: '', id: 5434, name: '称号', nums: 7, text: '7天', type: 'title', desc: '称号属性：佛山无影脚技能基础命中增加15%，基础闪避增加15%' }], days_cond: '4', has_right: 0, reach_days: 0 }
      }, // 连续充值
      recharge_status: {
        30: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 160000, text_add: '', text: '16万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 16, text: '16', type: 'tool' }], condition: 30, has_right: 0, is_daily: true, recharge_nums: 0 },
        50: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 250000, text_add: '', text: '25万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 25, text: '25', type: 'tool' }], condition: 50, has_right: 0, is_daily: true, recharge_nums: 0 },
        100: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 500000, text_add: '', text: '50万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 50, text: '50', type: 'tool' }, { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 5, text: '5', type: 'cbt' }], condition: 100, has_right: 0, is_daily: true, recharge_nums: 0 },
        200: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 1000000, text_add: '', text: '100万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 100, text: '100', type: 'tool' }, { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 5, text: '5', type: 'cbt' }], condition: 200, has_right: 0, is_daily: true, recharge_nums: 0 },
        300: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 1500000, text_add: '', text: '150万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 150, text: '150', type: 'tool' }, { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 5, text: '5', type: 'cbt' }], condition: 300, has_right: 0, is_daily: true, recharge_nums: 0 },
        500: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 2600000, text_add: '', text: '260万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 260, text: '260', type: 'tool' }, { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }], condition: 500, has_right: 0, is_daily: true, recharge_nums: 0 },
        1000: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 4000000, text_add: '', text: '400万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 400, text: '400', type: 'tool' }, { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }], condition: 1000, has_right: 0, is_daily: true, recharge_nums: 0 },
        2000: { awards: [{ icon: 'yb_60_60.png', name: '元宝', nums: 6000000, text_add: '', text: '600万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 600, text: '600', type: 'tool' }, { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 2, text: '2', type: 'hjcbt' }], condition: 2000, has_right: 0, is_daily: true, recharge_nums: 0 },
        5000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 12000000, text_add: '', text: '1200万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 1200, text: '1200', type: 'tool' }, { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' }, { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }], condition: 5000, has_right: 0, is_daily: true, recharge_nums: 0 }
        // 10000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 20000000, text_add: '加赠200万', text: '2000万', tool_id: 'gamegold', type: 'property' }, { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 2000, text: '2000', type: 'tool' }, { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' }, { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }], condition: 10000, has_right: 0, is_daily: true, recharge_nums: 0 }
      }, // 累计充值
      rechargeListShow: [],
      daily_box: { is_today_open: false, open_times: 0, max_times: 3 },
      user_tickets: 0,
      user_recharges: 0,
      isLottery: false,
      tabsArray: Object.freeze([
        { id: 1, tabName: '累计充值有礼', listKey: 'recharge_status' },
        { id: 2, tabName: '连续充值有礼', listKey: 'accruing_days_list' }
      ]),
      currentTab: { id: 1, tabName: '累计充值有礼', listKey: 'recharge_status' },
      transitionClass: 'noTransition',
      isShowRulesPopup: false,
      configRulesPopup: { type: 1 },
      isShowReceivePopup: false,
      configReceivePopup: [],
      isShowFailPopup: false,
      isShowGiftPopup: false,
      configGiftPopup: []
    }
  },
  computed: {},
  mounted() {
    axios({ url: `${process.env.VUE_APP_OSS_PATH}activity/weekly/svga/20240614_m2_lottery.svga`, method: 'get', responseType: 'arraybuffer' })
    this.getHomePage()
  },
  methods: {
    /**
     * 打开规则弹框
     * @param {1 | 2} type 1-充值领礼包 2-好运礼盒
     */
    openRulesPopup(type) {
      this.configRulesPopup.type = type
      this.isShowRulesPopup = true
    },
    /**
     * 领取首充礼包
     */
    receiveGift: _throttle(async function () {
      if (this.single_recharge_status.has_right >= 2) return
      if (this.single_recharge_status.has_right == 0) return this.handleRecharge()
      const res = await getPageData({ type: 'recharge_single_reward' })
      if (res.errno) return this.$toast(res.errmsg)
      this.configGiftPopup = res.data.data
      this.isShowGiftPopup = true
      this.single_recharge_status.has_right = 2
    }),
    /**
     * 领取累计充值/连续充值任务奖励
     */
    receive: _throttle(async function (taskItem) {
      if (taskItem.has_right == 2) return
      if (taskItem.has_right == 0) return this.handleRecharge()
      const params = { mark: taskItem.condition || taskItem.amount_cond, type: taskItem.condition ? 'recharge_reward' : 'recharge_accruing_reward' }
      const res = await getPageData(params)
      this.$toast(res.errmsg)
      if (res.errno) return
      taskItem.has_right = 2
      this.rechargeListShow = this[this.currentTab.listKey] = this.sortList(this[this.currentTab.listKey])
    }),
    /**
     * 抽奖动画结束
     */
    animOnFinished() {
      this.isShowReceivePopup = true
      this.isLottery = false
      this.getHomePage()
    },
    /**
     * 抽奖
     * @param {number|string} mark 1:开启1次 2:开启10次
     */
    open: _throttle(async function (mark) {
      if (mark == 1 ? 1 : 10 > this.user_tickets) return (this.isShowFailPopup = true)
      const res = await getPageData({ mark, type: 'comm_lottery' })
      if (res.errno) return this.$toast(res.errmsg)
      this.configReceivePopup = res.data.awards
      this.isLottery = true
    }),
    /**
     * 获取首页数据（于连续充值3000档位征服者文本描述，因为后端无法和累计充值的人生赢家称号奖励数据格式相同，这里前端手动处理）
     */
    async getHomePage(data) {
      const res = await getPageData({ type: 'tab', mark: 'm2' })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.accruing_days_list = this.sortList(res.data.accruing_days_list)
        this.recharge_status = this.sortList(res.data.recharge_status)
        this.daily_box = res.data.daily_box
        this.user_tickets = res.data.user_tickets
        this.user_recharges = res.data.user_recharges
        this.single_recharge_status = res.data.single_recharge_status
      }
      for (const resKey in this.accruing_days_list) {
        const arr = this.accruing_days_list[resKey].awards
        if (arr[arr.length - 1].type == 'title') {
          this.accruing_days_list[resKey].awards.push({ text: arr[arr.length - 1].desc, type: 'prestige' })
          this.accruing_days_list[resKey].bigAwardsTask = true
        }
      }
      for (const resKey in this.recharge_status) {
        const arr = this.recharge_status[resKey].awards
        if (arr[arr.length - 1]?.type == 'prestige') this.recharge_status[resKey].bigAwardsTask = true
      }
      this.switchTab(this.currentTab)
      this.transitionClass = 'hasTransition'
    },
    /**
     * 切换 累计充值列表/连续充值有礼
     */
    switchTab(tabItem) {
      this.currentTab = tabItem
      this.rechargeListShow = this[this.currentTab.listKey]
    },
    /**
     * 列表排序 领取-未完成-已完成
     */
    sortList(arr) {
      return Object.values(arr).reduce((acc, item) => {
        if (item.has_right < 2) {
          acc[0].push(item)
        } else {
          acc[1].push(item)
        }
        return acc
      }, [[], []]).flat()
    },
    /**
     * 充值
     */
    handleRecharge() {
      this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getHomePage }))
      recharge()
    }
  }
}
</script>

<style scoped lang="scss">
.RechargeRebate {
  position: relative;
  .rechargeBox {
    .rechargeBoxText1Div {
      .rechargeBoxText1P1 {
        margin-bottom: 19px;
        font-weight: 500;
        font-size: 30px;
        color: #FFE25E;
        line-height: 1;
        text-align: center;
      }
      .rechargeBoxText1P2 {
        margin-bottom: 39px;
        font-weight: 500;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 1;
        text-align: center;
      }
    }
    .rulesBtn {
      position: absolute;
      top: 121px;
      right: 55px;
      width: 56px;
      height: 56px;
      background: url('@/pages/halloween/assets/mk4_02.png') no-repeat center center/100% 100%;
    }
    .rechargeBoxList {
      display: flex;
      justify-content: center;
      align-items: center;
      .rechargeBoxListItem {
       position: relative;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       flex-shrink: 0;
        width: 168px;
        height: 168px;
        padding: 4px;
        background-color: #BCC9FE; /*todo 奖励边框颜色*/
        border-radius: 16px;
        margin: 0 24px;
        .rechargeBoxListItemIcon {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 112px;
          background: linear-gradient(180deg, #6D67BF, #6D67BF); /*todo 奖励图标背景色*/
          border-radius: 12px 12px 0 0;
          .rechargeBoxListItemIconLabel {
            position: absolute;
            z-index: 2;
            top: -17px;
            right: -4px;
            height: 30px;
            padding: 0 10px;
            display: flex;
            align-items: center;
            line-height: 1;
            background: linear-gradient(-90deg, #DD7D32, #EFA144 50%);
            border-radius: 15px;
            font-weight: 500;
            font-size: 20px;
            color: #FFFFFF;
          }
          .rechargeBoxListItemIconBottomLabel {
            right: -20px;
            bottom: -8px;
            width: 77px;
            height: 36px;
          }
        }
        .rechargeBoxListItemText {
          width: 100%;
          flex: 1;
          background: #42498D;
          border-radius: 0 0 12px 12px;
          font-weight: 500;
          font-size: 26px;
          color: #F5F5F8;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &:last-child {
         background-color: #F7BC57;
         .rechargeBoxListItemIcon {
           background: linear-gradient(180deg, #FFFBE6, #FFFBE6);
         }
         .rechargeBoxListItemText {
           background-color: #D9953D;
         }
        }
      }
    }
    .rechargeBoxReceiveBtn {
      margin: 42px auto 0;
      width: 284px;
      height: 76px;
      font-size: 32px;
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
        color: #FFFFFF;
        background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
      }
      &.status1{
        color: #FFFFFF;
        background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
      }
      &.status2{
        color: #ffffff;
        background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
      }
    }
    .rechargeDesc {
      position: relative;
      line-height: 1;
      padding: 56px 0 0;
      margin: 92px auto 0;
      width: 654px;
      height: 274px;
      background: linear-gradient(-90deg, #6662AF, #827ECB);
      border-radius: 12px;
      border: 2px solid #564F9B;
      font-size: 28px;
      .articleTitle {
        position: absolute;
        top: -71px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 500;
        font-size: 30px;
        color: #FFFFFF;
        width: 413px;
        height: 96px;
        background: url('@/pages/halloween/assets/mk2_06.png') no-repeat left top/100% 100%;
        padding-top: 45px;
        display: flex;
        justify-content: center;
      }
      .articleContent {
        margin: 0 auto;
        width: 604px;
        height: 76px;
        white-space: nowrap;
        p {
          margin: 0 auto;
          color: #fff;
          white-space: nowrap;
          font-size: 28px;
          span {
            color: #FFE25E;
          }
          &:nth-child(2) {
            margin-top: 20px;
          }
        }
      }
      .articleButton {
        margin: 32px auto 0;
        width: 353px;
        height: 86px;
        background: url('@/pages/halloween/assets/mk2_07.png') no-repeat left top/100% 100%;
      }
    }
  }
  .giftBox {
    padding-top: 136px;
    .tip {
      z-index: 1;
      width: 553px;
      height: 96px;
      padding-top: 44px;
      font-weight: 500;
      font-size: 30px;
      color: #FFFFFF;
      background: url('@/pages/halloween/assets/mk2_01.png') no-repeat left top/100% 100%;
      position: relative;
      line-height: 1;
      text-align: center;
      margin: 0 auto;
    }
    .main {
      position: relative;
      line-height: 1;
      margin: 0 auto;
      width: 654px;
      height: 581px;
      background: url('@/pages/halloween/assets/mk2_02.png') no-repeat left top/100% 100%;
      margin-top: -27px;
      padding-top: 47px;
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 23px;
        margin-bottom: 367px;
        .residueNum,
        .rechargeNum {
          width: fit-content;
          height: 48px;
          padding: 0 20px;
          background: rgba(81,86,167,0.6);
          border-radius: 24px;
          font-weight: 500;
          font-size: 26px;
          color: #DFDFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
      }
      .priceBtn {
        position: absolute;
        top: 125px;
        right: 19px;
        width: 96px;
        height: 96px;
      }
      .buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 52px;
        >div {
          width: 264px;
          height: 76px;
          font-size: 32px;
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
        }
        .openOne {
          color: #FFFFFF;
          background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
        }
        .openTen {
          color: #FFFFFF;
          background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
        }
      }
      .lotteryBox {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        top: -60px;
        width: 550px;
        height: 660px;
        overflow: hidden;
      }
    }
  }
  .tasksBox {
    padding-top: 172px;
    .tabs {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 45px;
      width: 574px;
      height: 87px;
      background: no-repeat left top/100% 100%;
      display: flex;
      justify-content: center;
      line-height: 1;
      &.status1 {
        background-image: url('@/pages/halloween/assets/mk2_08_1.png');
      }
      &.status2 {
        background-image: url('@/pages/halloween/assets/mk2_08.png');
      }
      .tab {
        display: flex;
        justify-content: center;
        position: relative;
        width: 50%;
        height: 100%;
        // background-color: #fff;
        // border: 1px solid #564F9B;
      }
    }
    .rechargeTaskList {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
      .taskBtn {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        font-size: 28px;
        font-weight: normal;
        width: 124px;
        height: 64px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        border-radius: 99999px;
        border: 2px solid transparent;
        &.status0 {
          color: #FFFFFF;
          background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
        }
        &.status1 {
          color: #FFFFFF;
          background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2 {
          pointer-events: none;
          color: #ffffff;
          background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
        }
      }
      .rechargeTaskItem {
        position: relative;
        width: 664px;
        height: 136px;
        background: linear-gradient(-90deg, #6662AF, #827ECB);
        border-radius: 14px;
        border: 2px solid #564F9B;
        display: flex;
        justify-content: space-between;
        margin-bottom: 21px;
        .taskDetail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          padding: 23px 0 18px 17px;
          .taskDetailP1 {
            font-size: 30px;
            font-weight: 500;
            .taskDetailP1DeepSpan {
              color: #FFE25E;
              font-size: 24px;
            }
          }
          .awards {
            width: fit-content;
            display: flex;
            align-items: center;
            .awardItemBox {
              display: flex;
              align-items: center;
              height: 37px;
              background: linear-gradient(90deg, rgba(66,73,141,0), rgba(66,73,141,0.76));
              border-radius: 10px;
              margin-right: 20px;
              font-weight: 500;
              font-size: 24px;
              color: #FFE25E;
              padding-right: 8px;
              &:last-child {
                margin-right: 0;
              }
              i {
                color: #fff;
              }
              img {
                margin: 0 5px 0 -3px;
                width: 50px;
                height: 50px;
              }
            }
            .awardItemUpdate {
              display: flex;
              align-items: center;
              color: #FFE25E;
              img {
                width: 30px;
                height: auto;
              }
              i {
                color: #fff;
              }
            }
          }
        }
        .taskBtn {
          z-index: 2;
          top: 46px;
          right: 30px;
        }
        // &:last-child {
        //   margin-bottom: 0;
        // }
      }
      .bigAwardsTask {
        margin-bottom: 21px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 664px;
        height: 274px;
        background: linear-gradient(-90deg, #6662AF, #827ECB);
        border-radius: 14px;
        border: 2px solid #564F9B;
        .taskDetail {
          width: fit-content;
          color: #fff;
          padding-bottom: 22px;
          padding-left: 16px;
          .bigAwards {
            margin-top: 16px;
            display: flex;
            position: relative;
            .bigAwardItem {
              position: relative;
              width: 128px;
              height: 128px;
              background: #BCC9FE;
              border-radius: 16px;
              padding: 4px;
              margin-right: 16px;
              &:last-child {
                margin-right: 0;
              }
              &.titleAward {
                width: 168px;
              }
              .bigAwardItemIcon {
                width: 100%;
                height: 90px;
                background: #6D67BF;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 12px 12px 0 0;
              }
              .bigAwardItemText {
                width: 100%;
                height: 30px;
                background-color: #42498D;
                border-radius: 0 0 12px 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: #ffffff;
              }
              .bigAwardItemUpdate {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                bottom: -3px;
                transform: translateY(100%);
                left: 0;
                width: 128px;
                font-size: 20px;
                color: #FFE25E;
                > img {
                  width: 20px;
                  height: 24px;
                }
              }
            }
          }
        }
        .taskBtn {
          top: 96px;
          right: 30px;
        }
        .prestigeText {
          position: absolute;
          // margin-left: 25px;
          bottom: -25px;
          transform: translateY(100%);
          font-size: 22px;
          color: #FFE25E;
        }
      }
    }
    .rules-text {
      img {
        width: auto;
        height: 35px;
      }
      .pydIcon {
        width: auto;
        height: 45px;
      }
    }
  }
}
</style>
