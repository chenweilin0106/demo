<template>
  <transition name="popup-fade" appear>
    <div class="popupOverly position-fixed flex align-center justify-center" @click.self="$emit('close')">
      <div class="popupContent position-relative">
        <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
  },
  created() {
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('body').style.overflow = 'hidden'
  },
  beforeDestroy() {
    document.querySelector('html').style.overflow = 'auto'
    document.querySelector('body').style.overflow = 'auto'
  }
}
</script>

<style scoped lang="scss">
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: all 0.3s;
  .popupContent {
    transition: all 0.3s;
  }
}
.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
  .popupContent {
    transform: scale(0.7);
  }
}
.popupOverly {
  z-index: 1999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .popupContent {
    border-image-source: url('@/pages/skillGift/assets/tk_10.png');
    border-image-slice: 400 0 100 0 fill;
    border-image-width: 400px 0 100px 0;
    .titleIcon {
      z-index: 1;
      top: -48px;
      width: 524px;
      height: 99px;
    }
  }
}
</style>
