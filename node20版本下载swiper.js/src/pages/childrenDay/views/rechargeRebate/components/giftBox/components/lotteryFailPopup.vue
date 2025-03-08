<template>
  <PopupBox @clickClose="clickClose">
    <p class="margin-row-center text-nowrap line-height-100">开启次数不足，请前往充值</p>
    <div class="buttons flex align-center justify-center">
      <div class="cancel-button flex align-center justify-center line-height-100 position-relative" @click="clickClose">取消</div>
      <PublicButton has-right="1" class="confirm-button" @click="toRecharge">立即前往</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
import PublicButton from '@/pages/childrenDay/components/publicButton.vue'
import PopupBox from '@/pages/childrenDay/components/popupBox.vue'
export default {
  components: { PopupBox, PublicButton },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    toRecharge() {
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
  .main {
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
p {
  width: fit-content;
  font-size: 32px;
  color: #ffffff;
}

.buttons {
  .cancel-button,
  .confirm-button {
    width: 244px;
    height: 76px;
    border-radius: 38px;
    font-size: 32px;
  }

  .cancel-button {
    margin-right: 30px;
    color: #4a50d1;
    background: linear-gradient(0deg, #7cd5ff, #dbfcfd);
    font-size: 32px;
    border-radius: 38px;
    z-index: 1;
    &::before {
      content: '';
      z-index: -1;
      position: absolute;
      inset: 2px;
      background-image: linear-gradient(180deg, #ebfeff, #baf1f9);
      border-radius: inherit;
    }
  }
  .confirm-button.button-receive {
    background-image: url('@/pages/childrenDay/assets/btn_6.png');
  }
}
</style>
