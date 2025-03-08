<template>
  <OutBox class="tasksList">
    <div v-for="(taskItem, key) in task_list" :key="key" class="task-item">
      <!-- 任务奖励 -->
      <div class="icon-content">
        <div class="icon flex align-center justify-center"><img :src="IconPath(pointIcon)" /></div>
        <div class="text">{{ pointName }}+{{ taskItem.award_nums }}</div>
      </div>
      <div class="text-content flex-column justify-center flex-1 flex-shrink-0">
        <p>
          {{ taskItem.task_name }}
          <van-popover
            v-if="key == 'keju'"
            v-model="showPopover"
            theme="dark"
            trigger="click"
            placement="top"
            :offset="[0, 8]"
          >
            <div class="popoverMain">参与科举答题或竞猜<br>所得元宝都计算在内</div>
            <template #reference>
              <img :src="IconPath('mk9_10.png')" class="bubble" />
            </template>
          </van-popover>

        </p>
        <p>
          <span class="recharge_10" v-if="taskItem.task_name == '每充值10元'">系统自动派发，无需手动领取</span>
          <span v-else>（{{ taskItem.finish_times }}/{{ taskItem.max_times }}）</span>
        </p>
      </div>
      <!-- 按钮 -->
      <PublicButton v-if="taskItem.need_rev" class="task-button flex-shrink-0" :hasRight="taskItem.has_right" :textType="taskItem.has_right == 0 && taskItem.is_recharge ? 2 : 1" @click="$emit('clickTaskBtn', taskItem, key)" />
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
  props: ['task_list', 'pointIcon', 'pointName'],
  data() {
    return {
      showPopover: false
    }
  }
}
</script>

<style lang="scss">
.van-popover {
  .van-popover__content {
    background-color: rgba(36, 23, 6, 0.7);
  }
  .van-popover__arrow {
    color: rgba(36, 23, 6, 0.7);
  }
}
</style>
<style lang="scss" scoped>
.popoverMain {
  font-size: 20px;
  color: #FFFFFF;
  line-height: 29px;
  padding: 10px;
}

.tasksList {
  .task-item {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 0 19px 43px; /*todo 下间距*/
    width: 665px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
    height: 142px; /*todo 卡片高度 不需要加上外圈描边宽度*/
    // ------
    background: url('@/pages/celebration/assets/mk1_3.png') no-repeat left top/100% 100%;
    // ------
    //border-radius: 20px; /*todo 卡片圆角*/
    //background: linear-gradient(90deg, #EE7A27, #FFCC52);
    //border: 3px solid #FFA245;
    .icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 108px;
      height: 108px;
      padding: 4px;
      margin: 0 26px 0 30px; /*todo 道具左边距*/
      border-radius: 16px;
      background-color: #DBC1FF; /*todo 任务列表中道具边框颜色*/
      .icon {
        width: 100%;
        height: 68px;
        border-radius: 12px 12px 0 0;
        background-color: #FFFFFF; /*todo 任务列表中道具图标背景颜色*/
        // 图片大小
        > img {
          width: 68px; /*todo 道具宽度*/
          height: auto;
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
        background-color: #7954E4; /*todo 背景色*/
        color: #fff; /*todo 字体颜色*/
      }
    }
    .text-content {
      height: 100%;
      p {
        font-size: 30px;
        line-height: 33px;
        span {
          font-size: 24px;
          line-height: 100%;
        }
        .bubble {
          margin-top: -2px;
          width: 32px;
        }
      }
      p:nth-child(1) {
        //margin-top: 26px;
        white-space: wrap;
        color: #fff; /*todo 任务列表中任务内容字体颜色*/
      }
      p:nth-child(2) {
        color: #ffef85; /*todo 任务列表中任务完成情况字体颜色*/
        margin-top: 10px;
        margin-left: -0.5em;
      }
      .recharge_10 {
        margin-left: 12px;
      }
    }
    // 右侧按钮
    .task-button {
      margin-left: 10px;
      margin-right: 30px;
      width: 120px;
      height: 60px;

    }
  }
  //.rules-text {
  //  img {
  //    width: 44px; /*todo 道具宽度*/
  //    height: 39px; /*todo 道具高度*/
  //  }
  //}
}
</style>
