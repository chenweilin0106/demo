<template>
  <div>
    <div
      class="depositRebate-bottom-item"
      v-if="!(itemValue.condition ? itemValue.condition === 5000 : false)"
    >
      <div class="bottom-item-left">
        <p v-if="itemValue.condition">
          <span>累计</span>充值满<span
            >{{ itemValue.condition }}元 ({{ itemValue.recharge_nums }}/{{
              itemValue.condition
            }})</span
          >
        </p>
        <p v-else>
          <span>累计</span>{{ itemValue.days_cond }}天每天充值满<span
            >{{ itemValue.amount_cond }}元 ({{ itemValue.reach_days }}/{{
              itemValue.days_cond
            }})</span
          >
        </p>
        <p v-if="itemValue.awards[0] && itemValue.awards[1]">
          <span
            ><img
              :src="require(`../../../assets/${itemValue.awards[0].icon}`)"
              alt="" /></span
          >+{{ itemValue.awards[0].text }}，<span
            ><img
              :src="require(`../../../assets/${itemValue.awards[1]?.icon}`)"
              alt="" /></span
          >+{{ itemValue.awards[1].text }}
        </p>
      </div>
      <div
        class="bottom-item-button"
        @click="getAward(itemValue.has_right, itemValue.condition)"
        :class="{
          'bottom-item-button-did': itemValue.has_right === 2,
          'bottom-item-button-unDid': itemValue.has_right === 0
        }"
      >
        {{
          itemValue.has_right === 0
            ? '去完成'
            : itemValue.has_right === 1
            ? '领取'
            : itemValue.has_right === 2
            ? '已领取'
            : ''
        }}
      </div>
      <!-- 每日重置 -->
      <!-- itemValue.is_daily -->
      <div v-if="itemValue.is_daily" class="reset">
        <img src="../../../assets/mk2_4.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'czItem',
  components: {},
  props: {
    itemValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 领取奖励
    getAward(flag, id) {
      if (flag === 1) {
        this.$emit('getAward', id)
      }
      if (flag === 0) {
        this.$emit('toRecharge')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.depositRebate-bottom-item {
  width: 332px;
  height: 66px;
  background: linear-gradient(-90deg, #caa7ff, #8d8ff9);
  box-shadow: 0px 3px 0px 0px #ffffff;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 12px;
  .reset {
    position: absolute;
    width: 61px;
    height: 34px;
    top: 0;
    right: 0;
    img {
      width: 100%;
    }
  }
  .bottom-item-left {
    margin-left: 11px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    p {
      font-size: 12px;
      color: #fff;
    }
    p:nth-child(1) {
      font-size: 15px;
      span {
        color: #fffaa6;
      }
    }
    p:nth-child(2) {
      width: fit-content;
      text-align: center;
      line-height: 24px;
      height: 24px;
      background-color: #6771cb;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      span {
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        img {
          vertical-align: middle;
          margin-right: 5px;
          height: 15px;
          // position: relative;
          // top: -2px;
        }
      }
    }
  }
  // 按钮
  // 领取
  .bottom-item-button {
    z-index: 100;
    position: absolute;
    top: 24px;
    right: 12px;
    width: 62px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    border-radius: 32px;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border: 1px solid #ffffff;

    color: #a9792c;
  }
  // 已领取
  .bottom-item-button-did {
    background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
    color: #fff !important;
  }
  // 去完成
  .bottom-item-button-unDid {
    background: linear-gradient(0deg, #cae7ff, #ffffff) !important;
    color: #4d7ddd !important;
  }
}
</style>
