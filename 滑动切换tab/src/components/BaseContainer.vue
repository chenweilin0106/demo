<template>
  <div class="OutBox position-relative margin-row-center">
    <img v-if="titleIcon" :src="IconPath(titleIcon)" class="titleImg position-absolute" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['titleIcon']
}
</script>

<style lang="scss" scoped>
.OutBox {
  width: 682px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 9px 1px rgba(186, 135, 36, 0.5);
  border-radius: 30px;
  .titleImg {
    top: -25px;
    left: -1px;
    width: 684px;
    //height: 99px;
  }
}
</style>
