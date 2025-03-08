<template>
  <div class="ConsumeGift">
    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
  </div>
</template>

<script>
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
// 导入默认数据
import { consumeGift } from '../../../../utils/pageData'
// 接口导入
import { getPageData } from '../../../../api/index'

export default {
  name: 'ConsumeGift',
  components: {
    CumulativeSpendingList
  },
  data() {
    return {
      showDialog: false,
      dialogData: {}
    }
  },
  computed: {
    // 累积消费返利列表数据
    consume_status() {
      return this.pageData.consume_status
    }
  },
  created() {
    // 载入默认数据
    this.pageData = consumeGift
    // 页面数据请求
    this.getPageData({
      type: 'tab',
      mark: 'm3'
    })
  },
  methods: {
    // 领取任务奖励
    async getGiftTaskAward(mark) {
      const res = await this.getGiftTaskAwardApi(mark)
      this.$toast(res.errmsg)
      if (res.errno == 0) {
        this.pageData.award_list.find((item) => item.key == mark).has_right = 2
      }
    },
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
