<template>
  <div class="PresentGift">
    <GiftBack :gift-back-data="giftBackData" @updateGiftBackData="updateGiftBackData" />
    <CumulativeSpendingList :consume_status="pageData.consume_status" :transitionClass="transitionClass" @ClickCumulativeBtn="ClickCumulativeBtn" />
  </div>
</template>

<script>
import { _throttle } from '../../utils/tool'
import GiftBack from './components/GiftBack.vue'
import CumulativeSpendingList from './components/CumulativeSpendingList' // 累计消费返利组件
import { presentGift } from '../../utils/pageData'
import { getPageData } from '../../api/index'

export default {
  name: 'PresentGift',
  components: { CumulativeSpendingList, GiftBack },
  data() {
    return {
      transitionClass: 'noTransition'
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
  // 获赠榜单-赠送榜单
  .rank-list {
    z-index: 2;
    margin: 0 auto 170px;
    width: 726px;
    height: 940px;
    border: 6px solid #95516a;
    background-color: #d8b873;
    padding: 6px;
    border-radius: 20px 20px 30px 30px;

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
        background: #642b36;
        font-size: 32px;
        color: #c48b9a;
        align-items: flex-start;
        line-height: 71px;
      }

      // 底部tab栏活动
      // .tab-active {
      //   font-size: 38px !important;
      //   font-weight: 700 !important;
      //   color: #fff !important;
      //   width: 350px !important;
      //   height: 91px !important;
      //   background: url('@/pages/gardenParty/assets/mk3_13.png') no-repeat left top/100% 100%;
      //   line-height: 0;
      //   padding-top: 40px;
      // }
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
