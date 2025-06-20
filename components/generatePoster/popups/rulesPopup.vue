<template>
  <PopupBox title="title_14.png" @clickClose="clickClose">
    <div class="sideIcon position-absolute pointer-none"></div>
    <div class="scrollBox overflow-x-hidden overflow-y-scroll">
      <div class="awardPreview margin-row-center">
        <van-swipe class="my-swipe" :loop="false">
          <van-swipe-item><img :src="IconPath('tk_16.png')" class="previewIcon" /></van-swipe-item>
          <van-swipe-item><img :src="IconPath('tk_17.png')" class="previewIcon" /></van-swipe-item>
        </van-swipe>
      </div>
      <div v-once class="rules-text-popup">
        <ul>
          <li><span></span>玩家绑定好友后{{pointName}}达到指定进度可领取对应奖</li>
          <li>励并装扮页面，{{pointName}}由双方互送钻石礼物和表白</li>
          <li>获得，1钻石=1{{pointName}}</li>
          <li><span></span>此绑定只生效于本次活动。从双方均成功绑定后开</li>
          <li>始统计{{pointName}}</li>
          <li><span></span>奖励中的素材奖励为玩法奖励，仅作用于活动玩法，</li>
          <li>活动结束后即失效</li>
        </ul>
      </div>
    </div>
    <PublicButton class="button" hasRight="1" @click="clickClose">去体验</PublicButton>
  </PopupBox>
</template>

<script>
export default {
  inject: ['pointName'],
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .popupContent {
  .main {
    overflow: visible;
    margin-top: 95px; /*todo*/
  }
}
::v-deep .awardPreview {
  width: 588px; /*todo*/
  height: 682px; /*todo*/
  margin-bottom: 30px; /*todo*/
  .previewIcon {
    width: 496px; /*todo*/
    height: 682px; /*todo*/
    margin-bottom: 50px;
  }
  .van-swipe-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .van-swipe__indicator--active {
    background-color: #FFEC95 !important; /*todo*/
  }
  .van-swipe__indicator {
    width: 16px;
    height: 16px;
    background-color: #DB668A; /*todo*/
  }
}
.sideIcon {
  z-index: 1;
  top: 60px; /*todo*/
  left: 0; /*todo*/
  width: 55px;
  height: 224px;
  background: url('@/pages/valentineDay/assets/tk_15.png') no-repeat center top/100% auto; /*todo*/
}
.scrollBox {
  height: 795px; /*todo*/
}
.button {
  margin: 25px auto 0; /*todo*/
  width: 324px;
  height: 76px;
  font-size: 32px;
}
.rules-text-popup{
  font-size: 26px;
  line-height: 38px;
}
</style>
