<template>
  <van-popup
    v-model="showPopup"
    :close-on-click-overlay="false"
    @closed="clickClose"
    @touchmove.prevent.stop
  >
    <div class="popup-content" @touchmove.prevent.stop>
      <public-svga
        v-if="showPopup"
        svgaName="springFestival_synthetic"
        loops="1"
        @onFinished="onFinished"
      />
    </div>
  </van-popup>
</template>

<script>
import PublicSvga from '@/pages/springFestival/components/PublicSvga.vue'

export default {
  props: {},
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
    onFinished() {
      // this.$toast('动画结束')
      this.$emit('animationEnd')
      this.showPopup = false
    },
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
  width: 100%;
}

.PublicSvga {
  width: 100%;
}
</style>
