<template>
  <OutBox class="campCompo">
    <div :class="['viewShowDiv',`status${viewShowType}`]">
      <div class="viewShowOne" @click="viewExBtnCk(1)"></div>
      <div class="viewShowTwo" @click="viewExBtnCk(2)"></div>
    </div>
    <div class="rewardsTip"></div>
    <div class="rewardsShowArea">
      <div class="rewardItem" v-for="(item) in rewardsList[viewShowType]" :key="item.id" @click="previewImgCk(item)">
        <div :class="['rewardIcon', item.type=='title'?'titleSp':null]">
          <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
        </div>
        <div class="rewardText">{{item.text}}</div>
        <div class="rewardPreview" v-if="item.previewImg"></div>
        <div class="rewardMark" v-if="item.mark">{{ item.mark }}<img :src="IconPath('zs_27_20.png')" /></div>
      </div>
      <div class="rewardsDetail" @click="rewardsDetailCk"></div>
    </div>
    <template v-if="viewShowType == 1">
      <div class="viewShowTypeTopBg">
        <div :class="['myGroup', `group${group}`]"></div>
      </div>
      <div class="processBg">
        <div class="processNow" :style="`width: ${processNowPer}%;`">
          <div class="processMark"></div>
        </div>
        <div class="womanScore">{{formatNumber(daily.woman_score)}}</div>
        <div class="manScore">{{formatNumber(daily.man_score)}}</div>
      </div>
      <div class="dailyRankArea">
        <div class="womanRank">
          <div class="dailyTopArea">
            <div class="dailyTop3Item" v-for="(item,index) in daily.woman_rank.slice(0,3)" :key="`${item.uid}+${index}`">
              <img class="topAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <div class="topBg"></div>
            </div>
          </div>
          <div class="dailyRemainRankArea">
            <div class="dailyRemainItem" v-for="(item,index) in daily.woman_rank" :key="`${item.uid}+${index}`">
              <div :class="['rankIcon',`gender2`]">{{item.rank}}</div>
              <img :class="['rankAvatar','gender2']" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <div :class="['rankName','gender2']">{{item.username}}</div>
              <div class="rankCode">
                <!-- <img v-if="item.is_pretty" :src="IconPath('mk6_25.png')" /> -->
                <span>{{item.time}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="manRank">
          <div class="dailyTopArea">
            <div class="dailyTop3Item" v-for="(item,index) in daily.man_rank.slice(0,3)" :key="`${item.uid}+${index}`">
              <img class="topAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <div class="topBg"></div>
            </div>
          </div>
          <div class="dailyRemainRankArea">
            <div class="dailyRemainItem" v-for="(item,index) in daily.man_rank" :key="`${item.uid}+${index}`">
              <div :class="['rankIcon',`gender1`]">{{item.rank}}</div>
              <img :class="['rankAvatar','gender1']" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
              <div :class="['rankName','gender1']">{{item.username}}</div>
              <div class="rankCode">
                <!-- <img v-if="item.is_pretty" :src="IconPath('mk6_25.png')" /> -->
                <span>{{item.time}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="myDailyRankArea">
        <div :class="['myDailyRankIcon']">{{myDailyRank==51?"未上榜":myDailyRank}}</div>
        <img :class="['myDailyRankAvatar']" :src="IconPath(my_profile_image||avatarDefault)" @click="toUserMain(uid)" />
        <div :class="['myDailyRankName']">{{my_username}}</div>
        <div class="myDailyRankCode">
          <!-- <img v-if="item.is_pretty" :src="IconPath('mk6_25.png')" /> -->
          <span>{{daily.my_score}}</span>
        </div>
        <div class="myDailyRankGroupTitle">
          <span>所在分组</span>
          <p>{{group==1?'男生队':'女生队'}}</p>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>所有玩家按照账号性别分为女生队和男生队，统计</li>
          <li>每位玩家在【摩天大楼】玩法中<i>每日累计建造层数</i>，</li>
          <li>榜单每日重置，分服统计</li>
          <li><span></span><i>奖励分为排名奖励和获胜阵营奖励</i>，详细榜单规则</li>
          <li>和奖励<i>可查看【奖励详情】</i></li>
        </ul>
      </div>
    </template>
    <template v-else-if="viewShowType == 2">
      <div class="totalRankArea">
        <div class="totalRankTop3">
          <div class="totalRankTop3Item" v-for="(item,index) of tot.tot_rank.slice(0,3)" :key="`${item.uid}+${index}`">
            <img class="tRIAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
            <div class="tRIBg"></div>
            <div class="tRIName">{{item.username}}</div>
            <div class="tRICode">
              <img v-if="item.is_pretty" :src="IconPath('mk6_25.png')" />
              <span>ID:{{item.code}}</span>
            </div>
            <div class="tRITime">{{item.time}}层</div>
          </div>
        </div>
        <div class="totalRankItem" v-for="(item,index) of tot.tot_rank.slice(3)" :key="`${item.uid}+${index}`">
          <div class="totalRankItemIcon">{{item.rank}}</div>
          <img class="totalRankItemAvatar" :src="IconPath(item.profile_image||avatarDefault)" @click="toUserMain(item.uid)" />
          <div class="totalRankItemName">{{item.username}}</div>
          <div class="totalRankItemCode">
            <img v-if="item.is_pretty" :src="IconPath('mk6_25.png')" />
            <span>ID:{{item.code}}</span>
          </div>
          <div class="totalRankItemTime">{{item.time}}层</div>
        </div>
      </div>
      <div class="myTotalRankArea">
        <div class="totalRankIcon">{{myTotalRank==31?"未上榜":myTotalRank}}</div>
        <img class="totalRankAvatar" :src="IconPath(my_profile_image||avatarDefault)" @click="toUserMain(uid)" />
        <div class="totalRankName">{{my_username}}</div>
        <div class="totalRankCode">
          <img v-if="is_pretty" :src="IconPath('mk6_25.png')" />
          <span>ID:{{code}}</span>
        </div>
        <div class="totalRankTime">{{tot.tot_score}}层</div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动总榜统计活动期间本服玩家在【摩天大楼】玩</li>
          <li>法中<i>累计建造总层数</i>，分服统计</li>
          <li><span></span>详细榜单规则和奖励<i>可查看【奖励详情】</i></li>
        </ul>
      </div>
    </template>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RulesPopup v-if="isShowRulesPopup" :viewShowType="viewShowType" @clickClose="clickClose"></RulesPopup>
  </OutBox>
</template>

<script>
import { getPageData } from '@/pages/618/api/index.js'
import { toUserMain } from '@/pages/618/utils/toApp'
import PreviewPopup from './components/previewPopup.vue'
import RulesPopup from './components/rulesPopup.vue'

export default {
  name: 'campRank',
  components: {
    PreviewPopup,
    RulesPopup
  },
  data() {
    return {
      viewShowType: 1, // 页面展示 1:阵营日榜 2:个人总榜
      rewardsList: {
        1: [
          { id: 11, type: 'title', icon: 'mp_tjlz', text: '铭牌', previewImg: 'mp_tjlz', previewTipe1: '天际领主·铭牌称号' },
          { id: 12, type: 'mic', icon: 'ts_nhjm.svga', text: '头饰', previewImg: 'ts_nhjm.svga', previewTipe1: '霓虹旧梦·头饰' },
          { id: 13, type: 'pst_privilege', icon: 'fhym_120_120.png', text: '礼物赠送权', previewImg: 'gift_fhym.svga', previewTipe1: '繁花一梦·礼物赠送权', mark: '1888' }
        ],
        2: [
          { id: 21, type: 'title', icon: 'mp_tjlz', text: '铭牌', previewImg: 'mp_tjlz', previewTipe1: '天际领主·铭牌称号' },
          { id: 22, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图' }
        ]
      },
      my_username: '虚位以待', // 用户昵称
      my_profile_image: '', // 用户头像
      is_pretty: false, // 是否是靓号
      code: 0, // 用户显示ID
      uid: 0, // 用户实际ID
      group: 1, // 所在分组: 1-男，2-女
      myDailyRank: 51, // 用户日榜排名
      myTotalRank: 31, // 用户总榜排名
      daily: { // 阵营日榜
        woman_score: 0, // 女队数量
        man_score: 0, // 男队数量
        my_score: 0, // 我的日榜数量
        woman_rank: [
          { uid: 1, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 1 },
          { uid: 2, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 2 },
          { uid: 3, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 3 },
          { uid: 4, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 4 },
          { uid: 5, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 5 },
          { uid: 6, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 6 },
          { uid: 7, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 7 },
          { uid: 8, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 8 },
          { uid: 9, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 9 },
          { uid: 10, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 10 },
          { uid: 11, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 11 },
          { uid: 12, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 12 }
        ], // 女队榜单
        man_rank: [
          { uid: 1, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 1 },
          { uid: 2, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 2 },
          { uid: 3, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 3 },
          { uid: 4, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 4 },
          { uid: 5, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 5 },
          { uid: 6, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 6 },
          { uid: 7, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 7 },
          { uid: 8, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 8 },
          { uid: 9, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 9 },
          { uid: 10, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 10 },
          { uid: 11, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 11 },
          { uid: 12, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 12 }
        ] // 男队榜单
      },
      tot: {
        tot_score: 0, // 我的个人总榜数量
        tot_rank: [
          { uid: 1, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 1 },
          { uid: 2, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 2 },
          { uid: 3, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 3 },
          { uid: 4, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 4 },
          { uid: 5, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 5 },
          { uid: 6, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 6 },
          { uid: 7, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 7 },
          { uid: 8, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 8 },
          { uid: 9, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 9 },
          { uid: 10, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 10 },
          { uid: 11, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 11 },
          { uid: 12, code: 0, is_pretty: false, profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png?x-oss-process=image/resize,w_100,m_fill', username: '虚位以待', time: 0, rank: 12 }
        ] // 个人总榜榜单
      }, // 个人总榜
      avatarDefault: 'mk6_30.png', // 默认头像
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowRulesPopup: false // 规则弹窗
    }
  },
  computed: {
    processNowPer() { // 男女生对拼进度条
      let result = 25 + this.daily.woman_score / (this.daily.woman_score + this.daily.man_score) * 100 * 0.5
      return result || 50
    }
  },
  created() {
    this.getPageData()
  },
  methods: {
    toUserMain,
    /**
     * 获取页面信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.my_username = res.data.my_username
          this.my_profile_image = res.data.my_profile_image
          this.is_pretty = res.data.is_pretty
          this.code = res.data.code
          this.uid = res.data.uid
          this.group = res.data.group
          this.daily = res.data.daily
          if (this.group == 1) {
            for (let item of this.daily.man_rank) {
              if (this.uid == item.uid) {
                // console.log(item)
                this.myDailyRank = item.rank
              }
            }
          } else if (this.group == 2) {
            for (let item of this.daily.woman_rank) {
              if (this.uid == item.uid) {
                this.myDailyRank = item.rank
              }
            }
          }
          this.tot = res.data.tot
          for (let item of this.tot.tot_rank) {
            if (this.uid == item.uid) {
              this.myTotalRank = item.rank
            }
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 切换页面
     */
    viewExBtnCk(type) {
      if (this.viewShowType != type) {
        this.viewShowType = type
      }
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      console.log(item)
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
     * 奖励详情弹窗
     */
    rewardsDetailCk() {
      console.log('奖励详情')
      this.isShowRulesPopup = true
    },
    /**
     * 超过万保留两位小数
     */
    formatNumber(num) {
      if (Number(num) >= 10000) {
        return (Math.floor(Number(num) / 100) / 100).toFixed(2) + '万'
      }
      return Number(num)
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowPreviewPopup = false
      this.isShowRulesPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.campCompo{
  padding-top: 100px;
  .viewShowDiv{
    width: 509px;
    height: 79px;
    margin: 0 auto;
    display: flex;
    &.status1{
      background: url('@/pages/618/assets/mk6_1.png') no-repeat left top/100% 100%;
    }
    &.status2{
      background: url('@/pages/618/assets/mk6_2.png') no-repeat left top/100% 100%;
    }
    .viewShowOne{
      width: 50%;
      height: 100%;
    }
    .viewShowTwo{
      width: 50%;
      height: 100%;
    }
  }
  .rewardsTip{
    width: 596px;
    height: 32px;
    background: url('@/pages/618/assets/mk6_3.png') no-repeat left top/100% 100%;
    margin: 20px auto 0 auto;
  }
  .rewardsShowArea{
    width: 699px;
    height: 241px;
    background: url('@/pages/618/assets/mk6_5.png') no-repeat left top/100% 100%;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: center;
    position: relative;
    .rewardItem{
      width: 148px;
      height: 128px;
      background: #FFFFFF;
      border-radius: 12px;
      border: 4px solid #FBE590;
      margin: 40px 10px;
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
        background: #8F572D;
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
        background: url('@/pages/618/assets/mk6_7.png') no-repeat left top/100% 100%;
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
      background: url('@/pages/618/assets/mk6_4.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
    }
  }
  .viewShowTypeTopBg{
    width: 679px;
    height: 276px;
    background: url('@/pages/618/assets/mk6_8.png') no-repeat left top/100% 100%;
    margin: 0 auto;
    position: relative;
    .myGroup{
      width: 118px;
      height: 58px;
      position: absolute;
      bottom: 10px;
      &.group1{
        background: url('@/pages/618/assets/mk6_33.png') no-repeat left top/100% 100%;
        right: -20px;
      }
      &.group2{
        background: url('@/pages/618/assets/mk6_32.png') no-repeat left top/100% 100%;
        left: -20px;
      }
    }
  }
  .processBg{
    width: 662px;
    height: 45px;
    background: url('@/pages/618/assets/mk6_11.png') no-repeat left top/100% 100%;
    margin: 0 auto 0px auto;
    position: relative;
    .processNow{
      width: 662px;
      height: 45px;
      background: url('@/pages/618/assets/mk6_10.png') no-repeat left top/cover;
      position: absolute;
      left: 0;
      top: 0;
      .processMark{
        width: 39px;
        height: 97px;
        background: url('@/pages/618/assets/mk6_9.png') no-repeat left top/100% 100%;
        position: absolute;
        right: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .womanScore{
      font-weight: bold;
      font-size: 26px;
      color: #FFFFFF;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    .manScore{
      font-weight: bold;
      font-size: 26px;
      color: #FFFFFF;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .dailyRankArea{
    display: flex;
    justify-content: space-between;
    padding: 90px 30px 0 30px;
    max-height: 700px;
    overflow-x: hidden;
    overflow-y: scroll;
    .womanRank{
      width: 48%;
      height: fit-content;
      background: #FDD3D3;
      border-radius: 20px;
      position: relative;
    }
    .manRank{
      width: 48%;
      height: fit-content;
      background: #DAE9F6;
      border-radius: 20px;
      position: relative;
    }
    .dailyTopArea{
      display: flex;
      justify-content: center;
      margin: -50px auto 0 auto;
      .dailyTop3Item{
        margin: 0 5px;
        position: relative;
        &:nth-of-type(1) {
          .topBg{
            background: url('@/pages/618/assets/mk6_12.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-of-type(2) {
          .topBg{
            background: url('@/pages/618/assets/mk6_13.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-of-type(3) {
          .topBg{
            background: url('@/pages/618/assets/mk6_14.png') no-repeat left top/100% 100%;
          }
        }
        .topAvatar{
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
        .topBg{
          width: 91px;
          height: 115px;
          pointer-events: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }
      }
    }
    .dailyRemainRankArea{
      .dailyRemainItem{
        width: 100%;
        height: 80px;
        margin: 10px auto 0 auto;
        position: relative;
        .rankIcon{
          width: 40px;
          height: 39px;
          font-weight: 500;
          font-size: 22px;
          color: #FFF2A9;
          text-align: center;
          line-height: 40px;
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          &.gender1{
            background: url('@/pages/618/assets/mk6_17.png') no-repeat left top/100% 100%;
          }
          &.gender2{
            background: url('@/pages/618/assets/mk6_16.png') no-repeat left top/100% 100%;
          }
        }
        .rankAvatar{
          width: 70px;
          height: 70px;
          border-radius: 50px;
          position: absolute;
          left: 60px;
          top: 50%;
          transform: translateY(-50%);
          &.gender1{
            border: 3px solid #6094F3;
          }
          &.gender2{
            border: 3px solid #F56F8E;
          }
        }
        .rankName{
          width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          font-size: 24px;
          position: absolute;
          left: 140px;
          top: 10px;
          &.gender1{
            color: #4658D9;
          }
          &.gender2{
            color: #E9355F;
          }
        }
        .rankCode{
          font-weight: 400;
          font-size: 20px;
          color: #6D6D6D;
          line-height: 30px;
          position: absolute;
          left: 140px;
          bottom: 10px;
          img{
            width: 52px*0.6;
            height: 43px*0.6;
            margin-right: 4px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .myDailyRankArea{
    width: 726px;
    height: 128px;
    background: url('@/pages/618/assets/mk6_15.png') no-repeat left top/100% 100%;
    margin: 0 auto;
    position: relative;
    .myDailyRankIcon{
      width: 62px;
      height: 61px;
      font-weight: 500;
      font-size: 22px;
      color: #FFF2A9;
      text-align: center;
      line-height: 60px;
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: url('@/pages/618/assets/mk6_18.png') no-repeat left top/100% 100%;
    }
    .myDailyRankAvatar{
      width: 80px;
      height: 80px;
      border-radius: 50px;
      border: 3px solid #EFC75A;
      position: absolute;
      left: 100px;
      top: 50%;
      transform: translateY(-50%);
    }
    .myDailyRankName{
      width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
      font-size: 26px;
      position: absolute;
      left: 200px;
      top: 30px;
    }
    .myDailyRankCode{
      font-weight: 400;
      font-size: 22px;
      color: #FFEF85;
      line-height: 30px;
      position: absolute;
      left: 200px;
      bottom: 30px;
    }
    .myDailyRankGroupTitle{
      font-weight: 400;
      font-size: 22px;
      text-align: right;
      color: #FFEF85;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
      p{
        font-weight: 400;
        font-size: 24px;
        color: #FFFFFF;
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
          background: url('@/pages/618/assets/mk6_20.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 50px;
          .tRIBg{
            width: 401px;
            height: 237px;
            background: url('@/pages/618/assets/mk6_19.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-of-type(2) {
          width: 199px;
          height: 355px;
          background: url('@/pages/618/assets/mk6_22.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 30px;
          top: 200px;
          .tRIBg{
            width: 214px;
            height: 211px;
            background: url('@/pages/618/assets/mk6_21.png') no-repeat left top/100% 100%;
            top: -10px;
          }
        }
        &:nth-of-type(3) {
          width: 199px;
          height: 355px;
          background: url('@/pages/618/assets/mk6_24.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 30px;
          top: 200px;
          .tRIBg{
            width: 214px;
            height: 211px;
            background: url('@/pages/618/assets/mk6_23.png') no-repeat left top/100% 100%;
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
          max-width: 200px;
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
          font-weight: 400;
          font-size: 22px;
          color: #FFEF85;
          line-height: 30px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 80px;
          img{
            width: 52px*0.6;
            height: 43px*0.6;
            margin-right: 4px;
            vertical-align: middle;
          }
        }
        .tRITime{
          font-weight: 400;
          font-size: 22px;
          color: #FFEF85;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 50px;
        }
      }
    }
    .totalRankItem{
      width: 668px;
      height: 137px;
      background: url('@/pages/618/assets/mk6_26.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      position: relative;
      .totalRankItemIcon{
        width: 62px;
        height: 62px;
        font-weight: 500;
        font-size: 22px;
        color: #FFF2A9;
        text-align: center;
        line-height: 60px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: url('@/pages/618/assets/mk6_27.png') no-repeat left top/100% 100%;
      }
      .totalRankItemAvatar{
        width: 80px;
        height: 80px;
        border-radius: 50px;
        border: 3px solid #EFC75A;
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
        top: 30px;
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
      }
    }
  }
  .myTotalRankArea{
    width: 739px;
    height: 136px;
    background: url('@/pages/618/assets/mk6_28.png') no-repeat left top/100% 100%;
    margin: 0 auto;
    position: relative;
    .totalRankIcon{
      width: 62px;
      height: 61px;
      font-weight: 500;
      font-size: 22px;
      color: #FFF2A9;
      text-align: center;
      line-height: 60px;
      position: absolute;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: url('@/pages/618/assets/mk6_29.png') no-repeat left top/100% 100%;
    }
    .totalRankAvatar{
      width: 80px;
      height: 80px;
      border-radius: 50px;
      border: 3px solid #EFC75A;
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
      top: 30px;
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
        width: 52px*0.6;
        height: 43px*0.6;
        margin-right: 4px;
        vertical-align: middle;
      }
    }
    .totalRankTime{
      font-size: 24px;
      color: #FFFFFF;
      text-align: right;
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
