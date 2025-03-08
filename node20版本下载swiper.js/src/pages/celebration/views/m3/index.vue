<template>
  <div class="m3LayOut">
    <div class="swipeDiv">
      <TextSwipe :swipeList="rare_list"></TextSwipe>
    </div>
    <OutBox class="carveUpYbBox">
      <div :class="['roundsTitle',`status${round}`]"></div>
      <div class="carveUpYbTip">
        <span v-if="carveUpLefting==''">本轮瓜分元宝数量</span>
        <span v-else>距本轮瓜分奖池：<i>{{carveUpLefting}}</i></span>
      </div>
      <div class="ybNumsDiv">
        <div class="ybNums">
          <i>{{pool_amount.toLocaleString()}}</i>
          <span>元宝</span>
        </div>
        <div class="ybPeople">本轮参与人数:&ensp;{{add_number}}人</div>
      </div>
      <div class="myCarveUpPointsDiv">
        <p>{{point}}</p>
        <span>我的瓜分积分</span>
      </div>
      <div class="mycarveUpLevelDiv">
        <p>再加把劲！有机会获</p>
        <p>得<i>高档</i>瓜分奖励</p>
      </div>
      <div class="carveUpRulesBtn" @click="carveUpRulesBtnCk"></div>
      <div class="carveUpRecordsBtn" @click="carveUpRecordsBtnCk"></div>
    </OutBox>
    <OutBox class="glitteringBox" :title="'mk8_title_1.png'">
      <div class="glitteringRulesBtn" @click="glitteringRulesBtnCk"></div>
      <div class="glitteringDrawBg"></div>
      <div class="starConsumeDiv">已消费钻石:&ensp;{{recharge_amount}}</div>
      <div class="starLeftTimeDiv">剩余开启次数:&ensp;{{open_num}}<img :src="IconPath('mk8_10.png')" @click="toTaskBtnCk"/></div>
      <div class="costumeAwardDiv">
        <PublicImg :imgName="'hjcbt_120_120.png'" :imgType="'costume'"></PublicImg>
      </div>
      <div class="glitteringRecordsBtn" @click="glitteringRecordsBtnCk"></div>
      <div class="glitteringDrawBtns">
        <div @click="glitteringDrawCk(1)"></div>
        <div @click="glitteringDrawCk(10)"></div>
        <div @click="glitteringDrawCk(50)"></div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>完成<address @click="toTaskBtnCk">每日任务</address>可获得开启次数</li>
          <li><span></span>在【闪耀宝箱】获得的祈愿币可用于【祈愿池】</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="prayBox" :title="'mk8_title_2.png'">
      <div class="prayRulesBtn" @click="prayRulesBtnCk"></div>
      <div class="prayLeftDiv">剩余祈愿币<img :src="IconPath('qyb_44_43.png')"/>:&ensp;{{coin_num}}</div>
      <div class="prayDrawBg"></div>
      <PrayDisc class="PrayDiscArea" :leftDrawsNum="coin_num" :pretty_num="pretty_num" @openReceiveAwardsPopup="openReceiveAwardsPopup"></PrayDisc>
      <div class="prayRecordsBtn" @click="prayRecordsBtnCk"></div>
      <div class="rules-text">
        <ul>
          <li><span></span>可前往【闪耀宝箱】玩法获得祈愿币<img :src="IconPath('qyb_44_43.png')"/></li>
          <li><span></span>每次祈愿有概率获得【瓜分积分】，统计玩家获得</li>
          <li>的【瓜分积分】生成排名，根据排名规则瓜分每轮</li>
          <li>奖池</li>
          <li><span></span>每轮瓜分奖池后，获得的【瓜分积分】清零</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="taskBox" :title="'mk8_title_3.png'">
      <div ref="toTaskRef"></div>
      <div class="receiveInviteBtn" @click="receiveInviteBtnCk">
        <div class="inviteRedPoint" v-if="invite_red_point"></div>
      </div>
      <div class="sendInviteBtn" @click="sendInviteBtnCk"></div>
      <div class="taskItem" v-for="(item) in task_list" :key="item.id">
        <div class="taskItem_text">{{item.text}}<span v-if="!(item.id==1||item.id==3)">&ensp;({{item.now_num}}/{{item.need_num}})</span></div>
        <div class="taskItem_num_text">{{item.num_text}}</div>
        <div class="taskItem_desc" v-if="item.desc">{{item.desc}}</div>
        <div :class="['taskItem_btn', `status${item.has_right}`]" v-if="item.id!=1" @click="taskItemBtnCk(item)">{{item.has_right==0?item.id==2||item.id==5?'去完成':'未完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
      <div class="titleTaskLine"></div>
      <div class="openBoxTimesDiv">成功开启【闪耀宝箱】80次（{{tot_num}}/80）</div>
      <div class="taskTitleDiv">
        <PublicImg :imgName="'ch_dmt'" :imgType="'title'"></PublicImg>
        <div :class="['titleTaskBtn', `status${is_rev_title}`]" @click="titleTaskBtnCk"></div>
      </div>
    </OutBox>
    <OutBox class="totBox" :title="'mk8_title_4.png'">
      <div class="pickedStarTimeDiv">已开启:&ensp;{{tot_num}}次</div>
      <div class="pickStarTip"><span>累计开启</span>【闪耀宝箱】次数可领取对应奖励</div>
      <StepProgress :tot_num="tot_num" :tot_list="tot_list" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
    </OutBox>
    <CarveUpRulesPopup v-if="isShowCarveUpRulesPopup" @clickClose="clickClose"></CarveUpRulesPopup>
    <CarveUpRecordsPopup v-if="isShowCarveUpRecordsPopup" @clickClose="clickClose"></CarveUpRecordsPopup>
    <RulesPopup v-if="isShowRulesPopup" :config="configRulesPopup" @clickClose="clickClose"></RulesPopup>
    <RecordsPopup v-if="isShowRecordsPopup" :config="configRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <ReceivePopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceivePopup>
    <SendInvitePopup v-if="isShowSendInvitePopup" @clickClose="clickClose"></SendInvitePopup>
    <ReceiveInvitePopup v-if="isShowReceiveInvitePopup" @clickClose="clickClose"></ReceiveInvitePopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import { recharge } from '@/utils/toApp.js'
import TextSwipe from './components/textSwipe.vue'
import PrayDisc from './components/prayDisc.vue'
import StepProgress from './components/stepProgress.vue'
import ReceivePopup from './components/receivePopup.vue'
import RulesPopup from './components/rulesPopup.vue'
import CarveUpRulesPopup from './components/carveUpRulesPopup.vue'
import CarveUpRecordsPopup from './components/carveUpRecordsPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import SendInvitePopup from './components/sendInvitePopup.vue'
import ReceiveInvitePopup from './components/receiveInvitePopup.vue'

export default {
  name: 'm3Vue',
  components: {
    TextSwipe,
    PrayDisc,
    ReceivePopup,
    SendInvitePopup,
    ReceiveInvitePopup,
    StepProgress,
    CarveUpRulesPopup,
    CarveUpRecordsPopup,
    RulesPopup,
    RecordsPopup
  },
  data() {
    return {
      rare_list: [], // 轮播
      round: 1, // 瓜分元宝的轮次
      carveUpLefting: '', // 倒计时
      carveUpTimer: null,
      pool_amount: 100000000, // 本轮此元宝数量
      add_number: 0, // 本轮次参与人数
      point: 0, // 我的瓜分积分
      recharge_amount: 0, // 已充值金额
      open_num: 0, // 剩余开启次数
      coin_num: 0, // 剩余祈愿币数量
      pretty_num: 0, // 祈愿池剩余靓号券数量
      task_list: [
        { id: 1, text: '每充值15元', num_text: '开启次数+1', desc: '系统自动派发，无需手动领取', need_num: -1, now_num: 0, has_right: 0 },
        { id: 2, text: '完成任意一笔钻石充值', num_text: '开启次数+1', desc: '', need_num: 1, now_num: 0, has_right: 0 },
        { id: 3, text: '每日登录活动页面', num_text: '开启次数+1', desc: '', need_num: 1, now_num: 0, has_right: 0 },
        { id: 4, text: '5位好友为我助力', num_text: '开启次数+1', desc: '', need_num: 5, now_num: 0, has_right: 0 },
        { id: 5, text: '每日在【全民砍价】玩法进行一次砍价', num_text: '开启次数+1', desc: '', need_num: 1, now_num: 0, has_right: 0 }
      ], // 任务列表
      is_rev_title: 0, // 0:未完成 1:可领取 2:已领取
      invite_red_point: false, // 收到的邀请的红点
      tot_num: 0, // 累计开启【闪耀宝箱】次数
      tot_list: [
        { awardId: 3, id: 2, type: 'tool', icon: 'ljs_120_120.png', nums: 80, name: '绿晶石', text: '+80', need: 3, has_right: 0 },
        { awardId: 7, id: 0, type: 'luck_key', icon: 'xyys_120_120.png', nums: 1, name: '钥匙', text: '+1', need: 7, has_right: 0 },
        { awardId: 15, id: 171, type: 'tool', icon: 'sjlb_120_120.png', nums: 3, name: '世界喇叭', text: '+3', need: 15, has_right: 0 },
        { awardId: 24, id: 158, type: 'tool', icon: 'cbt_120_120.png', nums: 5, name: '藏宝图', text: '+5', need: 24, has_right: 0 },
        { awardId: 36, id: 0, type: 'rune', icon: 'sjfs_120_120.png', nums: 1, name: '卓越符石礼包', text: '+1', need: 36, has_right: 0 },
        { awardId: 54, id: 177, type: 'pst_privilege', icon: 'xyxy_120_120.png', nums: 1, name: '星语心愿', text: '+3天', price: 1314, previewImg: 'tk_38.png', previewTip1: '星语心愿·双人礼物赠送权', need: 54, has_right: 0 },
        { awardId: 72, id: 5150, type: 'title', icon: 'mp_tmsp', nums: 5, name: '甜蜜双排', text: '+5天', need: 72, has_right: 0 }
      ], // 累计奖励列表

      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      isShowCarveUpRulesPopup: false, // 瓜分规则弹窗
      isShowCarveUpRecordsPopup: false, // 瓜分记录弹窗
      isShowRulesPopup: false, // 奖池说明弹窗
      configRulesPopup: 1, // 1:浮生星阵 2:祈愿池
      isShowRecordsPopup: false, // 记录弹窗
      configRecordsPopup: 1, // 1:浮生星阵 2:祈愿池
      isShowSendInvitePopup: false, // 发送邀请弹窗
      isShowReceiveInvitePopup: false // 收到邀请弹窗
    }
  },
  watch: {},
  computed: {},
  created() {
    // this.getHomePage()
  },
  mounted() {
    // this.carveUpCountdown(100000)
  },
  methods: {
    /**
     * 获取页面数据
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm7' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.rare_list = res.data.rare_list
          this.round = res.data.round
          if (res.data.count_time > 0) { //
            this.carveUpCountdown(res.data.count_time)
          }
          this.pool_amount = res.data.pool_amount
          this.add_number = res.data.add_number
          this.point = res.data.point
          this.recharge_amount = res.data.recharge_amount
          this.open_num = res.data.open_num
          this.coin_num = res.data.coin_num
          this.pretty_num = res.data.pretty_num
          this.task_list = res.data.task_list
          this.is_rev_title = res.data.is_rev_title //
          this.invite_red_point = res.data.invite_red_point
          this.tot_num = res.data.tot_num
          this.tot_list = res.data.tot_list
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveAwardsPopup = false
      this.isShowPreviewPopup = false
      this.isShowCarveUpRulesPopup = false
      this.isShowCarveUpRecordsPopup = false
      this.isShowRulesPopup = false
      this.isShowRecordsPopup = false
      this.isShowSendInvitePopup = false
      this.isShowReceiveInvitePopup = false
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
     * 本轮瓜分倒计时
     */
    carveUpCountdown(seconds) {
      if (seconds >= 0) {
        let days = Math.floor(seconds / 60 / 60 / 24)
        let hours = Math.floor((seconds - days * 24 * 60 * 60) / 60 / 60)
        let minutes = Math.floor((seconds - days * 24 * 60 * 60 - hours * 60 * 60) / 60)
        let remainingSeconds = seconds % 60
        // 自动补0
        const leadingDigit = (num, len = 2, sep = '0') => `${Array(len + 1).join(sep)}${num}`.slice(-len)
        // 更新倒计时元素的内容
        if (days > 0) {
          this.carveUpLefting = leadingDigit(days) + '天 ' + leadingDigit(hours) + ':' + leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
        } else {
          this.carveUpLefting = leadingDigit(hours) + ':' + leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
        }
        // 每秒调用自身，直到倒计时完成或者手动停止
        clearTimeout(this.carveUpTimer)
        this.carveUpTimer = setTimeout(this.carveUpCountdown, 1000, --seconds)
      } else {
        console.log('倒计时结束')
        this.carveUpLefting = ''
        this.getHomePage()
      }
    },
    /**
     * 瓜分元宝规则说明
     */
    carveUpRulesBtnCk() {
      console.log('瓜分元宝规则说明')
      this.isShowCarveUpRulesPopup = true
    },
    /**
     * 瓜分元宝我的记录
     */
    carveUpRecordsBtnCk() {
      console.log('瓜分元宝我的记录')
      this.isShowCarveUpRecordsPopup = true
    },
    /**
     * 闪耀宝箱规则说明
     */
    glitteringRulesBtnCk() {
      console.log('闪耀宝箱规则说明')
      this.configRulesPopup = 1
      this.isShowRulesPopup = true
    },
    /**
     * 滚动至任务模块
     */
    toTaskBtnCk() {
      console.log('滚动至任务模块')
      let targetDiv = this.$refs.toTaskRef
      if (targetDiv) {
        targetDiv.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        console.error('Target div not found')
      }
    },
    /**
     * 闪耀宝箱我的记录
     */
    glitteringRecordsBtnCk() {
      console.log('闪耀宝箱我的记录')
      this.configRulesPopup = 1
      this.isShowRecordsPopup = true
    },
    /**
     * 闪耀宝箱抽奖
     */
    glitteringDrawCk(num) {
      console.log(num)
      if (this.open_num >= num) {
        getPageData({ type: 'ps_open', mark: num }).then((res) => {
          if (res.errno == 0) {
            // this.dealSort(res.data)
            this.openReceiveAwardsPopup(res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        this.$toast('次数不足，可完成每日任务获得')
      }
    },
    /**
     * 祈愿池规则说明
     */
    prayRulesBtnCk() {
      console.log('祈愿池规则说明')
      this.configRulesPopup = 2
      this.isShowRulesPopup = true
    },
    /**
     * 祈愿池我的记录
     */
    prayRecordsBtnCk() {
      console.log('祈愿池我的记录')
      this.configRulesPopup = 2
      this.isShowRecordsPopup = true
    },
    /**
     * 收到的邀请
     */
    receiveInviteBtnCk() {
      console.log('收到的邀请')
      this.isShowReceiveInvitePopup = true
    },
    /**
     * 邀请好友
     */
    sendInviteBtnCk() {
      console.log('邀请好友')
      this.isShowSendInvitePopup = true
    },
    /**
     * 任务领取
     */
    taskItemBtnCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'ps_rev_task', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            // this.openReceiveAwardsPopup(res.data)
            this.$toast(res.errmsg)
            this.getHomePage()
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (item.has_right == 0 && item.id == 2) {
        // console.log(2)
        recharge(this.hiddenFn)
      } else if (item.has_right == 0 && item.id == 5) {
        // console.log(5)
        this.$router.push('/m2/peopleBargained')
      }
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getHomePage()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    /**
     * 称号任务领取
     */
    titleTaskBtnCk() {
      if (this.is_rev_title == 1) {
        getPageData({ type: 'ps_rev_title' }).then((res) => {
          if (res.errno == 0) {
            this.openReceiveAwardsPopup(res.data)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m3LayOut {
  position: relative;
  .swipeDiv{
    width: 750px;
    height: 128px;
    background: url('@/pages/celebration/assets/mk8_4.png') no-repeat left top/100% 100%;
    margin: -60px auto 0 auto;
    padding: 30px 0px;
  }
  .carveUpYbBox{
    position: relative;
    .roundsTitle{
      width: 635px;
      height: 84px;
      margin: 0 auto;
      &.status1{
        background: url('@/pages/celebration/assets/mk8_1.png') no-repeat left top/100% 100%;
      }
      &.status2{
        background: url('@/pages/celebration/assets/mk8_2.png') no-repeat left top/100% 100%;
      }
      &.status3{
        background: url('@/pages/celebration/assets/mk8_3.png') no-repeat left top/100% 100%;
      }
    }
    .carveUpYbTip{
      font-weight: bold;
      font-size: 28px;
      color: #6E56E7;
      text-align: center;
      margin: 30px auto 0 auto;
      i{
        color: #F552AE;
      }
    }
    .ybNumsDiv{
      width: 588px;
      height: 184px;
      background: url('@/pages/celebration/assets/mk8_7.png') no-repeat left top/100% 100%;
      margin: 20px auto 0 auto;
      position: relative;
      .ybNums{
        position: absolute;
        left: 50%;
        top: 80px;
        transform: translate(-50%,-50%);
        i{
          font-weight: 800;
          font-size: 63px;
          color: #FFEE8F;
        }
        span{
          font-weight: bold;
          font-size: 24px;
          color: #FFFFFF;
        }
      }
      .ybPeople{
        position: absolute;
        left: 50%;
        top: 140px;
        transform: translate(-50%,-50%);
        font-weight: bold;
        font-size: 24px;
        color: #FFFFFF;
      }
    }
    .myCarveUpPointsDiv{
      width: 254px;
      height: 106px;
      background: url('@/pages/celebration/assets/mk8_8.png') no-repeat left top/100% 100%;
      margin: 20px auto 20px auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      p{
        font-weight: 800;
        font-size: 50px;
        color: #B45BFF;
      }
      span{
        font-weight: bold;
        font-size: 24px;
        color: #6E56E7;
      }
    }
    .mycarveUpLevelDiv{
      width: 229px;
      height: 102px;
      background: url('@/pages/celebration/assets/mk8_9.png') no-repeat left top/100% 100%;
      font-weight: 500;
      font-size: 22px;
      color: #FFFFFF;
      padding: 18px 0px 0 0px;
      position: absolute;
      left: 70px;
      top: 410px;
      p{
        text-align: center;
      }
      i{
        color: #FFF479;
      }
    }
    .carveUpRulesBtn{
      width: 52px;
      height: 146px;
      background: url('@/pages/celebration/assets/mk8_5.png') no-repeat left top/100% 100%;
      position: absolute;
      right: -4px;
      top: 200px;
    }
    .carveUpRecordsBtn{
      width: 52px;
      height: 146px;
      background: url('@/pages/celebration/assets/mk8_6.png') no-repeat left top/100% 100%;
      position: absolute;
      right: -4px;
      top: 400px;
    }
  }
  .glitteringBox{
    position: relative;
    .glitteringRulesBtn{
      width: 56px;
      height: 56px;
      background: url('@/pages/celebration/assets/mk2_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 100px;
      top: 0px;
    }
    .glitteringDrawBg{
      width: 669px;
      height: 808px;
      background: url('@/pages/celebration/assets/mk8_19.png') no-repeat left top/100% 100%;
      margin: 0 auto 60px auto;
    }
    .starConsumeDiv{
      padding: 10px 20px;
      background: rgba(137, 114, 253, 0.6);
      border-radius: 0px 24px 24px 0px;
      font-size: 24px;
      text-align: center;
      position: absolute;
      left: 24px;
      top: 130px;
    }
    .starLeftTimeDiv{
      padding: 0px 10px 0 20px;
      background: rgba(137, 114, 253, 0.6);
      border-radius: 24px 0px 0px 24px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 14px;
      top: 130px;
      img{
        width: 32px;
        height: 33px;
        margin-left: 20px;
      }
    }
    .costumeAwardDiv{
      width: 120px;
      height: 120px;
      position: absolute;
      left: 220px;
      top: 200px;
    }
    .glitteringRecordsBtn{
      width: 178px;
      height: 68px;
      background: url('@/pages/celebration/assets/mk8_11.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 550px;
    }
    .glitteringDrawBtns{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 820px;
      &>div{
        width: 242px;
        height: 128px;
        &:nth-of-type(1){
          background: url('@/pages/celebration/assets/mk8_16.png') no-repeat left top/100% 100%;
        }
        &:nth-of-type(2){
          background: url('@/pages/celebration/assets/mk8_17.png') no-repeat left top/100% 100%;
        }
        &:nth-of-type(3){
          background: url('@/pages/celebration/assets/mk8_18.png') no-repeat left top/100% 100%;
        }
      }
    }
  }
  .prayBox{
    position: relative;
    .prayRulesBtn{
      width: 56px;
      height: 56px;
      background: url('@/pages/celebration/assets/mk2_2.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 100px;
      top: 0px;
    }
    .prayLeftDiv{
      padding: 0px 20px;
      background: rgba(137, 114, 253, 0.6);
      border-radius: 24px 0px 0px 24px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 20px;
      top: 130px;
      img{
        width: 44px;
        height: 43px;
        margin-left: 5px;
      }
    }
    .prayDrawBg{
      width: 675px;
      height: 987px;
      background: url('@/pages/celebration/assets/mk8_25.png') no-repeat left top/100% 100%;
      margin: 0 auto -60px auto;
    }
    .PrayDiscArea{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 160px;
    }
    .prayRecordsBtn{
      width: 178px;
      height: 68px;
      background: url('@/pages/celebration/assets/mk8_11.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 590px;
    }
    .rules-text{
      img{
        width: 44px;
        height: 43px;
      }
    }
  }
  .taskBox{
    position: relative;
    .receiveInviteBtn{
      width: 157px;
      height: 56px;
      background: url('@/pages/celebration/assets/mk8_20.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 0px;
      top: -70px;
      z-index: 3;
      .inviteRedPoint{
        width: 14px;
        height: 14px;
        background: #FB3C3C;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .sendInviteBtn{
      width: 157px;
      height: 96px;
      background: url('@/pages/celebration/assets/mk8_21.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 0px;
      top: 0px;
      z-index: 3;
    }
    .taskItem{
      width: 674px;
      height: 154px;
      background: url('@/pages/celebration/assets/mk8_26.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      padding: 0 140px 0 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      .taskItem_text{
        font-weight: 500;
        font-size: 29px;
        color: #FFFFFF;
        line-height: 36px;
        max-width: 440px;
        white-space: pre-wrap;
      }
      .taskItem_num_text{
        font-weight: 400;
        font-size: 22px;
        color: #FFEF85;
        line-height: 36px;
      }
      .taskItem_desc{
        font-weight: 500;
        font-size: 22px;
        color: #85FEFF;
        line-height: 36px;
      }
      .taskItem_btn{
        width: 120px;
        height: 60px;
        font-weight: 400;
        font-size: 28px;
        border-radius: 30px;
        border: 3px solid #FFFFFF;
        position: absolute;
        right: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.status0{
          background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
          color: #4D7DDD;
        }
        &.status1{
          background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
          color: #A9792C;
        }
        &.status2{
          background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          color: #fff;
        }
      }
    }
    .titleTaskLine{
      width: 513px;
      height: 37px;
      background: url('@/pages/celebration/assets/mk8_27.png') no-repeat left top/100% 100%;
      margin: 10px auto 0px auto;
    }
    .openBoxTimesDiv{
      width: fit-content;
      background: #8A77EB;
      border-radius: 25px;
      padding: 10px 60px;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      margin: 20px auto 0 auto;
    }
    .taskTitleDiv{
      width: 446px;
      height: 211px;
      background: url('@/pages/celebration/assets/mk8_28.png') no-repeat left top/100% 100%;
      margin-top: 30px;
      padding: 10px 0px 50px 0px;
      position: relative;
      left: 40%;
      transform: translateX(-50%);
      .titleTaskBtn{
        width: 156px;
        height: 156px;
        position: absolute;
        right: -180px;
        top: 50%;
        transform: translateY(-50%);
        &.status0{
          background: url('@/pages/celebration/assets/mk8_30.png') no-repeat left top/100% 100%;
        }
        &.status1{
          background: url('@/pages/celebration/assets/mk8_29.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk8_31.png') no-repeat left top/100% 100%;
        }
      }
    }
  }
  .totBox{
    position: relative;
    .pickedStarTimeDiv{
      width: 253px;
      height: 48px;
      background: #877FF1;
      border-radius: 24px;
      font-size: 26px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto 0 auto;
    }
    .pickStarTip{
      font-size: 26px;
      color: #6E56E7;
      margin: 10px auto 0px auto;
      text-align: center;
      span{
        color: #F552AE;
      }
    }
  }
}
</style>
