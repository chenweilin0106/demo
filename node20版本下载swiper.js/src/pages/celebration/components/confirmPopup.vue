<template>
  <PopupBox title="mk1_title_12.png" size="2" @clickClose="clickClose">
    <slot><p class="text-center" v-html="text"></p></slot>
    <div class="buttons flex align-center justify-center">
      <button @click="clickClose">取消</button>
      <button>确认</button>
    </div>
  </PopupBox>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  padding-top: 219px;
}
::v-deep .main {
  height: 255px + 278 - 274;
}
p {
  font-weight: 500;
  font-size: 30px;
  color: #FFFFFF;
  line-height: 50px;
  margin-bottom: 53px - 10;
}
.buttons {
  button {
    width: 246px;
    height: 78px;
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    border-radius: 99999999px;
    border: 3px solid #FFFFFF;
    font-size: 32px;
    color: #4D7DDD;
    &:nth-child(2) {
      background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
      margin-left: 18px;
      color: #A9792C;
    }
  }
}
</style>
