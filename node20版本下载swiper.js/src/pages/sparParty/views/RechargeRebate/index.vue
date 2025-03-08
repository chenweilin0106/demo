<template>
  <div class="RechargeRebate">
    <!-- 充值礼包组件 -->
    <SingleRechargeGift
      :single_recharge_status="single_recharge_status"
      @recharge="recharge(hiddenFn)"
      @getRechargeGift="getRechargeGift"
    />
    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @recharge="recharge(hiddenFn)" />
    <OutBox class="consume-list">
      <div class="consume-tabs">
        <img :src="IconPath('mk2_21.png')" class="update position-absolute pointer-none" />
        <div
          v-for="item in RechargeGiftList_Text" :key="item"
          :class="[
            'tab', 'flex-center',
            {'tab-active-1': item == '累计充值有礼' && RechargeGiftListMark == '累计充值有礼'},
            { 'tab-active-2': item == '连续充值有礼' && RechargeGiftListMark == '连续充值有礼' }
          ]"
          @click="RechargeGiftListMark = item"
        >
          {{ item }}
        </div>
      </div>
      <div class="tabs_contain">
        <RechargeGiftList
          v-show="RechargeGiftListMark == '累计充值有礼'"
          :RechargeGiftListData="recharge_status"
          :transitionClass="transitionClass"
          @updateRechargeData="updateRechargeData"
          @recharge="recharge(hiddenFn)"
        />
        <RechargeGiftList
          v-show="RechargeGiftListMark == '连续充值有礼'"
          :RechargeGiftListData="accruing_days_list"
          :transitionClass="transitionClass"
          @updateRechargeData="updateRechargeData"
          @recharge="recharge(hiddenFn)"
        />
      </div>
      <!-- 说明文字 -->
      <div class="rule-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
        </ul>
      </div>
    </OutBox>
    <FirstDoubleAwardPopup v-if="showFirstDoubleAwardPopup" :list="firstDoubleAwardPopupData" @clickClose="showFirstDoubleAwardPopup = false" />
  </div>
</template>

<script>
import FirstDoubleAwardPopup from '@/pages/sparParty/popups/fistDoubleAwardPopup.vue'
import GiftBox from '@/pages/sparParty/views/RechargeRebate/components/GiftBox.vue'
import RechargeGiftList from './components/RechargeGiftList'
import SingleRechargeGift from './components/SingleRechargeGift.vue'
import { recharge } from '@/pages/sparParty/utils/toApp'
import { getPageData } from '@/pages/sparParty/api/index'
export default {
  name: 'RechargeRebate',
  components: { GiftBox, SingleRechargeGift, RechargeGiftList, FirstDoubleAwardPopup },
  data() {
    return {
      showFirstDoubleAwardPopup: false, // 首充奖励弹窗
      firstDoubleAwardPopupData: [],
      accruing_days_list: {
        10: {
          amount_cond: 10,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 8, text: '8', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        30: {
          amount_cond: 30,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 15, text: '15', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        50: {
          amount_cond: 50,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 20, text: '20', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        100: {
          amount_cond: 100,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 25, text: '25', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        300: {
          amount_cond: 300,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 50, text: '50', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        },
        500: {
          amount_cond: 500,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 80, text: '80', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 2, text: '2', type: 'pretty_card' }
          ],
          days_cond: '3',
          has_right: 0,
          reach_days: 0
        }
      }, // 连续充值
      recharge_status: {
        30: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 160000, text: '16万', tool_id: 'gamegold', type: 'property', text_add: '加赠1.6万' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 16, text: '16', type: 'tool' }
          ],
          condition: 30,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        50: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 220000, text: '22万', tool_id: 'gamegold', type: 'property', text_add: '加赠2.2万' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 22, text: '22', type: 'tool' }
          ],
          condition: 50,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        100: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 450000, text: '45万', tool_id: 'gamegold', type: 'property', text_add: '加赠4.5万' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 45, text: '45', type: 'tool' }
          ],
          condition: 100,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        200: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 880000, text: '88万', tool_id: 'gamegold', text_add: '加赠8.8万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 88, text: '88', type: 'tool' },
            { type: 'tool', name: '藏宝图', id: 158, nums: 10, text: '10', icon: 'cbt_60_60.png' }
          ],
          condition: 200,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        300: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 1300000, text: '130万', tool_id: 'gamegold', text_add: '加赠13万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 130, text: '130', type: 'tool' }
          ],
          condition: 300,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        500: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 2000000, text: '200万', tool_id: 'gamegold', text_add: '加赠20万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 200, text: '200', type: 'tool' },
            { type: 'tool', name: '黄金藏宝图', id: 159, nums: 1, text: '1', icon: 'hjcbt_60_60.png' }
          ],
          condition: 500,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        1000: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 3400000, text: '340万', tool_id: 'gamegold', text_add: '加赠34万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 340, text: '340', type: 'tool' }
          ],
          condition: 1000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        2000: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 6000000, text: '600万', tool_id: 'gamegold', text_add: '加赠60万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 600, text: '600', type: 'tool' },
            { type: 'tool', name: '黄金藏宝图', id: 159, nums: 3, text: '3', icon: 'hjcbt_60_60.png' }
          ],
          condition: 2000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        5000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 12000000, text: '1200万', tool_id: 'gamegold', type: 'property', text_add: '加赠120万' },
            { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 1200, text: '1200', type: 'tool' },
            { icon: 'ch_rsyj_1', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' },
            { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }
          ],
          condition: 5000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        }
      }, // 累计充值
      single_recharge_status: {
        awards: [
          { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', name: '绿晶石', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'mk2_17.png' },
          { type: 'tool', tool_id: 2, icon: 'cbt_120_120.png', name: '藏宝图', double_nums: 0, nums: 1, show_text: '藏宝图+1', text: '+1', mark: '' },
          { type: '', icon: 'sjjl_120_120.png', tool_id: 0, name: '随机稀有奖励', nums: 1, show_text: '随机稀有奖励', text: '随机稀有奖励', mark: 'mk2_18.png' }
        ],
        condition: 1,
        has_right: 0
      }, // 天天首充礼
      user_tickets: 0, // 礼盒 抽奖次数
      user_recharges: 0, // 礼盒 用户充值金额
      is_last_day: false, // 天天首充礼 是否为最后一天 用于按钮文本显示
      transitionClass: 'noTransition',
      RechargeGiftList_Text: Object.freeze(['累计充值有礼', '连续充值有礼']),
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  computed: {
    giftBoxData() {
      return { user_tickets: this.user_tickets, user_recharges: this.user_recharges }
    },
    RechargeGiftListData() {
      return this.RechargeGiftListMark === '累计充值有礼' ? this.recharge_status : this.accruing_days_list
    }
  },
  async created() {
    await this.getPageData()
    this.transitionClass = 'hasTransition'
  },
  methods: {
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    updateGiftBoxData(user_tickets) {
      this.user_tickets = user_tickets
    },
    // 更新充值列表数据
    updateRechargeData(mark) {
      // 判断更新的是累计充值还是连续充值
      const type = this.RechargeGiftListMark === '累计充值有礼' ? 'recharge_status' : 'accruing_days_list'
      this[type][mark].has_right = 2
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // 天天首充礼领取按钮点击事件
    async getRechargeGift() {
      const res = await getPageData({ type: 'recharge_single_reward' })
      if (res.errno) return this.$toast(res.errmsg)
      this.firstDoubleAwardPopupData = res.data.data
      this.showFirstDoubleAwardPopup = true
      this.single_recharge_status.has_right = !res.errno ? 2 : 1
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm2' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
    },
    recharge
  }
}
</script>

<style scoped lang="scss">
.RechargeRebate {
  position: relative;
  .consume-list {
    margin-top: 135px;
    padding-bottom: 55px;
    padding-top: 36px;
    .consume-tabs {
      position: absolute;
      display: flex;
      justify-content: center;
      top: -75px;
      left: 50%;
      transform: translateX(-50%);
      color: transparent;
      .update {
        z-index: 1;
        top: -17px;
        left: 280px;
        width: 68px;
        height: 103px;
      }
      .tab {
        width: 338px;
        height: 80px;
      }
      .tab:nth-of-type(1) {
        background: url('@/pages/sparParty/assets/mk2_4.png') no-repeat left
          top/100% 100%;
      }
      .tab:nth-of-type(2) {
        background: url('@/pages/sparParty/assets/mk2_3.png') no-repeat left
          top/100% 100%;
      }
      .tab-active-1 {
        background: url('@/pages/sparParty/assets/mk2_2.png') no-repeat left
          top/100% 100% !important;
      }
      .tab-active-2 {
        background: url('@/pages/sparParty/assets/mk2_6.png') no-repeat left
          top/100% 100% !important;
      }
    }
  }
  .rule-text {
    margin-top: 11px;
    width: 612px;
    //height: 67px;
    margin-left: 66px;
    img {
      width: 49px;
      height: 41px;
    }
  }
}
</style>
