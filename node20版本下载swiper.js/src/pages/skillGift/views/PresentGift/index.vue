<template>
  <div class="PresentGift">
    <CumulativeSpendingList :consume_status="consume_status" :transitionClass="transitionClass" @ClickCumulativeBtn="ClickCumulativeBtn" />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <skill-gift-box class="rank-list">
      <div class="rank-tabs">
        <div v-for="item in rankText" :key="item" @click="rankMark = item" :class="['rank-tab', { 'tab-active': rankMark == item }]">
          {{ item }}
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 我的道具数量 -->
        <div class="top_my_goods">我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻</div>
        <!-- 榜单组件 -->
        <PresentGiftRank :rankData="RankData.rankList" />
      </div>
    </skill-gift-box>
  </div>
</template>

<script>
import CumulativeSpendingList from './components/CumulativeSpendingList'
import PresentGiftRank from './components/PresentGiftRank'
import { presentGift } from '../../utils/pageData'
import { getPageData } from '../../api/index'
import SkillGiftBox from '@/pages/skillGift/components/skill-gift-box.vue'
import { _throttle } from '@/pages/skillGift/utils/tool'

export default {
  name: 'PresentGift',
  components: {
    SkillGiftBox,
    PresentGiftRank,
    CumulativeSpendingList
  },
  props: {},
  data() {
    return {
      transitionClass: '',
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
  watch: {},
  async created() {
    // 载入默认数据
    this.pageData = presentGift
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm3' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    // 累积消费返利列表领取
    ClickCumulativeBtn: _throttle(async function (mark) {
      // this.pageData.consume_status[1000].has_right = 2 // 测试代码
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.PresentGift {
  // 获赠榜单-赠送榜单
  .rank-list {
    overflow: hidden;
    height: 960px;
    .rank-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: 11px 0 21px;
      .rank-tab {
        display: flex;
        justify-content: center;
        position: relative;
        width: 348px;
        height: 75px;
        background: linear-gradient(0deg, rgba(54, 46, 156, 0.5), rgba(42, 63, 188, 0.5));
        border: 2px solid #3b8aed;
        font-size: 32px;
        color: #7bdeff;
        line-height: 75px;
      }

      // 底部tab栏活动
      .tab-active {
        padding-top: 5px;
        font-size: 38px !important;
        font-weight: 500 !important;
        color: #ffffff !important;
        width: 352px !important;
        height: 96px !important;
        background: url('@/pages/skillGift/assets/mk2_4.png') no-repeat left top/100% 100%;
        border: none;
      }
    }

    .tabs_contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 10px;
      overflow: hidden;
      // 我的道具数量
      .top_my_goods {
        width: 100%;
        font-size: 28px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 18px;
      }
    }
  }
}
</style>
