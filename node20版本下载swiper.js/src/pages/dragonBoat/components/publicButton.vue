<template>
  <div class="flex align-center justify-center line-height-100 text-nowrap" :class="buttonClass" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hasRight: {},
    buttonStyle: {
      default() {
        return { 0: 'button-noFinish', 1: 'button-receive', 2: 'button-finish' }
      }
    }
  },
  computed: {
    buttonClass() {
      return this.buttonStyle[this.hasRight]
    }
  }
}
</script>

<style lang="scss" scoped>
.publicButton {
  font-size: 28px;
  border-radius: 30px;
  box-shadow: 0 0 0 3px #fff;
}
.button-receive {
  @extend .publicButton;
  color: #a9792c;
  background: linear-gradient(0deg, #fff5b0, #ffffff);
}
.button-finish {
  @extend .publicButton;
  color: #ffffff;
  background: linear-gradient(0deg, #9d9d9d, #e7e7e7);
}
.button-noFinish {
  @extend .publicButton;
  color: #4d7ddd;
  background: linear-gradient(0deg, #cae7ff, #ffffff);
}
</style>
