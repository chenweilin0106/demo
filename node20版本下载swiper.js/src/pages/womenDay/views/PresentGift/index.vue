<template>
  <div class="PresentGift">
    <crown-you
      :crown-you-data="{
        man_gift: pageData.man_gift,
        woman_gift: pageData.woman_gift,
        recharge_nums: pageData.recharge_nums,
        gender: pageData.gender
      }"
      @receive-success="crownYouReceiveSuccess"
    />
    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
    <!-- tab切换-获赠榜单-赠送榜单 -->
    <div class="rank-list position-relative">
      <img
        :src="IconPath('back_7.png')"
        class="petal-4 position-absolute pointer-none"
      />
      <img
        :src="IconPath('back_8.png')"
        class="petal-5 position-absolute pointer-none"
      />
      <div class="inner w-100 h-100">
        <div class="rank-tabs">
          <div
            v-for="item in rankText"
            :key="item"
            @click="rankMark = item"
            :class="[
              'tab',
              'flex-1',
              'flex-center',
              { 'tab-active': rankMark == item }
            ]"
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
      </div>
    </div>
  </div>
</template>

<script>
import CrownYou from './components/CrownYou.vue'
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
// 榜单
import PresentGiftRank from './components/PresentGiftRank'
// 导入默认数据
import { presentGift } from '../../utils/pageData'
// 接口导入
import { getPageData } from '../../api/index'

export default {
  name: 'PresentGift',
  components: {
    PresentGiftRank,
    CumulativeSpendingList,
    CrownYou
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
    crownYouReceiveSuccess() {
      const gender = this.pageData.gender == 0 ? 'man' : 'woman'
      this.pageData[`${gender}_gift`].gift_award_st = 2
    },
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
    z-index: 2;
    margin: 0 auto 161px;
    width: 726px;
    height: 880px;
    border: 6px solid #725b3e;
    background-color: #d8b873;
    padding: 6px;
    border-radius: 20px 20px 30px 30px;

    .petal-4 {
      top: 121px;
      right: -7px;
      width: 31px;
      height: 28px;
    }

    .petal-5 {
      right: 93px;
      bottom: -80px;
      width: 138px;
      height: 121px;
    }

    .inner {
      background: linear-gradient(180deg, #f4edd7, #f8f3e3);
      border-radius: 0px 0px 20px 20px;
    }

    .rank-tabs {
      position: relative;
      display: flex;
      justify-content: center;
      margin: 0 0 15px;
      //height: 50px;
      .tab {
        position: relative;
        width: 346px;
        height: 71px;
        background: #704217;
        font-size: 32px;
        color: #f1ca89;
        align-items: flex-start;
        line-height: 71px;
      }

      // 底部tab栏活动
      .tab-active {
        font-size: 38px !important;
        font-weight: 700 !important;
        color: #fff !important;
        width: 350px !important;
        height: 91px !important;
        background: url('@/pages/womenDay/assets/mk3_13.png') no-repeat left
          top/100% 100%;
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
