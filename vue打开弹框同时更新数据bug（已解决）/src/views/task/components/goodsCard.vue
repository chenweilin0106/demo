<template>
  <div class="goodsCard margin-row-center position-relative">
    <div class="awards flex w-100 h-100">
      <div v-for="(award, index) in gift.awards" :key="index" class="awardBox position-relative flex align-center justify-center">
          <PublicImg :imgName="award.icon" :imgType="award.type" />
          <div class="num position-absolute line-height-100">{{ award.nums }}</div>
      </div>
    </div>
    <img :src="IconPath(gift.discount_icon)" class="priceLabel position-absolute" />
    <div class="button position-absolute w-100 h-100 flex align-center justify-center line-height-100 text-nowrap" :class="`has_right_${gift.has_right}`" @click="onClick">
      <template v-if="gift.has_right == 1">{{ gift.price }}<img :src="IconPath('zs_34_27.png')" class="diamond" /></template>
      <template v-else>已售空</template>
      <div class="limitNum position-absolute line-height-100">每日限购{{ `${gift.now_num}/${gift.limit_num}` }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cardType', 'gift'],
  data() {
    return {}
  },
  computed: {},
  methods: {
    onClick() {
      this.$emit('buyGift', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsCard {
  width: 641px;
  height: 149px;
  background: url('@/assets/mk1_9.png') no-repeat left top/100% 100%;
  margin-bottom: 13px;
  &:last-child {
    margin-bottom: 0;
  }
  &.bg2 {
    background: url('@/assets/mk1_14.png') no-repeat left top/100% 100%;
    .button {
      font-size: 28px;
      top: 39px;
      right: 18px;
      width: 126px;
      height: 66px;
    }
  }
  .cardTypeLabel {
    top: -12px;
    right: -14px;
    width: 92px;
    height: 36px;
  }
  .priceLabel {
    z-index: 3;
    top: -34px;
    left: -25px;
    width: 122px;
    height: 97px;
  }
  .awards {
    padding-top: 17px;
    padding-left: 61px;
    .awardBox {
      width: 141px;
      height: 108px;
      border-radius: 24px;
      border: 4px solid #C4A4FF;
      background: linear-gradient(0deg, #B891FE, #6547AF);
      &:first-child {
        margin-right: 28px;
      }
      .num {
        right: 8px;
        bottom: 7px;
        font-weight: bold;
        font-size: 24px;
        color: #FFFFFF;
        text-shadow: 1px 0 #8258DE, -1px 0 #8258DE, 0 1px #8258DE, 0 -1px #8258DE, 1px 1px #8258DE, -1px -1px #8258DE, 1px -1px #8258DE, -1px 1px #8258DE;
      }
    }
  }
  .taskInfo {
    padding: 21px 0 21px 29px;
    .taskDesc {
      width: 450px;
      height: 55px;
      font-weight: 500;
      font-size: 26px;
      color: #3A1CA5;
    }
    .taskAward {
      margin-top: 10px;
      font-size: 24px;
      color: #B07708;
      .materials {
        width: 51px;
        height: 37px;
        margin-right: 7px;
      }
    }
  }
  .button {
    top: 37px;
    right: 25px;
    width: 136px;
    height: 60px;
    border-radius: 999999px;
    font-weight: bold;
    font-size: 26px;
    border: 3px solid #fff;
    .diamond {
      width: 34px;
      height: 27px;
    }
    .limitNum {
      left: 50%;
      bottom: -30px;
      transform: translateX(-50%);
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
    }
    &.has_right_0 {
      background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
      color: #4D7DDD;
    }
    &.has_right_1 {
      background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
      color: #A9792C;
    }
    &.has_right_2 {
      pointer-events: none;
      background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
      color: #FFFFFF;
    }
  }
}
</style>
