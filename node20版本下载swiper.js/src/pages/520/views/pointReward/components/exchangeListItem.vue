<template>
  <div class="exchange-item">
    <div class="inner">
      <div class="left-content flex flex-column">
        <!-- 道具图标 -->
        <div class="icon-content">
          <PublicImg :class="exchargeItem.type" :img-name="exchargeItem.goods_icon" />
          <!-- 锁定状态 -->
          <div v-if="isLock" class="lockStatus flex align-center justify-center">
            <img :src="IconPath('mk1_2.png')" />
          </div>
          <div v-if="exchargeItem.mark" class="priceLabel flex align-center justify-center line-height-100 position-absolute">
            {{ exchargeItem.mark }}
          </div>
        </div>
        <!-- 道具名称 -->
        <div class="text-content flex-1 flex justify-center align-center text-nowrap line-height-100">
          {{ exchargeItem.goods_num_text }}
        </div>
      </div>
      <!-- 道具描述 -->
      <div class="text-content">
        <p v-if="exchargeItem.type === 'lucky_key' || exchargeItem.type === 'pretty_card'">
          消耗<span>{{ exchargeItem.price }}个{{ pointName }}</span
          >兑换 第二个<span>半价</span>
        </p>
        <p v-else>
          消耗<span>{{ exchargeItem.price }}个{{ pointName }}</span
          >兑换
        </p>
        <p v-if="exchargeItem.max_times == 0" :class="{ Middle_Text: isLock }">不限兑换次数</p>
        <!-- 判断是否是锁定状态样式 -->
        <p v-else :class="{ Middle_Text: isLock }">限兑：{{ exchargeItem.exchange_times }}/{{ exchargeItem.max_times }}</p>
        <!-- 锁定状态 -->
        <p class="lockStatus_Text" v-if="isLock">累计消耗{{ exchargeItem.spend_cond }}个{{ pointName }}解锁</p>
      </div>
      <!-- 兑换按钮 -->
      <div
        v-if="!exchargeItem.spend_cond || exchargeItem.spend_cond <= spend_point"
        :class="['exchange-item-button', ButtonStyle('2', exchargeItem.has_right)]"
        @click="onExchangeClick(exchargeItem.has_right, exchargeItem.type)"
      >
        {{ ButtonText('2', exchargeItem.has_right) }}
      </div>
    </div>
  </div>
</template>

<script>
import buttonMixin from '@/pages/520/mixins/buttonMixin'

export default {
  name: 'exchange-item',
  mixins: [buttonMixin],
  components: {},
  props: ['exchargeItem', 'pointName', 'spend_point'],
  data() {
    return {}
  },
  computed: {
    // 是否锁定
    isLock() {
      return this.exchargeItem.spend_cond > this.spend_point
    }
  },
  methods: {
    onExchangeClick(has_right, type) {
      if (has_right == 1) {
        this.$emit('onExchangeClick', type)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.exchange-item {
  display: flex;
  margin: 0 auto 17px;
  width: 668px;
  height: 168px;
  background: #ffe7bd;
  padding: 4px;
  //overflow: hidden;
  border-radius: 16px;
  .inner {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background: linear-gradient(-90deg, #ffcbb1, #f378a6);
    border-radius: 12px;
    // 图片样式
    .left-content {
      width: 240px;
      height: 100%;

      .icon-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 125px;
        background: linear-gradient(180deg, #ffe3f1, #ffffff);
        border-radius: 12px 0 0 0;
        .priceLabel {
          top: -13px;
          right: -29px;
          padding: 0 17px;
          height: 44px;
          background: linear-gradient(90deg, #ff699e, #9a69ff);
          border-radius: 22px;
          border: 2px solid #ffffff;
          font-weight: 500;
          font-size: 24px;
          color: #ffffff;
        }

        .title {
          ::v-deep .jsonBox {
            width: 90%;
          }
        }

        .mic {
          ::v-deep .micAvatar_img {
            width: 92px;
            height: 92px;
          }

          ::v-deep .svga_box {
            width: fit-content;
            height: 100%;
          }
        }

        // 图片icon
        img {
          height: 100%;
        }

        // 锁定样式
        .lockStatus {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px 0 0 0;

          > img {
            width: 30px;
            height: auto;
          }
        }
      }

      // 图片下方字体样式
      .text-content {
        width: 100%;
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        background-color: #d26388;
        border-radius: 0 0 0 12px;
      }
    }

    // 中间字体样式
    > .text-content {
      position: relative;
      z-index: 1;
      width: fit-content;
      height: 100%;
      white-space: nowrap;
      display: flex;
      flex-direction: column;
      padding-left: 14px;

      span {
        color: #fffaa6;
      }

      p {
        color: #ffffff;

        &:nth-child(1) {
          margin-top: 33px;
          font-size: 28px;
          font-weight: 500;
        }

        &:nth-child(2) {
          margin-top: 36px;
          font-size: 24px;
        }
      }

      .Middle_Text {
        margin: 10px 0 !important;
      }

      .lockStatus_Text {
        font-size: 26px !important;
      }
    }

    // 按钮样式
    // 兑换
    .exchange-item-button {
      position: absolute;
      z-index: 2;
      // 单个奖励
      bottom: 18px;
      right: 21px;
      width: 126px;
      height: 54px;
      border-radius: 27px;
      font-size: 28px;
    }
  }
}
</style>
