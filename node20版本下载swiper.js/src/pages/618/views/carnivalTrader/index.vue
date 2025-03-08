<template>
  <div class="carnivalTrader">
    <DiscountStore v-if="viewShow==1" @viewShowExchange="viewShowExchange"></DiscountStore>
    <Voucher v-else-if="viewShow==2" @viewShowExchange="viewShowExchange"></Voucher>
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
    /**
     * 切换页面
     */
    viewShowExchange(type) {
      if (this.viewShow != type) {
        this.viewShow = type
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.carnivalTrader{
  overflow: hidden;
}
</style>
