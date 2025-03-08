<template>
  <div class="PointReward">
    <OutBox class="PointReward_TaskListContent">
      <TaskListItem
        v-for="(taskItem, key) in pageData.task_list"
        :key="taskItem.task_name"
        :taskItem="taskItem"
        :taskItemKey="key"
        :pointName="pointName"
        :pointIcon="pointIcon"
        @onTaskItemClick="onTaskItemClick"
      />
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" />，{{ pointName }}</li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="PointReward_BottomBox" title="title_10.png">
      <!-- 我的道具 -->
      <div class="theme_present PointReward_BottomBox_Present flex_across">
        我的{{ pointName }}<img :src="IconPath(pointIcon)" />：<span class="PointReward_BottomBox_present_nums flex_across"
          >{{ pageData.my_goods }}
        </span>
      </div>
      <!-- 兑换好礼列表 -->
      <ExchangeListItem
        v-for="goods in pageData.goods_list"
        :key="goods.goods_name"
        :exchangeItem="goods"
        :pointName="pointName"
        :spend_point="pageData.spend_point"
        @onExchangeClick="onExchangeClick"
      />
      <!-- 规则说明 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>钥匙可在钥匙收藏家中获取限定奖励</li>
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
import ExchangeGiftsPopup from '@/pages/crazyEgg/views/PointReward/components/exchangeGiftsPopup.vue'
// 默认数据
import { pointReward } from '@/pages/crazyEgg/utils/pageData'
// 数据请求
import { getPageData } from '@/pages/crazyEgg/api/index'
import { _throttle } from '@/pages/crazyEgg/utils/tool'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
// 兑换好礼列表项组件
import ExchangeListItem from './components/ExchangeListItem.vue'

export default {
  name: 'PointReward',
  components: {
    TaskListItem,
    ExchangeListItem,
    ExchangeGiftsPopup
  },
  data() {
    return {
      exchangeGiftsPopupData: { type: '', pointIcon: '', pointName: '', my_goods: 0 }, // 兑换好礼弹框数据
      showExchangeGiftsPopup: false, // 是否显示兑换好礼弹框
      // 道具图标
      pointIcon: 'jf_60_60.png',
      // 道具名称
      pointName: '积分'
    }
  },
  computed: {
    // 是否为召唤石弹框
    isHeroStone() {
      return this.dialogData.type === 'hero_tools_zhs'
    },
    // 幸运钥匙和靓号券特殊条件判断
    SpecialFlag() {
      return this.dialogData.goods_type === 'keys' || this.dialogData.goods_type === 'pretty_card'
    },
    // 计数器显示逻辑
    showCounter() {
      return this.dialogData.max_times !== 1 && this.dialogData.type !== 'lucky_key' && this.dialogData.type !== 'pretty_card'
    },

    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return (has_right, is_recharge) => {
        return (has_right == 0 && is_recharge && '去完成') || this.ButtonText('GoodsTask', has_right)
      }
    },
    // 弹框内道具名称
    dialogGoodsName() {
      const { goods_type, goods_name, goods_num, goods_num_text } = this.dialogData
      return ['mic', 'keys', 'pretty_card', 'car'].includes(goods_type)
        ? ['mic', 'car'].includes(goods_type)
          ? `${goods_name}+${goods_num}天`
          : goods_num_text
        : goods_name
    },
    // 弹框内按钮显隐
    showDialogButtons() {
      return (
        this.dialogData.max_times == 1 ||
        this.dialogData.goods_type == 'keys' ||
        this.dialogData.goods_type == 'pretty_card' ||
        this.dialogData.goods_type == 'hero_tools'
      )
    },
    // 弹框内幸运钥匙左按钮文字
    // 弹框内靓号券左按钮文字
    dialogLeftButtonText() {
      return this.dialogData.is_second_half ? this.dialogData.price / 2 : this.dialogData.price
    },
    // 弹框内右边按钮显隐
    showDialogRightButton() {
      return (
        ((this.dialogData.goods_type == 'keys' || this.dialogData.goods_type == 'pretty_card') && this.dialogData.exchange_times != '1') ||
        this.dialogData.max_times == 1
      )
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
        this.exchangeGiftsPopupData.my_goods = this.pageData.my_goods
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
        this.exchangeGiftsPopupData.my_goods = this.pageData.my_goods
        this.pageData.task_list[key].has_right = res.data.has_right
      }
    }, 1000),
    // 兑换好礼兑换按钮点击事件(flag标识是否可兑换，type标识点击的是哪个道具)
    onExchangeClick(param) {
      if (param.has_right != 1) return
      if (!this.isEnough(param)) return
      this.exchangeGiftsPopupData.type = param.type
      this.showExchangeGiftsPopup = true
    },
    // 判断道具是否足够
    isEnough({ goods_type, exchange_times, price }) {
      let res = true
      let actualPrice = price
      if (goods_type === 'keys' && exchange_times == 1) actualPrice = price / 2
      if (this.pageData.my_goods < actualPrice) res = false
      if (!res) this.$toast(`${this.pointName}不足`)
      return res
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 奖励兑换 上方box
  .PointReward_TaskListContent {
    padding-top: 58px;
    height: 1038px;
    ::v-deep .ThemeBox_BottomText {
      white-space: nowrap;
      width: 605px;
      margin-left: 75px;
    }
    ::v-deep .main {
      height: 863px;
    }
  }
  // 奖励兑换 下方box
  .PointReward_BottomBox {
    height: 1380px;
    padding-top: 100px;
    margin-top: 62px;
    margin-bottom: 180px;
    // 顶部道具数量
    .PointReward_BottomBox_Present {
      min-width: 320px;
      width: fit-content;
      height: 48px;
      margin: 0 auto 30px;
      font-size: 28px;
      border-radius: 24px;
      padding: 0 20px;
      > img {
        height: 40px;
      }
      .PointReward_BottomBox_present_nums {
        height: 100%;
      }
    }
    ::v-deep .ThemeBox_BottomText {
      margin-left: 75px;
      width: 614px;
    }
  }
}
</style>
