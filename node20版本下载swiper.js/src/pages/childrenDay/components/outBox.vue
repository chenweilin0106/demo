<template>
  <div class="outBox position-relative margin-row-center">
    <img v-if="title" :src="IconPath(title)" class="titleIcon position-absolute position-row-center" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>
.outBox {
  position: relative;
  margin: 0 auto;
  width: 700px;
  height: fit-content;
  background-image: linear-gradient(0deg, #75b0ff, #7ac8ff);
  box-shadow: 0 0 0 4px #dff6fb, 0 0 0 8px #aae4fd;
  border-radius: 24px;
  .titleIcon {
    top: -126px;
    width: 535px;
    height: 172px;
  }
}
</style>
