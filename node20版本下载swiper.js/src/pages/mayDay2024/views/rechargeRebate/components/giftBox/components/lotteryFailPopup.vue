<template>
  <PublicPopup @close="clickClose">
    <p class="margin-row-center text-nowrap">开启次数不足，请前往充值</p>
    <div class="buttons flex align-center justify-center">
      <div class="cancel-button position-relative flex align-center justify-center line-height-100" @click="clickClose">取消</div>
      <div class="confirm-button flex align-center justify-center line-height-100" @click="toRecharge">立即前往</div>
    </div>
  </PublicPopup>
</template>

<script>
import PublicPopup from '@/pages/mayDay2024/components/publicPopup.vue'
export default {
  components: { PublicPopup },
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
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 620px;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  padding: 74px 0;
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
  .confirm-button {
    margin-left: 24px;
    background: linear-gradient(180deg, #f599ff, #8a6af3);
    border: 2px solid #f9c9ff;
    color: #fff;
  }
}
</style>
