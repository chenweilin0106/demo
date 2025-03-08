<template>
  <div class="RechargeRebate">
    <FirstDouble :fist-double-data="single_recharge_status" @recharge="recharge(hiddenFn)" @updateFirstDoubleData="updateFirstDoubleData" />
    <GiftBox :giftBoxData="giftBoxData" @updateGiftBoxData="updateGiftBoxData" @recharge="recharge(hiddenFn)" />
    <OutBox class="RechargeRebate_BottomBox" :right="false" :bottom="false">
      <div
        class="RechargeRebate_BottomBox_Tab"
        :class="{
          'active-tab-bg': RechargeGiftListMark == '连续充值有礼'
        }"
      >
        <!--<div class="reset-icon"></div>-->
        <div class="update-1"></div>
        <div v-for="item in RechargeGiftList_Text" :key="item" class="tab" @click="switchTab(item)">
          {{ item }}
        </div>
      </div>
      <RechargeTasksList
        v-show="RechargeGiftListMark == '累计充值有礼'"
        :RechargeGiftListData="pageData.recharge_status"
        :transitionClass="transitionClass"
        @recharge="recharge(hiddenFn)"
        @updateRechargeData="updateRechargeData"
      />
      <RechargeTasksList
        v-show="RechargeGiftListMark == '连续充值有礼'"
        :RechargeGiftListData="pageData.accruing_days_list"
        :transitionClass="transitionClass"
        @recharge="recharge(hiddenFn)"
        @updateRechargeData="updateRechargeData"
      />
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
import { rechargeRebate } from '@/pages/dragonBoat/utils/pageData'
import { recharge } from '@/pages/dragonBoat/utils/toApp'
// import { getPageData } from '@/pages/dragonBoat/api'
import getPageDataMixin from '@/pages/dragonBoat/mixins/getPageDataMixin'

export default {
  name: 'RechargeRebate',
  components: { FirstDouble, RechargeTasksList, GiftBox },
  mixins: [getPageDataMixin],
  data() {
    return {
      transitionClass: 'noTransition',
      RechargeGiftList_Text: ['累计充值有礼', '连续充值有礼'],
      RechargeGiftListMark: '累计充值有礼' // tab标识
    }
  },
  computed: {
    giftBoxData() {
      return { user_tickets: this.pageData.user_tickets, user_recharges: this.pageData.user_recharges }
    },
    RechargeGiftListData() {
      return this.RechargeGiftListMark == '累计充值有礼' ? this.pageData.recharge_status : this.pageData.accruing_days_list
    },
    single_recharge_status() {
      return { ...this.pageData.single_recharge_status, is_last_day: this.pageData.is_last_day, showBubble: this.showBubble }
    }
  },
  async created() {
    this.pageData = rechargeRebate
    await this.getPageData({ type: 'tab', mark: 'm2' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    /**
     * @description 更新礼盒数据
     * @param {number|string} user_tickets 用户礼券
     */
    updateGiftBoxData(user_tickets) {
      this.pageData.user_tickets = user_tickets
    },
    updateFirstDoubleData() {
      this.pageData.single_recharge_status.has_right = 2
    },
    switchTab(item) {
      this.RechargeGiftListMark = item
    },
    updateRechargeData(mark) {
      const type = this.RechargeGiftListMark === '累计充值有礼' ? 'recharge_status' : 'accruing_days_list'
      this.pageData[type][mark].has_right = 2 // 更新列表数据
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData({ type: 'tab', mark: 'm2' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // 用于连续充值3000档位征服者文本描述，因为后端无法和累计充值的人生赢家称号奖励数据格式相同，这里前端手动处理
    // async getPageData(data) {
    //   const res = await getPageData(data)
    //   res.errno != 0 ? this.$toast(res.errmsg) : (this.pageData = res.data)
    //   const arr = this.pageData.accruing_days_list[3000].awards
    //   const text = arr[arr.length - 1].desc
    //   this.pageData.accruing_days_list[3000].awards.push({ text, name: '威望值' })
    // },
    recharge
  }
}
</script>

<style scoped lang="scss">
.noTransition-move {
  transition: none;
}
.hasTransition-move {
  transition: all 0.7s;
}
.RechargeRebate {
  position: relative;
  .RechargeRebate_BottomBox {
    //width: 734px;
    margin-top: 166px; //tab图片高度 + 距离上方盒子高度
    padding-bottom: 40px; // 距离底部距离
    border-image-width: 0 0 80px 0; // 移除顶部切割
    padding-top: 106px; // tab图片高度

    .RechargeRebate_BottomBox_Tab {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 106px;
      background: url('@/pages/dragonBoat/assets/zs_1.png') no-repeat center top/750px 100%;
      margin-top: -212px; //tab图片高度 * 2
      //padding: 0 20px;
      //.reset-icon {
      //  position: absolute;
      //  top: 0;
      //  left: 22px;
      //  width: 124px;
      //  height: 42px;
      //  background: url('@/pages/dragonBoat/assets/mk2_1.png') no-repeat left top/100% 100%;
      //}
      .update-1 {
        position: absolute;
        bottom: -2px;
        left: 297px;
        width: 96px;
        height: 128px;
        background: url('@/pages/dragonBoat/assets/mk2_5.png') no-repeat left top/100% 100%;
      }
      .tab {
        position: relative;
        flex: 1;
        height: 100%;
        font-size: 32px;
        opacity: 0;
        line-height: 72px;

        &:nth-child(1) {
          margin-right: 24px;
        }
      }
    }

    .active-tab-bg {
      background: url('@/pages/dragonBoat/assets/zs_2.png') no-repeat center top/750px 100%;
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
}
</style>
