<template>
  <div class="daily-task">
    <div class="TaskListItem_Main">
      <!-- 任务奖励 -->
      <div class="TaskListItem_IconBox">
        <div class="TaskListItem_TopIcon flex-center">
          <img :src="IconPath('fk_63_63.png')" alt="" />
        </div>
        <div class="TaskListItem_BottomText flex-center">
          福卡+{{ taskItem.award_num }}
        </div>
      </div>
      <div class="TaskListItem_TextBox">
        <p>{{ taskItem.text }}</p>
        <p>
          <span>（{{ taskItem.num }}/{{ taskItem.need_num }}）</span>
        </p>
      </div>
      <div class="back-bgi"></div>
    </div>
    <!-- 按钮 -->
    <div
      class="TaskListItem_Button button-noFinish"
      :class="ButtonStyle('1', taskItem.has_right)"
      @click="onTaskItemClick(taskItem)"
    >
      {{ GoodsTaskButtonText(taskItem) }}
    </div>
  </div>
</template>

<script>
// 跳转充值界面APP方法
import { recharge } from '@/pages/springFestival/utils/toApp'

export default {
  name: 'daily-task',
  props: ['taskItem'],
  data() {
    return {
      buttonTextObj: Object.freeze({
        2: '去完成',
        3: '去充值'
      })
    }
  },
  computed: {
    // 任务列表按钮文本
    GoodsTaskButtonText() {
      return ({ has_right, id }) => {
        if (has_right == 0) {
          return this.buttonTextObj[id] ? this.buttonTextObj[id] : '未完成'
        } else {
          return this.ButtonText('1', has_right)
        }
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
    onTaskItemClick({ has_right, id }) {
      if (has_right == 1) {
        this.$emit('onTaskItemClick', id)
      } else if (has_right == 0) {
        if (id == 3) {
          this.handleRecharge()
        } else if (id == 2) {
          this.$router.replace('/newYearCall')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.daily-task {
  position: relative;
  width: 668px;
  height: 145px;
  display: flex;
  margin: 0 auto 11px;
  border-radius: 24px;
  background-color: #ffe6a3;
  padding: 4px;

  .TaskListItem_Main {
    display: flex;
    width: 100%;
    height: 100%;
    padding-left: 28px;
    background: linear-gradient(90deg, #e55d3e, #f5b93a);
    border-radius: 20px;
    align-items: center;

    .TaskListItem_IconBox {
      display: flex;
      flex-direction: column;
      width: 108px;
      height: 108px;
      //margin-top: 15px;
      margin-right: 15px;
      border-radius: 16px;
      background-color: #ffbb5b;
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
          width: 63px;
          height: 63px;
        }
      }

      .TaskListItem_BottomText {
        flex: 1;
        border-radius: 0px 0px 12px 12px;
        font-size: 24px;
        white-space: nowrap;
        font-weight: 500;
        width: 100%;
        color: #fff;
        background-color: #c7341b;
      }
    }

    .TaskListItem_TextBox {
      height: 100%;
      white-space: nowrap;
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
        margin-top: 8px;
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
      background: url('@/pages/springFestival/assets/mk1_3.png') no-repeat left
        top/100% 100%;
    }
  }

  // 右侧按钮
  // 去完成
  .TaskListItem_Button {
    position: absolute;
    z-index: 2;
    right: 15px;
    bottom: 10px;
    width: 124px;
    height: 64px;
    border-radius: 32px;
  }
}
</style>
