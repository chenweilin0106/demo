<template>
  <div class="compo">
    <OutBox :title="'title_21.png'">
      <div class="topTip1">天天首充礼·充值任意金额</div>
      <div class="topTip2">每日重置，请及时领取</div>
      <div class="singleRulesBtn" @click="singleRulesBtnCk"></div>
      <div class="singleAwardsArea">
        <div class="singleAwardItem" v-for="(item) in single_recharge_status.awards" :key="item.tool_id">
          <PublicImg class="singleAwardIcon" :imgName="item.icon" />
          <div class="singleAwardDesc">{{item.show_text}}</div>
          <img class="singleAwardMark" v-if="item.mark" :src="IconPath(item.mark)" />
          <!-- <div class="esTipMark" v-if="item.icon == 'cbt_120_120.png'" @click="isShowEsTipMark = !isShowEsTipMark">
            <div class="esTipMarkCon" v-if="isShowEsTipMark">限时加赠，用于符石寻宝</div>
          </div> -->
        </div>
      </div>
      <div :class="['singleBtn', single_recharge_status.has_right==0?'buttonBig-noFinish':single_recharge_status.has_right==1?'buttonBig-receive':single_recharge_status.has_right==2?'buttonBig-finish':null]" @click="singleBtnCk" v-html="single_recharge_status.has_right==0?'去完成':single_recharge_status.has_right==1?'立即领取':(single_recharge_status.has_right==2&&is_last_day)?'已领取':`已领取<p class='esP'>（明日再来）</p>`"></div>
      <div class="bottomTipArea">
        <div class="bottomTipTitle">
          <img :src="IconPath('mk2_3.png')" />
          <span>首充重置</span>
          <img :src="IconPath('mk2_3_1.png')" />
        </div>
        <div class="rules-text">
          <ul>
            <li>1.活动开始后重置<i>安卓、IOS、代充</i>所有额度首充</li>
            <li>2.活动期间<i>648及以下</i>额度首充双倍福利每日重置</li>
          </ul>
        </div>
        <div :class="['rechargeBtn','buttonBig-noFinish']" @click="handleRecharge">立即充值</div>
      </div>
    </OutBox>
    <OutBox :title="'title_16.png'" class="drawBox">
      <div class="topTip">每充值10元可获得1次开启次数</div>
      <div class="giftBoxArea">
        <div class="ticketsDiv">剩余开启次数:{{user_tickets}}</div>
        <div class="rechargesDiv">充值金额:{{user_recharges}}</div>
        <div class="poolIconDiv" @click="poolIconDivCk"></div>
        <div class="drawOneDiv" @click="drawDivCk(1)">开启1次</div>
        <div class="drawTenDiv" @click="drawDivCk(2)">开启10次</div>
      </div>
    </OutBox>
    <OutBox class="rechargeBox">
      <div class="rechargeTag">
        <div :class="['tagItem', typeRechargeTag==1?'active':'unactive']" @click="changeTrtCk(1)">累计充值有礼<div class="mark10per"></div></div>
        <div :class="['tagItem', typeRechargeTag==2?'active':'unactive']" @click="changeTrtCk(2)">连续充值有礼</div>
      </div>
      <div class="accumulateArea" v-if="typeRechargeTag==1">
        <transition-group :name="flipAnim" tag="ul">
          <li :class="['accumulateItem', item.condition>=5000?'type2':'type1']" v-for="(item) in recharge_status_show" :key="item.condition">
            <div class="nameDesc"><i>累计</i>充值满<i>{{item.condition}}元&ensp;({{item.recharge_nums}}/{{item.condition}})</i></div>
            <div class="awardsDivType1" v-if="item.condition<5000">
              <div class="awardItem" v-for="(it,inex) in item.awards" :key="inex">
                <PublicImg class="awardIcon" :imgName="it.icon" />
                <span>+{{it.text}}</span>
                <span v-if="(inex+1)!=item.awards.length">,&ensp;</span>
                <div class="ybAddIcon" v-if="it.text_add"><img :src="IconPath('mk2_15.png')" />{{it.text_add}}</div>
              </div>
            </div>
            <div class="awardsDivType2" v-else>
              <div :class="['awardItem', it.type=='title'?'title':'other']" v-for="(it,inex) in item.awards.slice(0,3)" :key="inex">
                <PublicImg class="awardIcon" :imgName="it.icon" />
                <div class="awardText">+{{it.text}}</div>
              </div>
              <div class="ybAddIcon" v-if="item.awards[0].text_add"><img :src="IconPath('mk2_15.png')" />{{item.awards[0].text_add}}</div>
              <div class="bottomTip">{{item.awards[3].text}}</div>
            </div>
            <!-- <div :class="['accumulateBtn', item.condition>=5000?'type2':'type1', item.has_right==0?`button${item.condition>=5000?'Big':''}-noFinish`:item.has_right==1?`button${item.condition>=5000?'Big':''}-receive`:item.has_right==2?`button${item.condition>=5000?'Big':''}-finish`:null]" @click="accumulateBtnCk(item)">{{item.has_right==0?'去完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div> -->
            <div :class="['accumulateBtn', 'type1', item.has_right==0?`button-noFinish`:item.has_right==1?`button-receive`:item.has_right==2?`button-finish`:null]" @click="accumulateBtnCk(item)">{{item.has_right==0?'去完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div>
          </li>
        </transition-group>
      </div>
      <div class="accumulateArea" v-else-if="typeRechargeTag==2">
        <transition-group :name="flipAnim" tag="ul">
          <li :class="['accumulateItem', item.amount_cond>=5000?'type2':'type1']" v-for="(item) in accruing_days_list_show" :key="item.amount_cond">
            <div class="nameDesc"><i>累计{{item.days_cond}}天</i>每天充值满<i>{{item.amount_cond}}元&ensp;({{item.reach_days}}/{{item.days_cond}})</i></div>
            <div class="awardsDivType1" v-if="item.amount_cond<5000">
              <div class="awardItem" v-for="(it,inex) in item.awards" :key="inex">
                <PublicImg class="awardIcon" :imgName="it.icon" />
                <span>+{{it.text}}</span>
                <span v-if="(inex+1)!=item.awards.length">,&ensp;</span>
              </div>
            </div>
            <div class="awardsDivType2" v-else>
              <div :class="['awardItem', it.type=='title'?'title':'other']" v-for="(it,inex) in item.awards.slice(0,4)" :key="inex">
                <PublicImg class="awardIcon" :imgName="it.icon" />
                <div class="awardText">+{{it.text}}</div>
              </div>
              <div class="bottomTip">{{item.awards[4].text}}</div>
            </div>
            <div :class="['accumulateBtn', item.amount_cond>=5000?'type2':'type1', item.has_right==0?`button${item.amount_cond>=5000?'Big':''}-noFinish`:item.has_right==1?`button${item.condition>=5000?'Big':''}-receive`:item.has_right==2?`button${item.condition>=5000?'Big':''}-finish`:null]" @click="continBtnCk(item)">{{item.has_right==0?'去完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div>
          </li>
        </transition-group>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_120_120.png')" />及<img :src="IconPath('hjcbt_120_120.png')" />分别可进行1/30次符石寻宝</li>
        </ul>
      </div>
    </OutBox>
    <SingleRulesPopup v-if="isShowSingleRulesPopup" @closePopups="closePopups"></SingleRulesPopup>
    <SingleRewardsPopup v-if="isShowSingleRewardsPopup" :rewardsList="listSingleRewardsPopup" @closePopups="closePopups"></SingleRewardsPopup>
    <RechargePopup v-if="isShowRechargePopup" @handleRecharge="handleRecharge" @closePopups="closePopups"></RechargePopup>
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @closePopups="closePopups"></ReceivePopup>
    <DrawPoolPopup v-if="isShowDrawPoolPopup" @closePopups="closePopups"></DrawPoolPopup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/luckyFlop/api/index'
import { recharge } from '@/pages/luckyFlop/utils/toApp' // 跳转充值界面APP方法
import SingleRulesPopup from './components/singleRulesPopup.vue'
import SingleRewardsPopup from './components/singleRewardsPopup.vue'
import RechargePopup from './components/rechargePopup.vue'
import ReceivePopup from './components/receivePopup.vue'
import DrawPoolPopup from './components/drawPoolPopup.vue'

export default {
  name: 'depositRebate',
  props: [],
  components: {
    SingleRulesPopup,
    SingleRewardsPopup,
    RechargePopup,
    ReceivePopup,
    DrawPoolPopup
  },
  data() {
    return {
      single_recharge_status: {
        condition: 1,
        has_right: 0,
        awards: [
          { type: 'tool', tool_id: 2, icon: 'ljs_120_120.png', name: '绿晶石', double_nums: 0, nums: 20, show_text: '绿晶石+20', text: '+20', mark: 'mk2_17.png' },
          { type: 'tool', tool_id: 158, icon: 'cbt_120_120.png', name: '藏宝图', nums: 1, show_text: '藏宝图+1', text: '藏宝图+1', mark: '' },
          { type: '', icon: 'mk2_10.png', tool_id: 0, name: '随机稀有奖励', nums: 1, show_text: '随机稀有奖励', text: '随机稀有奖励' }
        ]
      }, // 充值礼包
      is_last_day: false, // 是否是最后一天
      isShowEsTipMark: true, // 藏宝图提示
      user_tickets: 0, // 剩余开启次数
      user_recharges: 0, // 充值金额
      typeRechargeTag: 1, // 1:累计充值有礼 2:连续充值有礼
      flipAnim: 'flipMoveNo', // 控制是否滚动
      recharge_status_show: {
        30: { condition: 30, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 160000, text: '16万', icon: 'yb_60_60.png', text_add: '加赠1.6万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 16, text: '16', icon: 'ljs_60_60.png' }] },
        50: { condition: 50, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 220000, text: '22万', icon: 'yb_60_60.png', text_add: '加赠2.2万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 22, text: '22', icon: 'ljs_60_60.png' }] },
        100: { condition: 100, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 450000, text: '45万', icon: 'yb_60_60.png', text_add: '加赠4.5万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 45, text: '45', icon: 'ljs_60_60.png' }] },
        200: { condition: 200, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 880000, text: '88万', icon: 'yb_60_60.png', text_add: '加赠8.8万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 88, text: '88', icon: 'ljs_60_60.png' }, { type: 'tool', name: '藏宝图', id: 158, nums: 10, text: '10', icon: 'cbt_60_60.png' }] },
        300: { condition: 300, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 1300000, text: '130万', icon: 'yb_60_60.png', text_add: '加赠13万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 130, text: '130', icon: 'ljs_60_60.png' }] },
        500: { condition: 500, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 2000000, text: '200万', icon: 'yb_60_60.png', text_add: '加赠20万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 200, text: '200', icon: 'ljs_60_60.png' }, { type: 'tool', name: '黄金藏宝图', id: 159, nums: 1, text: '1', icon: 'hjcbt_60_60.png' }] },
        1000: { condition: 1000, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 3400000, text: '340万', icon: 'yb_60_60.png', text_add: '加赠34万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 340, text: '340', icon: 'ljs_60_60.png' }] },
        2000: { condition: 2000, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 6000000, text: '600万', icon: 'yb_60_60.png', text_add: '加赠60万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 600, text: '600', icon: 'ljs_60_60.png' }, { type: 'tool', name: '黄金藏宝图', id: 159, nums: 3, text: '3', icon: 'hjcbt_60_60.png' }] },
        5000: { condition: 5000, recharge_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', tool_id: 'gamegold', name: '元宝', nums: 12000000, text: '1200万', icon: 'yb_120_120.png', text_add: '加赠120万' }, { type: 'tool', name: '绿晶石', id: 2, nums: 1200, text: '1200', icon: 'ljs_120_120.png' }, { type: 'title', name: '称号', id: 4676, nums: 7, text: '7天', icon: 'ch_rsyj.gif' }, { type: 'prestige', name: '威望值', id: 0, nums: 0.05, text: '称号属性：每次获得+基础威望值的5%，时效可叠加' }] }
      }, // 累计充值有礼列表
      recharge_status: [],
      accruing_days_list_show: {
        10: { amount_cond: 10, days_cond: 3, reach_days: 0, has_right: 0, awards: [{ type: 'tool', name: '紫晶石', id: 142, nums: 8, text: '8', icon: 'zjs_60_60.png' }, { type: 'pretty_card', name: '靓号券', id: 0, nums: 1, text: '1', icon: 'lhq_60_60.png' }] },
        30: { amount_cond: 30, days_cond: 3, reach_days: 0, has_right: 0, awards: [{ type: 'tool', name: '紫晶石', id: 142, nums: 15, text: '15', icon: 'zjs_60_60.png' }, { type: 'pretty_card', name: '靓号券', id: 0, nums: 1, text: '1', icon: 'lhq_60_60.png' }] },
        50: { amount_cond: 50, days_cond: 3, reach_days: 0, has_right: 0, awards: [{ type: 'tool', name: '紫晶石', id: 142, nums: 20, text: '20', icon: 'zjs_60_60.png' }, { type: 'pretty_card', name: '靓号券', id: 0, nums: 1, text: '1', icon: 'lhq_60_60.png' }] },
        100: { amount_cond: 100, days_cond: 3, reach_days: 0, has_right: 0, awards: [{ type: 'tool', name: '紫晶石', id: 142, nums: 25, text: '25', icon: 'zjs_60_60.png' }, { type: 'pretty_card', name: '靓号券', id: 0, nums: 1, text: '1', icon: 'lhq_60_60.png' }] },
        300: { amount_cond: 300, days_cond: 3, reach_days: 0, has_right: 0, awards: [{ type: 'tool', name: '紫晶石', id: 142, nums: 50, text: '50', icon: 'zjs_60_60.png' }, { type: 'pretty_card', name: '靓号券', id: 0, nums: 1, text: '1', icon: 'lhq_60_60.png' }] },
        500: { amount_cond: 500, days_cond: 3, reach_days: 0, has_right: 0, awards: [{ type: 'tool', name: '紫晶石', id: 142, nums: 80, text: '80', icon: 'zjs_60_60.png' }, { type: 'pretty_card', name: '靓号券', id: 0, nums: 2, text: '2', icon: 'lhq_60_60.png' }] }
      }, // 连续充值有礼列表
      accruing_days_list: [],
      isShowSingleRulesPopup: false, // 首充规则详情弹窗
      isShowSingleRewardsPopup: false, // 首充奖励弹窗
      listSingleRewardsPopup: [],
      isShowRechargePopup: false, // 充值弹窗
      isShowReceivePopup: false, // 恭喜获得弹窗
      configReceivePopup: [],
      isShowDrawPoolPopup: false // 奖池弹窗
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {
    setTimeout(() => {
      this.isShowEsTipMark = !this.isShowEsTipMark
    }, 5000)
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm2' }).then((res) => {
        if (res.errno == 0) {
          this.single_recharge_status = res.data.single_recharge_status
          this.is_last_day = res.data.is_last_day
          this.user_tickets = res.data.user_tickets
          this.user_recharges = res.data.user_recharges
          this.recharge_status = Object.values(res.data.recharge_status)
          this.recharge_status_show = this.sortRechargeList(this.recharge_status)
          this.accruing_days_list = Object.values(res.data.accruing_days_list)
          this.accruing_days_list_show = this.sortRechargeList(this.accruing_days_list)
          this.flipAnim = 'flipMove'
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    closePopups() {
      this.isShowSingleRulesPopup = false
      this.isShowSingleRewardsPopup = false
      this.isShowRechargePopup = false
      this.isShowReceivePopup = false
      this.isShowDrawPoolPopup = false
    },
    /**
     * 首充规则详情弹窗
     */
    singleRulesBtnCk() {
      this.isShowSingleRulesPopup = true
    },
    /**
     * 首充礼包按钮
     */
    singleBtnCk() {
      if (this.single_recharge_status.has_right == 0) {
        this.handleRecharge()
      } else if (this.single_recharge_status.has_right == 1) {
        getPageData({ type: 'recharge_single_reward' }).then((res) => {
          if (res.errno == 0) {
            this.listSingleRewardsPopup = res.data.data
            setTimeout(() => {
              this.isShowSingleRewardsPopup = true
            })
            this.getPageData()
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 跳转APP充值界面
     */
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    /**
     * 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
     */
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
    /**
     * 好运礼盒奖池
     */
    poolIconDivCk() {
      console.log('奖池')
      this.isShowDrawPoolPopup = true
    },
    /**
     * 抽奖
     * @param type 1:1次 2:10次
     */
    drawDivCk(type) {
      if (this.user_tickets >= Math.pow(10, Number(type) - 1)) {
        getPageData({ type: 'comm_lottery', mark: type }).then((res) => {
          if (res.errno == 0) {
            this.user_tickets = res.data.user_tickets
            this.configReceivePopup = res.data.awards
            setTimeout(() => {
              this.isShowReceivePopup = true
            })
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        console.log('开启次数不足，请前往充值')
        this.isShowRechargePopup = true
      }
    },
    /**
     * 切换充值礼包标签
     */
    changeTrtCk(id) {
      this.flipAnim = 'flipMoveNo'
      this.typeRechargeTag = id
      setTimeout(() => {
      this.flipAnim = 'flipMove'
      })
    },
    /**
     * 累计充值领取礼包
     */
    accumulateBtnCk(item) {
      // console.log(item)
      if (item.has_right == 0) {
        this.handleRecharge()
      } else if (item.has_right == 1) {
        getPageData({ type: 'recharge_reward', mark: item.condition }).then((res) => {
          if (res.errno == 0) {
            // this.getPageData()
            item.has_right = 2
            this.recharge_status_show = this.sortRechargeList(this.recharge_status)
            this.$toast(res.errmsg)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 连续充值领取礼包
     */
    continBtnCk(item) {
      if (item.has_right == 0) {
        this.handleRecharge()
      } else if (item.has_right == 1) {
        getPageData({ type: 'recharge_accruing_reward', mark: item.amount_cond }).then((res) => {
          if (res.errno == 0) {
            item.has_right = 2
            this.accruing_days_list_show = this.sortRechargeList(this.accruing_days_list)
            this.$toast(res.errmsg)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 排序数组
     */
    sortRechargeList(list) {
      let a = []
      let b = []
      for (let item of list) {
        if (item.has_right == 2) {
          b.push(item)
        } else {
          a.push(item)
        }
      }
      return a.concat(b)
    }
  }
}
</script>
<style>
.esP{
  font-weight: 400;
  font-size: 24px;
  color: #464642;
}
</style>
<style scoped lang="scss">
.compo{
  .topTip1{
    text-align: center;
    margin-top: 10px;
    font-weight: 600;
    font-size: 32px;
    color: #4A50D1;
  }
  .topTip2{
    font-size: 28px;
    color: #4A50D1;
    text-align: center;
    margin-top: 10px;
    i{
      color: #FF78D0;
    }
  }
  .singleRulesBtn{
    width: 58px;
    height: 58px;
    background: url('@/pages/luckyFlop/assets/mk2_9.png') no-repeat left top/100% 100%;
    position: absolute;
    right: 40px;
    top: 100px;
  }
  .singleAwardsArea{
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: center;
    .singleAwardItem{
      width: 196px;
      height: 204px;
      background: url('@/pages/luckyFlop/assets/mk2_1.png') no-repeat left top/100% 100%;
      position: relative;
      .singleAwardIcon{
        width: 120px;
        height: 120px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 30px;
      }
      .singleAwardDesc{
        font-size: 28px;
        color: #4A50D1;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 15px;
      }
      .singleAwardMark{
        height: 32px;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .esTipMark{
        width: 28px;
        height: 28px;
        background: url('@/pages/luckyFlop/assets/mk2_11.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0px;
        top: 0px;
        .esTipMarkCon{
          width: 170px;
          height: 86px;
          background: url('@/pages/luckyFlop/assets/mk2_11_1.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -124px;
          top: -90px;
          font-size: 24px;
          color: #4A50D1;
          white-space: pre-wrap;
          padding: 10px;
        }
      }
      &:nth-child(2) {
        margin: 0 28px;
      }
    }
  }
  .singleBtn{
    margin: 10px auto 0 auto;
    flex-direction: column;
  }
  .bottomTipArea{
    width: 664px;
    height: 344px;
    background: url('@/pages/luckyFlop/assets/mk2_2.png') no-repeat left top/100% 100%;
    margin: 10px auto 0 auto;
    padding: 50px 0 0 0;
    .bottomTipTitle{
      font-size: 32px;
      color: #FFFFFF;
      text-align: center;
      img{
        width: 132px;
        height: 24px;
      }
    }
    .rules-text{
      color: #fff;
      margin: 20px auto 0 auto;
    }
    .rechargeBtn{
      margin: 20px auto 0 auto;
    }
  }
  .drawBox{
    .topTip{
      text-align: center;
      margin-top: 10px;
      font-weight: 600;
      font-size: 32px;
      color: #4A50D1;
    }
    .giftBoxArea{
      width: 664px;
      height: 528px;
      background: url('@/pages/luckyFlop/assets/mk2_12.png') no-repeat left top/100% 100%;
      margin: 10px auto 0 auto;
      position: relative;
      .ticketsDiv{
        background: linear-gradient(0deg, #7876D7, #4F76DF);
        border: #fff 2px solid;
        border-radius: 24px;
        padding: 5px 20px;
        position: absolute;
        left: 20px;
        top: 60px;
      }
      .rechargesDiv{
        background: linear-gradient(0deg, #7876D7, #4F76DF);
        border: #fff 2px solid;
        border-radius: 24px;
        padding: 5px 20px;
        position: absolute;
        right: 20px;
        top: 60px;
      }
      .poolIconDiv{
        width: 96px;
        height: 96px;
        background: url('@/pages/luckyFlop/assets/mk2_8.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 20px;
        top: 140px;
      }
      .drawOneDiv{
        width: 256px;
        height: 83px;
        background: url('@/pages/luckyFlop/assets/btn_4.png') no-repeat left top/100% 100%;
        font-size: 32px;
        color: #4A50D1;
        font-weight: 600;
        text-align: center;
        line-height: 82px;
        position: absolute;
        left: 40px;
        bottom: 30px;
      }
      .drawTenDiv{
        width: 256px;
        height: 83px;
        background: url('@/pages/luckyFlop/assets/btn_5.png') no-repeat left top/100% 100%;
        color: #fff;
        font-weight: 600;
        text-align: center;
        line-height: 82px;
        position: absolute;
        right: 40px;
        bottom: 30px;
      }
    }
  }
  .rechargeBox{
    margin-top: 80px;
    .rechargeTag{
      display: flex;
      margin: -120px auto 0 auto;
      justify-content: center;
      font-weight: 500;
      .tagItem{
        width: 363px;
        height: 150px;
        font-size: 40px;
        text-align: center;
        line-height: 150px;
        position: relative;
        &.active{
          background: url('@/pages/luckyFlop/assets/tab_3.png') no-repeat left top/100% 100%;
          color: #6359E4;
          text-shadow: 1px 0 #F0F6A5,-1px 0 #F0F6A5,0 1px #F0F6A5,0 -1px #F0F6A5,1px 1px #F0F6A5,-1px -1px #F0F6A5,1px -1px #F0F6A5,-1px 1px #F0F6A5;
        }
        &.unactive{
          background: url('@/pages/luckyFlop/assets/tab_4.png') no-repeat left top/100% 100%;
          color: #FFFFFF;
          text-shadow: 1px 0 #8185E6,-1px 0 #8185E6,0 1px #8185E6,0 -1px #8185E6,1px 1px #8185E6,-1px -1px #8185E6,1px -1px #8185E6,-1px 1px #8185E6;
        }
        .mark10per{
          width: 68px;
          height: 103px;
          background: url('@/pages/luckyFlop/assets/mk2_20.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .accumulateArea{
      .flipMove-move{
        transition: all 1s;
      }
      .flipMoveNo-move{
        transition: none;
      }
      .accumulateItem{
        margin: 10px auto 0 auto;
        width: 660px;
        position: relative;
        &.type1{
          height: 142px;
          background: url('@/pages/luckyFlop/assets/mk1_1.png') no-repeat left top/100% 100%;
        }
        &.type2{
          height: 294px;
          background: url('@/pages/luckyFlop/assets/mk2_4.png') no-repeat left top/100% 100%;
        }
        .nameDesc{
          font-size: 30px;
          color: #fff;
          position: absolute;
          left: 20px;
          top: 25px;
          i{
            color: #FFFAA6;
          }
        }
        .awardsDivType1{
          min-width: 200px;
          height: 50px;
          border-image-source: url('@/pages/luckyFlop/assets/mk2_7.png');
          border-image-slice: 0 50 0 50 fill;
          border-image-width: 0 50px 0 50px;
          padding: 0 10px;
          position: absolute;
          left: 10px;
          bottom: 20px;
          display: flex;
          .awardItem{
            font-size: 24px;
            line-height: 24px;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            .awardIcon{
              width: 50px;
              height: 50px;
            }
            .ybAddIcon{
              img{
                width: 33px;
                height: 44px;
              }
            }
          }
        }
        .awardsDivType2{
          width: 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 70px;
          display: flex;
          // justify-content: space-evenly;
          .awardItem{
            background: #F3F4FF;
            border-radius: 12px;
            border: 2px solid #F0C8FF;
            position: relative;
            margin: 0 15px;
            &.title{
              width: 160px;
              height: 130px;
            }
            &.other{
              width: 120px;
              height: 130px;
            }
            .awardIcon{
              position: absolute;
              top: -15px;
            }
            .awardText{
              width: 100%;
              height: 30px;
              background: #B070ED;
              border-radius: 0 0 12px 12px;
              font-size: 24px;
              color: #FFFFFF;
              text-align: center;
              line-height: 35px;
              position: absolute;
              bottom: 0;
            }
          }
          .ybAddIcon{
            font-size: 24px;
            color: #FFFAA6;
            position: absolute;
            left: 20px;
            bottom: -50px;
            img{
              width: 33px;
              height: 44px;
            }
          }
          .bottomTip{
            font-size: 24px;
            color: #FFFAA6;
            position: absolute;
            left: 20px;
            bottom: -80px;
          }
        }
        .accumulateBtn{
          position: absolute;
          &.type1{
            right: 15px;
            top: 20px;
          }
          &.type2{
            left: 50%;
            transform: translateX(-50%);
            bottom: 70px;
          }
        }
      }
    }
    .rules-text{
      img{
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
