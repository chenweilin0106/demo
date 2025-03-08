<template>
  <div :class="buttonClass" @click="$emit('click')">
    <span class="main flex align-center justify-center line-height-100 text-nowrap"><slot>{{ buttonContent }}</slot></span>
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
  position: relative;
  font-size: 28px;
  .main {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 99999px;
  }
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 3px * 2);
    height: calc(100% + 3px * 2);
    background-color: #fff;
    border-radius: 99999px;
  }
}
.button-receive {
  @extend .publicButton;
  .main {
    color: #a9792c;
    background: linear-gradient(0deg, #fff5b0, #ffffff);
  }
}
.button-finish {
  @extend .publicButton;
  .main {
    color: #ffffff;
    background: linear-gradient(0deg, #9d9d9d, #e7e7e7);
  }
}
.button-noFinish {
  @extend .publicButton;
  .main {
    color: #4d7ddd;
    background: linear-gradient(0deg, #cae7ff, #ffffff);
  }
}
</style>
