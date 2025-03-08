<template>
  <div class="EnjoyBenefits" @click="openBubble">
    <BaseContainer title-icon="title_5.png" class="exclusiveGifts">
      <div class="giftsContain margin-row-center">
        <div class="giftsTabs flex align-center">
          <div
            v-for="(card, index) in vipCardGiftsList"
            :key="index"
            class="tab position-relative flex-1 flex justify-center"
            :class="currentCardIndex == index && 'tabActive'"
            @click="$refs.giftsMainSwipe.swipeTo(index)"
          >
            <img :src="IconPath(card.icon)" class="cardIcon" /><span class="cardName">{{ card.cardName }}</span>
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
            <van-swipe-item v-for="(gift, index) in vipCardGiftsList" :key="index" class="w-100 h-100 flex align-center justify-center">
              <div v-for="(award, index) in gift.awards" :key="index" class="awardContain flex-column align-center">
                <img :src="IconPath(award.icon)" class="awardIcon" />
                <div class="awardText text-nowrap">
                  {{ award.text }}<span class="deep">{{ award.num }}</span>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!-- 会员专属礼包 -->
      <img :src="IconPath(exclusiveGiftsButtonMap[0])" class="exclusiveGiftsButton block margin-row-center" @click="clickExclusiveGiftsButton" />
      <RuleText :text-list="exclusiveGiftsText" />
    </BaseContainer>
    <BaseContainer title-icon="title_6.png" class="firstRechargeDouble">
      <RuleText :text-list="firstRechargeDoubleText" />
      <!-- 首充双倍福利按钮 立即充值 -->
      <div class="firstRechargeDoubleButton margin-row-center position-relative" @click="recharge">
        <img :src="IconPath('mk2_4.png')" class="doubleLabel position-absolute pointer-none" />
      </div>
    </BaseContainer>
    <BaseContainer title-icon="title_7.png" class="firstRechargeGifts">
      <!-- 首充列表奖励列表 -->
      <div class="firstAwardsList flex align-center justify-center">
        <div v-for="(award, index) in firstRechargeGiftsList" :key="index" class="firstAward position-relative">
          <div class="firstAwardInner w-100 h-100 flex-column align-center justify-between">
            <template>
              <img v-if="checkedIndex === index" :src="IconPath('mk2_5.png')" class="checkButton position-absolute" @click="checkedIndex = index" />
              <img v-else :src="IconPath('mk2_6.png')" class="checkButton position-absolute" @click="checkedIndex = index" />
            </template>
            <lazy-component class="firstAwardIcon overflow-x-hidden overflow-y-hidden">
              <img v-if="award.icon" class="h-100" :src="IconPath(award.icon)" />
              <PublicSvga
                v-else-if="award.type == 'mic'"
                svga-name="ts_laxh"
                user-avatar="https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg"
              />
              <PublicJson
                v-else-if="award.type == 'voice'"
                json-name="sb_yywg"
                user-avatar="https://imagevo.dandanvoice.com/test/ufile/head/20220106/20011/16121641449711.jpg"
              />
            </lazy-component>
            <div class="awardType text-nowrap width-fit">{{ award.typeText }}</div>
            <div class="awardName text-nowrap width-fit">{{ award.name }}</div>
          </div>
        </div>
      </div>
      <!-- 首充礼包按钮 -->
      <img :src="IconPath(firstRechargeButtonMap[0])" class="firstAwardsButton block margin-row-center" @click="clickFirstRechargeButton" />
      <RuleText :text-list="firstRechargeGiftsText" />
      <div class="firstTasksList"></div>
      <div class="tasksList margin-row-center flex-column align-center">
        <div class="myVipCoin width-fit flex align-center justify-center line-height-100">
          我的会员币<img :src="IconPath('hyb_120_120.png')" />: 0
        </div>
        <div v-for="item in 4" :key="item" class="taskItem position-relative flex">
          <div v-if="item == 2" class="bubble position-absolute" @click.stop="openBubble">
            <transition name="bubbleFade" appear>
              <div v-if="showBubble" class="bubbleMain position-column-center flex-column justify-between position-absolute">
                <p class="text-nowrap">会员充值还能获得金豆兑</p>
                <p class="text-nowrap">换更多奖励，前往查看：</p>
                <img :src="IconPath('mk2_13.png')" class="jumpVipShopButton block" @click.stop="toVipShop" />
              </div>
            </transition>
          </div>
          <div class="taskItem-iconBox flex-column">
            <div class="taskItem-iconContent w-100 flex align-center justify-center">
              <img :src="IconPath('hyb_120_120.png')" class="taskItem-icon w-100" />
            </div>
            <div class="taskItem-textContent w-100 flex-1 text-nowrap flex align-center justify-center line-height-100">会员币+1</div>
          </div>
          <div class="taskItem-textBox">
            <div class="taskItem-goodsName line-height-100">文本文本文本</div>
            <div class="taskItem-goodsNumber line-height-100">
              <i v-if="true" class="text-indent-half block deep">（0/1）</i>
              <i v-else>奖励自动派发，无需手动领取</i>
            </div>
          </div>
          <div
            class="taskItem-buttonBox position-absolute position-column-center flex justify-center line-height-100"
            :class="buttonClassMap[0]"
            @click="clickTaskButton"
          >
            领取
          </div>
        </div>
        <div class="RuleText">
          <div class="row position-relative">
            <span class="circle position-absolute radius-50 position-column-center"></span>
            <p class="flex align-center flex-no-wrap text-nowrap line-height-100">
              会员币可用于兑换商品，请前往<span
                class="toLimitExchangeButton flex align-center justify-center line-height-100 text-nowrap"
                @click="$router.replace({ path: '/limitExchange', query: { scroll: true } })"
              >
                限定兑换
              </span>
              查看
            </p>
          </div>
          <div class="row text-indent-half line-height-100">（仅会员可获得会员币）</div>
        </div>
      </div>
    </BaseContainer>
    <CongratsGetPopup v-if="showCongratsGetPopup" :no-border="true" :list="congratsGetPopupData" @close="showCongratsGetPopup = false">
      <template v-slot="{ data: { type } }">
        <PublicJson v-if="type == 'voice'" jsonName="sb_yywg" :userAvatar="$store.state.user_icon" />
        <PublicSvga v-else-if="type == 'mic'" svgaName="ts_laxh" :userAvatar="$store.state.user_icon" />
      </template>
    </CongratsGetPopup>
  </div>
</template>

<script>
import CongratsGetPopup from '@/components/CongratsGetPopup.vue' // 恭喜获得弹框
import RuleText from '@/components/RuleText.vue' // 规则说明文本
import PublicSvga from '@/components/PublicSvga.vue' // SVGA动画组件
import PublicJson from '@/components/PublicJson.vue' // JSON动画组件
import { _throttle } from '../../utils/tool' // 节流函数
import { recharge, toVip, toVipShop } from '../../utils/toApp' // recharge: 调用APP充值 toVip: 跳转会员中心 toVipShop: 跳转会员店
export default {
  name: 'EnjoyBenefits',
  components: { PublicJson, PublicSvga, RuleText, CongratsGetPopup },
  data() {
    return {
      congratsGetPopupData: [], // 恭喜获得弹框数据
      showCongratsGetPopup: false, // 恭喜获得弹框
      bubbleTimer: null, // 气泡定时器
      showBubble: false, // 是否显示气泡
      startIndex: 0, // 会员专属礼包初始索引
      currentCardIndex: 0, // 当前选中的会员卡索引
      exclusiveGiftsButtonMap: Object.freeze({ 0: 'button_6.png', 1: 'button_2.png', 2: 'button_7.png', 3: 'button_1.png' }), // 会员专属礼包按钮Map 0未激活 1领取 2已领取 3立即开通会员
      exclusiveGiftsText: Object.freeze([{ text: '活动当天，所有会员可领<i class="deep">双份</i>每日会员专属礼包', circle: true }]), // 会员专属礼包文本
      firstRechargeDoubleText: Object.freeze([
        { text: '活动当天所有会员可享受安卓、iOS和代充三端', circle: true },
        { text: '<i class="deep">500以下额度首充双倍福利重置</i>', circle: false },
        { text: '活动当天开通会员，同样享受500以下额度首充', circle: false },
        { text: '双倍福利重置', circle: false },
        { text: '每个用户<i class="deep">当日只享受一次</i>首充重置，会员专享重', circle: true },
        { text: '置和其他活动内重置不共享', circle: false }
      ]), // 首充双倍文本
      firstRechargeGiftsText: Object.freeze([
        { text: '活动期间，开通会员后充值任意一笔，可自选兑', circle: true },
        { text: '换1个限时装扮', circle: false },
        { text: '购买礼包、会员（含使用账户现金在超值兑换中', circle: true },
        { text: '兑换会员）、活力卡不计入充值', circle: false }
      ]), // 首充礼包文本
      firstRechargeButtonMap: Object.freeze({ 0: 'button_4.png', 1: 'button_7.png', 2: 'button_1.png' }), // 首充礼包按钮映射 0 确认领取 1 已领取 2 开通会员
      vipCardGiftsList: Object.freeze([
        {
          cardName: '银卡',
          icon: 'card_silver_120_120.png',
          awards: [
            { icon: 'zs_120_120.png', text: '钻石', num: '+20' },
            { icon: 'sjlb_120_120.png', text: '世界喇叭', num: '+1' }
          ]
        },
        {
          cardName: '金卡',
          icon: 'card_gold_120_120.png',
          awards: [
            { icon: 'zs_120_120.png', text: '钻石', num: '+300' },
            { icon: 'sjlb_120_120.png', text: '世界喇叭', num: '+2' }
          ]
        },
        {
          cardName: '黑卡',
          icon: 'card_black_120_120.png',
          awards: [
            { icon: 'zs_120_120.png', text: '钻石', num: '+666' },
            { icon: 'sjlb_120_120.png', text: '世界喇叭', num: '+3' }
          ]
        }
      ]), // 会员专属礼包奖励列表
      firstRechargeGiftsList: Object.freeze([
        { icon: '', typeText: '头饰', name: '恋爱循环+7天', type: 'mic' },
        { icon: 'mk2_7.png', typeText: '主页特效', name: '缤纷世界+7天', type: 'costume' },
        { icon: '', typeText: '声波', name: '荧荧微光+7天', type: 'voice' }
      ]), // 首充礼包奖励列表
      checkedIndex: '', // 选中的首充礼包奖励索引
      buttonClassMap: Object.freeze({ 0: 'buttonNoFinish', 1: 'buttonReceive', 2: 'buttonFinish' }) // 任务按钮样式Map 0 未完成 1 领取 2 已领取
    }
  },
  watch: {},
  methods: {
    /**
     * @description 点击首充礼包按钮
     */
    clickFirstRechargeButton: _throttle(function () {}),
    /**
     * @description 点击任务按钮
     */
    clickTaskButton: _throttle(function () {}),
    /**
     * @description 点击会员专属礼包按钮
     */
    clickExclusiveGiftsButton: _throttle(function () {}),
    openBubble() {
      if (this.showBubble) {
        this.showBubble = false
        clearTimeout(this.bubbleTimer)
        this.bubbleTimer = null
      } else {
        this.showBubble = true
        this.bubbleTimer = setTimeout(() => {
          this.showBubble = false
          clearTimeout(this.bubbleTimer)
          this.bubbleTimer = null
        }, 5000)
      }
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    test() {
      console.log(123)
    },
    recharge,
    toVip,
    toVipShop
  }
}
</script>

<style lang="scss" scoped>
.bubbleFade-enter-active,
.bubbleFade-leave-active {
  transition: all 0.3s;
}
.bubbleFade-enter,
.bubbleFade-leave-to {
  opacity: 0;
}
.EnjoyBenefits {
  .RuleText {
    margin-left: 56px;
  }
  .exclusiveGifts {
    padding-top: 105px;
    height: 575px;
    .giftsContain {
      width: 625px;
      .giftsTabs {
        margin-bottom: -5px;
        .tab {
          padding-bottom: 5px;
          z-index: 1;
          height: 63px;
          font-weight: 500;
          font-size: 28px;
          color: #6c7497;
          background: url('@/assets/mk2_2.png') no-repeat left top/100% 100%;
          .cardIcon {
            width: 64px;
            height: 64px;
          }
          .cardName {
            padding-top: 20px;
            height: fit-content;
          }
          &:nth-child(2) {
            color: #b9631e;
          }
          &:nth-child(3) {
            color: #434343;
          }
        }
        .tabActive {
          z-index: 3;
          background-image: url('@/assets/mk2_1.png');
        }
      }
      .giftsMain {
        z-index: 2;
        height: 192px;
        background: url('@/assets/mk2_3.png') no-repeat left top/100% 100%;
        .giftsMain-swipe {
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
        }
      }
    }
    .exclusiveGiftsButton {
      margin-top: 21px;
      margin-bottom: 25px;
      width: 363px;
      height: 100px;
    }
  }
  .firstRechargeDouble {
    padding-top: 98px;
    margin-top: 52px;
    margin-bottom: 53px;
    height: 481px;
    .firstRechargeDoubleButton {
      margin-top: 20px;
      width: 363px;
      height: 100px;
      background: url('@/assets/button_3.png') no-repeat left top/100% 100%;
      .doubleLabel {
        top: -28px;
        right: -24px;
        width: 100px;
        height: 87px;
      }
    }
  }
  .firstRechargeGifts {
    padding-top: 106px;
    height: 1542px;
    .firstAwardsList {
      .firstAward {
        width: 196px;
        height: 255px;
        background: linear-gradient(0deg, rgba(255, 233, 167, 0.8), rgba(255, 201, 66, 0.8));
        padding: 4px;
        border-radius: 30px 60px 30px 30px;
        .checkButton {
          z-index: 1;
          top: 0;
          right: -4px;
          width: 51px;
          height: 43px;
        }
        .firstAwardInner {
          padding: 15px 0;
          background: linear-gradient(180deg, #ffd76b, #fff7c5);
          border-radius: 26px 56px 26px 26px;
        }
        &:nth-child(2) {
          margin: 0 20px;
        }
        .firstAwardIcon {
          width: 140px;
          height: 140px;
          ::v-deep .svgaContainer {
            .avatarContainer {
              width: 78%;
              height: 78%;
            }
          }
          ::v-deep .jsonContainer {
            .avatarContainer {
              width: 65%;
              height: 65%;
            }
          }
        }
        .awardType {
          font-weight: 500;
          font-size: 22px;
          color: #f24306;
        }
        .awardName {
          font-weight: bold;
          font-size: 26px;
          color: #733412;
        }
      }
    }
    .firstAwardsButton {
      margin-top: 24px;
      margin-bottom: 20px;
      width: 363px;
      height: 100px;
    }
    .tasksList {
      margin-top: 30px;
      width: 660px;
      height: 838px;
      background: linear-gradient(0deg, #fff8e4, #fff0be);
      border-radius: 30px;
      .myVipCoin {
        margin-bottom: 22px;
        margin-top: 26px;
        min-width: 320px;
        padding: 0 10px;
        height: 48px;
        background: #ffffff;
        border-radius: 24px;
        font-size: 28px;
        color: #733412;
        > img {
          width: 64px;
          height: 64px;
        }
      }
      .taskItem {
        width: 630px;
        height: 132px;
        background: linear-gradient(90deg, #ffdf71, #cfbeff);
        box-shadow: 0px 4px 4px 0px rgba(255, 212, 97, 0.52);
        border-radius: 22px;
        margin-bottom: 26px;
        .bubble {
          z-index: 1;
          top: 10px;
          right: 9px;
          width: 32px;
          height: 32px;
          background: url('@/assets/mk2_11.png') no-repeat left top/100% 100%;
          .bubbleMain {
            left: -274px;
            width: 272px;
            height: 120px;
            padding: 10px 0 10px 20px;
            background: url('@/assets/mk2_12.png') no-repeat left top/100% 100%;
            font-size: 20px;
            color: #ffffff;
            transform-origin: 100% 50%;
            .jumpVipShopButton {
              margin-left: 46px;
              margin-bottom: -5px;
              width: 128px;
              height: 48px;
            }
          }
        }
        .taskItem-iconBox {
          margin: auto 26px auto 28px;
          width: 112px;
          height: 106px;
          background: #ffffff;
          border-radius: 19px;
          padding: 3px;
          .taskItem-iconContent {
            height: 69px;
            border-radius: 16px 16px 0 0; // GoodsCard-iconBox的border-radius - border-width
            background-color: #ffffff;
          }
          .taskItem-textContent {
            font-weight: 500;
            font-size: 22px;
            color: #ffffff;
            background: #c57c0a;
            border-radius: 0px 0px 16px 16px; // GoodsCard-iconBox的border-radius - border-width
          }
        }
        .taskItem-textBox {
          margin: auto 0;
          .taskItem-goodsName {
            font-weight: 500;
            font-size: 30px;
            color: #733412;
          }
          .taskItem-goodsNumber {
            margin-top: 24px;
            font-weight: 500;
            font-size: 24px;
            color: #da9426;
          }
        }
        .taskItem-buttonBox {
          right: 16px;
          width: 186px;
          height: 81px;
          padding-top: 21px;
          border-radius: 33px;
          font-weight: 500;
          font-size: 28px;

          background: no-repeat left top/100% 100%;
        }
        .buttonReceive {
          color: #ffffff;
          background-image: url('@/assets/mk2_8.png');
        }
        .buttonNoFinish {
          color: #cd8c00;
          background-image: url('@/assets/mk2_9.png');
        }
        .buttonFinish {
          color: #ffffff;
          background-image: url('@/assets/mk2_10.png');
        }
      }
      .RuleText {
        margin-left: 30px;
      }
      .RuleText {
        .row {
          font-weight: 500;
          font-size: 28px;
          color: #c16d6f;
          .circle {
            left: -41px;
            width: 31px;
            height: 31px;
            background: url('@/assets/mk1_13.png') no-repeat left top/100% 100%;
          }
          .toLimitExchangeButton {
            width: 130px;
            height: 52px;
            background: linear-gradient(0deg, #ff5d15, #ffbe31);
            box-shadow: 0px -3px 13px 0px rgba(255, 255, 255, 0.35);
            border-radius: 26px;
            border: 3px solid #ffe190;
            font-weight: 500;
            font-size: 24px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
