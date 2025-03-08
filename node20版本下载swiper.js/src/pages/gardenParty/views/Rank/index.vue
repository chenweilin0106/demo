<template>
  <div class="content">
    <OutBox class="rankArea" bowKnot="true">
      <div class="rankBg"></div>
      <div class="leftBalloon"></div>
      <div class="rankChosenBtn">
        <div :class="['sendRank',rankChosen==1?'active':null]" @click="rankChoose(1)"></div>
        <div :class="['receiveRank',rankChosen==2?'active':null]" @click="rankChoose(2)"></div>
      </div>
      <!-- 奖励展示 -->
      <div class="awardsShowTitle"></div>
      <div class="awardsShowArea">
        <div class="awardsShowItem" v-for="(item) in awardsList" :key="item.id">
          <div class="awardsIcon">
            <PublicImg :imgName="item.icon"></PublicImg>
          </div>
          <div class="awardsText">{{item.text}}</div>
          <div class="luckIcon" v-if="item.isLuck"></div>
        </div>
      </div>
      <div class="awardsDetail" @click="awardsDetailCk"></div>
      <!-- 排行榜 -->
      <div class="rankingArea" ref="rankingArea">
        <div class="topDiv">
          <div class="topItem" v-for="(item) in top3List" :key="`${item.uid}_${item.rank}`">
            <img class="topAvatar" :src="IconPath(item.profile_image||defaultImg)" @click="goHome(item)" @error.once="moveErrorImg"/>
            <div class="topAvatorBorder"></div>
            <div class="topName">{{item.username}}</div>
            <div class="topUid">
              <img class="liangIcon" v-if="item.is_pretty" :src="IconPath('mk6_17.png')"/>
              <span>ID:{{item.code}}</span>
            </div>
            <div class="topValue">
              <span>{{rankChosen==1?'赠送价值(钻)':'获赠价值(钻)'}}</span>
              <p>{{item.time}}</p>
            </div>
          </div>
        </div>
        <div class="remainDiv">
          <div class="remainItem" v-for="(item) in rankingList" :key="`${item.uid}_${item.rank}`">
            <div :class="['itemRank', luckRankList.includes(item.rank)?'luckyRank':null]">{{item.rank}}</div>
            <img class="remainAvatar" :src="IconPath(item.profile_image||defaultImg)" @click="goHome(item)" @error.once="moveErrorImg"/>
            <div class="remainName">{{item.username}}</div>
            <div class="remainUid">
              <img class="liangIcon" v-if="item.is_pretty" :src="IconPath('mk6_17.png')" />
              <span>ID:{{item.code}}</span>
            </div>
            <div class="remainValue">
              <span>{{rankChosen==1?'赠送价值(钻)':'获赠价值(钻)'}}</span>
              <p>{{item.time}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 个人排行 -->
      <div class="userArea">
        <div class="itemRank">{{userRank.rank>50?'50+':userRank.rank}}</div>
        <img class="userAvatar" :src="IconPath(userRank.profile_image||defaultImg)" @click="goHome(userRank)" @error.once="moveErrorImg"/>
        <div class="userName">{{userRank.username}}</div>
        <div class="userUid">
          <img class="liangIcon" v-if="userRank.is_pretty" :src="IconPath('mk6_17.png')" />
          <span>ID:{{userRank.code}}</span>
        </div>
        <div class="userValue">
          <span>{{rankChosen==1?'赠送价值(钻)':'获赠价值(钻)'}}</span>
          <p>{{userRank.time}}</p>
        </div>
      </div>
      <!-- 文案说明 -->
      <div class="rulesText">
        <ul>
          <li><span></span>活动期间，每日<i>赠送和获赠钻石礼物价值</i>最高的前</li>
          <li>10名玩家可获得排名奖励</li>
          <li><span></span>第11名-50名中结算时名次<i>尾数为3和7</i>的用户可获</li>
          <li>得幸运奖</li>
          <li><span></span>榜单<i>每日重置</i>，奖励会在次日发放</li>
          <li>每个ID只能获得一个榜单的奖励，按最大名次派发</li>
          <li><span></span>活动期间赠送钻石礼物，可获得<i>双倍经验值和双倍</i></li>
          <li><i>基础魅力值，魅力值上限提高50%</i></li>
        </ul>
      </div>
    </OutBox>
    <div class="bottomArea"></div>
    <RulesPopup v-if="isRulesPopup" @clickClose="clickClose"></RulesPopup>
  </div>
</template>

<script>
// import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'
import PublicImg from '@/pages/gardenParty/components/publicImg.vue'
import RulesPopup from './components/rulesPopup.vue' // 奖励详情说明
import { getPageData } from '@/pages/gardenParty/api/index.js'
import { toUserMain } from '@/pages/gardenParty/utils/toApp.js'

export default {
  name: 'RankV',
  props: [],
  components: {
    RulesPopup,
    PublicImg
  },
  data() {
    return {
      defaultImg: 'mk6_22.png', // 默认图片
      rankChosen: 0, // 所选榜单 1:赠送榜 2:获赠榜
      awardsList: [
        { id: 1, type: 'chat_bubble', icon: 'qp_yhzy_sc', text: '气泡', isLuck: false },
        { id: 2, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图', isLuck: false },
        { id: 3, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图', isLuck: false },
        { id: 4, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券', isLuck: false },
        { id: 5, type: 'tool', icon: 'yb_120_120.png', text: '元宝', isLuck: true }
      ], // 奖励列表
      top3List: [], // 前三名数据
      rankingList: [], // 4-50名数据
      sendRankList: [
        { uid: 0, code: 0, rank: 1, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 2, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 3, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 4, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 5, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 6, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 7, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 8, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 9, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 10, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 11, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 12, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 13, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false }
      ], // 赠送列表
      receiveRankList: [
        { uid: 0, code: 0, rank: 1, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 2, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 3, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 4, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 5, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 6, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 7, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 8, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 9, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 10, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 11, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 12, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 13, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false }
      ], // 获赠列表
      luckRankList: [13, 17, 23, 27, 33, 37, 43, 47], // 幸运列表
      userRank: {}, // 个人排行
      userSendRank: { uid: 0, rank: 60, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
      userReceiveRank: { uid: 0, rank: 60, username: '虚位以待', profile_image: 'mk6_22.png', time: '0', is_pretty: false },
      isRulesPopup: false // 奖励详情弹窗是否展示
    }
  },
  created() {
    this.getPageData()
  },
  mounted() { },
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno == 0) {
          this.sendRankList = res.data.send_present_top
          this.receiveRankList = res.data.present_top
          this.luckRankList = res.data.lucky_ranks_index
          this.userSendRank = { uid: res.data.uid, code: res.data.code, rank: 51, username: res.data.my_username, profile_image: res.data.my_profile_image, time: res.data.my_send_present, is_pretty: res.data.is_pretty }
          for (let item of this.sendRankList) {
            if (item.uid == this.userSendRank.uid) {
              this.userSendRank.rank = item.rank
              break
            }
          }
          this.userReceiveRank = { uid: res.data.uid, code: res.data.code, rank: 51, username: res.data.my_username, profile_image: res.data.my_profile_image, time: res.data.my_present, is_pretty: res.data.is_pretty }
          for (let item of this.receiveRankList) {
            if (item.uid == this.userReceiveRank.uid) {
              this.userReceiveRank.rank = item.rank
              break
            }
          }
          this.rankChoose(1)
        } else {
          this.$toast(res.errmsg)
          this.rankChoose(1)
        }
      })
    },
    /**
     * 榜单切换
     */
    rankChoose(type) {
      if (this.rankChosen != type) {
        this.rankChosen = type
        if (this.rankChosen == 1) {
          console.log(this.sendRankList)
          this.top3List = this.sendRankList.slice(0, 3)
          this.rankingList = this.sendRankList.slice(3)
          this.userRank = this.userSendRank
        } else if (this.rankChosen == 2) {
          console.log(this.receiveRankList)
          this.top3List = this.receiveRankList.slice(0, 3)
          this.rankingList = this.receiveRankList.slice(3)
          this.userRank = this.userReceiveRank
        }
        // console.log('scrollTop:', this.$refs.rankingArea.scrollTop)
        if (this.$refs.rankingArea && this.$refs.rankingArea.scrollTop > 0) {
          this.$refs.rankingArea.scrollTo({ top: 0, behavior: 'instant' })
        }
      }
    },
    /**
     * 替换裂开的图片
     */
    moveErrorImg(event) {
      // console.log('event:', event)
      event.currentTarget.src = require('@/pages/gardenParty/assets/mk6_22.png')
      event.currentTarget.style.width = 'auto'
      return true
    },
    /**
     * 奖励详情
     */
    awardsDetailCk() {
      console.log('奖励详情')
      this.isRulesPopup = true
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isRulesPopup = false
    },
    /**
     * 点击头像去往用户主页
     */
    goHome(item) {
      console.log(item)
      toUserMain(item.uid)
    }
  }
}
</script>

<style scoped lang="scss">
.liangIcon {
  width: 37px;
  height: 31px;
  margin: 0 5px;
}
.content {
  .rankArea {
    margin: 20px auto 0px auto;
    padding: 60px 0 80px 0;
    position: relative;
    min-height: 1400px;
    .rankBg {
      width: 728px;
      height: 1237px;
      background-image: url('@/pages/gardenParty/assets/mk6_7.png');
      background-size: 100% 100%;
      position: absolute;
      top: 100px;
      left: 0;
      z-index: 0;
    }
    .leftBalloon {
      width: 182px;
      height: 577px;
      background-image: url('@/pages/gardenParty/assets/back_3.png');
      background-size: 100% 100%;
      position: absolute;
      top: 160px;
      left: -12px;
      z-index: 2;
    }
    .rankChosenBtn {
      width: 628px;
      height: 92px;
      margin: 0 auto;
      display: flex;
      position: relative;
      .sendRank {
        width: 314px;
        height: 92px;
        background-image: url('@/pages/gardenParty/assets/mk6_1_1.png');
        background-size: 100% 100%;
        &.active {
          background-image: url('@/pages/gardenParty/assets/mk6_1.png');
          background-size: 100% 100%;
        }
      }
      .receiveRank {
        width: 314px;
        height: 92px;
        background-image: url('@/pages/gardenParty/assets/mk6_2_1.png');
        background-size: 100% 100%;
        &.active {
          background-image: url('@/pages/gardenParty/assets/mk6_2.png');
          background-size: 100% 100%;
        }
      }
    }
    .awardsShowTitle {
      width: 513px;
      height: 37px;
      background-image: url('@/pages/gardenParty/assets/mk6_3.png');
      background-size: 100% 100%;
      margin: 40px auto 0 auto;
      position: relative;
    }
    .awardsShowArea {
      width: 625px;
      height: 341px;
      background-image: url('@/pages/gardenParty/assets/mk6_5.png');
      background-size: 100% 100%;
      margin: 10px auto 0 auto;
      position: relative;
      display: flex;
      flex-wrap: wrap-reverse;
      justify-content: center;
      align-content: center;
      .awardsShowItem {
        margin: 10px 15px 10px 15px;
        width: 140px;
        height: 140px;
        background: linear-gradient(180deg, #ffcee7, #ffffff);
        border-radius: 12px;
        border: 4px solid #eba3c6;
        position: relative;
        &:nth-of-type(1) {
          order: 4;
        }
        &:nth-of-type(2) {
          order: 5;
        }
        &:nth-of-type(3) {
          order: 1;
        }
        &:nth-of-type(4) {
          order: 2;
        }
        &:nth-of-type(5) {
          order: 3;
        }
        .awardsIcon {
          width: 120px;
          height: 120px;
          margin: 0 auto;
        }
        .awardsText {
          width: 150px;
          height: 34px;
          background: #cb6d95;
          border-radius: 17px;
          position: absolute;
          bottom: -10px;
          left: -8px;
          font-size: 24px;
          color: #f5f5f8;
          line-height: 40px;
          text-align: center;
        }
        .luckIcon {
          width: 76px;
          height: 70px;
          background-image: url('@/pages/gardenParty/assets/mk6_6.png');
          background-size: 100% 100%;
          position: absolute;
          top: -30px;
          right: -30px;
        }
      }
    }
    .awardsDetail {
      width: 98px;
      height: 88px;
      background-image: url('@/pages/gardenParty/assets/mk6_4.png');
      background-size: 100% 100%;
      position: absolute;
      top: 280px;
      right: 0px;
    }
    .rankingArea {
      width: 100%;
      height: 1100px;
      margin: 10px auto 0 auto;
      // background: red;
      position: relative;
      overflow-y: scroll;
      overflow-x: hidden;
      .topDiv {
        width: 100%;
        height: 540px;
        // background: red;
        position: relative;
        color: #f5f5f8;
        .topItem {
          position: absolute;
          width: 248px;
          height: 308px;
          &:nth-of-type(1) {
            background-image: url('@/pages/gardenParty/assets/mk6_9.png');
            background-size: 100% 100%;
            left: 50%;
            transform: translateX(-50%);
            top: 100px;
            .topAvatorBorder {
              background-image: url('@/pages/gardenParty/assets/mk6_8.png');
              background-size: 100% 100%;
            }
            .topValue {
              background-image: url('@/pages/gardenParty/assets/mk6_10.png');
              background-size: 100% 100%;
            }
          }
          &:nth-of-type(2) {
            background-image: url('@/pages/gardenParty/assets/mk6_12.png');
            background-size: 100% 100%;
            left: 0px;
            top: 220px;
            scale: 0.9;
            .topAvatorBorder {
              background-image: url('@/pages/gardenParty/assets/mk6_11.png');
              background-size: 100% 100%;
            }
            .topValue {
              background-image: url('@/pages/gardenParty/assets/mk6_13.png');
              background-size: 100% 100%;
            }
          }
          &:nth-of-type(3) {
            background-image: url('@/pages/gardenParty/assets/mk6_15.png');
            background-size: 100% 100%;
            right: 0px;
            top: 220px;
            scale: 0.9;
            .topAvatorBorder {
              background-image: url('@/pages/gardenParty/assets/mk6_14.png');
              background-size: 100% 100%;
            }
            .topValue {
              background-image: url('@/pages/gardenParty/assets/mk6_16.png');
              background-size: 100% 100%;
            }
          }
          .topAvatar {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -40px;
          }
          .topAvatorBorder {
            width: 408px;
            height: 212px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -100px;
            pointer-events: none;
          }
          .topName {
            white-space: nowrap;
            font-size: 26px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 120px;
          }
          .topUid {
            white-space: nowrap;
            font-size: 22px;
            color: #7452d3;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 160px;
            span {
              vertical-align: bottom;
              display: inline-block;
            }
          }
          .topValue {
            width: 218px;
            height: 63px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 200px;
            font-size: 20px;
            text-align: center;
            white-space: nowrap;
            padding-top: 8px;
            p {
              font-size: 22px;
              color: #fff477;
            }
          }
        }
      }
      .remainDiv {
        .remainItem {
          width: 668px;
          height: 137px;
          margin: 0 auto 10px auto;
          position: relative;
          &:nth-of-type(-n + 7) {
            background-image: url('@/pages/gardenParty/assets/mk6_19.png');
            background-size: 100% 100%;
            .itemRank {
              background-image: url('@/pages/gardenParty/assets/mk6_18.png');
              background-size: 100% 100%;
            }
          }
          &:nth-of-type(n + 8) {
            background-image: url('@/pages/gardenParty/assets/mk6_23.png');
            background-size: 100% 100%;
            .itemRank {
              background-image: url('@/pages/gardenParty/assets/mk6_24.png');
              background-size: 100% 100%;
            }
          }
          .itemRank {
            width: 68px;
            height: 68px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 26px;
            color: #ffffff;
            text-align: center;
            line-height: 72px;
            &.luckyRank {
              background-image: url('@/pages/gardenParty/assets/mk6_26.png');
              background-size: 100% 100%;
              color: #c7940a;
            }
          }
        }
        .remainAvatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          position: absolute;
          left: 100px;
          top: 50%;
          transform: translateY(-50%);
        }
        .remainName {
          font-size: 26px;
          color: #ffffff;
          position: absolute;
          left: 200px;
          top: 40px;
          max-width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .remainUid {
          font-size: 22px;
          color: #ffef85;
          position: absolute;
          left: 200px;
          top: 80px;
          max-width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            vertical-align: middle;
            display: inline-block;
          }
        }
        .remainValue {
          font-size: 22px;
          color: #d84784;
          line-height: 35px;
          text-align: right;
          white-space: nowrap;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          p {
            font-size: 24px;
            color: #ffffff;
          }
        }
      }
    }
    .userArea {
      width: 739px;
      height: 137px;
      background-image: url('@/pages/gardenParty/assets/mk6_21.png');
      background-size: 100% 100%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .itemRank {
        width: 68px;
        height: 67px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 26px;
        color: #ffffff;
        text-align: center;
        line-height: 72px;
        background-image: url('@/pages/gardenParty/assets/mk6_20.png');
        background-size: 100% 100%;
      }
      .userAvatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        position: absolute;
        left: 100px;
        top: 50%;
        transform: translateY(-50%);
      }
      .userName {
        font-size: 26px;
        color: #ffffff;
        position: absolute;
        left: 200px;
        top: 40px;
        max-width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .userUid {
        font-size: 22px;
        color: #ffef85;
        position: absolute;
        left: 200px;
        top: 80px;
        max-width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          vertical-align: middle;
          display: inline-block;
        }
      }
      .userValue {
        font-size: 22px;
        color: #d84784;
        line-height: 35px;
        text-align: right;
        white-space: nowrap;
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
        p {
          font-size: 24px;
          color: #ffffff;
        }
      }
    }
    .rulesText{
      line-height: 45px;
      color: #96526F;
      font-weight: 500;
      white-space: nowrap;
      width: 605px;
      // margin-left: 40px;
      margin: 10px auto 0 auto;
      li {
        position: relative;
        list-style-type: none;
        font-size: 28px;
        display: flex;
        align-items: center;
        span {
          position: absolute;
          top: 16px;
          left: -28px;
          width: 12px;
          height: 12px;
          background: #FFB5D4;
          border-radius: 50%;
        }
        i {
          color: #4F85FF;
        }
        img{
          width: 40px;
          height: 33px;
          margin: 0 5px;
        }
      }
    }
  }
  .bottomArea {
    height: 170px;
  }
}
</style>
