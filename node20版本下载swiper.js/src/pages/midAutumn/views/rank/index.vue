<template>
  <div class='pageComp'>
    <OutBox class="rankBox">
      <!-- 日榜、总榜切换 -->
      <div :class="['tagChosenBg',`status${tagChosen}`]">
        <div @click="selectChosen(1)"></div>
        <div @click="selectChosen(2)"></div>
      </div>
      <!--奖励列表-->
      <div class="rewardsTip"></div>
      <div :class="['rewardsShowArea', rewardsList[`${tagChosen}`].length>3?'bigBg':null]">
        <div class="rewardItem" v-for="(item) in rewardsList[`${tagChosen}`]" :key="item.id" @click="previewImgCk(item)">
          <div :class="['rewardIcon', item.type=='title'?'titleSp':null]">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
          <div class="rewardText">{{item.text}}</div>
          <div class="rewardPreview" v-if="item.previewImg"></div>
          <div class="rewardMark" v-if="item.mark">{{ item.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
        </div>
        <div class="rewardsDetail" @click="rewardsDetailCk"></div>
      </div>
      <!-- 日期选择 -->
      <div class="dateArea" v-if="tagChosen==1">
        <div :class="['dateItem',selectDate==index?'active':null]" v-for="(item,index) in day_list" :key="index" @click="dateChoseCk(index)">{{item}}</div>
      </div>
      <!-- 榜单 -->
      <template>
        <div class="totalRankArea" ref="totalRankAreaRef">
          <div class="totalRankTop3">
            <div class="totalRankTop3Item" v-for="(item,index) in rankListShow.slice(0,3)" :key="`${item.uid}+${index}`">
              <img class="tRIAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <div class="tRIBg"></div>
              <div class="tRIName">{{item.username}}</div>
              <div :class="['tRICode', 'userPrettyCode']">
                <div class="havenBg" v-if="item.pretty_type!=0">
                  <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]"></PublicImg>
                </div>
                <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
                <span v-else class="noPrettyCode">ID:{{item.code}}</span>
              </div>
              <div class="tRITime">{{item.time}}<img :src="IconPath('dynl_35_40.png')" /></div>
            </div>
          </div>
          <div class="totalRankItem" v-for="(item,index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
            <div class="totalRankItemIcon">{{item.rank}}</div>
            <img class="totalRankItemAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
            <div class="totalRankItemName">{{item.username}}</div>
            <div :class="['totalRankItemCode', 'userPrettyCode']">
              <div class="havenBg" v-if="item.pretty_type!=0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]"></PublicImg>
              </div>
              <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
              <span v-else class="noPrettyCode">ID:{{item.code}}</span>
            </div>
            <div class="totalRankItemTime">{{item.time}}<img :src="IconPath('dynl_35_40.png')" /></div>
          </div>
        </div>
        <div class="myTotalRankArea">
          <div class="totalRankIcon">{{userRankShow.rank?userRankShow.rank:`${rankListShow.length}+`}}</div>
          <img class="totalRankAvatar" :src="IconPath(userRankShow.profile_image||avatarDefault)" @click="toUserMain(userRankShow.uid)" />
          <div class="totalRankName">{{userRankShow.username}}</div>
          <div :class="['totalRankCode', 'userPrettyCode']">
            <div class="havenBg" v-if="userRankShow.pretty_type!=0">
              <PublicImg :imgName="$store.state.prettyTypeBg[userRankShow.pretty_type]"></PublicImg>
            </div>
            <span v-if="userRankShow.pretty_type!=0" :class="['prettyCode', `color${userRankShow.pretty_type}`]">{{userRankShow.code}}</span>
            <span v-else class="noPrettyCode">ID:{{userRankShow.code}}</span>
          </div>
          <div class="totalRankTime">{{userRankShow.time}}<img :src="IconPath('dynl_35_40.png')" /></div>
        </div>
        <div class="rules-text">
          <ul>
            <li><span></span>活动期间本服用户在<em @click="toDrawCk">星河漫步</em>中获得里程自动</li>
            <li>转化为登月能量<img :src="IconPath('dynl_35_40.png')" />，1km=1<img :src="IconPath('dynl_35_40.png')" />，根据登月能量值</li>
            <li>进行排名，榜单分服</li>
            <li><span></span>若数值相同则按照最早获得时间优先排序</li>
          </ul>
        </div>
      </template>
    </OutBox>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RewardsDetailPopup v-if="isShowRewardsDetailPopup" @clickClose="clickClose"></RewardsDetailPopup>
  </div>
</template>

<script>
import { toUserMain } from '@/utils/toApp'
import { getPageData } from '@/api/index'
import PreviewPopup from '../draw/components/previewPopup.vue'
import RewardsDetailPopup from './components/rewardsDetailPopup.vue'

export default {
  name: 'rankVue',
  components: {
    PreviewPopup,
    RewardsDetailPopup
  },
    data() {
      return {
        avatarDefault: 'avatarDefault.png',
        tagChosen: 1, // 榜单选择: 1:日榜 2:总榜
        rewardsList: {
          1: [
            { id: 111, type: 'pst_privilege', icon: 'hdcs_120_120.png', text: '礼物赠送权', previewImg: 'tk_21.png', previewTipe1: '华灯初上·礼物赠送权', previewTipe2: '仅静态效果展示，礼物动效惊喜等你来体验', mark: '1666' },
            { id: 112, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }
          ],
          2: [
            { id: 121, type: 'mic', icon: 'ts_hysh.svga', text: '头饰', previewImg: 'ts_hysh.svga', previewTipe1: '皓月霜华·头饰' },
            { id: 122, type: 'car', icon: 'lgxyc_120_120.png', text: '座驾' },
            { id: 123, type: 'car', icon: 'xyc_120_120.png', text: '座驾' },
            { id: 124, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' },
            { id: 125, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图' }
          ]
        }, // 榜单奖励列表
        day_list: {
          20240913: '9月13日',
          20240914: '9月14日',
          20240915: '9月15日',
          20240916: '9月16日',
          20240917: '9月17日'
        }, // 日期列表
        selectDate: '20240913', // 所选日期
        rankListShow: [
          { rank: 1, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 2, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 3, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 4, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 5, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 6, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 7, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 8, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 9, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 },
          { rank: 10, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 }
        ], // 展示榜单
        userRankShow: { uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', time: 0 }, // 个人排名展示
        isUserRankShow: true, // 个人信息是否展示
        isShowPreviewPopup: false, // 预览弹窗
        configPreviewPopup: {},
        isShowRewardsDetailPopup: false // 奖励详情弹窗
      }
    },
  computed: {},
  watch: {},
  created() {
    this.getHomeDate()
  },
  mounted() {},
  methods: {
    toUserMain,
    /**
     * 获取页面数据
     */
    getHomeDate() {
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.day_list = res.data.day_list
          this.selectDate = res.data.select_date
          // this.selectChosen(this.tagChosen)
          this.rankListShow = res.data.rank_list
          this.userRankShow = res.data.user_info
          this.userRankShow.time = res.data.my_score
          for (let item of this.rankListShow) {
            if (item.uid == this.userRankShow.uid) {
              this.userRankShow.rank = item.rank
              break
            }
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 切换榜单
     */
    selectChosen(t, date) {
      this.tagChosen = t
      console.log(this.tagChosen)
      if (this.tagChosen == 1) {
        getPageData({ type: 'moon_daily_rank', mark: date || this.selectDate }).then((res) => {
          if (res.errno == 0) {
            this.selectDate = date || this.selectDate
            this.rankListShow = res.data.rank_list
            this.userRankShow = res.data.user_info
            this.userRankShow.time = res.data.my_score
            for (let item of this.rankListShow) {
              if (item.uid == this.userRankShow.uid) {
                this.userRankShow.rank = item.rank
                break
              }
            }
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (this.tagChosen == 2) {
        getPageData({ type: 'moon_total_rank' }).then((res) => {
          if (res.errno == 0) {
            this.selectDate = date || this.selectDate
            this.rankListShow = res.data.rank_list
            this.userRankShow = res.data.user_info
            this.userRankShow.time = res.data.my_score
            for (let item of this.rankListShow) {
              if (item.uid == this.userRankShow.uid) {
                this.userRankShow.rank = item.rank
                break
              }
            }
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
      setTimeout(() => {
        if (this.$refs.totalRankAreaRef && this.$refs.totalRankAreaRef.scrollTop > 0) {
          this.$refs.totalRankAreaRef.scrollTo({ top: 0, behavior: 'instant' })
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowPreviewPopup = false
      this.isShowRewardsDetailPopup = false
    },
    /**
     * 奖励详情点击
     */
    rewardsDetailCk() {
      this.isShowRewardsDetailPopup = true
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.previewImg) {
        console.log(item.previewImg)
        this.configPreviewPopup = {
          type: item.type,
          img: item.previewImg,
          tip1: item.previewTipe1,
          tip2: item.previewTipe2
        }
        this.isShowPreviewPopup = true
      }
    },
    /**
     * 日期选择
     */
    dateChoseCk(index) {
      // this.selectDate[this.rankChosen] = index
      this.selectChosen(this.tagChosen, index)
    },
    /**
     * 跳转抽奖页
     */
    toDrawCk() {
      this.$router.push('/draw').then(() => {
        let d = document.getElementsByClassName('layout')[0]
        d.scrollTo({ top: 0, behavior: 'instant' })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.pageComp{
  .rankBox{
    .tagChosenBg{
      width: 472px;
      height: 62px;
      margin: -20px auto 20px auto;
      display: flex;
      &.status1{
        background: url('@/pages/midAutumn/assets/mk6_1.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/midAutumn/assets/mk6_2.png') no-repeat left top/100% 100%;
      }
      :nth-child(n){
        width: 50%;
        height: 100%;
      }
    }
    .rewardsTip{
      width: 560px;
      height: 33px;
      background: url('@/pages/midAutumn/assets/mk6_3.png') no-repeat left top/100% 100%;
      margin: 30px auto 0 auto;
    }
    .rewardsShowArea{
      width: 694px;
      height: 290px;
      background: url('@/pages/midAutumn/assets/mk6_4.png') no-repeat left top/100% 100%;
      margin: 0px auto 0 auto;
      display: flex;
      justify-content: center;
      // align-items: center;
      flex-wrap: wrap;
      position: relative;
      padding: 80px 20px 60px 20px;
      &.bigBg{
        width: 694px;
        height: 449px;
        background: url('@/pages/midAutumn/assets/mk6_5.png') no-repeat left top/100% 100%;
      }
      .rewardItem{
        width: 148px;
        height: 128px;
        background: linear-gradient(180deg, #FCF2C3, #FFFFFF);
        border-radius: 12px;
        border: 4px solid #D25E2A;
        margin: 0px 10px;
        position: relative;
        .rewardIcon{
          width: 140px;
          height: 120px;
          position: absolute;
          left: 0;
          top: -0px;
          &.titleSp{
            height: 96px;
          }
        }
        .rewardText{
          width: 150px;
          height: 34px;
          background: #B55023;
          border-radius: 17px;
          font-size: 24px;
          color: #FFFFFF;
          text-align: center;
          line-height: 36px;
          position: absolute;
          left: -5px;
          top: 100px;
        }
        .rewardPreview{
          width: 140px;
          height: 26px;
          background: url('@/pages/midAutumn/assets/mk6_9.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 0px;
          top: 74px;
        }
        .rewardMark{
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          border-radius: 17px;
          font-size: 20px;
          color: #FFFFFF;
          padding: 5px;
          position: absolute;
          right: -20px;
          top: -20px;
          img{
            width: 27px;
            height: 20px;
          }
        }
      }
      .rewardsDetail{
        width: 97px;
        height: 28px;
        background: url('@/pages/midAutumn/assets/mk6_6.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
      }
    }
    .dateArea{
      height: 240px;
      position: relative;
      .dateItem{
        width: 147px;
        height: 146px;
        background: url('@/pages/midAutumn/assets/mk6_8.png') no-repeat left top/100% 100%;
        text-align: center;
        line-height: 140px;
        font-size: 22px;
        color: #B77205;
        position: absolute;
        &.active{
          background: url('@/pages/midAutumn/assets/mk6_7.png') no-repeat left top/100% 100%;
          color: #fff;
        }
        &:nth-of-type(1){
          left: 40px;
          top: 20px;
        }
        &:nth-of-type(2){
          left: 170px;
          top: 80px;
        }
        &:nth-of-type(3){
          left: 50%;
          transform: translateX(-50%);
          top: 20px;
        }
        &:nth-of-type(4){
          right: 170px;
          top: 80px;
        }
        &:nth-of-type(5){
          right: 40px;
          top: 20px;
        }
      }
    }
    .totalRankArea{
      max-height: 1200px;
      overflow-x: hidden;
      overflow-y: scroll;
      .totalRankTop3{
        height: 580px;
        position: relative;
        .totalRankTop3Item{
          &:nth-of-type(1) {
            width: 219px;
            height: 390px;
            background: url('@/pages/midAutumn/assets/mk6_20.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 50px;
            .tRIBg{
              width: 401px;
              height: 237px;
              background: url('@/pages/midAutumn/assets/mk6_19.png') no-repeat left top/100% 100%;
            }
          }
          &:nth-of-type(2) {
            width: 199px;
            height: 355px;
            background: url('@/pages/midAutumn/assets/mk6_22.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 30px;
            top: 200px;
            .tRIBg{
              width: 214px;
              height: 211px;
              background: url('@/pages/midAutumn/assets/mk6_21.png') no-repeat left top/100% 100%;
              top: -10px;
            }
          }
          &:nth-of-type(3) {
            width: 199px;
            height: 355px;
            background: url('@/pages/midAutumn/assets/mk6_24.png') no-repeat left top/100% 100%;
            position: absolute;
            right: 30px;
            top: 200px;
            .tRIBg{
              width: 214px;
              height: 211px;
              background: url('@/pages/midAutumn/assets/mk6_23.png') no-repeat left top/100% 100%;
              top: -10px;
            }
          }
          .tRIAvatar{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 50px;
          }
          .tRIBg{
            pointer-events: none;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -20px;
          }
          .tRIName{
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            font-size: 26px;
            color: #FFFFFF;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 120px;
          }
          .tRICode{
            color: #FFEF85;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 80px;
          }
          .tRITime{
            font-weight: 400;
            font-size: 22px;
            color: #FFEF85;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 40px;
            img{
              width: 35px;
              height: 40px;
            }
          }
        }
      }
      .totalRankItem{
        width: 668px;
        height: 137px;
        background: url('@/pages/midAutumn/assets/mk6_12.png') no-repeat left top/100% 100%;
        margin: 0 auto 10px auto;
        position: relative;
        .totalRankItemIcon{
          width: 66px;
          height: 66px;
          font-weight: 500;
          font-size: 26px;
          color: #FFE683;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: url('@/pages/midAutumn/assets/mk6_10.png') no-repeat left top/100% 100%;
        }
        .totalRankItemAvatar{
          width: 80px;
          height: 80px;
          border-radius: 50px;
          border: 3px solid #E15C1A;
          position: absolute;
          left: 100px;
          top: 50%;
          transform: translateY(-50%);
        }
        .totalRankItemName{
          width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          font-size: 26px;
          position: absolute;
          left: 200px;
          top: 32px;
        }
        .totalRankItemCode{
          font-weight: 400;
          font-size: 22px;
          color: #FFEF85;
          line-height: 30px;
          position: absolute;
          left: 200px;
          bottom: 30px;
          img{
            width: 52px*0.6;
            height: 43px*0.6;
            margin-right: 4px;
            vertical-align: middle;
          }
        }
        .totalRankItemTime{
          font-size: 24px;
          color: #FFFFFF;
          text-align: right;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          img{
            width: 35px;
            height: 40px;
          }
        }
      }
    }
    .myTotalRankArea{
      width: 739px;
      height: 137px;
      background: url('@/pages/midAutumn/assets/mk6_13.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .totalRankIcon{
        width: 65px;
        height: 66px;
        font-weight: 500;
        font-size: 22px;
        color: #FFF2A9;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        background: url('@/pages/midAutumn/assets/mk6_11.png') no-repeat left top/100% 100%;
      }
      .totalRankAvatar{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        border: 3px solid #E15C1A;
        position: absolute;
        left: 110px;
        top: 50%;
        transform: translateY(-50%);
      }
      .totalRankName{
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        font-size: 26px;
        position: absolute;
        left: 210px;
        top: 35px;
      }
      .totalRankCode{
        font-weight: 400;
        font-size: 22px;
        color: #FFEF85;
        line-height: 30px;
        position: absolute;
        left: 210px;
        bottom: 30px;
        img{
          width: 37px*.8;
          height: 31px*0.8;
          vertical-align: middle;
          margin: 0 5px 0 0;
        }
      }
      .totalRankTime{
        font-size: 24px;
        color: #FFFFFF;
        line-height: 36px;
        text-align: right;
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
        p{
          font-weight: 400;
          font-size: 22px;
          color: #8E45E9;
        }
        img{
          width: 35px;
          height: 40px;
        }
      }
    }
  }
}
.userDiv{
  width: 90px;
  height: 90px;
  position: relative;
  .userAvatar{
    width: 90px;
    height: 90px;
    border: 4px solid #B3CEFF;
    border-radius: 50px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .userName{
    color: #FFFFFF;
    font-size: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    display: inline-block;
    max-width: 140px;
    white-space: nowrap;//不支持换行
    overflow: hidden;//隐藏多出部分文字
    text-overflow: ellipsis;//用省略号代替多出部分文字
  }
  .userCode{
    font-size: 20px;
    color: #6E2DBE;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 130px;
    img{
      width: 37px*.8;
      height: 31px*0.8;
      vertical-align: middle;
      margin: 0 5px 0 0;
    }
  }
}
</style>
