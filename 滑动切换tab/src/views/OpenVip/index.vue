<template>
  <div class="OpenVip">
    <BaseContainer v-if="true" class="bestExperience" title-icon="title_1.png">
      <img :src="IconPath('mk1_1.png')" class="experienceCardsRules position-absolute" @click="showExperienceCardsRulesPopup = true" />
      <div class="tip width-fit margin-row-center line-height-100">限未开通过会员的受邀用户购买，限购1次</div>
      <div v-for="(card, index) in experienceCardsArray" :key="index" class="experienceCard position-relative margin-row-center">
        <img :src="IconPath(card.icon)" class="cardIcon position-absolute w-100 h-100" />
        <div
          class="buyButton flex justify-center position-absolute align-center line-height-100"
          :class="true ? 'canBuyStyle' : 'cannotBuyStyle'"
          @click="buyCard"
        >
          {{ card.hasRight == 1 ? card.buttonText : cardsButtonTextMap[card.hasRight] }}
        </div>
      </div>
    </BaseContainer>
    <BaseContainer class="vipBackGifts" title-icon="title_2.png">
      <div class="giftsList flex align-center justify-center">
        <div v-for="(vipGift, index) in vipGiftsList" :key="index" class="giftContain">
          <div class="giftIconContain flex align-center justify-center position-relative">
            <img :src="IconPath(vipGift.labelIcon)" class="vipTipLabel position-absolute" />
            <img :src="IconPath(vipGift.icon)" class="giftIcon" />
          </div>
          <div class="giftText w-100 line-height-100 text-nowrap flex align-center justify-center">
            绿晶石<span class="deep">{{ vipGift.text }}</span>
          </div>
        </div>
      </div>
      <img :src="IconPath('button_1.png')" class="openVipButton margin-row-center block" @click="toVip" />
      <RuleText class="vipBackGiftsRulesText" :text-list="vipBackGiftsRulesText" />
    </BaseContainer>
    <BaseContainer class="vipTotalGifts position-relative" title-icon="title_3.png">
      <img :src="IconPath('mk1_14.png')" class="vipTotalGiftsRules position-absolute" @click="showShowAwardsPopup = true" />
      <div class="treasureBox margin-row-center position-relative">
        <div class="openTreasureBoxNumber position-absolute flex align-center justify-center line-height-100">剩余开启次数：0</div>
        <img :src="IconPath('mk1_15.png')" class="openTreasureBoxButton position-absolute position-row-center" @click="openTreasureBox" />
      </div>
      <RuleText class="vipTotalGiftsRulesText" :text-list="vipTotalGiftsRulesText" />
      <img :src="IconPath('mk1_17.png')" class="jumpVipHome block margin-row-center" @click="toVip" />
    </BaseContainer>
    <ExperienceCardsRulesPopup v-if="showExperienceCardsRulesPopup" @close="showExperienceCardsRulesPopup = false" />
    <ShowAwardsPopup v-if="showShowAwardsPopup" @close="showShowAwardsPopup = false" />
    <ConfirmBuyPopup v-if="showConfirmBuyPopup" @close="showConfirmBuyPopup = false" />
    <BuySuccessPopup v-if="showBuySuccessPopup" @close="showBuySuccessPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" :no-border="false" @close="showCongratsGetPopup = false" />
    <ChoosePaymentPopup v-if="showChoosePaymentPopup" :price="648" @close="showChoosePaymentPopup = false" />
  </div>
</template>

<script>
import { toVip } from '@/utils/toApp.js' // 跳转会员中心
import { _throttle } from '../../utils/tool' // 节流函数
import RuleText from '@/components/RuleText.vue' // 规则说明文本
const ChoosePaymentPopup = () => import('@/views/OpenVip/components/ChoosePaymentPopup.vue') // 选择支付方式弹框（Android支付需要）
const CongratsGetPopup = () => import('@/components/CongratsGetPopup.vue') // 恭喜获得弹框
const BuySuccessPopup = () => import('@/views/OpenVip/components/BuySuccessPopup.vue') // 购买成功弹框
const ConfirmBuyPopup = () => import('@/views/OpenVip/components/ConfirmBuyPopup.vue') // 确认购买弹框
const ShowAwardsPopup = () => import('@/views/OpenVip/components/ShowAwardsPopup.vue') // 奖励展示弹框
const ExperienceCardsRulesPopup = () => import('@/views/OpenVip/components/ExperienceCardsRulesPopup.vue') // 体验卡规则说明弹框
export default {
  name: 'OpenVip',
  components: {
    ChoosePaymentPopup,
    CongratsGetPopup,
    RuleText,
    ExperienceCardsRulesPopup,
    ShowAwardsPopup,
    ConfirmBuyPopup,
    BuySuccessPopup
  },
  data() {
    return {
      showChoosePaymentPopup: false, // 选择支付方式弹框显隐
      showCongratsGetPopup: false, // 恭喜获得弹框显隐
      congratsGetPopupData: [], // 恭喜获得弹框数据
      showBuySuccessPopup: false, // 购买成功弹框显隐
      showConfirmBuyPopup: false, // 确认购买弹框显隐
      showShowAwardsPopup: false, // 奖励展示弹框显隐
      showExperienceCardsRulesPopup: false, // 体验卡规则说明弹框显隐
      experienceCardsArray: [
        { icon: 'mk1_2.png', buttonText: '￥6元', hasRight: 1 },
        { icon: 'mk1_3.png', buttonText: '￥60元', hasRight: 1 },
        { icon: 'mk1_4.png', buttonText: '￥108元', hasRight: 1 }
      ],
      cardsButtonTextMap: Object.freeze({ 1: '购买', 2: '已购买', 3: '无法购买' }), // 体验卡按钮文字映射
      vipGiftsList: [
        { icon: 'ljs_120_120.png', text: '+300', labelIcon: 'mk1_7.png' },
        { icon: 'ljs_120_120.png', text: '+3280', labelIcon: 'mk1_8.png' },
        { icon: 'ljs_120_120.png', text: '+6480', labelIcon: 'mk1_9.png' }
      ],
      vipBackGiftsRulesText: [
        { text: '活动期间<i class="deep">每开通1个月正式会员</i>可自动获得对应数', circle: true },
        { text: '量的绿晶石奖励，开通多月可获得多次奖励', circle: false }
      ], // 会员返利规则说明
      vipTotalGiftsRulesText: [
        { text: '统计玩家在<i class="deep">2023年10月1日2024年4月22日</i>每个', circle: true },
        { text: '自然月的<i class="deep">会员开通记录</i>，开通银卡、金卡、黑卡', circle: false },
        { text: '分别可获得1、3、5次开启次数', circle: false },
        { text: '若存在一个月内开通多种档位的会员，则选取<i class="deep">最</i>', circle: true },
        { text: '<i class="deep">高档位</i>计算；一次性开通多月的按<i class="deep">一次开通记录</i>', circle: false },
        { text: '<i class="deep">统计</i>；多个月份开通开启<i class="deep">次数累积</i>', circle: false },
        { text: '每次开启宝箱用户可随机获得一种奖励；开启次', circle: true },
        { text: '数<i class="deep">请及时使用</i>，活动结束后将会清零。', circle: false }
      ] // 连续会员礼规则说明
    }
  },
  computed: {},
  methods: {
    /**
     * @description 开启宝箱
     */
    openTreasureBox: _throttle(function () {}),
    /**
     * @description 购买体验卡
     */
    buyCard: _throttle(function () {}),
    toVip
  }
}
</script>

<style lang="scss" scoped>
.OpenVip {
  .bestExperience {
    margin-bottom: 51px;
    padding-top: 90px;
    height: 795px;
    .experienceCardsRules {
      top: 23px;
      right: 27px;
      width: 127px;
      height: 31px;
    }
    .tip {
      font-weight: 500;
      font-size: 26px;
      color: #e78902;
    }
    .experienceCard {
      margin-top: 16px;
      width: 662px;
      height: 201px;
      .cardIcon {
        top: 0;
        left: 0;
      }
      .buyButton {
        bottom: 22px;
        right: 16px;
        width: 160px;
        height: 68px;
        background: no-repeat left top/100% 100%;
        padding-bottom: 11px;
      }
      .canBuyStyle {
        font-weight: 800;
        font-size: 28px;
        color: #cb7d02;
        background-image: url('@/assets/mk1_5.png');
      }
      .cannotBuyStyle {
        font-weight: bold;
        font-size: 26px;
        color: #828282;
        background-image: url('@/assets/mk1_6.png');
      }
    }
  }
  .vipBackGifts {
    padding-top: 98px;
    height: 589px;
    .giftsList {
      .giftContain {
        width: 185px;
        .giftIconContain {
          padding-top: 30px;
          width: 185px;
          height: 190px;
          background: url('@/assets/mk1_12.png') no-repeat left top/100% 100%;
          .vipTipLabel {
            left: -5px;
            top: -2px;
            width: 183px;
            height: 41px;
          }
          .giftIcon {
            width: 80%;
          }
        }
        .giftText {
          margin-top: 20px;
          font-weight: bold;
          font-size: 28px;
          color: #733412;
        }
        &:nth-child(2) {
          margin: 0 42px;
        }
      }
    }
    .openVipButton {
      margin-top: 25px;
      margin-bottom: 19px;
      width: 363px;
      height: 100px;
    }
    .vipBackGiftsRulesText {
      margin-left: 56px;
    }
  }
  .vipTotalGifts {
    margin-top: 54px;
    padding-top: 95px;
    height: 1109px;
    .vipTotalGiftsRules {
      top: 5px;
      right: 13px;
      width: 56px;
      height: 56px;
    }
    .treasureBox {
      margin-bottom: 30px;
      width: 603px;
      height: 511px;
      background: url('@/assets/mk1_16.png') no-repeat left top/100% 100%;
      .openTreasureBoxNumber {
        right: 0;
        top: -16px;
        min-width: 237px;
        width: fit-content;
        height: 46px;
        background: #f16f07;
        border-radius: 23px 23px 0px 23px;
        font-weight: 500;
        font-size: 26px;
        color: #ffffff;
        padding: 0 18px;
      }
      .openTreasureBoxButton {
        bottom: 18px;
        width: 280px;
        height: 115px;
      }
    }
    .vipTotalGiftsRulesText {
      margin-left: 56px;
    }
    .jumpVipHome {
      margin-top: 35px;
      width: 328px;
      height: 72px;
    }
  }
}
</style>
