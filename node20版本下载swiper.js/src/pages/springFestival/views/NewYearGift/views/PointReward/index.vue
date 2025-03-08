<template>
  <div class="PointReward">
    <out-box class="PointReward_TaskListContent">
      <div class="task_list">
        <TaskListItem
          v-for="(taskItem, key) in pageData.task_list"
          :key="taskItem.task_name"
          :taskItem="taskItem"
          :taskItemKey="key"
          :pointName="pointName"
          :pointIcon="pointIcon"
          @onTaskItemClick="onTaskItemClick"
        />
      </div>
      <!-- 说明文字 -->
      <div class="rule-text">
        <ul>
          <li>
            <span></span>活动期间完成以上每日任务可领取{{ pointName
            }}<img :src="IconPath(pointIcon)" />，{{ pointName }}
          </li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
    </out-box>
    <out-box class="PointReward_BottomBox" title="title_1.png">
      <!-- 我的道具 -->
      <div class="PointReward_BottomBox_Present flex-center">
        我的{{ pointName }}<img :src="IconPath(pointIcon)" />：{{
          pageData.my_goods
        }}
      </div>
      <!-- 兑换好礼列表 -->
      <div class="PointReward_BottomBox_GoodsList">
        <ExchargeListItem
          v-for="goods in pageData.goods_list"
          :key="goods.goods_name"
          :exchargeItem="goods"
          :pointName="pointName"
          :spend_point="pageData.spend_point"
          @onExchargeClick="onExchargeClick"
        />
      </div>
      <!-- 规则说明 -->
      <div class="rule-text">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中兑换称号、头饰、限时礼物</li>
          <li>赠送权等限定奖励</li>
        </ul>
      </div>
    </out-box>
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
import ExchangeGiftsPrompt from './components/exchange-gifts-prompt.vue'
import { pointReward } from '../../../../utils/pageData'
// 数据请求
import { getPageData } from '../../../../api/index'
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchargeListItem from './components/ExchargeListItem'

export default {
  name: 'PointReward',
  components: {
    ExchangeGiftsPrompt,
    TaskListItem,
    ExchargeListItem
  },
  data() {
    return {
      // 道具图标
      pointIcon: 'bp_46_60.png',
      // 道具名称
      pointName: '鞭炮'
    }
  },
  computed: {
    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return (has_right, is_recharge) => {
        return (
          (has_right == 0 && is_recharge && '去完成') ||
          this.ButtonText('GoodsTask', has_right)
        )
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
    async onExchargeClick(type) {
      this.$refs.exchangeGiftsPrompt.openPrompt(type)
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
  // 奖励兑换 上方box
  .PointReward_TaskListContent {
    height: 1044px;
    overflow: hidden;
    .task_list {
      margin: 38px auto 0;
      width: fit-content;
    }

    .rule-text {
      margin-top: 15px;
      margin-left: 55px;

      li:nth-of-type(2) {
        //margin-top: 3px;
        margin-bottom: 6px;
      }
    }
  }

  // 奖励兑换 下方box
  .PointReward_BottomBox {
    height: 1714px;
    margin-top: 135px;
    //margin-bottom: 186px;
    padding-top: 58px;

    .PointReward_BottomBox_Present {
      min-width: 320px;
      width: fit-content;
      height: 48px;
      margin: 0 auto 20px;
      font-size: 28px;
      border-radius: 24px;
      padding: 0 20px;
      background: #df944a;
      font-weight: 700;
      color: #ffffff;

      > img {
        width: 32px;
        height: 39px;
        margin: 0 8px;
      }
    }
    .rule-text {
      margin-top: -5px;
      margin-left: 57px;
      line-height: 40px;
    }
  }
}
</style>
