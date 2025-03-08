<template>
  <!-- 每一项 -->
  <div class="ExchargeGiftItem flex_vertical">
    <div class="award_info">
      <div class="top_img flex_across">
        <img v-if="giftData.icon" :src="IconPath(giftData.icon)" alt="" />
        <div class="ExchargeGift_Lottie_Box" v-else>
          <PublicJson
            :lottieJson_name="'sb_tsqs'"
            :lottieJson="sb_tsqs"
            :userAvatar="$store.getters.user_icon"
          />
        </div>
      </div>
      <div class="middle_text">
        <p class="flex_across">{{ giftData.name }}</p>
        <p v-if="giftData.max_times" class="flex_across">
          （{{ giftData.exchange_times }}/{{ giftData.max_times }}）
        </p>
        <p v-else class="flex_across">不限次数</p>
      </div>
      <div
        v-if="!isOutBtn"
        class="theme_botton_did bottom_btn flex_across"
        :class="{
          theme_botton_done: +giftData.has_right === 2,
          lock_btn: giftData.locker > credit_spend
        }"
        @click="onExchargeBtn"
      >
        <img
          v-if="+giftData.has_right === 1"
          :src="IconPath('mk5_10.png')"
          alt=""
        />
        <span v-if="+giftData.has_right === 1">{{ giftData.price }}</span>
        {{ String(giftData.has_right).includes('1') ? '兑换' : '已兑换' }}
      </div>
      <!-- 角标 -->
      <div class="award_badge flex_across">
        {{ giftData.text }}
      </div>
    </div>
    <div
      v-if="isOutBtn"
      class="theme_botton_did bottom_btn flex_across"
      :class="{
        theme_botton_done: +giftData.has_right === 2
      }"
      @click="onExchargeBtn"
    >
      <img
        v-if="+giftData.has_right === 1"
        :src="IconPath('mk5_10.png')"
        alt=""
      />
      <span v-if="+giftData.has_right === 1">{{ giftData.price }}</span>
      {{ String(giftData.has_right).includes('1') ? '兑换' : '已兑换' }}
    </div>
  </div>
</template>

<script>
import sb_tsqs from '../../../assets/lottie/sb_tsqs/data.json'
import PublicJson from '../../../components/PublicJson'
// 节流函数
import { throttle } from '../../../utils/tool'
export default {
  name: 'ExchargeGiftItem',
  components: {
    PublicJson
  },
  props: ['giftData', 'isOutBtn', 'credit_spend'],
  data() {
    return {
      sb_tsqs
    }
  },
  methods: {
    onExchargeBtn: throttle(function () {
      if (+this.giftData.has_right === 1) {
        this.$emit('openExchargeGiftDialog', this.giftData)
      }
    }, 1200)
  }
}
</script>

<style scoped lang="scss">
.ExchargeGiftItem {
  .award_info {
    position: relative;
    margin-top: 13px;
    width: 80px;
    // height: 115px;
    background: #d6fffe;
    border-radius: 10px;
    padding-top: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top_img {
      width: 70px;
      height: 70px;
      background: linear-gradient(180deg, #5da0ee, #0db294);
      box-shadow: inset 0px 0px 6px 0px #4f65cb;
      border-radius: 12px;
      margin-bottom: 8px;
      > img {
        // width: 100%;
        height: 100%;
      }
      .ExchargeGift_Lottie_Box {
        .PublicJson {
          ::v-deep .micAvatar_img {
            top: 11px;
            left: 10px;
            width: 48px;
            height: 48px;
          }
        }
      }
    }
    .middle_text {
      color: #3270b9;
      font-size: 12px;
      p:nth-of-type(1) {
        font-weight: 600;
        width: 100%;
      }
      p:nth-of-type(2) {
        width: 100%;
        margin: 2px 0;
      }
    }
    // 角标
    .award_badge {
      position: absolute;
      font-size: 12px;
      color: #fff;
      top: -5px;
      right: -1px;
      padding: 3px 4px;
      height: 18px;
      background: linear-gradient(-90deg, #57b8ae, #8bdc83);
      border-radius: 9px 9px 9px 0px;
    }
  }
  .bottom_btn {
    margin-top: 7px;
    width: 77px;
    height: 32px;
    border-radius: 32px;
    font-size: 12px;
    > img {
      margin-right: 1px;
      height: 16px;
    }
    > span {
      font-size: 12px;
      text-align: left;
      width: 19px;
    }
  }
  .lock_btn {
    opacity: 0.5;
  }
}
</style>
