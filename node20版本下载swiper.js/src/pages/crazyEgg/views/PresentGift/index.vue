<template>
  <div class="GiftBack">
    <CumulativeSpendingList :consume_status="consume_status" :transitionClass="transitionClass" @ClickCumulativeBtn="ClickCumulativeBtn" />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <OutBox class="PresentGift_BottonBox">
      <div class="PresentGift_BottonBox-tab" @click.self="rankMark = rankMark === '赠送榜' ? '获赠榜' : '赠送榜'">
        <div v-if="rankMark === '赠送榜'" class="left-tab" @click.self="rankMark = '赠送榜'"></div>
        <div v-if="rankMark === '获赠榜'" class="right-tab" @click.self="rankMark = '获赠榜'"></div>
      </div>
      <div class="tabs_contain">
        <!-- 我的道具数量 -->
        <div class="top_my_goods">我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻</div>
        <!-- 榜单组件 -->
        <PresentGiftRank :rankData="RankData.rankList" />
      </div>
      <!-- 说明文字 -->
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间，每日<i style="color: #59f9bc">赠送和获赠钻石礼物价值</i>最高的前</li>
          <li>10名玩家可获得排名奖励，榜单<i style="color: #59f9bc">每日重置</i>，奖励</li>
          <li>会在次日发放</li>
          <li><span></span>活动期间收到钻石礼物，可获得<i style="color: #59f9bc">双倍经验值和双倍</i></li>
          <li><i style="color: #59f9bc">基础魅力值，魅力值上限提高50%</i></li>
          <li><span></span>每个ID只能获得一个榜单的排名奖励，按最大名次</li>
          <li>派发</li>
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList.vue'
// 导入默认数据
import { presentGift } from '@/pages/crazyEgg/utils/pageData'
// 接口导入
import { getPageData } from '@/pages/crazyEgg/api'
import PresentGiftRank from './components/PresentGiftRank.vue'

export default {
  name: 'GiftBack',
  components: {
    PresentGiftRank,
    CumulativeSpendingList
  },
  data() {
    return {
      transitionClass: 'noTransition',
      rankText: ['赠送榜', '获赠榜'],
      rankMark: '赠送榜'
    }
  },
  computed: {
    // 累积消费返利列表数据
    consume_status() {
      return this.pageData.consume_status
    },
    // 排行榜数据
    RankData() {
      const obj = {}
      const mark1 = this.rankMark === '赠送榜' ? 'send_present_top' : 'present_top'
      const mark2 = this.rankMark === '赠送榜' ? 'my_send_present' : 'my_present'
      obj.rankList = this.pageData[mark1]
      obj.userPresent = this.pageData[mark2]
      return obj
    }
  },
  async created() {
    // 载入默认数据
    this.pageData = presentGift
    // 页面数据请求
    await this.getPageData({
      type: 'tab',
      mark: 'm3'
    })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await this.getAward(mark)
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    },
    /*
     * 以下为接口封装
     */
    // 累积消费返利列表领取接口
    async getAward(mark) {
      return await getPageData({
        type: 'consume_reward',
        mark
      })
    }
  }
}
</script>

<style scoped lang="scss">
.GiftBack {
  // 获赠榜单-赠送榜单
  .PresentGift_BottonBox {
    padding-top: 46px;
    padding-bottom: 40px;
    margin-bottom: 200px;
    .PresentGift_BottonBox-tab {
      position: relative;
      margin: 0 auto;
      width: 672px;
      height: 92px;
      background: url('@/pages/crazyEgg/assets/tab_ph_bg.png') no-repeat left top/100% auto;
      .left-tab {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 342px;
        height: 92px;
        background: url('@/pages/crazyEgg/assets/tab_zs.png') no-repeat left top/100% auto;
      }
      .right-tab {
        position: absolute;
        right: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 342px;
        height: 92px;
        background: url('@/pages/crazyEgg/assets/tab_hz.png') no-repeat left top/100% auto;
      }
    }
    .tabs_contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: -46px auto 0;
      overflow: hidden;
      width: 659px;
      //height: 619px;
      background: linear-gradient(0deg, #ffc19d, #fffbdd);
      border: 2px solid #ffe9b7;
      border-radius: 0px 0px 12px 12px;
      // 我的道具数量
      .top_my_goods {
        width: 100%;
        font-size: 28px;
        text-align: center;
        margin-top: 74px;
        margin-bottom: 32px;
        font-weight: 500;
        color: #692e19;
      }
    }
    // 说明文字
    .rules-text {
      width: 614px;
      white-space: nowrap;
      margin-top: 30px;
      margin-left: 81px;
      line-height: 40px;
      span {
        top: 12px !important;
        left: -30px !important;
      }
    }
  }
}
</style>
