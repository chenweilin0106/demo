<template>
  <PopupBox title="mk6_title_14.png" @clickClose="clickClose">
    <div v-for="taskInfo in config" :key="taskInfo.id" class="task-item">
      <!-- 任务奖励 -->
      <div class="icon-content">
        <div class="icon flex align-center justify-center"><img :src="IconPath('cs_120_120.png')" /></div>
        <div class="text">次数+{{taskInfo.add_num}}</div>
      </div>
      <div class="text-content flex-column justify-between">
        <p class="">
          {{taskInfo.text}}
          <template v-if="taskInfo.id!=1">（{{taskInfo.num}}/{{taskInfo.need_num}}）</template>
        </p>
        <p v-if="taskInfo.id==1" class="tip">{{taskInfo.desc}}</p>
        <p>限定完成次数（{{ taskInfo.task_num }}/{{taskInfo.limit}}）</p>
      </div>
      <!-- 按钮 -->
      <PublicButton class="task-button flex-shrink-0 position-absolute position-column-center" :hasRight="taskInfo.id==1?taskInfo.task_num>=taskInfo.limit?2:0:5" @click="$emit('handleToVip')">{{taskInfo.id==1?taskInfo.task_num>=taskInfo.limit?'已完成':'去完成':'自动发放'}}</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: ['config'],
  data() {
    return {}
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.task-item {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto 15px; /*todo 下间距*/
  width: 596px; /*todo 卡片宽度 不需要加上外圈描边宽度*/
  height: 144px; /*todo 卡片高度 不需要加上外圈描边宽度*/
  background: url('@/pages/yearCelebration/assets/mk1_3.png') no-repeat left top/100% 100%;
  .icon-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 108px;
    height: 108px;
    padding: 4px;
    margin: 0 20px 0 30px; /*todo 道具左边距*/
    border-radius: 16px;
    background-color: #E9CE93; /*todo 任务列表中道具边框颜色*/
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
      background-color: #397DC3; /*todo 背景色*/
      color: #fff; /*todo 字体颜色*/
    }
  }
  .text-content {
    padding: 27px 0;
    height: 100%;
    p {
      font-size: 28px;
      color: #fff;
    }
    .tip {
      font-size: 20px;
      color: #A6FFFA;
    }
    p:last-child {
      font-size: 22px;
      color: #ffef85; /*todo 任务列表中任务完成情况字体颜色*/
    }
  }
  // 右侧按钮
  .task-button {
    right: 33px;
    width: 126px;
    height: 62px;
    &.button-noNeedReceive {
      pointer-events: none;
    }
    &.button-finish{
      pointer-events: none;
    }
  }
}
</style>
