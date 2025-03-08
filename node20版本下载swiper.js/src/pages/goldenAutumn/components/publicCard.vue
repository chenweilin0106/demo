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
  background: linear-gradient(90deg, #FA8C3E, #FFCC52);
  border-radius: 12px;
  box-shadow: 0 0 0 3px #F59C42;
}
</style>
