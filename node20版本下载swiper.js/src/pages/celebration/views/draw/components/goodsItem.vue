<template>
  <div class="goodsItem flex-column justify-between align-center">
    <div class="goodsIcon position-relative flex align-center justify-center">
      <div v-if="typeToNameMap[goods.type]" class="typeLabel position-absolute line-height-100">{{ typeToNameMap[goods.type] }}</div>
      <img v-if="goods.goods_id == 4" :src="IconPath('mk5_4.png')" class="newLabel position-absolute" />
      <PublicImg :imgName="goods.icon" :imgType="goods.type" />
    </div>
    <div class="goodsText line-height-100">{{ goods.text }}</div>
    <div class="goodsLimit line-height-100">{{ goods.max_times == 0 ? '不限次数' : `（${goods.exchange_times}/${goods.max_times}）` }}</div>
    <div class="buyBtn flex align-center justify-center line-height-100" :class="`has_right_${!goods.lock ? 0 : goods.has_right}`" @click="$emit('buy')">
      <template v-if="goods.has_right != 2"><img :src="IconPath('jqb_36_45.png')" class="coin" /><i>{{ goods.price }}</i>&nbsp;兑换</template>
      <template v-else>已兑换</template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'goodsIem',
  props: ['goods'],
  components: {},
  data() {
    return {}
  },
  watch: {},
  computed: {
    ...mapState(['typeToNameMap'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.coin {
  width: auto;
  height: 48px;
}
.goodsItem {
  width: 200px;
  height: 315px;
  background: linear-gradient(180deg, #FBB740, #F97F29);
  border-radius: 20px;
  padding: 16px 0;
  .goodsIcon {
    width: 138px;
    height: 138px;
    background: linear-gradient(0deg, #FFF9E3, #FFD67D);
    border-radius: 24px;
    border: 4px solid #ED7C21;
    .typeLabel {
      z-index: 1;
      background: #B55023;
      border-radius: 17px;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
      top: -19px;
      right: -18px;
      padding: 10px;
    }
    .newLabel {
      width: 46px;
      height: 39px;
      top: -21px;
      left: -17px;
    }
  }
  .goodsText {
    font-size: 26px;
    color: #FFFFFF;
  }
  .goodsLimit {
    font-size: 22px;
    color: #FFF68F;
  }
  .buyBtn {
    width: 154px;
    height: 52px;
    border-radius: 999999px;
    border: 2px solid #FFFFFF;
    font-size: 26px;
    pointer-events: none;
    &.has_right_0 {
      opacity: 0.6;
    }
    &.has_right_1, &.has_right_0 {
      background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
      color: #A9792C;
      >i {
        color: #E57700;
      }
    }
    &.has_right_1 {
      pointer-events: auto;
    }
    &.has_right_2 {
      background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
      color: #FFFFFF;
    }
  }
}
</style>
