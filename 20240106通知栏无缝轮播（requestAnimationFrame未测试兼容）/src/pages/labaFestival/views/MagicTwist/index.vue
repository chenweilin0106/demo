<template>
  <div class="MagicTwist">
    <!-- 神奇扭蛋 -->
    <ThemeBox
      class="MagicTwist_box"
      themeTitleImg="mk1_1.png"
      themeTitleImg2="title_5.png"
      :is-question="true"
      @onQuestion="openPrompt('probabilityDeclaration')"
    >
      <div class="my_info">
        <div class="recharge">已充值：{{ pageData.recharge }}</div>
        <div class="ticket_nums">
          剩余<img src="../../assets/mk4_2.png" alt="" />：{{ pageData.ticket }}
          <img
            src="../../assets/mk4_3.png"
            @click="openPrompt('ticketTip', 1)"
          />
        </div>
      </div>
      <div class="machine">
        <my-marquee :list="pageData.carousel" />
        <div class="leftBtn" @click="lotteryMagicEgg(1)"></div>
        <div class="rightBtn" @click="lotteryMagicEgg(2)"></div>
        <div class="record" @click="openPrompt('MyRecord')"></div>
      </div>
      <!-- 说明文字 -->
      <div class="ThemeBox_BottomText">
        <ul>
          <li>
            <span></span>活动期间，每充值30元可以获得<i>1张扭蛋券</i
            ><img src="../../assets/mk4_2.png" alt="" />
          </li>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活</li>
          <li>力卡不计算在内</li>
        </ul>
      </div>
    </ThemeBox>

    <!--恭喜获得弹框 奖励数量大于等于10-->
    <congrats-get-self-prompt ref="congratsGetSelf" :list="dialogData" />

    <!-- 恭喜获得弹框 奖励数量小于10 -->
    <congrats-get-prompt ref="congratsGet" :list="dialogData" />

    <!-- 概率说明 -->
    <probability-declaration-prompt ref="probabilityDeclaration" />

    <!-- 每充值30元可获得1扭蛋券：type 1 扭蛋次数不足，请前往充值：type 2 -->
    <ticket-tip-prompt ref="ticketTip" />

    <!-- 我的记录 -->
    <my-record-prompt ref="MyRecord" />

    <!-- 符石背包满了 -->
    <backpack-full-prompt ref="backpackFull" />
  </div>
</template>

<script>
import MyMarquee from './components/my-marquee.vue'
import { magicEgg } from '../../utils/pageData'
import backpackFullPrompt from './components/backpack-full-prompt.vue'
import MyRecordPrompt from './components/my-record-prompt.vue'
import TicketTipPrompt from './components/ticket-tip-prompt.vue'
import ProbabilityDeclarationPrompt from './components/probability-declaration-prompt.vue'
import CongratsGetSelfPrompt from './components/congrats-get-self-prompt.vue'
import CongratsGetPrompt from '@/pages/labaFestival/components/congrats-get-prompt.vue'
import { getPageData } from '@/pages/labaFestival/api'
import { compareVersions } from '../../utils/toApp'
export default {
  name: 'MagicTwist',
  components: {
    MyRecordPrompt,
    TicketTipPrompt,
    CongratsGetSelfPrompt,
    CongratsGetPrompt,
    backpackFullPrompt,
    ProbabilityDeclarationPrompt,
    MyMarquee
  },
  data() {
    return {
      dialogData: []
    }
  },
  created() {
    this.pageData = magicEgg
    // this.getPageData({ type: 'tab', mark: 'm4' })
  },
  methods: {
    // 符石背包不足处理
    backpackFull(errno) {
      const app_version = this.$store.getters.app_version
      const flag = compareVersions(app_version, '5.7.8')
      if (flag == -1) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      const fullBagType = errno == -5 ? 1 : 2
      this.openPrompt('backpackFull', fullBagType)
    },
    // 扭1次/扭10次
    async lotteryMagicEgg(mark) {
      if (+this.pageData.ticket <= 0) return this.$refs.ticketTip.openPrompt(2)
      const res = await this.lotteryMagicEggApi(mark)
      if (res.errno == -5 || res.errno == -6) {
        this.backpackFull(res.errno)
      } else if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.dialogData = res.data.awards
        const promptRef =
          this.dialogData.length >= 10 ? 'congratsGetSelf' : 'congratsGet'
        this.openPrompt(promptRef)
        this.pageData.ticket = res.data.ticket
      }
    },
    // 扭蛋
    lotteryMagicEggApi(mark) {
      return getPageData({
        type: 'twisted_egg_lottery',
        mark
      })
    }
  }
}
</script>

<style scoped lang="scss">
.MagicTwist {
  margin-top: 94px;
  .MagicTwist_box {
    width: 720px;
    height: 1055px;
    margin: -10px auto 118px;
    ::v-deep .ThemeBox_main {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .my_info {
      width: 660px;
      height: 48px;
      background: #673c9b;
      border-radius: 24px;
      font-size: 28px;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 65px;
      margin-bottom: 24px;
      .recharge {
        margin-left: 28px;
      }
      .ticket_nums {
        margin-right: 13px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        img:first-child {
          width: 49px;
          height: 33px;
          margin: 0 8px;
        }
        img:last-child {
          width: 32px;
          height: 32px;
          margin-left: 15px;
        }
      }
    }
    .machine {
      width: 715px;
      height: 729px;
      background-image: url('../../assets/mk4_4.png');
      background-size: 100% 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      .noticeBar {
        width: 496px;
        height: 108px;
        font-size: 24px;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        align-items: center;

        .noticeBar_inner {
          display: flex;
          align-items: center;
          width: 100%;
          background-color: transparent;
          padding: 0;
          ::v-deep .van-notice-bar__content {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .leftBtn {
        width: 178px;
        height: 195px;
        background-image: url('../../assets/mk4_5.png');
        background-size: 100% 100%;
        position: absolute;
        top: 450px;
        left: 81px;
      }
      .rightBtn {
        width: 178px;
        height: 195px;
        background-image: url('../../assets/mk4_6.png');
        background-size: 100% 100%;
        position: absolute;
        top: 450px;
        right: 82px;
      }
      .record {
        width: 141px;
        height: 52px;
        background-image: url('../../assets/mk4_7.png');
        background-size: 100% 100%;
        position: absolute;
        top: 606px;
      }
    }
    .ThemeBox_BottomText {
      margin-top: -10px;
      margin-left: 35px;
      white-space: nowrap;
      i {
        color: #fffaa6;
      }
      img {
        width: 49px !important;
        height: 33px !important;
        margin-top: -3px !important;
        margin-left: 4px !important;
      }
    }
  }
}
</style>
