<template>
  <theme-box theme-title-img="title_12.png" class="LuckStar">
    <div class="rule_btn" @click="$emit('showRule')"></div>
    <div class="lucky_star_tip_1">
      <p>购买任意双十一礼包可得1次摘星机会</p>
    </div>
    <div class="star_award">
      <div class="award_icon">
        <img :src="IconPath('zcjb_120_120.png')" />
        <div class="label">
          <span>266钻</span>
        </div>
      </div>
      <div class="award_text">
        <p>累计摘星{{ star_award.max }}次可得招财进宝</p>
        <p>
          礼物赠送权+7天<i class="speical_color"
            >({{ numLimit(star_award.finish_times, star_award.max) }}/{{
              star_award.max
            }})</i
          >
        </p>
      </div>
      <div class="award_btn" @click="getAward">
        <img v-if="star_award.has_right == 0" :src="IconPath('mk5_13.png')" />
        <img
          v-else-if="star_award.has_right == 1"
          :src="IconPath('mk5_13_1.png')"
        />
        <img v-else :src="IconPath('mk5_13_2.png')" />
      </div>
    </div>
    <div class="star_lottery">
      <div class="lottery_times flex_across">
        剩余摘星次数：<span>{{ star_nums }}</span>
      </div>
      <div class="buy_gifts_num flex_across">
        已购买礼包：<span>{{ gift_buy_nums }}</span>
      </div>
      <div class="lottery_btns">
        <div
          class="theme_botton_undid lottery_one_time"
          @click="$emit('lottery', 1)"
        >
          <span>摘1次</span>
        </div>
        <div
          class="theme_botton_did lottery_ten_times"
          @click="$emit('lottery', 2)"
        >
          <span>摘10次</span>
        </div>
      </div>
    </div>
    <!--轮播图-->
    <div class="star_awards_swiper">
      <!--标题图片-->
      <div class="star_awards_swiper_title"></div>
      <!--轮播图-->
      <div class="star_awards_swiper_main">
        <div class="grey_border">
          <MarQuee />
        </div>
      </div>
    </div>
  </theme-box>
</template>

<script>
import MarQuee from '@/pages/1111/components/MarQuee.vue'

export default {
  name: 'LuckStar',
  components: { MarQuee },
  props: ['star_award', 'star_nums', 'gift_buy_nums'],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    getAward() {
      if (this.star_award.has_right == 1) {
        this.$emit('getAward')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.LuckStar {
  width: 360px;
  height: 640px;

  .rule_btn {
    position: absolute;
    top: 16px;
    right: 15px;
    width: 30px;
    height: 30px;
    background: url('../../../assets/mk5_1.png') no-repeat left top/100% 100%;
  }

  .lucky_star_tip_1 {
    margin-top: 30px;

    p {
      text-align: center;
      font-size: 15px;
      color: #ffffff;
      line-height: 24px;
    }
  }

  .star_award {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 12px auto 0;
    width: 336px;
    height: 80px;
    background: #272783;

    .award_icon {
      position: relative;
      width: 60px;
      height: 60px;
      background: #1f1b76;
      border-radius: 6px;

      > img {
        width: 100%;
      }

      .label {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 12px;
        background: #506ad7;
        border-radius: 6px;

        span {
          position: absolute;
          left: 50%;
          top: 50%;
          font-size: 12px;
          font-weight: 400;
          color: #ffffff;
          transform: translate(-50%, -50%) scale(0.75);
          white-space: nowrap;
        }
      }
    }

    .award_text {
      width: 182px;
      height: 100%;
      padding-top: 13px;
      font-size: 15px;
      font-weight: 500;
      color: #ffffff;
      line-height: 24px;
      white-space: nowrap;

      .speical_color {
        color: #fff99e;
        margin: 0 3px;
      }

      p {
      }
    }

    .award_btn {
      width: 56px;
      height: 56px;

      > img {
        width: 100%;
      }

      //background: url('../../assets/mk5_13.png') no-repeat left top/100% 100%;
    }
  }

  .star_lottery {
    margin-top: 5px;
    position: relative;
    width: 100%;
    height: 397px;
    background: url('../../../assets/mk5_14.png') no-repeat center top/100% auto;

    .lottery_times {
      position: absolute;
      left: 0;
      top: 12px;
      min-width: 125px;
      width: fit-content;
      padding: 0 12px;
      height: 24px;
      background: #506ad7;
      white-space: nowrap;
      border-radius: 0px 12px 12px 0px;
      font-size: 12px;
      color: #ffffff;

      > span {
        color: #fff99e;
      }
    }

    .buy_gifts_num {
      position: absolute;
      right: 0;
      top: 12px;
      min-width: 100px;
      width: fit-content;
      height: 24px;
      background: #506ad7;
      border-radius: 12px 0px 0px 12px;
      white-space: nowrap;
      padding: 0 10px;
      font-size: 12px;
      color: #ffffff;

      > span {
        color: #fff99e;
      }
    }

    .lottery_btns {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      bottom: 91px;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);

      .lottery_one_time,
      .lottery_ten_times {
        width: 142px;
        height: 38px;
        border-radius: 19px;
      }

      .lottery_one_time {
      }

      .lottery_ten_times {
        //margin-left: ;
      }
    }
  }

  .star_awards_swiper {
    margin-top: -50px;

    .star_awards_swiper_title {
      margin: 0 auto;
      width: 248px;
      height: 17px;
      background: url('../../../assets/mk5_15.png') no-repeat left top/100% 100%;
    }

    .star_awards_swiper_main {
      margin: 10px auto 0;
      width: 336px;
      height: 90px;
      background: #272783;
      border-radius: 5px;
      padding: 2px;

      .grey_border {
        width: 100%;
        height: 100%;
        border: 1px solid #5555c2;
        border-radius: 5px;
      }
    }
  }
}
</style>
