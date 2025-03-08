<template>
  <div class="DialogCounter">
    <!-- 计数器 -->
    <div class="counter" v-if="showCounter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')">
        <img :src="IconPath(reduceIcon)" alt="" />
      </p>
      <p class="input flex_across">{{ goods_detail.goods_id > 2 ? inputNum : inputNum * 5 }}</p>
      <p class="add" @click="onCounter('add', goods_detail_static.price)">
        <img :src="IconPath(addIcon)" alt="" />
      </p>
      <p class="max" @click="changeNum('max', goods_detail_static.price)">最大</p>
    </div>
    <!-- 特殊结算 -->
    <div class="flex_across special_billing" v-if="showSpecialBilling">
      共消耗<img class="my_present_nums_box" :src="IconPath(CounterIcon)" alt="" />：{{ goods_detail_static?.price * inputNum
      }}
    </div>
    <!-- 特殊结算 合成按钮 -->
    <div class="theme_botton_did special_billing_btn" v-if="showSpecialBillingButton" @click="dialogExcharge">
      {{ buttonText }}
    </div>
    <!-- 结算 -->
    <div class="billing" v-if="showBilling">
      <p>
        共消耗<img class="my_present_nums_box" :src="IconPath(CounterIcon)" alt="" />：{{ goods_detail_static?.price *
          inputNum }}
      </p>
      <!-- 兑换按钮 -->
      <div class="theme_botton_did button" @click="dialogExcharge">
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
 * @prop {Number} inputNum 计数器数值
 * @prop {Object} goods_detail 奖励信息
 * @prop {Number} credit_nums 我所拥有的道具数量
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
    // 计数器数值
    inputNum: {
      type: Number,
      default: 1
    },
    // 奖励信息
    goods_detail: {
      type: Object,
      default: () => { }
    },
    // 静态奖励信息
    goods_detail_static: {
      type: Object,
      default: () => { }
    },
    // 我所拥有的道具数量
    credit_nums: {
      // type: Number,
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
    // 计数器加号按钮
    addIcon() {
      const max_times = +this.goods_detail.max_times
      const finish_times = +this.goods_detail.finish_times
      if (!max_times) {
        return this.inputNum <
          Math.floor(this.credit_nums / this.goods_detail_static.price)
          ? 'pop_2.png'
          : 'pop_2_1.png'
      } else if (max_times > finish_times + this.inputNum) {
        return 'pop_2.png'
      } else {
        return 'pop_2_1.png'
      }
    },
    // 计数器减号按钮
    reduceIcon() {
      return this.inputNum === 1 ? 'pop_1_1.png' : 'pop_1.png'
    }
  },
  methods: {
    // 最大或者最小
    changeNum(type, price) {
      console.log(this.goods_detail)
      if (type === 'min') {
        this.$emit('update:inputNum', 1)
      } else {
        // 获取最多能换的数量（根据拥有的道具）
        const re1 = Math.floor(this.credit_nums / price)
        // 获取剩余可换的数量（根据当前奖励的最大兑换数量）
        const re =
          this.goods_detail.max_times - this.goods_detail.finish_times
        // 如果最大兑换数量为0，那么就是无限兑换
        if (this.goods_detail.max_times == 0) {
          // 如果可兑换的数量小于等于0，那么就是1
          if (re1 == 0) {
            return this.$emit('update:inputNum', 1)
          } else {
            return this.$emit('update:inputNum', re1)
          }
        }
        this.$emit('update:inputNum', re1 == 0 ? 1 : re1 > re ? re : re1)
      }
    },
    // 添加或减少数量
    onCounter(type, price) {
      // 获取最多能换的数量（根据拥有的道具）
      const re1 = Math.floor(this.credit_nums / price)
      let re = re1
      // 如果有最大数量限制，那么就获取剩余可换的数量（根据当前奖励的最大兑换数量）
      if (this.goods_detail.max_times != 0) {
        re = this.goods_detail.max_times - this.goods_detail.finish_times
      }
      // 如果是减少，那么只有大于1才能减少
      if (type == 'reduce' && this.inputNum > 1) {
        this.$emit('update:inputNum', this.inputNum - 1)
        // 如果是增加，那么只有小于最大数量才能增加
      } else if (type == 'add' && this.inputNum < re && this.inputNum < re1) {
        this.$emit('update:inputNum', this.inputNum + 1)
      }
    },
    // 弹框兑换
    dialogExcharge() {
      this.$emit('dialogExcharge')
    }
  }
}
</script>

<style scoped lang="scss">
.theme_botton_did {
  width: 60px;
  height: 30px;
  background: linear-gradient(0deg, #CAE7FF, #FFFFFF) !important;
  border: 2px solid #FFFFFF !important;
  border-radius: 15px;
  // border: 1px solid red;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #4D7DDD!important;
}

.DialogCounter {
  margin-top: 8px;
  margin-bottom: 5px;

  // 弹框计数器
  .counter {
    padding: 0 22px;
    display: flex;
    justify-content: space-evenly;

    >p {
      color: #ffffff;
      background: #6877F0;
      padding: 5px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      // border: 1px solid red;
    }

    .reduce,
    .add {
      width: 24px;

      >img {
        width: 14px;
      }
    }

    .input {
      width: 60px;
      // height: 100%;
      font-size: 18px;
      // color: $dialog_counter_input_color;
      padding: 0 !important;
    }
  }

  // 特殊结算
  .special_billing {
    margin-top: 10px;
    width: 100%;
    color: #fff;
    font-size: 14px;

    >img {
      height: 18px;
      margin: 0 2px;
    }
  }

  // 特殊结算按钮
  .special_billing_btn {
    margin: 10px auto 20px;
    width: 160px;
    height: 36px;
    border-radius: 18px;
    font-size: 16px;
  }

  // 结算部分
  .billing {
    margin-top: 10px;
    border-top: 2px solid #fff;

    padding: 15px 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #ffffff;

    >p {
      flex: 1;
      text-align: left;
      display: flex;
      align-items: center;

      >img {
        height: 18px;
        margin: 0 5px;
      }
    }

    >.button {
      width: 62px;
      height: 32px;
      // border: 2px solid #ffffff !important;
      border-radius: 32px;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
