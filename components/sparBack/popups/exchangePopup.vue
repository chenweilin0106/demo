<template>
  <PopupBox title="兑换好礼" @clickClose="clickClose">
    <div class="remainingPoint flex align-center justify-center margin-row-center">剩余积分<img v-if="pointIcon" class="pointIcon" :src="IconPath(pointIcon)" alt="" />：{{ coinsNum }}</div>
    <div class="promptIcon flex align-center justify-center position-relative">
      <PublicImg :imgName="config.icon" :imgType="config.type" />
    </div>
    <div class="goodsName line-height-100 width-fit">{{ config.text }}</div>
    <div class="counter">
      <div class="min" @click="onCounter('min')">最小</div>
      <div class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" alt="" /></div>
      <div class="input flex-center">{{ inputNum }}</div>
      <div class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" alt="" /></div>
      <div class="max" @click="onCounter('max')">最大</div>
    </div>
    <div class="counterExchange margin-row-center position-relative flex align-center justify-between">
      <div class="line position-absolute w-100"></div>
      <div class="counterConsume flex align-center justify-center">
        共消耗<img v-if="pointIcon" class="pointIcon" :src="IconPath(pointIcon)" alt="" />：{{ config.price * inputNum }}
      </div>
      <div class="exchange" @click="exchange">兑换</div>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'

export default {
  props: ['config', 'coinsNum'],
  data() {
    return {
      pointIcon: '', // 积分图标
      stepNum: 1, // 增加/减少 间隔
      inputNum: 1 // 数量
    }
  },
  computed: {
    // 是否无限兑换
    noMaxTimes() {
      return this.config.max_times == -1
    },
    // 无限最大兑换数量（根据用户道具数量得出）
    noLimitNum() {
      return Math.floor(+this.coinsNum / this.config.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limitNum() {
      const num = this.config.max_times - this.config.exchange_times
      return num > this.noLimitNum ? this.noLimitNum : num
    },
    // 计数器加号按钮图标
    addIcon() {
      return this.inputNum < (this.noMaxTimes ? this.noLimitNum : this.limitNum) ? 'pop_2.png' : 'pop_2_1.png'
    },
    // 计数器减号按钮图标
    reduceIcon() {
      return this.inputNum == this.stepNum ? 'pop_1_1.png' : 'pop_1.png'
    }
  },
  methods: {
    // 兑换
    exchange: _throttle(async function () {
      const res = await getPageData({ type: 'spar_exchange', mark: { id: this.config.id, nums: this.inputNum } })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('update', res.data)
      this.clickClose()
    }),
    // 添加或减少数量
    onCounter(type) {
      if (type == 'reduce') {
        if (this.inputNum == this.stepNum) return
        this.inputNum = this.inputNum - this.stepNum
      } else if (type == 'add') {
        const limit = this.noMaxTimes ? this.noLimitNum : this.limitNum
        const num = this.inputNum + this.stepNum
        if (num > limit) return
        this.inputNum = num
      } else if (type == 'min') {
        this.inputNum = this.stepNum
      } else {
        this.inputNum = this.noLimitNum == 0 ? this.stepNum : this.noMaxTimes ? this.noLimitNum : this.limitNum
      }
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.pointIcon{
  width: auto;
  height: 31px;
  margin: 0 5px;
}
.counter{
  width: 432px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  > div{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: #B18549;
    padding: 5px;
    height: 48px;
    font-size: 28px;
  }
  .reduce,.add{
    width: 48px;
    padding: 0;
    > img{
      width: 100%;
    }
  }
  .input{
    width: 120px;
    font-size: 36px;
    color: #F7F26A;
    padding: 0 !important;
  }
  .min,.max{
    width: 72px;
  }
}
.remainingPoint{
  font-size: 32px;
  color: #FFFFFF;
  font-weight: 500;
}
.promptIcon{
  width: 128px;
  height: 128px;
  background: #FFFFFF;
  margin: 29px auto 20px;
  border-radius: 16px;
  border: 4px solid #FFFEC9;
}
.goodsName{
  margin: 0 auto 27px;
  font-size: 28px;
  color: #FFFFFF;
}
.counterExchange{
  margin-top: 23px;
  padding: 35px 31px 0; // padding-top: 2px 去除line占的高度 让元素居中
  width: 608px;
  .line{
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fff;
  }
  .counterConsume{
    font-weight: 500;
    font-size: 32px;
    color: #FFFFFF;
    line-height: 1;
  }
  .exchange{
    width: 126px;
    height: 66px;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    border: 3px solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    color: #ED7030;
    background-image: linear-gradient(0deg, #FDF2C1, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
  }
}
</style>
