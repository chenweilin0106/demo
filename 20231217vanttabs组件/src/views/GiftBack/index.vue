<template>
  <div class="GiftBack">
    <gift-tasks
      :giftTasksData="pageData"
      @open="openPrompt('titleReturn')"
      @getAward="getGiftTaskAward"
    />
    <CumulativeSpendingList
      :consume_status="consume_status"
      @ClickCumulativeBtn="ClickCumulativeBtn"
    />
    <title-return-prompt ref="titleReturn" tool-name="兑换券" goods-num="0" />
  </div>
</template>

<script>
import titleReturnPrompt from './components/title-return-prompt.vue'
// 收礼任务
import giftTasks from './components/GiftTasks.vue'
// 累计消费返利组件
import CumulativeSpendingList from './components/CumulativeSpendingList'
// 导入默认数据
import { module3 } from '@/utils/pageData'
// 接口导入
import { getPageData } from '@/api/index'

export default {
  name: 'GiftBack',
  components: {
    CumulativeSpendingList,
    giftTasks,
    titleReturnPrompt
  },
  data() {
    return {
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
    this.pageData = module3
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
    // 收礼任务奖励领取接口
    async getGiftTaskAwardApi(mark) {
      return await getPageData({
        type: 'pop_rev_award',
        mark
      })
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
.GiftBack {
  .title_return {
    width: 566px;
    height: 822px;
    .TitleReturn {
      ::v-deep .remain_num {
        margin-top: 73px;
      }
    }
  }
}
</style>
