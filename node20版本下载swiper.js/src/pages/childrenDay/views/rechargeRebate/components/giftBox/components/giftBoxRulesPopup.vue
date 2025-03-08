<template>
  <PopupBox title="title_12.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值10元可获得1次开启次数，每</li>
        <li>次随机获得奖励</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）</li>
        <li>活力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_3.png')" class="table-1 block margin-row-center" />
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
.table-1 {
  width: 551px;
}
</style>
