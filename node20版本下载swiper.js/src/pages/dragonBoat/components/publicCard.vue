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
  background: linear-gradient(-90deg, #f8dc7c, #5db8be);
  border-radius: 20px;
  box-shadow: 0 0 0 4px #f3de8a;
}
</style>
