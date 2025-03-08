<template>
  <!-- 神奇扭蛋 -->
  <out-box class="MagicTwist" bowKnot="true" title="title_4.png">
    <img :src="IconPath('mk2_2.png')" class="ruleButton position-absolute" @click="showMagicTwistRulesPopup = true" />
    <div class="my_info flex align-center justify-between">
      <div class="recharge">已充值：{{ pageData.recharge }}</div>
      <div class="ticket_nums flex align-center text-nowrap">
        剩余<img :src="IconPath('mk4_2.png')" />：{{ pageData.ticket }}
        <img :src="IconPath('mk4_3.png')" @click="rechargeTickets" />
      </div>
    </div>
    <div class="machine flex-column align-center position-relative">
      <div class="micAward position-absolute">
        <img :src="IconPath('mk4_8.png')" class="numLabel position-absolute" />
        <PublicJson json-name="sb_xmxl" :user-avatar="$store.state.user_icon" />
      </div>
      <div class="noticeBar">
        <!-- 滚动播放 -->
        <van-notice-bar class="noticeBar_inner" scrollable loop>
          <div v-for="(item, index) in pageData.carousel" :key="index" class="text-item">
            恭喜<img class="avatar" :src="item.profile_image" /> <span class="user-name">{{ item.username }}</span
            ><span class="text">获得{{ item.remark }}</span>
          </div>
        </van-notice-bar>
      </div>
      <div class="leftBtn position-absolute" @click="lotteryMagicEgg(1)"></div>
      <div class="rightBtn position-absolute" @click="lotteryMagicEgg(2)"></div>
      <div class="record position-absolute" @click="showMagicTwistRecordPopup = true"></div>
    </div>
    <!-- 说明文字 -->
    <div class="RuleText">
      <div class="row position-relative line-height-100 text-nowrap">
        <span class="circle position-absolute radius-50 position-column-center"></span>
        <p class="flex align-center flex-no-wrap text-nowrap">
          活动期间，每充值30元可以获得<i class="deep">1张扭蛋券</i><img :src="IconPath('mk4_2.png')" />
        </p>
      </div>
      <div class="row position-relative line-height-100 text-nowrap">
        <span class="circle position-absolute radius-50 position-column-center"></span>
        <p class="flex align-center flex-no-wrap text-nowrap">购买礼包、会员（含超值兑换中兑换会员）、活</p>
      </div>
      <div class="row position-relative line-height-100 text-nowrap">
        <p class="flex align-center flex-no-wrap text-nowrap">力卡不计算在内</p>
      </div>
    </div>
    <CongratsGetMorePopup v-if="showCongratsGetMorePopup" :list="congratsGetPopupData" @close="showCongratsGetMorePopup = false">
      <template v-slot="{ data: { type } }">
        <public-json v-if="type == 'voice'" jsonName="sb_xmxl" :userAvatar="$store.state.user_icon" />
      </template>
    </CongratsGetMorePopup>
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @close="showCongratsGetPopup = false">
      <template v-slot="{ data: { type } }">
        <public-json v-if="type == 'voice'" jsonName="sb_xmxl" :userAvatar="$store.state.user_icon" />
      </template>
    </CongratsGetPopup>
    <MagicTwistRulesPopup v-if="showMagicTwistRulesPopup" @close="showMagicTwistRulesPopup = false" />
    <TicketTipPopup v-if="showTicketTipPopup" :type="ticketTipPopupType" @recharge="toRecharge" @close="showTicketTipPopup = false" />
    <MagicTwistRecordPopup v-if="showMagicTwistRecordPopup" @close="showMagicTwistRecordPopup = false" />
    <BackpackFullPopup v-if="showBackpackFullPopup" :type="backpackFullPopupType" @close="showBackpackFullPopup = false" />
  </out-box>
</template>

<script>
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'
import { magicTwist } from '../../utils/pageData'
import BackpackFullPopup from './components/BackpackFullPopup.vue'
import MagicTwistRecordPopup from './components/MagicTwistRecordPopup.vue'
import TicketTipPopup from './components/TicketTipPopup.vue'
import MagicTwistRulesPopup from './components/MagicTwistRulesPopup.vue'
import CongratsGetMorePopup from './components/CongratsGetMorePopup.vue'
import CongratsGetPopup from '@/pages/gardenParty/components/CongratsGetPopup.vue'
import { getPageData } from '@/pages/gardenParty/api'
import { compareVersions, recharge } from '../../utils/toApp'

export default {
  name: 'MagicTwist',
  components: {
    PublicJson,
    MagicTwistRecordPopup,
    TicketTipPopup,
    CongratsGetMorePopup,
    CongratsGetPopup,
    BackpackFullPopup,
    MagicTwistRulesPopup
  },
  data() {
    return {
      showMagicTwistRecordPopup: false, // 我的记录弹框
      showCongratsGetMorePopup: false, // 恭喜获得弹框 5个一排
      showCongratsGetPopup: false, // 恭喜获得弹框 3个一排
      congratsGetPopupData: [], // 恭喜获得弹框数据
      showBackpackFullPopup: false, // 符石背包已满弹框
      backpackFullPopupType: 1, // 符石背包已满弹框类型
      showTicketTipPopup: false, // 扭蛋券提示弹框
      ticketTipPopupType: 1, // 扭蛋券提示弹框文本 type 1 扭蛋次数不足，请前往充值：type 2
      showMagicTwistRulesPopup: false // 概率说明弹框
    }
  },
  created() {
    this.pageData = magicTwist
    this.getPageData({ type: 'tab', mark: 'm4' })
  },
  methods: {
    rechargeTickets() {
      this.ticketTipPopupType = 1
      this.showTicketTipPopup = true
    },
    /**
     * 符石背包已满弹框
     * @param {Number} errno -5: 符石背包已满 -6: 符石背包已满，请升级到最新版本分解符石
     */
    backpackFull(errno) {
      const app_version = this.$store.state.app_version
      const flag = compareVersions(app_version, '5.7.8')
      if (flag == -1) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      this.backpackFullPopupType = errno == -5 ? 1 : 2
      this.showBackpackFullPopup = true
    },
    /**
     * 扭蛋
     * @param {Number} mark 1: 单次扭蛋 2: 十连扭蛋
     */
    async lotteryMagicEgg(mark) {
      const needNumber = mark == 1 ? 1 : 10
      if (+this.pageData.ticket < needNumber) {
        this.ticketTipPopupType = 2
        return (this.showTicketTipPopup = true)
      }
      const res = await getPageData({ type: 'twisted_egg_lottery', mark })
      if (res.errno == -5 || res.errno == -6) {
        this.backpackFull(res.errno)
      } else if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.congratsGetPopupData = res.data.awards
        const promptRef = this.congratsGetPopupData.length >= 10 ? 'showCongratsGetMorePopup' : 'showCongratsGetPopup'
        this[promptRef] = true
        this.pageData.ticket = res.data.ticket
      }
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        console.log('页面隐藏')
      } else {
        this.getPageData({ type: 'tab', mark: 'm4' })
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    toRecharge() {
      this.showTicketTipPopup = false
      recharge(this.hiddenFn)
    }
  }
}
</script>

<style scoped lang="scss">
.MagicTwist {
  //width: 720px;
  height: 1110px;
  margin: 71px auto 170px;
  padding-top: 100px;
  .ruleButton {
    top: 19px;
    right: 22px;
    width: 56px;
    height: 56px;
  }
  .my_info {
    width: 660px;
    height: 48px;
    background-color: #a495ee;
    border-radius: 24px;
    font-size: 28px;
    font-weight: 500;
    color: #ffffff;
    margin: 0 auto 10px;

    .recharge {
      margin-left: 28px;
    }

    .ticket_nums {
      margin-right: 13px;

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
    margin: 0 auto;
    width: 715px;
    height: 729px;
    background: url('@/pages/gardenParty/assets/mk4_4.png') no-repeat left top/100% 100%;

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

        .text-item {
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
          height: 100%;
          margin-right: 50px;

          .avatar {
            width: 52px;
            height: 52px;
            background: #ffffff;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 5px;
          }

          .user-name {
            color: #fff0ab;
            margin-right: 5px;
          }
        }
      }
    }
    .micAward {
      top: 158px;
      left: 309px;
      width: 92px;
      height: 89px;
      .numLabel {
        top: -18px;
        right: -10px;
        width: 47px;
        height: 30px;
      }
    }

    .leftBtn {
      width: 178px;
      height: 195px;
      background-image: url('../../assets/mk4_5.png');
      background-size: 100% 100%;
      top: 450px;
      left: 81px;
    }

    .rightBtn {
      width: 178px;
      height: 195px;
      background-image: url('../../assets/mk4_6.png');
      background-size: 100% 100%;
      top: 450px;
      right: 82px;
    }

    .record {
      width: 141px;
      height: 52px;
      background-image: url('../../assets/mk4_7.png');
      background-size: 100% 100%;
      top: 606px;
    }
  }
  .RuleText {
    margin-left: 70px;
    width: 586px;
    .row {
      font-size: 28px;
      color: #96526f;
      line-height: 45px;
      .circle {
        left: -30px;
        width: 12px;
        height: 12px;
        background: #cb5459;
      }
      ::v-deep img {
        flex-shrink: 0;
        width: 49px;
        height: 33px;
      }
      .deep {
        color: #4f85ff;
      }
    }
  }
  .PublicJson {
    ::v-deep .micAvatar_img {
      width: 70%;
      height: 70%;
    }
  }
}
</style>
