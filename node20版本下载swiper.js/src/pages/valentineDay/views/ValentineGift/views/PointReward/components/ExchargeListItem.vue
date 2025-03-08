<template>
  <div class="ExchargeListItem">
    <div class="ExchargeListItem_Left">
      <!-- 道具图标 -->
      <div class="ExchargeItem_Icon flex-center">
        <img
          v-if="exchargeItem.goods_icon"
          :src="IconPath(exchargeItem.goods_icon)"
          :class="{
            title_class: exchargeItem.goods_icon == 'ch_lzn.png',
            'car-class': exchargeItem.type == 'car_rhty'
          }"
        />
        <!-- json容器 -->
        <div
          v-else-if="
            exchargeItem.goods_type === 'mic' ||
            exchargeItem.goods_type === 'title'
          "
          class="pointRewardLottie flex-center"
        >
          <PublicJson
            v-if="exchargeItem.goods_type === 'title'"
            class="title_animation"
            jsonName="ch_ylsn"
          />
          <public-json
            v-else-if="exchargeItem.goods_type === 'mic'"
            jsonName="sb_tmbb"
            class="mic_animation"
            :userAvatar="$store.state.user_icon"
          />
        </div>
        <!-- 锁定状态 -->
        <div class="lockStatus flex-center" v-if="isLock">
          <img :src="IconPath('mk1_2.png')" />
        </div>
      </div>
      <!-- 道具名称 -->
      <div class="ExchargeItem_Name flex-center">
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
        消耗<span class="focus-color"
          >{{ exchargeItem.price }}个{{ pointName }}</span
        >兑换 第二个<span class="focus-color">半价</span>
      </p>
      <p v-else>
        消耗<span class="focus-color"
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
      :class="ButtonStyle('2', exchargeItem.has_right)"
      @click="onExchargeClick(exchargeItem.has_right, exchargeItem.type)"
    >
      {{ ButtonText('2', exchargeItem.has_right) }}
    </div>
  </div>
</template>

<script>
import PublicJson from '@/pages/valentineDay/components/PublicJson.vue'
// import PublicSvga from '@/pages/valentineDay/components/PublicSvga.vue'

export default {
  name: 'ExchargeListItem',
  components: {
    // PublicSvga,
    PublicJson
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
  height: 168px;
  margin: 0 auto 17px;
  overflow: hidden;
  padding: 4px;
  border-radius: 16px;
  background-color: #feddff;
  // 图片样式
  .ExchargeListItem_Left {
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    justify-content: center;
    border-radius: 12px 0 0 12px;

    .ExchargeItem_Icon {
      position: relative;
      width: 100%;
      height: 124px;
      background: linear-gradient(180deg, #ffd7fd, #ffffff);
      border-radius: 12px 0px 0px 0px;
      // json容器
      .pointRewardLottie {
        width: 100%;
        height: 100%;

        .title_animation {
          ::v-deep .micAvatar_img {
            width: 73%;
            height: 73%;
          }

          ::v-deep .json_box {
            width: 85% !important;
          }
        }

        .mic_animation {
          ::v-deep .micAvatar_img {
            width: 83px;
            height: 83px;
          }

          ::v-deep .json_box {
            width: 120px !important;
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

      .title_class {
        width: 100%;
        height: auto;
      }

      //.car-class {
      //  width: 80%;
      //  height: auto;
      //}

      // 锁定样式
      .lockStatus {
        position: absolute;
        top: 0px;
        left: 0px;
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
    .ExchargeItem_Name {
      flex: 1;
      font-size: 24px;
      font-weight: 700;
      width: 100%;
      color: #fff;
      background-color: #7f54e5;
      border-radius: 0 0 0 12px;
    }
  }

  // 中间字体样式
  .ExchargeListItem_Center {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    border-radius: 0 12px 12px 0;
    background: linear-gradient(90deg, #a78bfb, #ffbdf8);

    p {
      color: #ffffff;

      .focus-color {
        color: #fffaa6 !important;
      }

      &:nth-child(1) {
        margin-top: 25px;
        font-size: 28px;
        font-weight: 500;
      }

      &:nth-child(2) {
        margin-top: 40px;
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
    bottom: 18px;
    right: 24px;
    width: 124px;
    height: 52px;
    border-radius: 26px;
  }
}
</style>
