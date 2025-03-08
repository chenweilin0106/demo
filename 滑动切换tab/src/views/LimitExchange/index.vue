<template>
  <div class="LimitExchange">
    <BaseContainer title-icon="title_8.png" class="timingAwards">
      <div class="timingAwardsTip width-fit margin-row-center line-height-100">限量发放会员福利，手慢无</div>
      <div class="giftsContain margin-row-center">
        <div class="giftsTabs flex align-center">
          <div
            v-for="(card, index) in vipCardGiftsList"
            :key="index"
            class="tab position-relative flex-1 flex justify-center"
            :class="currentCardIndex == index && 'tabActive'"
            @click="$refs.giftsMainSwipe.swipeTo(index)"
          >
            <span class="timeName line-height-100">{{ card.timeText }}</span>
          </div>
        </div>
        <div class="giftsMain position-relative">
          <van-swipe
            ref="giftsMainSwipe"
            class="giftsMain-swipe w-100 h-100"
            :loop="false"
            :show-indicators="false"
            :initial-swipe="startIndex"
            @change="(index) => (currentCardIndex = index)"
          >
            <van-swipe-item v-for="(gift, index) in vipCardGiftsList" :key="index" class="w-100 h-100 flex-column align-center">
              <div v-for="(award, index) in gift.awards" :key="index" class="awardContain flex-column align-center">
                <img :src="IconPath(award.icon)" class="awardIcon" />
                <div class="awardText text-nowrap">
                  {{ award.text }}<span class="deep">{{ award.num }}</span>
                </div>
              </div>
              <div class="timingAwardsButton">
                <div v-if="true" class="notOpen w-100 h-100 line-height-100 flex align-center justify-center">12:00开启</div>
                <img v-else :src="IconPath(timingAwardsButtonMap[1])" class="w-100 h-100" @click="clickTimingAwardsButton" />
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </BaseContainer>
    <div class="vipShopNotice position-relative">
      <img :src="IconPath('mk3_5.png')" class="jumpVipShop position-absolute" @click="toVipShop" />
    </div>
    <BaseContainer title-icon="title_9.png" class="superExchange">
      <div class="myVipCoin margin-row-center width-fit flex align-center justify-center line-height-100">
        我的会员币<img :src="IconPath('hyb_120_120.png')" />: 0
      </div>
      <div class="vipGifts">
        <div v-for="item in 1" :key="item" class="vipGift position-relative">
          <img :src="IconPath('mk3_6.png')" class="vipGiftBg w-100 h-100 position-absolute" />
          <div
            class="vipGiftButton align-center justify-center receiveButton position-absolute flex line-height-100"
            :class="'receiveButton' || 'finishButton'"
            @click="clickVipGiftButton"
          >
            10<img :src="IconPath('mk3_13.png')" />兑换
          </div>
          <div class="vipGiftNumber line-height-100 position-absolute">限兑：0/2</div>
        </div>
      </div>
      <div class="otherGifts">
        <div v-for="item in 2" :key="item" class="otherGift position-relative margin-row-center">
          <img :src="IconPath('mk3_10.png')" class="giftName position-absolute" />
          <div class="otherGiftAwardsList flex align-center">
            <div v-for="item in 2" :key="item" class="otherGiftAward flex-column align-center">
              <div class="otherGiftAwardIcon w-100 flex align-center justify-center">
                <img :src="IconPath('mtjz_120_120.png')" class="h-100" />
              </div>
              <div class="otherGiftAwardText line-height-100 text-nowrap w-100">萌兔戒指+1</div>
            </div>
          </div>
          <div
            class="otherGiftButton position-absolute flex align-center justify-center line-height-100"
            :class="'otherGiftButtonReceive' || 'otherGiftButtonFinish'"
            @click="clickVipGiftButton"
          >
            8<img :src="IconPath('mk3_13.png')" />兑换
          </div>
          <div class="otherGiftNumber position-absolute">限兑：0/5</div>
        </div>
      </div>
      <div class="goldGifts width-fit margin-row-center flex align-center">
        <div v-for="item in 3" :key="item" class="goldGift flex-column align-center">
          <div class="goldIconContainer position-relative w-100 flex-column align-center">
            <img :src="IconPath('yb_120_120.png')" class="goldIcon" />
            <div class="goldText text-nowrap line-height-100">元宝+10万</div>
            <div
              class="goldGiftButton position-absolute position-row-center flex align-center justify-center line-height-100"
              @click="clickVipGiftButton"
            >
              20<img :src="IconPath('mk3_13.png')" />兑换
            </div>
          </div>
          <div class="goldGiftNumber line-height-100 text-nowrap">不限兑</div>
        </div>
      </div>
      <RuleText :text-list="superExchangeText" />
    </BaseContainer>
    <CongratsGetPopup v-if="showCongratsGetPopup" :no-border="false" :list="congratsGetPopupData" @close="showCongratsGetPopup = false" />
  </div>
</template>

<script>
import { toVipShop } from '@/utils/toApp.js' // 跳转会员店
import CongratsGetPopup from '@/components/CongratsGetPopup' // 恭喜获得弹框
import RuleText from '@/components/RuleText.vue' // 规则说明文本
import { _throttle } from '@/utils/tool.js' // 节流函数

export default {
  name: 'LimitExchange',
  components: { RuleText, CongratsGetPopup },
  data() {
    return {
      showCongratsGetPopup: false, // 恭喜获得弹框
      congratsGetPopupData: [], // 恭喜获得弹框数据
      timingAwardsButtonMap: Object.freeze({ 1: 'button_2.png', 2: 'button_7.png', 3: 'button_8.png', 4: 'button_1.png' }), // 限量好礼按钮图标Map
      superExchangeText: Object.freeze([
        { text: '会员币可在会员商店兑换奖励，本期活动结束后', circle: true },
        { text: '将<i class="deep">清空会员币</i>，请及时使用', circle: false },
        { text: '礼物赠送权为会员特权礼物，使用钻石赠送会员', circle: true },
        { text: '特权礼物时中奖概率<i class="deep">大幅提升</i>', circle: false }
      ]), // 超值兑换规则文本
      currentCardIndex: 0, // 当前选中的时间点索引
      startIndex: 0, // 轮播图初始索引
      vipCardGiftsList: Object.freeze([
        { timeText: '00:00', awards: [{ icon: 'zs_120_120.png', text: '钻石', num: '+20' }] },
        { timeText: '12:00', awards: [{ icon: 'zs_120_120.png', text: '钻石', num: '+300' }] },
        { timeText: '18:00', awards: [{ icon: 'zs_120_120.png', text: '钻石', num: '+666' }] },
        { timeText: '22:00', awards: [{ icon: 'zs_120_120.png', text: '钻石', num: '+666' }] }
      ]) // 会员专属礼包奖励列表
    }
  },
  methods: {
    /**
     * @description: 点击超值兑换按钮
     */
    clickVipGiftButton: _throttle(function () {}),
    /**
     * @description: 点击限量好礼按钮
     */
    clickTimingAwardsButton: _throttle(function () {}),
    toVipShop
  },
  mounted() {
    if (this.$route.query.scroll) {
      const top = document.querySelector('.superExchange').offsetTop // 获取元素距离顶部的距离
      window.scrollTo({ top, behavior: 'smooth' }) // 滚动到指定位置
    }
  }
}
</script>

<style lang="scss" scoped>
.LimitExchange {
  .timingAwards {
    padding-top: 94px;
    height: 531px;
    .timingAwardsTip {
      margin-bottom: 25px;
      font-weight: 500;
      font-size: 28px;
      color: #733412;
    }
    .giftsContain {
      width: 640px;
      .giftsTabs {
        margin-bottom: -4px;
        .tab {
          z-index: 3;
          height: 53px;
          font-weight: 500;
          font-size: 30px;
          color: #e1932f;
          background: url('@/assets/mk3_2.png') no-repeat left top/100% 100%;
          .timeName {
            padding-top: 15px;
            height: fit-content;
          }
        }
        .tabActive {
          color: #fff;
          background-image: url('@/assets/mk3_1.png');
        }
      }
      .giftsMain {
        z-index: 2;
        height: 302px;
        background: url('@/assets/mk3_3.png') no-repeat left top/100% 100%;
        .giftsMain-swipe {
          .van-swipe-item {
            padding-top: 30px;
          }
          .awardContain {
            width: 188px;
            height: 137px;
            background: url('@/assets/mk2_14.png') no-repeat left top/100% 100%;
            .awardIcon {
              margin-top: -6px;
              width: 110px;
              height: 110px;
            }
            .awardText {
              margin-top: -10px;
              font-weight: bold;
              font-size: 28px;
              color: #733412;
            }
            &:nth-child(2) {
              margin-left: 80px;
            }
          }
          .timingAwardsButton {
            margin-top: 23px;
            width: 364px;
            height: 100px;
            .notOpen {
              opacity: 0.7;
              font-weight: bold;
              font-size: 34px;
              color: #ffffff;
              background: url('@/assets/button_5.png') no-repeat left top/100% 100%;
              padding-bottom: 14px;
              padding-left: 3px;
            }
          }
        }
      }
    }
  }
  .vipShopNotice {
    margin-top: 15px;
    margin-bottom: 33px;
    width: 750px;
    height: 332px;
    background: url('@/assets/mk3_4.png') no-repeat left top/100% 100%;
    .jumpVipShop {
      bottom: 28px;
      right: 42px;
      width: 186px;
      height: 72px;
    }
  }
  .superExchange {
    padding-top: 95px;
    height: 1689px;
    .myVipCoin {
      margin-bottom: 22px;
      min-width: 320px;
      padding: 0 10px;
      height: 48px;
      background: #ffdd80;
      border-radius: 24px;
      font-size: 28px;
      color: #733412;
      > img {
        width: 64px;
        height: 64px;
      }
    }
    .vipGifts {
      .vipGift {
        width: 671px;
        height: 439px;
        .vipGiftButton {
          padding-bottom: 13px;
          left: 235px;
          bottom: 22px;
          width: 224px;
          height: 79px;
          background: no-repeat left top/100% 100%;
          font-weight: 500;
          font-size: 28px;
          color: #ffffff;
          > img {
            width: 32px;
            height: 32px;
          }
        }
        .vipGiftNumber {
          left: 470px;
          bottom: 55px;
          font-weight: 500;
          font-size: 26px;
          color: #f75170;
        }
        .receiveButton {
          background-image: url('@/assets/mk3_7.png');
        }
        .finishButton {
          background-image: url('@/assets/mk3_8.png');
        }
      }
    }
    .otherGifts {
      .otherGift {
        margin-top: 52px;
        width: 640px;
        height: 255px;
        background: url('@/assets/mk3_9.png') no-repeat left top/100% 100%;
        .giftName {
          top: -48px;
          left: -21px;
          width: 287px;
          height: 84px;
        }
        .otherGiftAwardsList {
          padding-top: 55px;
          .otherGiftAward {
            width: 120px;
            .otherGiftAwardIcon {
              height: 120px;
              background: url('@/assets/mk3_14.png') no-repeat left top/100% 100%;
            }
            .otherGiftAwardText {
              margin-top: 18px;
              font-weight: 500;
              font-size: 26px;
              color: #c15c21;
            }
            &:nth-child(1) {
              margin-left: 44px;
            }
            &:nth-child(2) {
              margin-left: 63px;
            }
          }
        }
        .otherGiftButton {
          padding-bottom: 13px;
          bottom: 70px;
          right: 18px;
          width: 224px;
          height: 79px;
          font-weight: 500;
          font-size: 28px;
          color: #ffffff;
          background: no-repeat left top/100% 100%;
          > img {
            width: 32px;
            height: 32px;
          }
        }
        .otherGiftNumber {
          bottom: 44px;
          left: 455px;
          font-weight: 500;
          font-size: 26px;
          color: #c15c21;
        }
        .otherGiftButtonReceive {
          background-image: url('@/assets/mk3_7.png');
        }
        .otherGiftButtonFinish {
          background-image: url('@/assets/mk3_8.png');
        }
      }
    }
    .goldGifts {
      margin-top: 21px;
      .goldGift {
        width: 192px;
        .goldIconContainer {
          height: 193px;
          background: url('@/assets/mk3_12.png') no-repeat left top/100% 100%;
          .goldIcon {
            width: 120px;
            height: 120px;
          }
          .goldText {
            margin-top: -8px;
            font-size: 28px;
            color: #9a4619;
          }
          .goldGiftButton {
            bottom: -20px;
            padding-bottom: 14px;
            width: 200px;
            height: 70px;
            font-weight: 500;
            font-size: 28px;
            color: #ffffff;
            //background-color: pink;
            background: url('@/assets/mk3_7.png') no-repeat left top/100% auto;
            > img {
              width: 32px;
              height: 32px;
            }
          }
        }
        .goldGiftNumber {
          margin-top: 17px;
          font-weight: 500;
          font-size: 24px;
          color: #e17342;
        }
        &:nth-child(2) {
          margin: 0 34px;
        }
      }
    }
    .RuleText {
      margin-top: 20px;
      margin-left: 56px;
    }
  }
}
</style>
