<template>
  <div class="PointReward">
    <!--任务列表-->
    <PublicContainer class="task-list">
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
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" />，{{ pointName }}</li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员(含超值兑换中兑换会员)、活力卡</li>
          <li>不计入充值</li>
        </ul>
      </div>
    </PublicContainer>
    <!--兑换列表-->
    <PublicContainer class="exchange-list" titleIcon="title_1.png">
      <!-- 我的道具 -->
      <div class="my-goods">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ pageData.my_goods }}</div>
      <ExchangeListItem
        v-for="goods in pageData.goods_list"
        :key="goods.goods_name"
        :exchargeItem="goods"
        :pointName="pointName"
        :spend_point="pageData.spend_point"
        @onExchangeClick="onExchangeClick"
      />
      <!-- 规则说明 -->
      <div class="rules-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
          <li>赠送权等限定奖励</li>
        </ul>
      </div>
    </PublicContainer>
    <!-- 兑换好礼弹框 -->
    <ExchangeGiftsPopup
      v-if="showExchangeGiftsPopup"
      v-bind="exchangeGiftsPopupData"
      @update="updateGoodsList"
      @close="showExchangeGiftsPopup = false"
    />
  </div>
</template>

<script>
import getPageDataMixin from '@/pages/mayDay2024/mixins/getPageDataMixin'
import { _throttle } from '../../utils/tool'
import { pointReward } from '../../utils/pageData'
import { getPageData } from '../../api/index'
import ExchangeGiftsPopup from './components/exchangeGiftsPopup.vue'
import TaskListItem from './components/taskListItem'
import ExchangeListItem from './components/exchangeListItem'

export default {
  name: 'PointReward',
  components: {
    TaskListItem,
    ExchangeListItem,
    ExchangeGiftsPopup
  },
  mixins: [getPageDataMixin],
  data() {
    return {
      pointIcon: 'yz_60_60.png', // 道具图标
      pointName: '印章', // 道具名称
      showExchangeGiftsPopup: false, // 兑换好礼弹框显隐
      exchangeGiftsPopupData: {
        // pointIcon: 'yz_60_60.png', // 道具图标
        // pointName: '印章', // 道具名称
        // my_goods: 123123,
        // type: 'tools_ljs2'
      } // 兑换好礼弹框数据
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
    onTaskItemClick: _throttle(async function (key) {
      // 若为领取状态，则领取
      const res = await getPageData({ mark: key, type: 'task_award_new' })
      if (res.errno == 0) {
        this.$toast(res.errmsg)
        this.pageData.my_goods = res.data.goods
        this.pageData.task_list[key].has_right = res.data.has_right
      }
    }, 1000),
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    onExchangeClick: _throttle(function (type) {
      this.exchangeGiftsPopupData = { pointIcon: this.pointIcon, pointName: this.pointName, my_goods: this.pageData.my_goods, type }
      this.showExchangeGiftsPopup = true
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  margin-top: -11px;
  // 任务列表
  .task-list {
    padding-top: 81px;
    height: 1110px;
  }

  // 兑换列表
  ::v-deep .exchange-list {
    margin: 41px auto 0;
    padding-top: 99px;
    height: 1849px;
    // 顶部道具数量
    .my-goods {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 7px;
      padding: 0 10px;
      min-width: 320px;
      width: fit-content;
      height: 48px;
      background: #6b7ffd;
      border-radius: 24px;
      font-size: 28px;
      color: #ffffff;

      > img {
        width: 32px;
        height: 33px;
      }
    }
  }
}
</style>
