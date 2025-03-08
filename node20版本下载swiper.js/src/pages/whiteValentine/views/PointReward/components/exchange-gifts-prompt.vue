<template>
  <van-popup
    v-model="showPopup"
    class="flex justify-center align-center"
    @closed="clickClose"
    @touchmove.prevent.stop
  >
    <div
      :class="[
        'popup-content',
        {
          'hero-stone-prompt': isHeroStone,
          'title-mic-prompt': isTitleOrMic,
          'key-prompt': SpecialFlag
        }
      ]"
      @touchmove.prevent.stop
    >
      <!--标题图片-->
      <img class="title-image" :src="IconPath('tk_6_42.png')" />
      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!-- 剩余道具 -->
        <p class="remainingPoint">
          剩余{{ pointName
          }}<img
            class="my_present_nums_box iconClass"
            :src="IconPath(pointIcon)"
          />
          ：{{ my_goods }}
        </p>
        <!-- 道具图标展示 -->
        <div
          :class="[
            'prompt-icon',
            { title: dialogData.type === 'title' },
            { car: dialogData.type === 'car_lmdc' }
          ]"
        >
          <img
            v-if="dialogData.goods_icon_t"
            :src="IconPath(dialogData.goods_icon_t)"
          />
          <template
            v-if="
              dialogData.goods_type === 'title' ||
              dialogData.goods_type === 'mic'
            "
          >
            <!-- json容器 -->
            <public-json
              v-if="dialogData.goods_type === 'title'"
              jsonName="ch_zdqc"
            />
            <public-svga
              v-if="dialogData.goods_type === 'mic'"
              svgaName="ts_yysw"
              :userAvatar="$store.state.user_icon"
            />
          </template>
        </div>
        <!-- 道具名称 -->
        <p class="goods_name">
          {{ dialogGoodsName }}
        </p>
        <!-- 预计消耗数量 -->
        <p v-if="dialogData.max_times == 1" class="Price_max_times flex-center">
          消耗<img class="iconClass" :src="IconPath(pointIcon)" /> ：{{
            dialogData.price
          }}
        </p>
        <!-- 幸运钥匙特殊说明 -->
        <p v-if="SpecialFlag" class="Price_lucky_key">
          首个消耗50个<img
            class="my_present_nums_box iconClass"
            :src="IconPath(pointIcon)"
          />
          第二个半价
        </p>
        <!-- 计数器组件 -->
        <DialogCounter
          v-if="showCounter"
          :goods_detail="dialogData"
          :my_goods="+my_goods"
          :inputNum.sync="inputNum"
          :showSpecialBilling="isHeroStone"
          :showBilling="!isHeroStone"
          :CounterIcon="pointIcon"
          @clickSettlement="onExcharge"
        />
        <!-- 底部两个按钮 -->
        <div
          class="Dialog_Buttons"
          v-if="showDialogButtons"
          :class="{ hero_stone_btn: isHeroStone, keys_btn: SpecialFlag }"
        >
          <div class="left-button button-noFinish" @click="onExcharge(1)">
            <p>
              {{ SpecialFlag ? '兑1个' : '兑换' }}
            </p>
            <p v-if="SpecialFlag">
              (消耗:<img
                class="my_present_nums_box iconClass"
                :src="IconPath(pointIcon)"
              />
              {{ dialogLeftButtonText }})
            </p>
          </div>
          <div
            class="right-button button-receive"
            @click="onExcharge(2)"
            v-if="showDialogRightButton"
          >
            <p>
              {{ ButtonText('3', dialogData.goods_type) }}
            </p>
            <p v-if="SpecialFlag">
              (消耗:<img class="iconClass" :src="IconPath(pointIcon)" />
              {{ dialogData.price / 2 + dialogData.price }})
            </p>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import PublicSvga from '../../../components/PublicSvga.vue'
import DialogCounter from '../../../components/DialogCounter.vue'
import PublicJson from '../../../components/PublicJson.vue'
import { getPageData } from '../../../api'

export default {
  components: { PublicJson, DialogCounter, PublicSvga },
  data() {
    return {
      showPopup: false,
      // 弹框兑换数据
      settlement: {},
      dialogData: {},
      // 弹框计数器数据
      inputNum: 1
    }
  },
  props: ['pointIcon', 'pointName', 'my_goods'],
  computed: {
    // 弹框内按钮显隐
    showDialogButtons() {
      return (
        this.dialogData.max_times == 1 ||
        ['keys', 'pretty_card', 'hero_tools'].includes(
          this.dialogData.goods_type
        )
      )
    },
    // 弹框内钥匙 靓号券 左按钮文字
    dialogLeftButtonText() {
      return this.dialogData.is_second_half
        ? this.dialogData.price / 2
        : this.dialogData.price
    },
    // 弹框内右边按钮显隐
    showDialogRightButton() {
      const { goods_type, exchange_times, max_times } = this.dialogData

      return (
        ((goods_type == 'keys' || goods_type == 'pretty_card') &&
          exchange_times != '1') ||
        max_times == 1
      )
    },
    // 弹框内道具名称
    dialogGoodsName() {
      const { goods_type, goods_name, goods_num, goods_num_text } =
        this.dialogData
      return ['mic', 'keys', 'pretty_card', 'car'].includes(goods_type)
        ? ['mic', 'car'].includes(goods_type)
          ? `${goods_name}+${goods_num}天`
          : goods_num_text
        : goods_name
    },
    // 是否为头饰或者称号
    isTitleOrMic() {
      return ['mic', 'title'].includes(this.dialogData.goods_type)
    },
    // 是否为召唤石弹框
    isHeroStone() {
      return this.dialogData.type === 'hero_tools_zhs'
    },
    // 幸运钥匙和靓号券特殊条件判断
    SpecialFlag() {
      return (
        this.dialogData.goods_type === 'keys' ||
        this.dialogData.goods_type === 'pretty_card'
      )
    },
    // 计数器显示逻辑
    showCounter() {
      return (
        this.dialogData.max_times !== 1 &&
        this.dialogData.type !== 'lucky_key' &&
        this.dialogData.type !== 'pretty_card'
      )
    }
  },
  watch: {},
  methods: {
    // 弹框内兑换按钮点击事件（num标识点击的按钮是左边还是右边，1是左边，2是右边）
    async onExcharge(num) {
      const goodsType = this.dialogData.goods_type
      if (this.dialogData.max_times == 1) {
        // 兑换次数一次 目前就头饰和称号
        await this.onExchargeOnce(goodsType, num)
      } else if (goodsType == 'keys' || goodsType == 'pretty_card') {
        // 幸运钥匙兑换 靓号券兑换
        this.settlement.type =
          goodsType == 'keys' ? 'exchange_lucky_key' : 'exchange_pretty_card'
        await this.onExchargeSpecial(num)
      } else if (goodsType == 'hero_tools') {
        // 召唤石兑换
        await this.onExchargeHeroTools()
      } else {
        // 绿晶石，科举，等等普通道具兑换
        this.settlement.type = 'exchange_goods_new'
        this.settlement['mark[nums]'] = this.inputNum
        const res = await this.handleExcharge()
        this.updateList(res)
      }
    },
    // 弹框内兑换道具事件：只允许兑换一次(目前就头饰和称号)
    async onExchargeOnce(goodsType, num) {
      let res = {}
      if (num == 2) {
        // 点击右边按钮，判断如果是头饰或者称号，发兑换并装扮请求
        if (goodsType == 'mic' || goodsType == 'title' || goodsType == 'car') {
          res = await this.exchargeAndEquip(this.dialogData.type)
        }
      } else {
        // 只兑换，不装扮
        this.settlement['mark[nums]'] = 1
        this.settlement.type = 'exchange_goods_new'
        res = await this.handleExcharge()
      }
      this.updateList(res)
    },
    // 弹框内兑换道具事件：幸运钥匙和靓号券兑换
    async onExchargeSpecial(num) {
      this.settlement.mark = num
      // 兑换请求
      const res = await this.handleExcharge()
      this.updateList(res)
    },
    // 弹框内兑换道具事件：召唤石兑换
    async onExchargeHeroTools() {
      this.settlement.type = 'exchange_goods_new'
      this.settlement['mark[nums]'] = this.inputNum
      const res = await this.handleExcharge()
      this.updateList(res)
    },
    /* 更新页面数据数据 */
    updateList(params) {
      this.showPopup = false
      this.$emit('update', params)
    },
    // 兑换好礼弹框内，头饰称号领取并装扮按钮接口
    exchargeAndEquip(mark) {
      return getPageData({
        type: 'exchange_and_equip_goods',
        mark
      })
    },
    // 弹框兑换按钮接口
    handleExcharge() {
      return getPageData({ ...this.settlement })
    },
    // 兑换好礼弹框数据接口
    exchangeGiftApi(mark) {
      return getPageData({
        type: 'goods_detail',
        mark
      })
    },
    async openPrompt(type) {
      const res = await this.exchangeGiftApi(type)
      if (res.errno) return this.$toast(res.errmsg)
      this.settlement = {}
      this.inputNum = 1
      this.dialogData = res.data.goods_detail
      this.settlement['mark[id]'] = this.dialogData.type
      this.showPopup = true
    },
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
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
    width: 620px;
    height: 570px;
    border: 5px solid #f6a1b0;
    background-color: #fff;
    padding: 5px;
    pointer-events: auto;
    border-radius: 34px;

    .inner {
      border-radius: 24px;
      background: linear-gradient(180deg, #fff3f4, #f9c4c7);
    }
  }

  .hero-stone-prompt {
    height: 620px;
  }

  .title-mic-prompt {
    height: 554px;
  }

  .key-prompt {
    height: 590px;
  }
}

.title-image {
  width: 644px;
  height: 230px;
  position: absolute;
  z-index: 3;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.remainingPoint,
.goods_name,
.Price_lucky_key,
.Price_max_times {
  width: fit-content;
  margin: 10px 0;
  font-size: 32px;
  color: #b35553;

  > img {
    width: 50px;
    height: 48px;
    margin: 0 4px;
  }
}

.remainingPoint {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 77px auto 0;

  > img {
    position: relative;
    margin: 0 6px;
  }
}

.prompt-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  background: #fefaef;
  border: 4px solid #f6a1b0;
  margin: 32px auto 10px;
  border-radius: 16px;

  img {
    height: 100%;
  }

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
    ::v-deep .micAvatar_img {
      width: 80%;
      height: 80%;
    }

    ::v-deep .svga_box {
      width: 120px !important;
    }
  }
}

.title,
.car {
  width: 184px;
  height: 124px;

  img {
    width: 75% !important;
    height: auto !important;
  }
}

.goods_name {
  margin: 20px auto 27px;
  font-size: 28px !important;
}

.Price_lucky_key {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.Price_max_times {
  margin: -10px auto 10px;

  > img {
    position: relative;
    top: -3px;
    margin: 0 -2px 0 2px;
  }
}

// 弹框下方按钮
.Dialog_Buttons {
  display: flex;
  justify-content: center;
  //margin: 30px 20px;
  margin: 30px 20px;

  .left-button,
  .right-button {
    width: 246px;
    height: 78px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 32px;
    border-radius: 39px;

    p {
      width: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        margin: 0 3px;
      }
    }

    p:nth-child(2) {
      font-size: 24px;
    }
  }

  .left-button {
    margin-right: 16px;
    color: #707ccb;
    background: linear-gradient(0deg, #bcc4f1, #ffffff);
    border: 3px solid #ffffff;
  }

  .right-button {
    color: #a9792c;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border: 3px solid #ffffff;
  }
}

.hero_stone_btn {
  margin: 14px 20px 46px !important;

  .left-button {
    margin-top: 5px;
    margin-right: 0;
    width: 246px;
    height: 78px;
    font-size: 32px;
    background: linear-gradient(0deg, #bcc4f1, #ffffff);
    border-radius: 42px;
    border: 3px solid #ffffff;
    color: #707ccb;
  }
}

.keys_btn {
  justify-content: center;
  margin: 30px 20px 0 !important;

  img {
    width: 37px;
    height: 36px;
  }

  .left-button {
    margin-right: 18px;
    width: 246px;
    height: 90px;
    font-size: 32px;
    color: #707ccb;
    background: linear-gradient(0deg, #bcc4f1, #ffffff);
    border-radius: 42px;
    border: 3px solid #ffffff;
  }

  .right-button {
    width: 246px;
    height: 90px;
    font-size: 32px;
    color: #a9792c;
    background: linear-gradient(0deg, #fff9d1, #ffffff);
    border-radius: 45px;
    border: 3px solid #ffffff;
  }
}
</style>
