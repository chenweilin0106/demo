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
  background: linear-gradient(-90deg, #dfb65d, #d79c48, #b67a4e);
  border-radius: 20px;
  box-shadow: 0 0 0 4px #ecd476;
}
</style>
