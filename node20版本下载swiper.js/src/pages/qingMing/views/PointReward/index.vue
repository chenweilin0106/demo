<template>
  <div class="PointReward">
    <!--任务列表-->
    <out-box class="task-list">
      <TaskListItem
        v-for="(taskItem, key) in pageData.task_list"
        :key="taskItem.task_name"
        :taskItem="taskItem"
        :taskItemKey="key"
        :pointName="pointName"
        :pointIcon="pointIcon"
        @onTaskItemClick="onTaskItemClick"
        @update="getPageData({ type: 'tab', mark: 'm1' })"
      />
      <!-- 说明文字 -->
      <div class="rule-text">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" />，{{ pointName }}</li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员(含超值兑换中兑换会员)、活力卡</li>
          <li>不计入充值</li>
        </ul>
      </div>
    </out-box>
    <!--兑换列表-->
    <out-box class="exchange-list" title="title_1.png">
      <!-- 我的道具 -->
      <div class="my-goods flex align-center justify-center line-height-100">
        我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ pageData.my_goods }}
      </div>
      <ExchargeListItem
        v-for="goods in pageData.goods_list"
        :key="goods.goods_name"
        :exchargeItem="goods"
        @onExchangeClick="onExchangeClick"
        :pointName="pointName"
        :spend_point="pageData.spend_point"
      />
      <!-- 规则说明 -->
      <div class="rule-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
          <li>赠送权等限定奖励</li>
        </ul>
      </div>
    </out-box>

    <!-- 兑换好礼弹框 -->
    <ExchangeGiftsPopup
      ref="ExchangeGiftsPopup"
      :pointIcon="pointIcon"
      :pointName="pointName"
      :my_goods="pageData.my_goods"
      @update="updateGoodsList"
    />
  </div>
</template>

<script>
// 默认数据
import { pointReward } from '../../utils/pageData'
// 数据请求
import { getPageData } from '../../api/index'
// 兑换好礼弹框组件
import ExchangeGiftsPopup from './components/ExchangeGiftsPopup.vue'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchargeListItem from './components/ExchargeListItem'

export default {
  name: 'PointReward',
  components: { TaskListItem, ExchargeListItem, ExchangeGiftsPopup },
  data() {
    return {
      // 道具图标
      pointIcon: 'qt_96_60.png',
      // 道具名称
      pointName: '青团'
    }
  },
  computed: {
    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return (has_right, is_recharge) => {
        return (has_right == 0 && is_recharge && '去完成') || this.ButtonText('GoodsTask', has_right)
      }
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm1' })
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
  },
  methods: {
    // 兑换好礼列表更新事件
    updateGoodsList(res) {
      this.$toast(res.errmsg)
      // 兑换成功 更新数据
      if (res.errno == 0) {
        this.pageData.my_goods = res.data.goods
        this.pageData.goods_list = res.data.goods_list
      }
    },
    // 任务列表领取按钮点击事件(flag标识是否可领取，key标识点击的是哪个任务，isRecharge标识是否跳转充值)
    async onTaskItemClick(key) {
      // 若为领取状态，则领取
      const res = await this.clickTopButton({ mark: key })
      if (res.errno == 0) {
        this.$toast(res.errmsg)
        this.pageData.my_goods = res.data.goods
        this.pageData.task_list[key].has_right = res.data.has_right
      }
    },
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    async onExchangeClick(type) {
      this.openPrompt('ExchangeGiftsPopup', type)
    },
    // 任务列表领取接口
    async clickTopButton(obj) {
      return await getPageData({
        ...obj,
        type: 'task_award_new'
      })
    },
    // 兑换好礼兑换接口
    async clickBottomButton(mark) {
      const { data } = await getPageData({
        type: 'goods_detail',
        mark
      })
      this.pageData.my_goods = data.my_goods
      this.dialogData = data.goods_detail
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 任务列表
  .task-list {
    margin-top: 7px;
    padding-top: 38px;
    height: 1039px;
    .rule-text {
      margin-top: -8px;
      width: 605px;
      height: 171px;
      margin-left: 60px;

      li:nth-of-type(2) {
        margin-top: 5px;
        margin-bottom: 10px;
      }
    }
  }

  // 兑换列表
  .exchange-list {
    margin-top: 96px;
    margin-bottom: 170px;
    padding-top: 71px;
    height: 1399px;
    // 顶部道具数量
    .my-goods {
      margin: 0 auto 21px;
      padding: 0 10px;
      min-width: 320px;
      width: fit-content;
      height: 48px;
      background: #02484a;
      border-radius: 24px;
      font-size: 28px;
      color: #ffffff;

      > img {
        width: 52px;
        //height: 40px;
        margin: 0 5px;
      }
    }

    .rule-text {
      //margin-top: -13px;
      line-height: 50px;
      margin-left: 61px;
      width: 614px;
      height: 75px;
    }
  }
}
</style>
