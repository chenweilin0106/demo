<template>
  <div class="DialogCounter">
    <p class="min" @click="changeNum('min')">最小</p>
    <p class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" /></p>
    <p class="input flex-center">{{ inputNum }}</p>
    <p class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></p>
    <p class="max" @click="changeNum('max', goodsInfo.price)">最大</p>
  </div>
</template>

<script>
/**
 * @name DialogCounter
 * @description: 弹框计数器
 *
 * @prop {Number} inputNum 计数器基础数值
 * @prop {Number} stepNum 加减数值
 * @prop {Object} goodsInfo 奖励信息
 * @prop {Number} pointNumber 我所拥有的道具数量
 */
export default {
  name: 'DialogCounter',
  props: {
    // 加减数值
    stepNum: {
      type: Number,
      default: 1
    },
    // 计数器基础数值
    inputNum: {
      type: Number,
      default: 1
    },
    // 奖励信息
    goodsInfo: {
      type: Object,
      default: () => {}
    },
    // 我所拥有的道具数量
    pointNumber: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 计数器加号按钮图标
    addIcon() {
      const { max_times } = this.goodsInfo
      if (!+max_times) {
        return this.inputNum < this.unlimite_num ? 'pop_2.png' : 'pop_2_1.png'
      } else {
        return this.inputNum < this.limit_num ? 'pop_2.png' : 'pop_2_1.png'
      }
    },
    // 计数器减号按钮图标
    reduceIcon() {
      return this.inputNum === 1 ? 'pop_1_1.png' : 'pop_1.png'
    },
    // 无限最大兑换数量（根据用户道具数量得出）
    unlimite_num() {
      return Math.floor(this.pointNumber / this.goodsInfo.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limit_num() {
      const num = this.goodsInfo.max_times - this.goodsInfo.exchange_times
      return num > this.unlimite_num ? this.unlimite_num : num
    }
  },
  methods: {
    // 最大或者最小结算
    changeNum(type) {
      if (type === 'min') {
        this.$emit('update:inputNum', 1)
      } else {
        /**
         * 如果是无限兑换，兑换次数为0，说明一次都不够，那么就等于1
         * 道具足够，判断是否有最大次数，判断标准为max_times（0，无限兑换，其余皆有限）
         * 如果有最大次数，那么就等于limit_num
         * 如果没有最大次数，那么就等于unlimite_num
         */
        this.$emit('update:inputNum', this.unlimite_num == 0 ? 1 : this.goodsInfo.max_times == 0 ? this.unlimite_num : this.limit_num)
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit = this.goodsInfo.max_times != 0 ? this.limit_num : this.unlimite_num
      // 如果是减少，那么只有大于1才能减少
      if (type == 'reduce' && this.inputNum > 1) {
        // 如果低于1，那么就等于1
        if (this.inputNum <= this.stepNum) {
          this.$emit('update:inputNum', 1)
        } else {
          // 否则就是正常减少
          this.$emit('update:inputNum', this.inputNum - this.stepNum)
        }
        // 如果是增加，那么只有小于最大数量才能增加
      } else if (type == 'add' && this.inputNum < limit) {
        // 如果超过最大数量，那么就等于最大数量
        if (this.inputNum + this.stepNum > limit) {
          this.$emit('update:inputNum', limit)
        } else {
          // 否则就是正常增加
          this.$emit('update:inputNum', this.inputNum + this.stepNum)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.DialogCounter {
  width: 432px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #426a88;
    padding: 5px;
    height: 48px;
    font-size: 28px;
  }

  .reduce,
  .add {
    width: 48px;
    padding: 0;

    > img {
      width: 100%;
    }
  }

  .input {
    width: 120px;
    font-size: 36px;
    color: #fffaa6;
    padding: 0 !important;
  }

  .min,
  .max {
    width: 72px;
  }
}
</style>
