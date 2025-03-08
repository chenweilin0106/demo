<template>
  <div class="CrazyEggBox">
    <div class="head flex_across">
      <img v-if="titleIcon" :src="IconPath(titleIcon)" />
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="foot"></div>
  </div>
</template>

<script>
export default {
  name: 'CrazyEggBox',
  props: ['titleIcon']
}
</script>

<style scoped lang="scss">
.CrazyEggBox {
  //margin: 0 auto;
  width: 750px;

  .head {
    position: relative;
    // z-index: 2;
    width: 750px;
    height: 129px;
    background: url('../assets/main_bg_1.png') no-repeat top center/100% 100%;
    //margin-bottom: -1px;

    > img {
      position: absolute;
      width: 685px;
      height: 174px;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .main {
    width: 750px;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    //align-items: center;
    // justify-content: center;
    background: url('../assets/main_bg_2.png') no-repeat top center/100% 100%;
    //padding: 0 4px;
  }

  .foot {
    position: relative;
    //z-index: 1;
    //top: -1px;
    width: 750px;
    height: 76px;
    background: url('../assets/main_bg_3.png') no-repeat center top/100% 100%;
  }
}
</style>
