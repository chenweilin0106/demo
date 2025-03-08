<template>
  <PopupBox :title="'title_12.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>玩家需花费钻石进行航行，每次航行会使游</li>
        <li>轮前进10~30km，具体为10km（40%）、</li>
        <li>15km（30%）、20km（20%）、30km</li>
        <li>（10%）。</li>
        <li><span></span>每次航行可能获得的神秘奖励如下：</li>
      </ul>
    </div>
    <div class="img1"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>达到海岛可获得额外奖励：</li>
      </ul>
    </div>
    <div class="img2"></div>
    <div class="rules-text-popup">
      <ul>
        <li>注：【星辰大海】礼物仅钻石可赠送。</li>
        <li><span></span>每3个小时内，首个领取各景点奖励的玩家</li>
        <li>将触发全服通知。</li>
      </ul>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      isShowPo: true
    }
  },
  computed: {},
  mounted() {},
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
.img1 {
  width: 551px;
  height: 565px;
  background: url('@/pages/mayDay2024/assets/tk_4.png') no-repeat left top/100% 100%;
  margin: 10px auto;
}
.img2 {
  width: 551px;
  height: 445px;
  background: url('@/pages/mayDay2024/assets/tk_5.png') no-repeat left top/100% 100%;
  margin: 10px auto;
}
</style>
