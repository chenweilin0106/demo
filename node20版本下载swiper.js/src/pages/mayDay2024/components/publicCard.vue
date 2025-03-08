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
  border-image-source: url('@/pages/mayDay2024/assets/mk1_1.png');
  border-image-slice: 30 30 35 35 fill;
  border-image-width: 30px 30px 35px 35px;
}
</style>
