<template>
  <div class="baseCard">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.baseCard {
  border-image-source: url('@/pages/childrenDay/assets/mk1_1.png');
  border-image-slice: 20 20 20 20 fill;
  border-image-width: 20px 20px 20px 20px;
}
</style>
