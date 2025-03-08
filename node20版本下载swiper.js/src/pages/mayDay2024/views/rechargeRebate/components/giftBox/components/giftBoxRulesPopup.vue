<template>
  <PublicPopup title="title_12.png" @close="clickClose">
    <div class="RuleText">
      <div v-for="(item, index) in textList" :key="index" class="row position-relative line-height-100">
        <span v-if="item.circle" class="circle position-absolute radius-50 position-column-center"></span>
        <p v-html="item.text" class="flex align-center flex-no-wrap text-nowrap"></p>
      </div>
    </div>
    <img :src="IconPath('tk_3.png')" class="table-1 block margin-row-center" />
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/mayDay2024/components/publicPopup.vue'
export default {
  components: { PublicPopup },
  data() {
    return {
      textList: Object.freeze([
        { text: '活动期间每充值30元可获得1次开启机会，', circle: true },
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
  width: 620px;
  height: 900px;
  padding-top: 72px;
}
.RuleText {
  margin-left: 55px;
  width: 527px;
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
  width: 551px;
  height: 600px;
}
</style>
