<template>
  <PublicCard class="task-item">
    <!-- 任务奖励 -->
    <div class="icon-content flex-column align-center justify-center">
      <div class="icon flex align-center justify-center">
        <img :src="IconPath(pointIcon)" />
      </div>
      <div class="text">{{ pointName }}+{{ taskItem.award_nums }}</div>
    </div>
    <div class="text-content" v-if="!isTwoPresent">
      <p>{{ taskItem.task_name }}</p>
      <p>
        <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'">系统自动派发，无需手动领取</span>
        <span v-else>（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span>
      </p>
    </div>
    <!-- 按钮 -->
    <PublicButton v-if="taskItem.need_rev" :hasRight="taskItem.has_right" class="task-button" @click="onTaskItemClick(taskItem.has_right, taskItemKey, taskItem.is_recharge)">
      {{ GoodsTaskButtonText(taskItem.has_right, taskItem.is_recharge) }}
    </PublicButton>
  </PublicCard>
</template>

<script>
import PublicButton from '@/pages/mayDay2024/components/publicButton.vue'
import PublicCard from '@/pages/mayDay2024/components/publicCard.vue'
import buttonMixin from '@/pages/mayDay2024/mixins/buttonMixin'
// 跳转充值界面APP方法
import { recharge } from '../../../utils/toApp'

export default {
  name: 'task-list-item',
  props: ['pointIcon', 'pointName', 'isTwoPresent', 'taskItem', 'taskItemKey'],
  mixins: [buttonMixin],
  components: { PublicCard, PublicButton },
  computed: {
    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return (has_right, is_recharge) => {
        return (has_right == 0 && is_recharge && '去完成') || this.ButtonText('1', has_right)
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
  align-items: center;
  margin: 0 auto 15px;
  width: 664px;
  height: 150px;

  .icon-content {
    width: 104px;
    height: 104px;
    background-color: #f0c8ff;
    padding: 2px;
    margin: 0 26px;
    border-radius: 14px;

    .icon {
      width: 100%;
      height: 68px;
      background: #fff;
      border-radius: 12px 12px 0 0;

      > img {
        width: 54px;
      }
    }

    .text {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #cb6d95;
      border-radius: 0 0 12px 12px;
      font-size: 24px;
      color: #ffffff;
      white-space: nowrap;
      line-height: 100%;
    }
  }

  .text-content {
    height: 100%;
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
      color: #ffef85;
    }

    .recharge_10 {
      margin-left: 12px;
    }
  }

  // 右侧按钮
  // 去完成
  .task-button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 116px;
    height: 56px;
    font-size: 28px;
  }
}
</style>
