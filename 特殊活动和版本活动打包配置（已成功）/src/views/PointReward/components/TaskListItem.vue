<template>
  <div class="TaskListItem bgc_horizontal">
    <div class="TaskListItem_Main">
      <!-- 两个奖励 -->
      <div v-if="isTwoPresent" class="TaskListItem_TextBox flex_across">
        {{ taskItemStatic.task_name }}
        <span class="speical_color" v-if="!taskItemStatic.need_rev">系统自动派发，无需手动领取</span>
        <span class="speical_color flex_across" v-else>（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span>
      </div>
      <!-- 任务奖励 -->
      <div class=" theme_item TaskListItem_IconBox">
        <div class=" TaskListItem_TopIcon img-top">
          <img :src="IconPath(pointIcon)" alt="" />
        </div>
        <div class="img-bottom TaskListItem_BottomText">
          {{ pointName }}+{{ taskItemStatic.award_nums }}
        </div>
      </div>
      <!-- 闯关币 -->
      <div class="TaskListItem_IconBox theme_item" v-if="isTwoPresent">
        <div class="img-top TaskListItem_TopIcon">
          <!-- <img src="../../../assets/cgb_60_60.png" alt="" /> -->
        </div>
        <div class="img-bottom TaskListItem_BottomText">
          <span class="flex_across">闯关币+{{ taskItem.piece }}</span>
        </div>
      </div>
      <!-- 单个奖励 -->
      <div v-else class="TaskListItem_TextBox" :class="taskItemStatic.blueTips ? 'isfive' : ''">
        <p>{{ taskItemStatic.task_name }}</p>
        <p class="special" v-if="taskItemStatic.blueTips">仅限赠送他人和用钻石赠送</p>
        <p class="speical_color">
          <span class="recharge_10" v-if="!taskItemStatic.need_rev">系统自动派发，无需手动领取</span>
          <span v-else :class="taskItemStatic.islimit ? 'recharge_10' : ''">{{ taskItemStatic.islimit ?
            '活动期间限1次' : '' }}（{{ taskItem.finish_times }}/{{
    taskItem.max_times }}）</span>
        </p>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="TaskListItem_Button theme_botton_undid" @click="
      onTaskItemClick(taskItem.has_right, taskItem.task_id, taskItemStatic.is_recharge, taskItemStatic.award_nums)
      " v-if="taskItemStatic.need_rev" :class="ButtonStyle('GoodsTask', taskItem.has_right)">
      {{ GoodsTaskButtonText(taskItem.has_right, taskItemStatic.is_recharge) }}
    </div>
    <!-- 每日重置 -->
    <div class="daytips" v-if="taskItemStatic.reset">
    </div>
  </div>
</template>

<script>
// 跳转充值界面APP方法
import { recharge } from '../../../utils/toApp'
export default {
  name: 'TaskListItem',
  props: ['pointIcon', 'pointName', 'isTwoPresent', 'taskItem', 'taskItemStatic'],
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
  methods: {
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getPageData({ type: 'init' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    // 跳转APP充值界面
    handleRecharge() {
      recharge(this.hiddenFn)
    },
    onTaskItemClick(has_right, mark, is_recharge, award_nums) {
      if (has_right == 1) {
        this.$emit('onTaskItemClick', mark, award_nums)
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
  width: 330px;
  // 两个奖励
  // height: 100px;
  // 单个奖励
  height: 69px;
  display: flex;
  margin-bottom: 11px;
  // 两个奖励
  // padding: 39px 0 6px;
  // 单个奖励
  padding: 5px 0;
  border-radius: 25px 0px 25px 0px;
  border: 3px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(90deg, #8EA3FD, #E5A6FD);
  background-size: 330px 100%;
  background-position: -3px 0;

  .TaskListItem_Main {
    display: flex;
    padding-left: 8px;
    width: 100%;

    // 两个奖励
    // .TaskListItem_IconBox {
    //   width: 55px;
    //   height: 55px;
    //   margin-right: 13px;
    //   border-radius: 6px;
    //   padding: 1px;
    //   // 奖励项图片样式
    //   .TaskListItem_TopIcon {
    //     position: relative;
    //     width: 100%;
    //     height: 34px;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     img {
    //       height: 100%;
    //     }
    //   }
    //   .TaskListItem_BottomText {
    //     position: relative;
    //     border-radius: 0px 0px 4px 4px;
    //     > span {
    //       position: absolute;
    //       top: 1px;
    //       width: 70px;
    //       transform: scale(0.7);
    //     }
    //   }
    // }
    // 单个奖励
    .TaskListItem_IconBox {
      width: 60px;
      height: 50px;
      background: #FFFFFF;
      border: 2px solid #D6BEFF;
      border-radius: 6px;
      margin-right: 13px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: content-box;

      // 奖励项图片样式
      .TaskListItem_TopIcon {
        position: relative;
        width: 100%;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;

        img {
          // width: 25px;
          height: 90%;
        }
      }

      .TaskListItem_BottomText {
        border-radius: 0px 0px 4px 4px;
        white-space: nowrap;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        height: 16px;
        line-height: 16px;
        width: 100%;
      }
    }

    // 两个奖励
    // .TaskListItem_TextBox {
    //   position: absolute;
    //   top: 15px;
    //   left: 13px;
    //   font-size: 15px;
    //   color: #ffffff;
    //   // 中间字体样式
    //   span {
    //     margin-left: 8px;
    //     font-size: 12px;
    //     height: 100%;
    //   }
    // }
    // 单个奖励
    .TaskListItem_TextBox {
      position: relative;

      // 中间字体样式
      p {
        font-size: 15px;
        color: #ffffff;

        span {
          font-size: 12px;
        }
      }

      p:nth-child(1) {
        margin-top: 8px;
      }

      p:nth-child(2) {
        margin-top: 4px;
        margin-left: -6px;
        white-space: nowrap;
      }

      .recharge_10 {
        margin-left: 6px;
      }
    }

    .isfive {
      p:nth-child(1) {
        margin-top: 4px;
      }

      p:nth-child(3) {
        margin-top: 13px;
        margin-left: -6px;
      }

      .special {
        position: absolute;
        top: 19px;
        width: 132px;
        height: 11px;
        font-size: 11px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7439CE;
        left: 6px;

      }
    }
  }

  // 右侧按钮
  // 去完成
  .TaskListItem_Button {
    position: absolute;
    right: 16px;
    // 两个奖励
    // top: 50px;
    // 单个奖励
    top: 18px;
    width: 62px;
    height: 32px;
    border-radius: 32px;
  }

  .daytips {
    width: 61px;
    height: 34px;
    background-image: url('../../../assets/mk1_1.png');
    background-size: 100% 100%;
    position: absolute;
    top: -3px;
    right: -3px;
  }
}
</style>
../../../src/pages/utils/toApp
