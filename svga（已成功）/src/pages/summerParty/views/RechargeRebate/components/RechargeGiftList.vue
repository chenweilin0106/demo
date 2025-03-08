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
    <div class="RechargeGiftList_Footer">
      <ul>
        <!-- 连续充值说明规则 -->
        <template v-if="RechargeGiftListMark === '连续充值有礼'">
          <li>
            <span></span
            >购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内
          </li>
          <li><span></span>靓号券可在靓号摇摇乐活动中摇取靓号</li>
        </template>
        <!-- 累计充值说明规则 -->
        <li v-else>
          <span></span>购买礼包、会员（含超值兑换中兑换会员）、活力卡不计算在内
        </li>
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
  .RechargeGiftList_Footer {
    margin-left: 22px;
    color: #fff;
    margin-bottom: 11px;
    li {
      position: relative;
      line-height: 25px;
      padding-left: 3px;
      padding-right: 5px;
      font-size: 14px;
      span {
        position: absolute;
        top: 10px;
        left: -10px;
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }
      list-style-type: none;
    }
  }
}
</style>
