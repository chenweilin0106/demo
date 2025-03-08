<template>
  <div class="compo">
    <PopupBox :title="'title_19.png'" :size="'big'" @clickClose="clickClose">
      <div class="rules-text-popup">
        <ul>
          <li><span></span>小时榜在每天19:00-23:00开启，统计本小时内</li>
          <li>送出钻石礼物价值最高的玩家</li>
          <li><span></span>榜单在20、21、22、23点结算上个时段的小时</li>
          <li>榜，结算后榜一玩家将登上财神宝座，自动获得</li>
          <li>【海洋之心】头饰+1小时、20万元宝、藏宝图+1</li>
          <li><span></span>其他玩家可通过【沾财气】获得一次财气奖励，</li>
          <li>仅限前800名</li>
          <li><span></span>有机会开出奖励如下：</li>
        </ul>
      </div>
      <div class="img1"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>排行榜非实时更新，可能会有延迟，敬请谅解</li>
        </ul>
      </div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: [],
  components: {},
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .img1{
    width: 555px;
    height: 501px;
    background: url('@/pages/summerParty2024/assets/tk_16.png') no-repeat left top/100% 100%;
    margin: 0 auto;
  }
}
</style>
