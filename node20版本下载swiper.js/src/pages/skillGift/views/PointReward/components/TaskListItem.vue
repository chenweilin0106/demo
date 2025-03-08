<template>
  <div class="task-item">
    <!-- 任务奖励 -->
    <div class="icon-content">
      <div class="icon">
        <img :src="IconPath(pointIcon)" />
      </div>
      <div class="text">{{ pointName }}+{{ taskItem.award_nums }}</div>
    </div>
    <div class="text-content" v-if="!isTwoPresent">
      <p>{{ taskItem.task_name }}</p>
      <p class="speical_color">
        <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'"
          >系统自动派发，无需手动领取</span
        >
        <span v-else
          >（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span
        >
      </p>
    </div>
    <!-- 按钮 -->
    <div
      v-if="taskItem.need_rev"
      :class="['task-button', ButtonStyle('1', taskItem.has_right)]"
      @click="
        onTaskItemClick(taskItem.has_right, taskItemKey, taskItem.is_recharge)
      "
    >
      {{ GoodsTaskButtonText(taskItem.has_right, taskItem.is_recharge) }}
    </div>
  </div>
</template>

<script>
// 跳转充值界面APP方法
import { recharge } from '../../../utils/toApp'

export default {
  name: 'task-list-item',
  props: ['pointIcon', 'pointName', 'isTwoPresent', 'taskItem', 'taskItemKey'],
  computed: {
    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return (has_right, is_recharge) => {
        return (
          (has_right == 0 && is_recharge && '去完成') ||
          this.ButtonText('1', has_right)
        )
      }
    }
  },
  methods: {
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
    // 跳转APP充值界面
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    onTaskItemClick(has_right, mark, is_recharge) {
      if (has_right == 1) {
        this.$emit('onTaskItemClick', mark)
      } else if (has_right == 0 && is_recharge) {
        this.handleRecharge()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.task-item {
  position: relative;
  display: flex;
  margin: 0 auto 16px;
  width: 664px;
  height: 140px;
  background: url('@/pages/skillGift/assets/mk1_1.png') no-repeat left top/100%
    100%;

  .icon-content {
    margin-top: 14px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 108px;
    height: 108px;
    background: #ffffff;
    border: 4px solid #ae58fb;
    margin-left: 30px;
    margin-right: 26px;
    padding: 0 2px 2px;

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
      background: #4e3fdd;
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
    right: 8px;
    top: 23px;
    width: 167px;
    height: 94px;
  }
}
</style>
