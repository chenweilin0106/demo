<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div
      :class="[
        'popup-content',
        { 'hero-stone-prompt': isHeroStone, 'title-mic-prompt': isTitleOrMic }
      ]"
      @touchmove.prevent.stop
    >
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_5.png')" />
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
          { car: dialogData.type === 'car_cysn' }
        ]"
      >
        <img
          v-if="dialogData.goods_icon_t"
          :src="IconPath(dialogData.goods_icon_t)"
        />
        <template
          v-if="
            dialogData.goods_type === 'title' || dialogData.goods_type === 'mic'
          "
        >
          <!-- json容器 -->
          <public-json
            v-if="dialogData.goods_type === 'title'"
            jsonName="ch_xlty"
          />
          <public-svga
            v-if="dialogData.goods_type === 'mic'"
            svgaName="ts_tlzy"
            :userAvatar="$store.state.user_icon"
          />
        </template>
      </div>
      <!-- 道具名称 -->
      <p class="goods_name">
        {{ dialogGoodsName }}
      </p>
      <!-- 预计消耗数量 -->
      <p v-if="dialogData.max_times == 1" class="Price_max_times flex_across">
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
  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none;

  .popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 616px;
    height: 566px;
    background: linear-gradient(0deg, #5e243a, #7e2725);
    border: 8px solid #f9c66c;
    border-radius: 26px;
    pointer-events: auto;
  }

  .hero-stone-prompt {
    height: 606px;
  }

  .title-mic-prompt {
    width: 616px;
    height: 530px;

    .Dialog_Buttons {
      .left-button,
      .right-button {
        width: 256px;
        height: 84px;
      }

      .left-button {
        color: #fff;
        background: url('@/pages/lanternFestival/assets/btn_7.png') no-repeat
          left top/100% 100%;
      }

      .right-button {
        color: #e73d27;
        background: url('@/pages/lanternFestival/assets/btn_8.png') no-repeat
          left top/100% 100%;
      }
    }
  }
}

.title-image {
  width: 642px;
  height: 126px;
  position: absolute;
  z-index: 3;
  top: -82px;
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
  color: #ffffff;

  > img {
    //width: 45px;
    //height: 32px;
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
  width: 124px;
  height: 124px;
  background: #fefaef;
  border: 2px solid #ff9563;
  margin: 40px auto 10px;
  border-radius: 14px;

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
      width: 86px;
      height: 86px;
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
  margin: 20px 20px 76px;

  .left-button,
  .right-button {
    width: 256px;
    height: 98px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 32px;

    p {
      width: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        //width: 45px;
        //height: 32px;
        margin: 0 3px;
      }
    }

    p:nth-child(2) {
      font-size: 24px;
    }
  }

  .left-button {
    margin-right: 16px;
  }
}

.hero_stone_btn {
  margin: 14px 20px 46px !important;

  .left-button {
    margin-top: 10px;
    margin-right: 0;
    color: #fff;
    width: 256px;
    height: 84px;
    background: url('@/pages/lanternFestival/assets/btn_7.png') no-repeat left
      top/100% 100%;
  }
}

.keys_btn {
  margin: 25px 20px 57px !important;

  .left-button {
    color: #fff;
    background: url('@/pages/lanternFestival/assets/btn_7.png') no-repeat left
      top/100% 100%;
  }

  .right-button {
    color: #e73d27;
    background: url('@/pages/lanternFestival/assets/btn_8.png') no-repeat left
      top/100% 100%;
  }
}
</style>
