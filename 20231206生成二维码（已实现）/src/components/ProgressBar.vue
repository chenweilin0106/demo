<template>
  <div class="ProgressBar">
    <div
      v-for="item in propData"
      :key="item.goods_id"
      :id="`progress_${item.goods_id}`"
      class="progress_item"
      :class="{
        progress_item_active:
          item.has_right == 2 && ![4, 8].includes(item.goods_id),
        progress_item4_active: item.has_right == 2 && item.goods_id == 4,
        progress_item8_active: item.has_right == 2 && item.goods_id == 8
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['propData']
}
</script>

<style scoped lang="scss">
.ProgressBar {
  position: relative;
  width: 100%;
  height: 938px;

  .progress_item {
    position: absolute;
  }

  .progress_item_active {
    background: #ffbc2b !important;
  }

  .progress_item4_active {
    background-image: url('../assets/mk1_9_1.png') !important;
  }

  .progress_item8_active {
    background-image: url('../assets/mk1_10_1.png') !important;
  }

  #progress_1,
  #progress_2,
  #progress_3 {
    top: 12px;
    width: 164px;
    height: 16px;
    background: #2d1e51;
    border-radius: 8px 0px 0px 8px;
  }

  #progress_1 {
    left: 105px;
  }

  #progress_2 {
    left: 269px;
  }

  #progress_3 {
    left: 433px;
  }

  #progress_4 {
    top: 12px;
    right: 14px;
    width: 97px;
    height: 418px;
    background: url('../assets/mk1_9.png') no-repeat left top/100% 100%;
  }

  #progress_5,
  #progress_6,
  #progress_7 {
    top: 414px;
    width: 164px;
    height: 16px;
    background: #2d1e51;
    border-radius: 8px 0px 0px 8px;
  }

  #progress_5 {
    right: 110px;
  }

  #progress_6 {
    right: 274px;
  }

  #progress_7 {
    right: 438px;
  }

  #progress_8 {
    top: 413px;
    left: 13px;
    width: 97px;
    height: 420px;
    background: url('../assets/mk1_10.png') no-repeat left top/100% 100%;
  }

  #progress_9,
  #progress_10 {
    top: 817px;
    height: 16px;
    background: #2d1e51;
    border-radius: 8px 0px 0px 8px;
  }

  #progress_9 {
    width: 164px;
    left: 110px;
  }

  #progress_10 {
    width: 243px;
    left: 274px;
  }
}
</style>
