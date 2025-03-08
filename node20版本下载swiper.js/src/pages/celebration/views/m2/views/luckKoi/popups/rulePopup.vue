<template>
  <PopupBox title="mk2_title_8.png" @clickClose="clickClose">
    <div class="tab margin-row-center flex" :class="mark == 2 && 'active'">
      <div class="left flex-1 h-100" @click="mark = 1"></div>
      <div class="right flex-1 h-100" @click="mark = 2"></div>
    </div>
    <div v-show="mark == 1" class="rules-text-popup">
      <ul>
        <li><span></span>【幸运小队】活动每天结束时进行一次锦鲤奖励抽</li>
        <li>奖，系统随机抽取幸运号码，<i>被抽中的小队成员均</i></li>
        <li><i>可获得奖励</i>。每天结束后，系统将重置组队状态，</li>
        <li>玩家需重新组队</li>
        <li class="empty"></li>
        <li><span></span>【获得幸运号码】玩家可选择创建或加入队伍，成</li>
        <li>员<i>通过完成任务获得“刮刮乐”</i>，刮刮乐分为立得奖</li>
        <li>励及幸运号码，抽奖时每只小队共享成员获得的幸</li>
        <li>运号码</li>
        <li>每支小队最多5人，最少2人。仅有1人时组队无效，</li>
        <li>不可获得“刮刮乐”</li>
      </ul>
    </div>
    <img v-show="mark == 2" :src="IconPath('tk_43.png')" class="awardTable margin-row-center block" />
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {
      mark: 1
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  height: 255px + 293 + 278 - 274;
}
.tab {
  width: 432px;
  height: 65px;
  background: url('@/pages/celebration/assets/tk_46.png') no-repeat left top/100% 100%;
  margin-bottom: 23px;
  &.active {
    background: url('@/pages/celebration/assets/tk_47.png') no-repeat left top/100% 100%;
  }
}
.rules-text-popup {
  li {
    line-height: 36px;
  }
  .empty {
    height: 36px;
  }
}
.awardTable {
  width: 554px;
}
</style>
