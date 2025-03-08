<template>
  <van-popup v-model="showPopup" class="flex justify-center align-center" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_1.png')" />

      <div class="inner w-100 h-100 overflow-y-hidden overflow-x-hidden">
        <!--额外装饰-->
        <img :src="IconPath('tk_1.png')" class="popup-star-1 position-absolute pointer-none" />
        <img :src="IconPath('tk_2.png')" class="popup-star-2 pointer-none position-absolute" />

        <!-- 剩余道具 -->
        <p class="remainingPoint flex align-center justify-center margin-row-center">剩余{{ pointName }}：{{ dialogData.spar_point }}</p>

        <!-- 道具图标 -->
        <div class="promptIcon flex align-center justify-center">
          <img v-if="dialogData.goods_info && dialogData.goods_info.icon" :src="IconPath(dialogData.goods_info.icon)" />
        </div>

        <!-- 道具名称 -->
        <p class="goodsName line-height-100 width-fit">+{{ dialogData.goods_info && dialogData.goods_info.nums }}</p>

        <!-- 计数器组件 -->
        <ExchangeCounter :goods-info="dialogData.goods_info" :point-number="+dialogData.spar_point" :inputNum.sync="inputNum" />

        <!--绿晶石 紫晶石 科举卡 兑换按钮-->
        <div class="normalGoodsExchange w-100 position-relative flex align-center justify-between">
          <div class="line position-absolute w-100"></div>
          <div class="normalConsumeNumber flex align-center justify-center">共消耗积分：{{ dialogData.goods_info?.price * inputNum }}</div>
          <div class="exchangeBtn buttonStyle-1 flex align-center justify-center line-height-100" @click="onExchange">兑换</div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { _throttle } from '../../../utils/tool'
import ExchangeCounter from '../../PointReward/components/ExchangeCounter.vue'
import { getPageData } from '@/pages/foolDay/api'

export default {
  components: { ExchangeCounter },
  data() {
    return {
      showPopup: false,
      dialogData: {}, // 弹框数据
      inputNum: 1 // 弹框计数器数据
    }
  },
  props: ['pointName'],
  methods: {
    onExchange: _throttle(async function () {
      const {
        goods_info: { id }
      } = this.dialogData
      const res = await getPageData({ type: 'spar_exchange', mark: { id, nums: this.inputNum } })
      this.$toast(res.errmsg)
      this.showPopup = false
      if (res.errno) return
      const result = { exchange_list: res.data.exchange_list, spar_point: res.data.spar_point }
      this.$emit('update', result)
    }, 1000),
    openPrompt: _throttle(async function (params) {
      if (params.current >= 50) return
      const res = await getPageData({ type: 'spar_detail', mark: params.id })
      if (res.errno) return this.$toast(res.errmsg)
      this.dialogData = res.data
      this.showPopup = true
    }, 1000),
    clickClose() {
      this.$emit('close')
      // 计数器重置
      this.inputNum = 1
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
    width: 628px;
    border: 10px solid rgba(255, 215, 152, 0.3);
    background: #fffbe6 padding-box;
    padding: 4px;
    pointer-events: auto;
    border-radius: 68px;

    .inner {
      border-radius: 54px;
      background: linear-gradient(0deg, #70b1bb, #a86280, #af315a);

      .popup-star-1 {
        top: 35px;
        left: -18px;
        width: 109px;
        height: 341px;
      }
      .popup-star-2 {
        top: 129px;
        right: -28px;
        width: 89px;
        height: 166px;
      }
    }
  }
}

.title-image {
  width: 627px;
  height: 172px;
  position: absolute;
  z-index: 3;
  top: -110px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

// 道具图标类名
.goodsIcon {
  margin: 0 5px;
  width: 47px;
  height: 47px;
}
// 剩余道具
.remainingPoint {
  margin-top: 77px;
  font-size: 32px;
  color: #ffffff;
  font-weight: 500;
}
// 商品图标
.promptIcon {
  width: 128px;
  height: 128px;
  background: #fff;
  border: 4px solid #d989a5;
  margin: 32px auto 10px;
  border-radius: 16px;

  > img {
    width: auto;
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
// 商品名称
.goodsName {
  margin: 20px auto 27px;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
}
// 按钮样式1
.buttonStyle-1 {
  color: #4d7ddd;
  background: linear-gradient(0deg, #cae7ff, #ffffff);
  border: 3px solid #ffffff;
}
// 按钮样式2
.buttonStyle-2 {
  color: #a9792c;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
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
    width: 126px;
    height: 66px;
    border-radius: 33px;
    font-weight: 500;
    font-size: 32px;
  }
}
</style>
