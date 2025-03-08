<template>
  <div class="ExchangeListItem margin-row-center">
    <div class="ExchangeListItem_Left flex_vertical">
      <!-- 道具图标 -->
      <div class="ExchangeItem_Icon flex_across">
        <div class="pointRewardLottie flex_across">
          <PublicImg
            :class="exchangeItem.goods_type"
            :img-name="exchangeItem.goods_icon"
            :imgType="exchangeItem.goods_type"
            :user-avatar="hasAvatar.includes(exchangeItem.goods_type) ? $store.state.user_icon : ''"
          />
        </div>
        <!-- 锁定状态 -->
        <div class="lockStatus flex_across" v-if="isLock">
          <img :src="IconPath('mk1_4.png')" />
        </div>
      </div>
      <!-- 道具名称 -->
      <div class="ExchangeItem_Name flex_across">
        {{ exchangeItem.goods_num_text }}
      </div>
    </div>
    <!-- 道具描述 -->
    <div class="ExchangeListItem_Center">
      <p v-if="exchangeItem.type === 'lucky_key' || exchangeItem.type === 'pretty_card'">
        消耗<span class="">{{ exchangeItem.price }}个{{ pointName }}</span
        >兑换 第二个<span>半价</span>
      </p>
      <p v-else>
        消耗<span class="">{{ exchangeItem.price }}个{{ pointName }}</span
        >兑换
      </p>
      <p v-if="exchangeItem.max_times == 0" :class="{ Middle_Text: isLock }">不限兑换次数</p>
      <!-- 判断是否是锁定状态样式 -->
      <p v-else :class="{ Middle_Text: isLock }">限兑：{{ exchangeItem.exchange_times }}/{{ exchangeItem.max_times }}</p>
      <!-- 锁定状态 -->
      <p class="lockStatus_Text" v-if="isLock">累计消耗{{ exchangeItem.spend_cond }}个{{ pointName }}解锁</p>
    </div>
    <!-- 兑换按钮 -->
    <div
      v-if="!exchangeItem.spend_cond || exchangeItem.spend_cond <= spend_point"
      class="ExchangeListItem_Button"
      :class="ButtonStyle('ChargeGoods', exchangeItem.has_right)"
      @click="$emit('onExchangeClick', exchangeItem)"
    >
      {{ ButtonText('chargeGoods', exchangeItem.has_right) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeListItem',
  components: {},
  props: ['exchangeItem', 'pointName', 'spend_point'],
  data() {
    return {
      hasAvatar: Object.freeze(['mic', 'voice'])
    }
  },
  computed: {
    // 是否锁定
    isLock() {
      return this.exchangeItem.spend_cond > this.spend_point
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.ExchangeListItem {
  position: relative;
  display: flex;
  width: 666px;
  height: 166px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 3px;
  //border-radius: 15px;
  background: url('@/pages/crazyEgg/assets/bg_2.png') no-repeat left top/100% auto;
  // 图片样式
  .ExchangeListItem_Left {
    width: 240px;
    height: 160px;
    justify-content: center;
    border-radius: 12px 0 0 12px;
    border-right: 1px solid #c86325;
    .ExchangeItem_Icon {
      position: relative;
      width: 100%;
      height: 124px;
      border-radius: 12px 0 0 0;
      background: linear-gradient(180deg, #fffcec, #fdffdf);
      // json容器
      .pointRewardLottie {
        width: 100%;
        height: 100%;
        .title {
          width: 210px;
          height: 96px;
          //::v-deep .micAvatar {
          //  width: 73%;
          //  height: 73%;
          //}
          //::v-deep .jsonBox {
          //  width: 85% !important;
          //}
        }
        .mic {
          width: 120px;
          height: 119px;
          ::v-deep .micAvatar {
            width: 120px;
            height: 120px;
          }
        }
      }
      // 图片icon
      img {
        height: 100%;
      }
      .title_class {
        width: 100%;
        height: auto;
      }
      // 锁定样式
      .lockStatus {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10px 0 0 0;

        > img {
          width: 30px;
          height: auto;
        }
      }
    }

    // 图片下方字体样式
    .ExchangeItem_Name {
      font-size: 24px;
      font-weight: 500;
      width: 100%;
      height: 36px;
      color: #fff1e5;
      background: #f2ab73;
      border-radius: 0 0 0 12px;
    }
  }

  // 中间字体样式
  .ExchangeListItem_Center {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    border-radius: 0 12px 12px 0;

    p {
      color: #692e19;

      .speical_color {
        color: #fffaa6 !important;
      }

      &:nth-child(1) {
        margin-top: 28px;
        font-size: 28px;
        font-weight: bold;
      }

      &:nth-child(2) {
        margin-top: 42px;
        font-size: 24px;
        color: #c35716;
        font-weight: 500;
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
  .ExchangeListItem_Button {
    position: absolute;
    // 单个奖励
    bottom: 18px;
    right: 24px;
    width: 124px;
    height: 52px;
    border-radius: 26px;
  }
}
</style>
