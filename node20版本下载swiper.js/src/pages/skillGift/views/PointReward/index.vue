<template>
  <div class="PointReward">
    <!--任务列表-->
    <skill-gift-box class="task-list" :rightSide="true">
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
    </skill-gift-box>
    <!--兑换列表-->
    <skill-gift-box class="exchange-list" title="title_1.png" :rightSide="true">
      <!-- 我的道具 -->
      <div class="my-goods">我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{ pageData.my_goods }}</div>
      <ExchargeListItem
        v-for="goods in pageData.goods_list"
        :key="goods.goods_name"
        :exchangeItem="goods"
        :pointName="pointName"
        :spend_point="pageData.spend_point"
        @onExchangeClick="onExchangeClick"
      />
      <!-- 规则说明 -->
      <div class="rule-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
          <li>赠送权等限定奖励</li>
        </ul>
      </div>
    </skill-gift-box>
    <!-- 兑换好礼弹框 -->
    <exchange-gifts-prompt
      ref="exchangeGiftsPrompt"
      :pointIcon="pointIcon"
      :pointName="pointName"
      :my_goods="pageData.my_goods"
      @update="updateGoodsList"
    />
  </div>
</template>

<script>
import { _throttle } from '../../utils/tool'
// 默认数据
import { pointReward } from '../../utils/pageData'
// 数据请求
import { getPageData } from '../../api/index'
// 兑换好礼弹框组件
import ExchangeGiftsPrompt from '../../popups/exchange-gifts-prompt.vue'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchargeListItem from './components/ExchargeListItem'
import SkillGiftBox from '@/pages/skillGift/components/skill-gift-box.vue'

export default {
  name: 'PointReward',
  components: {
    SkillGiftBox,
    TaskListItem,
    ExchargeListItem,
    ExchangeGiftsPrompt
  },
  data() {
    return {
      // 道具图标
      pointIcon: 'jf_34_36.png',
      // 道具名称
      pointName: '积分'
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
    onExchangeClick: _throttle(function (param) {
      if (param.has_right != 1) return
      if (!this.isEnough(param)) return
      this.openPrompt('exchangeGiftsPrompt', param.type)
    }, 1000),
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.pageData.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      console.log(res)
      return res
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 任务列表
  .task-list {
    margin-top: 25px;
    padding-top: 30px;
    height: 1049px;
    ::v-deep .right-side-icon {
      top: 327px;
    }
    .rule-text {
      margin-top: 12px;
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
    margin-top: 77px;
    padding-top: 60px;
    //height: 1551px;
    padding-bottom: 50px;
    ::v-deep .right-side-icon {
      top: 342px;
    }
    // 顶部道具数量
    .my-goods {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 21px;
      padding: 0 10px;
      min-width: 324px;
      width: fit-content;
      height: 52px;
      background: linear-gradient(90deg, rgba(83, 140, 255, 0.5), rgba(57, 74, 206, 0.5), rgba(83, 140, 255, 0.5));
      border: 2px solid #95f4ff;
      border-radius: 22px 0px 22px 0px;
      font-size: 28px;
      color: #ffffff;

      > img {
        width: 34px;
        height: 35px;
        margin: 2px 5px 0;
      }
    }

    .rule-text {
      line-height: 50px;
      margin-left: 61px;
      width: 614px;
      height: 75px;
    }
  }
}
</style>
