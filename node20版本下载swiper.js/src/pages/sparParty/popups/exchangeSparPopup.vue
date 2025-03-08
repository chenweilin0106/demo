<template>
  <PopupBox title="title_1.png" @clickClose="clickClose">
    <!-- 剩余道具 -->
    <p class="remainingPoint flex align-center justify-center margin-row-center">
      剩余{{ pointName }}：{{ spar_point }}
    </p>

    <!-- 道具图标 -->
    <div class="promptIcon flex align-center justify-center" :class="goods_info.goods_type">
      <PublicImg :imgName="goods_info.icon" />
    </div>

    <!-- 道具名称 -->
    <p class="goodsName line-height-100 width-fit">{{ goods_info.nums }}</p>

    <!-- 计数器组件 -->
    <div class="counter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" /></p>
      <p class="input flex-center">{{ inputNum }}</p>
      <p class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></p>
      <p class="max" @click="changeNum('max', goods_info.price)">最大</p>
    </div>

    <!--绿晶石 紫晶石 科举卡 兑换按钮-->
    <div class="normalGoodsExchange margin-row-center w-100 position-relative flex align-center justify-between">
      <div class="line position-absolute w-100"></div>
      <div class="normalConsumeNumber flex align-center justify-center">
        共消耗：{{ goods_info?.price * inputNum }}
      </div>
      <div class="exchangeBtn" @click="onExchange">兑换</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/pages/sparParty/api'
import { _throttle } from '@/pages/sparParty/utils/tool'
export default {
  data() {
    return {
      goods_info: {}, //  商品信息
      spar_point: 0, // 积分
      inputNum: 1, // 数量
      stepNum: 1 // 步长
    }
  },
  props: ['pointName', 'id'],
  computed: {
    // 计数器加号按钮图标
    addIcon() {
      const { max_times } = this.goods_info
      if (!+max_times) {
        return this.inputNum < this.unLimit ? 'pop_2.png' : 'pop_2_1.png'
      } else {
        return this.inputNum < this.limitNum ? 'pop_2.png' : 'pop_2_1.png'
      }
    },
    // 计数器减号按钮图标
    reduceIcon() {
      return this.inputNum === 1 ? 'pop_1_1.png' : 'pop_1.png'
    },
    // 无限最大兑换数量（根据用户道具数量得出）
    unLimit() {
      return Math.floor(this.spar_point / this.goods_info.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limitNum() {
      const num = this.goods_info.max_times - this.goods_info.exchange_times
      return num > this.unLimit ? this.unLimit : num
    }
  },
  async created() {
    const res = await getPageData({ type: 'spar_detail', mark: this.id })
    if (res.errno) return this.$toast(res.errmsg)
    Object.assign(this, res.data)
  },
  methods: {
    onExchange: _throttle(async function () {
      const res = await getPageData({ type: 'spar_exchange', mark: { id: this.goods_info.id, nums: this.inputNum } })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('update', res.data)
      this.clickClose()
    }),
    // 最大或者最小结算
    changeNum(type) {
      if (type === 'min') {
        this.inputNum = 1
        // this.$emit('update:inputNum', 1)
      } else {
        /**
         * 如果是无限兑换，兑换次数为0，说明一次都不够，那么就等于1
         * 道具足够，判断是否有最大次数，判断标准为max_times（0，无限兑换，其余皆有限）
         * 如果有最大次数，那么就等于limit_num
         * 如果没有最大次数，那么就等于unlimite_num
         */
        this.inputNum = this.unLimit == 0 ? 1 : this.goods_info.max_times == 0 ? this.unLimit : this.limitNum
        // this.$emit('update:inputNum', this.unLimit == 0 ? 1 : this.dialogData.max_times == 0 ? this.unLimit : this.limitNum)
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit = this.goods_info.max_times != 0 ? this.limitNum : this.unLimit
      // 如果是减少，那么只有大于1才能减少
      if (type == 'reduce' && this.inputNum > 1) {
        // 如果低于1，那么就等于1
        if (this.inputNum <= this.stepNum) {
          this.inputNum = 1
          // this.$emit('update:inputNum', 1)
        } else {
          // 否则就是正常减少
          this.inputNum = this.inputNum - this.stepNum
          // this.$emit('update:inputNum', this.inputNum - this.stepNum)
        }
        // 如果是增加，那么只有小于最大数量才能增加
      } else if (type == 'add' && this.inputNum < limit) {
        // 如果超过最大数量，那么就等于最大数量
        if (this.inputNum + this.stepNum > limit) {
          this.inputNum = limit
          // this.$emit('update:inputNum', limit)
        } else {
          // 否则就是正常增加
          this.inputNum = this.inputNum + this.stepNum
          // this.$emit('update:inputNum', this.inputNum + this.stepNum)
        }
      }
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.counter {
  width: 432px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #1b4e8b;
    padding: 5px;
    height: 48px;
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
    color: #f7f26a;
    padding: 0 !important;
  }
}
// 剩余道具
.remainingPoint {
  font-size: 32px;
  color: #fff; // 剩余数量字体颜色 需要更新
  font-weight: 500;
}
// 商品图标
.promptIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  background: linear-gradient(0deg, #2f3f95, #083160);
  margin: 25px auto 10px;
  box-shadow: inset 0 0 5px 3px #fff;
}
// 商品名称
.goodsName {
  margin: 20px auto 27px;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
}
// 预计消耗数量 称号 头饰 座驾 声波 聊天气泡 主页特效
.consumeNumber {
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
}
// 绿晶石 紫晶石 科举卡 兑换按钮
.normalGoodsExchange {
  margin-top: 23px;
  width: 600px;
  padding: 32px 30px 3px; // padding-top: 2px 去除line占的高度 让元素居中
  //height: 129px;
  .line {
    top: 0;
    left: 0;
    width: 576px;
    height: 2px;
    background: #96E4FD;
  }
  .normalConsumeNumber {
    font-weight: 500;
    font-size: 32px;
    color: #ffffff;
  }
  .exchangeBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 135px;
    height: 60px;
    font-size: 28px;
    line-height: 100%;
    color: #fff;
    background: url('@/pages/sparParty/assets/btn_2.png') no-repeat left
    top/100% 100%;
  }
}
</style>
