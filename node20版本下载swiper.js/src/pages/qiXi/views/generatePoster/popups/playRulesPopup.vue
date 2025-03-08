<template>
  <PopupBox title="title_16.png" @clickClose="clickClose">
    <div class="sideIcon position-absolute pointer-none"></div>
    <div class="scrollBox overflow-x-hidden overflow-y-scroll">
      <div class="awardPreview">
        <van-swipe class="my-swipe" :loop="false">
          <van-swipe-item><img :src="IconPath('tk_48.png')" class="previewIcon" /></van-swipe-item>
          <van-swipe-item><img :src="IconPath('tk_49.png')" class="previewIcon" /></van-swipe-item>
        </van-swipe>
      </div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>与绑定好友新增浪漫值达到指定进度可领取对</li>
          <li>应奖励并装扮专属守护卡</li>
          <li><span></span>浪漫值由双方互送钻石礼物和表白获得，1钻石</li>
          <li>=1浪漫值</li>
          <li><span></span>此绑定只生效于本次活动。从双方均成功绑定</li>
          <li>后开始统计新增浪漫值</li>
          <li><span></span>奖励中的素材奖励为玩法奖励，仅作用于活动</li>
          <li>玩法，活动结束后即失效</li>
        </ul>
      </div>
    </div>
    <div class="button flex align-center justify-center" @click="clickClose">去体验</div>
  </PopupBox>
</template>

<script>
export default {
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
  }
}
::v-deep .awardPreview {
  width: 100%;
  height: 715px;
  .previewIcon {
    width: 540px;
    height: 705px;
    margin-bottom: 50px;
  }
  .van-swipe-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .van-swipe__indicator--active {
    background-color: #FFEC95 !important;
  }
  .van-swipe__indicator {
    width: 16px;
    height: 16px;
    background-color: #BF7EE2;
  }
}
.sideIcon {
  z-index: 1;
  top: 183px;
  left: -28px;
  width: 55px;
  height: 224px;
  background: url('@/pages/qiXi/assets/tk_14.png') no-repeat center top/100% auto;
}
.scrollBox {
  //border-radius: 30px 30px 0 0; /*因为弹框带有圆角 防止弹框内内容超出圆角 也加上圆角*/
  height: 820px;
  //border-radius: 140px 140px 0 0;
  .rules-text-popup {
    width: fit-content;
    margin-left: 48px;
    margin-right: auto;
    margin-top: 35px;
    li {
      font-size: 26px;
      line-height: 35px;
    }
    span {
      //background-color: #fff;
    }
  }
}
.button {
  margin: 20px auto 0;
  width: 324px;
  height: 76px;
  font-size: 32px;
  border-radius: 38px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border: 2px solid #FFFFFF;
  color: #A9792C;
}
</style>
