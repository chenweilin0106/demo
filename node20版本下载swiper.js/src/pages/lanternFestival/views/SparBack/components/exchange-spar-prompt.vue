<template>
  <van-popup v-model="showPopup" @closed="clickClose" @touchmove.prevent.stop>
    <div class="popup-content" @touchmove.prevent.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_1.png')" />
      <!-- 剩余道具 -->
      <p class="remainingPoint">剩余积分：{{ dialogData.spar_point }}</p>
      <!-- 道具图标展示 -->
      <div class="prompt-icon">
        <img
          v-if="dialogData.goods_info"
          :src="IconPath(dialogData.goods_info.icon)"
        />
      </div>
      <!-- 道具数量 -->
      <p class="goods_name" v-if="dialogData.goods_info">
        +{{ dialogData.goods_info.nums }}
      </p>
      <!-- 计数器组件 -->
      <DialogCounter
        :goods_detail="dialogData.goods_info"
        :my_goods="+dialogData.spar_point"
        :inputNum.sync="inputNum"
        @clickSettlement="onExcharge"
      />
    </div>
  </van-popup>
</template>

<script>
import DialogCounter from '../../../components/DialogCounter.vue'
import { getPageData } from '../../../api/index'

export default {
  components: { DialogCounter },
  data() {
    return {
      showPopup: false,
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
  methods: {
    async onExcharge() {
      const params = {
        type: 'spar_exchange',
        mark: { id: this.dialogData.goods_info.id, nums: this.inputNum }
      }
      const res = await getPageData(params)
      this.$toast(res.errmsg)
      this.showPopup = false
      if (res.errno) return
      const result = {
        exchange_list: res.data.exchange_list,
        spar_point: res.data.spar_point
      }
      this.$emit('update', result)
    },
    async openPrompt(params) {
      if (params.current >= 50) return
      const res = await getPageData({ type: 'spar_detail', mark: params.id })
      if (res.errno) return this.$toast(res.errmsg)
      this.dialogData = res.data
      this.showPopup = true
    },
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
.goods_name {
  width: fit-content;
  margin: 10px 0;
  font-size: 32px;
  color: #ffffff;

  > img {
    width: 34px;
    height: 35px;
    margin: 0 4px;
  }
}

.remainingPoint {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 78px auto 0;
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
}

.goods_name {
  margin: 20px auto 24px;
  font-size: 28px !important;
}

// 弹框下方按钮
.Dialog_Buttons {
  display: flex;
  justify-content: space-evenly;
  //margin: 30px 20px;
  margin: 45px 20px 0px;

  .left-button,
  .right-button {
    width: 239px;
    height: 76px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 32px;
    color: #fff;

    p {
      width: 100%;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 34px;
        height: 35px;
        //margin: -2px 0px 0;
        margin: 0 3px;
      }
    }

    p:nth-child(2) {
      font-size: 24px;
    }
  }

  .left-button {
    background: url('@/pages/sparParty/assets/btn_5.png') no-repeat left
      top/100% 100%;
  }

  .right-button {
    background: url('@/pages/sparParty/assets/btn_4.png') no-repeat left
      top/100% 100%;
  }
}
</style>
