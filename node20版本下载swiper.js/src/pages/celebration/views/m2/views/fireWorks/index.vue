<template>
  <div class="fireWorks">
    <SignIn />
    <OutBox class="wishingWell" title="mk2_title_15.png">
      <img :src="IconPath('mk2_10.png')" class="winningBtn position-absolute" />
      <PublicCard class="progressBox flex align-center justify-center position-relative">
        <div class="leftBox flex-column align-center justify-center">
          <div class="timeTip line-height-100">11.17 23:59开奖</div>
          <img :src="IconPath('mk5_16.png')" class="redPackIcon" />
          <p class="line-height-100">现金红包</p>
        </div>
        <div class="rightBox flex-column align-center">
          <div class="currentNum line-height-100">当前累计中奖名额：20人</div>
          <div class="progress position-relative">
            <div class="progressInner" :class="`widthAnimate_${3}`"></div>
            <div class="points flex position-absolute">
              <div v-for="item in pointsData" :key="item" class="point flex-column align-center">
                <img :src="IconPath('mk5_15.png')" class="pointIcon" />
                <div class="pointNum line-height-100">{{ item }}</div>
              </div>
            </div>
          </div>
          <div class="progressText flex align-center justify-center">活动开始至11.17 23:59<br>根据本玩法参与热度，每达到一个进度，<br>新增10个现金红包中奖名额</div>
        </div>
        <div v-if="false" class="overly position-absolute"><img :src="IconPath('mk5_25.png')" class="mark position-absolute" /></div>
      </PublicCard>
      <div class="wishingAwards flex">
        <div class="position-relative width-fit">
          <img :src="IconPath('mk5_17.png')" class="" />
          <div class="overly position-absolute"><img :src="IconPath('mk5_25.png')" class="mark position-absolute" /></div>
        </div>
        <div class="position-relative width-fit">
          <img :src="IconPath('mk5_18.png')" class="" />
          <div class="overly position-absolute"><img :src="IconPath('mk5_25.png')" class="mark position-absolute" /></div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>奖池共分为<i style="color: #F552AE">三个阶段</i>，每阶段从拥有参与资格的玩</li>
          <li>家中抽取幸运玩家获得奖励，玩家一次获奖后不会</li>
          <li>重复获奖</li>
          <li><span></span><i style="color: #F552AE">解锁【签到就送】进阶奖励</i>即可参与，最多参与三</li>
          <li>次开奖</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="meeting" title="mk2_title_14.png">
      <DateSwiper />
      <div class="fireWorksBox position-relative">
        <RowBarrage v-if="false" :list="[]" />
        <img v-if="true" :src="IconPath('mk5_23.png')" class="benedictionText position-absolute" />
        <div v-if="false" class="fireWorksAnimate position-absolute pointer-none">
          <PublicImg imgName="2024115_mk5_21yanhua"></PublicImg>
        </div>
        <div class="sendBtn position-row-center position-absolute flex-column align-center justify-center">
          <div class="fireWorksNum position-absolute flex align-center line-height-100">烟花筒<img :src="IconPath('yht_48_39.png')" class="" />：0</div>
          <p class="line-height-100">发送烟花祝福</p>
          <p class="line-height-100 flex align-center">消耗<img :src="IconPath('yht_48_39.png')" class="" />x1</p>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>每次送出烟花祝福可随机获得<i>10,000-50,000元宝</i></li>
          <li><span></span>烟花筒需在当日使用，0点时重置道具数量</li>
        </ul>
      </div>
    </OutBox>
    <WinningPopup v-if="isShowWinningPopup" @clickClose="isShowWinningPopup = false" />
    <SendPopup v-if="isShowSendPopup" @clickClose="isShowSendPopup = false" />
    <ChoosePaymentPopup v-if="isShowChoosePaymentPopup" :price="choosePaymentPopupData" @confirm="confirmPayment" @close="isShowChoosePaymentPopup = false" />
  </div>
</template>

<script>
// import { isIOS, appPay } from '@/utils/toApp'
import SignIn from '@/pages/celebration/views/m2/views/fireWorks/components/SignIn.vue'
import RowBarrage from '@/pages/celebration/views/m2/views/fireWorks/components/rowBarrage.vue'
import DateSwiper from '@/pages/celebration/views/m2/views/fireWorks/components/dateSwiper.vue'
const WinningPopup = () => import('@/pages/celebration/views/m2/views/fireWorks/popups/winningPopup.vue')
const SendPopup = () => import('@/pages/celebration/views/m2/views/fireWorks/popups/sendPopup.vue')
const ChoosePaymentPopup = () => import('@/pages/celebration/views/m2/views/fireWorks/popups/ChoosePaymentPopup.vue')
export default {
  name: 'fireWorks',
  props: [''],
  components: { DateSwiper, RowBarrage, SignIn, WinningPopup, SendPopup, ChoosePaymentPopup },
  data() {
    return {
      maxPollTimer: null, // 最大轮询次数定时器
      judgeBuySuccessTimer: null, // 判断购买成功定时器
      choosePaymentPopupData: 6, // 选择支付方式弹窗数据
      isShowChoosePaymentPopup: false, // 选择支付方式弹窗
      isShowWinningPopup: false, // 中奖名单弹窗
      isShowSendPopup: false, // 发送祝福弹窗
      pointsData: ['5000', '1万', '1.5万', '2万', '2.5万', '3万']
    }
  },
  created() {

  },
  watch: {},
  computed: {},
  methods: {
    /**
     * @description 清除最大轮询次数定时器
     */
    clearMaxPollTimer() {
      clearTimeout(this.maxPollTimer)
      this.maxPollTimer = null
    },
    /**
     * @description 清除判断购买成功定时器
     */
    clearJudgeBuySuccessTimer() {
      clearInterval(this.judgeBuySuccessTimer)
      this.judgeBuySuccessTimer = null
    },
    /**
     * @description 校验通过 可以购买 开启轮询判断是否购买成功
     */
    judgeBuySuccess() {
      // this.judgeBuySuccessTimer = setInterval(async () => {
      //   const res = await poll(this.currentBuyingCard?.id)
      //   if (!res.errno) {
      //     this.clearJudgeBuySuccessTimer()
      //     this.clearMaxPollTimer()
      //     this.buySuccessPopupData = this.currentBuyingCard
      //     this.showBuySuccessPopup = true
      //     this.getPageData()
      //   }
      // }, 1000)
      // this.maxPollTimer = setTimeout(() => {
      //   this.$toast('购买失败，请稍后再试')
      //   this.clearJudgeBuySuccessTimer()
      //   this.clearMaxPollTimer()
      // }, 120000)
    },
    async buy() {
      // if (this.judgeBuySuccessTimer) return this.$toast('请稍后再试') // 20240625 4.购买交互(1)
      // const res = await buyBefore(this.currentBuyingCard.id) // 发送购买前校验请求 判断是否可以购买
      // if (res.errno) return this.$toast(res.errmsg)
      // if (isIOS()) {
      //   appPay(this.currentBuyingCard)
      //   this.judgeBuySuccess()
      // } else {
      //   this.choosePaymentPopupData = 6
      //   this.isShowChoosePaymentPopup = true
      // }
    },
    confirmPayment() {},
    async getPageData() {
      // const res = await getPageData('m1')
      // if (res.errno) return this.$toast(res.errmsg)
      // Object.assign(this, res.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.fireWorks {
  .wishingWell {
    padding-top: 112px;
    .winningBtn {
      top: 39px;
      right: 23px;
      width: 158px;
    }
    .progressBox {
      margin-left: 53px;
      width: 649px;
      height: 308px;
      border-radius: 42px;
      margin-bottom: 23px;
      .overly {
        z-index: 1;
        top: 0;
        left: 0;
        width: 645px;
        height: 304px;
        background: rgba(33, 17, 59, 0.4);
        border-radius: 40px;
        .mark {
          bottom: 22px;
          right: 11px;
          width: 140px;
        }
      }
      .leftBox  {
        width: 173px;
        .timeTip {
          font-weight: 800;
          font-size: 25px;
          color: #9FF0FF;
        }
        .redPackIcon {
          margin-top: 10px;
          width: 173px;
          height: 169px;
        }
        p {
          margin-top: 8px;
          font-weight: bold;
          font-size: 28px;
          color: #FFFFFF;
        }
      }
      .rightBox {
        .currentNum {
          font-weight: bold;
          font-size: 28px;
          color: #FFF95F;
          margin-bottom: 33px;
        }
        .progress {
          width: 395px;
          height: 22px;
          background: #644BB5;
          border-radius: 11px;
          @mixin progressWidth($w, $i) {
            @keyframes progressWidth#{$i} {
              0% {
                width: 0%;
              }
              100% {
                width: $w;
              }
            }
          }
          .progressInner {
            //width: 8%; // 5000
            //width: 26%; // 1w
            //width: 45%; // 1.5w
            //width: 63%; // 2w
            //width: 82%; // 2.5w
            //width: 100%; // 3w
            height: 100%;
            background: linear-gradient(0deg, #FFD821, #FFF8A7);
            border-radius: inherit;
            //animation: progressWidth 2s linear infinite;
            //.widthAnimate_1 {
            //  width: 50%;
            //}
            //animation: progressWidth3 1s linear infinite;
          }
          $widthArr: ((8%), (26%), (45%), (63%), (82%), (100%));
          @for $i from 1 through length($widthArr) {
            .widthAnimate_#{$i} {
              $w: nth($widthArr, $i);
              @include progressWidth($w, $i);
              animation: progressWidth#{$i} 1s linear infinite;
            }
          }
          .points {
            left: 0;
            top: -21px;
            .point {
              margin-right: 27px;
              &:last-child {
                margin-right: 0;
              }
              .pointIcon {
                width: 40px;
              }
              .pointNum {
                font-weight: 500;
                font-size: 22px;
                color: #FFFFFF;
              }
            }
          }
        }
        .progressText {
          margin-top: 51px;
          width: 432px;
          height: 112px;
          background: rgba(107, 68, 223, 0.4);
          border-radius: 56px;
          font-weight: 500;
          font-size: 22px;
          color: #FFFFFF;
          line-height: 28px;
          padding-left: 32px;
        }
      }
    }
    .wishingAwards {
      margin-bottom: 27px;
      img {
        width: 278px;
      }
      >div {
        margin-left: 72px;
        &:nth-child(2) {
          margin-left: 47px;
        }
      }
      .overly {
        z-index: 1;
        top: 2px;
        left: 2px;
        bottom: 2px;
        right: 2px;
        background: rgba(33, 17, 59, 0.4);
        border-radius: 40px;
        .mark {
          bottom: 100px;
          right: 7px;
          width: 140px;
        }
      }
    }
  }
  .meeting {
    .giftsContain {
    }
    .fireWorksBox {
      margin-top: 24px;
      margin-left: 42px;
      width: 670px;
      height: 1104px;
      background: url('@/pages/celebration/assets/mk5_22.png') no-repeat left top/100% 100%;
      .benedictionText {
        left: 10px;
        top: 325px;
        width: 636px;
        height: 176px;
      }
      .fireWorksAnimate {
        top: 200px;
        left: -30px;
        width: 750px;
        height: 800px;
      }
      .sendBtn {
        bottom: 39px;
        width: 308px;
        height: 119px;
        background: url('@/pages/celebration/assets/mk7_6.png') no-repeat left top/100% 100%;
        .fireWorksNum {
          right: 50%;
          top: 3px;
          transform: translateX(50%) translateY(-100%);
          font-size: 26px;
          color: #FFFFFF;
          >img {
            width: 48px;
          }
        }
        p {
          font-size: 32px;
          color: #FFFFFF;
          &:nth-child(3) {
            font-size: 24px;
            color: #FDFF6B;
            >img {
              width: 48px;
            }
          }
        }
      }
    }
  }
}
</style>
