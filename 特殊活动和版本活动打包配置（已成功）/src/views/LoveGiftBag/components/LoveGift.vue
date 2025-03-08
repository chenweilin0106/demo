<template>
  <div class="LoveGift" :class="giftStyle">
    <div class="head flex_across" :class="`head_${style_type}`">
      <img :src="IconPath(title_icon)" alt="" />
    </div>
    <div
      class="main"
      :class="[
        `main_${style_type}`,
        {
          main_black_less:
            style_type === 'black' && gift_data.awards.length === 2
        }
      ]"
    >
      <div class="award_list">
        <div
          @click="showAward(award.name)"
          class="theme_item award_item"
          v-for="award in gift_data.awards"
          :key="award.id"
        >
          <!-- 角标（根据条件渲染） -->
          <div class="cornerLabels flex_across" v-if="award.price">
            <span>价值{{ award.price }}</span
            ><img :src="IconPath('zs_60_60.png')" alt="" />
          </div>
          <div class="img-top award_icon flex_across">
            <img v-if="award.icon" :src="IconPath(award.icon)" alt="" />
            <slot v-else></slot>
          </div>
          <div class="img-bottom award_text">
            {{ award.name + (award.type ? '' : award.text) }}
          </div>
        </div>
      </div>
      <!-- 购买按钮 -->
      <div
        class="buyBtn flex_across"
        :class="{
          buyBtn_count_down: gift_data.next_time,
          buyBtn_done: buyBtnDone
        }"
        @click="handleBuyBtn"
      >
        <!-- 价格（有次数就显示） -->
        <div class="price" v-if="gift_data.has_right === 1">
          <!-- 新价格 -->
          <div class="new_price flex_across">
            <img :src="IconPath('zs_60_60.png')" alt="" />{{
              gift_data.new_price
            }}
          </div>
          <!-- 老价格 -->
          <div class="old_price">原价:{{ gift_data.old_price }}钻石</div>
        </div>
        <!-- 倒计时（没有次数，不是最后一天，或者不是活动限购一次） -->
        <van-count-down
          v-if="+gift_data.next_time"
          :time="gift_data.next_time * 1000"
          :format="countDownFormat(gift_data.next_time)"
          @finish="$emit('updateData')"
        />
        <!-- 已购买（没有次数，最后一天，或者是活动限购一次） -->
        <div class="buyBtn_already" v-if="buyBtnDone">已购买</div>
      </div>
      <!-- 黑色背景-每日限购 -->
      <div v-if="style_type === 'black'" class="limit_num flex_across">
        {{ gift_data.gift_id === 1 ? '活动期间限购' : '每日限购' }}：{{
          gift_data.finish_times
        }}/{{ gift_data.max_times }}
      </div>
    </div>
    <div v-if="has_foot" class="foot" :class="`foot_${style_type}`">
      <template v-if="style_type === 'white'">
        <div class="limit_num flex_across">
          每日限购：{{ gift_data.finish_times }}/{{ gift_data.max_times }}
        </div>
        <img :src="IconPath('back.png')" alt="" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoveGift',
  props: ['gift_data', 'title_icon', 'style_type', 'has_foot'],
  computed: {
    // 已购买状态
    buyBtnDone() {
      return (
        this.gift_data.has_right === 2 &&
        (this.gift_data.next_time === 0 || this.gift_data.max_times === 1)
      )
    },
    // 倒计时格式
    countDownFormat() {
      return (time) => {
        if (time > 3600) {
          return 'HH小时后上架'
        } else if (time > 60) {
          return 'mm分钟后上架'
        }
        return 'ss秒后上架'
      }
    },
    // 礼包样式
    giftStyle() {
      return [
        `LoveGift_${this.style_type}`,
        {
          LoveGift_black_small:
            this.style_type === 'black' && this.gift_data.awards.length === 2
        }
      ]
    }
  },
  methods: {
    // 预览道具（丘比特座驾和气泡）
    showAward(name) {
      if (name === '座驾' || name === '气泡框') {
        this.$emit('showAward', name)
      }
    },
    handleBuyBtn() {
      // 需要判断当前是否还有次数购买
      if (this.gift_data.has_right === 2) return
      this.$emit('buyGift', this.gift_data)
    }
  }
}
</script>

<style scoped lang="scss">
.LoveGift {
  margin-bottom: 65px;
  .head {
    width: 100%;
    height: fit-content;
    > img {
      width: 258px;
      height: auto;
    }
  }
  .head_white {
    width: 355px;
    height: 44px;
    background: url('../../../assets/mk1_2.png') no-repeat top center/100% auto;
    > img {
      margin: -60px 0 0;
    }
  }
  .head_black {
    position: absolute;
    top: -43px;
  }
  .main {
    // 道具列表
    .award_list {
      // margin-top: 15px;
      width: 100%;
      height: fit-content;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-wrap: wrap;
      .award_item {
        position: relative;
        overflow: visible;
        width: 81px;
        height: 81px;
        border-radius: 10px;
        border: none;
        background: #a294fb;
        padding: 2px;
        .award_icon {
          width: 100%;
          height: 54px;
          border-radius: 8px 8px 0 0;
          background: linear-gradient(180deg, #ffcffa, #f3edff 130%) !important;
          img {
            height: 100%;
          }
        }
        .award_text {
          font-size: 12px;
          border-radius: 0 0 8px 8px;
        }
        // 角标
        .cornerLabels {
          position: absolute;
          z-index: 20;
          top: -6px;
          right: 0px;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          width: fit-content;
          height: 17px;
          background: linear-gradient(-90deg, #75b9ff, #ff84f8);
          border-radius: 0px 10px 0px 10px;
          padding: 0 2px 0 4px;
          > span {
            transform: scale(0.9);
          }
          img {
            position: relative;
            top: -1px;
            left: -1px;
            height: 15px;
          }
        }
      }
    }
    // 购买按钮
    .buyBtn {
      margin: 25px auto 0px;
      position: relative;
      width: 167px;
      height: 49.5px;
      background: url('../../../assets/mk3_6.png') no-repeat top center/100%
        auto;
      .price {
        .new_price {
          font-size: 18px;
          color: #fff;
          font-weight: 500;
          > img {
            margin-top: -4px;
            margin-right: 5px;
            width: 22px;
          }
        }
        .old_price {
          position: relative;
          font-size: 13px;
          color: #f5dbff;
          &::before {
            content: '';
            position: absolute;
            left: -55%;
            top: 5px;
            width: 105%;
            height: 1px;
            background-color: #f5dbff;
            transform: rotate(3deg) translateX(50%);
          }
        }
      }
      .buyBtn_already {
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        -webkit-text-stroke: 2px transparent;
        background: #a7a7a7;
        background-clip: text;
        // stroke-linejoin: round; /*描边转角处理方式*/
      }
    }
    // 购买按钮倒计时
    .buyBtn_count_down {
      // margin-top: 1px;
      opacity: 0.6;
      .van-count-down {
        margin-top: 3px;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
      }
    }
    // 购买按钮已购买
    .buyBtn_done {
      background-image: url('../../../assets/mk3_7.png') !important;
    }
  }
  .main_white {
    // w100%
    background: url('../../../assets/mk1_3.png') no-repeat top center/100% 100%;
    padding: 0 4px;
    .award_list {
      margin-top: 5px;
    }
    .buyBtn {
      margin-top: 22px;
    }
  }
  .main_black {
    padding: 40px 50px;
    .award_list {
      margin-top: 6px;
      .award_item {
        margin-top: 8px;
      }
    }
    // 每日限购
    .limit_num {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: #c7d3ff;
    }
    .buyBtn {
      margin-top: 24px;
    }
  }
  .main_black_less {
    padding: 38px 12px 41px;
    .limit_num {
      margin-top: 7px;
    }
  }
  .foot_white {
    position: relative;
    width: 100%;
    height: 45px;
    background: url('../../../assets/mk1_4.png') no-repeat top center/100% auto;

    img {
      position: absolute;
      top: 0px;
      z-index: -1;
      left: -10px;
      width: 375px;
      // height: 96px;
    }
    // 每日限购
    .limit_num {
      margin-top: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #6f59c3;
    }
  }
  .foot_black {
    position: absolute;
    z-index: -1;
    left: -8px;
    bottom: -50px;
    width: 375px;
    height: 96px;
    background: url('../../../assets/back.png') no-repeat top center/100% auto;
  }
}
.LoveGift_white {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 355px;
}
.LoveGift_black {
  position: relative;
  width: 358.5px;
  height: 343.5px;
  background: url('../../../assets/mk3_2.png') no-repeat top center/100% auto;
}
.LoveGift_black_small {
  height: 251.5px !important;
  background: url('../../../assets/mk3_1.png') no-repeat top center/100% auto !important;
}
</style>
