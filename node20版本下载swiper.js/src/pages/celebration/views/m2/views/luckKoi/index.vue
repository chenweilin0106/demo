<template>
  <div class="luckKoi position-relative">
    <div class="rule margin-row-center flex align-end justify-center" :class="isShowRule && 'show'"><div class="showBtn" @click="isShowRule = !isShowRule"></div></div>
    <OutBox class="koiBox position-relative">
      <img :src="IconPath('mk6_4.png')" class="awardPreviewBtn position-absolute" />
      <img :src="IconPath('mk2_10.png')" class="winningListBtn position-absolute" />
      <div class="koiMain">
        <div class="koiCountDown flex align-center">
          <div class="leftText position-relative line-height-100" data-text="今日抽奖倒计时">今日抽奖倒计时</div>&nbsp;
          <van-count-down :time="24 * 60 * 60 * 1000" format="HH:mm:ss" @finish="countDownFinish" />
        </div>
        <div class="teamNum line-height-100 flex align-center width-fit">15支小队</div>
        <div class="awardsList flex align-center justify-center">
          <div v-for="item in 2" :key="item" class="icon-content flex-column position-relative">
            <div class="icon w-100 flex align-center justify-center"><PublicImg :imgName="'ljs_120_120.png'" :imgType="item.type" /></div>
            <div class="text flex align-center justify-center line-height-100 w-100">戒指+1</div>
          </div>
        </div>
        <img :src="IconPath('mk6_5.png')" class="teamBtn" />
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>锦鲤奖励在每日结束开奖，从<i>已产生幸运号码</i>的小</li>
          <li>队中抽取15支幸运小队，发放对应奖励</li>
          <li><span></span><i>小队每天0点重置</i></li>
        </ul>
      </div>
    </OutBox>
    <MyTam />
    <OutBox class="taskBox" title="mk2_title_6.png">
      <div v-for="item in 4" :key="item" class="taskItem flex align-center justify-between">
        <div class="taskText h-100 flex-column justify-between">
          <p class="line-height-100">每日登录活动页面</p>
          <p class="line-height-100"><i>砍价次数+1</i></p>
        </div>
        <PublicButton class="taskBtn">去完成</PublicButton>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="scrapeBox" title="mk2_title_7.png">
      <div class="openDate position-absolute text-center flex-column justify-center">每日0点<br><i>数量清零</i></div>
      <p class="flex justify-center line-height-100">刮出三个相同图案可立刻获得奖励</p>
      <p class="flex justify-center line-height-100">幸运号码有机会获得锦鲤大奖</p>
      <div class="scrapeCardsBox flex-column align-center">
        <div v-for="item in 5" :key="item" class="cardBox position-relative flex align-center">
          <div class="iconList flex-1 flex align-center justify-center"><img v-for="item in 3" :key="item" :src="IconPath(`${cardIconMap[item]}.png`)" class="icon" /></div>
          <div class="award flex align-center justify-center position-relative">
            <PublicImg :imgName="'ljs_120_120.png'" :imgType="''" />
            <div class="numLabel position-absolute" data-text="+10"><div class="inner">+10</div></div>
          </div>
          <div v-if="test1" v-swipe="swipe" class="overly position-absolute" :class="test && 'disappear'" @animationend="test1 = false"></div>
        </div>
        <div class="luckNumBox position-relative flex align-center justify-center line-height-100">
          sdfgd4768fs
          <div v-if="false" v-swipe="swipe" class="overly position-absolute"></div>
        </div>
      </div>
      <div class="scrapeBoxButtons flex justify-center">
        <img :src="IconPath('mk6_11.png')" class="historyBtn" />
        <div class="middleBtn flex-column align-center">
          <div class="cardsNum">未开启的刮刮乐：3</div>
          <div class="scrapeBtn flex align-center justify-center line-height-100">一键刮开</div>
        </div>
        <img :src="IconPath('mk6_12.png')" class="pricePoolBtn" />
      </div>
    </OutBox>
    <RulePopup v-if="isShowRulePopup" @clickClose="isShowRulePopup = false" />
    <PricePoolPopup v-if="isShowPricePoolPopup" @clickClose="isShowPricePoolPopup = false" />
    <RecordPopup v-if="isShowRecordPopup" @clickClose="isShowRecordPopup = false" />
    <WinningPopup v-if="isShowWinningPopup" @clickClose="isShowWinningPopup = false" />
  </div>
</template>

<script>
import swipe from './swipe'
import MyTam from '@/pages/celebration/views/m2/views/luckKoi/components/myTeam'
const RulePopup = () => import('./popups/rulePopup.vue')
const PricePoolPopup = () => import('./popups/pricePoolPopup.vue')
const RecordPopup = () => import('./popups/recordPopup.vue')
const WinningPopup = () => import('./popups/winningPopup.vue')
export default {
  name: 'luckKoi',
  props: [''],
  directives: { swipe },
  components: { MyTam, RulePopup, PricePoolPopup, RecordPopup, WinningPopup },
  data() {
    return {
      isShowRecordPopup: false, // 中奖记录弹框
      isShowRulePopup: false, // 活动规则弹框
      isShowPricePoolPopup: false, // 奖池弹框
      isShowWinningPopup: false, // 中奖名单弹框
      test1: true,
      test: false,
      cardIconMap: Object.freeze({ 1: 'mk6_13', 2: 'mk6_14', 3: 'mk6_15', 4: 'mk6_16', 5: 'mk6_17' }), // 刮刮卡图标对应id
      isShowRule: false // 顶部规则流程图展示
    }
  },
  watch: {},
  computed: {},
  methods: {
    swipe(direction, distance) {
      if (distance >= 20) {
        this.test = true
      }
    },
    countDownFinish() {}
  }
}
</script>

<style lang="scss" scoped>
.luckKoi {
  z-index: 1;
  .rule {
    margin-top: 29px;
    width: 713px;
    height: 67px;
    background: url('@/pages/celebration/assets/mk6_2.png') no-repeat left top/100% auto;
    &.show {
      height: 369px;
      background-image: url('@/pages/celebration/assets/mk6_1.png');
    }
    .showBtn {
      margin-bottom: 10px;
      width: 180px;
      height: 30px;
      //background-color: #fff;
    }
  }
  .koiBox {
    .awardPreviewBtn {
      top: 66px;
      right: -8px;
      width: 100px;
      height: 87px;
    }
    .winningListBtn {
      top: 146+ 298px;
      right: 12px;
      width: 158px;
      height: 48px;
    }
    .koiMain {
      margin-left: 115px;
      margin-bottom: -60px;
      width: 524px;
      height: 503px;
      background: url('@/pages/celebration/assets/mk6_3.png') no-repeat left top/100% 100%;
      padding-top: 23px;
      .koiCountDown {
        .leftText {
          margin-left: 74px;
          font-weight: 800;
          font-size: 32px;
          color: transparent; /* 字体颜色透明 只保留描边 */
          background: linear-gradient(-90deg, #C663FF 50%, #9B5EFF );
          -webkit-background-clip: text; /* 背景裁剪成字体 */
          &::after {
            z-index: -1;
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            text-shadow: 0 0 10px #fff,0 0 10px #fff;
            line-height: 100%;
          }
        }
        ::v-deep .van-count-down {
          font-weight: bold;
          font-size: 26px;
          color: #F552AE;
          line-height: 100%;
          text-shadow: 0 0 10px #fff,0 0 10px #fff;
        }
      }
      .teamNum {
        margin-top: 67px;
        margin-left: 295px;
        margin-bottom: 20px;
        padding: 0 11px;
        height: 41px;
        background: #FFFFFF;
        border-radius: 9999999px;
        font-weight: 800;
        font-size: 23px;
        color: #A37AFF;
      }
      .awardsList {
        .icon-content {
          width: 128px;
          height: 136px;
          padding: 4px;
          border-radius: 16px;
          background-color: #BDA2FA; /*todo 任务列表中道具边框颜色*/
          .icon {
            height: 89px;
            border-radius: 12px 12px 0 0;
            background: linear-gradient(0deg, #FFFFFF, #EECEFF);
          }
          .text {
            flex: 1;
            border-radius: 0 0 12px 12px;
            font-size: 22px;
            background-color: #7954E4;
            color: #fff;
          }
          &:nth-child(2) {
            margin-left: 14px;
          }
        }
      }
      .teamBtn {
        margin-left: 168px;
        margin-top: 48px;
        width: 185px;
        height: 53px;
      }
    }
  }
  .taskBox {
    padding-left: 36px;
    .taskItem {
      width: 674px;
      height: 154px;
      margin-bottom: 6px;
      background: url('@/pages/celebration/assets/mk8_26.png') no-repeat left top/100% 100%;
      padding: 0 44px 0 60px;
      .taskBtn {
        margin-left: 29px;
        width: 126px;
        height: 66px;
      }
      .taskText {
        flex: 1;
        padding: 38px 0 41px;
      }
      p {
        font-size: 27px;
        color: #FFFFFF;
        i {
          font-size: 24px;
          color: #FFEF85;
        }
      }
    }
  }
  .scrapeBox {
    >p {
      font-weight: 500;
      font-size: 28px;
      color: #6E56E7;
      margin-bottom: 16px;
    }
    .openDate {
      top: -20px;
      right: 11px;
      width: 215px;
      height: 107px;
      background: url('@/pages/celebration/assets/mk2_8.png') no-repeat left top/100% 100%;
      font-weight: 800;
      font-size: 24px;
      color: #F552AE;
      line-height: 24px;
      >i {
        color: #9360FC;
      }
    }
    .scrapeCardsBox {
      margin-left: 89px;
      width: 572px;
      height: 819px;
      background: url('@/pages/celebration/assets/mk6_8.png') no-repeat left top/100% 100%;
      padding-top: 110px;
      .cardBox {
        width: 485px;
        height: 90px;
        margin-bottom: 12px;
        background: url('@/pages/celebration/assets/mk6_7.png') no-repeat left top/100% 100%;
        .iconList {
          .icon {
            width: 67px;
            &:nth-child(2) {
              margin: 0 30px;
            }
          }
        }
        .award {
          width: 125px;
          height: 90px;
          .imgCompo {
            width: 75px;
            height: 75px;
          }
          .numLabel {
            bottom: 4px;
            right: 20px;
            $stroke: 4px; /* 描边宽度 建议不要看蓝湖 因为text-stroke会向字体内部延申 所以宽度不准确 和效果图类似即可 */
            z-index: 1;
            font-weight: 500;
            font-size: 20px;
            white-space: nowrap; /* 防止换行 */
            .inner {
              position: relative;
              z-index: 2;
              color: transparent; /* 字体颜色透明 只保留描边 */
              background: -webkit-linear-gradient(0deg, white, white); /* 渐变背景 */
              padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
              -webkit-background-clip: text; /* 背景裁剪成字体 */
            }
            &::before {
              content: attr(data-text); /* 继承文本 */
              position: absolute;
              z-index: 1;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
              color: transparent; /* 字体颜色透明 只保留描边 */
              -webkit-text-stroke: $stroke transparent; /* 字体描边 为渐变背景占位 背景会覆盖在描边上 */
              background: -webkit-linear-gradient(0deg, #7F63E3, #7F63E3); /* 渐变背景 */
              -webkit-background-clip: text; /* 背景裁剪成字体 */
              background-size: 100% 100%; /* 出现缝隙请调整 */
              background-position: 0% 1px; /* 出现缝隙请调整 */
            }
          }
        }
        &:nth-child(5) {
          margin-bottom: 0;
        }
        .overly {
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('@/pages/celebration/assets/mk6_6.png') no-repeat right top/auto 100%;
        }
      }
      .luckNumBox {
        margin-top: 80px;
        width: 485px;
        height: 65px;
        background: url('@/pages/celebration/assets/mk6_10.png') no-repeat left top/100% 100%;
        font-weight: 600;
        font-size: 30px;
        color: #8C75FF;
        .overly {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('@/pages/celebration/assets/mk6_9.png') no-repeat right top/auto 100%;
        }
      }
      .disappear {
        animation: disappear 1s linear;
      }
      @keyframes disappear {
        100% {
          left: 100%;
        }
      }
    }
    .scrapeBoxButtons {
      margin-top: 32px;
      padding-left: 10px;
      .historyBtn {
        width: 128px;
        height: 121px;
      }
      .middleBtn {
        margin: 0 40px;
        .cardsNum {
          font-weight: 500;
          font-size: 24px;
          color: #6E56E7;
        }
        .scrapeBtn {
          width: 304px;
          height: 93px;
          padding-bottom: 2px;
          background: url('@/pages/celebration/assets/mk2_20.png') no-repeat left top/100% 100%;
          font-size: 32px;
          color: #FFFFFF;
        }
      }
      .pricePoolBtn {
        width: 128px;
        height: 121px;
      }
    }
  }
}
</style>
