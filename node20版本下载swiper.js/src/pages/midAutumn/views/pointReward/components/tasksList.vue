<template>
  <OutBox class="tasksList">
    <div v-for="(taskItem, key) in task_list" :key="key" class="task-item">
      <!-- 任务奖励 -->
      <div class="icon-content">
        <div class="icon flex align-center justify-center"><img :src="IconPath(pointIcon)" /></div>
        <div class="text">{{ pointName }}+{{ taskItem.award_nums }}</div>
      </div>
      <div class="text-content">
        <p>{{ taskItem.task_name }}</p>
        <p>
          <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'">系统自动派发，无需手动领取</span>
          <span v-else>（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span>
        </p>
      </div>
      <!-- 按钮 -->
      <PublicButton
        v-if="taskItem.need_rev"
        class="task-button"
        :hasRight="taskItem.has_right"
        :textType="taskItem.has_right == 0 && taskItem.is_recharge ? 2 : 1"
        @click="$emit('clickTaskBtn', taskItem, key)"
      />
    </div>
    <!-- 说明文字 -->
    <div class="rules-text">
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
export default {
  props: ['task_list', 'pointIcon', 'pointName']
}
</script>

<style lang="scss" scoped>
.tasksList {
  .task-item {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 auto 19px; /*todo 下间距*/
    width: 660px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
    height: 137px; /*todo 卡片高度 不需要加上外圈描边宽度*/
    border-radius: 20px; /*todo 卡片圆角*/
    //background: url('@/pages/midAutumn/assets/mk1_3.png') no-repeat left top/100% 100%;
    background: linear-gradient(90deg, #D65C32, #FFCD61);
    border: 3px solid #F59C42;
    .icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 108px;
      height: 108px;
      padding: 4px;
      margin: 0 26px 0 28px; /*todo 道具左边距*/
      border-radius: 16px;
      background-color: #FFC05C; /*todo 任务列表中道具边框颜色*/
      .icon {
        width: 100%;
        height: 68px;
        border-radius: 12px 12px 0 0;
        background-color: #FFFFFF; /*todo 任务列表中道具图标背景颜色*/
        // 图片大小
        > img {
          width: 72px; /*todo 道具宽度*/
          height: 61px; /*todo 道具高度*/
        }
      }
      .text {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 12px 12px;
        font-size: 24px;
        white-space: nowrap;
        line-height: 100%;
        background-color: #C94A32; /*todo 背景色*/
        color: #fff; /*todo 字体颜色*/
      }
    }
    .text-content {
      height: 100%;
      p {
        font-size: 30px;
        span {
          font-size: 24px;
        }
      }
      p:nth-child(1) {
        margin-top: 26px;
        color: #fff; /*todo 任务列表中任务内容字体颜色*/
      }
      p:nth-child(2) {
        color: #ffef85; /*todo 任务列表中任务完成情况字体颜色*/
        margin-top: 20px;
        margin-left: -12px;
      }
      .recharge_10 {
        margin-left: 12px;
      }
    }
    // 右侧按钮
    .task-button {
      position: absolute;
      right: 32px;
      top: 50%;
      transform: translateY(-50%);
      width: 120px;
      height: 60px;
    }
  }
  .rules-text {
    img {
      width: 50px; /*todo 道具宽度*/
      height: 40px; /*todo 道具高度*/
    }
  }
}
</style>
