<template>
  <div class="DialogCounter">
    <!-- 计数器 -->
    <div class="counter" v-if="showCounter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')">
        <img :src="IconPath(reduceIcon)" />
      </p>
      <p class="input flex_across">{{ inputNum }}</p>
      <p class="add" @click="onCounter('add')">
        <img :src="IconPath(addIcon)" />
      </p>
      <p class="max" @click="changeNum('max', goods_detail.need)">最大</p>
    </div>
    <!-- 特殊结算 -->
    <div class="flex_across special_billing" v-if="showSpecialBilling">
      共消耗<img class="my_present_nums_box" :src="IconPath(CounterIcon)" />：{{
        goods_detail?.need * inputNum
      }}
    </div>
  </div>
</template>

<script>
/**
 * @name DialogCounter
 * @description: 玩趣集市专属弹框计数器
 *
 * @prop {Number} inputNum 计数器基础数值
 * @prop {Number} stepNum 加减数值
 * @prop {Object} goods_detail 奖励信息
 * @prop {Number} my_goods 我所拥有的道具数量
 * @prop {Boolean} showCounter 是否显示计数器
 * @prop {Boolean} showSpecialBilling 是否特殊结算（显示共消耗多少道具,计算器下方显示共消耗多少道具）
 * @prop {String} CounterIcon 底部结算左侧道具图标
 */
export default {
  name: 'DialogCounter',
  mounted() {
    console.log(this.goods_detail, this.inputNum)
  },
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
    goods_detail: {
      type: Object,
      default: () => {}
    },
    // 我所拥有的道具数量
    my_goods: {
      type: Number,
      default: 0
    },
    // 是否显示计数器
    showCounter: {
      type: Boolean,
      default: true
    },
    // 是否显示特殊结算（显示共消耗多少道具,计算器下方显示共消耗多少道具）
    showSpecialBilling: {
      type: Boolean,
      default: false
    },
    // 道具图标（底部结算左侧图标）
    CounterIcon: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 计数器加号按钮图标
    addIcon() {
      const { max } = this.goods_detail
      if (!+max) {
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
      return Math.floor(this.my_goods / this.goods_detail.need)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limit_num() {
      const num = this.goods_detail.max - this.goods_detail.finish_times
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
        this.$emit(
          'update:inputNum',
          this.unlimite_num == 0
            ? 1
            : this.goods_detail.max == 0
            ? this.unlimite_num
            : this.limit_num
        )
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit =
        this.goods_detail.max != 0 ? this.limit_num : this.unlimite_num
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
  margin-top: 27px;
  margin-bottom: 10px;

  // 弹框计数器
  .counter {
    padding: 0 44px;
    display: flex;
    justify-content: center;

    > p {
      color: #ffffff;
      background: #7d2a4f;
      padding: 10px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 18px;

      &:nth-of-type(1) {
        margin-left: 0;
      }
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
      // height: 100%;
      font-size: 36px;
      // color: $dialog_counter_input_color;
      padding: 0 !important;
    }
  }
  // 特殊结算
  .special_billing {
    margin-top: 20px;
    width: 100%;
    color: #fff;
    font-size: 32px;
    > img {
      height: 50px;
      margin: 0 4px;
    }
  }
  // 特殊结算按钮
  .special_billing_btn {
    margin: 20px auto 40px;
    width: 320px;
    height: 72px;
    border-radius: 36px;
    font-size: 32px;
  }
  // 结算部分
  .billing {
    margin-top: 23px;
    border-top: 2px solid #fff;
    padding: 30px 30px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    color: #ffffff;

    > p {
      flex: 1;
      text-align: left;
      display: flex;
      align-items: center;

      > img {
        height: 42px;
        // margin: 0 0px;
      }
    }

    > .button {
      width: 124px;
      height: 64px;
      // border: 2px solid #ffffff !important;
      border-radius: 64px;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
