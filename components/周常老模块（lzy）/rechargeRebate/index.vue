<template>
  <div class="rechargeRebate">
    <FirstDouble v-bind="firstDoubleData" @recharge="handleRecharge" @updateFirstDoubleData="updateFirstDoubleData" />
    <OutBox class="rechargeBox margin-row-center" :class="`status${currentTab.id}`">
      <div class="RechargeRebate_BottomBox_Tab">
        <div class="resetIcon pointer-none position-absolute"></div>
        <div v-if="recharge_status[Object.keys(recharge_status)[0]].awards[0].text_add" class="leftUpdateIcon"></div>
        <div v-if="accruing_days_list[Object.keys(accruing_days_list)[0]].awards[1].text_add" class="rightUpdateIcon"></div>
        <div v-for="tabItem in tabsArray" :key="tabItem.id" class="tab" @click="switchTab(tabItem)">{{ tabItem.tabName }}</div>
      </div>
      <transition-group class="rechargeTasksList flex-column align-center" :name="transitionClass" tag="ul">
        <div v-for="taskItem in rechargeListShow" :key="`${currentTab.listKey}_${taskItem.condition || taskItem.amount_cond}`" :class="['rechargeTaskItem', { bigAwardsTask: taskItem.bigAwardsTask }]">
          <div class="taskDetail">
            <p v-if="taskItem.condition" class="taskDetailP1">
              <span class="taskDetailP1Span1">累计</span>
              <span class="taskDetailP1Span2">充值满</span>
              <span class="taskDetailP1Span3">{{ taskItem.condition }}元</span>
              <span class="taskDetailP1Span4">（{{ taskItem.recharge_nums }}/{{ taskItem.condition }}）</span>
            </p>
            <p v-else class="taskDetailP2">
              <span class="taskDetailP1Span1">累计{{ taskItem.days_cond }}天</span>
              <span class="taskDetailP1Span2">每天充值满{{ taskItem.amount_cond }}元</span>
              <span class="taskDetailP1Span3">（{{ taskItem.reach_days }}/{{ taskItem.days_cond }}）</span>
            </p>
            <div v-if="!taskItem.bigAwardsTask" class="awards">
              <div class="awardItemBox" v-for="(awardItem, awardIndex) in taskItem.awards" :key="awardIndex">
                <i v-if="awardIndex != 0">,</i>
                <img :src="IconPath(awardItem.icon)" alt="" />
                +{{ awardItem.text }}
                <div class="awardItemUpdate" v-if="awardItem.text_add">
                  <i>,</i>
                  <img :src="IconPath('mk2_7.png')" class="" alt="" />
                  <span :key="awardIndex + 100"> {{ awardItem.text_add }}</span>
                </div>
              </div>
            </div>
            <div v-else class="bigAwards">
              <div v-for="bigAwardItem in taskItem.awards.filter((item) => item.type !== 'prestige')" :key="bigAwardItem.name" class="bigAwardItemDiv" :class="{ titleAward: bigAwardItem.type === 'title', add: bigAwardItem.text_add }">
                <div v-if="bigAwardItem.text_add" class="bigAwardItemUpdate">
                  <img :src="IconPath('mk2_7.png')" alt="" />
                  <span>{{ bigAwardItem.text_add }}</span>
                </div>
                <div class="bigAwardItemIcon">
                  <PublicImg :class="bigAwardItem.type" :imgName="titleMap[bigAwardItem.id] || bigAwardItem.icon" :imgType="bigAwardItem.type" />
                </div>
                <div class="bigAwardItemText">+{{ bigAwardItem.text }}</div>
              </div>
              <p class="prestigeText">{{ taskItem.awards[taskItem.awards.length - 1]?.text }}</p>
            </div>
          </div>
          <div class="taskBtn position-absolute" :class="`status${taskItem.has_right}`" @click="receiveRechargeAwards(taskItem)">
            {{ taskItem.has_right == 0 ? '去完成' : taskItem.has_right == 1 ? '领取' : '已领取' }}
          </div>
        </div>
      </transition-group>
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_43_35.png')" alt="" />及<img :src="IconPath('hjcbt_45_37.png')" alt="" />分别可进行1/30次符石寻宝</li>
          <li><span></span>消耗<img class="pydIcon" :src="IconPath('pyd_43_44.png')" alt="" />可抵用一次天赋修炼</li>
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
import { recharge } from '@/utils/toApp'
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
import visibilityMixin from '@/mixins/visibilityMixin'
import FirstDouble from './components/firstDouble'

export default {
  name: 'rechargeRebate',
  components: { FirstDouble },
  mixins: [visibilityMixin],
  data() {
    return {
      accruing_days_list: {
        10: {
          amount_cond: 10,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 13, text: '13', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card', text_add: '' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        30: {
          amount_cond: 30,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 30, text: '30', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        50: {
          amount_cond: 50,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 38, text: '38', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        100: {
          amount_cond: 100,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 50, text: '50', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 3, text: '3', type: 'pretty_card' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        300: {
          amount_cond: 300,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 85, text: '85', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 5, text: '5', type: 'pretty_card' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        500: {
          amount_cond: 500,
          awards: [
            { icon: 'zjs_120_120.png', id: 1, name: '紫晶石', nums: 140, text: '140', type: 'tool' },
            { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 5, text: '5', type: 'pretty_card' },
            { icon: '', id: 4907, name: '称号', nums: 7, text: '7天', type: 'title', desc: '称号属性：佛山无影脚技能基础命中增加10%，基础闪避增加10%' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        1000: {
          amount_cond: 1000,
          awards: [
            { icon: 'zjs_60_60.png', id: 1, name: '紫晶石', nums: 350, text: '350', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 10, text: '10', type: 'pretty_card' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        },
        3000: {
          amount_cond: 3000,
          awards: [
            { icon: 'zjs_120_120.png', id: 1, name: '紫晶石', nums: 1300, text: '1300', type: 'tool' },
            { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 10, text: '10', type: 'pretty_card', text_add: '' },
            { icon: '', id: 5434, name: '称号', nums: 7, text: '7天', type: 'title', desc: '称号属性：佛山无影脚技能基础命中增加15%，基础闪避增加15%' }
          ],
          days_cond: '5',
          has_right: 0,
          reach_days: 0
        }
      }, // 连续充值
      recharge_status: {
        30: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 160000, text_add: '加赠8万', text: '16万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 16, text: '16', type: 'tool' }
          ],
          user_exp_add: 5,
          skill_exp_add: 5,
          condition: 30,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        50: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 250000, text_add: '加赠12.5万', text: '25万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 25, text: '25', type: 'tool' }
          ],
          condition: 50,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        100: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 500000, text_add: '加赠25万', text: '50万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 50, text: '50', type: 'tool' },
            { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 5, text: '5', type: 'cbt' }
          ],
          user_exp_add: 10,
          skill_exp_add: 10,
          condition: 100,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        200: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 1000000, text_add: '加赠50万', text: '100万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 100, text: '100', type: 'tool' },
            { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 5, text: '5', type: 'cbt' }
          ],
          condition: 200,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        300: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 1500000, text_add: '加赠75万', text: '150万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 150, text: '150', type: 'tool' },
            { icon: 'cbt_60_60.png', id: 158, name: '藏宝图', nums: 5, text: '5', type: 'cbt' }
          ],
          user_exp_add: 15,
          skill_exp_add: 15,
          condition: 300,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        500: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 2600000, text_add: '加赠130万', text: '260万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 260, text: '260', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }
          ],
          condition: 500,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        1000: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 4000000, text_add: '加赠200万', text: '400万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 400, text: '400', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }
          ],
          user_exp_add: 20,
          skill_exp_add: 20,
          condition: 1000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        2000: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 6000000, text_add: '加赠300万', text: '600万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 600, text: '600', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 159, name: '黄金藏宝图', nums: 2, text: '2', type: 'hjcbt' }
          ],
          condition: 2000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        5000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 12000000, text_add: '加赠600万', text: '1200万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 1200, text: '1200', type: 'tool' },
            { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' },
            { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }
          ],
          condition: 5000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        10000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 20000000, text_add: '加赠1000万', text: '2000万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 2000, text: '2000', type: 'tool' },
            { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' },
            { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }
          ],
          condition: 10000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        }
      }, // 累计充值
      is_last_day: false, // 天天首充礼 是否为最后一天 用于按钮文本显示
      single_recharge_status: {
        condition: 1,
        has_right: 0,
        awards: [
          // { type: 'mic', tool_id: 2, icon: 'ts_8zn_01.png', name: '八周年', double_nums: 0, nums: 30, show_text: '永久头饰', text: '永久头饰', mark: 'mk2_16.png' },
          { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', name: '绿晶石', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'mk2_14.png' },
          { type: 'tool', tool_id: 158, icon: 'cbt_120_120.png', name: '藏宝图', nums: 1, show_text: '藏宝图+1', text: '藏宝图+1', mark: '' },
          { type: '', icon: 'sjjl_120_120.png', tool_id: 0, name: '随机稀有奖励', nums: 1, show_text: '随机稀有奖励', text: '随机稀有奖励', mark: 'mk2_15.png' }
        ]
      }, // 天天首充礼 奖励
      rechargeListShow: [],
      transitionClass: 'noTransition',
      tabsArray: Object.freeze([
        { id: 1, tabName: '累计充值有礼', listKey: 'recharge_status' },
        { id: 2, tabName: '连续充值有礼', listKey: 'accruing_days_list' }
      ]),
      currentTab: { id: 1, tabName: '累计充值有礼', listKey: 'recharge_status' },
      titleMap: Object.freeze({ 4676: 'ch_rsyj_1', 4907: 'ch_zfz1', 5434: 'ch_zfzw' })
    }
  },
  computed: {
    firstDoubleData() {
      return { single_recharge_status: this.single_recharge_status, is_last_day: this.is_last_day }
    }
  },
  mounted() {
    this.getHomePage()
  },
  methods: {
    updateFirstDoubleData() {
      // this.single_recharge_status.has_right = 2
      this.getHomePage()
    },
    /**
     * 领取累计充值/连续充值任务奖励
     */
    receiveRechargeAwards: _throttle(async function (taskItem) {
      if (taskItem.has_right == 2) return
      if (taskItem.has_right == 0) return this.handleRecharge()
      const params = { mark: taskItem.condition || taskItem.amount_cond, type: taskItem.condition ? 'recharge_reward' : 'recharge_accruing_reward' }
      const res = await getPageData(params)
      this.$toast(res.errmsg)
      if (res.errno) return
      taskItem.has_right = 2
      this.rechargeListShow = this.sortList(this[this.currentTab.listKey])
    }),
    /**
     * 获取主页数据
     */
    async getHomePage() {
      const res = await getPageData({ type: 'tab', mark: 'm2' })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.accruing_days_list = this.sortList(res.data.accruing_days_list)
        this.recharge_status = this.sortList(res.data.recharge_status)
        this.is_last_day = res.data.is_last_day
        this.single_recharge_status = res.data.single_recharge_status
        this.skill_list = res.data.skill_list
        this.skill_status = res.data.skill_status
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
    handleRecharge() {
      this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getHomePage }))
      recharge()
    }
  }
}
</script>

<style scoped lang="scss">
.rechargeRebate {
  position: relative;
  .rechargeBox {
    width: 750px;
    min-height: 399px;
    border-image-slice: 120 0 178 0 fill;
    border-image-width: 120px 0 178px 0;
    background-image: none;
    padding-top: 0;
    margin-top: 41px;
    &.status1 {
      border-image-source: url('@/pages/labaFestival/assets/zs_3.png');
    }
    &.status2 {
      border-image-source: url('@/pages/labaFestival/assets/zs_4.png');
    }
    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 104px;
      .resetIcon {
        top: -8px;
        left: 0;
        width: 120px;
        height: 38px;
        background: url('@/pages/labaFestival/assets/mk2_1.png') no-repeat left top/100% 100%;
      }
      .leftUpdateIcon {
        position: absolute;
        top: -13px;
        left: 303px;
        width: 96px;
        height: 126px;
        background: url('@/pages/labaFestival/assets/mk2_5.png') no-repeat left top/100% 100%;
      }
      //.rightUpdateIcon{
      //  position: absolute;
      //  top: -10px;
      //  right: 0;
      //  width: 114px;
      //  height: 104px;
      //  background: url('@/pages/yearCelebration/assets/mk2_6.png') no-repeat left top/100% 100%;
      //}
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
    .rechargeTasksList {
      padding-top: 25px;
      .rechargeTaskItem {
        position: relative;
        margin: 0 auto 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        -webkit-background-clip: content-box, border-box;
        -webkit-background-origin: content-box, border-box;
        background-image: linear-gradient(-90deg, #FFAC7F, #C74545), -webkit-linear-gradient(#F9DE8D, #F9DE8D); // 从左到右：中心背景色，内层边框色，外层边框色
        border-radius: 16px;
        border: 4px solid transparent; // 会有缝隙
        //box-shadow: inset 0 0 27px 15px rgba(232, 153, 255, 0.5);
        //padding: 0 13px 0 5px;
        width: 664px;
        height: 140px;
        .taskDetail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          padding: 23px 0 18px 8px;
          .taskDetailP1 {
            margin-left: 9px;
            font-size: 30px;
            font-weight: 500;
            .taskDetailP1Span1 {
              color: #FFFAA6;
            }
            .taskDetailP1Span3 {
              color: #FFFAA6;
            }
            .taskDetailP1Span4 {
              color: #FFFAA6;
              font-size: 28px;
            }
          }
          .taskDetailP2 {
            margin-left: 9px;
            font-size: 30px;
            font-weight: 500;
            .taskDetailP1Span1 {
              color: #FFFAA6;
            }
            .taskDetailP1Span3 {
              color: #FFFAA6;
              font-size: 28px;
            }
          }
          .awards {
            width: fit-content;
            height: 52px;
            border-radius: 26px;
            display: flex;
            align-items: center;
            background: rgba(171, 50, 50, 0.9);
            padding: 0 10px;
            margin-top: 19px;
            .awardItemBox {
              display: flex;
              align-items: center;
              font-size: 24px;
              color: #fff;
              img {
                margin: 0 0px 0 -3px;
                width: 50px;
                height: 50px;
              }
            }
            .awardItemUpdate {
              display: flex;
              align-items: center;
              color: #FFFAA6;
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
          $width: 120px;
          $height: 60px;
          $border: 3px;
          z-index: 2;
          top: 33px;
          right: 12px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          white-space: nowrap;
          font-size: 28px;
          font-weight: normal;
          width: $width + $border;
          height: $height + $border;
          // 渐变
          border: $border solid transparent;
          border-radius: 99999px;
          -webkit-background-clip: padding-box, border-box;
          -webkit-background-origin: padding-box, border-box;
          // color: #ffffff;
          // background-image: linear-gradient(0deg, #9d9d9d, #e7e7e7), linear-gradient(#fff, #fff);
          // 没有状态变化 删除下方代码
          &.status0 {
            color: #4d7ddd;
            background-image: linear-gradient(0deg, #cae7ff, #ffffff), linear-gradient(#fff, #fff);
          }
          &.status1 {
            color: #a9792c;
            background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
          }
          &.status2 {
            color: #ffffff;
            background-image: linear-gradient(0deg, #9d9d9d, #e7e7e7), linear-gradient(#fff, #fff);
          }
        }
      }
      .bigAwardsTask {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 664px;
        height: 380px;
        .taskDetail {
          width: 100%;
          color: #fff;
          padding-left: 0;
          padding-top: 19px;
          .taskDetailP1 {
            margin-left: 17px;
          }
          .taskDetailP2 {
            margin-left: 17px;
          }
          .bigAwards {
            margin-top: 15px;
            display: flex;
            position: relative;
            justify-content: center;
            .bigAwardItemDiv {
              position: relative;
              width: 128px;
              height: 128px;
              background: #E9CC7B;
              border-radius: 16px;
              padding: 4px;
              margin: 0 24px;
              .bigAwardItemIcon {
                width: 100%;
                height: 90px;
                background: #FEFAEF;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 12px 12px 0 0;
              }
              .bigAwardItemText {
                width: 100%;
                height: 30px;
                background-color: #6D6DC3;
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
                bottom: -8px;
                transform: translateY(100%) translateX(-50%);
                left: 50%;
                width: 128px;
                font-weight: 500;
                font-size: 22px;
                color: #FFEA8A;

                > img {
                  width: 33px;
                  height: 40px;
                }
              }
              &.titleAward {
                width: 168px;
              }
              &.add {
                .bigAwardItemText {
                  background-color: #BB891D;
                }
              }
            }
          }
        }
        .taskBtn {
          top: 250px;
          right: 228px;
          width: 206px;
          height: 66px;
        }
        .prestigeText {
          position: absolute;
          left: 15px;
          bottom: -140px;
          transform: translateY(100%);
          font-size: 22px;
          color: #FFFAA6;
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
        height: 40px;
      }
    }
  }
}
</style>
