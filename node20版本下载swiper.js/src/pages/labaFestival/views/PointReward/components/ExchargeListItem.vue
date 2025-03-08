<template>
  <div class="ExchargeListItem">
    <div class="ExchargeListItem_Left flex_vertical">
      <!-- 道具图标 -->
      <div class="ExchargeItem_Icon flex_across">
        <img
          :src="IconPath(exchargeItem.goods_icon)"
          v-if="exchargeItem.goods_icon"
        />
        <!-- json容器 -->
        <div v-else class="pointRewardLottie flex_across">
          <PublicJson
            class="title_animation"
            v-if="exchargeItem.goods_type === 'title'"
            jsonName="ch_qtsh"
          />
          <PublicSvga
            v-else
            class="mic_animation"
            svgaName="ts_hql"
            :userAvatar="$store.getters.user_icon"
          />
        </div>
        <!-- 锁定状态 -->
        <div class="lockStatus flex_across" v-if="isLock">
          <img :src="IconPath('mk1_2.png')" />
        </div>
      </div>
      <!-- 道具名称 -->
      <div class="ExchargeItem_Name">
        {{ exchargeItem.goods_num_text }}
      </div>
    </div>
    <!-- 道具描述 -->
    <div class="ExchargeListItem_Center">
      <p
        v-if="
          exchargeItem.type === 'lucky_key' ||
          exchargeItem.type === 'pretty_card'
        "
      >
        消耗<span class="speical_color"
          >{{ exchargeItem.price }}个{{ pointName }}</span
        >兑换 第二个<span>半价</span>
      </p>
      <p v-else>
        消耗<span class="speical_color"
          >{{ exchargeItem.price }}个{{ pointName }}</span
        >兑换
      </p>
      <p v-if="exchargeItem.max_times == 0" :class="{ Middle_Text: isLock }">
        不限兑换次数
      </p>
      <!-- 判断是否是锁定状态样式 -->
      <p v-else :class="{ Middle_Text: isLock }">
        限兑：{{ exchargeItem.exchange_times }}/{{ exchargeItem.max_times }}
      </p>
      <!-- 锁定状态 -->
      <p class="lockStatus_Text" v-if="isLock">
        累计消耗{{ exchargeItem.spend_cond }}个{{ pointName }}解锁
      </p>
    </div>
    <!-- 兑换按钮 -->
    <div
      v-if="!exchargeItem.spend_cond || exchargeItem.spend_cond <= spend_point"
      class="ExchargeListItem_Button"
      :class="ButtonStyle('ChargeGoods', exchargeItem.has_right)"
      @click="onExchargeClick(exchargeItem.has_right, exchargeItem.type)"
    >
      {{ ButtonText('chargeGoods', exchargeItem.has_right) }}
    </div>
  </div>
</template>

<script>
// svga组件
import PublicSvga from '../../../components/PublicSvga'
// json动画组件
import PublicJson from '../../../components/PublicJson'
export default {
  name: 'ExchargeListItem',
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
    onExchargeClick(has_right, type) {
      if (has_right == 1) {
        this.$emit('onExchargeClick', type)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ExchargeListItem {
  position: relative;
  display: flex;
  width: 668px;
  height: 100%;
  margin-bottom: 16px;
  overflow: hidden;
  padding: 4px;
  border-radius: 12px;
  // border: 1px solid red;
  // 图片样式
  .ExchargeListItem_Left {
    width: 240px;
    height: 100%;
    justify-content: center;
    .ExchargeItem_Icon {
      position: relative;
      width: 100%;
      height: 124px;
      border-radius: 12px 0 0 0;

      // json容器
      .pointRewardLottie {
        width: 100%;
        height: 100%;
        .title_animation {
          ::v-deep .json_box {
            width: 85% !important;
          }
        }
        .mic_animation {
          ::v-deep .micAvatar_img {
            width: 86px;
            height: 86px;
          }
          ::v-deep .svga_box {
            width: 120px !important;
          }
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
        border-radius: 12px 0 0 0;
        > img {
          width: 30px;
          height: auto;
        }
      }
    }
    // 图片下方字体样式
    .ExchargeItem_Name {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      width: 100%;
      height: 36px;
      line-height: 36px;
      border-radius: 0 0 0 10px;
    }
  }
  // 中间字体样式
  .ExchargeListItem_Center {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    border-radius: 0 10px 10px 0;
    p {
      color: #ffffff;
      &:nth-child(1) {
        margin-top: 28px;
        font-size: 28px;
        font-weight: 500;
      }
      &:nth-child(2) {
        margin-top: 44px;
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
  .ExchargeListItem_Button {
    position: absolute;
    // 单个奖励
    bottom: 16px;
    right: 24px;
    width: 128px;
    height: 56px;
    border-radius: 56px;
  }
}
</style>
