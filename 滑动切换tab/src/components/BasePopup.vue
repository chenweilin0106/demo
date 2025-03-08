<template>
  <transition name="fade" appear>
    <div class="popupOverly position-fixed flex align-center justify-center" @click.self="$emit('close')" @touchmove.prevent.stop>
      <div class="outContain position-relative" @touchmove.prevent.stop>
        <img v-if="light" :src="IconPath('tk_9.png')" class="topLightIcon position-absolute position-row-center pointer-none" />
        <div class="popupContent position-relative">
          <img v-if="crown" :src="IconPath('tk_1.png')" class="crown position-absolute position-row-center" />
          <img v-if="title" :src="IconPath(title)" class="titleIcon block margin-row-center" />
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    crown: { type: Boolean, default: true },
    light: { type: Boolean, default: true }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    document.body.appendChild(this.$el) // 将弹窗挂载到body上 避免父级有transform属性导致弹窗fixed属性失效
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  .popupContent {
    transition: all 0.3s;
  }
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  .popupContent {
    transform: scale(0.7);
  }
}
.popupOverly {
  z-index: 2024;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .topLightIcon {
    top: -210px;
    width: 600px;
    height: 588px;
  }
  .popupContent {
    padding-top: 60px;
    background: linear-gradient(180deg, #ffefa7, #ffffff 80%);
    border-radius: 50px;
    box-shadow: 0 0 20px 10px rgba(255, 177, 9, 0.6);
    .crown {
      top: -81px;
      width: 280px;
      height: 133px;
    }
    .titleIcon {
      height: 44px;
    }
  }
}
</style>
