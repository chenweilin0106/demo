<template>
  <div class="RechargeRebate">
    <!--<OutBox title="mk1_title_3.png" class="skillUpdate"><SkillInfo :config="configSkillInfo" /></OutBox>-->
    <FirstDouble v-bind="firstDoubleData" @recharge="onRecharge" @updateFirstDoubleData="updateFirstDoubleData" />
    <!-- <GiftBox :config="configGiftBox" @updateGiftBoxData="updateGiftBoxData" @recharge="onRecharge" /> -->
    <!--<RechargeFree :configRechargeFree="free_data" @updateRechargeFree="getPageData" />-->
    <!--<LotteryMap @updateLotteryMap="updateLotteryMap" :configLotteryMap="cbt_data" @update="updateGiftUpdate" @recharge="onRecharge" />-->
    <!--<LotteryStones :config="surprise_data" @updateLotteryStones="updateLotteryStones" @recharge="onRecharge" />-->
    <OutBox
      class="rechargeAwards margin-row-center" :class="[RechargeGiftListMark=='连续充值有礼'?'active':'']">
      <!-- lzy -->
      <div class="RechargeRebate_BottomBox_Tab">
        <!-- <div class="resetIcon pointer-none position-absolute"></div> -->
        <div v-if="recharge_status[Object.keys(recharge_status)[0]].awards[0].text_add" class="leftUpdateIcon"></div>
        <div v-if="accruing_days_list[Object.keys(accruing_days_list)[0]].awards[0].text_add" class="rightUpdateIcon"></div>
        <div v-for="item in RechargeGiftList_Text" :key="item" class="tab" @click="switchTab(item)">{{item}}</div>
      </div>
      <!-- wpq -->
      <!-- <div class="RechargeRebate_BottomBox_Tab" :class="[RechargeGiftListMark=='连续充值有礼'?'active':'']"> -->
        <!-- <div class="resetIcon pointer-none position-absolute"></div> -->
        <!-- <div v-if="recharge_status[Object.keys(recharge_status)[0]].awards[0].text_add" class="leftUpdateIcon"></div> -->
        <!-- <div v-if="accruing_days_list[Object.keys(accruing_days_list)[0]].awards[0].text_add" class="rightUpdateIcon"></div> -->
        <!-- <div v-for="item in RechargeGiftList_Text" :key="item" class="tab" @click="switchTab(item)">{{item}}</div> -->
      <!-- </div> -->
      <RechargeTasksList v-show="RechargeGiftListMark=='累计充值有礼'" :RechargeGiftListData="recharge_status" :transitionClass="transitionClass" @recharge="onRecharge" @updateRechargeData="updateRechargeData" />
      <RechargeTasksList v-show="RechargeGiftListMark=='连续充值有礼'" :RechargeGiftListData="accruing_days_list" :transitionClass="transitionClass" @recharge="onRecharge" @updateRechargeData="updateRechargeData" />
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
          <li v-show="RechargeGiftListMark=='累计充值有礼'"><span></span>消耗<img :src="IconPath('pyd_60_60.png')" />可抵用一次天赋修炼</li>
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
// import GiftBox from './components/giftBox/index.vue'
// import LotteryStones from './components/lotteryStones/index.vue'
// import RechargeFree from './components/rechargeFree/index.vue'
// import LotteryMap from './components/lotteryMap/index.vue'
// import SkillInfo from './components/skillInfo.vue'
import RechargeTasksList from './components/rechargeTasksList.vue'
import FirstDouble from './components/firstDouble/index.vue'
import { recharge } from '@/utils/toApp'
import { getPageData } from '@/api'
import visibilityMixin from '@/mixins/visibilityMixin'

export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList },
  mixins: [visibilityMixin],
  data() {
    return {
      // skill_status: false, // 加成状态 true:已达标 false:未达标
      // skill_list: [
      //   { skill_id: '1', icon: 'skill_1@2x.png', level: '0', word_level: 0, act_add_rate: 0 },
      //   { skill_id: '2', icon: 'skill_4@2x.png', level: '0', word_level: 0, act_add_rate: 0 },
      //   { skill_id: '3', icon: 'skill_2@2x.png', level: '0', word_level: 0, act_add_rate: 0 },
      //   { skill_id: '4', icon: 'skill_5@2x.png', level: '0', word_level: 0, act_add_rate: 0 },
      //   { skill_id: '5', icon: 'skill_3@2x.png', level: '0', word_level: 0, act_add_rate: 0 },
      //   { skill_id: '6', icon: 'skill_6@2x.png', level: '0', word_level: 0, act_add_rate: 0 }
      // ], // 技能升级加成列表
      // cbt_data: { day_recharge_amount: 0, num: 0, is_add: false }, // 充值抽藏宝图
      // surprise_data: { gift_status: true, res_num: 0, tot_amount: 0, server_id: '1' }, // 充值抽符石
      // free_data: {
      //   round: 0,
      //   resTime: 0,
      //   free_list: [
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' },
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' },
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' },
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' },
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' },
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' },
      //     { amount: 0, head: '', id: '', uid: '', username: '虚位以待' }
      //   ]
      // }, // 充值抽免单
      accruing_days_list: {
        10: {
          amount_cond: 10,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 8, text: '8', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 10, text: '10', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 13, text: '13', type: 'tool', text_add: '加赠7' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          // days_cond: '4',
          // days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        30: {
          amount_cond: 30,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 15, text: '15', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 20, text: '20', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 30, text: '30', type: 'tool', text_add: '加赠15' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          // days_cond: '4',
          // days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        50: {
          amount_cond: 50,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 20, text: '20', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 26, text: '26', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 38, text: '38', type: 'tool', text_add: '加赠19' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          // days_cond: '4',
          // days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        100: {
          amount_cond: 100,
          awards: [
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 33, text: '33', type: 'tool' },
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 25, text: '25', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 50, text: '50', type: 'tool', text_add: '加赠25' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          // days_cond: '4',
          // days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        300: {
          amount_cond: 300,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 30, text: '30', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 66, text: '66', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 85, text: '85', type: 'tool', text_add: '加赠43' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          // days_cond: '4',
          // days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        500: {
          amount_cond: 500,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 80, text: '80', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 100, text: '100', type: 'tool' },
            // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 140, text: '140', type: 'tool', text_add: '加赠70' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 2, text: '2', type: 'pretty_card' }
          ],
          days_cond: '3',
          // days_cond: '4',
          // days_cond: '5',
          has_right: 0,
          reach_days: 0
        }
        // 1000: {
        //   amount_cond: 1000,
        //   awards: [
        //     { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 266, text: '266', type: 'tool' },
        //     // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 350, text: '350', type: 'tool', text_add: '加赠175' },
        //     { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 2, text: '2', type: 'pretty_card' }
        //   ],
        //   days_cond: '4',
        //   // days_cond: '5',
        //   has_right: 0,
        //   reach_days: 0
        // },
        // 2000: {
        //   amount_cond: 2000,
        //   awards: [
        //     { icon: 'zjs_120_120.png', id: 1, name: '紫晶石', nums: 500, text: '500', type: 'tool' },
        //     // { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 1300, text: '1300', type: 'tool', text_add: '加赠650' },
        //     { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 3, text: '3', type: 'pretty_card' },
        //     { icon: 'hjcbt_60_60.png', id: 4, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }
        //   ],
        //   days_cond: '4',
        //   // days_cond: '5',
        //   has_right: 0,
        //   reach_days: 0
        // }
        // 3000: {
        //   amount_cond: 3000,
        //   awards: [
        //     // { icon: 'zjs_120_120.png', id: 1, name: '紫晶石', nums: 1000, text: '1000', type: 'tool' },
        //     { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 1300, text: '1300', type: 'tool', text_add: '加赠650' },
        //     { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 3, text: '3', type: 'pretty_card' },
        //     { icon: '', id: 4907, name: '称号', nums: 7, text: '7天', type: 'title', desc: '称号属性：佛山无影脚技能基础命中增加10%，基础闪避增加10%' }
        //   ],
        //   days_cond: '4',
        //   // days_cond: '5',
        //   has_right: 0,
        //   reach_days: 0
        // }
      }, // 连续充值
      recharge_status: {
        30: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 160000, text: '16万', tool_id: 'gamegold', type: 'property', text_add: '加赠3.2万' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 160000, text: '16万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 16, text: '16', type: 'tool' }
          ],
          condition: 30,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        50: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 220000, text: '22万', tool_id: 'gamegold', text_add: '加赠4.4万', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 220000, text: '22万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 22, text: '22', type: 'tool' }
          ],
          condition: 50,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        100: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 450000, text: '45万', tool_id: 'gamegold', text_add: '加赠9万', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 450000, text: '45万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 45, text: '45', type: 'tool' }
          ],
          condition: 100,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        200: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 880000, text_add: '加赠17.6万', text: '88万', tool_id: 'gamegold', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 880000, text: '88万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 88, text: '88', type: 'tool' },
            { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 10, text: '10', type: 'cbt' }
          ],
          condition: 200,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        300: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 1300000, text_add: '加赠26万', text: '130万', tool_id: 'gamegold', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 1300000, text: '130万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 130, text: '130', type: 'tool' }
          ],
          condition: 300,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        500: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 2000000, text_add: '加赠40万', text: '200万', tool_id: 'gamegold', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 2000000, text: '200万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 200, text: '200', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }
          ],
          condition: 500,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        1000: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 3400000, text: '340万', text_add: '加赠68万', tool_id: 'gamegold', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 3400000, text: '340万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 340, text: '340', type: 'tool' },
            { icon: 'pyd_60_60.png', name: '培元丹', nums: 30, text: '30', type: 'tool', tool_id: 153 }
          ],
          condition: 1000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        2000: {
          awards: [
            // { icon: 'yb_60_60.png', name: '元宝', nums: 6000000, text: '600万', text_add: '加赠120万', tool_id: 'gamegold', type: 'property' },
            { icon: 'yb_60_60.png', name: '元宝', nums: 6000000, text: '600万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 600, text: '600', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 3, text: '3', type: 'hjcbt' }
          ],
          condition: 2000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        5000: {
          awards: [
            // { icon: 'yb_120_120.png', name: '元宝', nums: 12000000, text: '1200万', tool_id: 'gamegold', type: 'property', text_add: '加赠240万' },
            { icon: 'yb_120_120.png', name: '元宝', nums: 12000000, text: '1200万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 1200, text: '1200', type: 'tool' },
            { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' },
            { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }
          ],
          condition: 5000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        }
        // 10000: {
        //   awards: [
        //     // { icon: 'yb_120_120.png', name: '元宝', nums: 24000000, text: '24000万', tool_id: 'gamegold', type: 'property', text_add: '加赠480万' },
        //     { icon: 'yb_120_120.png', name: '元宝', nums: 24000000, text: '24000万', tool_id: 'gamegold', type: 'property' },
        //     { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 2400, text: '2400', type: 'tool' },
        //     { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' },
        //     { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }
        //   ],
        //   condition: 10000,
        //   has_right: 0,
        //   is_daily: true,
        //   recharge_nums: 0
        // }
      }, // 累计充值
      // user_tickets: 0, // 礼盒 抽奖次数
      // user_recharges: 0, // 礼盒 充值金额
      is_last_day: false, // 天天首充礼 是否为最后一天 用于按钮文本显示
      single_recharge_status: {
        condition: 1,
        has_right: 0,
        awards: [
          // { type: 'mic', tool_id: 2, icon: 'ts_7zn_01.png', name: '永久头饰', double_nums: 0, nums: 20, show_text: '永久头饰', text: '永久头饰', mark: 'mk2_16.png' },
          { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', name: '绿晶石', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'mk2_17.png' },
          { type: 'tool', tool_id: 158, icon: 'cbt_120_120.png', name: '藏宝图', nums: 1, show_text: '藏宝图+1', text: '藏宝图+1', mark: '' },
          { type: '', icon: 'sjjl_120_120.png', tool_id: 0, name: '随机稀有奖励', nums: 1, show_text: '随机稀有奖励', text: '随机稀有奖励', mark: 'mk2_18.png' }
        ]
      }, // 天天首充礼 奖励
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  computed: {
    // configGiftBox() {
    //   return { user_tickets: this.user_tickets, user_recharges: this.user_recharges }
    // },
    configSkillInfo() {
      return { skill_list: this.skill_list, skill_status: this.skill_status }
    },
    RechargeGiftListData() {
      return this.RechargeGiftListMark == '累计充值有礼' ? this.recharge_status : this.accruing_days_list
    },
    firstDoubleData() {
      return { single_recharge_status: this.single_recharge_status, is_last_day: this.is_last_day }
    }
  },
  async created() {
    await this.getPageData()
    this.transitionClass = 'hasTransition'
  },
  methods: {
    updateLotteryStones(param) {
      Object.assign(this.surprise_data, param)
    },
    updateLotteryMap() {
      this.cbt_data.num++
      this.cbt_data.id_add = true
    },
    /**
     * 报名成功 更新报名按钮状态 报名总人数
     */
    updateGiftUpdate(param) {
      Object.assign(this, param)
    },
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    // updateGiftBoxData(user_tickets) {
    //   this.user_tickets = user_tickets
    // },
    updateFirstDoubleData() {
      this.single_recharge_status.has_right = 2
    },
    switchTab(item) {
      this.RechargeGiftListMark = item
    },
    updateRechargeData(mark) {
      const type = this.RechargeGiftListMark === '累计充值有礼' ? 'recharge_status' : 'accruing_days_list'
      this[type][mark].has_right = 2 // 更新列表数据
    },
    // 用于连续充值3000档位征服者文本描述，因为后端无法和累计充值的人生赢家称号奖励数据格式相同，这里前端手动处理
    async getPageData(data) {
      const res = await getPageData({ type: 'tab', mark: 'm2' })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        Object.assign(this, res.data)
      }
      for (const resKey in this.accruing_days_list) {
        const arr = this.accruing_days_list[resKey].awards
        if (arr[arr.length - 1].type == 'title') {
          this.accruing_days_list[resKey].awards.push({ text: arr[arr.length - 1].desc, type: 'prestige' })
        }
      }
    },
    onRecharge() {
      this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getPageData }))
      recharge()
    }
  }
}
</script>

<style scoped lang="scss">
.RechargeRebate {
  position: relative;
  .rechargeAwards {
    width: 730px; /*todo 宽度 去看图片原始宽度，不要看蓝湖*/
    min-height: 380px; /* todo 最小高度 */
    border-image-slice: 110 0 146 0 fill; /*todo 顶部距离是一般tab高度 底部距离一般和outBox一致*/
    border-image-width: 110px 0 146px 0; /*todo 顶部距离是一般tab高度 底部距离一般和outBox一致*/
    border-image-source: url('@/pages/valentineDay/assets/zs_3.png'); /*todo 连续充值有礼背景*/
    background-image: none;
    padding-top: 0;
    .resetIcon {
      top: -10px; /*todo 重置图标 距离tab top*/
      left: 22px; /*todo 重置图标 距离tab left*/
      width: 124px;
      height: 42px;
      background: url('@/pages/valentineDay/assets/mk2_1.png') no-repeat left top/100% 100%; /*todo 图片名 可能要改*/
    }
    .leftUpdateIcon {
      position: absolute;
      top: -20px; /*todo 重置图标 距离tab bottom*/
      left: 290px; /*todo 重置图标 距离tab left*/
      width: 96px;
      height: 128px;
      background: url('@/pages/valentineDay/assets/mk2_5.png') no-repeat left top/100% 100%; /*todo 图片名 可能要改*/
    }
    //.rightUpdateIcon{
    //  position: absolute;
    //  top: -24px; /*todo 重置图标 距离tab bottom*/
    //  right: 10px; /*todo 重置图标 距离tab left*/
    //  width: 96px;
    //  height: 128px;
    //  background: url('@/pages/springFestival/assets/mk2_11.png') no-repeat left top/100% 100%; /*todo 图片名 可能要改*/
    //}
    // lzy
    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 104px; /*todo tab高度*/
      .tab {
        position: relative;
        flex: 1;
        height: 100%;
        font-size: 32px;
        opacity: 0;
        line-height: 72px;
        //background-color: #fff;
        &:nth-child(1) {
          margin-right: 24px;
        }
      }
    }
    // wpq
    // .RechargeRebate_BottomBox_Tab {
    //   position: relative;
    //   display: flex;
    //   justify-content: flex-start;
    //   align-items: center;
    //   margin: -110px auto 0px;
    //   width: 651px;
    //   height: 109px; /*todo tab高度*/
    //   background: url('@/pages/motherDay/assets/mk2_tab_1.png') no-repeat left top/100% 100%;
    //   transition: background 0.3s;
    //   .tab {
    //     position: relative;
    //     flex: 1;
    //     height: 100%;
    //     font-size: 32px;
    //     opacity: 0;
    //     line-height: 72px;
    //     //background-color: #fff;
    //     &:nth-child(1) {
    //       margin-right: 24px;
    //     }
    //   }
    //   &.active {
    //     background: url('@/pages/motherDay/assets/mk2_tab1_1.png') no-repeat left top/100% 100%;
    //   }
    // }
  }
  .active-tab-bg {
    border-image-source: url('@/pages/valentineDay/assets/zs_4.png'); /*todo 连续充值有礼边框背景图片名*/
  }
}
</style>
