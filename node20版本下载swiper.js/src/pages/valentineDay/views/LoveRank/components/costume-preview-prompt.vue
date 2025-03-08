<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <img
        :src="IconPath('tk_17.png')"
        class="close-button"
        @click="showPopup = false"
      />
      <!--标题图片-->
      <!--<img class="title-image" :src="IconPath('title_7.png')" />-->
      <div class="inner">
        <div class="bg">
          <public-svga v-if="showPopup" svgaName="gift_azsh" />
        </div>
        <p>爱之守护·音效礼物赠送权</p>
      </div>
    </div>
  </van-popup>
</template>

<script>
import PublicSvga from '@/pages/valentineDay/components/PublicSvga.vue'

export default {
  components: {
    PublicSvga
  },
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    clickClose() {
      this.$emit('close')
    },
    // 打开弹框
    openPrompt() {
      this.showPopup = true
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 630px;
  height: 917px;
  background-color: rgba(236, 211, 255, 0.5);
  border-radius: 50px;
  pointer-events: auto;
  padding: 6px;

  .inner {
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #ed96fd, #866ae0);
    border: 4px solid #fff;
    border-radius: 44px;
    padding-top: 59px;
  }
}

.title-image {
  width: 515px;
  height: 199px;
  position: absolute;
  z-index: 3;
  top: -126px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.close-button {
  position: absolute;
  top: -44px;
  right: -36px;
  pointer-events: auto;
  width: 173px;
  height: 124px;
}

.bg {
  margin: 0 auto;
  width: 427px;
  height: 740px;
  background: url('@/pages/valentineDay/assets/tk_18.png') no-repeat left
    top/100% 100%;
}

p {
  margin-top: 26px;
  text-align: center;
  white-space: nowrap;
  font-size: 28px;
  color: #ffffff;
}
</style>
