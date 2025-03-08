<template>
  <div class="publicButton flex align-center justify-center line-height-100 text-nowrap" :class="buttonClass" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
import buttonMixin from '@/pages/skillGift/mixins/buttonMixin'
export default {
  props: ['hasRight'],
  mixins: [buttonMixin],
  computed: {
    buttonClass() {
      return this.ButtonStyle('1', this.hasRight)
    }
  }
}
</script>

<style lang="scss" scoped>
.publicButton {
  font-size: 28px;
  background: no-repeat left top/100% 100%;
}
.button-receive {
  //background-image: url('@/pages/mayDay2024/assets/btn_3.png');
  color: #4a50d1;
}
.button-finish {
  //background-image: url('@/pages/mayDay2024/assets/btn_1.png');
  color: #464642;
}
.button-noFinish {
  //background-image: url('@/pages/mayDay2024/assets/btn_2.png');
  color: #ffffff;
}
</style>
