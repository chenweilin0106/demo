<template>
  <div class="content">
    <van-popup
      v-model="isShowPo"
      :close-on-click-overlay="false"
      @click-overlay="clickCloseSendCard"
    >
    <div class="popup-content">
      <img class="title-image" v-if="popupType === 1" :src="IconPath('tk_6_16.png')" />
      <img class="title-image" v-else-if="popupType === 2" :src="IconPath('tk_6_31.png')" />
      <img class="title-image" v-else-if="popupType === 3" :src="IconPath('tk_6_34.png')" />
      <img class="title-image" v-else-if="popupType === 4" :src="IconPath('tk_6_32.png')" />
      <img class="title-image" v-else-if="popupType === 5" :src="IconPath('tk_6_39.png')" />
      <div class="main">
        <!-- type1 送出卡牌 -->
        <div class="type1" v-if="popupType === 1">
          <div class="sendCardsRecords" @click="sendCardsRecordsCk"></div>
          <div class="cardsNumDiv">
            <div :class="['cardNum', item.num==0?null:'active']" v-for="(item) in cardsHavenNumList" :key="item.card_id">
              <div class="numDesignator" v-if="item.num!=0">{{item.num}}</div>
              <div :class="['sendBtn', item.num==0?null:'active']" @click="sendBtnCk(item)">赠送</div>
            </div>
          </div>
          <div class="sendCardsTip">单日赠送和领取次数上限分别为3次</div>
        </div>
        <!-- type2 选择赠送好友 -->
        <div class="type2" v-else-if="popupType === 2">
          <div class="sendCardText">
            赠送1张
            <img :src="IconPath(`tk_6_${26+Number(sendCardInfo.card_id)}.png`)"/>
            给好友
          </div>
          <div class="search-input">
            <input
              v-model="searchUid"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              onafterpaste="this.value=this.value.replace(/\D/g,'')"
              maxlength="8"
              type="text"
              placeholder="输入ID"
              class="input"
              :readonly="isDisInput"
              @focus="inputFocus"
            />
            <img
              :src="IconPath('tk_6_33.png')"
              class="search-icon"
              @click="inputSearch"
            />
          </div>
          <div :class="['cancelTip',isTipRed?'red':null]">{{cancelTip}}</div>
          <div class="friendsListDiv">
            <div
              v-for="(item, index) in friendsList"
              :key="index"
              class="friends"
            >
              <div
                :class="['checkButton',isCanChecked?'canCheck':null,friendChoose?friendChoose.uid==item.uid?'active':null:null]"
                @click="handleCheck(item)"
              >
              </div>
              <!-- 点击进入用户主页 -->
              <img
                :src="IconPath(item.profile_image)"
                class="avatar"
                @click="toUserMain(item.uid)"
              />
              <div class="info">
                <div class="nick-name">{{ item.username }}</div>
                <div class="uid">
                  <img
                    v-if="item.is_pretty"
                    :src="IconPath('mk8_14.png')"
                    class="uid-icon"
                  />
                  ID：{{ item.is_pretty ? item.code : item.uid }}
                </div>
              </div>
              <!-- 夫妻 tk_6.png 师徒 tk_7.png -->
              <img
                v-if="item.user_type == 1"
                :src="IconPath('tk_6.png')"
                class="label"
              />
              <img
                v-else-if="item.user_type == 2"
                :src="IconPath('tk_7.png')"
                class="label"
              />
              <img
                v-else-if="item.user_type == 3"
                :src="IconPath('tk_7_1.png')"
                class="label"
              />
            </div>
          </div>
          <div class="cancel" @click="clickCloseSendCard">我再想想</div>
          <div class="confirm" @click="sendCardBtnCk">立即赠送</div>
          <div v-if="!friendsList.length" class="noData">暂无好友</div>
        </div>
        <!-- type3 确认赠送 -->
        <div class="type3" v-else-if="popupType === 3">
          <div class="sendCardText">
            赠送1张
            <img :src="IconPath(`tk_6_${26+Number(sendCardInfo.card_id)}.png`)"/>
            给好友
          </div>
          <div class="sendPersonDiv">
            <img
              :src="IconPath(friendChoose.profile_image)"
              class="avatar"
              @click="toUserMain(friendChoose.uid)"
            />
            <div class="info">
              <div class="nick-name">{{ friendChoose.username }}</div>
              <div class="uid">
                <img
                  v-if="friendChoose.is_pretty"
                  :src="IconPath('mk8_14.png')"
                  class="uid-icon"
                />
                ID：{{ friendChoose.is_pretty ? friendChoose.code : friendChoose.uid }}
              </div>
            </div>
          </div>
          <div class="cancel" @click="clickCloseSendCard">取消</div>
          <div class="confirm" @click="sendCardConfirmBtnCk">确认</div>
        </div>
        <!-- type4 成功送达 -->
        <div class="type4" v-else-if="popupType === 4">
          <div class="sendCardText">
            您的卡牌
            <img :src="IconPath(`tk_6_${26+Number(sendCardInfo.card_id)}.png`)"/>
            已送至好友收件箱，<br/>收件人:
          </div>
          <div class="sendPersonDiv">
            <img
              :src="IconPath(friendChoose.profile_image)"
              class="avatar"
              @click="toUserMain(friendChoose.uid)"
            />
            <div class="info">
              <div class="nick-name text-hidden">{{ friendChoose.username }}</div>
            </div>
          </div>
          <div class="confirm" @click="clickCloseSendCard">我知道了</div>
        </div>
        <!-- type5 赠卡记录 -->
        <div class="type5" v-else-if="popupType === 5">
          <template v-if="sendedCards.length">
            <div class="list-head">
              <span class="title-1">赠送福卡</span>
              <span class="title-2">赠送对象</span>
              <span class="title-3">赠送时间</span>
            </div>
            <div ref="sendHistory" class="history-list">
              <div
                v-for="(item, index) in sendedCards"
                :key="index"
                class="history"
              >
                <div class="card-icon">
                  <img :src="IconPath(`tk_6_${26+Number(sendCardInfo.card_id)}.png`)" />
                </div>
                <!-- 点击头像进入用户主页 -->
                <img
                  :src="IconPath(item.head)"
                  class="avatar"
                  @click="toUserMain(item.tuid)"
                />
                <div class="date">{{ item.create_time }}</div>
              </div>
            </div>
          </template>
          <div v-else class="no-data flex-center">暂无赠卡记录</div>
        </div>
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/whiteValentine/api/index.js'
import { toUserMain } from '@/pages/springFestival/utils/toApp'

export default {
  props: ['isShow', 'cardsHavenNumList', 'sendNum'],
  components: {},
  data() {
    return {
      isShowPo: this.isShow || true,
      popupType: 1,
      sendCardInfo: { card_id: 1 }, // 已选卡牌
      friendsList: [], // 好友列表
      friendChoose: {}, // 已选好友
      isCanChecked: true, // 卡牌是否可选
      searchUid: undefined, // 搜索id
      isDisInput: false, // 是否锁输入框
      isTipRed: false, // 是否红色展示提示
      cancelTip: '',
      sendedCards: [] // 赠卡记录
    }
  },
  created() {
    this.getFriendsList()
    this.getSendedCards()
  },
  mounted() {},
  computed: {},
  watch: {
    searchUid(newV, oldV) {
      this.searchUid = this.searchUid.replace(/\D/g, '')
    }
  },
  methods: {
    toUserMain,
    getFriendsList() {
      this.friendChoose = {}
      this.isCanChecked = true
      getPageData({ type: 'comm_friends', mark: '100' }).then((res) => {
        if (res.errno == 0) {
          // console.log('getFriendsList:', res.data)
          this.friendsList = res.data.list
          this.cancelTip = ''
        }
      })
    },
    getSendedCards() {
      getPageData({ type: 'love_card_send_log' }).then((res) => {
        // console.log(res)
        this.sendedCards = res.data
      })
    },
    clickCloseSendCard() {
      this.$emit('closePopups')
    },
    sendCardsRecordsCk() {
      console.log('查看赠卡记录')
      this.popupType = 5
    },
    sendBtnCk(item) {
      console.log(item)
      if (Number(this.sendNum) < 3) {
        if (Number(item.num) > 0) {
          this.sendCardInfo = item
          this.popupType = 2
        }
      } else {
        this.$toast('今日赠送次数已达上限，请明天再来')
      }
    },
    inputFocus() {
      // console.log(this.isDisInput)
      if (this.isDisInput === true) {
        this.isTipRed = true
        this.cancelTip = '请先取消已勾选的好友'
      }
    },
    inputSearch() {
      console.log(this.searchUid)
      if (this.searchUid) {
        getPageData({ type: 'user_info', tuid: this.searchUid }).then((res) => {
          // console.log(res)
          if (res.errno == 0) {
            if (res.data.uid == this.$store.state.uid) {
              this.isTipRed = true
              this.cancelTip = '卡牌无法赠送给自己'
            } else {
              this.friendChoose = {}
              this.isCanChecked = true
              this.friendsList = []
              this.friendsList.push(res.data)
            }
          } else if (res.errno == -1) {
            this.isTipRed = true
            this.cancelTip = '该用户不存在，请重新输入'
          }
        })
      } else {
        this.getFriendsList()
        // this.cancelTip = '请先取消已勾选的好友'
        this.isTipRed = false
      }
    },
    /**
     * 勾选好友
     */
    handleCheck(item) {
      // console.log(item)
      if (this.isCanChecked === true) {
        this.friendChoose = item
        this.isCanChecked = false
        this.isDisInput = true
        this.cancelTip = ''
        this.isTipRed = false
      } else if (this.isCanChecked === false && this.friendChoose.uid && this.friendChoose.uid === item.uid) {
        this.friendChoose = {}
        this.isCanChecked = true
        this.isDisInput = false
        this.cancelTip = ''
        this.isTipRed = false
      }
    },
    sendCardBtnCk() {
      if (this.friendChoose.uid) {
        this.popupType = 3
      }
    },
    sendCardConfirmBtnCk() {
      getPageData({ type: 'love_card_send', mark: { card_id: this.sendCardInfo.card_id, tuid: this.friendChoose.uid } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getUserInformation')
          this.popupType = 4
        } else if (res.errno == -1) {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  .van-popup {
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    position: relative;
    width: 620px;
    min-height: 300px;
    border: 5px solid #f6a1b0;
    background-color: #fff;
    padding: 5px;
    pointer-events: auto;
    border-radius: 34px;
    background: linear-gradient(180deg, #FFF3F4, #F9C4C7);
    .title-image {
      width: 644px;
      height: 230px;
      position: absolute;
      z-index: 3;
      top: -85px;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    }
    .main{
      width: 100%;
      text-align: center;
      text-align: -webkit-center;
      overflow-y: scroll;
      .type1{
        width: 100%;
        height: 540px; // 控制type1高度
        padding-top: 60px;
        position: relative;
        .sendCardsRecords{
          width: 157px;
          height: 43px;
          background: url('@/pages/whiteValentine/assets/tk_6_17.png') no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 10px;
        }
        .cardsNumDiv{
          width: 100%;
          height: 350px;
          padding: 0 5px 0 5px;
          // background-color: #F19C92;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cardNum{
            width: 174px*0.8;
            height: 234px*0.8;
            position: relative;
            &:nth-child(1) {
              background: url('@/pages/whiteValentine/assets/card_l_an.png') no-repeat;
              background-size: 100% 100%;
              &.active{
                background: url('@/pages/whiteValentine/assets/card_l.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            &:nth-child(2) {
              background: url('@/pages/whiteValentine/assets/card_o_an.png') no-repeat;
              background-size: 100% 100%;
              &.active{
                background: url('@/pages/whiteValentine/assets/card_o.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            &:nth-child(3) {
              background: url('@/pages/whiteValentine/assets/card_v_an.png') no-repeat;
              background-size: 100% 100%;
              &.active{
                background: url('@/pages/whiteValentine/assets/card_v.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            &:nth-child(4) {
              background: url('@/pages/whiteValentine/assets/card_e_an.png') no-repeat;
              background-size: 100% 100%;
              &.active{
                background: url('@/pages/whiteValentine/assets/card_e.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            .numDesignator{
              width: 34px;
              height: 34px;
              background: linear-gradient(90deg, #DF7472, #F19C92);
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 22px;
              float: right;
            }
            .sendBtn{
              width: 120px;
              height: 56px;
              background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
              border-radius: 28px;
              border: 2px solid #FFFFFF;
              line-height: 54px;
              position: absolute;
              left: 50%;
              transform: translate(-50%);
              top: 210px;
              &.active{
                background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
                color: #A9792C;
              }
            }
          }
        }
        .sendCardsTip{
          position: absolute;
          width: 100%;
          bottom: 50px;
          font-size: 26px;
          color: #B35553;
        }
      }
      .type2{
        width: 100%;
        height: 1000px; // 控制type2高度
        padding-top: 60px;
        position: relative;
        .search-input {
          position: relative;
          margin: 15px auto 8px;
          width: fit-content;

          input {
            position: relative;
            z-index: 1;
            width: 509px;
            height: 59px;
            background: #E58D8C;
            border-radius: 30px;
            padding-left: 21px;
            padding-right: 40px;
            font-size: 28px;
            color: #ffffff;
            &::placeholder {
              font-size: 28px;
              color: #ffffff70;
            }
          }

          .search-icon {
            position: absolute;
            z-index: 2;
            top: 50%;
            right: 19px;
            transform: translateY(-50%);
            width: 38px;
            height: 38px;
          }
        }
        .cancelTip{
          height: 26px;
          font-size: 24px;
          margin: 20px 0;
          color: #B35553;
          &.red{
            color: red;
          }
        }
        .sendCardText{
          font-size: 26px;
          color: #B35553;
          img{
            width: 48px;
            height: 65px;
          }
        }
        .friendsListDiv{
          width: 100%;
          height: 600px;
          overflow-y: scroll;
          .friends {
            position: relative;
            display: flex;
            align-items: center;
            height: 110px;
            &:nth-child(odd) {
              background: #F6A5B3;
            }
            &:nth-child(even) {
              background: #E58D8C;
            }
            .checkButton {
              position: relative;
              margin-left: 20px;
              width: 39px;
              height: 39px;
              background: url('@/pages/whiteValentine/assets/tk_6_36.png') no-repeat;
              background-size: 100% 100%;
              &.canCheck{
                background: url('@/pages/whiteValentine/assets/tk_6_37.png') no-repeat;
                background-size: 100% 100%;
              }
              &.active{
                background: url('@/pages/whiteValentine/assets/tk_6_38.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            .avatar {
              margin: 0 14px 0 22px;
              width: 74px;
              height: 74px;
              background: #ffffff;
              border-radius: 50%;
              object-fit: cover;
            }
            .info {
              .nick-name {
                font-size: 28px;
                color: #ffffff;
                width: 300px;
                margin-bottom: 5px;
                text-align: left;
              }
              .uid {
                .uid-icon {
                  margin-right: 7px;
                  width: 47px;
                  height: 39px;
                }
                font-size: 24px;
                color: #ffea80;
                white-space: nowrap;
                text-align: left;
                width: 100%;
              }
            }
            .label {
              position: absolute;
              top: 50%;
              right: 35px;
              transform: translateY(-50%);
              width: 72px;
              height: 34px;
            }
          }
        }
        .cancel{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #707CCB;
          line-height: 72px;
          position: absolute;
          left: 27%;
          transform: translate(-50%);
          bottom: 30px;
          z-index: 2;
        }
        .confirm{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #A9792C;
          line-height: 72px;
          position: absolute;
          left: 73%;
          transform: translate(-50%);
          bottom: 30px;
          z-index: 2;
        }
        .noData {
          width: 100%;
          height: 100%;
          font-size: 32px;
          color: #B35553;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }
      .type3{
        width: 100%;
        height: 440px; // 控制type3高度
        padding-top: 60px;
        position: relative;
        .sendCardText{
          font-size: 26px;
          color: #B35553;
          img{
            width: 48px;
            height: 65px;
          }
        }
        .sendPersonDiv{
          position: relative;
          display: flex;
          align-items: center;
          width: 450px;
          height: 110px;
          background: #E58D8C;
          border-radius: 50px;
          margin: 40px 0;
          .avatar {
            margin: 0 14px 0 22px;
            width: 74px;
            height: 74px;
            background: #ffffff;
            border-radius: 50%;
            object-fit: cover;
          }
          .info {
            .nick-name {
              font-size: 28px;
              color: #ffffff;
              width: 300px;
              margin-bottom: 5px;
              text-align: left;
            }
            .uid {
              .uid-icon {
                margin-right: 7px;
                width: 47px;
                height: 39px;
              }
              font-size: 24px;
              color: #ffea80;
              white-space: nowrap;
              text-align: left;
              width: 100%;
            }
          }
        }
        .cancel{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #707CCB;
          line-height: 72px;
          position: absolute;
          left: 27%;
          transform: translate(-50%);
          bottom: 30px;
        }
        .confirm{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #A9792C;
          line-height: 72px;
          position: absolute;
          left: 73%;
          transform: translate(-50%);
          bottom: 30px;
        }
      }
      .type4{
        width: 100%;
        height: 440px; // 控制type4高度
        padding-top: 60px;
        position: relative;
        .sendCardText{
          width: 450px;
          font-size: 26px;
          color: #B35553;
          text-align: left;
          img{
            width: 48px;
            height: 65px;
          }
        }
        .sendPersonDiv{
          position: relative;
          display: flex;
          align-items: center;
          width: 450px;
          height: 110px;
          background: #E58D8C;
          border-radius: 50px;
          margin: 40px 0;
          .avatar {
            margin: 0 14px 0 22px;
            width: 74px;
            height: 74px;
            background: #ffffff;
            border-radius: 50%;
            object-fit: cover;
          }
          .info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            height: 100%;
            .nick-name {
              font-size: 28px;
              color: #ffffff;
              width: 300px;
              margin-bottom: 5px;
              text-align: left;
            }
            .uid {
              .uid-icon {
                margin-right: 7px;
                width: 47px;
                height: 39px;
              }
              font-size: 24px;
              color: #ffea80;
              white-space: nowrap;
            }
          }
        }
        .confirm{
          width: 240px;
          height: 72px;
          background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
          border-radius: 36px;
          border: 3px solid #FFFFFF;
          font-size: 32px;
          color: #A9792C;
          line-height: 72px;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          bottom: 30px;
        }
      }
      .type5{
        width: 100%;
        height: 800px; // 控制type5高度
        padding-top: 60px;
        position: relative;
        .list-head {
          display: flex;
          align-items: center;
          font-size: 26px;
          color: #B35553;
          margin-bottom: 14px;
          .title-1 {
            margin-left: 20px;
          }
          .title-2 {
            margin-left: 29px;
          }
          .title-3 {
            margin-left: 119px;
          }
        }
        .history-list {
          height: 690px;
          overflow-y: scroll;
          .history {
            position: relative;
            display: flex;
            align-items: center;
            height: 110px;
            &:nth-child(odd) {
              background: #E58D8C;
            }
            &:nth-child(even) {
              background: #F6A5B3;
            }
            .card-icon {
              margin-left: 25px;
              width: 92px;
              height: 91px;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 48px;
                height: 65px;
              }
            }
            .avatar {
              margin: 0 59px 0 51px;
              width: 74px;
              height: 74px;
              background: #ffffff;
              border-radius: 50%;
              object-fit: cover;
            }
            .date {
              font-size: 26px;
              color: #ffffff;
            }
            .label {
              position: absolute;
              top: 50%;
              right: 35px;
              transform: translateY(-50%);
              width: 72px;
              height: 34px;
            }
          }
        }
        .no-data {
          width: 100%;
          height: 100%;
          font-size: 28px;
          color: #B35553;
        }
      }
    }
  }
}
</style>
