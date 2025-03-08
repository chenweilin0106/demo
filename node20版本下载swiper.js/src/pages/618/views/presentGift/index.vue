<template>
  <div class="PresentGift">
    <CumulativeSpendingList :consume_status="consume_status" @ClickCumulativeBtn="ClickCumulativeBtn" :transitionClass="transitionClass" />
    <PresentGiftRank v-bind="presentGiftRankData" />
  </div>
</template>

<script>
import CumulativeSpendingList from './components/cumulativeSpendingList' // 累计消费
import PresentGiftRank from './components/presentGiftRank' // 榜单
import { presentGift } from '@/pages/618/utils/pageData'
import getPageDataMixin from '@/pages/618/mixins/getPageDataMixin'
import { getPageData } from '@/pages/618/api/index'

export default {
  name: 'PresentGift',
  components: { PresentGiftRank, CumulativeSpendingList },
  mixins: [getPageDataMixin],
  data() {
    return {
      transitionClass: 'noTransition'
    }
  },
  computed: {
    consume_status() {
      return this.pageData.consume_status
    },
    presentGiftRankData() {
      return {
        my_send_present: this.pageData.my_send_present,
        my_present: this.pageData.my_present,
        present_top: this.pageData.present_top,
        send_present_top: this.pageData.send_present_top
      }
    }
  },
  async created() {
    this.pageData = presentGift
    await this.getPageData({ type: 'tab', mark: 'm3' })
    this.transitionClass = 'hasTransition'
  },
  methods: {
    async ClickCumulativeBtn(mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      !res.errno && (this.pageData.consume_status[mark].has_right = 2)
    }
  }
}
</script>

<style scoped lang="scss"></style>
