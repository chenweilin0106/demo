<template>
  <PopupBox :title="popupTitleMap[popupType]" :size="popupType==5?2:1" @clickClose="clickClose">
    <!--选择卡片-->
    <div class="chooseCardPopup position-relative" v-if="popupType===1">
      <div class="sendCardsRecords position-absolute position-row-center" @click="showSendRecords">查看赠送记录</div>
      <div class="cardsNumDiv flex align-center flex-wrap">
        <div class="cardNum position-relative flex-column" :class="item.num==0?null:'active'" v-for="(item,index) in config.list" :key="index">
          <div class="award flex align-center justify-center">
            <img :src="IconPath(config.cardInfoMap[item.id].icon_120)" class="awardIcon" />
          </div>
          <div class="text flex-1 flex align-center justify-center line-height-1">{{item.name}}</div>
          <div class="numDesignator position-absolute flex align-center justify-center">{{item.nums}}</div>
          <PublicButton :has-right="item.nums==0?8:6" class="sendBtn position-absolute" @click="chooseCard(item)">赠送好友</PublicButton>
        </div>
      </div>
      <div class="sendCardsTip">注：每日赠送和领取次数上限分别为<i>{{config.maxSendNums}}次</i></div>
    </div>
    <!--选择赠送好友-->
    <div class="chooseFriendPopup position-relative overflow-hidden overscroll-none" v-else-if="popupType===2">
      <div class="sendCardText flex align-center justify-center w-100">
        赠送一份<img :src="IconPath(config.cardInfoMap[currentCard.id].icon_60)"/>给好友
      </div>
      <div class="searchInput position-relative width-fit" @click="errorTip=currentFriend.uid?'请先取消已勾选的好友':''">
        <input v-model="searchUid" class="input position-relative line-height-1 text-nowrap flex align-center" :readonly="currentFriend.uid" placeholder="输入ID" maxlength="8" @keydown="handleKeyDown" @input="inputUid" />
        <img :src="IconPath('tk_9.png')" class="searchBtn position-absolute position-column-center" @click.stop="search" />
      </div>
      <div class="errorTip align-center flex justify-center line-height-1">{{errorTip}}</div>
      <div class="friendsListDiv w-100 overflow-y-scroll position-relative">
        <lazy-component v-for="(item,index) in friendsList" :key="index" class="friends position-relative flex align-center">
          <div class="checkButton" :class="[!disableCheck?'canCheck':null,currentFriend.uid==item.uid?'active':null]" @click="check(item)">
          </div>
          <!-- 点击进入用户主页 -->
          <img :src="item.profile_image" class="avatar" @error="imgAtError" @click="toUserMain(item.uid)" />
          <div class="info">
            <div class="nick-name line-height-1">{{item.username}}</div>
            <div class="uid width-fit userPrettyCode">
              <div class="havenBg" v-if="item.pretty_type!=0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]"></PublicImg>
              </div>
              <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
              <span v-else class="noPrettyCode">ID:{{item.code}}</span>
            </div>
          </div>
          <!--1 夫妻 2 师徒 3 结拜团 4 好友-->
          <img v-if="friendTypeMap[item.user_type]" :src="IconPath(friendTypeMap[item.user_type])" class="label position-absolute position-column-center" />
        </lazy-component>
        <div v-if="!friendsList.length" class="noData justify-center position-absolute flex align-center w-100 h-100">暂无好友</div>
      </div>
      <PublicButton class="cancel position-absolute" has-right="6" @click="clickClose">我再看看</PublicButton>
      <PublicButton class="confirm position-absolute" has-right="7" @click="send">立即赠送</PublicButton>
    </div>
    <!--确认赠送-->
    <div class="confirmSendPopup position-relative" v-else-if="popupType===3">
      <div class="sendCardText flex align-center justify-center">
        将赠送一份<img :src="IconPath(config.cardInfoMap[currentCard.id].icon_60)"/>给好友
      </div>
      <div class="sendPersonDiv position-relative flex align-center justify-center">
        <img :src="currentFriend.profile_image" class="avatar flex-shrink-0" @click="toUserMain(currentFriend.uid)" @error="imgAtError" />
        <div class="info flex-shrink-0">
          <div class="nick-name line-height-1 ellipsis">{{currentFriend.username}}</div>
          <div class="uid width-fit userPrettyCode">
            <div class="havenBg" v-if="currentFriend.pretty_type!=0">
              <PublicImg :imgName="$store.state.prettyTypeBg[currentFriend.pretty_type]"></PublicImg>
            </div>
            <span v-if="currentFriend.pretty_type!=0" :class="['prettyCode', `color${currentFriend.pretty_type}`]">{{currentFriend.code}}</span>
            <span v-else class="noPrettyCode">ID:{{currentFriend.code}}</span>
          </div>
        </div>
      </div>
      <div class="buttons flex align-center justify-center">
        <PublicButton class="cancel" has-right="6" @click="clickClose">取消</PublicButton>
        <PublicButton class="confirm" has-right="7" @click="confirmSend">确认</PublicButton>
      </div>
    </div>
    <!--成功送达-->
    <div class="sendSuccessPopup position-relative" v-else-if="popupType===4">
      <div class="sendCardText margin-row-center">
        您的材料<img :src="IconPath(config.cardInfoMap[currentCard.id].icon_60)"/>已送至好友收件箱<br/>收件人:
      </div>
      <div class="sendPersonDiv position-relative flex align-center justify-center">
        <img :src="currentFriend.profile_image" class="avatar flex-shrink-0" @error="imgAtError" @click="toUserMain(currentFriend.uid)" />
        <div class="nick-name line-height-1 ellipsis">{{currentFriend.username}}</div>
      </div>
      <PublicButton has-right="6" class="confirm margin-row-center" @click="clickClose">我知道了</PublicButton>
    </div>
    <!--赠卡记录-->
    <div class="sendRecordsPopup position-relative" v-else-if="popupType===5">
      <template v-if="sendRecords.length">
        <div class="listHead flex">
          <span class="title-1">赠送材料</span>
          <span class="title-2">赠送时间</span>
          <span class="title-3">赠送对象</span>
        </div>
        <div class="historyList overflow-y-scroll">
          <div v-for="(item,index) in sendRecords" :key="index" class="history position-relative flex align-center justify-between">
            <div class="award flex-column flex-shrink-0">
              <div class="icon flex align-center justify-center position-relative">
                <img :src="IconPath(config.cardInfoMap[item.card_id].icon_60)" />
              </div>
              <div class="text flex-1 flex align-center justify-center line-height-1">{{config.cardInfoMap[item.card_id].name}}+1</div>
            </div>
            <div class="desc flex-column justify-center">
              <div class="descP line-height-1 flex align-center">您向<div class="username ellipsis">{{item.username}}</div>赠送材料</div>
              <div class="date flex align-center line-height-1">{{item.create_time}}</div>
            </div>
            <img :src="item.head" class="avatar flex-shrink-0" @error="imgAtError" @click="toUserMain(item.tuid)" />
          </div>
        </div>
      </template>
      <div v-else class="noData flex align-center justify-center">暂无赠送记录</div>
    </div>
  </PopupBox>
</template>

<script>
import { friendsList, getSendRecord, searchFriend, sendCard } from '@/pages/labaFestival/api'
import { toUserMain } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'

export default {
  props: ['config'],
  data() {
    return {
      friendTypeMap: Object.freeze({ 1: 'tk_7.png', 2: 'tk_8.png', 3: 'tk_14.png' }), // 好友类型 1-夫妻 2-师徒 3-结拜
      popupTitleMap: Object.freeze({ 1: 'title_4.png', 2: 'title_5.png', 3: 'title_6.png', 4: 'title_8.png', 5: 'title_10.png' }), // 弹窗标题
      popupType: 1, // 弹窗类型 1-选择卡牌 2-选择赠送好友 3-确认赠送 4-成功送达 5-赠卡记录
      currentCard: {}, // 已选卡牌
      friendsList: [
        // { uid: 1, username: '测试1', profile_image: 'https://img.yzcdn.cn/vant/cat.jpeg', user_type: 1, pretty_type: 0, code: '123123' },
        // { uid: 2, username: '测试1', profile_image: 'https://img.yzcdn.cn/vant/cat.jpeg', user_type: 1, pretty_type: 1, code: '123123' },
        // { uid: 3, username: '测试1', profile_image: 'https://img.yzcdn.cn/vant/cat.jpeg', user_type: 1, pretty_type: 2, code: '123123' },
        // { uid: 4, username: '测试1', profile_image: 'https://img.yzcdn.cn/vant/cat.jpeg', user_type: 1, pretty_type: 3, code: '123123' }
      ], // 好友列表
      currentFriend: {}, // 已选好友
      searchUid: '', // 搜索uid
      isDisInput: false, // 是否锁输入框
      errorTip: '', // 错误提示
      sendRecords: [
        // { head: 'https://img.yzcdn.cn/vant/cat.jpeg', tuid: 1, create_time: '2021-08-01 12:00:00', username: '123123', card_id: '1' },
        // { head: 'https://img.yzcdn.cn/vant/cat.jpeg', tuid: 2, create_time: '2021-08-01 12:00:00', username: '123123', card_id: '2' },
        // { head: 'https://img.yzcdn.cn/vant/cat.jpeg', tuid: 3, create_time: '2021-08-01 12:00:00', username: '123123', card_id: '3' },
        // { head: 'https://img.yzcdn.cn/vant/cat.jpeg', tuid: 4, create_time: '2021-08-01 12:00:00', username: '123123', card_id: '4' }
      ] // 赠卡记录
    }
  },
  computed: {
    // 是否禁用赠送按钮
    disableCheck() {
      return this.searchUid || this.currentFriend.uid
    }
  },
  methods: {
    // 选择卡片
    async chooseCard(card) {
      if (Number(this.config.send_num) >= this.config.maxSendNums) return this.$toast('今日赠送次数已达上限，请明天再来')
      this.currentCard = card
      this.popupType = 2
      const res = await friendsList('100')
      if (res.errno) return this.$toast(res.errmsg)
      this.friendsList = res.data
    },
    // 查看赠送记录
    async showSendRecords() {
      this.popupType = 5
      const res = await getSendRecord()
      if (res.errno) return this.$toast(res.errmsg)
      this.sendRecords = res.data
    },
    // 过滤uid
    inputUid() {
      console.log(this.searchUid)
      this.searchUid = this.searchUid.replace(/[^0-9]/g, '') // 只能输入数字
      this.searchUid = this.searchUid.replace(/\s+/g, '') // 删除空格
      this.searchUid = this.searchUid.replace(/[\r\n]/g, '') // 删除回车换行符
      this.errorTip = ''
    },
    // 禁用回车键
    handleKeyDown(e) {
      if (e.key === 'Enter' || e.keyCode == 13) e.preventDefault()
    },
    // 搜索好友
    async search() {
      if (!this.searchUid) return
      if (this.searchUid == this.$store.state.uid) return (this.errorTip = '材料无法赠送给自己')
      const res = await searchFriend(this.searchUid)
      if (res.errno) return (this.errorTip = '该用户不存在，请重新输入')
      this.currentFriend = res.data
      this.popupType = 3
    },
    // 勾选好友
    check(item) {
      console.log(item)
      if (this.currentFriend.uid) return (this.currentFriend = {})
      this.currentFriend = item
    },
    // 赠送
    send() {
      if (this.currentFriend.uid) return (this.popupType = 3)
      this.search()
    },
    // 确认赠送
    async confirmSend() {
      const res = await sendCard(this.currentFriend.uid, this.currentCard.id)
      if (res.errno) return this.$toast(res.errmsg)
      this.$emit('update')
      this.popupType = 4
    },
    clickClose() {
      this.$emit('clickClose')
    },
    imgAtError,
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.noPrettyCode{
  color: #FBEFC0;
}
.sendCardText{
  font-size: 26px;
  color: #fff;
  img{
    width: 60px;
  }
}
.avatar {
  background: #421D1A;
  border-radius: 50%;
  border: 2px solid #A64B3B;
  object-fit: cover;
}
.cancel,.confirm{
  width: 244px;
  height: 76px;
  bottom: 0;
  z-index: 2;
  font-size: 32px !important;
}
.chooseCardPopup{
  padding-top: 60px;
  .sendCardsRecords{
    font-size: 28px;
    color: #FBEFC0;
    text-decoration-line: underline;
    top: 0;
  }
  .cardsNumDiv{
    padding: 0 0 0 57px;
    .cardNum{
      width: 186px;
      height: 186px;
      margin-bottom: 110px;
      background: url('@/pages/labaFestival/assets/tk_4.png') no-repeat left top/100% 100%;
      &:nth-child(2n) {
        margin-left: 74px;
      }
      .award{
        height: 130px;
      }
      .text{
        background: #FBEFC0;
        border-radius: 0 0 12px 12px;
        font-size: 28px;
        color: #963B24;
      }
      .numDesignator{
        min-width: 48px;
        height: 24px;
        background: linear-gradient(0deg, #F6D375, #FBEFC0);
        border-radius: 999999999px;
        border: 2px solid #F5D6A8;
        font-size: 24px;
        color: #9B3D25;
        padding: 0 15px;
        top: -6px;
        right: -3px;
      }
      .sendBtn{
        width: 144px;
        height: 52px;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
        bottom: -18px;
        font-size: 24px;
        &.button-8{
          pointer-events: none;
        }
      }
    }
  }
  .sendCardsTip{
    position: absolute;
    //width: 100%;
    left: 30px;
    bottom: -10px;
    font-size: 24px;
    color: #FFFFFF;
    >i{
      color: #FFFAA6;
    }
  }
}
.chooseFriendPopup{
  .searchInput {
    margin: 15px auto 0;
    input {
      width: 480px;
      height: 60px;
      background: #622D20;
      border-radius: 999999999px;
      padding-left: 25px;
      padding-right: 65px;
      font-size: 24px;
      color: #FBEFC0;
      line-height: 1;
      &::placeholder {
        font-size: 24px;
        color: #FBEFC0;
        opacity: 0.5;
        line-height: 1;
      }
    }
    .searchBtn {
      z-index: 2;
      right: 19px;
      width: 30px;
    }
  }
  .errorTip{
    height: 57px;
    font-size: 24px;
    color: #FBEFC0;
  }
  .friendsListDiv{
    height: 456px;
    border: 3px solid #FFB383;
    border-left: 0;
    border-right: 0;
    margin-bottom: 100px;
    .friends {
      height: calc(100% / 5);
      &:nth-child(odd) {
        background: rgba(189, 102, 87, 0.5);
      }
      .checkButton {
        position: relative;
        margin-left: 20px;
        width: 39px;
        height: 39px;
        background: url('@/pages/labaFestival/assets/tk_15.png') no-repeat left top/100% 100%;
        pointer-events: none;
        &.canCheck{
          pointer-events: auto;
          background-image: url('@/pages/labaFestival/assets/tk_6.png');
        }
        &.active{
          pointer-events: auto;
          background-image: url('@/pages/labaFestival/assets/tk_5.png');
        }
      }
      .avatar {
        margin: 0 14px 0 22px;
        width: 64px;
        height: 64px;
      }
      .info {
        .nick-name {
          font-size: 28px;
          color: #FFFFFF;
          width: 300px;
          margin-bottom: 5px;
          text-align: left;
        }
      }
      .label {
        right: 35px;
        width: 72px;
        height: 34px;
      }
    }
  }
  .cancel{
    left: 26px;
  }
  .confirm{
    right: 26px;
  }
  .noData {
    font-size: 32px;
    color: #fff;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
.sendPersonDiv{
  width: 390px;
  height: 90px;
  background: #BD6657;
  border-radius: 999999999px;
  margin: 40px auto 0;
  .avatar {
    margin-right: 17px;
    width: 64px;
    height: 64px;
  }
  .nick-name {
    width: fit-content;
    max-width: 250px;
    font-size: 28px;
    color: #ffffff;
  }
}
.confirmSendPopup{
  .sendPersonDiv{
    margin-top: 28px;
  }
  .buttons{
    margin-top: 95px;
    .confirm{
      margin-left: 20px;
    }
  }
}
.sendSuccessPopup{
  .sendCardText{
    width: 381px;
    text-align: left;
  }
  .confirm{
    margin-top: 67px;
  }
}
.sendRecordsPopup{
  .listHead {
    font-size: 24px;
    color: #FFFFFF;
    margin-bottom: 16px;
    .title-1 {
      margin-left: 20px;
    }
    .title-2 {
      margin-left: 132px;
    }
    .title-3 {
      margin-left: 140px;
    }
  }
  .historyList {
    max-height: 492px;
    .history {
      width: 576px;
      height: 114px;
      background: url('@/pages/labaFestival/assets/tk_11.png') no-repeat left top/100% 100%;
      margin: 0 auto 12px;
      padding: 0 25px 0 16px;
      &:last-child {
        margin-bottom: 0;
      }
      .award{
        $borderWidth: 2px; /*边框粗细*/
        $radius: 6px; /*圆角*/
        //$borderColor: #E9CE93; /*边框颜色*/
        //$iconBgc: #fff; /*图标背景色*/
        $textBgc: #FBEFC0; /*文本背景色*/
        $iconHeight: 56px; /*图标高度*/
        $fontSize: 20px; /*文本字体大小*/
        $color: #963B24; /*文本字体颜色*/
        width: 80px + $borderWidth * 2; /*宽度 蓝湖上选区不包括边框 所以加上边框宽度*/
        height: 80px + $borderWidth * 2; /*高度 蓝湖上选区不包括边框 所以加上边框宽度*/
        //background-color: $borderColor; /*边框颜色*/
        border-radius: $radius + $borderWidth; /*蓝湖上选区不包括边框 所以加上边框宽度*/
        padding: $borderWidth;
        background: url('@/pages/labaFestival/assets/tk_3.png') no-repeat left top/100% 100%;
        .icon{
          height: $iconHeight;
          //background: $iconBgc;
          border-radius: $radius $radius 0 0;
          >img{
            width: auto;
            height: 100%;
          }
        }
        .text{
          color: $color;
          font-size: $fontSize;
          background-color: $textBgc;
          border-radius: 0 0 $radius $radius;
        }
      }
      .avatar {
        width: 64px;
        height: 64px;
      }
      .desc{
        margin-left: 19px;
        flex: 1 1 auto;
        overflow: hidden;
        height: 100%;
        .descP {
          font-size: 24px;
          color: #963B24;
          margin-bottom: 12px;
        }
        .username {
          color: #FE7828;
          max-width: 210px;
        }
        .date {
          padding-left: 8px;
          font-size: 24px;
          color: #963B24;
          width: 252px;
          height: 30px;
          background: #E8BC92;
          border-radius: 999999999px;
        }
      }
    }
  }
  .noData {
    height: 350px;
    font-size: 28px;
    color: #FFFFFF;
  }
}
</style>
