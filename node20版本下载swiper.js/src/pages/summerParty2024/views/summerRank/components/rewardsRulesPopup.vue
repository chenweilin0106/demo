<template>
  <div class="compo">
    <PopupBox :title="'title_20.png'" :size="'big'" @clickClose="clickClose">
      <div class="title1">日榜奖励</div>
      <div class="img1"></div>
      <div class="title1">激活奖励</div>
      <div class="ts1">
        <PublicImg :imgName="'ts_xrwz.svga'" :imgType="'mic'"></PublicImg>
      </div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>连续5天上榜前3名可激活奖励：【夏日王者】头</li>
          <li>饰+15天</li>
        </ul>
      </div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'rewardsRulesPopup',
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
  .title1{
    background: #2C82DA;
    border-radius: 22px;
    padding: 5px 50px;
    width: fit-content;
    margin: 0 auto 20px auto;
  }
  .img1{
    width: 554px;
    height: 476px;
    background: url('@/pages/summerParty2024/assets/tk_17.png') no-repeat left top/100% 100%;
    margin: 0 auto 20px auto;
  }
  .ts1{
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }
}
</style>
