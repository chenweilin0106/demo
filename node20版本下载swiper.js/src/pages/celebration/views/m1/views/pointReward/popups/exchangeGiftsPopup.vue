<template>
  <PopupBox title="title_1.png" size="2" @clickClose="clickClose">
    <!--剩余道具-->
    <p class="remainingPoint flex align-center justify-center margin-row-center">
      剩余{{ pointName }}<img class="goodsIcon" :src="IconPath(pointIcon)" /> ：{{ my_goods }}
    </p>

    <!--道具图标-->
    <div class="promptIcon flex align-center justify-center position-relative" :class="dialogData.goods_type">
      <!--<div v-if="typeToNameMap[dialogData.goods_type]" class="typeLabel">{{ typeToNameMap[dialogData.goods_type] }}</div>-->
      <PublicImg :imgName="dialogData.goods_icon_t" :imgType="dialogData.goods_type" />
    </div>

    <!--道具名称-->
    <p class="goodsName line-height-100 width-fit">{{ dialogData.goods_num_text }}</p>

    <!--计数器组件-->
    <div v-if="showCounter" class="counter">
      <p class="min" @click="changeNum('min')">最小</p>
      <p class="reduce" @click="onCounter('reduce')"><img :src="IconPath(reduceIcon)" /></p>
      <p class="input flex-center">{{ inputNum }}</p>
      <p class="add" @click="onCounter('add')"><img :src="IconPath(addIcon)" /></p>
      <p class="max" @click="changeNum('max', dialogData.price)">最大</p>
    </div>

    <!--绿晶石 紫晶石 科举卡 装扮道具（兑换数量要求大于1）-->
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

    <!--装扮道具（兑换数量要求等于1）-->
    <template v-else-if="isSeniorExchange">
      <!--预计消耗数量-->
      <p class="consumeNumber width-fit line-height-100 margin-row-center flex align-center justify-center">
        消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price }}
      </p>
      <!--兑换按钮-->
      <div class="seniorButtons flex align-center justify-center">
        <PublicButton hasRight="0" class="exchange" @click="onExchange(1)"><p>兑换</p></PublicButton>
        <PublicButton hasRight="1" class="exchangeAndEquip" @click="onExchange(2)"><p>兑换并{{ nowEquipText[dialogData.goods_type] }}</p></PublicButton>
      </div>
    </template>

    <!--钥匙-->
    <template v-else-if="isKey">
      <!--特殊说明-->
      <p class="keyTip flex align-center justify-center line-height-100 width-fit margin-row-center">
        首个消耗50个<img class="goodsIcon" :src="IconPath(pointIcon)" />第二个半价
      </p>
      <!--兑换按钮-->
      <div class="keyButtons flex align-center justify-center">
        <PublicButton hasRight="0" class="exchangeOne" @click="onExchange(1)">
          <p class="row-1">兑1个</p>
          <p class="row-2 flex align-center justify-center">（消耗:<img :src="IconPath(pointIcon)" />{{ keyButtonText }}）</p>
        </PublicButton>
        <PublicButton v-if="showKeyButton" hasRight="1" class="exchangeTwo" @click="onExchange(2)">
          <p class="row-1">兑2个</p>
          <p class="row-2 flex align-center justify-center">（消耗:<img :src="IconPath(pointIcon)" />{{ dialogData.price / 2 + dialogData.price }}）</p>
        </PublicButton>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
export default {
  data() {
    return {
      stepNum: 1, // 增加/减少 间隔
      settlement: {}, // 兑换表单数据
      dialogData: {},
      // dialogData: { type: 'tools_ljs', goods_name: '绿晶石', goods_type: 'tool', goods_id: 2, goods_num: 1, price: 1, price_text: '1', max_times: 0, goods_icon: 'ljs_120_120.png', goods_icon_t: 'ljs_120_120.png', goods_num_text: '绿晶石+1', desc: '用于提升技能等级，可增加成功率', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
      // dialogData: { exchange_times: 0, goods_icon: 'qp_fhff_sc', goods_icon_t: 'qp_fhff_sc', goods_id: 80, goods_name: '星河幻境', goods_num: 3, goods_num_text: '公屏气泡+3天', goods_type: 'chat_bubble_pub', has_right: 1, is_lock: false, is_owned: false, max_times: 2, price: 45, price_text: '45', type: 'chat_bubble_pub' },
      // dialogData: { type: 'lucky_key', goods_name: '钥匙', goods_type: 'keys', goods_id: 0, goods_num: 1, price: 50, price_text: '50', max_times: 2, goods_icon: 'xyys_120_120.png', goods_icon_t: 'xyys_120_120.png', goods_num_text: '钥匙+1', is_second_half: false, is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
      // dialogData: { type: 'title', goods_name: '永久称号', goods_type: 'title', goods_id: 4987, goods_num: 0, price: 600, max_times: 1, goods_icon: 'ch_hzyx', goods_icon_t: 'ch_hzyx', goods_num_text: '永久称号+1', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
      // dialogData: { exchange_times: 0, goods_icon: 'ts_hmxh.svga', goods_icon_t: 'ts_hmxh.svga', goods_id: 80, goods_name: '绘梦星河', goods_num: 7, goods_num_text: '头饰+7天', goods_type: 'mic', has_right: 1, is_lock: false, is_owned: false, max_times: 1, price: 100, price_text: '100', type: 'mic_hql' },
      // dialogData: { type: 'car_cfplh', goods_name: '玲珑玉兔', goods_type: 'car', goods_id: 58, goods_num: 7, price: 300, price_text: '300', max_times: 1, goods_icon: 'llyt_120_120.png', goods_icon_t: 'llyt_120_120.png', goods_num_text: '座驾+7天', is_owned: false, is_lock: false, exchange_times: 0, has_right: 1 },
      inputNum: 1 // 数量
    }
  },
  props: ['pointIcon', 'pointName', 'my_goods', 'type'],
  computed: {
    ...mapState(['typeToNameMap', 'needNowEquipList', 'nowEquipText']),
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
    // 绿晶石 紫晶石 科举卡 装扮道具（兑换数量要求大于1）
    isNormalExchange() {
      return ['tools', 'keju', 'pretty_card'].some((item) => this.dialogData.type?.startsWith(item)) || (this.canEquip && this.dialogData.max_times > 1)
    },
    // 装扮道具（兑换数量要求等于1）
    isSeniorExchange() {
      return this.canEquip && this.dialogData.max_times == 1
    },
    // 钥匙 左按钮文字
    keyButtonText() {
      return this.dialogData.is_second_half ? this.dialogData.price / 2 : this.dialogData.price
    },
    // 钥匙 右按钮显隐
    showKeyButton() {
      return this.dialogData.exchange_times == 0
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
    },
    // 判断是否为装扮道具
    canEquip() {
      return this.needNowEquipList.includes(this.dialogData.goods_type)
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
      this.$emit('update', res)
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
// 道具图标类名
.goodsIcon {
  margin: 0 5px;
  width: 50px; /*todo 剩余道具图标宽度*/
  height: auto;
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
    font-weight: 500;
    font-size: 32px;
  }
}
.buttonMargin {
  margin: 30px 0 0;
}
// 召唤石 兑换按钮
.heroStoneButton {
  @extend .buttonMargin;
  width: 246px;
  height: 78px;
  font-size: 32px;
}
// 称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮
.seniorButtons {
  @extend .buttonMargin;
  .seniorBtn {
    width: 240px;
    height: 72px;
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
  img {
    width: 40px; /*todo 道具图标宽度*/
    height: auto;
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
