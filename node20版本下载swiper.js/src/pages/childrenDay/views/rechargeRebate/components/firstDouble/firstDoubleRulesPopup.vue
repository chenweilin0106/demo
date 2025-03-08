<template>
  <PopupBox title="title_11.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每日充值任意金额可领取超值礼包，</li>
        <li>内含随机倍数的绿晶石奖励、藏宝图+1及随</li>
        <li>机稀有奖励，最高可得1000绿晶石。</li>
        <li><span></span>奖励如下</li>
      </ul>
    </div>
    <img :src="IconPath('tk_1.png')" class="table-1 block margin-row-center" />
    <img :src="IconPath('tk_2.png')" class="table-2 block margin-row-center" />
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/childrenDay/components/popupBox.vue'
export default {
  components: { PopupBox },
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
  //width: 620px;
  //height: 820px;
  //padding-top: 15px;
}
.scrollContainer {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
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
  //height: 467px;
}
.table-2 {
  margin-top: 22px;
  width: 551px;
  //height: 403px;
}
</style>
