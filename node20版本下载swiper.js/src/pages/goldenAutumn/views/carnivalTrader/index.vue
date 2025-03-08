<template>
  <div class="carnivalTrader">
    <div :class="['tagDiv', `status${viewShow}`]">
      <div @click="viewShow = 1"></div>
      <div @click="viewShow = 2"></div>
      <img :src="IconPath('back_1.png')" class="leftLeaf" />
      <img :src="IconPath('back_2.png')" class="rightLeaf" />
    </div>
    <DiscountStore v-if="viewShow==1"></DiscountStore>
    <Voucher v-else-if="viewShow==2"></Voucher>
  </div>
</template>

<script>
import DiscountStore from './views/discountStore/index.vue'
import Voucher from './views/voucher/index.vue'

export default {
  name: 'carnivalTrader',
  props: [],
  components: {
    DiscountStore,
    Voucher
  },
  data() {
    return {
      viewShow: 1 // 显示页面
    }
  },
  computed: {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.carnivalTrader{
  .tagDiv{
    width: 509px;
    height: 79px;
    margin: 40px auto 0 auto;
    display: flex;
    position: relative;
    &.status1{
      background: url('@/pages/goldenAutumn/assets/mk4_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/goldenAutumn/assets/mk4_2.png') no-repeat left top/100% 100%;
    }
    &>div{
      width: 50%;
      height: 100%;
    }
    .leftLeaf {
      width: 177px;
      height: 157px;
      pointer-events: none;
      position: absolute;
      top: 20px;
      left: -120px;
      z-index: 10;
    }
    .rightLeaf {
      width: 161px;
      height: 208px;
      pointer-events: none;
      position: absolute;
      top: -30px;
      right: -100px;
      z-index: 10;
    }
  }
}
</style>
