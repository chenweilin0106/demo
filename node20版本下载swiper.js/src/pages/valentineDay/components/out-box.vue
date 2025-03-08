<template>
  <div class="out-box">
    <img class="title" v-if="title" :src="IconPath(title)" />
    <img v-if="leftIcon" :src="IconPath('top_1.png')" class="left-icon" />
    <img v-if="rightIcon" :src="IconPath('top_2.png')" class="right-icon" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'out-box',
  props: ['title', 'rightIcon', 'leftIcon']
}
</script>

<style scoped lang="scss">
.out-box {
  position: relative;
  z-index: 2;
  margin: 0 auto;
  width: 734px;
  border-image-source: url('@/pages/valentineDay/assets/mk1_1.png');
  border-image-slice: 170 0 170 0 fill;
  border-image-width: 170px 0 170px 0;

  .title {
    position: absolute;
    width: 515px;
    height: 199px;
    top: -68px;
    left: 50%;
    transform: translateX(-50%);
  }

  .left-icon {
    position: absolute;
    z-index: 2;
    width: 99px;
    height: 444px;
    pointer-events: none;
  }

  .right-icon {
    position: absolute;
    z-index: 2;
    width: 100px;
    height: 444px;
    pointer-events: none;
  }
}
</style>
