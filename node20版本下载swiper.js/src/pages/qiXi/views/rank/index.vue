<template>
  <div class='pageComp'>
    <!-- 情缘榜、财神榜切换 -->
    <div :class="['rankChosenBg',`status${rankChosen}`]">
      <div @click="selectChosen(1,1)"></div>
      <div @click="selectChosen(2,1)"></div>
    </div>
    <OutBox class="rankBox">
      <!--奖励列表-->
      <div class="rewardsLine"></div>
      <div class="rewardsArea">
        <div class="rewardItem" v-for="(item) in rewardsList[`${rankChosen}${tagChosen}`]" :key="item.id" @click="previewImgCk(item)">
          <div class="rewardIcon">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
          <div class="rewardText">{{item.text}}</div>
          <div class="rewardPreview" v-if="item.previewImg"></div>
          <div class="rewardMark" v-if="item.mark">价值{{ item.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
        </div>
      </div>
      <div class="rewardsDetail" @click="rewardsDetailCk"></div>
      <!-- 日榜、总榜切换 -->
      <div :class="['tagChosenBg',`status${tagChosen}`]">
        <div @click="selectChosen(rankChosen,1)"></div>
        <div @click="selectChosen(rankChosen,2)"></div>
      </div>
      <!-- 日期选择 -->
      <div class="dateArea" v-if="tagChosen==1">
        <div :class="['dateItem',selectDate[rankChosen]==index?'active':null]" v-for="(item,index) in day_list" :key="index" @click="dateChoseCk(index)">{{item}}</div>
      </div>
      <!-- 榜单 -->
      <template v-if="rankChosen==1">
        <div class="rankArea" ref="rankingArea">
          <div class="topArea">
            <div class="topItem" v-for="item in rankListShow.slice(0,3)" :key="item.rank">
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
              <div class="rankValue">情缘值<p>{{item.num}}</p></div>
            </div>
          </div>
          <div class="remianArea">
            <div class="reaminItem" v-for="item in rankListShow.slice(3)" :key="item.rank">
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
              <div class="rankValue"><div class="rankValueIcon"></div>情缘值<p>{{item.num}}</p></div>
            </div>
          </div>
        </div>
        <div class="userRankArea" v-if="isUserRankShow">
          <div class="rankBorder">{{userRankShow.rank==31?"30+":userRankShow.rank}}</div>
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
          <div class="rankValue"><div class="rankValueIcon"></div>情缘值<p>{{userRankShow.num}}</p></div>
        </div>
        <div class="rules-text">
          <ul>
            <li><span></span>榜单为<i>活动绑定用户</i>双方互送<i>钻石礼物和表白</i>累计</li>
            <li>【情缘值】，1钻石=1情缘值</li>
            <li><span></span>同服绑定的用户进入本服榜单，跨服绑定的用户进</li>
            <li>入异地恋榜单</li>
            <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li>
            <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
            <li>基础魅力值，魅力值上限提高50%</li>
          </ul>
        </div>
      </template>
      <template v-else-if="rankChosen==2">
        <div class="totalRankArea" ref="totalRankAreaRef">
          <div class="totalRankTop3">
            <div class="totalRankTop3Item" v-for="(item,index) in rankListShow.slice(0,3)" :key="`${item.uid}+${index}`">
              <img class="tRIAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <div class="tRIBg"></div>
              <div class="tRIName">{{item.username}}</div>
              <div class="tRICode">
                <img v-if="item.is_pretty" :src="IconPath('mk6_22.png')" />
                <span>ID:{{item.code}}</span>
              </div>
              <!-- <div class="tRITime">{{item.time}}层</div> -->
            </div>
          </div>
          <div class="totalRankItem" v-for="(item,index) in rankListShow.slice(3)" :key="`${item.uid}+${index}`">
            <div class="totalRankItemIcon">{{item.rank}}</div>
            <img class="totalRankItemAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
            <div class="totalRankItemName">{{item.username}}</div>
            <div class="totalRankItemCode">
              <img v-if="item.is_pretty" :src="IconPath('mk6_22.png')" />
              <span>ID:{{item.code}}</span>
            </div>
            <div class="totalRankItemTime"><p>距离上一名</p>{{item.diff}}财富值</div>
          </div>
        </div>
        <div class="myTotalRankArea">
          <div class="totalRankIcon">{{userRankShow.rank==31?"20+":userRankShow.rank}}</div>
          <img class="totalRankAvatar" :src="IconPath(userRankShow.my_profile_image||avatarDefault)" @click="toUserMain(userRankShow.uid)" />
          <div class="totalRankName">{{userRankShow.my_username}}</div>
          <div class="totalRankCode">
            <img v-if="userRankShow.is_pretty" :src="IconPath('mk6_22.png')" />
            <span>ID:{{userRankShow.code}}</span>
          </div>
          <div class="totalRankTime">{{userRankShow.my_recharge}}财富值</div>
        </div>
        <div class="rules-text">
          <ul>
            <li><span></span>财神榜为活动期间<i>本服用户累计充值</i>排行榜，榜单</li>
            <li>分服统计</li>
            <li><span></span><i>详细榜单规则和奖励可查看页面【奖励详情】</i></li>
            <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
            <li>卡不计算在内</li>
          </ul>
        </div>
      </template>
    </OutBox>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RewardsDetailPopup v-if="isShowRewardsDetailPopup" :rankChosen="rankChosen" @clickClose="clickClose"></RewardsDetailPopup>
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
        avatarDefault: 'mk6_23.png',
        rankChosen: 1, // 榜单选择: 1:情缘榜 2:财神榜
        tagChosen: 1, // 榜单选择: 1:日榜 2:总榜
        rewardsList: {
          11: [
            { id: 111, type: 'pst_privilege', icon: 'jqrm_120_120.png', text: '礼物赠送权', previewImg: 'tk_21.png', previewTipe1: '佳期如梦·礼物赠送权', previewTipe2: '仅静态效果展示，礼物动效惊喜等你来体验', mark: '1314' },
            { id: 112, type: 'tool', icon: 'ljs_120_120.png', text: '绿晶石' }
          ],
          12: [
            { id: 121, type: 'tool', icon: 'jz_fhyf.svga', text: '戒指' },
            { id: 122, type: 'CP_card', icon: 'xhcl_120_120.png', text: 'CP资料卡', previewImg: 'cp card_xhcl.svga', previewTipe1: '星河灿烂·限定CP资料卡' },
            { id: 123, type: 'tool', icon: 'mk6_24.png', text: '靓号' }
          ],
          21: [
            { id: 211, type: 'tool', icon: 'fsjc_120_120.png', text: '符石精粹' }
          ],
          22: [
            { id: 221, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' },
            { id: 222, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图' },
            { id: 223, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券' }
          ]
        }, // 榜单奖励列表
        day_list: {
          20240807: '8月7日',
          20240808: '8月8日',
          20240809: '8月9日',
          20240810: '8月10日',
          20240811: '8月11日'
        }, // 日期列表
        selectDate: {
          1: '20240807',
          2: '20240807'
        }, // 所选日期
        rankListShow: [
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
        ], // 展示榜单
        userRankShow: { uid: 0, code: 0, is_pretty: false, username: '虚位以待', profile_image: '', tuid: 0, tuid_code: 0, tuid_is_pretty: false, tusername: '虚位以待', tprofile_image: '', num: 0, rank: 31, uidStr: 0 }, // 个人排名展示
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
          this.selectDate[1] = res.data.select_date
          this.selectDate[2] = res.data.select_date
          this.selectChosen(this.rankChosen, this.tagChosen)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 切换榜单
     */
    selectChosen(r, t, date) {
      this.rankChosen = r
      this.tagChosen = t
      console.log(this.rankChosen, this.tagChosen)
      if (this.rankChosen == 1) {
        if (this.tagChosen == 1) {
          getPageData({ type: 'lovecrown_cp_day_top_info', mark: date || this.selectDate[1] }).then((res) => {
            if (res.errno == 0) {
              this.selectDate[this.rankChosen] = date || this.selectDate[this.rankChosen]
              this.rankListShow = res.data.rank_list
              if (res.data.self_daily_rank) {
                this.isUserRankShow = true
                this.userRankShow = res.data.self_daily_rank
                this.userRankShow.rank = 31
                for (let item of this.rankListShow) {
                  if (item.uid == this.userRankShow.uid || item.tuid == this.userRankShow.uid) {
                    this.userRankShow.rank = item.rank
                    break
                  }
                }
              } else {
                this.isUserRankShow = false
              }
            } else {
              this.$toast(res.errmsg)
            }
          })
        } else if (this.tagChosen == 2) {
          getPageData({ type: 'lovecrown_cp_tot_top_info' }).then((res) => {
            if (res.errno == 0) {
              this.rankListShow = res.data.rank_list
              if (res.data.self_total_rank) {
                this.isUserRankShow = true
                this.userRankShow = res.data.self_total_rank
                this.userRankShow.rank = 31
                for (let item of this.rankListShow) {
                  if (item.uid == this.userRankShow.uid || item.tuid == this.userRankShow.uid) {
                    this.userRankShow.rank = item.rank
                    break
                  }
                }
              } else {
                this.isUserRankShow = false
              }
            } else {
              this.$toast(res.errmsg)
            }
          })
        }
        setTimeout(() => {
          if (this.$refs.rankingArea && this.$refs.rankingArea.scrollTop > 0) {
            this.$refs.rankingArea.scrollTo({ top: 0, behavior: 'instant' })
          }
        })
      } else if (this.rankChosen == 2) {
        if (this.tagChosen == 1) {
          getPageData({ type: 'lovecrown_recharge_day_top_info', mark: date || this.selectDate[2] }).then((res) => {
            if (res.errno == 0) {
              this.selectDate[this.rankChosen] = date || this.selectDate[this.rankChosen]
              this.rankListShow = res.data.rank_list
              this.userRankShow = {
                rank: 31,
                uid: res.data.uid,
                code: res.data.code,
                is_pretty: res.data.is_pretty,
                my_username: res.data.my_username,
                my_profile_image: res.data.my_profile_image,
                my_recharge: res.data.my_recharge
              }
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
          getPageData({ type: 'lovecrown_recharge_tot_top_info' }).then((res) => {
            if (res.errno == 0) {
              this.rankListShow = res.data.rank_list
              this.userRankShow = {
                rank: 31,
                uid: res.data.uid,
                code: res.data.code,
                is_pretty: res.data.is_pretty,
                my_username: res.data.my_username,
                my_profile_image: res.data.my_profile_image,
                my_recharge: res.data.my_recharge
              }
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
      }
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
      this.selectChosen(this.rankChosen, this.tagChosen, index)
    }
  }
}
</script>
<style lang='scss' scoped>
.pageComp{
  .rankChosenBg{
    width: 572px;
    height: 84px;
    margin: -60px auto 0 auto;
    display: flex;
    position: relative;
    &.status1{
      background: url('@/pages/qiXi/assets/mk6_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/qiXi/assets/mk6_2.png') no-repeat left top/100% 100%;
    }
    :nth-child(n){
      width: 50%;
      height: 100%;
    }
  }
  .rankBox{
    width: 723px;
    min-height: 2095px; // 根据切图的高度来设置，一般切图会给最小高度进行拉伸，假如出现更小的高度，一般让ui单独切图，防止拉伸导致变形
    border-image-source: url('@/pages/qiXi/assets/mk6_21.png');
    border-image-slice: 1400 0 300 0 fill;
    border-image-width: 1400px 0px 300px 0px;
    .rewardsLine{
      width: 513px;
      height: 37px;
      background: url('@/pages/qiXi/assets/mk6_3.png') no-repeat left top/100% 100%;
      margin: 40px auto 0px;
    }
    .rewardsArea{
      width: 625px;
      height: 187px;
      background: url('@/pages/qiXi/assets/mk6_4.png') no-repeat left top/100% 100%;
      // border-image-source: url('@/pages/qiXi/assets/mk6_4.png');
      // border-image-slice: 100 0 80 0 fill;
      // border-image-width: 100px 0 80px 0;
      margin: 10px auto 00px;
      padding: 0px 20px 30px 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      .rewardItem{
        width: 140px;
        height: 120px;
        background: linear-gradient(180deg, #FFF5C3, #FFFFFF);
        border-radius: 12px;
        border: 4px solid #ABCFFF;
        margin: 20px 20px;
        position: relative;
        .rewardIcon{
          width: 140px;
          height: 120px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
        }
        .rewardText{
          width: 150px;
          height: 34px;
          background: #4F72D5;
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
          background: url('@/pages/qiXi/assets/mk6_10.png') no-repeat left top/100% 100%;
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
    }
    .rewardsDetail{
      width: 153px;
      height: 52px;
      background: url('@/pages/qiXi/assets/mk6_35.png') no-repeat left top/100% 100%;
      position: absolute;
      top: 180px;
      right: 10px;
    }
    .tagChosenBg{
      width: 526px;
      height: 58px;
      margin: 30px auto 20px auto;
      display: flex;
      &.status1{
        background: url('@/pages/qiXi/assets/mk6_5.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/qiXi/assets/mk6_6.png') no-repeat left top/100% 100%;
      }
      :nth-child(n){
        width: 50%;
        height: 100%;
      }
    }
    .dateArea{
      height: 240px;
      position: relative;
      .dateItem{
        width: 160px;
        height: 161px;
        background: url('@/pages/qiXi/assets/mk6_9.png') no-repeat left top/100% 100%;
        text-align: center;
        line-height: 140px;
        font-size: 22px;
        color: #C6CDFF;
        position: absolute;
        &.active{
          background: url('@/pages/qiXi/assets/mk6_8.png') no-repeat left top/100% 100%;
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
    .rankArea{
      height: 1400px;
      margin: 0 auto;
      overflow-x: hidden;
      overflow-y: scroll;
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
            background: url('@/pages/qiXi/assets/mk6_11.png') no-repeat left top/100% 100%;
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
            width: 380px;
            height: 337px;
            background: url('@/pages/qiXi/assets/mk6_12.png') no-repeat left top/100% 100%;
            left: 0px;
            top: 360px;
            .rankIcon{
              background: url('@/pages/qiXi/assets/mk6_13.png') no-repeat left top/100% 100%;
            }
          }
          &:nth-of-type(3) {
            width: 380px;
            height: 337px;
            background: url('@/pages/qiXi/assets/mk6_12.png') no-repeat left top/100% 100%;
            right: 0px;
            top: 360px;
            .rankIcon{
              background: url('@/pages/qiXi/assets/mk6_14.png') no-repeat left top/100% 100%;
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
            background: url('@/pages/qiXi/assets/mk6_15.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 240px;
            font-size: 18px;
            color: #FFFFFF;
            text-align: center;
            padding: 10px 0;
            p{
              font-size: 22px;
              color: #FFEF85;
            }
          }
        }
      }
      .remianArea{
        .reaminItem{
          width: 668px;
          height: 176px;
          background: url('@/pages/qiXi/assets/mk6_16.png') no-repeat left top/100% 100%;
          margin: 0 auto 10px auto;
          position: relative;
          .rankBorder{
            width: 68px;
            height: 68px;
            background: url('@/pages/qiXi/assets/mk6_18.png') no-repeat left top/100% 100%;
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
              background: url('@/pages/qiXi/assets/mk6_20.png') no-repeat left top/100% 100%;
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
      background: url('@/pages/qiXi/assets/mk6_17.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      position: relative;
      .rankBorder{
        width: 68px;
        height: 68px;
        background: url('@/pages/qiXi/assets/mk6_19.png') no-repeat left top/100% 100%;
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
        .userName{
          top: 95px;
        }
        .userCode{
          top: 120px;
        }
      }
      .userRight{
        position: absolute;
        right: 50%;
        transform: translateX(200%);
        top: 14px;
        .userName{
          top: 95px;
        }
        .userCode{
          top: 120px;
        }
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
          background: url('@/pages/qiXi/assets/mk6_20.png') no-repeat left top/100% 100%;
          margin: 0 auto;
        }
        p{
          font-size: 22px;
          color: #FFEF85;
          line-height: 40px;
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
            width: 266px;
            height: 482px;
            background: url('@/pages/qiXi/assets/mk6_26.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 100px;
            .tRIAvatar{
              width: 130px;
              height: 130px;
              top: -36px;
            }
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/pages/qiXi/assets/mk6_25.png') no-repeat left top/100% 100%;
              top: -100px;
            }
            .tRIName{
              top: 120px;
            }
            .tRICode{
              top: 160px;
            }
          }
          &:nth-of-type(2) {
            width: 266px;
            height: 482px;
            background: url('@/pages/qiXi/assets/mk6_28.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 0px;
            top: 250px;
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/pages/qiXi/assets/mk6_27.png') no-repeat left top/100% 100%;
              top: -110px;
            }
          }
          &:nth-of-type(3) {
            width: 266px;
            height: 482px;
            background: url('@/pages/qiXi/assets/mk6_30.png') no-repeat left top/100% 100%;
            position: absolute;
            right: 0px;
            top: 250px;
            .tRIBg{
              width: 408px;
              height: 212px;
              background: url('@/pages/qiXi/assets/mk6_29.png') no-repeat left top/100% 100%;
              top: -110px;
            }
          }
          .tRIAvatar{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -30px;
          }
          .tRIBg{
            pointer-events: none;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -20px;
          }
          .tRIName{
            max-width: 160px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            font-size: 24px;
            color: #FFFFFF;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 90px;
          }
          .tRICode{
            font-weight: 400;
            font-size: 22px;
            color: #7452D3;
            line-height: 30px;
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
          .tRITime{
            font-weight: 400;
            font-size: 22px;
            color: #fff;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 50px;
          }
        }
      }
      .totalRankItem{
        width: 664px;
        height: 143px;
        background: url('@/pages/qiXi/assets/mk6_31.png') no-repeat left top/100% 100%;
        margin: 0 auto 10px auto;
        position: relative;
        .totalRankItemIcon{
          width: 68px;
          height: 68px;
          font-weight: 500;
          font-size: 26px;
          color: #FFF2A9;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          background: url('@/pages/qiXi/assets/mk6_33.png') no-repeat left top/100% 100%;
        }
        .totalRankItemAvatar{
          width: 80px;
          height: 80px;
          border-radius: 50px;
          border: 3px solid #B3CEFF;
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
          top: 35px;
        }
        .totalRankItemCode{
          font-weight: 400;
          font-size: 22px;
          color: #FFEF85;
          line-height: 30px;
          position: absolute;
          left: 200px;
          bottom: 35px;
          img{
            width: 37px*.8;
            height: 31px*0.8;
            vertical-align: middle;
            margin: 0 5px 0 0;
          }
        }
        .totalRankItemTime{
          p{
            font-weight: 400;
            font-size: 22px;
            color: #8E45E9;
          }
          font-size: 24px;
          color: #FFFFFF;
          line-height: 36px;
          text-align: right;
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .myTotalRankArea{
      width: 715px;
      height: 147px;
      background: url('@/pages/qiXi/assets/mk6_32.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      position: relative;
      .totalRankIcon{
        width: 68px;
        height: 67px;
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
        background: url('@/pages/qiXi/assets/mk6_34.png') no-repeat left top/100% 100%;
      }
      .totalRankAvatar{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        border: 3px solid #C8A6FF;
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
        bottom: 35px;
        img{
          width: 37px*.8;
          height: 31px*0.8;
          vertical-align: middle;
          margin: 0 5px 0 0;
        }
      }
      .totalRankTime{
        p{
          font-weight: 400;
          font-size: 22px;
          color: #8E45E9;
        }
        font-size: 24px;
        color: #FFFFFF;
        line-height: 36px;
        text-align: right;
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
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
