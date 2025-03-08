<template>
  <div class="TaskListItem">
    <div class="TaskListItem_Main">
      <!-- 任务奖励 -->
      <div class="TaskListItem_IconBox">
        <div class="TaskListItem_TopIcon flex-center">
          <img :src="IconPath(pointIcon)" alt="" />
        </div>
        <div class="TaskListItem_BottomText flex-center">
          {{ pointName }}+{{ taskItem.award_nums }}
        </div>
      </div>
      <div class="TaskListItem_TextBox" v-if="!isTwoPresent">
        <p>{{ taskItem.task_name }}</p>
        <p>
          <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'"
            >系统自动派发，无需手动领取</span
          >
          <span v-else
            >（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span
          >
        </p>
      </div>
      <div class="back-bgi"></div>
    </div>
    <!-- 按钮 -->
    <div
      class="TaskListItem_Button button-noFinish"
      @click="
        onTaskItemClick(taskItem.has_right, taskItemKey, taskItem.is_recharge)
      "
      v-if="taskItem.need_rev"
      :class="ButtonStyle('1', taskItem.has_right)"
    >
      {{ GoodsTaskButtonText(taskItem.has_right, taskItem.is_recharge) }}
    </div>
  </div>
</template>

<script>
// 跳转充值界面APP方法
import { recharge } from '../../../../../utils/toApp'

export default {
  name: 'TaskListItem',
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
        // this.getPageData({ type: 'init' })
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
.TaskListItem {
  position: relative;
  width: 668px;
  height: 145px;
  display: flex;
  margin-bottom: 11px;
  border-radius: 24px;
  background-color: #feddff;
  padding: 4px;

  .TaskListItem_Main {
    display: flex;
    width: 100%;
    height: 100%;
    padding-left: 28px;
    background: linear-gradient(90deg, #8b7cfc, #ffbdf8);
    border-radius: 20px;
    align-items: center;

    .TaskListItem_IconBox {
      display: flex;
      flex-direction: column;
      width: 108px;
      height: 108px;
      //margin-top: 15px;
      margin-right: 26px;
      border-radius: 16px;
      background-color: #d0bbff;
      padding: 4px;
      // 奖励项图片样式
      .TaskListItem_TopIcon {
        position: relative;
        width: 100%;
        height: 68px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px 12px 0 0;
        background-color: #fff;

        img {
          width: 68px;
          height: 51px;
        }
      }

      .TaskListItem_BottomText {
        flex: 1;
        border-radius: 0px 0px 12px 12px;
        font-size: 24px;
        white-space: nowrap;
        font-weight: 700;
        width: 100%;
        color: #fff;
        background-color: #7f54e5;
      }
    }

    .TaskListItem_TextBox {
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
        margin-top: 32px;
      }

      p:nth-child(2) {
        margin-top: 12px;
        margin-left: -12px;
        color: #fffaa6;
      }

      .recharge_10 {
        margin-left: 12px;
      }
    }

    .back-bgi {
      position: absolute;
      z-index: 1;
      bottom: 0;
      right: 0;
      width: 333px;
      height: 137px;
      //background: url('@/pages/valentineDay/assets/mk1_3.png') no-repeat left
      //  top/100% 100%;
    }
  }

  // 右侧按钮
  // 去完成
  .TaskListItem_Button {
    position: absolute;
    z-index: 2;
    right: 27px;
    // 单个奖励
    top: 50%;
    transform: translateY(-50%);
    width: 124px;
    height: 64px;
    border-radius: 32px;
  }
}
</style>
