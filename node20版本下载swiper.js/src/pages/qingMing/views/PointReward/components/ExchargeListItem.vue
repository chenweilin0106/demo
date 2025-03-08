<template>
  <div class="exchange-item">
    <div class="left-content">
      <!-- 道具图标 -->
      <div class="icon-content">
        <img :src="IconPath(exchargeItem.goods_icon)" v-if="exchargeItem.goods_icon" />
        <!-- json容器 -->
        <template v-else>
          <PublicJson v-if="exchargeItem.goods_type === 'title'" class="title" jsonName="ch_ysbg" />
          <PublicSvga v-else class="mic" svgaName="ts_zytc" :userAvatar="$store.state.user_icon" />
        </template>
      </div>
      <!-- 道具名称 -->
      <div class="text-content">
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
      <p class="lockStatus_Text" v-if="isLock">累计消耗{{ exchargeItem.spend_cond }}个冰块解锁</p>
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
</template>

<script>
import { _throttle } from '../../../utils/tool'
// svga组件
import PublicSvga from '../../../components/PublicSvga'
// json动画组件
import PublicJson from '../../../components/PublicJson'

export default {
  name: 'exchange-item',
  components: {
    PublicJson,
    PublicSvga
  },
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
    onExchangeClick: _throttle(function (has_right, type) {
      if (has_right == 1) {
        this.$emit('onExchangeClick', type)
      }
    }, 1000)
  }
}
</script>

<style scoped lang="scss">
.exchange-item {
  position: relative;
  display: flex;
  //align-items: center;
  margin: 0 auto 18px;
  width: 664px;
  height: 169px;
  background: url('@/pages/qingMing/assets/mk1_2.png') no-repeat left top/100% 100%;
  overflow: hidden;
  // 图片样式
  .left-content {
    position: relative;
    z-index: 2;
    width: 245px;
    height: 159px;
    background: url('@/pages/qingMing/assets/mk1_3.png') no-repeat left top/100% 100%;
    //padding: 3px 0 0 3px;
    margin-top: 5px;
    margin-left: 6px;
    padding: 2px;

    .icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 119px;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;

        ::v-deep .json_box {
          width: 90% !important;
        }
      }

      .mic {
        width: 116px;
        height: 111px;
        ::v-deep .micAvatar_img {
          width: 116px;
          height: 111px;
        }
      }

      // 图片icon
      img {
        height: 100%;
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
      //margin-left: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      width: 100%;
      height: 36px;
      font-size: 24px;
      font-weight: 600;
      color: #fff1e5;
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
    bottom: 27px;
    right: 20px;
    width: 136px;
    height: 64px;
  }
}
</style>
