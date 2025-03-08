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
  background: linear-gradient(90deg, #B76AFF, #937CF9, #93AAFF);
  border-radius: 14px;
  box-shadow: inset 0 0 20px 6px #fff;
  border: 2px solid rgba(255,255,255,0.4);
  -webkit-background-clip: padding-box;
  // ---------
  //background: linear-gradient(90deg, #FA8C3E, #FFCC52);
  //border-radius: 12px;
  //box-shadow: 0 0 0 3px #F59C42;
}
</style>
