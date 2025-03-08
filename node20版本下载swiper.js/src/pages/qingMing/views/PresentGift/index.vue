<template>
  <div class="PresentGift">
    <CumulativeSpendingList :consume_status="consume_status" @ClickCumulativeBtn="ClickCumulativeBtn" />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <out-box class="rank-list">
      <div class="rank-tabs">
        <div v-for="item in rankText" :key="item" @click="rankMark = item" :class="['tab', { 'tab-active': rankMark == item }]">
          <div class="inner flex align-center justify-center line-height-100">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tabs_contain">
        <!-- 我的道具数量 -->
        <div class="top_my_goods">我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻</div>
        <!-- 榜单组件 -->
        <PresentGiftRank :rankData="RankData.rankList" />
      </div>
    </out-box>
  </div>
</template>

<script>
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
import PresentGiftRank from './components/PresentGiftRank'
// 导入默认数据
import { presentGift } from '../../utils/pageData'
// 接口导入
import { getPageData } from '../../api/index'

export default {
  name: 'PresentGift',
  components: {
    PresentGiftRank,
    CumulativeSpendingList
  },
  props: {},
  data() {
    return {
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
  created() {
    // 载入默认数据
    this.pageData = presentGift
    // 页面数据请求
    this.getPageData({
      type: 'tab',
      mark: 'm3'
    })
  },
  methods: {
    // 累积消费返利列表领取
    async ClickCumulativeBtn(mark) {
      const res = await this.getAward(mark)
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    },
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
.PresentGift {
  // 获赠榜单-赠送榜单
  .rank-list {
    margin-bottom: 170px;
    padding-top: 34px;
    padding-bottom: 25px;
    height: 919px;
    .rank-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: -73px 0 30px;
      //height: 50px;
      .tab {
        position: relative;
        width: 295px;
        height: 93px;
        background: no-repeat left top/100% 100%;
        align-items: flex-start;
        font-size: 32px;
        color: #ffffff;
        padding-top: 2px;

        .inner {
          width: 100%;
          height: 74px;
        }
      }
      // 底部tab栏活动
      .tab:nth-child(1) {
        background-image: url('@/pages/qingMing/assets/mk2_4_3.png');
      }
      .tab:nth-child(2) {
        background-image: url('@/pages/qingMing/assets/mk2_4_1.png');
      }
      // 底部tab栏活动
      .tab-active {
        padding-top: 4px;
        font-weight: bold;
        font-size: 38px;
        color: #16474a;
      }
      .tab:nth-child(1).tab-active {
        background-image: url('@/pages/qingMing/assets/mk2_4.png');
      }
      .tab:nth-child(2).tab-active {
        background-image: url('@/pages/qingMing/assets/mk2_4_2.png');
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
