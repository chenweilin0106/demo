<template>
  <div class="DialogCounter">
    <!-- 计数器 -->
    <div class="counter" v-if="showCounter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')">
        <img :src="IconPath(reduceIcon)" />
      </p>
      <p class="input flex-center">{{ inputNum }}</p>
      <p class="add" @click="onCounter('add')">
        <img :src="IconPath(addIcon)" />
      </p>
      <p class="max" @click="changeNum('max', goods_detail.price)">最大</p>
    </div>
    <!-- 特殊结算 -->
    <div class="flex-center special_billing" v-if="showSpecialBilling">
      共消耗<img :src="IconPath(CounterIcon)" />：{{
        goods_detail?.price * inputNum
      }}
    </div>
    <!-- 特殊结算 合成按钮 -->
    <div
      class="theme_botton_undid special_billing_btn"
      v-if="showSpecialBillingButton"
      @click="clickSettlement"
    >
      {{ buttonText }}
    </div>
    <!-- 结算 -->
    <div class="billing" v-if="showBilling">
      <p>
        共消耗<img :src="IconPath(CounterIcon)" />：{{
          goods_detail?.price * inputNum
        }}
      </p>
      <!-- 兑换按钮 -->
      <div class="button-noFinish button" @click="clickSettlement">
        {{ buttonText }}
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @name DialogCounter
 * @description: 弹框计数器
 *
 * @prop {Number} inputNum 计数器基础数值
 * @prop {Number} stepNum 加减数值
 * @prop {Object} goods_detail 奖励信息
 * @prop {Number} my_goods 我所拥有的道具数量
 * @prop {Boolean} showCounter 是否显示计数器
 * @prop {Boolean} showSpecialBilling 是否特殊结算（显示共消耗多少道具,计算器下方显示共消耗多少道具）
 * @prop {Boolean} showSpecialBillingButton 是否显示特殊结算按钮（一般配合特殊结算使用，在特殊结算下方）
 * @prop {Boolean} showBilling 是否显示底部结算（白色分割线，左侧图标、右下角按钮）
 * @prop {String} CounterIcon 底部结算左侧道具图标
 * @prop {String} buttonText 底部结算右侧钮文本
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
    // 是否显示特殊结算按钮（一般配合特殊结算使用，在特殊结算下方）
    showSpecialBillingButton: {
      type: Boolean,
      default: false
    },
    // 是否显示底部结算（白色分割线，左侧图标、右下角按钮）
    showBilling: {
      type: Boolean,
      default: true
    },
    // 道具图标（底部结算左侧图标）
    CounterIcon: {
      type: String,
      default: ''
    },
    // 底部结算按钮文本（底部结算右侧按钮）
    buttonText: {
      type: String,
      default: '兑换'
    }
  },
  computed: {
    // 计数器加号按钮图标
    addIcon() {
      const { max_times } = this.goods_detail
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
      return Math.floor(this.my_goods / this.goods_detail.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limit_num() {
      const num = this.goods_detail.max_times - this.goods_detail.exchange_times
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
            : this.goods_detail.max_times == 0
            ? this.unlimite_num
            : this.limit_num
        )
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit =
        this.goods_detail.max_times != 0 ? this.limit_num : this.unlimite_num
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
    },
    // 结算按钮
    clickSettlement() {
      this.$emit('clickSettlement')
    }
  }
}
</script>

<style scoped lang="scss">
.DialogCounter {
  margin-top: 16px;
  margin-bottom: 10px;

  // 弹框计数器
  .counter {
    padding: 0 44px;
    display: flex;
    justify-content: center;

    > p {
      color: #ffffff;
      background: #a253d9;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      white-space: nowrap;
      margin-left: 18px;

      &:nth-of-type(1) {
        margin-left: 0;
      }
    }

    .min,
    .max {
      width: 72px;
    }

    .reduce,
    .add {
      width: 48px;

      > img {
        width: 100%;
      }
    }

    .input {
      width: 120px;
      font-size: 36px;
      color: #fffaa6 !important;
    }
  }

  // 特殊结算
  .special_billing {
    margin-top: 28px;
    width: 100%;
    color: #fff;
    font-size: 32px;

    > img {
      width: 47px;
      height: 33px;
      margin: 0 3px 0 6px;
    }
  }

  // 特殊结算按钮
  .special_billing_btn {
    margin: 20px auto 40px;
    width: 328px;
    height: 80px;
    border-radius: 40px;
    font-size: 32px;
  }

  // 结算部分
  .billing {
    border-top: 2px solid #fff;
    margin: 23px 0 41px 5px;
    padding: 28px 29px 0 31px;
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
        width: 47px;
        height: 33px;
        margin: 0 5px;
      }
    }

    > .button {
      //margin-right: 10px;
      width: 126px;
      height: 66px;
      // border: 2px solid #ffffff !important;
      border-radius: 33px;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
