<template>
  <BasePopup title="tk_5.png" @close="clickClose">
    <div class="tip line-height-100 width-fit margin-row-center">开启宝箱有机会获得以下奖励：</div>
    <img :src="IconPath('tk_8.png')" class="awardsTable block margin-row-center" />
  </BasePopup>
</template>

<script>
import BasePopup from '@/components/BasePopup.vue'
export default {
  components: { BasePopup },
  methods: {
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 560px;
  height: 721px;
  border-radius: 50px;
}
.tip {
  margin-top: 19px;
  margin-bottom: 21px;
  font-weight: bold;
  font-size: 26px;
  color: #d57c00;
}
.awardsTable {
  width: 476px;
  height: 502px;
}
</style>
