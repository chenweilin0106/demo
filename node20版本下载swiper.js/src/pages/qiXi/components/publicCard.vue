<template>
  <div class="publicCard">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.publicCard {
  width: 660px;
  height: 137px;
  background: linear-gradient(-90deg, #F8CAFF, #7C9EFF, #63B2E4);
  border-radius: 12px;
  box-shadow: 0 0 0 4px #BFD4FF;
}
</style>
