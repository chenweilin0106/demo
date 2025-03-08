<template>
  <PopupBox title="mk1_title_12.png" size="3" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>每轮结束时将在本轮时间进行钻石充值的订单随机</li>
        <li>选择7笔订单，向玩家额外赠送对应订单的钻石</li>
        <li><span></span>活动一共X轮，首轮360分钟，其他轮次每轮480</li>
        <li>分钟，活动奖励将会自动发放至获奖玩家的账户</li>
      </ul>
    </div>
  </PopupBox>
</template>

<script>
export default {
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
</style>
