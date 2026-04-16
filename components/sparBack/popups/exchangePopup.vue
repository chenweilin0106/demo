<template>
  <PopupBox title="title_7.png" @clickClose="clickClose">
    <div class="remainingPoint flex align-center justify-center margin-row-center">剩余积分<img v-if="pointIcon" class="pointIcon" :src="IconPath(pointIcon)" />：{{coinsNum}}</div>
    <div class="promptIcon flex align-center justify-center position-relative">
      <PublicImg :imgName="config.icon" :imgType="config.type" />
    </div>
    <div class="goodsName line-height-100 width-fit">{{config.text}}</div>
    <div class="counter">
      <div class="min" @click="onCounter('min')">最小</div>
      <div class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" /></div>
      <div class="input flex-center">{{inputNum}}</div>
      <div class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></div>
      <div class="max" @click="onCounter('max')">最大</div>
    </div>
    <div class="counterExchange margin-row-center position-relative flex align-center justify-between">
      <div class="line position-absolute w-100"></div>
      <div class="counterConsume flex align-center justify-center">
        共消耗<img v-if="pointIcon" class="pointIcon" :src="IconPath(pointIcon)" />：{{config.price*inputNum}}
      </div>
      <PublicButton hasRight="7" class="exchange" @click="exchange">兑换</PublicButton>
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
    background: #E0B053; /*todo 计数器背景色*/
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
// 剩余道具
.remainingPoint{
  font-size: 32px;
  color: #874124; /*todo 剩余数量字体颜色*/
  font-weight: 500;
}
$borderWidth: 4px; /*todo 边框大小*/
// 商品图标
.promptIcon{
  width: 124px;
  height: 124px;
  background: #FFEDE8;
  margin: 38px auto 22px;
  border-radius: 16px;
  border: 2px solid #FFC7BB;
}
// 商品名称
.goodsName{
  margin: 0 auto 27px;
  font-weight: 500;
  font-size: 28px;
  color: #AF7612;
}
// 兑换按钮上下间距
$gap: 33px;
::v-deep .popupContent{
  padding-bottom: $gap;
}
// 绿晶石 紫晶石 科举卡 兑换按钮
.counterExchange{
  margin-top: 23px;
  padding: $gap + 2px 31px 0; // padding-top: 2px 去除line占的高度 让元素居中
  width: 100%;
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
    color: #874124;
    line-height: 1;
  }
  .exchange{
    width: 124px;
    height: 64px;
    font-size: 32px;
  }
}
</style>
