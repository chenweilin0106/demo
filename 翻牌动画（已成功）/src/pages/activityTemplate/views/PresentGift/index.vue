<template>
  <div class="PresentGift">
    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
    <!-- 懒加载 -->
    <lazy-component>
      <!-- tab切换-获赠榜单-赠送榜单 -->
      <ThemeBox class="PresentGift_BottonBox">
        <div class="theme_children_tab PresentGift_BottonBox-tab">
          <div
            v-for="item in rankText"
            :key="item"
            class="theme_tabs_item"
            @click="rankMark = item"
            :class="{
              theme_tabs_item_active: rankMark == item,
              theme_tabs_item_active_right:
                rankMark == item && rankMark == '获赠榜'
            }"
          >
            {{ item }}
          </div>
        </div>
        <div class="tabs_contain">
          <!-- 我的道具数量 -->
          <div class="top_my_goods">
            我{{ rankMark.slice(0, 2) }}的钻石礼物：{{ RankData.userPresent }}钻
          </div>
          <!-- 榜单组件 -->
          <PresentGiftRank :rankData="RankData.rankList" />
        </div>
      </ThemeBox>
    </lazy-component>
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
      const mark1 =
        this.rankMark === '赠送榜' ? 'send_present_top' : 'present_top'
      const mark2 =
        this.rankMark === '赠送榜' ? 'my_send_present' : 'my_present'
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
  .PresentGift_BottonBox {
    .PresentGift_BottonBox-tab {
      margin-bottom: 10px;
      height: 50px;
      .theme_tabs_item {
        height: 36px;
        font-size: 16px;
        line-height: 36px;
      }
      // 底部tab栏活动
      .theme_tabs_item_active {
        font-size: 20px !important;
        font-weight: 500 !important;
        height: 50px !important;
      }
      // 底部tab栏活动
      .theme_tabs_item_active_right {
        background: url('../../assets/zs.png') no-repeat top center/100% !important;
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
        text-align: center;
        color: #fff;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
