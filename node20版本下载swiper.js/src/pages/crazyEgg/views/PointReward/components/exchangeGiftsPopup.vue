<template>
  <PopupBox title="title_1.png" @clickClose="clickClose">
    <!-- 剩余道具 -->
    <p class="remainingPoint flex align-center justify-center margin-row-center">
      剩余{{ pointName }}<img class="goodsIcon" :src="IconPath(pointIcon)" /> ：{{ my_goods }}
    </p>

    <!-- 道具图标 -->
    <div class="promptIcon flex align-center justify-center position-relative" :class="dialogData.goods_type">
      <div v-if="typeToNameMap[dialogData.goods_type]" class="typeLabel flex align-center justify-center position-absolute line-height-100 text-nowrap">{{ typeToNameMap[dialogData.goods_type] }}</div>
      <PublicImg :img-name="dialogData.goods_icon_t" :img-type="dialogData.goods_type" />
    </div>

    <!-- 道具名称 -->
    <p class="goodsName line-height-100 width-fit">{{ dialogGoodsName }}</p>

    <!--预计消耗数量 称号 头饰 座驾 声波 聊天气泡 主页特效-->
    <p v-if="isSeniorExchange" class="consumeNumber width-fit line-height-100 margin-row-center flex align-center justify-center">
      消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price }}
    </p>

    <!-- 计数器组件 -->
    <ExchangeCounter v-if="showCounter" :goods-info="dialogData" :point-number="+my_goods" :inputNum.sync="inputNum" />

    <!--绿晶石 紫晶石 科举卡 兑换按钮-->
    <div v-if="isNormalExchange" class="normalGoodsExchange margin-row-center w-100 position-relative flex align-center justify-between">
      <div class="line position-absolute w-100"></div>
      <div class="normalConsumeNumber flex align-center justify-center">
        共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price * inputNum }}
      </div>
      <div class="exchangeBtn buttonStyle-2 flex align-center justify-center line-height-100" @click="onExchange">兑换</div>
    </div>

    <!--召唤石-->
    <template v-else-if="isHeroStone">
      <!--共消耗-->
      <div class="heroStoneConsumeNumber width-fit flex align-center justify-between line-height-100 margin-row-center">
        共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price * inputNum }}
      </div>
      <!--兑换按钮-->
      <div class="heroStoneButton buttonStyle-2 flex align-center justify-center line-height-100" @click="onExchange">兑换</div>
    </template>

    <!--称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮-->
    <div v-else-if="isSeniorExchange" class="seniorButtons flex align-center justify-center">
      <div class="exchange buttonStyle-1 flex align-center justify-center line-height-100" @click="onExchange(1)">
        <p>兑换</p>
      </div>
      <div class="exchangeAndEquip buttonStyle-2 flex align-center justify-center line-height-100" @click="onExchange(2)">
        <p>兑换并{{ equipObject[dialogData.goods_type] }}</p>
      </div>
    </div>

    <!--钥匙-->
    <template v-else-if="isKey">
      <!--特殊说明-->
      <p class="keyTip flex align-center justify-center line-height-100 width-fit margin-row-center">
        首个消耗50个<img class="goodsIcon" :src="IconPath(pointIcon)" />第二个半价
      </p>
      <!--兑换按钮-->
      <div class="keyButtons flex align-center justify-center">
        <div class="buttonStyle-1 exchangeOne flex-column align-center justify-center" @click="onExchange(1)">
          <p class="row-1">兑1个</p>
          <p class="row-2 flex align-center justify-center">（消耗:<img :src="IconPath(pointIcon)" />{{ keyButtonText }}）</p>
        </div>
        <div v-if="showKeyButton" class="buttonStyle-2 exchangeTwo flex-column align-center justify-center" @click="onExchange(2)">
          <p class="row-1">兑2个</p>
          <p class="row-2 flex align-center justify-center">
            （消耗:<img :src="IconPath(pointIcon)" />{{ dialogData.price / 2 + dialogData.price }}）
          </p>
        </div>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import PopupBox from '@/pages/crazyEgg/components/popupBox.vue'
import ExchangeCounter from './exchangeCounter.vue'
import { getPageData } from '../../../api'
import { _throttle } from '../../../utils/tool'
export default {
  components: { PopupBox, ExchangeCounter },
  data() {
    return {
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
        // exchange_times: 0,
        // goods_icon: 'ts_tlzy',
        // goods_icon_t: 'ts_tlzy',
        // goods_id: 80,
        // goods_name: '天籁之音',
        // goods_num: 7,
        // goods_num_text: '头饰+7天',
        // goods_type: 'mic',
        // has_right: 1,
        // is_lock: false,
        // is_owned: false,
        // max_times: 1,
        // price: 100,
        // price_text: '100',
        // type: 'mic_tlzy'
      }, // 弹框数据
      inputNum: 1 // 数量
    }
  },
  props: ['pointIcon', 'pointName', 'my_goods', 'type'],
  computed: {
    ...mapState(['typeToNameMap']),
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
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  padding-top: 112px;
  min-height: 598px;
}
// 道具图标类名
.goodsIcon {
  margin: 0 5px;
  width: 47px;
  height: 43px;
}
// 剩余道具
.remainingPoint {
  font-size: 32px;
  color: #ffffff;
  font-weight: 500;
}
// 商品图标
.promptIcon {
  width: 128px;
  height: 128px;
  background: #FEFAEF;
  border: 4px solid #C86325;
  margin: 32px auto 10px;
  border-radius: 16px;
}
.title {
  width: 184px;
  height: 128px;
}
//.mic {
//  ::v-deep .svgaBox {
//    width: 120px !important;
//  }
//}
// 座驾
.car {
  width: fit-content;
  height: 124px;

  img {
    width: auto;
    height: 100%;
  }
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
// 按钮样式1
.buttonStyle-1 {
  color: #a22709;
  background: linear-gradient(0deg, #f2ab73, #fff5a1);
  border: 3px solid #ffffff;
}
// 按钮样式2
.buttonStyle-2 {
  color: #ffffff;
  background: linear-gradient(0deg, #34a38f, #9adbb9);
  border: 2px solid #ffffff;
}
// 绿晶石 紫晶石 科举卡 兑换按钮
.normalGoodsExchange {
  margin-top: 23px;
  //margin-bottom: 40px;
  width: 600px;
  padding: 2px 30px 0; // padding-top: 2px 去除line占的高度 让元素居中
  height: 129px;
  .line {
    top: 0;
    left: 0;
    width: 598px;
    height: 2px;
    background: #ffffff;
  }
  .normalConsumeNumber {
    font-weight: 500;
    font-size: 32px;
    color: #ffffff;
  }
  .exchangeBtn {
    width: 126px;
    height: 66px;
    border-radius: 33px;
    font-weight: 500;
    font-size: 32px;
  }
}
// 召唤石 兑换按钮
.heroStoneButton {
  margin: 30px auto 43px;
  width: 246px;
  height: 78px;
  border-radius: 39px;
  font-size: 32px;
}
// 称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮
.seniorButtons {
  margin: 30px 0 43px;
  .exchange {
    width: 246px;
    height: 78px;
    border-radius: 39px;
    font-size: 32px;
  }
  .exchangeAndEquip {
    width: 244px;
    height: 76px;
    border-radius: 38px;
    font-size: 32px;
    margin-left: 20px;
  }
}
// 钥匙兑换按钮
.keyButtons {
  margin: 30px 0 43px;
  img {
    margin: 0 5px;
    width: 40px;
    height: 40px;
  }
  .row-1 {
    font-size: 32px;
  }
  .row-2 {
    font-size: 24px;
  }
  .exchangeOne {
    width: 246px;
    height: 90px;
    border-radius: 45px;
  }
  .exchangeTwo {
    width: 244px;
    height: 88px;
    border-radius: 44px;
    margin-left: 20px;
  }
}
</style>
