<template>
  <PopupBox title="title_1.png" size="3" @clickClose="clickClose">
    <!--剩余道具-->
    <p class="remainingPoint flex align-center justify-center margin-row-center">
      剩余金秋币<img class="coin" :src="IconPath('jqb_36_45.png')" /> ：{{ num }}
    </p>

    <!--道具图标-->
    <div class="promptIcon flex align-center justify-center position-relative">
      <div v-if="typeToNameMap[goods.type]" class="typeLabel">{{ typeToNameMap[goods.type] }}</div>
      <PublicImg :imgName="goods.icon" :imgType="goods.type" />
    </div>

    <!--道具名称-->
    <p class="goodsName line-height-100 width-fit">{{ goods.text }}</p>

    <!--计数器组件-->
    <div class="counter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" /></p>
      <p class="input flex-center">{{ inputNum }}</p>
      <p class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></p>
      <p class="max" @click="changeNum('max', goods.price)">最大</p>
    </div>

    <!--共消耗-->
    <div class="heroStoneConsumeNumber width-fit flex align-center justify-between line-height-100 margin-row-center">
      共消耗<img class="coin" :src="IconPath('jqb_36_45.png')" />：{{ goods.price * inputNum }}
    </div>
    <!--兑换按钮-->
    <PublicButton hasRight="1" class="heroStoneButton" @click="onExchange">兑换</PublicButton>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      stepNum: 1, // 增加/减少 间隔
      settlement: {}, // 兑换表单数据
      inputNum: 1 // 数量
    }
  },
  props: ['num', 'goods'],
  computed: {
    ...mapState(['typeToNameMap']),
    // 计数器加号按钮图标
    addIcon() {
      if (!+this.goods.max_times) {
        return this.inputNum < this.noLimit ? 'pop_2.png' : 'pop_2_1.png'
      } else {
        return this.inputNum < this.limitNum ? 'pop_2.png' : 'pop_2_1.png'
      }
    },
    // 计数器减号按钮图标
    reduceIcon() {
      return this.inputNum === 1 ? 'pop_1_1.png' : 'pop_1.png'
    },
    // 无限最大兑换数量（根据用户道具数量得出）
    noLimit() {
      return Math.floor(this.num / this.goods.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limitNum() {
      const num = this.goods.max_times - this.goods.exchange_times
      return num > this.noLimit ? this.noLimit : num
    }
  },
  methods: {
    // 兑换
    onExchange: _throttle(async function () {
      const res = await getPageData({ type: 'naughty_convert', 'mark[id]': this.goods.goods_id, 'mark[nums]': this.inputNum })
      if (res.errno) return this.$toast(res.errmsg)
      this.$emit('update', res.data)
      this.clickClose()
    }, 1000),
    // 最大或者最小结算
    changeNum(type) {
      if (type === 'min') {
        this.inputNum = 1
      } else {
        /**
         * 如果是无限兑换，兑换次数为0，说明一次都不够，那么就等于1
         * 道具足够，判断是否有最大次数，判断标准为max_times（0，无限兑换，其余皆有限）
         * 如果有最大次数，那么就等于limitNum
         * 如果没有最大次数，那么就等于noLimit
         */
        this.inputNum = this.noLimit == 0 ? 1 : this.goods.max_times == 0 ? this.noLimit : this.limitNum
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit = this.goods.max_times != 0 ? this.limitNum : this.noLimit
      // 如果是减少，那么只有大于1才能减少
      if (type == 'reduce' && this.inputNum > 1) {
        // 如果低于1，那么就等于1
        if (this.inputNum <= this.stepNum) {
          this.inputNum = 1
        } else {
          // 否则就是正常减少
          this.inputNum = this.inputNum - this.stepNum
        }
        // 如果是增加，那么只有小于最大数量才能增加
      } else if (type == 'add' && this.inputNum < limit) {
        // 如果超过最大数量，那么就等于最大数量
        if (this.inputNum + this.stepNum > limit) {
          this.inputNum = limit
        } else {
          // 否则就是正常增加
          this.inputNum = this.inputNum + this.stepNum
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
.coin {
  width: auto;
  height: 48px;
  margin: 0 5px;
}
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
    background: #E06224; /*todo 计数器背景色*/
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
// 剩余道具
.remainingPoint {
  font-size: 32px;
  color: #fff; /*todo 剩余数量字体颜色*/
  font-weight: 500;
}
$borderWidth: 4px; /*todo 边框大小*/
// 商品图标
.promptIcon {
  width: 128px;
  height: 128px;
  background: #fff; /*todo 图片背景色*/
  border: $borderWidth solid #E06224; /*todo 边框颜色*/
  margin: 32px auto 10px;
  border-radius: 16px;
  .typeLabel {
    position: absolute;
    z-index: 1;
    transform: translateY(-50%);
    top: 0;
    right: -8px; /*todo 角标距离右边距离*/
    padding: 0 8px;
    height: 28px;
    background: #B55023; /*todo 角标背景色*/
    border-radius: 14px;
    font-size: 18px; /*todo 角标字体大小*/
    color: #FFFFFF; /*todo 角标字体颜色*/
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
  }
}
// 称号 私聊气泡 公屏气泡
.title,.chat_bubble,.chat_bubble_pub {
  width: 180px + $borderWidth * 2;
}
// 商品名称
.goodsName {
  margin: 20px auto 27px;
  font-weight: 500;
  font-size: 28px;
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
    width: 100%;
    height: 2px;
    background: #ffffff;
  }
  .normalConsumeNumber {
    font-weight: 500;
    font-size: 32px;
    color: #ffffff;
  }
  .exchangeBtn {
    width: 120px;
    height: 60px;
    font-weight: 500;
    font-size: 32px;
  }
}
// 召唤石 共消耗
.heroStoneConsumeNumber {
  margin-top: 20px;
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
}
.buttonMargin {
  margin: 30px auto 0;
}
// 召唤石 兑换按钮
.heroStoneButton {
  @extend .buttonMargin;
  width: 246px;
  height: 78px;
  font-size: 32px;
}
</style>
