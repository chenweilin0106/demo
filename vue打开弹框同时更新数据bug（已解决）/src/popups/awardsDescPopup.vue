<template>
  <PopupBox title="title_8.png" @clickClose="clickClose">
    <img :src="IconPath('tk_6.png')" class="icon block margin-row-center" />
  </PopupBox>
</template>

<script>
export default {
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 557px;
  height: 504px;
}
</style>
