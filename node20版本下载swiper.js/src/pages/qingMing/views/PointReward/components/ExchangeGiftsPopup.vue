<template>
  <van-popup v-model="showPopup" class="flex justify-center align-center" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image position-absolute position-row-center" :src="IconPath('title_8.png')" />
      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!-- 剩余道具 -->
        <p class="remainingPoint flex align-center justify-center margin-row-center">
          剩余{{ pointName }}<img class="goodsIcon" :src="IconPath(pointIcon)" /> ：{{ my_goods }}
        </p>

        <!-- 道具图标 -->
        <div
          class="promptIcon flex align-center justify-center"
          :class="[dialogData.type === 'title' && 'title', dialogData.type === 'car_lmdc' && 'car']"
        >
          <img v-if="dialogData.goods_icon_t" class="h-100" :src="IconPath(dialogData.goods_icon_t)" />
          <template v-else-if="dialogData.goods_type === 'title' || dialogData.goods_type === 'mic'">
            <!-- 动画容器 -->
            <public-json v-if="dialogData.goods_type === 'title'" jsonName="ch_ysbg" />
            <public-svga v-if="dialogData.goods_type === 'mic'" svgaName="ts_zytc" :userAvatar="$store.state.user_icon" />
          </template>
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
        <div v-if="isNormalExchange" class="normalGoodsExchange w-100 position-relative flex align-center justify-between">
          <div class="line position-absolute w-100"></div>
          <div class="normalConsumeNumber flex align-center justify-center">
            共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price * inputNum }}
          </div>
          <div class="exchangeBtn buttonStyle-1 flex align-center justify-center line-height-100" @click="onExcharge">兑换</div>
        </div>

        <!--召唤石-->
        <template v-else-if="isHeroStone">
          <!--共消耗-->
          <div class="heroStoneConsumeNumber width-fit flex align-center justify-between line-height-100 margin-row-center">
            共消耗<img class="goodsIcon" :src="IconPath(pointIcon)" />：{{ dialogData.price * inputNum }}
          </div>
          <!--兑换按钮-->
          <div class="heroStoneButton buttonStyle-1 flex align-center justify-center line-height-100" @click="onExcharge">兑换</div>
        </template>

        <!--称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮-->
        <div v-else-if="isSeniorExchange" class="seniorButtons flex align-center justify-center">
          <div class="exchange buttonStyle-2 flex align-center justify-center line-height-100" @click="onExcharge(1)">
            <p>兑换</p>
          </div>
          <div class="exchangeAndEquip buttonStyle-1 flex align-center justify-center line-height-100" @click="onExcharge(2)">
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
            <div class="buttonStyle-2 exchangeOne flex-column align-center justify-center" @click="onExcharge(1)">
              <p class="row-1">兑1个</p>
              <p class="row-2 flex align-center justify-center">（消耗:<img :src="IconPath(pointIcon)" />{{ keyButtonText }}）</p>
            </div>
            <div v-if="showKeyButton" class="buttonStyle-1 exchangeTwo flex-column align-center justify-center" @click="onExcharge(2)">
              <p class="row-1">兑2个</p>
              <p class="row-2 flex align-center justify-center">
                （消耗:<img :src="IconPath(pointIcon)" />{{ dialogData.price / 2 + dialogData.price }}）
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </van-popup>
</template>

<script>
import PublicSvga from '../../../components/PublicSvga.vue'
import PublicJson from '../../../components/PublicJson.vue'
import ExchangeCounter from './ExchangeCounter.vue'
import { getPageData } from '../../../api'
import { _throttle } from '../../../utils/tool'

export default {
  components: { PublicJson, PublicSvga, ExchangeCounter },
  data() {
    return {
      equipObject: Object.freeze({ title: '佩戴', mic: '装扮', voice: '装扮', car: '装备', costume: '装扮', chat_bubble: '装扮' }), // 装扮按钮文本对象
      showPopup: false, // 弹框显隐
      settlement: {}, // 兑换表单数据
      dialogData: {}, // 弹框数据
      inputNum: 1 // 数量
    }
  },
  props: ['pointIcon', 'pointName', 'my_goods'],
  computed: {
    // 绿晶石 紫晶石 科举卡 兑换按钮
    isNormalExchange() {
      return ['tools_ljs2', 'keju', 'tools_zjs'].includes(this.dialogData.type)
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
      return ['mic', 'keys', 'car'].includes(goods_type)
        ? ['mic', 'car'].includes(goods_type)
          ? `${goods_name}+${goods_num}天`
          : goods_num_text
        : goods_name
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
  methods: {
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    onExcharge: _throttle(async function (num) {
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
      this.update(res)
    }, 1000),
    // 高级道具 兑换
    async seniorExchange(goodsType, num) {
      let res = {}
      if (num == 2) {
        res = await getPageData({ type: 'exchange_and_equip_goods', mark: this.dialogData.type }) // 兑换并装扮
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
    // 更新页面数据数据
    update(params) {
      this.showPopup = false
      this.$emit('update', params)
    },
    // 弹框兑换按钮接口
    handleExcharge() {
      return getPageData({ ...this.settlement })
    },
    openPrompt: _throttle(async function (mark) {
      const res = await getPageData({ type: 'goods_detail', mark })
      if (res.errno) return this.$toast(res.errmsg)
      this.settlement = {}
      this.inputNum = 1
      this.dialogData = res.data.goods_detail
      this.settlement['mark[id]'] = this.dialogData.type
      this.showPopup = true
    }, 1000),
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
// 弹框样式复制van-popup的样式
.van-popup {
  top: 0;
  left: 0;
  transform: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;

  .popup-content {
    position: relative;
    width: 626px;
    //border: 5px solid #f6a1b0;
    //background-color: #fff;
    padding: 13px;
    pointer-events: auto;
    border-image-source: url('@/pages/qingMing/assets/mk1_bg_1.png');
    border-image-slice: 70 0 70 0 fill;
    border-image-width: 70px 0 70px 0;
    //border-radius: 34px;

    .inner {
      //min-height: 570px;
      //border-radius: 24px;
      //background: linear-gradient(180deg, #fff3f4, #f9c4c7);
    }
  }
  .title-image {
    width: 642px;
    height: 130px;
    z-index: 3;
    top: -69px;
    pointer-events: none;
  }
}

// 道具图标类名
.goodsIcon {
  margin: 0 5px;
  width: 48px;
  //height: 29px;
}
// 剩余道具
.remainingPoint {
  margin-top: 63px;
  font-size: 32px;
  color: #ffffff;
  font-weight: 500;
}
// 商品图标
.promptIcon {
  width: 128px;
  height: 128px;
  background: #fefaef;
  border: 4px solid #75d093;
  margin: 32px auto 10px;
  border-radius: 16px;

  .PublicJson {
    ::v-deep .micAvatar_img {
      width: 73%;
      height: 73%;
    }

    ::v-deep .json_box {
      width: 90% !important;
    }
  }

  .PublicSvga {
  }
}
// 座驾 称号边框样式额外处理
.title,
.car {
  width: 184px;
  height: 124px;

  img {
    width: 75%;
    height: auto;
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
// 按钮样式1 当前项目 buttonStyle-1用于做渐变边框 before用于做背景
.buttonStyle-1 {
  position: relative;
  z-index: 0;
  color: #16474a;
  background: linear-gradient(0deg, #00aaa3, #8ecf73);

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
  }
}
// 按钮样式2
.buttonStyle-2 {
  color: #ffffff;
  background: linear-gradient(180deg, #0daa92, #13494c);
  border: 2px solid #deffb2;
}
// 绿晶石 紫晶石 科举卡 兑换按钮
.normalGoodsExchange {
  margin-top: 23px;
  padding: 2px 30px 0; // padding-top: 2px 去除line占的高度 让元素居中
  height: 133px;
  .line {
    top: 0;
    left: 0;
    height: 2px;
    background: #ffffff;
  }
  .normalConsumeNumber {
    font-weight: 500;
    font-size: 32px;
    color: #ffffff;
  }
  .exchangeBtn {
    width: 124px;
    height: 64px;
    border-radius: 32px;

    &::before {
      width: 120px;
      height: 60px;
      border-radius: 30px;
    }
  }
}
// 召唤石 兑换按钮
.heroStoneButton {
  margin: 30px auto 38px;
  width: 246px;
  height: 78px;
  border-radius: 38px;
  font-size: 32px;

  &::before {
    width: 242px;
    height: 72px;
    border-radius: 36px;
  }
}
// 称号 头饰 座驾 声波 聊天气泡 主页特效 兑换按钮
.seniorButtons {
  margin: 30px 0 38px;
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

    &::before {
      width: 240px;
      height: 72px;
      border-radius: 36px;
    }
  }
}
// 钥匙兑换按钮
.keyButtons {
  margin: 30px 0 38px;
  img {
    margin: 0 5px;
    width: 35px;
    //height: 29px;
  }
  .row-1 {
    font-size: 32px;
  }
  .row-2 {
    font-size: 24px;
  }
  .exchangeOne {
    width: 244px;
    height: 76px;
    border-radius: 38px;
  }
  .exchangeTwo {
    width: 244px;
    height: 76px;
    border-radius: 38px;
    margin-left: 20px;
    &::before {
      width: 240px;
      height: 72px;
      border-radius: 36px;
    }
  }
}
</style>
