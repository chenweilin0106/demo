<template>
  <div class="centuryBall">
    <OutBox class="recitalBox">
      <div class="engagementBtn" @click="engagementBtnCk"></div>
      <div class="recitalRulesBtn" @click="recitalRulesBtnCk"></div>
      <div class="swipeDiv">
        <TextSwipe :swipeList="rare_list"></TextSwipe>
      </div>
      <div class="recitalDrawBg"></div>
      <div class="recitalConsumeDiv">已消费钻石:&ensp;{{recharge_amount}}</div>
      <div class="recitalLeftTimeDiv">剩余演奏次数:&ensp;{{open_num}}</div>
      <div class="recitalAward1Div">
        <PublicImg :imgName="'qp_tmjh_sc'" :imgType="'chat_bubble'"></PublicImg>
      </div>
      <div class="recitalAward2Div">
        <PublicImg :imgName="'hjcbt_120_120.png'" :imgType="'pst_privilege'"></PublicImg>
      </div>
      <div class="recitalAward3Div">
        <PublicImg :imgName="'sb_mxcj'" :imgType="'voice'"></PublicImg>
      </div>
      <div class="recitalRecordsBtn" @click="recitalRecordsBtnCk"></div>
      <div class="recitalDrawBtns">
        <div :class="[drawOneStatus==2?'statusSp':null]" @click="recitalDrawCk(1, drawOneStatus)"></div>
        <div :class="[drawTenStatus==2?'statusSp':null]" @click="recitalDrawCk(10, drawTenStatus)"></div>
        <div @click="recitalDrawCk(50, 1)"></div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span><i>每消费200钻石</i>，玩家可获得1次演奏机会</li>
          <li><span></span>演奏次数可用于本玩法抽取奖励，也可用于【浪漫</li>
          <li>舞池】玩法获得永恒值</li>
          <li><span></span>每天首次成功送出【7周年快乐】钻石礼物，额外</li>
          <li>获1次演奏次数</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="totBox" :title="'mk9_title_1.png'">
      <div class="pickedStarTimeDiv">已开启:&ensp;{{tot_num}}次</div>
      <div class="pickStarTip"><span>累计演奏</span>次数可领取对应奖励</div>
      <StepProgress :tot_num="tot_num" :tot_list="tot_list" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
    </OutBox>
    <OutBox class="ringBox" :title="'mk9_title_2.png'">
      <div class="rules-text">
        <ul>
          <li><span></span>在本玩法获得的【晶羽之祈】将进入暂存箱，暂</li>
          <li>存箱中的奖励可以自主选择融合为更高价值戒指</li>
          <li>或直接发往背包</li>
        </ul>
      </div>
      <div class="ringGift">
        <div class="ringAwardDiv">
          <PublicImg :imgName="'hjcbt_120_120.png'" :imgType="'ring'"></PublicImg>
        </div>
        <div class="ringTip" @click="ringTipCk"></div>
      </div>
      <div class="fuseTip">消耗：<img :src="IconPath('jyzq_57_40.png')" />x30</div>
      <div class="fuseBtn" @click="fuseBtnCk">融合</div>
      <div class="temporaryLocker">
        <div class="leftJyzqNumsDiv">当前剩余【晶羽之祈】<img :src="IconPath('jyzq_57_40.png')" />：{{leftJyzqNums}}</div>
        <div class="jyzqIconDiv">
          <PublicImg :imgName="'jyzq_120_120.png'" :imgType="'tool'"></PublicImg>
        </div>
        <div class="jyzqIconTip">+1</div>
        <div class="takeToPackBtn" @click="takeToPackBtnCk">取出至背包</div>
      </div>
    </OutBox>

    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <RingGiftRulesPopup v-if="isShowRingGiftRulesPopup" @clickClose="clickClose"></RingGiftRulesPopup>
    <FuseConfirmPopup v-if="isShowFuseConfirmPopup" :leftJyzqNums="leftJyzqNums" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></FuseConfirmPopup>
    <TakeToPackPopup v-if="isShowTakeToPackPopup" :config="configTakeToPackPopup" :coinsNum="leftJyzqNums" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></TakeToPackPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <EngagementPopup v-if="isShowEngagementPopup" @openBuyConfirmPopup="openBuyConfirmPopup" @openBindFriendPopup="openBindFriendPopup" @clickClose="closeEngagementPopup"></EngagementPopup>
    <BuyConfirmPopup v-if="isShowBuyConfirmPopup" @clickClose="closeBuyConfirmPopup"></BuyConfirmPopup>
    <BindFriendPopup v-if="isShowBindFriendPopup" @clickClose="closeBindFriendPopup"></BindFriendPopup>
    <ReceivePopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceivePopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import ReceivePopup from './components/receivePopup.vue'
import TextSwipe from './components/textSwipe.vue'
import StepProgress from './components/stepProgress.vue'
import RulesPopup from './components/rulesPopup.vue'
import RingGiftRulesPopup from './components/ringGiftRulesPopup.vue'
import FuseConfirmPopup from './components/fuseConfirmPopup.vue'
import TakeToPackPopup from './components/takeToPackPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import EngagementPopup from './components/engagementPopup.vue'
import BuyConfirmPopup from './components/buyConfirmPopup.vue'
import BindFriendPopup from './components/bindFriendPopup.vue'

export default {
  name: 'centuryBall',
  components: {
    ReceivePopup,
    TextSwipe,
    StepProgress,
    RulesPopup,
    RingGiftRulesPopup,
    FuseConfirmPopup,
    TakeToPackPopup,
    RecordsPopup,
    EngagementPopup,
    BuyConfirmPopup,
    BindFriendPopup
  },
  data() {
    return {
      rare_list: [], // 轮播
      recharge_amount: 0, // 已消费钻石
      open_num: 0, // 剩余演奏次数
      drawOneStatus: 1, // 1:正常 2:今日首次免费
      drawTenStatus: 1, // 1:正常 2:5折
      tot_num: 0, // 累计演奏次数
      tot_list: [
        { awardId: 12, id: 2, type: 'tool', icon: 'ljs_120_120.png', nums: 80, name: '绿晶石', text: '+80', need: 12, has_right: 0 },
        { awardId: 25, id: 0, type: 'luck_key', icon: 'scslzkq_120_120.png', nums: 1, name: '钥匙', text: '+1', need: 25, has_right: 0 },
        { awardId: 40, id: 171, type: 'tool', icon: 'sjlb_120_120.png', nums: 3, name: '世界喇叭', text: '+3', need: 40, has_right: 0 },
        { awardId: 80, id: 158, type: 'tool', icon: 'cbt_120_120.png', nums: 5, name: '藏宝图', text: '+5', need: 80, has_right: 0 },
        { awardId: 90, id: 0, type: 'rune', icon: 'sjfs_120_120.png', nums: 1, name: '卓越符石礼包', text: '+1', need: 36, has_right: 0 },
        { awardId: 100, id: 177, type: 'pst_privilege', icon: 'xyxy_120_120.png', nums: 1, name: '星语心愿', text: '+3天', price: 1314, previewImg: 'tk_38.png', previewTip1: '星语心愿·双人礼物赠送权', need: 54, has_right: 0 },
        { awardId: 666, id: 5150, type: 'title', icon: 'mp_tmsp', nums: 5, name: '甜蜜双排', text: '+5天', need: 666, has_right: 0 }
      ], // 累计奖励列表
      leftJyzqNums: 0, // 当前剩余晶羽之祈

      isShowRulesPopup: false, // 活动规则弹窗
      isShowRingGiftRulesPopup: false, // 限定戒指礼包弹窗
      isShowFuseConfirmPopup: false, // 融合确认弹窗
      isShowTakeToPackPopup: false, // 取出至背包弹窗
      configTakeToPackPopup: {},
      isShowRecordsPopup: false, // 抽奖记录弹窗
      isShowEngagementPopup: false, // 浪漫相约弹窗
      isShowBuyConfirmPopup: false, // 购买入场券确认弹窗
      isShowBindFriendPopup: false, // 邀请好友弹窗
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: []
    }
  },
  watch: {},
  computed: {},
  created() {
    // this.getHomePage()
  },
  mounted() {
  },
  methods: {
    /**
     * 获取页面数据
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm7' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.rare_list = res.data.rare_list
          this.recharge_amount = res.data.recharge_amount
          this.open_num = res.data.open_num
          this.drawOneStatus = res.data.drawOneStatus
          this.drawTenStatus = res.data.drawTenStatus
          this.tot_num = res.data.tot_num
          this.tot_list = res.data.tot_list
          this.leftJyzqNums = res.data.leftJyzqNums
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveAwardsPopup = false
      this.isShowRulesPopup = false
      this.isShowRingGiftRulesPopup = false
      this.isShowFuseConfirmPopup = false
      this.isShowTakeToPackPopup = false
      this.isShowRecordsPopup = false
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceiveAwardsPopup(msg, isClose = true) {
      console.log('获奖弹窗')
      if (isClose) {
        this.clickClose()
      }
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.isShowReceiveAwardsPopup = true
        this.getHomePage()
      })
    },
    /**
     * 浪漫相约
     */
    engagementBtnCk() {
      console.log('浪漫相约')
      this.isShowEngagementPopup = true
    },
    /**
     * 关闭浪漫相约
     */
    closeEngagementPopup() {
      this.isShowEngagementPopup = false
    },
    /**
     * 打开购买入场券弹窗
     */
    openBuyConfirmPopup() {
      this.isShowBuyConfirmPopup = true
    },
    /**
     * 关闭购买入场券弹窗
     */
    closeBuyConfirmPopup(msg) {
      this.isShowBuyConfirmPopup = false
      if (msg && msg.length > 0) {
        this.$nextTick(() => {
        this.isShowEngagementPopup = false
          setTimeout(() => {
            this.isShowEngagementPopup = true
              this.openReceiveAwardsPopup(msg, false)
          })
        })
      }
    },
    /**
     * 打开邀请好友弹窗
     */
    openBindFriendPopup() {
      this.isShowBindFriendPopup = true
    },
    /**
     * 关闭邀请好友弹窗
     */
    closeBindFriendPopup() {
      this.isShowBindFriendPopup = false
      this.$nextTick(() => {
        this.isShowEngagementPopup = false
        setTimeout(() => {
          this.isShowEngagementPopup = true
        })
      })
    },
    /**
     * 活动规则
     */
    recitalRulesBtnCk() {
      console.log('活动规则')
      this.isShowRulesPopup = true
    },
    /**
     * 我的记录
     */
    recitalRecordsBtnCk() {
      console.log('我的记录')
      this.isShowRecordsPopup = true
    },
    /**
     * 判断是否是今日
     */
    judgeSecondDay() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      // console.log(JSON.stringify(formattedTime))
      // console.log(localStorage.getItem('enterDate'))
      if (JSON.stringify(formattedTime) == localStorage.getItem('enterDate')) {
        return true
      }
      this.$toast('页面信息已变化，请刷新页面')
      setTimeout(() => {
        localStorage.setItem('isTodayTip', false)
        // 强制刷新
        window.location.reload()
      })
      return false
    },
    /**
     * 演奏抽奖
     */
    recitalDrawCk(num, type) {
      console.log(num)
      if (this.judgeSecondDay()) {
        getPageData({ type: 'ps_open', mark: { num, type } }).then((res) => {
          if (res.errno == 0) {
            // this.dealSort(res.data)
            this.openReceiveAwardsPopup(res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 限定戒指礼包
     */
    ringTipCk() {
      console.log('限定戒指礼包')
      this.isShowRingGiftRulesPopup = true
    },
    /**
     * 融合
     */
    fuseBtnCk() {
      console.log('融合')
      if (this.leftJyzqNums >= 30) {
        this.isShowFuseConfirmPopup = true
      } else {
        this.$toast('暂存箱【晶羽之祈】不足')
      }
    },
    /**
     * 取出至背包
     */
    takeToPackBtnCk() {
      console.log('取出至背包')
      if (this.leftJyzqNums > 0) {
        this.configTakeToPackPopup = {
          type: 'tool',
          icon: 'jyzq_120_120.png',
          text: '+1',
          price: 1,
          max_times: 0
        }
        this.isShowTakeToPackPopup = true
      } else {
        this.$toast('暂存箱【晶羽之祈】不足')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.centuryBall{
  position: relative;
  .recitalBox{
    position: relative;
    .engagementBtn{
      width: 256px;
      height: 120px;
      background: url('@/pages/celebration/assets/mk9_4.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 0px;
      top: 10px;
    }
    .recitalRulesBtn{
      width: 143px;
      height: 52px;
      background: url('@/pages/celebration/assets/mk9_5.png') no-repeat left top/100% 100%;
      position: absolute;
      right: -4px;
      top: 50px;
    }
    .swipeDiv{
      width: 750px;
      height: 128px;
      background: url('@/pages/celebration/assets/mk8_4.png') no-repeat left top/100% 100%;
      margin: 10px auto 0 auto;
      padding: 30px 0px;
    }
    .recitalDrawBg{
      width: 674px;
      height: 858px;
      background: url('@/pages/celebration/assets/mk9_6.png') no-repeat left top/100% 100%;
      margin: 0px auto 0px auto;
    }
    .recitalConsumeDiv{
      padding: 10px 20px;
      background: rgba(137, 114, 253, 0.6);
      border-radius: 0px 24px 24px 0px;
      font-size: 24px;
      text-align: center;
      position: absolute;
      left: 24px;
      top: 220px;
    }
    .recitalLeftTimeDiv{
      padding: 0px 10px 0 20px;
      background: rgba(137, 114, 253, 0.6);
      border-radius: 24px 0px 0px 24px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 14px;
      top: 220px;
      img{
        width: 32px;
        height: 33px;
        margin-left: 20px;
      }
    }
    .recitalAward1Div{
      width: 120px;
      height: 120px;
      position: absolute;
      left: 78px;
      top: 340px;
    }
    .recitalAward2Div{
      width: 120px;
      height: 120px;
      position: absolute;
      left: 236px;
      top: 300px;
    }
    .recitalAward3Div{
      width: 120px;
      height: 120px;
      position: absolute;
      left: 410px;
      top: 360px;
    }
    .recitalRecordsBtn{
      width: 178px;
      height: 68px;
      background: url('@/pages/celebration/assets/mk8_11.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 810px;
    }
    .recitalDrawBtns{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 910px;
      &>div{
        width: 242px;
        height: 128px;
        &:nth-of-type(1){
          background: url('@/pages/celebration/assets/mk9_7_1.png') no-repeat left top/100% 100%;
          &.statusSp{
            background: url('@/pages/celebration/assets/mk9_7.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-of-type(2){
          background: url('@/pages/celebration/assets/mk9_8.png') no-repeat left top/100% 100%;
          &.statusSp{
            background: url('@/pages/celebration/assets/mk9_8_1.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-of-type(3){
          background: url('@/pages/celebration/assets/mk9_9.png') no-repeat left top/100% 100%;
        }
      }
    }
  }
  .totBox{
    .pickedStarTimeDiv{
      width: 253px;
      height: 48px;
      background: #877FF1;
      border-radius: 24px;
      font-size: 26px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto 0 auto;
    }
    .pickStarTip{
      font-size: 26px;
      color: #6E56E7;
      margin: 10px auto 0px auto;
      text-align: center;
      span{
        color: #F552AE;
      }
    }
  }
  .ringBox{
    .ringGift{
      width: 255px;
      height: 256px;
      background: url('@/pages/celebration/assets/mk9_13.png') no-repeat left top/100% 100%;
      margin: 0 auto;
      position: relative;
      .ringAwardDiv{
        width: 160px;
        height: 160px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
      }
      .ringTip{
        width: 32px;
        height: 32px;
        background: url('@/pages/celebration/assets/mk9_10.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 20px;
        top: 20px;
      }
    }
    .fuseTip{
      font-weight: 400;
      font-size: 28px;
      color: #6E56E7;
      text-align: center;
      margin-top: 10px;
      img{
        width: 57px;
        height: 40px;
      }
    }
    .fuseBtn{
      width: 304px;
      height: 93px;
      margin: 0 auto 0 auto;
      background: url('@/pages/celebration/assets/mk2_18.png') no-repeat left top/100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .temporaryLocker{
      width: 644px;
      height: 445px;
      margin: 10px auto 0 auto;
      padding-top: 90px;
      background: url('@/pages/celebration/assets/mk9_12.png') no-repeat left top/100% 100%;
      .leftJyzqNumsDiv{
        font-weight: 400;
        font-size: 28px;
        color: #6E56E7;
        text-align: center;
        margin-top: 10px;
        img{
          width: 57px;
          height: 40px;
        }
      }
      .jyzqIconDiv{
        width: 128px;
        height: 128px;
        background: linear-gradient(0deg, #FFFFFF, #EECEFF);
        border-radius: 12px;
        border: 4px solid #BDA2FA;
        margin: 20px auto 0 auto;
      }
      .jyzqIconTip{
        font-weight: 400;
        font-size: 28px;
        color: #6E56E7;
        text-align: center;
        margin-top: 10px;
      }
      .takeToPackBtn{
        width: 304px;
        height: 93px;
        margin: 0 auto 0 auto;
        background: url('@/pages/celebration/assets/mk2_17.png') no-repeat left top/100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
