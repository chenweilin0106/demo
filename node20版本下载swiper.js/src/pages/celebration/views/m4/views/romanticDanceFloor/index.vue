<template>
  <div class="romanticDanceFloor">
    <OutBox class="danceFloorBox">
      <div class="engagementBtn" @click="engagementBtnCk"></div>
      <div class="danceFloorRulesBtn" @click="danceFloorRulesBtnCk"></div>
      <div class="danceFloorTip">舞会已经开幕，快去邀请舞伴吧！</div>
      <div class="photoDiv" ref="photoDivRef">
        <div :class="['humanBg', isPairStatus?`status${humanInfo[0].sex}${humanInfo[1].sex}`:null]"></div>
        <div class="humanInfoDiv">
          <div :class="['headDiv', 'leftHead']">
            <img :src="IconPath(humanInfo[0].profile_image)"  crossorigin="anonymous" />
            <div class="userNameDiv"><span>{{humanInfo[0].username}}</span></div>
            <div class="titleContain" v-if="humanInfo[0]&&humanInfo[0].titleDynamic">
              <img v-if="isPhoto" :src="IconPath(humanInfo[0].titleStatic)" crossorigin="anonymous" />
              <PublicImg v-else :imgName="humanInfo[0].titleDynamic" :imgType="'title'" />
            </div>
          </div>
          <div class="loveValueDiv">
            <div class="loveValueShow">{{loveValue}}</div>
            <div class="loveValueTip">永恒值</div>
          </div>
          <div :class="['headDiv', 'rightHead']" @click="openBindFriendPopup">
            <img :class="[isPairStatus?null:'smallSp']" :src="IconPath(isPairStatus?humanInfo[1].profile_image:'tk_56.png')"  crossorigin="anonymous" />
            <div class="userNameDiv"><span>{{isPairStatus?humanInfo[1].username:'邀请好友绑定'}}</span></div>
            <div class="titleContain" v-if="humanInfo[1]&&humanInfo[1].titleDynamic">
              <img v-if="isPhoto" :src="IconPath(humanInfo[1].titleStatic)" crossorigin="anonymous" />
              <PublicImg v-else :imgName="humanInfo[1].titleDynamic" :imgType="'title'" />
            </div>
          </div>
        </div>
      </div>
      <div class="saveBtn" @click="saveBtnCk"></div>
    </OutBox>
    <OutBox class="myLoveValueBox" :title="'mk9_title_11.png'">
      <div class="myLoveValueTip">个人永恒值：{{myLoveValue}}</div>
      <div class="myLoveValueBar">
        <div class="loveValueIcon"></div>
        <div class="myLoveValueBarTip1">每次祝福消耗1次演奏次数</div>
        <div class="myLoveValueBarTip2">剩余演奏次数：{{leftPlayTimes}}</div>
        <div class="benedictionBtn" @click="benedictionBtnCk">祝福</div>
      </div>
    </OutBox>
    <ReceivePopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceivePopup>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <EngagementPopup v-if="isShowEngagementPopup" @openBuyConfirmPopup="openBuyConfirmPopup" @clickClose="closeEngagementPopup"></EngagementPopup>
    <BindFriendPopup v-if="isShowBindFriendPopup" @clickClose="closeBindFriendPopup"></BindFriendPopup>
    <TakeToPackPopup v-if="isShowTakeToPackPopup" :config="configTakeToPackPopup" :coinsNum="leftPlayTimes" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></TakeToPackPopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import ReceivePopup from '../centuryBall/components/receivePopup.vue'
import EngagementPopup from './components/engagementPopup.vue'
import BindFriendPopup from './components/bindFriendPopup.vue'
import RulesPopup from '../centuryBall/components/rulesPopup.vue'
import TakeToPackPopup from './components/takeToPackPopup.vue'

export default {
  name: 'romanticDanceFloor',
  components: {
    ReceivePopup,
    EngagementPopup,
    BindFriendPopup,
    RulesPopup,
    TakeToPackPopup
  },
  data() {
    return {
      isPhoto: false, // 是否在保存照片中
      isPairStatus: false, // 是否已结对
      humanInfo: [
        {
          sex: 1, // 性别
          username: '我是积13112222111极',
          profile_image: 'https://cdn-image.dandan818.com/test/ufile/head/20220106/20011/16121641449711.jpg',
          titleDynamic: 'ch_says', // 动态称号
          titleStatic: 'ch_says.png' // 静态称号
        }
      ], // 人物信息
      loveValue: 0, // 永恒值
      myLoveValue: 0, // 个人永恒值
      leftPlayTimes: 10, // 剩余演奏次数

      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      isShowEngagementPopup: false, // 相约回馈弹窗
      isShowBindFriendPopup: false, // 邀请好友弹窗
      isShowRulesPopup: false, // 活动规则弹窗
      isShowTakeToPackPopup: false, // 祝福弹窗
      configTakeToPackPopup: {}
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
          this.isPairStatus = res.data.isPairStatus
          this.humanInfo = res.data.humanInfo
          this.loveValue = res.data.loveValue
          this.myLoveValue = res.data.myLoveValue
          this.leftPlayTimes = res.data.leftPlayTimes
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
      this.isShowTakeToPackPopup = false
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
     * 判断是否到了11月18日
     */
    judge1118Day() {
      const now = new Date()
      // 创建11月18日的日期对象
      const november18 = new Date(now.getFullYear(), 10, 18)
      // 比较当前日期和11月18日
      if (now < november18) {
        this.$toast('本玩法将在11月18日0点开启')
        return false
      } else {
        return true
      }
    },
    /**
     * 相约回馈
     */
    engagementBtnCk() {
      console.log('相约回馈')
      if (this.judge1118Day()) {
        this.isShowEngagementPopup = true
      }
    },
    /**
     * 关闭浪漫相约
     */
    closeEngagementPopup() {
      this.isShowEngagementPopup = false
    },
    /**
     * 打开邀请好友弹窗
     */
    openBindFriendPopup() {
      if (this.judge1118Day() && !this.isPairStatus) {
        this.isShowBindFriendPopup = true
      }
    },
    /**
     * 关闭邀请好友弹窗
     */
    closeBindFriendPopup() {
      this.isShowBindFriendPopup = false
      this.getHomePage()
    },
    /**
     * 活动规则
     */
    danceFloorRulesBtnCk() {
      console.log('活动规则')
      this.isShowRulesPopup = true
    },
    /**
     * 保存照片
     */
    saveBtnCk() {
      if (this.judge1118Day()) {
        console.log('保存照片')
      }
    },
    /**
     * 祝福
     */
    benedictionBtnCk() {
      if (this.judge1118Day()) {
        if (this.leftPlayTimes > 0) {
          console.log('祝福')
          this.configTakeToPackPopup = {
            type: 'tool',
            icon: 'ljs_120_120.png',
            text: '+200',
            price: 1,
            max_times: 0
          }
          this.isShowTakeToPackPopup = true
        } else {
          this.$toast('演奏次数不足')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.romanticDanceFloor{
  position: relative;
  .danceFloorBox{
    position: relative;
    .engagementBtn{
      width: 256px;
      height: 120px;
      background: url('@/pages/celebration/assets/mk9_14.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 0px;
      top: 10px;
    }
    .danceFloorRulesBtn{
      width: 143px;
      height: 52px;
      background: url('@/pages/celebration/assets/mk9_5.png') no-repeat left top/100% 100%;
      position: absolute;
      right: -4px;
      top: 50px;
    }
    .danceFloorTip{
      font-weight: 400;
      font-size: 28px;
      color: #6E56E7;
      line-height: 40px;
      text-align: center;
      margin: 40px auto 10px auto;
    }
    .photoDiv{
      width: 683px;
      height: 635px;
      background: url('@/pages/celebration/assets/mk9_15.png') no-repeat left top/100% 100%;
      margin: 0 auto 120px auto;
      position: relative;
      .humanBg{
        width: 300px;
        height: 400px;
        background: rgb(175, 175, 226);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100px;
      }
      .humanInfoDiv{
        width: 100%;
        height: 340px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 360px;
        .headDiv{
          width: 128px;
          height: 128px;
          background: #786CD2;
          border-radius: 50%;
          border: 4px solid #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.smallSp{
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }
          }
          .userNameDiv{
            width: 212px;
            height: 74px;
            background: url('@/pages/celebration/assets/tk_60.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -80px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              max-width: 180px;
              font-weight: 500;
              font-size: 25px;
              color: #6E56E7;
              line-height: 40px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .titleContain{
            width: 210px;
            height: 98px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -180px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .leftHead{
          position: absolute;
          left: 100px;
          top: 20px;
        }
        .rightHead{
          position: absolute;
          right: 100px;
          top: 20px;
        }
        .loveValueDiv{
          width: 78px;
          height: 69px;
          background: url('@/pages/celebration/assets/tk_55.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 50px;
          .loveValueShow{
            width: 139px;
            height: 27px;
            background: url('@/pages/celebration/assets/mk9_17.png') no-repeat left top/100% 100%;
            font-weight: 500;
            font-size: 23px;
            line-height: 40px;
            color: #FF6ACC;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -22px;
          }
          .loveValueTip{
            font-weight: 500;
            font-size: 20px;
            color: #936DFF;
            line-height: 22px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -50px;
          }
        }
      }
    }
    .saveBtn{
      width: 366px;
      height: 295px;
      background: url('@/pages/celebration/assets/mk9_20.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -60px;
    }
  }
  .myLoveValueBox{
    margin-top: 100px;
    width: 750px;
    height: 454px;
    background: url('@/pages/celebration/assets/mk9_21.png') no-repeat left top/100% 100%;
    border-image-source: none;
    position: relative;
    .myLoveValueTip{
      width: fit-content;
      background: #877FF1;
      padding: 10px 60px;
      border-radius: 24px;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      margin: 0 auto 30px auto;
    }
    .myLoveValueBar{
      width: 660px;
      height: 137px;
      background: linear-gradient(90deg, #B76AFF, #937CF9, #93AAFF);
      box-shadow: 0px 2px 9px 0px rgba(255,255,255,0.6);
      border-radius: 68px;
      border: 2px solid rgba(255,255,255,0.4);
      margin: 0 auto 0 auto;
      position: relative;
      .loveValueIcon{
        width: 173px;
        height: 169px;
        background: url('@/pages/celebration/assets/mk9_22.png') no-repeat left top/100% 100%;
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
      .myLoveValueBarTip1{
        font-weight: 500;
        font-size: 30px;
        color: #FFFFFF;
        position: absolute;
        left: 160px;
        top: 26px;
      }
      .myLoveValueBarTip2{
        font-weight: 500;
        font-size: 24px;
        color: #FFEF85;
        position: absolute;
        left: 160px;
        bottom: 26px;
      }
      .benedictionBtn{
        width: 130px;
        height: 48px;
        background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
        border-radius: 24px;
        border: 2px solid #FFFFFF;
        font-weight: 400;
        font-size: 26px;
        color: #A9792C;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
