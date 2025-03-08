<template>
  <div class="publicButton flex align-center justify-center line-height-100 text-nowrap" :class="buttonClass" @click="$emit('click')">
    <slot>{{ buttonContent }}</slot>
  </div>
</template>

<script>
export default {
  props: {
    hasRight: { default: 0 },
    textType: { default: 1 },
    buttonStyle: {
      default() {
        return { 0: 'button-noFinish', 1: 'button-receive', 2: 'button-finish' }
      }
    }
  },
  data() {
    return {
      buttonTextMap: Object.freeze({
        1: { 0: '未完成', 1: '领取', 2: '已领取' },
        2: { 0: '去完成', 1: '领取', 2: '已领取' },
        3: { 0: '未完成', 1: '兑换', 2: '已兑换' }
      })
    }
  },
  computed: {
    buttonClass() {
      return this.buttonStyle[this.hasRight]
    },
    buttonContent() {
      return this.buttonTextMap[this.textType][this.hasRight]
    }
  }
}
</script>

<style lang="scss" scoped>
.publicButton {
  font-size: 28px;
  border-radius: 99999px;
  border: 3px solid #fff;
}
.button-receive {
  color: #a9792c;
  background: linear-gradient(0deg, #fff5b0, #ffffff);
}
.button-finish {
  color: #ffffff;
  background: linear-gradient(0deg, #9d9d9d, #e7e7e7);
}
.button-noFinish {
  color: #4d7ddd;
  background: linear-gradient(0deg, #cae7ff, #ffffff);
}
</style>
