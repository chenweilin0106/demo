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
  background: linear-gradient(-90deg, #FDE180, #65CBFB, #5792FF);
  border-radius: 20px;
  box-shadow: 0 0 0 4px #C2F9FF;
}
</style>
