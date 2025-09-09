<template>
  <div ref="rankVue" class="rankVue">
    <div class="tabs_box flex position-relative justify-center margin-row-center" :class="`status${rankChosen}`">
      <div class="rankChosenBg h-100 flex-1" v-for="(item,index) in tabsArray" :key="index" @click="selectChosen(item.rank,1,todaySelectDate,true)"></div>
    </div>
    <!--<div class="needTopDiv" ref="needTopDivRef"></div>-->
    <OutBox class="rankBox position-relative">
      <div class="rankBoxBg position-absolute position-row-center pointer-none"></div>
      <!-- 日榜、总榜切换 -->
      <div :class="['tagChosenBg flex position-relative',`status${tagChosen}`]">
        <div class="flex-1 h-100" @click="selectChosen(rankChosen, 1, todaySelectDate)"></div>
        <div class="flex-1 h-100" @click="selectChosen(rankChosen, 2)"></div>
      </div>
      <!--奖励列表-->
      <div class="rewardsTip position-relative"></div>
      <div :class="['rewardsShowArea flex align-center justify-center position-relative',`status${rankChosen}`]">
        <div class="rewardItem position-relative" :class="rewardsList[`${rankChosen}${tagChosen}`].length>=4?'smallMargin':''" v-for="(item) in rewardsList[`${rankChosen}${tagChosen}`]" :key="item.id" @click="previewImgCk(item)">
          <div :class="['rewardIcon position-absolute position-row-center', item.type=='title'?'titleSp':null]">
            <PublicImg :imgName="item.icon" :imgType="item.type" />
          </div>
          <div class="rewardText radius-999 position-absolute position-row-center w-100 text-center line-height-1 flex align-center justify-center">{{item.text}}</div>
          <div class="rewardPreview position-row-center position-absolute" v-if="item.previewImg"></div>
          <div class="rewardMark position-absolute radius-999" v-if="item.mark">{{item.mark}}<img :src="IconPath('zs_27_20.png')" /></div>
          <div v-if="item.mark1" class="doublePersonMark position-absolute"></div>
          <div v-if="item.isNew" class="newMark flex align-center justify-center position-absolute pointer-none">新</div>
        </div>
        <!--<div class="rewardsDetail" @click="rewardsDetailCk"></div>-->
      </div>
      <!-- 日期选择 -->
      <div v-if="tagChosen==1" class="dayBox position-absolute flex-column align-center">
        <div class="rb_dateDiv justify-center flex align-center position-relative line-height-1" @click.stop="exchangeDateShow">
          <div v-for="(item, index) in day_list" :key="index + item">
            <span v-if="selectDate[rankChosen]==index">{{item}}</span>
          </div>
          <div :class="['rb_dateListsIcon position-absolute', `status${isShowDateList}`]"></div>
        </div>
        <div v-if="isShowDateList" ref="dateListAreaRef" class="rb_dateListArea flex overflow-y-scroll overflow-x-hidden overscroll-none justify-center">
          <div class="rb_dateListDiv position-relative flex-column align-center">
            <div v-for="(item, index) in day_list" :key="index + item" class="rb_dateListItem flex align-center justify-center line-height-1 flex-shrink-0 position-relative" @click.stop="selectChosen(rankChosen, tagChosen, index)">
              <span>{{item}}</span>
              <div class="rb_dateListItemChosen position-absolute" v-if="index==selectDate[rankChosen]"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 榜单 -->
      <div class="rulesBtn position-absolute" @click="isShowRulesPopup=true"></div>
      <!-- <RankCom1 v-if="rankChosen==1" ref="rankCom1Ref" :rankListShow="rankListShow" :userRankShow="userRankShow" :tagChosen="tagChosen" :rankChosen="rankChosen" /> -->
      <!-- <RankCom2 v-if="rankChosen==2" ref="rankCom2Ref" :rankListShow="rankListShow" :userRankShow="userRankShow" :tagChosen="tagChosen" :rankChosen="rankChosen" @isShowBtnCk="isShowBtnCk" /> -->
      <!-- <RankCom3 v-else-if="rankChosen==2" ref="rankCom2Ref" :rankListShow="rankListShow" :userRankShow="userRankShow" :tagChosen="tagChosen" :rankChosen="rankChosen" @isShowBtnCk="isShowBtnCk" /> -->
      <RankCom4 ref="rankCom4Ref" :rankListShow="rankListShow" :userRankShow="userRankShow" :tagChosen="tagChosen" :rankChosen="rankChosen" @routerJump="routerJump" />
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间绑定用户互送钻石礼物、表白、参与<img :src="IconPath('mk7_51.png')" class="icon2 position-absolute position-column-center" @click="routerJump('/gift')" /></li>
          <li>送出花盒可获得【宠爱值】，1钻石=1宠爱值</li>
          <li><span></span>日榜为每日新增宠爱值排行榜，总榜为活动期间累</li>
          <li>计宠爱值排行榜</li>
          <li><span></span>同服绑定的用户进入本服榜单，跨服绑定的用户进</li>
          <li>入跨服榜单</li>
          <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li>
          <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
          <li>基础魅力值，魅力值上限提高50%</li>
          <!-- <li v-show="rankChosen==1&&tagChosen==1"><span></span>人气榜日榜为用户获赠钻石礼物总价值排行榜，榜</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==1">单分服统计，自己赠送自己计算在内</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==2"><span></span>人气榜总榜为用户获赠钻石礼物总价值排行榜，榜</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==2">单分服统计，自己赠送自己计算在内</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==1"><span></span>魔力榜日榜为每日用户单人/组队新增魔力值排行</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==1">榜，榜单分服统计</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==2"><span></span>魔力榜总榜为活动期间单人/组队累计魔力值排行</li> -->
          <!-- <li v-show="rankChosen==1&&tagChosen==2">榜，榜单分服统计</li> -->
          <!-- <li v-show="rankChosen==2"><span></span>风云榜为活动期间<i>本服用户赠送钻石礼物</i>排行榜，</li> -->
          <!-- <li v-show="rankChosen==2">榜单分服统计，自己赠送自己计算在内</li> -->
          <!-- <li v-show="rankChosen==2"><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li> -->
          <!-- <li v-show="rankChosen==2">卡不计算在内</li> -->
        </ul>
      </div>
    </OutBox>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="isShowPreviewPopup=false" />
    <RulesPopup v-if="isShowRulesPopup" :rankChosen="rankChosen" @clickClose="isShowRulesPopup=false" />
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { scrollToHeight } from '@/utils/tool'
import PreviewPopup from './previewPopup.vue'
import RulesPopup from './rulesPopup.vue'
import RankCom4 from './rankCom4.vue'

export default {
  name: 'rankVue',
  components: { PreviewPopup, RulesPopup, RankCom4 },
  data() {
    return {
      tabsArray: Object.freeze([{ rank: 1, tabName: '魔力榜' }, { rank: 2, tabName: '神豪榜' }]),
      rankChosen: 4, // todo 榜单 4:爱意榜 用于数据请求/rewardsList（奖励列表）/selectDate（默认日期）/榜单滚动（榜单滚动需要同时配置rankCom${rankChosen}Ref）
      tagChosen: 1, // 榜单选择: 1:日榜 2:总榜
      rewardsList: Object.freeze({
        41: [
          { id: 111, type: 'pst_privilege', icon: 'mrxy_120_120.png', text: '礼物赠送权', mark: '2888', previewImg: 'tk_50.png', previewTip1: '毛绒絮语·礼物赠送权', mark1: true },
          { id: 112, type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石' }
        ],
        42: [
          { id: 121, type: 'car', icon: 'axcp_120_120.png', text: '座驾', previewImg: 'car_axcp.svga', previewTip1: '爱心敞篷·双人座驾', mark1: true },
          { id: 122, type: 'mic', icon: 'ts_llbw.svga', text: '头饰' },
          { id: 123, type: 'room_dec_suit', icon: 'ymmg_120_120.png', text: '房间装扮', previewImg: '2025_520_tk_54.svga', previewTip1: '夜幕玫瑰·房间装扮' },
          { id: 124, type: 'tool', icon: 'cplh_120_120.png', text: 'CP靓号' }
        ]
      }), // todo 榜单奖励列表
      day_list: { 20250516: '5月16日', 20250517: '5月17日', 20250518: '5月18日', 20250519: '5月19日', 20250520: '5月20日', 20250521: '5月21日', 20250522: '5月22日', 20250523: '5月23日' }, // todo 日期列表
      todaySelectDate: 20250516, // todo 当天日期
      selectDate: { 4: 20250516 }, // todo 所选日期
      isShowDateList: false, // 是否显示日期选择列表
      rankListShow: [
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 1, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 2, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 3, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 4, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 5, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 6, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 7, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 8, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 9, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 10, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 11, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 12, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 13, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 14, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 15, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 16, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 17, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 18, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 19, relation: 0, virtual_info: [], tvirtual_info: [] },
        { uidStr: 0, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_pretty_type: 0, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 20, relation: 0, virtual_info: [], tvirtual_info: [], gender: '0', tgender: '1' }
      ], // 展示榜单
      userRankShow: { uid: 0, code: 0, hide_name: false, pretty_type: 0, tuid_pretty_type: 0, username: '虚位以待', profile_image: '', time: 0, num: 0, tuid: 0, tusername: '虚位以待', tprofile_image: '', relation: 0, fans: { fans_uid: 0, fans_username: '虚位以待', fans_profile_image: '' } }, // 个人排名展示
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowRulesPopup: false // 规则弹窗
    }
  },
  created() {
    if (this.$route.query.rankChosen) this.rankChosen = this.$route.query.rankChosen
    if (this.$route.query.tagChosen) this.tagChosen = this.$route.query.tagChosen
    this.getHomePage()
  },
  mounted() {
    if (this.$route.query.scroll) scrollToHeight(this.$refs.rankVue.getBoundingClientRect().top)
  },
  methods: {
    routerJump(path) {
      scrollToHeight('top')
      this.$nextTick(() => this.$router.replace({ path }))
    },
    getScene(arr) {
      return arr.find(item => item.component_id == 4)?.small_icon
    },
    /**
     * 获取页面数据
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm8' }).then((res) => {
        if (res.errno == 0) {
          this.day_list = res.data.day_list
          this.todaySelectDate = Number(res.data.select_date)
          for (let index in this.selectDate) {
            this.selectDate[index] = res.data.select_date
          }
          this.selectChosen(this.rankChosen, this.tagChosen, this.selectDate[this.rankChosen])
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 切换榜单
     */
    selectChosen(r, t, date) {
      this.isShowDateList = false
      const rankStrategies = {
        // 1: () => getPageData({ type: 'white_love_daily_rank', mark: { rank_type: r, date: date || this.todaySelectDate } }), // 日榜 多个榜单需要mark字段
        1: () => getPageData({ type: 'lovetop_daily_rank', mark: date || this.todaySelectDate }), // 日榜
        // 2: () => getPageData({ type: 'white_love_tot_rank', mark: r }) // 总榜 多个榜单需要mark字段
        2: () => getPageData({ type: 'lovetop_tot_rank' }) // 总榜
      }
      if (!rankStrategies[t]) return console.log('切换榜单数据错误')
      rankStrategies[t]().then((res) => {
        if (res.errno) return this.$toast(res.errmsg)
        this.rankChosen = r
        this.tagChosen = t
        if (this.tagChosen == 1) this.selectDate[this.rankChosen] = date || res.data.select_date // 日榜 存储日期数据
        this.rankListShow = res.data.rank_list
        this.userRankShow = res.data.my_rank ? res.data.my_rank : { ...res.data.user_info, time: res.data.my_score }
        if (res.data.hide_name) this.userRankShow.hide_name = res.data.hide_name
        this.findUserRankInList() // 查找用户在榜单中的排名
        this.$nextTick(() => this.$refs[`rankCom${this.rankChosen}Ref`].scrollRank()) // 还原榜单滚动
      })
    },
    /**
     * 在榜单中查找用户排名
     */
    findUserRankInList() {
      if (!this.userRankShow.uid) return console.log('未获取到用户uid')
      const list = this.rankListShow
      for (let i = 0; i < list.length; i++) {
        if (list[i].uid == this.userRankShow.uid) return (this.userRankShow.rank = list[i].rank)
      }
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.previewImg) {
        this.configPreviewPopup = { type: item.type, img: item.previewImg, tip1: item.previewTip1 }
        this.isShowPreviewPopup = true
      }
    },
    /**
     * 展示日期选择框
     */
    exchangeDateShow() {
      this.isShowDateList = !this.isShowDateList
      this.$nextTick(() => {
        if (this.isShowDateList === true) {
          let man = this.$refs.dateListAreaRef
          let i = 0
          for (let index in this.day_list) {
            i++
            if (this.selectDate[this.rankChosen] == index) break
          }
          let len = document.getElementsByClassName('rb_dateListItem')[0].clientHeight * (Number(i) - 2)
          man.scrollTo({ top: len, behavior: 'smooth' })
        }
      })
    },
    /**
     * 切换是否公开昵称
     */
    isShowBtnCk: _throttle(function() {
      // this.userRankShow.hide_name = !this.userRankShow.hide_name
      getPageData({ type: 'white_love_top_name_set', mark: this.userRankShow.hide_name ? '2' : '1' }).then((res) => {
        if (res.errno == 0) {
          this.userRankShow.hide_name = !this.userRankShow.hide_name
          this.selectChosen(this.rankChosen, this.tagChosen, this.selectDate[this.rankChosen])
        } else {
          this.$toast(res.errmsg)
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
.rankVue {
  .tabs_box {
    // margin-top: -70px;
    width: 507px;
    height: 123px;
    padding: 0 30px;
    transition: all 0.3s;
    &.status1{
      background: url('@/pages/618/assets/mk6_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/618/assets/mk6_2.png') no-repeat left top/100% 100%;
    }
  }
  .rankBox{
    margin-top: 4px;
    .rankBoxBg{
      width: 690px;
      height: 2094px;
      background: url('@/pages/520/assets/mk7_8.png') no-repeat left top/100% 100%;
      top: 15px;
    }
    .tagChosenBg{
      width: 526px;
      height: 59px;
      margin: 0 auto 20px;
      transition: all 0.3s;
      &.status1{
        background: url('@/pages/520/assets/mk7_3.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/520/assets/mk7_4.png') no-repeat left top/100% 100%;
      }
    }
    .rewardsTip{
      width: 513px;
      height: 37px;
      background: url('@/pages/520/assets/mk7_5.png') no-repeat left top/100% 100%;
      margin: 30px auto 20px;
    }
    .rewardsShowArea{
      margin: 0 auto 20px;
      padding: 23px 0 36px;
      background: url('@/pages/520/assets/mk7_6.png') no-repeat left top/100% 100%;
      width: 625px;
      height: 193px;
      .rewardItem{
        width: 148px;
        height: 128px;
        background: linear-gradient(180deg, #FFE3CF, #FFFFFF);
        border-radius: 12px;
        border: 4px solid #F79A81;
        margin: 10px 20px;
        z-index: 1;
        &.smallMargin{
          width: 138px;
          margin-left: 5px;
          margin-right: 5px;
        }
        .rewardIcon{
          width: 120px;
          height: 120px;
          top: 0;
        }
        .rewardText{
          height: 34px;
          background: #D2635E;
          padding: 0 10px;
          font-size: 22px;
          color: #FFFFFF;
          top: 100px;
        }
        .rewardPreview{
          width: 140px;
          height: 26px;
          background: url('@/pages/520/assets/mk7_49.png') no-repeat left top/100% 100%;
          top: 74px;
        }
        .rewardMark{
          background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          font-size: 20px;
          color: #FFFFFF;
          padding: 4px 5px 4px 10px;
          right: -20px;
          top: 0;
          transform: translateY(-50%);
          img{
            width: 27px;
            height: 20px;
            margin: 0 0 0 2px;
          }
        }
        .newMark{
          z-index: 3;
          top: -18px;
          left: -13px;
          width: 46px;
          height: 38px;
          background: linear-gradient(-90deg, #FF7FA6, #FD5AB6);
          border-radius: 19px 19px 0 19px;
          font-weight: 500;
          font-size: 22px;
          color: #FFFFFF;
        }
        .doublePersonMark{
          width: 56px;
          height: 32px;
          background: url('@/pages/520/assets/mk7_14.png') no-repeat left top/100% 100%;
          top: 0;
          transform: translateY(-50%);
          left: -4px;
        }
      }
    }
    .dayBox{
      top: 360px;
      left: -9px;
      z-index: 3;
      width: 220px;
      .rb_dateDiv{
        width: 220px;
        height: 75px;
        background: url('@/pages/nationalDay/assets/mk6_9.png') no-repeat left top/100% 100%;
        font-weight: bold;
        font-size: 26px;
        color: #AD7E1A;
        z-index: 2;
        .rb_dateListsIcon{
          width: 29px;
          height: 15px;
          right: 23px;
          top: 29px;
          &.statusfalse{
            background: url('@/pages/nationalDay/assets/mk6_12.png') no-repeat left top/100% 100%;
          }
          &.statustrue{
            background: url('@/pages/nationalDay/assets/mk6_11.png') no-repeat left top/100% 100%;
          }
        }
      }
      .rb_dateListArea{
        margin-top: -5px;
        width: 240px;
        max-height: 300px;
        &::after{
          content: '';
          position: absolute;
          z-index: 1;
          left: 50%;
          transform: translateX(-50%);
          top: 60px;
          width: 168px;
          height: calc(100% - 75px + 20px + 5px);
          border-radius: 20px;
          border: 8px solid #FFC62D;
          border-top-width: 10px;
          border-bottom-width: 10px;
          box-sizing: border-box;
          background: linear-gradient(0deg, #FFF7D6, #FFFFFF);
          box-shadow: 0px 0px 13px 0px #FFC62D;
        }
        .rb_dateListDiv{
          z-index: 2;
          width: 152px;
          border-radius: 18px;
          .rb_dateListItem{
            width: 141px;
            height: 53px;
            border-bottom: 2px solid #EFD48D;
            font-weight: bold;
            font-size: 26px;
            color: #AD7E1A;
            z-index: 1;
            &:last-child{
              border-bottom: none;
            }
            .rb_dateListItemChosen{
              top: 5px;
              width: 45px;
              height: 35px;
              background: url('@/pages/nationalDay/assets/mk6_10.png') no-repeat left top/100% 100%;
              right: -28px;
              z-index: 2;
            }
          }
        }
      }
    }
    .rulesBtn{
      width: 70px;
      height: 185px;
      background: url('@/pages/520/assets/mk7_7.png') no-repeat left top/100% 100%;
      right: -11px;
      top: 198px;
    }
  }
  .rules-text{
    margin-top: 15px;
    .icon2{
      right: 0;
      transform: translateX(50%) translateY(-50%);
      width: 75px;
      height: 72px;
    }
  }
}
</style>
