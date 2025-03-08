<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content" @touchmove.prevent.stop>
        <img :src="IconPath('tk_1.png')" class="leftBalloon position-absolute" />
        <img :src="IconPath('tk_2.png')" class="rightBalloon position-absolute" />

        <!--标题图片-->
        <img class="title-image position-absolute position-row-center" :src="IconPath('title_9.png')" />
        <div class="form-1"></div>
        <ul class="rule-text">
          <li><span></span>随机符石按照以下概率：</li>
          <li>绿色符石：47%<i>蓝色符石：30%</i></li>
          <li>紫色符石：15%<i>橙色符石：8%</i></li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {},
  computed: {},
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popup-content {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popup-content {
    transform: scale(0.7);
  }
}
.popup-overly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .popup-content {
    position: relative;
    width: 643px;
    height: 927px;
    padding-top: 84px;
    border-image-source: url('@/pages/gardenParty/assets/tk_16.png');
    border-image-slice: 84 0 82 0 fill;
    border-image-width: 84px 0 82px 0;
    .title-image {
      width: 410px;
      height: 130px;
      z-index: 3;
      top: -65px;
    }
  }
}
.leftBalloon {
  top: -48px;
  left: -54px;
  width: 182px;
  height: 577px;
}
.rightBalloon {
  top: -24px;
  right: -53px;
  width: 163px;
  height: 354px;
}
.form-1 {
  margin: 0 auto;
  width: 554px;
  height: 630px;
  background: url('@/pages/gardenParty/assets/tk_11.png') no-repeat left top/100% 100%;
}
.rule-text {
  margin-left: 69px;
  margin-top: 20px;
  width: 429px;
  color: #fff;
  white-space: nowrap;
  li {
    position: relative;
    list-style-type: none;
    font-size: 24px;
    line-height: 40px;
    //display: flex;

    span {
      position: absolute;
      top: 15px;
      left: -22px;
      width: 12px;
      height: 12px;
      background: #ffe467;
      border-radius: 50%;
    }

    i {
      margin-left: 100px;
    }
  }
}
</style>
