<template>
  <div class="PresentGift">
    <CumulativeSpendingList :consume_status="consume_status" @ClickCumulativeBtn="ClickCumulativeBtn" :transitionClass="transitionClass" />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <OutBox class="rank-list position-relative">
      <div class="rank-tabs">
        <div
          v-for="item in rankText"
          :key="item"
          :class="['tab flex align-center justify-center', rankMark == item && 'tab-active']"
          @click="rankMark = item"
        >
          {{ item }}
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 我的道具数量 -->
        <div class="top_my_goods">我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻</div>
        <!-- 榜单组件 -->
        <PresentGiftRank :rankData="RankData.rankList" />
      </div>
    </OutBox>
  </div>
</template>

<script>
// 累计消费返利组件
import CumulativeSpendingList from './components/cumulativeSpendingList'
// 榜单
import PresentGiftRank from './components/presentGiftRank'
// 导入默认数据
import { presentGift } from '../../utils/pageData'
import getPageDataMixin from '@/pages/dragonBoat/mixins/getPageDataMixin'
// 接口导入
import { getPageData } from '../../api/index'

export default {
  name: 'PresentGift',
  components: {
    PresentGiftRank,
    CumulativeSpendingList
  },
  mixins: [getPageDataMixin],
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
    await this.getPageData({ type: 'tab', mark: 'm3' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    }
  }
}
</script>

<style scoped lang="scss">
.PresentGift {
  // 获赠榜单-赠送榜单
  .rank-list {
    margin: 0 auto;
    height: 995px;

    .rank-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: 0 0 15px;
      padding-top: 13px;
      .tab {
        position: relative;
        width: 347px;
        height: 71px;
        background: #2a8288;
        font-size: 32px;
        color: #8bd7d3;
        align-items: flex-start;
        line-height: 71px;
      }

      // 底部tab栏活动
      .tab-active {
        font-size: 40px;
        color: #ffffff;
        font-weight: bold;
        width: 347px;
        height: 91px;
        background: url('@/pages/dragonBoat/assets/mk3_13.png') no-repeat left top/100% 100%;
        line-height: 0;
        padding-top: 40px;
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
        color: #77480c;
        text-align: center;
        margin-bottom: 18px;
      }
    }
  }
}
</style>
