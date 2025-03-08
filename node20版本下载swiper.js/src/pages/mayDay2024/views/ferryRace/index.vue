<template>
  <div class="component">
    <div class="rankChosenBtn">
      <div :class="['personRank',rankChosen==1?'active':null]" @click="rankChoose(1)">个人日榜</div>
      <div :class="['familyRank',rankChosen==2?'active':null]" @click="rankChoose(2)">家族日榜</div>
    </div>
    <PublicContainer class="rankBox">
      <!-- 奖励展示 -->
      <div class="rewardsShowArea">
        <div class="rewardsList">
          <div :class="['rewardItem', `type${rankChosen}`]" v-for="(item) in rankChosen==1?awardsList[1]:rankChosen==2?awardsList[2][familyGroup]:null" :key="item.id">
            <div class="iconDiv">
              <PublicImg :imgName="item.icon" :userAvatar="item.type=='mic'?$store.state.user_icon:null"></PublicImg>
            </div>
            <div class="nameDescDiv">{{item.text}}</div>
          </div>
        </div>
        <div class="rewardsDetail" @click="rewardsDetailBtnCk">奖励详情</div>
      </div>
      <div class="familyGroupDiv" v-if="rankChosen==2">
        <span>所在分组:&ensp;{{familyGroup}}组</span>
      </div>
      <!-- 排行榜 -->
      <div class="rankingArea" ref="rankingArea">
        <div class="topDiv">
          <div class="topItem" v-for="(item) in top3List" :key="`${item.rank}`">
            <img class="topAvatar" :src="IconPath(item.profile_image||item.family_icon||defaultImg)" @click="goHome(item)" @error.once="moveErrorImg"/>
            <div class="topAvatorBorder"></div>
            <div class="topName">{{item.username||item.family_name}}</div>
            <div class="topUid">
              <img class="liangIcon" v-if="item.is_pretty" :src="IconPath('mk5_17.png')"/>
              <span>ID:{{item.code}}</span>
            </div>
            <div class="topValue">
              <span>{{item.time}}km</span>
            </div>
          </div>
        </div>
        <div class="remainDiv">
          <div class="remainItem" v-for="(item) in rankingList" :key="`${item.rank}`">
            <div class="itemRank">{{item.rank}}</div>
            <img class="remainAvatar" :src="IconPath(item.profile_image||item.family_icon||defaultImg)" @click="goHome(item)" @error.once="moveErrorImg"/>
            <div class="remainName">{{item.username||item.family_name}}</div>
            <div class="remainUid">
              <img class="liangIcon" v-if="item.is_pretty" :src="IconPath('mk5_17.png')" />
              <span>ID:{{item.code}}</span>
            </div>
            <div class="remainValue">
              <span>{{item.time}}km</span>
            </div>
          </div>
        </div>
      </div>
      <div class="userArea">
        <div class="noFamily" v-if="rankChosen == 2 && userRank.uid == -1">
          未加入家族
        </div>
        <template v-else>
          <div class="itemRank">{{userRank.rank>50?'未上榜':userRank.rank}}</div>
          <img :class="['userAvatar',userRank.rank>50?'turnRight':null]" :src="IconPath(userRank.profile_image||defaultImg)" @click="goHome(userRank)" @error.once="moveErrorImg"/>
          <div :class="['userName',userRank.rank>50?'turnRight':null]">{{userRank.username}}</div>
          <div :class="['userUid',userRank.rank>50?'turnRight':null]">
            <img class="liangIcon" v-if="userRank.is_pretty" :src="IconPath('mk5_17.png')" />
            <span>ID:{{userRank.code}}</span>
          </div>
          <div class="userValue">
            <span>{{userRank.time}}km</span>
          </div>
        </template>
      </div>
    </PublicContainer>
    <div class="ruleArea">
      <div class="rules-text">
        <ul v-if="rankChosen == 1">
          <li><span></span>个人日榜为玩家每日<i>新增里程</i>排行榜，分服统计。</li>
          <li><span></span>详细榜单规则和奖励<i>可查看【奖励详情】</i></li>
        </ul>
        <ul v-else-if="rankChosen == 2">
          <li><span></span>家族日榜为<i>全服家族</i>每日<i>新增里程</i>排行榜，根据家</li>
          <li>族等级分为3组</li>
          <li><span></span>详细榜单规则和奖励<i>可查看【奖励详情】</i></li>
          <li><span></span>中途退出家族不会扣除对原家族的贡献，加入新家</li>
          <li>族后<i>重新累计</i>新获得的里程</li>
          <li><span></span><i>仅有结算时家族获奖且留在家族</i>的玩家才能获得奖励</li>
        </ul>
      </div>
    </div>
    <RewardsDetailPopup v-if="isShowRewardsDetailPopup" :config="configRewardsDetailPopup" @clickClose="clickClose"></RewardsDetailPopup>
  </div>
</template>

<script>
import RewardsDetailPopup from './components/rewardsDetailPopup.vue'
import { getPageData } from '@/pages/mayDay2024/api/index'
import { toUserMain } from '@/pages/mayDay2024/utils/toApp.js'

export default {
  name: 'ferryRace',
  props: [],
  components: {
    RewardsDetailPopup
  },
  data() {
    return {
      defaultImg: 'mk5_6.png', // 默认图片
      rankChosen: 1, // 榜单选择 1:个人日榜 2:家族日榜
      awardsList: {
        1: [{ id: 1, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' }, { id: 2, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图' }, { id: 3, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券' }, { id: 4, type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石' }],
        2: {
          A: [{ id: 1, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }, { id: 2, type: 'mic', icon: 'ts_zswz.svga', text: '头饰' }, { id: 3, type: 'tool_key', icon: 'ys_120_120.png', text: '钥匙' }],
          B: [{ id: 1, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }, { id: 2, type: 'mic', icon: 'ts_dmw.svga', text: '头饰' }, { id: 3, type: 'tool_key', icon: 'ys_120_120.png', text: '钥匙' }],
          C: [{ id: 1, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }, { id: 2, type: 'mic', icon: 'ts_zjwb.svga', text: '头饰' }, { id: 3, type: 'tool_key', icon: 'ys_120_120.png', text: '钥匙' }],
          D: [{ id: 1, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }, { id: 2, type: 'mic', icon: 'ts_lhcy.svga', text: '头饰' }, { id: 3, type: 'tool_key', icon: 'ys_120_120.png', text: '钥匙' }]
        }
      }, // 奖励列表
      top3List: [], // 前三名数据
      rankingList: [], // 4-50名数据
      personRankList: [
        { uid: 0, code: 0, rank: 1, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 2, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 3, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 4, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 5, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 6, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 7, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 8, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 9, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 10, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 11, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 12, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 13, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false }
      ], // 个人日榜
      familyGroup: 'C', // 家族所在分组
      familyRankList: [
        { uid: 0, code: 0, rank: 1, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 2, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 3, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 4, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 5, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 6, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 7, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 8, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 9, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 10, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 11, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 12, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
        { uid: 0, code: 0, rank: 13, family_name: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false }
      ], // 家族日榜
      userRank: {}, // 个人排行
      userPersonRank: { uid: 0, rank: 60, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
      userFamilyRank: { uid: 0, rank: 60, username: '虚位以待', profile_image: 'mk5_6.png', time: '0', is_pretty: false },
      isShowRewardsDetailPopup: false, // 奖励详情弹窗
      configRewardsDetailPopup: {
        type: 1,
        group: 'C'
      }
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.personRankList = res.data.daily_rank
          this.userPersonRank = { uid: res.data.uid, code: res.data.code, rank: 51, username: res.data.my_username, profile_image: res.data.my_profile_image, time: res.data.my_score, is_pretty: res.data.is_pretty }
          for (let item of this.personRankList) {
            if (item.uid == this.userPersonRank.uid) {
              this.userPersonRank.rank = item.rank
              break
            }
          }
          this.rankChoose(1)
        } else {
          this.rankChoose(1)
          this.$toast(res.errmsg)
        }
      })
      getPageData({ type: 'travel_family_rank' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.familyGroup = res.data.group
          this.familyRankList = res.data.family_rank
          if (res.data.family_info) {
            this.userFamilyRank = { uid: res.data.family_info.family_id, code: res.data.family_info.code, rank: 51, username: res.data.family_info.family_name, profile_image: res.data.family_info.icon, time: res.data.family_info.my_family_score, is_pretty: res.data.family_info.is_pretty }
            for (let item of this.familyRankList) {
              if (item.family_id == this.userFamilyRank.uid) {
                this.userFamilyRank.rank = item.rank
                break
              }
            }
          } else {
            this.userFamilyRank = { uid: -1 }
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 切换榜单
     */
    rankChoose(type) {
      if (this.rankChosen != type) {
        this.rankChosen = type
      }
      if (this.rankChosen == 1) {
        console.log(this.personRankList)
        this.top3List = this.personRankList.slice(0, 3)
        this.rankingList = this.personRankList.slice(3)
        this.userRank = this.userPersonRank
      } else if (this.rankChosen == 2) {
        console.log(this.familyRankList)
        this.top3List = this.familyRankList.slice(0, 3)
        this.rankingList = this.familyRankList.slice(3)
        this.userRank = this.userFamilyRank
      }
      // console.log('scrollTop:', this.$refs.rankingArea.scrollTop)
      if (this.$refs.rankingArea && this.$refs.rankingArea.scrollTop > 0) {
        this.$refs.rankingArea.scrollTo({ top: 0, behavior: 'instant' })
      }
    },
    /**
     * 奖励详情弹窗
     */
    rewardsDetailBtnCk() {
      console.log('奖励详情')
      this.configRewardsDetailPopup = {
        type: this.rankChosen,
        group: this.familyGroup
      }
      this.isShowRewardsDetailPopup = true
    },
    /**
     * 点击头像去往用户主页
     */
    goHome(item) {
      if (this.rankChosen == 1) {
        console.log(item)
        toUserMain(item.uid)
      }
    },
    /**
     * 替换裂开的图片
     */
    moveErrorImg(event) {
      // console.log('event:', event)
      event.currentTarget.src = require('@/pages/mayDay2024/assets/mk5_6.png')
      event.currentTarget.style.width = 'auto'
      return true
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowRewardsDetailPopup = false
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
.component{
  .rankChosenBtn {
    width: 504px;
    height: 88px;
    margin: 20px auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('@/pages/mayDay2024/assets/mk5_2.png') no-repeat left top/100% 100%;
    .personRank {
      width: 244px;
      height: 76px;
      color: #fff;
      font-size: 36px;
      text-align: center;
      line-height: 76px;
      &.active {
        color: #BF4790;
        background: url('@/pages/mayDay2024/assets/mk5_1.png') no-repeat left top/100% 100%;
      }
    }
    .familyRank {
      width: 244px;
      height: 76px;
      color: #fff;
      font-size: 36px;
      text-align: center;
      line-height: 76px;
      &.active {
        color: #BF4790;
        background: url('@/pages/mayDay2024/assets/mk5_1.png') no-repeat left top/100% 100%;
      }
    }
  }
  .rankBox{
    padding: 80px 0 0px 0;
    min-height: 500px;
    .rewardsShowArea{
      width: 660px;
      height: 332px;
      background: url('@/pages/mayDay2024/assets/mk5_3.png') no-repeat left top/100% 100%;
      margin: 20px auto 20px auto;
      padding: 80px 10px 0 10px;
      .rewardsList{
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        .rewardItem{
          display: inline-block;
          width: 140px;
          height: 170px;
          background: linear-gradient(135deg, #CEFFFF, #A5FFFD);
          border-radius: 12px;
          border: 2px solid rgba(45,196,250,0.8);
          position: relative;
          &.type1{
            width: 140px;
          }
          &.type2{
            width: 160px;
          }
          .iconDiv{
            width: 120px;
            height: 120px;
            background: linear-gradient(0deg, #008AFF, #647AFF);
            border-radius: 12px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 10px;
          }
          .nameDescDiv{
            font-size: 24px;
            color: #4A50D1;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 4px;
          }
        }
      }
      .rewardsDetail{
        margin: 20px 0 0 0;
        text-align: center;
        font-size: 28px;
        color: #4A50D1;
        text-decoration-line: underline;
      }
    }
    .familyGroupDiv{
      width: 300px;
      height: 48px;
      background: #6B7FFD;
      border-radius: 24px;
      font-size: 28px;
      color: #FFFFFF;
      text-align: center;
      line-height: 48px;
      margin: 0 auto 20px auto;
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
        height: 300px;
        // background: red;
        position: relative;
        color: #f5f5f8;
        .topItem {
          position: absolute;
          &:nth-of-type(1) {
            width: 214px;
            height: 288px;
            background: url('@/pages/mayDay2024/assets/mk5_9.png') no-repeat left top/100% 100%;
            left: 50%;
            transform: translateX(-50%);
            bottom: 10px;
          }
          &:nth-of-type(2) {
            width: 214px;
            height: 268px;
            background: url('@/pages/mayDay2024/assets/mk5_8.png') no-repeat left top/100% 100%;
            left: 40px;
            bottom: 10px;
          }
          &:nth-of-type(3) {
            width: 214px;
            height: 268px;
            background: url('@/pages/mayDay2024/assets/mk5_8.png') no-repeat left top/100% 100%;
            right: 40px;
            bottom: 10px;
          }
          .topAvatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid #50FFFF;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 20px;
          }
          .topName {
            width:200px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            text-align: center;
            font-size: 26px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 140px;
          }
          .topUid {
            white-space: nowrap;
            font-size: 22px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 180px;
            span {
              vertical-align: middle;
              display: inline-block;
            }
          }
          .topValue {
            width: 180px;
            // height: 63px;
            background: #6469D0;
            border-radius: 14px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 215px;
            font-size: 24px;
            text-align: center;
            white-space: nowrap;
            padding: 4px 0;
          }
        }
      }
      .remainDiv {
        .remainItem {
          width: 684px;
          height: 108px;
          background: url('@/pages/mayDay2024/assets/mk5_10.png') no-repeat left top/100% 100%;
          margin: 0 auto 10px auto;
          position: relative;
          .itemRank {
            width: 68px;
            height: 68px;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-weight: 600;
            font-size: 36px;
            color: #ffffff;
            text-align: center;
            line-height: 72px;
          }
          .remainAvatar {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            border: 2px solid #50FFFF;
            position: absolute;
            left: 100px;
            top: 50%;
            transform: translateY(-50%);
          }
          .remainName {
            font-size: 28px;
            color: #ffffff;
            position: absolute;
            left: 200px;
            top: 20px;
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .remainUid {
            font-size: 24px;
            color: #fff;
            position: absolute;
            left: 200px;
            top: 60px;
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
            font-size: 32px;
            color: #fff;
            line-height: 35px;
            text-align: right;
            white-space: nowrap;
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .userArea{
        width: 710px;
        height: 120px;
        background: url('@/pages/mayDay2024/assets/mk5_11.png') no-repeat left top/100% 100%;
        margin: 0 auto 0 auto;
        position: relative;
        .noFamily{
          font-weight: 600;
          font-size: 36px;
          color: #fff;
          text-align: center;
          line-height: 120px;
        }
        .itemRank {
          width: 68px;
          height: 68px;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          font-weight: 600;
          font-size: 36px;
          color: #ffffff;
          text-align: center;
          line-height: 72px;
        }
        .userAvatar {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          border: 2px solid #50FFFF;
          position: absolute;
          left: 100px;
          top: 50%;
          transform: translateY(-50%);
          &.turnRight{
            left: 150px;
          }
        }
        .userName {
          font-size: 28px;
          color: #ffffff;
          position: absolute;
          left: 200px;
          top: 20px;
          max-width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.turnRight{
            left: 250px;
          }
        }
        .userUid {
          font-size: 24px;
          color: #fff;
          position: absolute;
          left: 200px;
          top: 60px;
          max-width: 300px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            vertical-align: middle;
            display: inline-block;
          }
          &.turnRight{
            left: 250px;
          }
        }
        .userValue {
          font-size: 32px;
          color: #fff;
          line-height: 35px;
          text-align: right;
          white-space: nowrap;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
        }
    }
  }
  .ruleArea{
    width: 710px;
    background: linear-gradient(0deg, #96FFFD, #D1FFFE);
    border-radius: 36px;
    border: 4px solid #0077f6;
    padding: 30px 0;
    margin: 20px auto 0 auto;
    i{
      color: #FF78D0;
    }
  }
}
</style>
