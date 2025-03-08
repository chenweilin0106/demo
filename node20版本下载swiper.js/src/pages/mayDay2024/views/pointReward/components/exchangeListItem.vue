<template>
  <publicCard class="exchange-item">
    <div class="left-content flex flex-column">
      <!-- 道具图标 -->
      <div class="icon-content">
        <img :src="IconPath(exchargeItem.goods_icon)" v-if="exchargeItem.goods_icon" />
        <!-- json容器 -->
        <template v-else>
          <PublicJson v-if="exchargeItem.goods_type === 'title'" class="title" jsonName="ch_yrws" />
          <PublicJson v-if="exchargeItem.goods_type === 'voice'" class="mic" jsonName="sb_klsg" :userAvatar="$store.state.user_icon" />
        </template>
        <!-- 锁定状态 -->
        <div v-if="isLock" class="lockStatus flex align-center justify-center">
          <img :src="IconPath('mk1_2.png')" />
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
    <PublicButton
      v-if="!exchargeItem.spend_cond || exchargeItem.spend_cond <= spend_point"
      class="exchange-item-button"
      :hasRight="exchargeItem.has_right"
      @click="onExchangeClick(exchargeItem.has_right, exchargeItem.type)"
    >
      {{ ButtonText('2', exchargeItem.has_right) }}
    </PublicButton>
  </publicCard>
</template>

<script>
import PublicButton from '@/pages/mayDay2024/components/publicButton.vue'
import publicCard from '@/pages/mayDay2024/components/publicCard.vue'
import buttonMixin from '@/pages/mayDay2024/mixins/buttonMixin'
// json动画组件
import PublicJson from '../../../components/publicJson'

export default {
  name: 'exchange-item',
  mixins: [buttonMixin],
  components: { PublicJson, publicCard, PublicButton },
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
  position: relative;
  display: flex;
  margin: 0 auto 12px;
  width: 664px;
  height: 186px;
  overflow: hidden;
  // 图片样式
  .left-content {
    margin: auto 0 auto 12px;
    width: 221px;
    height: 158px;
    background: url('@/pages/mayDay2024/assets/mk1_2_1.png') no-repeat left top/100% 100%;

    .icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 118px;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        ::v-deep .json_box {
          width: 90% !important;
        }
        ::v-deep .micAvatar_img {
          width: 115px;
          height: 115px;
        }
      }
      .mic {
        ::v-deep .micAvatar_img {
          width: 120px;
          height: 120px;
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
        background: rgba(0, 0, 0, 0.5);
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
    bottom: 35px;
    right: 21px;
    width: 126px;
    height: 54px;
    //border-radius: 27px;
    //font-size: 28px;
  }
}
</style>
