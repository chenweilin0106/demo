<template>
  <PopupBox title="title_1.png" @clickClose="clickClose">
    <!--剩余道具-->
    <p class="remainingPoint flex align-center justify-center margin-row-center">剩余{{pointName}}<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{my_goods}}</p>

    <!--道具图标-->
    <div class="promptIcon flex align-center justify-center position-relative margin-row-center" :class="goods_detail.goods_type">
      <!--<div v-if="typeToNameMap[goods_detail.goods_type]" class="typeLabel">{{typeToNameMap[goods_detail.goods_type]}}</div>-->
      <PublicImg :imgName="goods_detail.goods_icon_t" :imgType="goods_detail.goods_type" />
    </div>

    <!--道具名称-->
    <p class="goodsName line-height-1 width-fit">{{goods_detail.goods_num_text}}</p>

    <!--兑换数量要求大于1-->
    <template v-if="isCounterExchange">
      <div class="counter">
        <p class="min" @click="changeNum('min')">最小</p>
        <p class="reduce" @click="onCounter('reduce')"><img :src="IconPath(inputNum === 1 ? 'pop_1_1.png' : 'pop_1.png')" /></p>
        <p class="input line-height-1">{{inputNum}}</p>
        <p class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></p>
        <p class="max" @click="changeNum('max', goods_detail.price)">最大</p>
      </div>
      <div class="normalGoodsExchange margin-row-center w-100 position-relative flex align-center justify-between">
        <div class="line position-absolute w-100"></div>
        <div class="normalConsumeNumber flex align-center justify-center">共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{goods_detail.price*inputNum}}</div>
        <PublicButton hasRight="0" class="exchangeBtn" @click="onExchange">兑换</PublicButton>
      </div>
    </template>

    <!--装扮道具（兑换数量要求等于1）-->
    <template v-else-if="isSeniorExchange">
      <!--预计消耗数量-->
      <p class="consumeNumber width-fit line-height-1 margin-row-center flex align-center justify-center">消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{goods_detail.price}}</p>
      <!--兑换按钮-->
      <div class="seniorButtons flex align-center justify-center">
        <PublicButton hasRight="0" class="exchange" @click="onExchange(1)"><p>兑换</p></PublicButton>
        <PublicButton hasRight="1" class="exchangeAndEquip" @click="onExchange(2)"><p>兑换并{{nowEquipText[goods_detail.goods_type]}}</p></PublicButton>
      </div>
    </template>

    <!--钥匙-->
    <template v-else-if="goods_detail.type=='lucky_key'">
      <!--特殊说明-->
      <p class="keyTip flex align-center justify-center line-height-1 width-fit margin-row-center">首个消耗50个<img class="goodsIcon" :src="IconPath(pointIcon)" />第二个半价</p>
      <!--兑换按钮-->
      <div class="keyButtons flex align-center justify-center">
        <PublicButton hasRight="0" class="exchangeOne" @click="onExchange(1)">
          <p class="row-1 line-height-1">兑1个</p>
          <p class="row-2 line-height-1 flex align-center justify-center">（消耗:<img class="goodsIcon" :src="IconPath(pointIcon)" />{{goods_detail.exchange_times==0?goods_detail.price:goods_detail.price/2}}）</p>
        </PublicButton>
        <PublicButton v-if="goods_detail.exchange_times==0" hasRight="1" class="exchangeTwo" @click="onExchange(2)">
          <p class="row-1 line-height-1">兑2个</p>
          <p class="row-2 line-height-1 flex align-center justify-center">（消耗:<img class="goodsIcon" :src="IconPath(pointIcon)" />{{goods_detail.price/2+goods_detail.price}}）</p>
        </PublicButton>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { getPageData } from '@/api'

export default {
  data() {
    return {
      stepNum: 1, // 增加/减少 间隔
      form: { 'mark[id]': '', 'mark[nums]': '', type: '', mark: '' }, // 兑换表单数据
      inputNum: 1 // 数量
    }
  },
  props: ['goods_detail', 'my_goods', 'pointIcon', 'pointName'],
  computed: {
    ...mapState(['typeToNameMap', 'needNowEquipList', 'nowEquipText']),
    // 计数器加号按钮图标
    addIcon() {
      return !+this.goods_detail.max_times ? this.inputNum < this.noLimit ? 'pop_2.png' : 'pop_2_1.png' : this.inputNum < this.limitNum ? 'pop_2.png' : 'pop_2_1.png'
    },
    // 无限最大兑换数量（根据用户道具数量得出）
    noLimit() {
      return Math.floor(this.my_goods / this.goods_detail.price)
    },
    // 有限最大兑换数量（根据最大次数和用户道具数量得出）
    limitNum() {
      const num = this.goods_detail.max_times - this.goods_detail.exchange_times
      return num > this.noLimit ? this.noLimit : num
    },
    // 兑换数量要求大于1
    isCounterExchange() {
      return ['tools', 'keju', 'pretty_card'].some((item) => this.goods_detail.type?.startsWith(item)) || (this.canEquip && this.goods_detail.max_times > 1)
    },
    // 装扮道具（兑换数量要求等于1）
    isSeniorExchange() {
      return this.canEquip && this.goods_detail.max_times == 1
    },
    // 判断是否为装扮道具
    canEquip() {
      return this.needNowEquipList.includes(this.goods_detail.goods_type)
    }
  },
  async created() {
    this.form['mark[id]'] = this.goods_detail.type
  },
  methods: {
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    async onExchange(num) {
      if (this.isSeniorExchange && num == 2) {
        this.form.type = 'exchange_and_equip_goods' // 兑换并装扮
        this.form.mark = this.goods_detail.type
      } else if (this.goods_detail.type == 'lucky_key') {
        this.form.type = 'exchange_lucky_key' // 钥匙兑换
        this.form.mark = num
      } else {
        delete this.form.mark
        this.form['mark[nums]'] = this.inputNum // 兑换数量要求大于1/高级装扮只装扮
        this.form.type = 'exchange_goods_new'
      }
      const res = await getPageData(this.form)
      this.$toast(res.errmsg)
      if (!res.errno) this.$emit('exchangeSuccess', res.data)
      this.clickClose()
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
        this.inputNum = this.noLimit == 0 ? 1 : this.goods_detail.max_times == 0 ? this.noLimit : this.limitNum
      }
    },
    // 添加或减少数量
    onCounter(type) {
      const limit = this.goods_detail.max_times != 0 ? this.limitNum : this.noLimit
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
    background: #D56D9F; /*计数器背景色*/
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
  width: 46px; /*剩余道具图标宽度*/
  height: auto;
}
// 剩余道具
.remainingPoint {
  font-size: 32px;
  color: #FFFFFF; /*剩余数量字体颜色*/
  font-weight: 500;
}
$borderWidth: 4px; /*边框大小*/
// 商品图标
.promptIcon {
  width: 128px;
  height: 128px;
  background: #fff; /*图片背景色*/
  border: $borderWidth solid #FFBCDC; /*边框颜色*/
  margin-top: 40px;
  border-radius: 16px;
}
// 称号 私聊气泡 公屏气泡
.title,.chat_bubble,.chat_bubble_pub {
  width: 180px + $borderWidth * 2;
}
.chat_bubble,.chat_bubble_pub{
  .imgCompo{
    width: 210px;
    height: 180px;
  }
}
// 商品名称
.goodsName {
  margin: 22px auto 27px;
  font-weight: 500;
  font-size: 28px;
  color: #FFFFFF;
}
// 预计消耗数量 称号 头饰 座驾 声波 聊天气泡 主页特效
.consumeNumber {
  font-weight: 500;
  font-size: 32px;
  color: #FFFFFF;
}
// 钥匙特殊说明
.keyTip {
  font-weight: 500;
  font-size: 28px;
  color: #FFFFFF;
}
// 兑换按钮上下间距
$gap: 33px;
::v-deep .popupContent{
  padding-bottom: $gap;
}
// 绿晶石 紫晶石 科举卡 兑换按钮
.normalGoodsExchange {
  margin-top: 23px;
  padding: $gap + 2px 31px 0; // 2px 为line占的高度
  width: 600px; // todo 标准边框：100% 背景图边框：宽度自定义
  .line {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background: #fff;
  }
  .normalConsumeNumber {
    font-weight: 500;
    font-size: 32px;
    color: #fff;
  }
  .exchangeBtn {
    width: 126px;
    height: 66px;
    font-size: 32px;
  }
}
.buttonMargin {
  margin: 26px 0 0;
}
// 称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮
.seniorButtons {
  @extend .buttonMargin;
  .seniorBtn {
    width: 246px;
    height: 78px;
    font-size: 32px;
  }
  .exchange,
  .exchangeAndEquip {
    @extend .seniorBtn;
    //margin-left: 20px;
  }
  .exchangeAndEquip {
    margin-left: 20px;
  }
}
// 钥匙兑换按钮
.keyButtons {
  @extend .buttonMargin;
  .row-1 {
    font-size: 32px;
    //margin-bottom: 5px;
  }
  .row-2 {
    font-size: 24px;
  }
  .keyExchangeBtn {
    width: 246px;
    height: 90px;
  }
  .exchangeOne,
  .exchangeTwo {
    @extend .keyExchangeBtn;
    flex-direction: column;
  }
  .exchangeTwo {
    margin-left: 20px;
  }
}
</style>
