<template>
  <div class="PointReward">
    <!--任务列表-->
    <OutBox class="task-list" bowKnot="true">
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
    </OutBox>
    <!--兑换列表-->
    <OutBox class="exchange-list" title="title_1.png" leftBalloon="true" rightBalloon="true">
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
    </OutBox>
    <!-- todo 兑换好礼弹框（需要自测） -->
    <ExchangeGiftsPopup
      v-if="showExchangeGiftsPopup"
      v-bind="exchangeGiftsPopupData"
      @update="updateGoodsList"
      @clickClose="showExchangeGiftsPopup = false"
    />
  </div>
</template>

<script>
import { _throttle } from '@/pages/520/utils/tool'
import { pointReward } from '@/pages/520/utils/pageData'
import { getPageData } from '@/pages/520/api/index'
import getPageDataMixin from '@/pages/520/mixins/getPageDataMixin'
import TaskListItem from './components/taskListItem'
import ExchangeListItem from './components/exchangeListItem'
const ExchangeGiftsPopup = () => import('./components/exchangeGiftsPopup.vue')

export default {
  name: 'PointReward',
  mixins: [getPageDataMixin],
  components: {
    TaskListItem,
    ExchangeListItem,
    ExchangeGiftsPopup
  },
  data() {
    return {
      exchangeGiftsPopupData: { type: '', pointIcon: '', pointName: '', my_goods: 0 }, // 兑换好礼弹框数据
      showExchangeGiftsPopup: false, // 兑换好礼弹框显示状态
      pointIcon: 'qs_68_65.png', // 道具图标
      pointName: '情书' // 道具名称
    }
  },
  async created() {
    // 使用默认数据
    this.pageData = pointReward
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm1' })
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
    this.exchangeGiftsPopupData = { my_goods: this.pageData.my_goods, pointIcon: this.pointIcon, pointName: this.pointName }
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
    onExchangeClick(type) {
      this.exchangeGiftsPopupData.type = type
      this.exchangeGiftsPopupData.my_goods = this.pageData.my_goods
      this.showExchangeGiftsPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 任务列表
  ::v-deep .task-list {
    margin-top: 19px;
    padding-top: 65px;
    height: 1085px;
    .rule-text {
      //margin-top: -8px;
      width: 605px;
      height: 171px;
      margin-left: 69px;

      li:nth-of-type(2) {
        margin-top: 5px;
      }
    }
  }

  // 兑换列表
  ::v-deep .exchange-list {
    margin: 99px auto 0;
    padding-top: 99px;
    height: 1624px;
    // 顶部道具数量
    .my-goods {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      padding: 0 10px;
      min-width: 320px;
      width: fit-content;
      height: 48px;
      background: #e27e9f;
      border-radius: 24px;
      font-size: 28px;
      color: #ffffff;

      > img {
        width: 47px;
        height: 43px;
      }
    }

    .rule-text {
      margin-top: -10px;
      margin-left: 61px;
      width: 614px;
      height: 75px;
    }
  }
}
</style>
