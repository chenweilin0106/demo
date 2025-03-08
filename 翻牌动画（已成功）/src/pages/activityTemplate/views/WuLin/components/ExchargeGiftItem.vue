<template>
  <!-- 每一项 -->
  <div class="ExchargeGiftItem flex_vertical">
    <lazy-component class="top_img">
      <img
        v-if="giftData.icon"
        v-lazy="require(`../../assets/${giftData.icon}`)"
        alt=""
      />
      <div class="merge_lottie" v-else>
        <!-- <PublicJson
          class="merge_lottie_gbw"
          v-if="giftData.type.includes('mic')"
          :lottieJson_name="'gbw'"
          :lottieJson="gbw"
          :userAvatar="store.getters.user_icon"
          :eleClass="'AwardGbw'"
        ></PublicJson> -->
      </div>
    </lazy-component>
    <div class="middle_text">
      <p class="flex_across">{{ giftData.name + giftData.text }}</p>
      <p v-if="giftData.max_times" class="flex_across">
        ({{ giftData.exchange_times }}/{{ giftData.max_times }})
      </p>
      <p v-else class="flex_across">不限次数</p>
    </div>
    <div
      class="theme_botton_did bottom_btn flex_across"
      :class="{
        theme_botton_done: +giftData.has_right === 2
      }"
      @click="clickMerge(giftData)"
    >
      <img
        v-if="+giftData.has_right === 1"
        v-lazy="require('../../assets/js_40_39.png')"
        alt=""
      />
      <span v-if="+giftData.has_right === 1">{{ giftData.price }}</span>
      {{ String(giftData.has_right).includes('1') ? '合成' : '已合成' }}
    </div>
  </div>
</template>

<script>
// 节流函数
import { throttle } from '../../utils/tool'
export default {
  name: 'ExchargeGiftItem',
  components: {},
  props: ['giftData'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickMerge: throttle(function () {
      if (+this.giftData.has_right === 1) {
        this.$emit('openExchargeGiftDialog', this.giftData)
        // if (+this.pageData.bead_nums >= +giftData.price) {
        //   this.$emit('ExchargeDialog', giftData)
        //   // this.dialogData = data
        //   // this.dialogType = 'merge'
        //   // this.showDialog = true
        // } else {
        //   this.$toast('龙珠不足')
        // }
      }
    }, 1200)
  }
}
</script>

<style scoped lang="scss">
.ExchargeGiftItem {
  margin-top: 13px;
  width: 95px;
  height: 157px;
  background: linear-gradient(0deg, #719dee, #8fd1e9);
  border-radius: 10px;
  padding-top: 7px;
  .top_img {
    width: 69px;
    height: 69px;
    background: #4f82d9;
    border: 2px solid #e3f2ff;
    border-radius: 10px;
    margin-bottom: 8px;
    > img {
      width: 100%;
    }
    .merge_lottie {
      .PublicJson {
        .micAvatar_img {
          width: 78% !important;
          height: 78% !important;
        }
      }
    }
  }
  .middle_text {
    p:nth-of-type(1) {
      width: 100%;
      color: #fff;
      font-size: 13px;
    }
    p:nth-of-type(2) {
      font-size: 12px;
      color: #fff68f;
      width: 100%;
      margin: 6px 0;
    }
  }
  .bottom_btn {
    width: 75px;
    height: 24px;
    border-radius: 12px;
    font-size: 13px;
    justify-content: flex-start;
    > img {
      margin-right: 3px;
      height: 20px;
    }
    > span {
      color: #e57700;
      font-size: 12px;
      text-align: left;
      width: 14px;
    }
  }
  .flex_across {
    justify-content: center !important;
  }
}
</style>
