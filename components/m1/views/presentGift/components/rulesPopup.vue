<template>
  <PopupBox title="mk1_title_11.png" size="3" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>根据系统已有CP状态自动绑定双方关系，若无CP</li>
        <li>则需要先结婚</li>
        <li><span></span>活动期间更换CP则进度清零重置，请谨慎更换</li>
        <li><span></span>活动期间每个奖励每人仅可领取1次，已领取的奖励</li>
        <li>不收回且不可重复获得</li>
      </ul>
    </div>
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

<style scoped lang="scss"></style>
