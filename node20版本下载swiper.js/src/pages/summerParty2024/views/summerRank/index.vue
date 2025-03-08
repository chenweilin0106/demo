<template>
  <div class='pageComp' @click="isShowDateList=false">
    <OutBox class="flushMoneyBox" :title="'title_8.png'">
      <div class="fm_ruleBtn" @click="ruleBtnCk"></div>
      <div class="fm_tip1">小时榜榜首将成为下个时段的财神</div>
      <div class="fm_reward1">
        <PublicImg :imgName="'ts_hlpd.svga'" :imgType="'mic'"></PublicImg>
      </div>
      <div class="fm_hourTop" @click="toUserMain(preHour_user.uid||0)">
        <PublicImg v-if="preHour_user&&preHour_user.uid" :imgName="'ts_hyzx.svga'||preHour_user.icon" :imgType="'mic'" :userAvatar="preHour_user.profile_image"></PublicImg>
        <div class="fm_hourTopBg" v-else>
          <PublicImg :imgName="'ts_hyzx.svga'" :imgType="'mic'" :userAvatar="' '"></PublicImg>
        </div>
      </div>
      <div class="fm_hourTopTag"></div>
      <div class="fm_hourTopName">{{preHour_user.username||'虚位以待'}}</div>
      <div class="fm_hourMax">限量前{{hour_award_max}}名可获得</div>
      <div :class="['fm_btn',`status${hour_award_btn}`]" @click="fmBtnCk"></div>
    </OutBox>
    <OutBox class="rankBox" :hasCostume="true">
      <div :class="['rb_rankTag', rankTag==1?'tag1':'tag2']">
        <div class="rb_rankTagItem" @click="rankTagCk(1)"></div>
        <div class="rb_rankTagItem" @click="rankTagCk(2,1)"></div>
      </div>
      <div :class="['rb_toptip',`status${rankTag}`]"></div>
      <div class="rb_rewardsShow">
        <div class="rb_rewardsShowItem" v-for="(item) in rewardsShowList[rankTag]" :key="item.id">
          <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          <div class="rb_rewardsShowItemText">{{item.text}}</div>
          <div class="rb_rewardsShowItemMark" v-if="item.mark">{{item.mark}}</div>
          <div class="rb_rewardsShowItemPrice" v-if="item.price_mark">{{item.price_mark}}<img :src="IconPath('zs_27_20.png')"/></div>
        </div>
        <div class="rb_rewardsShowRule" v-if="rankTag==2" @click="rewardsShowRuleCk"></div>
      </div>
      <div class="rb_dateDiv" v-if="rankTag==2" @click.stop="isShowDateList=!isShowDateList">
        <div v-for="(item, index) in day_list" :key="index + item">
          <span v-if="select_date==index">{{item}}</span>
        </div>
        <div :class="['rb_dateListsIcon', `status${isShowDateList}`]"></div>
      </div>
      <div class="rb_dateListDiv" v-if="isShowDateList">
        <div v-for="(item, index) in day_list" :key="index + item">
          <div class="rb_dateListItem" v-if="select_date!=index" @click.stop="dateCk(index, item)">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
      <div class="rb_noRankShow" v-if="!hour_rank_st&&rankTag==1">本榜单将在<i>19:00-23:00</i>开启</div>
      <div class="rb_rankShow" v-else>
        <div class="rb_hour_timeLeft" v-if="rankTag==1">
          <div>本小时榜单</div>
          <div>倒计时&ensp;<i>{{timeLefting}}</i></div>
        </div>
        <div :class="['rb_presentRankTag', presentRankTag==1?'tag1':'tag2']" v-else>
          <div class="rb_presentRankTagItem" @click="rankTagCk(2, 1)"></div>
          <div class="rb_presentRankTagItem" @click="rankTagCk(2, 2)"></div>
        </div>
        <div class="rb_hour_top1" v-if="rankTag==1">
          <div class="rb_rankTHead">
            <img :src="IconPath(rankShow[0].profile_image)" @click="toUserMain(rankShow[0].uid)" />
          </div>
          <div class="rb_rankTName">{{rankShow[0].username}}</div>
          <div class="rb_rankTCode">{{rankShow[0].time}}</div>
          <div class="rb_rankTValue">赠送总价值</div>
        </div>
        <div class="rb_hour_top3" v-else>
          <div class="rb_hour_top3Item" v-for="(item) in rankShow.slice(0,3)" :key="item.uid">
            <div class="rb_rankTHead">
              <img :src="IconPath(item.profile_image)" @click="toUserMain(item.uid)" />
            </div>
            <div class="rb_rankTName">{{item.username}}</div>
            <div class="rb_rankTCode">{{item.time}}</div>
            <div class="rb_rankTValue">{{presentRankTag==1?'赠送':'获赠'}}总价值</div>
          </div>
        </div>
        <div class="rb_rankRe">
          <div class="rb_rankReTitle">
            <div>排名</div>
            <div>昵称</div>
            <div>总价值</div>
          </div>
          <div class="rb_rankReRanking">
            <div class="rb_rankReRankingItem" v-for="(item) in rankTag==1?rankShow.slice(1):rankShow.slice(3)" :key="item.uid">
              <div>{{item.rank}}</div>
              <div>
                <img :src="IconPath(item.profile_image)" @click="toUserMain(item.uid)" />
                <span>{{item.username}}</span>
              </div>
              <div>{{item.time}}</div>
            </div>
          </div>
          <div class="rb_rankMy">
            <div>{{myRank}}</div>
              <div>
              <img :src="IconPath(my_profile_image)" @click="toUserMain(uid)" />
              <span>{{my_username}}</span>
            </div>
            <div>{{myTime}}</div>
          </div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动分为小时榜和日榜，均为分服统计</li>
          <li><span></span>小时榜统计每日<i>19:00-23:00</i>每小时内赠送钻石礼</li>
          <li>物价值最高的玩家。结算后的榜一玩家将成为下个</li>
          <li>小时的财神</li>
          <li><span></span>日榜为单日赠送/获赠钻石礼物排行榜，前10名可</li>
          <li>获得对应奖励，每个ID只能获得一个榜单的排名奖</li>
          <li>励，按最大名次派发</li>
          <li><span></span>连续5天上榜前3名可获得额外激活奖励</li>
          <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和双倍</li>
          <li>基础魅力值，魅力值上限提高50%</li>
        </ul>
      </div>
    </OutBox>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <RewardsRulesPopup v-if="isShowRewardsRulesPopup" @clickClose="clickClose"></RewardsRulesPopup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/summerParty2024/api'
import { toUserMain } from '@/pages/summerParty2024/utils/toApp'
import RulesPopup from './components/rulesPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'
import RewardsRulesPopup from './components/rewardsRulesPopup.vue'

export default {
  name: 'summerRank',
  components: {
    RulesPopup,
    ReceiveAwardsPopup,
    RewardsRulesPopup
  },
    data() {
      return {
        preHour_user: {
          uid: '111',
          username: '222',
          profile_image: 'http://cdn-image.dandan818.com/app/head/head_block_1.png',
          icon: 'ts_hthx.svga'
        }, // 小时榜
        hour_award_max: 800, // 沾财气奖励最多可领取人数
        hour_award_btn: 1, // 沾财气按钮状态：1-可以领取，2-已领取，3-已领完
        uid: '20011',
        my_profile_image: 'http://cdn-image.dandan818.com/app/head/head_block_1.png',
        my_username: '20013',
        myRank: '10+',
        myTime: '--',
        my_hour: 0,
        my_send_present: 0,
        my_present: 0,
        rankTag: 1, // 榜单 1:小时榜 2:日榜
        rewardsShowList: {
          1: [
            { id: 11, type: 'mic', icon: 'ts_hyzx.svga', text: '头饰+1小时' },
            { id: 12, type: 'tool', icon: 'yb_120_120.png', text: '元宝+20万' },
            { id: 13, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图+1' }
          ],
          2: [
            { id: 21, type: 'mic', icon: 'ts_xrwz.svga', text: '头饰', mark: '激活奖励' },
            { id: 22, type: 'title', icon: 'mp_chzz', text: '铭牌' },
            { id: 23, type: 'pst_privilege', icon: 'qlyx_120_120.png', text: '礼物赠送权', price_mark: '888' },
            { id: 24, type: 'tool', icon: 'yb_120_120.png', text: '元宝' }
          ]
        }, // 榜单奖励展示
        hour_rank_st: true, // 小时榜是否开启
        rankShow: [], // 榜单展示
        hour_rank: [
          {
            rank: 1,
            uid: '0',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 2,
            uid: '1',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 3,
            uid: '2',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 4,
            uid: '3',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 5,
            uid: '4',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 6,
            uid: '5',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 7,
            uid: '6',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 8,
            uid: '7',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 9,
            uid: '8',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 10,
            uid: '9',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          }
        ], // 小时榜单
        present_top: [
          {
            rank: 1,
            uid: '0',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 2,
            uid: '1',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 3,
            uid: '2',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 4,
            uid: '3',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 5,
            uid: '4',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 6,
            uid: '5',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 7,
            uid: '6',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 8,
            uid: '7',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 9,
            uid: '8',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 10,
            uid: '9',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          }
        ], // 获赠榜
        send_present_top: [
          {
            rank: 1,
            uid: '0',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 2,
            uid: '1',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 3,
            uid: '2',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 4,
            uid: '3',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 5,
            uid: '4',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 6,
            uid: '5',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 7,
            uid: '6',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 8,
            uid: '7',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 9,
            uid: '8',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          },
          {
            rank: 10,
            uid: '9',
            profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            username: '虚位以待',
            code: '321316',
            time: '--'
          }
        ], // 赠送榜
        day_list: {
          20240717: '07月17日',
          20240718: '07月18日',
          20240719: '07月19日',
          20240720: '07月20日',
          20240721: '07月21日'
        }, // 日期列表
        select_date: 20240717, // 激活的日期
        isShowDateList: false,
        presentRankTag: 1, // 1:赠送榜 2:获赠榜
        count_down: 0, // 小时榜结算倒计时，-1则表示非榜单时间。单位秒
        timeDown: undefined,
        timeLefting: undefined,

        isShowRulesPopup: false, // 规则说明弹窗
        isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
        configReceiveAwardsPopup: [],
        isShowRewardsRulesPopup: false // 奖励详情规则弹窗
      }
    },
  computed: {},
  watch: {},
  created() {
    this.getHomePage()
    // this.startCountdown(1000)
    // this.rankTagCk(1)
  },
  mounted() {},
  methods: {
    toUserMain,
    /**
     * 获取首页
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.preHour_user = res.data.preHour_user
          this.hour_award_max = res.data.hour_award_max
          this.hour_award_btn = res.data.hour_award_btn
          this.uid = res.data.uid
          this.my_profile_image = res.data.my_profile_image
          this.my_username = res.data.my_username
          this.my_hour = res.data.my_hour
          this.day_list = res.data.day_list
          this.select_date = res.data.select_date
          this.my_send_present = res.data.my_send_present
          this.my_present = res.data.my_present
          this.hour_rank_st = res.data.hour_rank_st
          this.hour_rank = res.data.hour_rank
          this.present_top = res.data.present_top
          this.send_present_top = res.data.send_present_top
          setTimeout(() => {
            this.rankTagCk(this.rankTag, this.presentRankTag)
          })
          this.count_down = res.data.count_down
          if (this.count_down > 0) {
            this.startCountdown(this.count_down)
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 倒计时(传入单位:秒)
     */
    startCountdown(seconds) {
      // 将传入的秒数转换为分钟和秒数
      let hours = Math.floor(seconds / 60 / 60)
      let minutes = Math.floor((seconds - hours * 60 * 60) / 60)
      let remainingSeconds = seconds % 60
      // 自动补0
      const leadingDigit = (num, len = 2, sep = '0') => `${Array(len + 1).join(sep)}${num}`.slice(-len)
      // 更新倒计时元素的内容
      if (hours > 0) {
        this.timeLefting = leadingDigit(hours) + ':' + leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
      } else {
        this.timeLefting = leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
      }
      if (seconds > 0) {
        // 每秒调用自身，直到倒计时完成或者手动停止
        clearTimeout(this.timeDown)
        this.timeDown = setTimeout(this.startCountdown, 1000, --seconds)
      } else {
        // 倒计时完成后清空倒计时元素的内容
        this.timeLefting = '00:00'
        console.log('timeTaskEnd')
        clearTimeout(this.timeDown)
        setTimeout(() => {
          this.getHomePage()
        })
      }
      // console.log(this.timeLefting)
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowRulesPopup = false
      this.isShowReceiveAwardsPopup = false
      this.isShowRewardsRulesPopup = false
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceiveAwardsPopup(msg) {
      console.log('获奖弹窗')
      this.clickClose()
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.isShowReceiveAwardsPopup = true
        this.getHomePage()
      })
    },
    /**
     * 沾财气规则说明弹窗
     */
    ruleBtnCk() {
      console.log('沾财气规则说明')
      this.isShowRulesPopup = true
    },
    /**
     * 沾财气按钮点击
     */
    fmBtnCk() {
      console.log(this.hour_award_btn)
      if (this.hour_award_btn == 1) {
        getPageData({ type: 'present_top_oq_award' }).then((res) => {
          if (res.errno == 0) {
            // console.log(res)
            let msg = []
            msg.push(res.data.award)
            this.openReceiveAwardsPopup(msg)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 切换小时榜、日榜
     */
    rankTagCk(type, t) {
      this.rankTag = type
      this.myRank = '10+'
      if (this.rankTag == 1) {
        this.rankShow = this.hour_rank
        this.myTime = this.my_hour
        for (let item of this.rankShow) {
          if (this.uid == item.uid) {
            this.myRank = item.rank
          }
        }
      } else {
        this.presentRankTag = t
        if (t == 1) {
          this.rankShow = this.send_present_top
          this.myTime = this.my_send_present
          for (let item of this.send_present_top) {
            if (this.uid == item.uid) {
              this.myRank = item.rank
            }
          }
        } else {
          this.rankShow = this.present_top
          this.myTime = this.my_present
          for (let item of this.present_top) {
            if (this.uid == item.uid) {
              this.myRank = item.rank
            }
          }
        }
      }
    },
    /**
     * 奖励详情
     */
    rewardsShowRuleCk() {
      console.log('奖励详情')
      this.isShowRewardsRulesPopup = true
    },
    /**
     * 日期点击
     */
    dateCk(index, item) {
      // this.select_date = index
      // console.log(item)
      getPageData({ type: 'present_top_daily_rank', mark: index }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.my_present = res.data.my_present
          this.my_send_present = res.data.my_send_present
          this.present_top = res.data.present_top
          this.send_present_top = res.data.send_present_top
          this.select_date = res.data.select_date
          this.day_list = res.data.day_list
          this.isShowDateList = false
          setTimeout(() => {
            this.rankTagCk(this.rankTag, this.presentRankTag)
          })
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.pageComp{
  .flushMoneyBox{
    padding-top: 70px;
    width: 726px;
    height: 856px;
    background: url('@/pages/summerParty2024/assets/mk5_4.png') no-repeat left top/100% 100%;
    border-image-source: none;
    .fm_ruleBtn{
      width: 56px;
      height: 56px;
      background: url('@/pages/summerParty2024/assets/mk2_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 30px;
      top: 34px;
    }
    .fm_tip1{
      font-weight: 500;
      font-size: 28px;
      color: #1366E3;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 80px;
    }
    .fm_reward1{
      width: 100px;
      height: 100px;
      position: absolute;
      left: 135px;
      top: 180px;
    }
    .fm_hourTop{
      width: 190px;
      height: 190px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 320px;
      .fm_hourTopBg{
        width: 190px;
        height: 190px;
        // background: url('@/pages/summerParty2024/assets/mk5_6.png') no-repeat left top/100% 100%;
        margin: auto;
      }
    }
    .fm_hourTopTag{
      width: 179px;
      height: 48px;
      background: url('@/pages/summerParty2024/assets/mk5_5.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 470px;
    }
    .fm_hourTopName{
      font-weight: bold;
      font-size: 26px;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 520px;
    }
    .fm_hourMax{
      font-weight: 500;
      font-size: 24px;
      color: #FFF476;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 620px;
    }
    .fm_btn{
      width: 293px;
      height: 151px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 660px;
      &.status1{
        background: url('@/pages/summerParty2024/assets/mk5_1.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/summerParty2024/assets/mk5_2.png') no-repeat left top/100% 100%;
      }
      &.status3{
        background: url('@/pages/summerParty2024/assets/mk5_3.png') no-repeat left top/100% 100%;
      }
    }
  }
  .rankBox{
    margin-top: 140px;
    padding-top: 80px;
    .rb_rankTag{
      width: 616px;
      height: 135px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -60px;
      z-index: 2;
      display: flex;
      &.tag1{
        background: url('@/pages/summerParty2024/assets/mk5_7.png') no-repeat left top/100% 100%;
      }
      &.tag2{
        background: url('@/pages/summerParty2024/assets/mk5_8.png') no-repeat left top/100% 100%;
      }
      .rb_rankTagItem{
        width: 50%;
        height: 100%;
      }
    }
    .rb_toptip{
      width: 608px;
      height: 32px;
      margin: 0 auto;
      &.status1{
        background: url('@/pages/summerParty2024/assets/mk5_9.png') no-repeat left top/100% 100%;
      }
      &.status2{
        width: 551px;
        background: url('@/pages/summerParty2024/assets/mk5_19.png') no-repeat left top/100% 100%;
      }
    }
    .rb_rewardsShow{
      width: 684px;
      height: 283px;
      background: url('@/pages/summerParty2024/assets/mk5_10.png') no-repeat left top/100% 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      position: relative;
      .rb_rewardsShowItem{
        width: 110px;
        height: 110px;
        background: #FFFFFF;
        border-radius: 12px;
        border: 4px solid #48B3F1;
        margin: 60px 20px 0 20px;
        position: relative;
        .rb_rewardsShowItemText{
          font-weight: 400;
          font-size: 24px;
          color: #FFFFFF;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -40px;
        }
        .rb_rewardsShowItemMark{
          background: linear-gradient(90deg, #FF5B95, #FFA569);
          border-radius: 17px 17px 17px 17px;
          padding: 5px 10px;
          font-size: 20px;
          color: #FFFFFF;
          position: absolute;
          right: -20px;
          top: -10px;
        }
        .rb_rewardsShowItemPrice{
          background: linear-gradient(-90deg, #8A77FF, #FF84F8);
          border-radius: 17px 17px 17px 17px;
          padding: 5px 10px;
          font-size: 20px;
          color: #FFFFFF;
          position: absolute;
          right: -20px;
          top: -10px;
          img{
            width: 27px;
            height: 20px;
          }
        }
      }
      .rb_rewardsShowRule{
        width: 72px;
        height: 76px;
        background: url('@/pages/summerParty2024/assets/mk5_11.png') no-repeat left top/100% 100%;
        position: absolute;
        right: -20px;
        top: 90px;
      }
    }
    .rb_dateDiv{
      width: 185px;
      height: 51px;
      background: linear-gradient(-90deg, #4865E5, #F96C8A);
      border-radius: 0px 26px 26px 0px;
      padding-right: 20px;
      font-weight: bold;
      font-size: 26px;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 6px;
      top: 330px;
      z-index: 3;
      .rb_dateListsIcon{
        width: 24px;
        height: 15px;
        position: absolute;
        right: 15px;
        top: 40%;
        transform: translateY(-50%);
        &.statusfalse{
          top: 50%;
          background: url('@/pages/summerParty2024/assets/mk5_20.png') no-repeat left top/100% 100%;
        }
        &.statustrue{
          background: url('@/pages/summerParty2024/assets/mk5_21.png') no-repeat left top/100% 100%;
        }
      }
    }
    .rb_dateListDiv{
      width: 150px;
      background: #fff;
      border: #E36C96 solid 10px;
      border-radius: 0px 0px 20px 20px;
      position: absolute;
      left: 16px;
      top: 370px;
      z-index: 2;
      .rb_dateListItem{
        width: 120px;
        height: 50px;
        margin: 0 auto;
        border-bottom: #E36C96 solid 1px;
        text-align: center;
        font-weight: bold;
        line-height: 50px;
        font-size: 26px;
        color: #BD6489;
      }
    }
    .rb_noRankShow{
      height: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        color: #FFE84F;
      }
    }
    .rb_rankShow{
      .rb_hour_timeLeft{
        width: 623px;
        height: 52px;
        background: #466BD5;
        border-radius: 26px;
        padding: 0 20px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        i{
          color: #FFF25D;
        }
      }
      .rb_presentRankTag{
        width: 428px;
        height: 58px;
        z-index: 2;
        display: flex;
        margin: 0 auto;
        &.tag1{
          background: url('@/pages/summerParty2024/assets/mk5_12.png') no-repeat left top/100% 100%;
        }
        &.tag2{
          background: url('@/pages/summerParty2024/assets/mk5_13.png') no-repeat left top/100% 100%;
        }
        .rb_presentRankTagItem{
          width: 50%;
          height: 100%;
        }
      }
      .rb_rankTHead{
        width: 114px;
        height: 114px;
        background: #FFFFFF;
        border-radius: 50%;
        border: 4px solid #4AB4FF;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 100px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .rb_rankTName{
        width: 190px;
        font-weight: bold;
        font-size: 24px;
        color: #1366E3;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 230px;
      }
      .rb_rankTCode{
        font-weight: bold;
        font-size: 22px;
        color: #EE671D;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 260px;
      }
      .rb_rankTValue{
        font-weight: 500;
        font-size: 18px;
        color: #147EC9;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 290px;
      }
      .rb_hour_top1{
        width: 673px;
        height: 366px;
        background: url('@/pages/summerParty2024/assets/mk5_14.png') no-repeat left top/100% 100%;
        margin: 0 auto;
        position: relative;
      }
      .rb_hour_top3{
        width: 673px;
        height: 375px;
        background: url('@/pages/summerParty2024/assets/mk5_15.png') no-repeat left top/100% 100%;
        margin: 0 auto 20px auto;
        position: relative;
        .rb_hour_top3Item{
          width: 277px;
          height: 308px;
          &:nth-of-type(1) {
            background: url('@/pages/summerParty2024/assets/mk5_16.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 20px;
          }
          &:nth-of-type(2) {
            background: url('@/pages/summerParty2024/assets/mk5_17.png') no-repeat left top/100% 100%;
            position: absolute;
            left: -20px;
            top: 110px;
            scale: 0.95;
          }
          &:nth-of-type(3) {
            background: url('@/pages/summerParty2024/assets/mk5_18.png') no-repeat left top/100% 100%;
            position: absolute;
            right: -20px;
            top: 110px;
            scale: 0.95;
          }
          .rb_rankTHead{
            top: 70px;
          }
          .rb_rankTName{
            top: 190px;
          }
          .rb_rankTCode{
            top: 220px;
          }
          .rb_rankTValue{
            top: 250px;
          }
        }
      }
      .rb_rankRe{
        margin: 0 auto;
        .rb_rankReTitle{
          width: 624px;
          height: 56px;
          background: #466BD5;
          border-radius: 30px 30px 0px 0px;
          margin: 0 auto;
          display: flex;
          font-weight: 400;
          font-size: 24px;
          color: #FFFFFF;
          text-align: center;
          line-height: 56px;
          :nth-child(1){
            width: 15%;
          }
          :nth-child(2){
            width: 55%;
          }
          :nth-child(3){
            width: 30%;
          }
        }
        .rb_rankReRanking{
          width: 624px;
          height: 570px;
          background: #AEE5FD;
          margin: 0 auto;
          overflow-y: scroll;
          overflow-x: hidden;
          .rb_rankReRankingItem{
            width: 624px;
            height: 80px;
            color: #1366E3;
            line-height: 80px;
            display: flex;
            &:nth-of-type(even) {
              background: #92D8F6;
            }
            :nth-child(1){
              width: 15%;
              font-size: 24px;
              text-align: center;
            }
            :nth-child(2){
              width: 55%;
              img{
                width: 64px;
                height: 64px;
                background: #FFFFFF;
                border-radius: 50%;
                margin: 0 10px;
              }
              span{
                display: inline-block;
                vertical-align: middle;
                width: 240px;
                font-size: 24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            :nth-child(3){
              width: 30%;
              font-size: 24px;
              text-align: center;
            }
          }
        }
        .rb_rankMy{
          width: 624px;
          height: 80px;
          background: linear-gradient(-90deg, #FDE180, #4DC6FF);
          border-radius: 0px 0px 30px 30px;
          margin: 0 auto;
          display: flex;
          color: #1366E3;
          line-height: 80px;
          :nth-child(1){
            width: 15%;
            font-size: 24px;
            text-align: center;
            color: #FFE749;
          }
          :nth-child(2){
            width: 55%;
            img{
              width: 64px;
              height: 64px;
              background: #FFFFFF;
              border-radius: 50%;
              margin: 0 10px;
            }
            span{
              display: inline-block;
              vertical-align: middle;
              width: 240px;
              font-size: 24px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          :nth-child(3){
            width: 30%;
            font-size: 24px;
            text-align: center;
          }
        }
      }
    }
    .rules-text{
      margin-top: 20px;
    }
  }
}
</style>
