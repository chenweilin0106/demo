<template>
  <div class="ExchargeListItem">
    <div class="ExchargeListItem_Left">
      <!-- 道具图标 -->
      <div class="ExchargeItem_Icon flex-center">
        <img v-if="task.award.icon" :src="IconPath(task.award.icon)" />
      </div>
      <!-- 道具名称 -->
      <div class="ExchargeItem_Name flex-center">{{ task.award.text }}</div>
    </div>
    <!-- 道具描述 -->
    <div class="ExchargeListItem_Center">
      <p>{{ task.name }}</p>
      <p>
        <span class="focus-color">（{{ task.finish }}/{{ task.max }}）</span>
      </p>
    </div>
    <!-- 兑换按钮 -->
    <div
      class="ExchargeListItem_Button"
      :class="ButtonStyle('1', task.has_right)"
      @click="$emit('handleDailyTask', task)"
    >
      {{ ButtonText('1', task.has_right) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchargeListItem',
  props: ['task']
}
</script>

<style scoped lang="scss">
.ExchargeListItem {
  position: relative;
  display: flex;
  width: 668px;
  height: 168px;
  margin: 0 auto 16px;
  overflow: hidden;
  padding: 4px;
  border-radius: 16px;
  background-color: #ffe6a3;
  // 图片样式
  .ExchargeListItem_Left {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    justify-content: center;
    border-radius: 12px 0 0 12px;

    .ExchargeItem_Icon {
      position: relative;
      width: 100%;
      height: 124px;
      background: linear-gradient(180deg, #ffe28a, #fffae1);
      border-radius: 12px 0px 0px 0px;

      // 图片icon
      img {
        height: 100%;
      }
    }

    // 图片下方字体样式
    .ExchargeItem_Name {
      flex: 1;
      font-size: 24px;
      font-weight: 700;
      width: 100%;
      color: #fff;
      background-color: #c7341b;
      border-radius: 0 0 0 12px;
    }
  }

  // 中间字体样式
  .ExchargeListItem_Center {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    border-radius: 0 12px 12px 0;
    background: linear-gradient(90deg, #e9743d, #f5b93a);
    white-space: nowrap;

    p {
      color: #ffffff;

      .focus-color {
        color: #fffaa6 !important;
      }

      &:nth-child(1) {
        margin-top: 29px;
        font-size: 28px;
        font-weight: 700;
      }

      &:nth-child(2) {
        margin-left: -15px;
        margin-top: 16px;
        font-size: 28px;
      }
    }
  }

  .ExchargeListItem_Button {
    position: absolute;
    bottom: 18px;
    right: 22px;
    width: 124px;
    height: 52px;
    border-radius: 26px;
    font-size: 28px;
  }
}
</style>
