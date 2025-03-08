<template>
  <div class="RuleDialog">
    <div class="scroll_box">
      <p>
        <span></span>玩家可通过完成任务获取糖果，每日任务<i
          style="color: #fff190"
          >每天0点</i
        >重置
      </p>
      <p><span></span>消耗指定数量的糖果可兑换对应奖励，且奖励按顺序依次解锁</p>
      <p>
        <span></span>兑换完10个奖励后，可参与循环兑换神奇宝箱，每消耗<i
          style="color: #fff190"
          >10糖果</i
        >可兑换1次神奇宝箱
      </p>
      <p><span></span>神奇宝箱内含以下奖励及概率：</p>
      <div class="rule_icon_1"></div>
      <p>
        <span></span
        >宝箱内的神奇南瓜只可获取3个，之后将不再产出，同时宝箱概率调整如下：
      </p>
      <div class="rule_icon_2"></div>
    </div>
    <div class="i_known_btn rule_btn" @click="$emit('close')">我知道了</div>
  </div>
</template>

<script>
export default {
  name: 'RuleDialog',
  components: {},
  props: ['dialogMark'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.RuleDialog {
  padding: 59px 14px 0 22px;

  .scroll_box {
    width: 100%;
    height: 795px;
    overflow-x: hidden !important;
    overflow-y: scroll !important;

    p {
      position: relative;
      padding-left: 28px;
      font-size: 26px;
      color: #ccb2ff;
      line-height: 38px;

      > span {
        position: absolute;
        left: 0;
        top: 11px;
        width: 12px;
        height: 12px;
        background: #ffe9b9;
        border-radius: 50%;
      }
    }

    .rule_icon_1,
    .rule_icon_2 {
      margin: 13px auto;
      width: 501px;
      background: url('../assets/tk_11.png') no-repeat left top/100% 100%;
    }

    .rule_icon_1 {
      height: 374px;
      background: url('../assets/tk_11.png') no-repeat left top/100% 100%;
    }

    .rule_icon_2 {
      height: 309px;
      background: url('../assets/tk_12.png') no-repeat left top/100% 100%;
    }
  }

  .rule_btn {
    margin: 19px auto 0;
  }
}
</style>
