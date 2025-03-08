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
          <!-- <li><span></span>靓号券可在靓号摇摇乐活动中摇取靓号</li> -->
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
import { getPageData } from '@/pages/crazyEgg/api/index'
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
    margin-top: 0px;
    margin-left: 30px;
    color: #ffefcf;
    margin-bottom: 22px;

    li {
      position: relative;
      line-height: 42px;
      font-size: 28px;

      span {
        position: absolute;
        top: 16px;
        left: -20px;
        display: block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #fffaa6;
      }
    }
  }
}
</style>
