<template>
  <PopupBox :title="'title_16.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>玩家需花费钻石进行飞行，每次飞行会前进100~3</li>
        <li>00km，具体为100km（40%）、150km（30%）</li>
        <li>、200km（20%）、300km（10%）</li>
        <li><span></span>每次飞行可能获得的神秘奖励如下：</li>
      </ul>
    </div>
    <div class="img1"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>达到国度可获得额外奖励：</li>
      </ul>
    </div>
    <div class="img2"></div>
    <div class="rules-text-popup">
      <ul>
        <li><span></span>每3个小时内，首个领取各国度奖励的玩家将触发</li>
        <li>全服通知</li>
      </ul>
    </div>
  </PopupBox>
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
  .img1{
    width: 554px;
    height: 501px;
    background: url('@/pages/midAutumn/assets/tk_36.png') no-repeat left top/100% 100%;
    margin: 0 auto;
  }
  .img2{
    width: 554px;
    height: 491px;
    background: url('@/pages/midAutumn/assets/tk_37.png') no-repeat left top/100% 100%;
    margin: 0 auto;
  }
  .rewardsListDiv {
    margin: 20px auto 60px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .rewardItem {
      width: 120px;
      height: 120px;
      position: relative;
      display: flex;
      justify-content: center;
      margin: 0 20px;
      .itemIcon{
        background: #fefaef;
        border-radius: 12px;
        border: 4px solid #A7DFFF;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .name {
        color: #fff;
        white-space: nowrap;
        height: 25px;
        font-size: 26px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 140px;
      }
      .priceMarkIcon{
        background: linear-gradient(-90deg, #75B9FF, #FF84F8);
        border-radius: 15px;
        font-weight: bold;
        font-size: 20px;
        color: #FFFFFF;
        padding: 2px 12px;
        position: absolute;
        right: 0;
        top: -10px;
        img{
          width: 27px;
          height: 20px;
        }
      }
    }
  }

</style>
