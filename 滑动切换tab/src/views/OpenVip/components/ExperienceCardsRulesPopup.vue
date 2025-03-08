<template>
  <BasePopup title="tk_4.png" @close="clickClose">
    <RuleText :text-list="textList1" />
    <RuleText :text-list="textList2" />
    <RuleText :text-list="textList3" />
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/BasePopup.vue'
import RuleText from '@/components/RuleText.vue'

export default {
  components: { RuleText, BasePopup },
  data() {
    return {
      textList1: Object.freeze([
        { text: '<i class="deep">激活限制：</i>仅限未开通过正式会员的', circle: true },
        { text: '受邀用户参与。（是否满足参与条件', circle: false },
        { text: '由系统判定，符合的用户在活动页面', circle: false },
        { text: '可查看）', circle: false }
      ]),
      textList2: Object.freeze([
        { text: '<i class="deep">体验卡权益：</i>体验卡享受每日福利、', circle: true },
        { text: '专属头饰、在线隐身、匿名访问、节', circle: false },
        { text: '日礼包、会员店等部分会员权益，而', circle: false },
        { text: '正式会员则拥有更多专属权益，如钻', circle: false },
        { text: '石立返、道具拿不停等', circle: false }
      ]),
      textList3: Object.freeze([
        { text: '<i class="deep">注意事项：</i>激活体验卡后玩家可续费', circle: true },
        { text: '同等级及更高等级会员，开通低等级', circle: false },
        { text: '会员需等待体验卡时间结束后进行开', circle: false },
        { text: '通；金豆仅有在会员权益生效后才会', circle: false },
        { text: '获得', circle: false }
      ])
    }
  },
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 560px;
  height: 796px;
}
.RuleText {
  margin-left: 78px;
  margin-top: 25px;
  ::v-deep .row {
    font-size: 26px;
  }
}
</style>
