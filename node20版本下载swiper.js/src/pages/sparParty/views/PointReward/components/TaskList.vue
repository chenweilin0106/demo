<template>
  <OutBox class="taskList">
    <div v-for="(taskItem, key) in task_list" :key="key" class="taskItem">
      <div class="icon-content">
        <div class="icon">
          <img :src="IconPath(pointIcon)" />
        </div>
        <div class="text">{{ pointName }}+{{ taskItem.award_nums }}</div>
      </div>
      <div class="text-content" v-if="!isTwoPresent">
        <p>{{ taskItem.task_name }}</p>
        <p class="speical_color">
          <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'">系统自动派发，无需手动领取</span>
          <span v-else>（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span>
        </p>
      </div>
      <div v-if="taskItem.need_rev" :class="['task-button', ButtonStyle('1', taskItem.has_right)]" @click="onTaskClick({ ...taskItem, key })">
        {{ goodsTaskBtnTxt(taskItem.has_right, taskItem.is_recharge) }}
      </div>
    </div>
    <div class="rule-text">
      <ul>
        <li><span></span>活动期间完成以上每日任务可领取{{ pointName }}<img :src="IconPath(pointIcon)" />，{{ pointName }}</li>
        <li><img :src="IconPath(pointIcon)" />可在本活动中兑换超值好礼</li>
        <li><span></span>购买礼包、会员(含超值兑换中兑换会员)、活力卡</li>
        <li>不计入充值</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
import { recharge } from '@/pages/sparParty/utils/toApp'
export default {
  props: ['pointIcon', 'pointName', 'task_list', 'isTwoPresent'],
  methods: {
    // 任务列表按钮文本
    goodsTaskBtnTxt(has_right, is_recharge) {
      return (has_right == 0 && is_recharge && '去完成') || this.ButtonText('1', has_right)
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.$emit('update')
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    onTaskClick({ has_right, key, is_recharge }) {
      if (has_right == 1) {
        this.$emit('onTaskClick', key)
      } else if (has_right == 0 && is_recharge) {
        recharge(this.hiddenFn)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 任务列表
.taskList {
  margin-top: 37px !important;
  ::v-deep .right-side-icon {
    top: 327px;
  }
  .taskItem {
    position: relative;
    display: flex;
    margin: 0 auto 16px;
    width: 668px;
    height: 140px;
    background: url('@/pages/sparParty/assets/mk1_1.png') no-repeat left top/100% 100%;

    .icon-content {
      margin-top: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100px;
      height: 100px;
      background: linear-gradient(to bottom, #103469 70%, #1b4e8b 30%);
      margin-left: 30px;
      margin-right: 26px;
      box-shadow: inset 0 0 5px 3px #fff;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 68px;

        > img {
          width: 50px;
          height: 55px;
        }
      }

      .text {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex: 1;
        background: transparent;
        font-size: 24px;
        color: #ffffff;
        white-space: nowrap;
      }
    }

    .text-content {
      // 中间字体样式
      p {
        font-size: 30px;
        color: #ffffff;

        span {
          font-size: 24px;
        }
      }

      p:nth-child(1) {
        margin-top: 26px;
      }

      p:nth-child(2) {
        margin-top: 20px;
        margin-left: -12px;
        color: #fffaa6;
      }

      .recharge_10 {
        margin-left: 12px;
      }
    }

    // 右侧按钮
    // 去完成
    .task-button {
      position: absolute;
      right: 32px;
      top: 42px;
      width: 140px;
      height: 64px;
    }
  }
  .rule-text {
    margin-top: 12px;
    width: 605px;
    margin-left: 60px;
  }
}
</style>
