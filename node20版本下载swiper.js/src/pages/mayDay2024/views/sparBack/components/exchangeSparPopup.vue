<template>
  <publicPopup title="title_1.png" @close="clickClose">
    <!-- 剩余道具 -->
    <p class="remainingPoint text-nowrap line-height-100 margin-row-center width-fit">剩余积分：{{ dialogData.spar_point }}</p>
    <!-- 道具图标展示 -->
    <div class="prompt-icon">
      <img v-if="dialogData.goods_info" :src="IconPath(dialogData.goods_info?.icon)" />
    </div>
    <!-- 道具数量 -->
    <p class="goods_name text-nowrap line-height-100 margin-row-center width-fit" v-if="dialogData.goods_info">+{{ dialogData.goods_info?.nums }}</p>
    <!-- 计数器组件 -->
    <popupCount v-if="dialogData.goods_info" :goodsInfo="dialogData.goods_info" :pointNumber="+dialogData.spar_point" :inputNum.sync="inputNum" />
    <div class="normalGoodsExchange margin-row-center w-100 position-relative flex align-center justify-between">
      <div class="line position-absolute w-100"></div>
      <div class="normalConsumeNumber flex align-center justify-center">共消耗：{{ dialogData.goods_info?.price * inputNum }}</div>
      <div class="exchangeBtn flex align-center justify-center line-height-100" @click="exchangeSpar">兑换</div>
    </div>
  </publicPopup>
</template>

<script>
import publicPopup from '@/pages/mayDay2024/components/publicPopup.vue'
import popupCount from '@/pages/mayDay2024/components/popupCount.vue'
import { getPageData } from '../../../api/index'

export default {
  components: { popupCount, publicPopup },
  props: ['config'],
  data() {
    return {
      dialogData: {
        // spar_point: '50',
        // goods_info: {
        //   id: 2,
        //   name: '绿晶石',
        //   price: 10, // 价格
        //   current: 0, // 当前兑换次数
        //   max_times: 50, // 最大兑换次数
        //   icon: 'ljs_120_120.png', // 图标
        //   nums: 100 // 晶石数量
        // }
      },
      // 弹框计数器数据
      inputNum: 1
    }
  },
  async created() {
    const res = await getPageData({ type: 'spar_detail', mark: this.config.id })
    if (res.errno) return this.$toast(res.errmsg)
    this.dialogData = res.data
  },
  methods: {
    async exchangeSpar() {
      const res = await getPageData({ type: 'spar_exchange', mark: { id: this.dialogData.goods_info.id, nums: this.inputNum } })
      this.$toast(res.errmsg)
      if (!res.errno) this.$emit('update', res.data)
      this.clickClose()
    },
    clickClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  width: 620px;
  height: 550px;
  padding-top: 83px;
}
.remainingPoint,
.goods_name {
  font-size: 32px;
  color: #ffffff;
}

.remainingPoint {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}

.prompt-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;
  background: #fefaef;
  border: 4px solid #ffbdfd;
  margin: 0 auto 27px;
  border-radius: 16px;

  img {
    height: 100%;
  }
}

.goods_name {
  margin-bottom: 29px;
  font-size: 28px;
}

.normalGoodsExchange {
  margin-top: 23px;
  margin-bottom: 10px;
  width: 600px;
  padding: 2px 30px 0; // padding-top: 2px 去除line占的高度 让元素居中
  height: 126px;
  .line {
    top: 0;
    left: 0;
    width: 600px;
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
    color: #fff;
    background: linear-gradient(180deg, #f599ff, #8a6af3);
    border: 3px solid #f9c9ff;
  }
}
</style>
