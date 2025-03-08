<template>
  <div class="PresentGift">
    <CumulativeSpendingList :consume_status="pageData.consume_status" :transitionClass="transitionClass" @ClickCumulativeBtn="ClickCumulativeBtn" />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <OutBox class="rank-list">
      <div class="rank-tabs">
        <div
          v-for="item in rankText"
          :key="item"
          class="tab flex align-center justify-center"
          :class="{ 'tab-active': rankMark == item }"
          @click="rankMark = item"
        ></div>
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
import getPageDataMixin from '@/pages/childrenDay/mixins/getPageDataMixin'
import { _throttle } from '../../utils/tool'
import CumulativeSpendingList from './components/cumulativeSpendingList' // 累计消费返利组件
import PresentGiftRank from '@/pages/childrenDay/views/presentGift/components/PresentGiftRank.vue'
import { presentGift } from '../../utils/pageData'
import { getPageData } from '../../api/index'

export default {
  name: 'PresentGift',
  components: { CumulativeSpendingList, PresentGiftRank },
  mixins: [getPageDataMixin],
  data() {
    return {
      transitionClass: 'noTransition',
      rankText: ['赠送榜', '获赠榜'],
      rankMark: '赠送榜'
    }
  },
  async created() {
    this.pageData = presentGift // 载入默认数据
    await this.getPageData({ type: 'tab', mark: 'm3' }) // 页面数据请求
    this.transitionClass = 'hasTransition'
  },
  computed: {
    giftBackData() {
      return this.pageData.award_list
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
  methods: {
    updateGiftBackData(key) {
      this.pageData.award_list.find((item) => item.key === key).has_right = 2
    },
    // 累积消费返利列表领取
    ClickCumulativeBtn: _throttle(async function (mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.PresentGift {
  padding-top: 110px;
  // 获赠榜单-赠送榜单
  .rank-list {
    height: 830px;
    border-radius: 0 0 24px 24px;
    padding-top: 20px;
    .rank-tabs {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -97px;
      display: flex;
      justify-content: center;
      .tab {
        position: relative;
        width: 336px;
        height: 90px;
        background: no-repeat left top/100% 100%;
        &:nth-child(1) {
          margin-right: 28px;
          background-image: url('@/pages/childrenDay/assets/mk3_2.png');
          &.tab-active {
            background-image: url('@/pages/childrenDay/assets/mk3_2_1.png');
          }
        }
        &:nth-child(2) {
          background-image: url('@/pages/childrenDay/assets/mk3_3_1.png');
          &.tab-active {
            background-image: url('@/pages/childrenDay/assets/mk3_3.png');
          }
        }
      }
      // 底部tab栏活动
      //.tab-active {
      //  color: #4277ff;
      //  text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
      //  background-image: url('@/pages/childrenDay/assets/tab_3.png');
      //}
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
        color: #fff;
        text-align: center;
        margin-bottom: 18px;
      }
    }
  }
}
</style>
