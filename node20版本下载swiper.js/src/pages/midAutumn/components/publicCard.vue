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
  background: linear-gradient(90deg, #D65C32, #FFCD61);
  border-radius: 12px;
  box-shadow: 0 0 0 3px #F59C42;
}
</style>
