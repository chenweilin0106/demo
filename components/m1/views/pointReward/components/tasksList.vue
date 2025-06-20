<template>
  <OutBox class="tasksList">
    <PublicCard v-for="(task,key) in config.task_list" :key="key" class="taskCard flex align-center position-relative">
      <div class="award position-relative justify-center flex-column align-center">
        <div class="icon flex align-center justify-center"><img :src="IconPath(config.pointIcon)" /></div>
        <div class="text flex-1 line-height-1 w-100 flex align-center justify-center">{{config.pointName}}+{{task.award_nums}}</div>
      </div>
      <div class="desc h-100 flex-column justify-center flex-1 flex-shrink-0">
        <p class="text-wrap line-height-1">
          {{task.task_name}}<van-popover v-if="key=='keju'" v-model="task.showPopover" trigger="click" placement="top" get-container=".tasksList">
            <div class="popoverMain">参与科举答题或竞猜<br>所得元宝都计算在内</div>
            <template #reference><img :src="IconPath('mk1_9.png')" class="bubble" /></template>
          </van-popover>
        </p>
        <p class="line-height-1">
          <span v-if="task.need_rev==0" class="recharge_10">系统自动派发，无需手动领取</span>
          <span v-else class="text-indent-left">（{{task.finish_times}}/{{task.max_times}}）</span>
        </p>
      </div>
      <PublicButton v-if="task.need_rev==1" :disabled="task.is_recharge?[2]:[0,2]" class="taskBtn flex-shrink-0" :hasRight="task.has_right" :textType="task.has_right==0&&task.is_recharge?2:1" @click="$emit('clickTaskBtn',task,key)">
        {{task.has_right==0?task.is_recharge?'去完成':'未完成':task.has_right==1?'领取':'已领取'}}
      </PublicButton>
    </PublicCard>
    <div class="rules-text">
      <ul>
        <li><span></span>活动期间完成以上每日任务可领取{{config.pointName}}<img :src="IconPath(config.pointIcon)" />，{{config.pointName}}</li>
        <li><img :src="IconPath(config.pointIcon)" />可在本活动中兑换超值好礼</li>
        <li><span></span>购买礼包、会员(含超值兑换中兑换会员)、活力卡</li>
        <li>不计入充值</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-popover {
  .van-popover__content {
    width: fit-content;
    height: fit-content;
    background: none;
    box-shadow: none;
    overflow: visible;
    .popoverMain {
      transform: translateY(15px);
      margin-left: -60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #FFFFFF;
      line-height: 29px;
      width: 203px;
      height: 92px;
      background: url('@/pages/valentineDay/assets/mk1_7.png') no-repeat left top/100% 100%;
      padding: 0 10px 8px;
    }
  }
  .van-popover__arrow {
    display: none;
  }
}
.tasksList {
  .taskCard {
    margin: 0 auto 12px; /*todo 下间距*/
    .award {
      width: 108px;
      height: 108px;
      padding: 4px;
      margin: 0 26px 0 41px; /*todo 道具左边距*/
      border-radius: 16px;
      background-color: #EFA5D2; /*todo 任务列表中道具边框颜色*/
      .icon {
        width: 100%;
        height: 68px;
        border-radius: 12px 12px 0 0;
        background-color: #FFFFFF; /*todo 任务列表中道具图标背景颜色*/
        // 图片大小
        > img {
          width: 67px; /*todo 道具宽度*/
          height: auto;
        }
      }
      .text {
        border-radius: 0 0 12px 12px;
        font-weight: 500;
        font-size: 24px;
        background-color: #C25E94; /*todo 背景色*/
        color: #fff; /*todo 字体颜色*/
      }
    }
    .desc {
      p {
        .bubble {
          margin-top: -4px;
          width: 32px;
        }
        &:nth-child(1) {
          font-size: 30px;
          color: #fff; /*todo 任务名称颜色*/
        }
        &:nth-child(2) {
          font-size: 24px;
          color: #ffef85; /*todo 数字颜色*/
          margin-top: 24px;
        }
      }
    }
    &:nth-child(2){
      .desc{
        p:nth-child(1){
          font-size: 28px;
          line-height: 33px;
        }
        p:nth-child(2){
          margin-top: 5px;
        }
      }
    }
    .taskBtn {
      margin-left: 55px;
      margin-right: 42px;
      width: 126px;
      height: 66px;

    }
  }
}
</style>
