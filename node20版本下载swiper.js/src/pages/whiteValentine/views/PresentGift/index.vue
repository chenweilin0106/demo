<template>
  <div class="PresentGift">
    <receiving-gifts :props-data="receivingGifts" @update="updateReceiveGift" />

    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
  </div>
</template>

<script>
import ReceivingGifts from './components/ReceivingGifts.vue'
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
// 导入默认数据
import { presentGift } from '../../utils/pageData'
// 接口导入
import { getPageData } from '../../api/index'

export default {
  name: 'PresentGift',
  components: {
    ReceivingGifts,
    CumulativeSpendingList
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    receivingGifts() {
      return {
        masonry_nums: this.pageData.masonry_nums,
        masonry_max: this.pageData.masonry_max,
        recharge_nums: this.pageData.recharge_nums,
        recharge_max: this.pageData.recharge_max,
        award_list: this.pageData.award_list,
        gender: this.pageData.gender
      }
    },
    // 累积消费返利列表数据
    consume_status() {
      return this.pageData.consume_status
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
    updateReceiveGift() {
      this.pageData.award_list[0].has_right = 2
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
}
</style>
