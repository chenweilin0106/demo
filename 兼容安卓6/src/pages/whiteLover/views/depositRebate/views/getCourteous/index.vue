<template>
  <div>
    <div class="depositRebate-bottom-body">
      <czItem
        v-for="(value, key) in accruing_days_list"
        :key="key"
        :itemValue="value"
        @getAward="clickGetAward(key)"
        @toRecharge="$emit('toRecharge')"
      ></czItem>
    </div>
    <!-- 说明文字 -->
    <div class="bottom-text">
      <ul>
        <li>购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内</li>
        <li>靓号券可在靓号摇摇乐活动中摇取靓号</li>
      </ul>
    </div>
  </div>
</template>

<script>
import czItem from '../../components/czItem.vue'
import { getDepositRebateData } from '../../../../api/depositRebate'
export default {
  // 连续充值有礼
  name: 'getCourteous',
  components: {
    czItem
  },
  props: {
    accruing_days_list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    // console.log(this.$$route)
  },
  methods: {
    // 领取接口封装
    async getAward(mark) {
      const res = await getDepositRebateData({
        type: 'recharge_accruing_reward',
        mark
      })
      return res
    },
    // 点击领取
    async clickGetAward(mark) {
      await this.getAward(mark)
      this.$toast('领取成功')
      this.$emit('getData')
    }
  }
}
</script>

<style scoped lang="scss">
.depositRebate-bottom-body {
  padding: 0 9px;
}
.bottom-text {
  margin-left: 30px;

  color: #595ec3;
  padding-top: 8px;
  margin-bottom: 11px;
  li {
    line-height: 25px;
  }
}
</style>
