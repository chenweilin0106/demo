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
import PublicPopup from '@/pages/skillGift/components/publicPopup.vue'
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
  width: 479px;
  height: 268px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  padding: 73px 0 35px;
  border-image-source: none !important;
  background: url('@/pages/skillGift/assets/tk_2.png') no-repeat left top/100% 100%;
}
p {
  width: fit-content;
  font-size: 32px;
  color: #ffffff;
}

.buttons {
  .cancel-button,
  .confirm-button {
    width: 167px;
    height: 94px;
    font-size: 28px;
    color: #1069ff;
  }

  .cancel-button {
    background: url('@/pages/skillGift/assets/mk1_3.png') no-repeat left top/100% 100%;
  }
  .confirm-button {
    margin-left: 24px;
    background: url('@/pages/skillGift/assets/mk1_2.png') no-repeat left top/100% 100%;
  }
}
</style>
