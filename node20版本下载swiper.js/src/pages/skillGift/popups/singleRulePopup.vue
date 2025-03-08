<template>
  <PublicPopup title="title_8.png" @close="clickClose">
    <div class="scrollContainer overflow-x-hidden overflow-y-scroll w-100 h-100">
      <div class="rule-text">
        <ul>
          <li><span></span>活动期间每日充值任意金额可领取超值礼包，</li>
          <li>内含随机倍数的绿晶石奖励、藏宝图+1及随</li>
          <li>机稀有奖励最高可得1000绿晶石。</li>
          <li><span></span>奖励如下：</li>
        </ul>
      </div>
      <img :src="IconPath('tk_15.png')" class="tableImg1 block margin-row-center" />
      <img :src="IconPath('tk_14.png')" class="tableImg2 block margin-row-center" />
    </div>
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/skillGift/components/publicPopup.vue'
export default {
  components: { PublicPopup },
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
::v-deep .popupContent {
  padding-top: 60px;
  width: 642px;
  height: 900px;
  padding-bottom: 50px;
}
.scrollContainer {
  .tableImg1 {
    margin-top: 10px;
    width: 551px;
    height: 467px;
  }

  .tableImg2 {
    margin-top: 20px;
    width: 551px;
    height: 403px;
  }

  .rule-text {
    width: 539px;
    margin-left: 55px;

    li {
      font-size: 28px;
    }
  }
}
</style>
