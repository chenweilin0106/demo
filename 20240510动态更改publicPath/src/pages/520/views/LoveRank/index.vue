<template>
  <div>
    <div class="loveRankBox">
      <!-- tag -->
      <div class="rank-tab">
        <div v-if="tagChosen == 1" class="daily-rank">
          <div class="click-content" @click="tagChosenCk(2)"></div>
        </div>
        <div v-else class="total-rank">
          <div class="click-content" @click="tagChosenCk(1)"></div>
        </div>
      </div>
      <!--奖励列表-->
      <div class="rewardsLine"></div>
      <div class="rewardsArea">
        <div class="rewardItem" v-for="(item) in rewardsList[tagChosen]" :key="item.id" @click="previewImgCk(item)">
          <div class="rewardIcon">
            <PublicImg :imgName="item.icon" :userAvatar="item.type=='mic'?$store.state.user_icon:''"></PublicImg>
          </div>
          <div class="rewardText">{{item.text}}</div>
          <div class="rewardPreview" v-if="item.previewImg"></div>
          <div class="rewardMark" v-if="item.mark">价值{{ item.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
          <div class="specialMark" v-if="item.icon=='mjf_120_120.png'" @click="isShowSpecialMark = !isShowSpecialMark">
            <div class="specialMarkTip" v-if="isShowSpecialMark">在生效期间，每次寻宝有20%概率获得双倍幸运值</div>
          </div>
        </div>
      </div>
      <div class="rewardsDetail" @click="rewardsDetailCk">奖励详情</div>
      <div class="dateArea" v-if="tagChosen==1">
        <div :class="['dateItem',select_date==index?'active':null]" v-for="(item,index) in day_list" :key="index" @click="dateChoseCk(index)">{{item}}</div>
      </div>
      <!-- 排行榜 -->
      <div class="rankArea" ref="rankingArea">
        <div class="topArea">
          <div class="topItem" v-for="item in rankShowList.slice(0,3)" :key="item.rank">
            <div class="rankIcon"></div>
            <div class="userLeft userDiv">
              <img class="userAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <span class="userName">{{item.username}}</span>
              <span class="userCode"><img v-if="item.is_pretty" :src="IconPath('mk6_22.png')" />ID:{{item.code}}</span>
            </div>
            <div class="userRight userDiv">
              <img class="userAvatar" :src="IconPath(item.tprofile_image||avatarDefault)" @click="toUserMain(item.tuid)" />
              <span class="userName">{{item.tusername}}</span>
              <span class="userCode"><img v-if="item.tuid_is_pretty" :src="IconPath('mk6_22.png')" />ID:{{item.tuid_code}}</span>
            </div>
            <div class="rankValue">热恋值<p>{{item.num}}</p></div>
          </div>
        </div>
        <div class="remianArea">
          <div class="reaminItem" v-for="item in rankShowList.slice(3)" :key="item.rank">
            <div class="rankBorder">{{item.rank}}</div>
            <div class="userLeft userDiv">
              <img class="userAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <span class="userName">{{item.username}}</span>
              <span class="userCode"><img v-if="item.is_pretty" :src="IconPath('mk6_22.png')" />ID:{{item.code}}</span>
            </div>
            <div class="userRight userDiv">
              <img class="userAvatar" :src="IconPath(item.tprofile_image||avatarDefault)" @click="toUserMain(item.tuid)" />
              <span class="userName">{{item.tusername}}</span>
              <span class="userCode"><img v-if="item.tuid_is_pretty" :src="IconPath('mk6_22.png')" />ID:{{item.tuid_code}}</span>
            </div>
            <div class="rankValue"><div class="rankValueIcon"></div>热恋值<p>{{item.num}}</p></div>
          </div>
        </div>
      </div>
      <div class="userRankArea" v-if="userRankShow.rank!=-1">
        <div class="rankBorder">{{userRankShow.rank}}</div>
        <div class="userLeft userDiv">
          <img class="userAvatar" :src="IconPath(userRankShow.profile_image||avatarDefault)" @click="toUserMain(userRankShow.uid)" />
          <span class="userName">{{userRankShow.username}}</span>
          <span class="userCode"><img v-if="userRankShow.is_pretty" :src="IconPath('mk6_22.png')" />ID:{{userRankShow.code}}</span>
        </div>
        <div class="userRight userDiv">
          <img class="userAvatar" :src="IconPath(userRankShow.tprofile_image||avatarDefault)" @click="toUserMain(userRankShow.tuid)" />
          <span class="userName">{{userRankShow.tusername}}</span>
          <span class="userCode"><img v-if="userRankShow.tuid_is_pretty" :src="IconPath('mk6_22.png')" />ID:{{userRankShow.tuid_code}}</span>
        </div>
        <div class="rankValue"><div class="rankValueIcon"></div>热恋值<p>{{userRankShow.num}}</p></div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>榜单为<i>活动绑定用户</i>双方互送<i>钻石礼物和表白</i>累计</li>
          <li>【热恋值】，1钻石=1热恋值</li>
          <li><span></span>同服绑定的用户进入本服榜单，跨服绑定的用户进</li>
          <li>入异地恋榜单</li>
          <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li>
          <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
          <li>基础魅力值，魅力值上限提高50%</li>
        </ul>
      </div>
    </div>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RewardsDetailPopup v-if="isShowRewardsDetailPopup" @clickClose="clickClose"></RewardsDetailPopup>
  </div>
</template>

<script>
import { toUserMain } from '@/pages/520/utils/toApp'
import { getPageData } from '@/pages/520/api/index'
import PreviewPopup from '../sweetTreasure/components/previewPopup.vue'
import RewardsDetailPopup from './components/rewardsDetailPopup.vue'

export default {
  name: 'love-rank',
  components: {
    PreviewPopup,
    RewardsDetailPopup
  },
  data() {
    return {
      tagChosen: 1, // 榜单选择: 1:日榜 2:总榜
      rewardsList: {
        1: [
          { id: 11, type: 'pst_privilege', icon: 'hxzy_120_120.png', text: '礼物赠送权', previewImg: 'gift_hxzy.svga', previewTipe1: '花下之约·礼物赠送权', mark: '3344' },
          { id: 12, type: 'tool', icon: 'mjf_120_120.png', text: '摸金符' },
          { id: 13, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' }
        ],
        2: [
          { id: 21, type: 'mic', icon: 'ts_yhzs_01.svga', text: '头饰', previewImg: 'ts_yhzs_01.svga', previewTipe1: '永恒之誓·头饰' },
          { id: 22, type: 'ring', icon: 'jz_ydss.svga', text: '戒指', previewImg: 'jz_ydss.svga', previewTipe1: '缘定三生·戒指', mark: '20999' },
          { id: 23, type: 'car', icon: 'car_tmay.png', text: '双人座驾', previewImg: 'car_tmay.svga', previewTipe1: '甜蜜遨游·双人座驾', previewTipe2: '双人特效需升至5.8.8版本以上\n且CP双方在同一房间时触发' },
          { id: 24, type: 'number', icon: 'mk6_24.png', text: '靓号' },
          { id: 25, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }
        ]
      }, // 榜单奖励列表
      isShowSpecialMark: true, // 摸金符提示
      day_list: {
        20240517: '05月17日',
        20240518: '05月18日',
        20240519: '05月19日',
        20240520: '05月20日',
        20240521: '05月21日'
      }, // 日期列表
      select_date: '20240517', // 所选日期
      todayDate: '20240517',
      rankShowList: [
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 1, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 2, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 3, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 4, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 5, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 6, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 7, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 8, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 9, uidStr: 0 },
        { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 10, uidStr: 0 }
      ], // 展示榜单列表
      avatarDefault: 'mk6_23.png', // 默认头像
      rankList: {
        daily_rank: [
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 1, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 2, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 3, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 4, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 5, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 6, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 7, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 8, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 9, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 10, uidStr: 0 }
        ],
        total_rank: [
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 1, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 2, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 3, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 4, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 5, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 6, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 7, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 8, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 9, uidStr: 0 },
          { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 10, uidStr: 0 }
        ]
      }, // 榜单列表
      userRankShow: { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 31, uidStr: 0 }, // 个人排名展示
      userRank: {
        self_daily_rank: {},
        self_total_rank: {}
      }, // 个人排名
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowRewardsDetailPopup: false // 奖励详情弹窗
    }
  },
  watch: {},
  computed: {},
  created() {
    this.getPageData()
  },
  mounted() {},
  methods: {
    /**
     * 获取首页数据
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno == 0) {
          this.select_date = res.data.select_date
          this.todayDate = res.data.select_date
          this.day_list = res.data.day_list
          this.rankList.daily_rank = res.data.daily_rank
          this.rankList.total_rank = res.data.total_rank
          if (res.data.self_daily_rank) {
            this.userRank.self_daily_rank = res.data.self_daily_rank
            this.userRank.self_daily_rank.rank = '10+'
            for (let item of this.rankList.daily_rank) {
              if (item.uidStr == this.userRank.self_daily_rank.uidStr) {
                this.userRank.self_daily_rank.rank = item.rank
                break
              }
            }
          } else {
            this.userRank.self_daily_rank = { rank: -1 }
          }
          if (res.data.self_total_rank) {
            this.userRank.self_total_rank = res.data.self_total_rank
            this.userRank.self_total_rank.rank = '30+'
            for (let item of this.rankList.total_rank) {
              if (item.uidStr == this.userRank.self_total_rank.uidStr) {
                this.userRank.self_total_rank.rank = item.rank
                break
              }
            }
          } else {
            this.userRank.self_total_rank = { rank: -1 }
          }
          this.tagChosenCk(1)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    toUserMain,
    /**
     * 切换榜单
     */
    tagChosenCk(type) {
      if (this.tagChosen != type) {
        this.tagChosen = type
      }
      if (this.tagChosen == 1) {
        console.log(1)
        this.rankShowList = this.rankList.daily_rank
        this.userRankShow = this.userRank.self_daily_rank
      } else if (this.tagChosen == 2) {
        console.log(2)
        this.rankShowList = this.rankList.total_rank
        this.userRankShow = this.userRank.self_total_rank
      }
      // console.log('scrollTop:', this.$refs.rankingArea.scrollTop)
      if (this.$refs.rankingArea && this.$refs.rankingArea.scrollTop > 0) {
        this.$refs.rankingArea.scrollTo({ top: 0, behavior: 'instant' })
      }
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
     * 奖励详情
     */
    rewardsDetailCk() {
      console.log('奖励详情')
      this.isShowRewardsDetailPopup = true
    },
    /**
     * 日期选择
     */
    dateChoseCk(index) {
      // console.log(this.todayDate)
      // console.log(index)
      if (Number(index) <= Number(this.todayDate)) {
        getPageData({ type: 'lovetop_daily_rank', mark: index }).then((res) => {
          if (res.errno == 0) {
            this.select_date = res.data.select_date
            this.rankList.daily_rank = res.data.daily_rank
            if (res.data.self_daily_rank) {
              this.userRank.self_daily_rank = res.data.self_daily_rank
              for (let item of this.rankList.daily_rank) {
                if (item.uidStr == this.userRank.self_daily_rank.uidStr) {
                  this.userRank.self_daily_rank.rank = item.rank
                  break
                }
              }
            } else {
              this.userRank.self_daily_rank = { rank: -1 }
            }
            this.tagChosenCk(1)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        this.$toast('暂未开启')
      }
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowPreviewPopup = false
      this.isShowRewardsDetailPopup = false
    }
  }
}
</script>
<style scoped lang="scss">
.userDiv{
  width: 90px;
  height: 90px;
  position: relative;
  .userAvatar{
    width: 90px;
    height: 90px;
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
    color: #AB2349;
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
<style scoped lang="scss">
.loveRankBox{
  width: 750px;
  // height: 2517px;
  min-height: 1600px;
  // background: url('@/pages/520/assets/mk6_21.png') no-repeat left top/100% 100%;
  border-image-source: url('@/pages/520/assets/mk6_21.png');
  border-image-slice: 1300 0 100 0 fill;
  border-image-width: 1300px 0 100px 0;
  margin: 20px auto 0 auto;
  padding: 90px 0 80px 0;
  position: relative;
  .rank-tab {
    width: 526px;
    height: 59px;
    margin: 0 auto 0 auto;
    .click-content {
      width: 240px;
      height: 100%;
      //background-color: pink;
      pointer-events: auto;
    }
    .daily-rank {
      width: 100%;
      height: 100%;
      background: url('@/pages/520/assets/mk6_1.png') no-repeat left top/100% 100%;
      pointer-events: none;
      .click-content {
        margin-left: auto;
      }
    }
    .total-rank {
      width: 100%;
      height: 100%;
      background: url('@/pages/520/assets/mk6_2.png') no-repeat left top/100% 100%;
      pointer-events: none;
      .click-content {
        margin-right: auto;
      }
    }
  }
  .rewardsLine{
    width: 513px;
    height: 37px;
    background: url('@/pages/520/assets/mk6_3.png') no-repeat left top/100% 100%;
    margin: 40px auto 0px;
  }
  .rewardsArea{
    width: 625px;
    min-height: 200px;
    border-image-source: url('@/pages/520/assets/mk6_4.png');
    border-image-slice: 100 0 80 0 fill;
    border-image-width: 100px 0 80px 0;
    margin: 10px auto 00px;
    padding: 20px 20px 30px 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    .rewardItem{
      width: 148px;
      height: 128px;
      background: linear-gradient(180deg, #FFD7EC, #FFFFFF);
      border-radius: 12px;
      border: 4px solid #F598BB;
      margin: 20px 20px;
      position: relative;
      .rewardIcon{
        width: 140px;
        height: 120px;
        position: absolute;
        left: 0;
        top: -10px;
      }
      .rewardText{
        width: 150px;
        height: 34px;
        background: #D26388;
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
        background: url('@/pages/520/assets/mk6_10.png') no-repeat left top/100% 100%;
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
      .specialMark{
        width: 32px;
        height: 32px;
        background: url('@/pages/520/assets/mk6_6.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0;
        top: 0;
        .specialMarkTip{
          width: 253px;
          height: 94px;
          background: url('@/pages/520/assets/mk6_7.png') no-repeat left top/100% 100%;
          position: absolute;
          left: -170px;
          top: -100px;
          font-size: 20px;
          color: #FFFFFF;
          padding: 20px 10px 20px 15px;
          white-space: pre-wrap;
        }
      }
    }
  }
  .rewardsDetail{
    width: 145px;
    height: 50px;
    background: linear-gradient(-90deg, #7D6FFF, #FF77D7);
    border-radius: 22px 0px 0px 22px;
    border: 4px solid #FFFFFF;
    position: absolute;
    top: 200px;
    right: 20px;
    font-size: 24px;
    color: #FFFFFF;
    text-align: center;
    line-height: 44px;
  }
  .dateArea{
    height: 240px;
    position: relative;
    .dateItem{
      width: 160px;
      height: 161px;
      background: url('@/pages/520/assets/mk6_9.png') no-repeat left top/100% 100%;
      text-align: center;
      line-height: 140px;
      font-size: 22px;
      color: #FFEAF2;
      position: absolute;
      &.active{
        background: url('@/pages/520/assets/mk6_8.png') no-repeat left top/100% 100%;
        color: #E3457A;
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
  .rankArea{
    height: 1400px;
    // background: red;
    margin: 0 auto;
    overflow: hidden scroll;
    .topArea{
      height: 720px;
      // background: #6b42df;
      margin: 0 auto;
      position: relative;
      .topItem{
        position: absolute;
        &:nth-of-type(1) {
          width: 609px;
          height: 468px;
          background: url('@/pages/520/assets/mk6_11.png') no-repeat left top/100% 100%;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          .userLeft{
            top: 130px;
            scale: 1.1;
          }
          .userRight{
            top: 130px;
            scale: 1.1;
          }
          .rankValue{
            top: 300px;
          }
        }
        &:nth-of-type(2) {
          width: 362px;
          height: 356px;
          background: url('@/pages/520/assets/mk6_12.png') no-repeat left top/100% 100%;
          left: 20px;
          top: 360px;
          .rankIcon{
            background: url('@/pages/520/assets/mk6_13.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-of-type(3) {
          width: 362px;
          height: 356px;
          background: url('@/pages/520/assets/mk6_12.png') no-repeat left top/100% 100%;
          right: 20px;
          top: 360px;
          .rankIcon{
            background: url('@/pages/520/assets/mk6_14.png') no-repeat left top/100% 100%;
          }
        }
        .rankIcon{
          width: 62px;
          height: 54px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 50px;
        }
        .userLeft{
          position: absolute;
          left: 50%;
          transform: translateX(-130%);
          top: 80px;
        }
        .userRight{
          position: absolute;
          right: 50%;
          transform: translateX(130%);
          top: 80px;
        }
        .rankValue{
          width: 239px;
          height: 63px;
          background: url('@/pages/520/assets/mk6_15.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 240px;
          font-size: 18px;
          color: #9C7D87;
          text-align: center;
          padding: 10px 0;
          p{
            font-size: 22px;
            color: #E3457A;
          }
        }
      }
    }
    .remianArea{
      .reaminItem{
        width: 668px;
        height: 176px;
        background: url('@/pages/520/assets/mk6_16.png') no-repeat left top/100% 100%;
        margin: 0 auto 10px auto;
        position: relative;
        .rankBorder{
          width: 68px;
          height: 68px;
          background: url('@/pages/520/assets/mk6_18.png') no-repeat left top/100% 100%;
          text-align: center;
          line-height: 68px;
          font-size: 26px;
          color: #FFFFFF;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        .userLeft{
          position: absolute;
          left: 50%;
          transform: translateX(-200%);
          top: 14px;
        }
        .userRight{
          position: absolute;
          right: 50%;
          transform: translateX(200%);
          top: 14px;
        }
        .rankValue{
          width: 150px;
          height: 100px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 30px;
          font-size: 18px;
          color: #fff;
          text-align: center;
          .rankValueIcon{
            width: 44px;
            height: 39px;
            background: url('@/pages/520/assets/mk6_20.png') no-repeat left top/100% 100%;
            margin: 0 auto;
          }
          p{
            font-size: 22px;
            color: #FFEF85;
            line-height: 40px;
          }
        }
      }
    }
  }
  .userRankArea{
    width: 732px;
    height: 176px;
    background: url('@/pages/520/assets/mk6_17.png') no-repeat left top/100% 100%;
    margin: 0 auto 10px auto;
    position: relative;
    .rankBorder{
      width: 68px;
      height: 68px;
      background: url('@/pages/520/assets/mk6_19.png') no-repeat left top/100% 100%;
      text-align: center;
      line-height: 68px;
      font-size: 26px;
      color: #FFFFFF;
      position: absolute;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
    .userLeft{
      position: absolute;
      left: 50%;
      transform: translateX(-200%);
      top: 14px;
    }
    .userRight{
      position: absolute;
      right: 50%;
      transform: translateX(200%);
      top: 14px;
    }
    .rankValue{
      width: 150px;
      height: 100px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 30px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      .rankValueIcon{
        width: 44px;
        height: 39px;
        background: url('@/pages/520/assets/mk6_20.png') no-repeat left top/100% 100%;
        margin: 0 auto;
      }
      p{
        font-size: 22px;
        color: #FFEF85;
        line-height: 40px;
      }
    }
  }
}
</style>
