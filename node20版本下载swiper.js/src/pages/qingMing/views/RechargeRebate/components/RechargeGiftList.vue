<template>
  <div class="RechargeGiftList">
    <div class="RechargeGiftList_Main">
      <!-- 充值列表子组件 -->
      <RechargeTaskItem
        v-for="(value, key) in RechargeGiftListData"
        :key="key"
        :itemValue="value"
        @getAward="clickGetAward"
        @toRecharge="$emit('toRecharge')"
      ></RechargeTaskItem>
    </div>
    <!-- 说明文字 -->
    <div class="rule-text">
      <ul>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
        <li>卡不计算在内</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPageData } from '../../../api/index'
// 充值有礼列表组件
import RechargeTaskItem from './RechargeTaskItem'
export default {
  name: 'RechargeGiftList',
  props: ['RechargeGiftListMark', 'RechargeGiftListData'],
  components: {
    RechargeTaskItem
  },
  methods: {
    handleGetAward(data) {
      this.$emit('handleGetAward', data)
    },
    // 点击领取
    async clickGetAward(mark, type) {
      const res = await this.getAward(mark, type)
      this.$toast(res.errmsg)
      res.errno == 0 && this.$emit('updateRechargeData', mark)
    },
    // 领取接口封装
    async getAward(mark, type) {
      return await getPageData({
        type,
        mark
      })
    }
  }
}
</script>

<style scoped lang="scss">
.RechargeGiftList {
  .RechargeGiftList_Main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .rule-text {
    //margin-top: 11px;
    width: 612px;
    height: 67px;
    margin-left: 66px;
  }
}
</style>
