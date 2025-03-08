<template>
  <PopupBox title="title_1.png" @clickClose="clickClose">
    <!-- 剩余道具 -->
    <p class="remainingPoint flex align-center justify-center margin-row-center">
      剩余{{ pointName }}<img class="goodsIcon" :src="IconPath(pointIcon)" /> ：{{ my_goods }}
    </p>

    <!-- 道具图标 -->
    <div class="promptIcon flex align-center justify-center" :class="dialogData.goods_type">
      <PublicImg :imgName="dialogData.goods_icon_t" :imgType="dialogData.goods_type" />
    </div>

    <!-- 道具名称 -->
    <p class="goodsName line-height-100 width-fit">{{ dialogGoodsName }}</p>

    <!--预计消耗数量 称号 头饰 座驾 声波 聊天气泡 主页特效-->
    <p v-if="isSeniorExchange" class="consumeNumber width-fit line-height-100 margin-row-center flex align-center justify-center">
      消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price }}
    </p>

    <!-- 计数器组件 -->
    <div v-if="showCounter" class="counter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" /></p>
      <p class="input flex-center">{{ inputNum }}</p>
      <p class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></p>
      <p class="max" @click="changeNum('max', dialogData.price)">最大</p>
    </div>

    <!--绿晶石 紫晶石 科举卡 兑换按钮-->
    <div v-if="isNormalExchange" class="normalGoodsExchange margin-row-center w-100 position-relative flex align-center justify-between">
      <div class="line position-absolute w-100"></div>
      <div class="normalConsumeNumber flex align-center justify-center">
        共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price * inputNum }}
      </div>
      <PublicButton hasRight="0" class="exchangeBtn" @click="onExchange">兑换</PublicButton>
    </div>

    <!--召唤石-->
    <template v-else-if="isHeroStone">
      <!--共消耗-->
      <div class="heroStoneConsumeNumber width-fit flex align-center justify-between line-height-100 margin-row-center">
        共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price * inputNum }}
      </div>
      <!--兑换按钮-->
      <PublicButton hasRight="1" class="heroStoneButton" @click="onExchange">兑换</PublicButton>
    </template>

    <!--称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮-->
    <div v-else-if="isSeniorExchange" class="seniorButtons flex align-center justify-center">
      <PublicButton hasRight="0" class="exchange" @click="onExchange(1)">
        <p>兑换</p>
      </PublicButton>
      <PublicButton hasRight="1" class="exchangeAndEquip" @click="onExchange(2)">
        <p>兑换并{{ equipObject[dialogData.goods_type] }}</p>
      </PublicButton>
    </div>

    <!--钥匙-->
    <template v-else-if="isKey">
      <!--特殊说明-->
      <p class="keyTip flex align-center justify-center line-height-100 width-fit margin-row-center">
        首个消耗50个<img class="goodsIcon" :src="IconPath(pointIcon)" />第二个半价
      </p>
      <!--兑换按钮-->
      <div class="keyButtons flex align-center justify-center">
        <PublicButton hasRight="0" class="exchangeOne flex-column" @click="onExchange(1)">
          <p class="row-1">兑1个</p>
          <p class="row-2 flex align-center justify-center">（消耗:<img :src="IconPath(pointIcon)" />{{ keyButtonText }}）</p>
        </PublicButton>
        <PublicButton v-if="showKeyButton" hasRight="1" class="exchangeTwo flex-column" @click="onExchange(2)">
          <p class="row-1">兑2个</p>
          <p class="row-2 flex align-center justify-center">
            （消耗:<img :src="IconPath(pointIcon)" />{{ dialogData.price / 2 + dialogData.price }}）
          </p>
        </PublicButton>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/pages/summerParty2024/api'
import { _throttle } from '@/pages/summerParty2024/utils/tool'
export default {
  data() {
    return {
      stepNum: 1, // 增加/减少 间隔
      equipObject: Object.freeze({
        title: '佩戴',
        mic: '装扮',
        voice: '装扮',
        car: '装备',
        costume: '装扮',
        chat_bubble: '装扮'
      }), // 装扮按钮文本对象
      settlement: {}, // 兑换表单数据
      dialogData: {
        // type: 'car_cfplh',
        // goods_name: '乘风破浪号',
        // goods_type: 'car',
        // goods_id: 58,
        // goods_num: 7,
        // price: 300,
        // price_text: '300',
        // max_times: 1,
        // goods_icon: 'cfplh_120_120.png',
        // goods_icon_t: 'cfplh_120_120.png',
        // goods_num_text: '座驾+7天',
        // is_owned: false,
        // is_lock: false,
        // exchange_times: 0,
        // has_right: 1
      }, // 弹框数据
      inputNum: 1 // 数量
    }
  },
  props: ['pointIcon', 'pointName', 'my_goods', 'type'],
  computed: {
    // 计数器加号按钮图标
    addIcon() {
      if (!+this.dialogData.max_times) {
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
      return Math.floor(this.my_goods / this.dialogData.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limitNum() {
      const num = this.dialogData.max_times - this.dialogData.exchange_times
      return num > this.noLimit ? this.noLimit : num
    },
    // 绿晶石 紫晶石 科举卡 兑换按钮
    isNormalExchange() {
      return ['tools', 'keju'].some((item) => this.dialogData.type?.startsWith(item))
    },
    // 称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮
    isSeniorExchange() {
      return Object.keys(this.equipObject).includes(this.dialogData.goods_type)
    },
    // 钥匙 左按钮文字
    keyButtonText() {
      return this.dialogData.is_second_half ? this.dialogData.price / 2 : this.dialogData.price
    },
    // 钥匙 右按钮显隐
    showKeyButton() {
      return this.dialogData.exchange_times == 0
    },
    // 弹框内道具名称
    dialogGoodsName() {
      const { goods_type, goods_name, goods_num, goods_num_text } = this.dialogData
      if (goods_type == 'keys') return goods_num_text
      if (['mic', 'car', 'costume', 'voice'].includes(goods_type)) return `${goods_name}+${goods_num}天`
      return goods_name
    },
    // 召唤石
    isHeroStone() {
      return this.dialogData.type == 'hero_tools_zhs'
    },
    // 钥匙
    isKey() {
      return this.dialogData.type == 'lucky_key'
    },
    // 计数器显示逻辑
    showCounter() {
      return this.isNormalExchange || this.isHeroStone
    }
  },
  async created() {
    const res = await getPageData({ type: 'goods_detail', mark: this.type })
    if (res.errno) return this.$toast(res.errmsg)
    this.settlement = {}
    this.inputNum = 1
    this.dialogData = res.data.goods_detail
    this.settlement['mark[id]'] = this.dialogData.type
  },
  methods: {
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    onExchange: _throttle(async function (num) {
      const goodsType = this.dialogData.goods_type
      let res = {}
      if (this.isSeniorExchange) {
        res = await this.seniorExchange(goodsType, num) // 高级道具兑换
      } else if (this.isKey) {
        this.settlement.type = 'exchange_lucky_key' // 钥匙兑换
        res = await this.keyExchange(num)
      } else if (this.isHeroStone) {
        res = await this.heroStoneExchange() // 召唤石兑换
      } else {
        this.settlement.type = 'exchange_goods_new' // 绿晶石 紫晶石 科举卡 兑换
        this.settlement['mark[nums]'] = this.inputNum
        res = await getPageData(this.settlement)
      }
      this.$toast(res.errmsg)
      this.$emit('update', res.data)
      this.clickClose()
    }, 1000),
    // 高级道具 兑换
    async seniorExchange(goodsType, num) {
      let res = {}
      if (num == 2) {
        res = await getPageData({
          type: 'exchange_and_equip_goods',
          mark: this.dialogData.type
        }) // 兑换并装扮
      } else {
        this.settlement['mark[nums]'] = this.inputNum // 只兑换
        this.settlement.type = 'exchange_goods_new'
        res = await getPageData(this.settlement)
      }
      return res
    },
    // 钥匙 兑换
    async keyExchange(num) {
      this.settlement.mark = num
      const res = await getPageData(this.settlement)
      return res
    },
    // 召唤石 兑换
    async heroStoneExchange() {
      this.settlement.type = 'exchange_goods_new'
      this.settlement['mark[nums]'] = this.inputNum
      const res = await getPageData(this.settlement)
      return res
    },
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
        this.inputNum = this.noLimit == 0 ? 1 : this.dialogData.max_times == 0 ? this.noLimit : this.limitNum
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit = this.dialogData.max_times != 0 ? this.limitNum : this.noLimit
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
    background: #317EDC; /*todo 计数器背景色*/
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
// 道具图标类名
.goodsIcon {
  margin: 0 5px;
  width: 42px; /*todo 剩余道具图标宽度*/
  height: 37px; /*todo 剩余道具图标高度*/
}
// 剩余道具
.remainingPoint {
  font-size: 32px;
  color: #0468E3; /*todo 剩余数量字体颜色*/
  font-weight: 500;
}
// 商品图标
.promptIcon {
  width: 128px;
  height: 128px;
  background: #fff; /*todo 图片背景色*/
  border: 4px solid #FBE590; /*todo 边框颜色*/
  margin: 32px auto 10px;
  border-radius: 16px;
}
$moreWidth: 184px;
.title {
  width: $moreWidth;
}
// 座驾
.car {
  width: $moreWidth;
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
// 钥匙特殊说明
.keyTip {
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
}
// 召唤石 共消耗
.heroStoneConsumeNumber {
  margin-top: 20px;
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
    border-radius: 30px;
    font-weight: 500;
    font-size: 32px;
  }
}
.buttonMargin {
  margin: 30px 0 3px;
}
// 召唤石 兑换按钮
.heroStoneButton {
  @extend .buttonMargin;
  width: 246px;
  height: 78px;
  border-radius: 39px;
  font-size: 32px;
}
// 称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮
.seniorButtons {
  @extend .buttonMargin;
  .seniorBtn {
    width: 240px;
    height: 72px;
    border-radius: 36px;
    font-size: 32px;
  }
  .exchange,
  .exchangeAndEquip {
    @extend .seniorBtn;
    margin-left: 20px;
  }
  .exchangeAndEquip {
    margin-left: 20px;
  }
}
// 钥匙兑换按钮
.keyButtons {
  @extend .buttonMargin;
  img {
    width: 40px; /*todo 道具图标宽度*/
    height: 40px; /*todo 道具图标高度*/
  }
  .row-1 {
    font-size: 32px;
    margin-bottom: 5px;
  }
  .row-2 {
    font-size: 24px;
  }
  .keyExchangeBtn {
    width: 240px;
    height: 84px;
    border-radius: 42px;
  }
  .exchangeOne,
  .exchangeTwo {
    @extend .keyExchangeBtn;
  }
  .exchangeTwo {
    margin-left: 20px;
  }
}
</style>
