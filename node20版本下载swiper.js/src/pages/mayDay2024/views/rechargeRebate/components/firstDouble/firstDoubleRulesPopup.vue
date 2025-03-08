<template>
  <PublicPopup title="title_9.png" @close="clickClose">
    <div class="scrollContainer w-100">
      <div class="RuleText">
        <div v-for="(item, index) in textList" :key="index" class="row position-relative line-height-100">
          <span v-if="item.circle" class="circle position-absolute radius-50 position-column-center"></span>
          <p v-html="item.text" class="flex align-center flex-no-wrap text-nowrap"></p>
        </div>
      </div>
      <img :src="IconPath('tk_1.png')" class="table-1 block margin-row-center" />
      <img :src="IconPath('tk_2.png')" class="table-2 block margin-row-center" />
    </div>
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/mayDay2024/components/publicPopup.vue'
export default {
  components: { PublicPopup },
  data() {
    return {
      textList: Object.freeze([
        { text: '活动期间每日充值任意金额可领取超值礼包，', circle: true },
        { text: '内含随机倍数的绿晶石奖励、藏宝图+1及随', circle: false },
        { text: '机稀有奖励，最高可得1000绿晶石。', circle: false },
        { text: '奖励如下：', circle: true }
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
  height: 820px;
  padding-top: 15px;
}
.scrollContainer {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 790px;
  padding: 52px 0 30px;
  border-radius: 24px;
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
  //margin-top: 20px;
  width: 551px;
  height: 467px;
}
.table-2 {
  margin-top: 22px;
  width: 551px;
  height: 403px;
}
</style>
