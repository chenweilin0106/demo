<template>
  <PopupBox @clickClose="clickClose">
    <p class="margin-row-center text-nowrap">开启次数不足，请前往充值</p>
    <div class="buttons flex align-center justify-center">
      <div class="cancel-button position-relative flex align-center justify-center line-height-100" @click="clickClose">取消</div>
      <div class="confirm-button flex align-center justify-center line-height-100" @click="recharge">立即前往</div>
    </div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/crazyEgg/components/popupBox.vue'
export default {
  components: { PopupBox },
  methods: {
    recharge() {
      this.$emit('recharge')
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 620px;
  height: 340px;
  padding: 90px 0 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-image-source: url('@/pages/crazyEgg/assets/bg.png');
}
p {
  width: fit-content;
  font-size: 32px;
  color: #ffffff;
}

.buttons {
  .cancel-button,
  .confirm-button {
    width: 234px;
    height: 76px;
    border-radius: 38px;
    border: 2px solid #ffffff;
    font-size: 32px;
    color: #ffffff;
  }

  .cancel-button {
    background-image: linear-gradient(0deg, #e07336, #fff68f);
  }
  .confirm-button {
    margin-left: 24px;
    background-image: linear-gradient(0deg, #34a38f, #9adbb9);
  }
}
</style>
