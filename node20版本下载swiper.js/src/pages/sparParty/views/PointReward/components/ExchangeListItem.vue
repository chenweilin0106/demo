<template>
  <div class="exchange-item">
    <div class="left-content">
      <!-- 道具图标 -->
      <div class="icon-content"><PublicImg :class="exchangeItem.goods_type" :img-name="exchangeItem.goods_icon" :imgType="exchangeItem.goods_type" /></div>
      <!-- 道具名称 -->
      <div class="text-content">{{ exchangeItem.goods_num_text }}</div>
    </div>
    <!-- 道具描述 -->
    <div class="text-content">
      <p v-if="exchangeItem.type === 'lucky_key' ||exchangeItem.type === 'pretty_card'">消耗<span>{{ exchangeItem.price }}个{{ pointName }}</span>兑换 第二个<span>半价</span></p>
      <p v-else>消耗<span>{{ exchangeItem.price }}个{{ pointName }}</span>兑换</p>
      <p v-if="exchangeItem.max_times == 0" :class="{ Middle_Text: isLock }">不限兑换次数</p>
      <!-- 判断是否是锁定状态样式 -->
      <p v-else :class="{ Middle_Text: isLock }">限兑：{{ exchangeItem.exchange_times }}/{{ exchangeItem.max_times }}</p>
      <!-- 锁定状态 -->
      <p class="lockStatus_Text" v-if="isLock">累计消耗{{ exchangeItem.spend_cond }}个冰块解锁</p>
    </div>
    <!-- 兑换按钮 -->
    <div
      v-if="!exchangeItem.spend_cond || exchangeItem.spend_cond <= spend_point"
      :class="['exchange-item-button',ButtonStyle('2', exchangeItem.has_right)]"
      @click="$emit('onExchangeClick', exchangeItem)"
    >{{ ButtonText('2', exchangeItem.has_right) }}</div>
  </div>
</template>

<script>

export default {
  name: 'exchange-item',
  props: ['exchangeItem', 'pointName', 'spend_point'],
  computed: {
    // 是否锁定
    isLock() {
      return this.exchangeItem.spend_cond > this.spend_point
    }
  }
}
</script>

<style scoped lang="scss">
.exchange-item {
  position: relative;
  display: flex;
  margin: 0 auto 15px;
  width: 668px;
  height: 168px;
  background: url('@/pages/sparParty/assets/mk1_2.png') no-repeat left top/100%
    100%;
  padding: 4px;
  //overflow: hidden;
  // 图片样式
  .left-content {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    background: linear-gradient(to bottom, #103469 75%, #1b4e8b 30%);
    box-shadow: inset 0 0 5px 2px #fff;

    .icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 120px;
      //background: linear-gradient(180deg, #271d6e, #4d328d);
      .title {
        width: 210px;
        height: 96px;
      }
      .chat_bubble_pub {
        width: 88%;
        height: auto;
      }
      .mic {
        width: 120px;
        height: 119px;
        ::v-deep .micAvatar {
          width: 120px;
          height: 120px;
        }
      }
      // 锁定样式
      .lockStatus {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);

        > img {
          width: 15px;
          height: auto;
        }
      }
    }

    // 图片下方字体样式
    .text-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      color: #fff;
      //background: #7044d3;
      //border-radius: 0px 0px 0px 24px;
    }
  }

  // 中间字体样式
  > .text-content {
    width: fit-content;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    padding-left: 26px;

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
    // 单个奖励
    bottom: 20px;
    right: 28px;
    width: 140px;
    height: 64px;
  }
}
</style>
