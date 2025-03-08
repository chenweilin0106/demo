<template>
  <transition name="fade" appear>
    <div class="popup-overly position-fixed flex align-center justify-center" @click.self="clickClose" @touchmove.prevent.stop>
      <div class="popup-content" @touchmove.prevent.stop>
        <div class="content-inner w-100 h-100 flex-column position-relative justify-center align-center">
          <img :src="IconPath('tk_1.png')" class="leftBalloon position-absolute" />
          <img :src="IconPath('tk_2.png')" class="rightBalloon position-absolute" />
          <div class="previewIcon overflow-hidden"><PublicImg :imgName="imgName" :user-avatar="hasAvatar ? $store.state.user_icon : ''" /></div>
          <p class="previewText text-nowrap line-height-100">{{ imgText }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PublicImg from '@/pages/gardenParty/components/publicImg.vue'
export default {
  props: ['imgName', 'hasAvatar', 'imgText'],
  components: { PublicImg },
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
}
.popup-content {
  width: 620px;
  height: 361px;
  background: rgba(255, 255, 255, 0.3);
  padding: 6px;
  border-radius: 34px;
}
.content-inner {
  border: 4px solid #fff;
  border-radius: 28px;
  background: linear-gradient(0deg, #ffbed6, #b3acfa, #8fa4f4);
}
.leftBalloon {
  top: -95px;
  left: -74px;
  width: 182px;
  height: 577px;
}
.rightBalloon {
  top: -71px;
  right: -76px;
  width: 163px;
  height: 354px;
}
.previewIcon {
  width: 195px;
  height: 195px;
}
.previewText {
  margin-top: 10px;
  font-size: 28px;
  color: #ffffff;
}
</style>
