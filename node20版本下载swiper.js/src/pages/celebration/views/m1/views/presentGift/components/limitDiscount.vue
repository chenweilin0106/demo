<template>
  <OutBox class="limitDiscount" title="mk1_title_7.png" has-costume>
    <div class="rules-text">
      <ul>
        <li><span></span>活动期间，开启七夕CP称号改名<i>限时2.5折</i>优惠，</li>
        <li>改名<i>仅需1314钻石</i>，活动结束后价格将恢复原价</li>
        <li>5200钻石</li>
        <li><span></span>每人只能享受一次改名优惠</li>
      </ul>
    </div>
  </OutBox>
</template>

<script>
export default {
  name: 'limitDiscount', // 限时折扣
  props: [],
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.limitDiscount {
  border-image-source: none !important;
  background: url('@/pages/celebration/assets/mk2_13.png') no-repeat left top/100% 100%;
}
</style>
