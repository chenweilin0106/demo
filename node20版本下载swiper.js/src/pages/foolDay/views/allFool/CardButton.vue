<template>
  <div class="CardButton flex align-center justify-center line-height-100" :class="styleMap[buttonStatus]">
    {{ textMap[buttonStatus] }}
  </div>
</template>

<script>
export default {
  props: {
    buttonStatus: {
      default: 0
    },
    textMap: {
      type: Object,
      default: () => {
        return {
          0: '未完成',
          1: '领取',
          2: '已领取'
        }
      }
    },
    styleMap: {
      type: Object,
      default: () => {
        return {
          0: 'buttonStyle-0',
          1: 'buttonStyle-1',
          2: 'buttonStyle-2'
        }
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.CardButton {
  width: 124px;
  height: 64px;
  font-size: 28px;
  font-weight: 500;
  border-width: 3px;
  border-style: solid;
}
.buttonStyle-0 {
  color: #4d7ddd;
  border-color: #fff;
  background-image: linear-gradient(0deg, #cae7ff, #ffffff);
}
.buttonStyle-1 {
  color: #a9792c;
  border-color: #fff;
  background-image: linear-gradient(0deg, #fff9d1, #ffffff);
}
.buttonStyle-2 {
  color: #ffffff;
  border-color: #fff;
  background-image: linear-gradient(0deg, #9d9d9d, #e7e7e7);
}
</style>
