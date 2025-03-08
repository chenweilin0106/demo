<template>
  <div class="RechargeRebate">
    <FirstDouble v-bind="firstDoubleData" @recharge="onRecharge" @updateFirstDoubleData="updateFirstDoubleData" />
    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @recharge="onRecharge" />
    <OutBox
      class="rechargeAwards margin-row-center" :class="{'active-tab-bg': RechargeGiftListMark == '连续充值有礼'}">
      <div class="RechargeRebate_BottomBox_Tab">
        <div class="resetIcon pointer-none position-absolute"></div>
        <div class="update-1"></div>
        <div v-for="item in RechargeGiftList_Text" :key="item" class="tab" @click="switchTab(item)">{{ item }}</div>
      </div>
      <RechargeTasksList v-show="RechargeGiftListMark == '累计充值有礼'" :RechargeGiftListData="recharge_status" :transitionClass="transitionClass" @recharge="onRecharge" @updateRechargeData="updateRechargeData" />
      <RechargeTasksList v-show="RechargeGiftListMark == '连续充值有礼'" :RechargeGiftListData="accruing_days_list" :transitionClass="transitionClass" @recharge="onRecharge" @updateRechargeData="updateRechargeData" />
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
import GiftBox from './components/giftBox/index.vue'
import RechargeTasksList from './components/rechargeTasksList.vue'
import FirstDouble from './components/firstDouble/index.vue'
import { recharge } from '@/utils/toApp'
import { getPageData } from '@/api'
import visibilityMixin from '@/mixins/visibilityMixin'
export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList, GiftBox },
  mixins: [visibilityMixin],
  data() {
    return {
      accruing_days_list: {
        10: {
          amount_cond: 10,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 10, text: '10', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        30: {
          amount_cond: 30,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 20, text: '20', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        50: {
          amount_cond: 50,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 26, text: '26', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        100: {
          amount_cond: 100,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 33, text: '33', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        300: {
          amount_cond: 300,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 66, text: '66', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 1, text: '1', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        500: {
          amount_cond: 500,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 100, text: '100', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 2, text: '2', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        1000: {
          amount_cond: 1000,
          awards: [
            { icon: 'zjs_60_60.png', id: 142, name: '紫晶石', nums: 266, text: '266', type: 'tool' },
            { icon: 'lhq_60_60.png', id: 0, name: '靓号券', nums: 2, text: '2', type: 'pretty_card' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        },
        3000: {
          amount_cond: 3000,
          awards: [
            { icon: 'zjs_120_120.png', id: 142, name: '紫晶石', nums: 1000, text: '1000', type: 'tool' },
            { icon: 'lhq_120_120.png', id: 0, name: '靓号券', nums: 3, text: '3', type: 'pretty_card' },
            { icon: '', id: 2, name: '称号', nums: 7, text: '7天', type: 'title', desc: '称号属性：佛山无影脚技能基础命中增加10%，基础闪避增加10%' }
          ],
          days_cond: '4',
          has_right: 0,
          reach_days: 0
        }
      }, // 连续充值
      recharge_status: {
        30: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 160000, text: '16万', tool_id: 'gamegold', type: 'property', text_add: '加赠3.2万' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 16, text: '16', type: 'tool' }
          ],
          condition: 30,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        50: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 220000, text: '22万', tool_id: 'gamegold', text_add: '加赠4.4万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 22, text: '22', type: 'tool' }
          ],
          condition: 50,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        100: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 450000, text: '45万', tool_id: 'gamegold', text_add: '加赠9万', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 45, text: '45', type: 'tool' }
          ],
          condition: 100,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        200: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 880000, text_add: '加赠17.6万', text: '88万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 88, text: '88', type: 'tool' },
            { icon: 'cbt_60_60.png', id: 4, name: '藏宝图', nums: 10, text: '10', type: 'cbt' }
          ],
          condition: 200,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        300: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 1300000, text_add: '加赠26万', text: '130万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 130, text: '130', type: 'tool' }
          ],
          condition: 300,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        500: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 2000000, text_add: '加赠40万', text: '200万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 200, text: '200', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 4, name: '黄金藏宝图', nums: 1, text: '1', type: 'hjcbt' }
          ],
          condition: 500,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        1000: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 3400000, text: '340万', text_add: '加赠68万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 340, text: '340', type: 'tool' }
          ],
          condition: 1000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        2000: {
          awards: [
            { icon: 'yb_60_60.png', name: '元宝', nums: 6000000, text: '600万', text_add: '加赠120万', tool_id: 'gamegold', type: 'property' },
            { icon: 'ljs_60_60.png', id: 2, name: '绿晶石', nums: 600, text: '600', type: 'tool' },
            { icon: 'hjcbt_60_60.png', id: 4, name: '召唤石', nums: 3, text: '3', type: 'hjcbt' }
          ],
          condition: 2000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        },
        5000: {
          awards: [
            { icon: 'yb_120_120.png', name: '元宝', nums: 12000000, text: '1200万', tool_id: 'gamegold', type: 'property', text_add: '加赠240万' },
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
            { icon: 'yb_120_120.png', name: '元宝', nums: 24000000, text: '24000万', tool_id: 'gamegold', type: 'property', text_add: '加赠480万' },
            { icon: 'ljs_120_120.png', id: 2, name: '绿晶石', nums: 2400, text: '2400', type: 'tool' },
            { icon: '', id: 4676, name: '称号', nums: 7, text: '7天', type: 'title' },
            { id: 0, name: '威望值', nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加', type: 'prestige' }
          ],
          condition: 10000,
          has_right: 0,
          is_daily: true,
          recharge_nums: 0
        }
      }, // 累计充值
      single_recharge_status: {
        condition: 1,
        has_right: 0,
        awards: [
          { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', name: '绿晶石', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'mk2_17.png' },
          { type: 'tool', tool_id: 158, icon: 'cbt_120_120.png', name: '藏宝图', nums: 1, show_text: '藏宝图+1', text: '藏宝图+1', mark: '' },
          { type: '', icon: 'sjjl_120_120.png', tool_id: 0, name: '随机稀有奖励', nums: 1, show_text: '随机稀有奖励', text: '随机稀有奖励', mark: 'mk2_18.png' }
        ]
      }, // 天天首充礼
      user_tickets: 0, // 礼盒 抽奖次数
      user_recharges: 0, // 礼盒 充值金额
      is_last_day: false, // 天天首充礼 是否为最后一天 用于按钮文本显示
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  computed: {
    giftBoxData() {
      return { user_tickets: this.user_tickets, user_recharges: this.user_recharges }
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
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    updateGiftBoxData(user_tickets) {
      this.user_tickets = user_tickets
    },
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
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
      const arr = this.accruing_days_list[3000].awards
      const text = arr[arr.length - 1].desc
      this.accruing_days_list[3000].awards.push({ text, name: '威望值' })
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
    width: 716px; /*todo 宽度 去看图片原始宽度，不要看蓝湖*/
    border-image-slice: 140 0 290 0 fill; /*todo 顶部距离是一般tab高度 底部距离一般和outBox一致*/
    border-image-width: 140px 0 290px 0; /*todo 顶部距离是一般tab高度 底部距离一般和outBox一致*/
    border-image-source: url('@/pages/midAutumn/assets/zs_3.png'); /*todo 连续充值有礼背景*/
    padding-top: 0;
    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 140px; /*todo tab高度*/
      .resetIcon {
        top: 30px; /*todo 重置图标 距离tab top*/
        left: 2px; /*todo 重置图标 距离tab left*/
        width: 124px;
        height: 42px;
        background: url('@/pages/midAutumn/assets/mk2_1.png') no-repeat left top/100% 100%; /*todo 图片名 可能要改*/
      }
      .update-1 {
        position: absolute;
        top: 13px; /*todo 重置图标 距离tab bottom*/
        left: 275px; /*todo 重置图标 距离tab left*/
        width: 96px;
        height: 128px;
        background: url('@/pages/midAutumn/assets/mk2_5.png') no-repeat left top/100% 100%; /*todo 图片名 可能要改*/
      }
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
    .rechargeAwardList {
      padding-top: 15px;
    }
    .rules-text {
      img {
        width: 50px;
        height: auto;
      }
    }
  }
  .active-tab-bg {
    border-image-source: url('@/pages/midAutumn/assets/zs_4.png'); /*todo 连续充值有礼边框背景图片名*/
  }
}
</style>
