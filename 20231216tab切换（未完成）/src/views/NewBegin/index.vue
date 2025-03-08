<template>
  <div class="PointReward">
    <!--见面礼-->
    <meeting-gift />
    <!--任务列表-->
    <out-box class="task-list" :rightSide="true">
      <div class="daily-task-title"></div>
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
          <li>
            <span></span>活动期间完成以上每日任务可领取{{ pointName
            }}<img :src="IconPath(pointIcon)" />，{{ pointName }}
          </li>
          <li><img :src="IconPath(pointIcon)" />可在本活动中参与射箭拿好礼</li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
      <div class="limit-time-title"></div>
      <TaskListItem
        v-for="item in 2"
        :key="item"
        :taskItem="pageData.task_list.login"
        :taskItemKey="'login'"
        :pointName="pointName"
        :pointIcon="pointIcon"
        @onTaskItemClick="onTaskItemClick"
        @update="getPageData({ type: 'tab', mark: 'm1' })"
      />
    </out-box>
    <!--射箭拿好礼-->
    <archery-lottery />
    <!--恭喜获得弹框-->
    <congrats-get-prompt ref="congratsGet" :list="dialogData" />
  </div>
</template>

<script>
import CongratsGetPrompt from '@/components/congrats-get-prompt.vue'
// 默认数据
import { module1 } from '../../utils/pageData'
// 数据请求
import { getPageData } from '../../api/index'
// 见面礼
import MeetingGift from './components/meeting-gift.vue'
// 任务列表项组件
import TaskListItem from './components/TaskListItem'
import archeryLottery from './components/archery-lottery.vue'

export default {
  name: 'PointReward',
  components: {
    TaskListItem,
    MeetingGift,
    archeryLottery,
    CongratsGetPrompt
  },
  data() {
    return {
      // 道具图标
      pointIcon: 'gj_63_61.png',
      // 道具名称
      pointName: '弓箭',
      dialogData: []
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
    this.pageData = module1
    // 页面数据请求
    await this.getPageData({ type: 'tab', mark: 'm1' })
    // 保存用户头像
    this.$store.commit('getUserIcon', this.pageData.user_icon)
  },
  methods: {
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
    // 任务列表领取接口
    async clickTopButton(obj) {
      return await getPageData({
        ...obj,
        type: 'task_award_new'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.PointReward {
  // 任务列表
  .task-list {
    padding-top: 39px;
    height: 1641px;
    margin-bottom: 112px;
    .rule-text {
      margin-top: 12px;
      width: 604px;
      //height: 163px;
      margin-left: 56px;

      li:nth-of-type(2) {
        margin-top: 5px;
        margin-bottom: 5px;
      }
    }
    .daily-task-title {
      width: 664px;
      height: 39px;
      background: url('@/assets/mk1_7.png') no-repeat left top/100% 100%;
      margin: 0 auto 23px;
    }
    .limit-time-title {
      width: 664px;
      height: 39px;
      background: url('@/assets/mk1_8.png') no-repeat left top/100% 100%;
      margin: 15px auto 25px;
    }
  }
}
</style>
