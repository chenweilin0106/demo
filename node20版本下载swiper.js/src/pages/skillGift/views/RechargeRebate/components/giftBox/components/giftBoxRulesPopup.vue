<template>
  <PublicPopup title="title_6.png" @close="clickClose">
    <div class="RuleText">
      <div v-for="(item, index) in textList" :key="index" class="row position-relative line-height-100">
        <span v-if="item.circle" class="circle position-absolute radius-50 position-column-center"></span>
        <p v-html="item.text" class="flex align-center flex-no-wrap text-nowrap"></p>
      </div>
    </div>
    <img :src="IconPath('tk_11.png')" class="table-1 block margin-row-center" />
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/skillGift/components/publicPopup.vue'
export default {
  components: { PublicPopup },
  data() {
    return {
      textList: Object.freeze([
        { text: '活动期间每充值10元可获得1次开启次数，', circle: true },
        { text: '每次随机获得奖励。', circle: false },
        { text: '购买礼包、会员（含超值兑换中兑换会员）、', circle: true },
        { text: '活力卡不计算在内', circle: false }
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
  width: 642px;
  height: 851px;
  padding-top: 56px;
}
.RuleText {
  margin-left: 62px;
  width: 542px;
  .row {
    font-size: 28px;
    color: #fff;
    line-height: 50px;
    .circle {
      left: -25px;
      width: 12px;
      height: 12px;
      background: #ffec95;
    }
    ::v-deep img {
      flex-shrink: 0;
      width: 43px;
      height: 42px;
    }
  }
}
.table-1 {
  margin-top: 15px;
  width: 551px;
  height: 534px;
}
</style>
