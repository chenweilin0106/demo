<template>
  <PopupBox title="title_11.png" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>活动期间每充值{{ rechargeNum }}元可获得1次开启机会，每次</li>
        <li>随机获得奖励。</li>
        <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活</li>
        <li>力卡不计算在内</li>
      </ul>
    </div>
    <img :src="IconPath('tk_13.png')" class="table-1 block" />
    <div class="rules-text-popup">
      <ul>
        <li><span></span>【为你打call】：有着神秘力量的超级道具礼物，</li>
        <li>可以点亮礼物墙哦~</li>
      </ul>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: ['rechargeNum'],
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
.rules-text-popup {
  margin-left: 84px;
}
.table-1 {
  margin-left: 43px; /*todo 边框两边步不均匀时手动居中*/
  margin-bottom: 12px;
  margin-top: 10px;
  width: 566px;
}
</style>
