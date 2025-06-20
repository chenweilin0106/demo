<template>
  <PopupBox title="tk_title_5.png" @clickClose="clickClose">
    <div class="remainingPoint flex align-center justify-center margin-row-center">剩余积分<img v-if="pointIcon" class="pointIcon" :src="IconPath(pointIcon)" />：{{coinsNum}}</div>
    <div class="promptIcon flex align-center justify-center position-relative  margin-row-center" :class="config.type">
      <!-- <div v-if="typeToNameMap[config.goods.type]" class="typeLabel">{{typeToNameMap[config.goods.type]}}</div> -->
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
      <PublicButton hasRight="6" class="exchange" @click="exchange">兑换</PublicButton>
    </div>
    <!--<div class="consumeNumber w-100 flex align-center justify-center line-height-100">-->
    <!--  共消耗<img v-if="pointIcon" class="pointIcon" :src="IconPath(pointIcon)" />：{{ config.price * inputNum }}-->
    <!--</div>-->
    <!--<PublicButton hasRight="1" class="heroStoneButton" @click="exchange">兑换</PublicButton>-->
    <!--<div class="buttons flex justify-center">-->
    <!--  <PublicButton hasRight="0" class="cancel" @click="clickClose">取消</PublicButton>-->
    <!--  <PublicButton hasRight="4" class="exchange" @click="exchange">确认</PublicButton>-->
    <!--</div>-->
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
// import { mapState } from 'vuex'

export default {
  props: ['config', 'coinsNum'],
  data() {
    return {
      pointIcon: 'jf_60_60.png', // 积分图标
      stepNum: 1, // 增加/减少 间隔
      inputNum: 1 // 数量
    }
  },
  computed: {
    // ...mapState(['typeToNameMap']),
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
      const res = await getPageData({ type: 'year_party_buy_level', mark: this.inputNum })
      if (res.errno) return this.$toast(res.errmsg)
      this.$emit('update', res.data.level)
      this.clickClose()
    }),
    // 添加或减少数量
    onCounter(type) {
      if (type == 'reduce') {
        if (this.inputNum == this.stepNum) return
        this.inputNum = this.inputNum - this.stepNum
      } else if (type == 'add') {
        const limit = this.noMaxTimes ? this.limitNum : this.noLimitNum
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
    background: #874124; /*todo 计数器背景色*/
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
    color: #fffaa6;
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
  width: 144px;
  height: 144px;
  background: #fff;
  margin-top: 40px;
  padding: 4px;
  // .typeLabel{
  //   position: absolute;
  //   z-index: 1;
  //   transform: translateY(-50%);
  //   top: 0;
  //   right: -20px; /*角标距离右边距离*/
  //   width: 101px;
  //   height: 29px;
  //   background: #000;
  //   border-radius: 14px;
  //   font-size: 18px; /*角标字体大小*/
  //   color: #FFFFFF; /*角标字体颜色*/
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   line-height: 100%;
  // }
  // 称号 私聊气泡 公屏气泡
  &.title,.chat_bubble,.chat_bubble_pub{
    width: 180px + $borderWidth * 2;
  }
}
// 商品名称
.goodsName{
  margin: 22px auto 27px;
  font-weight: 500;
  font-size: 28px;
  color: #874124;
}
// 兑换按钮上下间距
$gap: 33px;
::v-deep .popupContent{
  padding-bottom: $gap;
}
// 绿晶石 紫晶石 科举卡 兑换按钮
.counterExchange{
  margin-top: 32px;
  padding: $gap + 2px 31px 0; // 2px 为line占的高度
  width: 100%;
  .line{
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #E8B06F;
  }
  .counterConsume{
    font-weight: 500;
    font-size: 32px;
    color: #874124;
  }
  .exchange{
    width: 124px;
    height: 64px;
    font-weight: 500;
    font-size: 32px;
  }
}
//.buttonMargin{
//  margin: 30px auto 0;
//}
//.consumeNumber{
//  margin: 20px 0;
//  font-size: 32px;
//  color: #1A79D2;
//}
//// 召唤石 兑换按钮
//.heroStoneButton{
//  @extend .buttonMargin;
//  width: 246px;
//  height: 78px;
//  font-size: 32px;
//}
//.exchange{
//  width: 246px;
//  height: 78px;
//}
//.cancel{
//  margin-right: 18px;
//  width: 246px;
//  height: 78px;
//}
</style>
