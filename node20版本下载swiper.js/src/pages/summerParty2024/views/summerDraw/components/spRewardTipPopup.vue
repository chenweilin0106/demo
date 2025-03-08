<template>
  <div class="compo">
    <PopupBox :title="'title_18.png'" :size="'big'" @clickClose="clickClose">
      <div class="tip1">本套系所有称号皆可在本次活动获得，<br/>收集还能获得额外奖励~</div>
      <div class="img1"></div>
      <div class="tip2">可在【我的称号】-【套系】查看</div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'spRewardTipPopup',
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
  .tip1{
    text-align: center;
    font-weight: 400;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 40px;
  }
  .img1{
    width: 460px;
    height: 301px;
    background: url('@/pages/summerParty2024/assets/tk_40.png') no-repeat left top/100% 100%;
    margin: 0 auto 10px auto;
  }
  .tip2{
    text-align: center;
    font-weight: 400;
    font-size: 28px;
    color: #FFFFFF;
  }
}
</style>
