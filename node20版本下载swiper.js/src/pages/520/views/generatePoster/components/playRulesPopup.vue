<template>
  <PopupBox title="title_13.png" @clickClose="clickClose">
    <div class="sideIcon position-absolute pointer-none"></div>
    <div class="scrollBox overflow-x-hidden overflow-y-scroll">
      <div class="awardPreview"></div>
      <div class="rules-text-popup">
        <ul>
          <li><span></span>玩家绑定好友后心动值达到指定进度可领取对</li>
          <li>应奖励并装扮页面，心动值由双方<i>互送钻石礼</i></li>
          <li><i>物和表白</i>获得，1钻石=1心动值</li>
          <li><span></span>此绑定只生效于本次活动。从双方均成功绑定</li>
          <li>定后开始统计心动值</li>
          <li><span></span>奖励中的素材奖励为玩法奖励，仅作用于活</li>
          <li>动玩法，活动结束后即失效</li>
          <li><span></span><i>点击装饰素材、情话素材可拖动，搭配更自由</i></li>
        </ul>
      </div>
    </div>
    <div class="button-receive button" @click="clickClose">去体验</div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/520/components/popupBox.vue'
export default {
  components: { PopupBox },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .popupContent {
  width: 608px !important;
  padding: 0;
  background: linear-gradient(0deg, #f9c984, #f378a6);
  border-radius: 144px 144px 84px 84px;
  border: 4px solid #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
}
::v-deep .main {
  position: relative;
  z-index: 1;
  height: 1051px;
  max-height: none !important;
  overflow-y: visible !important;
  overflow-x: visible !important;
  border-radius: 140px 140px 80px 80px;
}
::v-deep .titleIcon {
  z-index: 1;
  top: -99px !important;
}
.sideIcon {
  top: 183px;
  left: -18px;
  width: 55px;
  height: 224px;
  background: url('@/pages/520/assets/tk_14.png') no-repeat center top/100% auto;
}
.scrollBox {
  padding-top: 80px;
  height: 891px;
  border-radius: 140px 140px 0 0;
  .awardPreview {
    margin: 0 auto;
    width: 529px;
    height: 715px;
    background: url('@/pages/520/assets/tk_15.png') no-repeat center top/100% 100%;
  }
  .rules-text-popup {
    width: fit-content;
    margin-left: 48px;
    margin-right: auto;
    margin-top: 22px;
    li {
      font-size: 26px;
      line-height: 35px;
    }
    span {
      background-color: #fff;
    }
  }
}
.button {
  margin: 35px auto 0;
  width: 324px;
  height: 76px;
  font-size: 32px;
  border-radius: 38px;
}
</style>
