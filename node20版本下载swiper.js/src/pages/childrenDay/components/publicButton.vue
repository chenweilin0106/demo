<template>
  <div class="publicButton flex align-center justify-center line-height-100 text-nowrap" :class="buttonClass" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
import buttonMixin from '@/pages/childrenDay/mixins/buttonMixin'
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
  color: #fff;
  background: no-repeat left top/100% 100%;
  text-shadow: 1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
}
.button-receive {
  background-image: url('@/pages/childrenDay/assets/btn_2.png');
  text-shadow: 1px 0 #da6093, -1px 0 #da6093, 0 1px #da6093, 0 -1px #da6093, 1px 1px #da6093, -1px -1px #da6093, 1px -1px #da6093, -1px 1px #da6093;
}
.button-finish {
  background-image: url('@/pages/childrenDay/assets/btn_1.png');
  text-shadow: 1px 0 #97a1b1, -1px 0 #97a1b1, 0 1px #97a1b1, 0 -1px #97a1b1, 1px 1px #97a1b1, -1px -1px #97a1b1, 1px -1px #97a1b1, -1px 1px #97a1b1;
}
.button-noFinish {
  background-image: url('@/pages/childrenDay/assets/btn_3.png');
  text-shadow: 1px 0 #2d78c3, -1px 0 #2d78c3, 0 1px #2d78c3, 0 -1px #2d78c3, 1px 1px #2d78c3, -1px -1px #2d78c3, 1px -1px #2d78c3, -1px 1px #2d78c3;
}
</style>
