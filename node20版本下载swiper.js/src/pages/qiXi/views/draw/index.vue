<template>
  <div ref="drawPage" class='pageComp'>
    <OutBox class="mpShowBox" :title="'title_8.png'" :hasCostume="true">
      <div class="mpDiv">
        <PublicImg :imgName="'mp_tmsp'" :imgType="'title'"></PublicImg>
      </div>
    </OutBox>
    <OutBox class="drawShowBox" :hasCostume="true">
      <div class="starTitle">
        <div class="starRulesBtn" @click="starRulesBtnCk"></div>
      </div>
      <div class="swipeDiv">
        <TextSwipe :swipeList="rare_list"></TextSwipe>
      </div>
      <div class="starConsumeDiv">已消费钻石:&ensp;{{consume}}</div>
      <div class="starLeftTimeDiv">剩余开启次数:&ensp;{{open_num}}<img :src="IconPath('mk5_5.png')" @click="toTaskBtnCk"/></div>
      <WheelDisc :leftDrawsNum="open_num" :title_num="title_num" :is_discount="is_discount" @openReceiveAwardsPopup="openReceiveAwardsPopup"></WheelDisc>
      <div class="starRecordsBtn" @click="starRecordsBtnCk"></div>
      <div :class="['rules-text', 'starRulesText']">
        <ul>
          <li><span></span>完成<em @click="toTaskBtnCk">每日任务</em>可获得开启次数</li>
          <li><span></span>在【浮生星阵】获得的祈愿币可用于【祈愿池】</li>
        </ul>
      </div>
      <div class="prayTitle">
        <div class="prayRulesBtn" @click="prayRulesBtnCk"></div>
      </div>
      <div class="prayLeftDiv">剩余祈愿币<img :src="IconPath('qyb_44_43.png')"/>:&ensp;{{coin_num}}</div>
      <PrayDisc :leftDrawsNum="coin_num" :pretty_num="pretty_num" @openReceiveAwardsPopup="openReceiveAwardsPopup"></PrayDisc>
      <div class="prayRecordsBtn" @click="prayRecordsBtnCk"></div>
      <div :class="['rules-text', 'prayRulesText']">
        <ul>
          <li><span></span>可前往【浮生星阵】玩法获得祈愿币<img :src="IconPath('qyb_44_43.png')"/></li>
        </ul>
      </div>
    </OutBox>
    <div id="anchor1"></div>
    <OutBox class="taskShowBox" :title="'title_9.png'" :hasCostume="true">
      <div class="taskItem" v-for="(item) in task_list" :key="item.id">
        <div class="taskItem_text">{{item.text}}<span v-if="!(item.id==1||item.id==2)">&ensp;({{item.now_num}}/{{item.need_num}})</span></div>
        <div class="taskItem_num_text">{{item.num_text}}</div>
        <div class="taskItem_desc" v-if="item.desc">{{item.desc}}</div>
        <div :class="['taskItem_btn', `status${item.has_right}`]" v-if="item.id!=1" @click="taskItemBtnCk(item)">{{item.has_right==0?item.id==3||item.id==5?'去完成':'未完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div>
      </div>
      <div :class="['rules-text', 'prayRulesText']">
        <ul>
          <li><span></span>购买礼包、会员（含超值兑换中兑换会员）、活力</li>
          <li>卡不计入充值</li>
        </ul>
      </div>
    </OutBox>
      <div class="receiveInviteBtn" @click="receiveInviteBtnCk">
        <div class="inviteRedPoint" v-if="invite_red_point"></div>
      </div>
      <div class="sendInviteBtn" @click="sendInviteBtnCk"></div>
    <OutBox class="totShowBox" :title="'title_10.png'" :hasCostume="false">
      <div class="pickedStarTimeDiv">已开启:&ensp;{{tot_num}}次</div>
      <div class="pickStarTip"><span>累计开启</span>【浮生星阵】次数可领取对应奖励</div>
      <StepProgress :tot_num="tot_num" :tot_list="tot_list" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
    </OutBox>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <RulesPopup v-if="isShowRulesPopup" :config="configRulesPopup" @clickClose="clickClose"></RulesPopup>
    <RecordsPopup v-if="isShowRecordsPopup" :config="configRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <SendInvitePopup v-if="isShowSendInvitePopup" @clickClose="clickClose"></SendInvitePopup>
    <ReceiveInvitePopup v-if="isShowReceiveInvitePopup" @clickClose="clickClose"></ReceiveInvitePopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import TextSwipe from './components/textSwipe.vue'
import WheelDisc from './components/wheelDisc.vue'
import PrayDisc from './components/prayDisc.vue'
import StepProgress from './components/stepProgress.vue'
import ReceiveAwardsPopup from './components/receivePopup.vue'
import RulesPopup from './components/rulesPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import SendInvitePopup from './components/sendInvitePopup.vue'
import ReceiveInvitePopup from './components/receiveInvitePopup.vue'
import { recharge } from '@/utils/toApp.js'

export default {
  name: 'drawVue',
  components: {
    TextSwipe,
    WheelDisc,
    PrayDisc,
    StepProgress,
    ReceiveAwardsPopup,
    RulesPopup,
    RecordsPopup,
    SendInvitePopup,
    ReceiveInvitePopup
  },
    data() {
      return {
        rare_list: [], // 轮播
        consume: 0, // 已消费钻石
        open_num: 0, // 剩余开启次数
        title_num: 0, // 传奇召唤师称号抽到数量
        is_discount: false, // 是否有十连抽折扣券
        coin_num: 0, // 祈愿币数量
        pretty_num: 0, // 靓号券抽到数量
        task_list: [
          { id: 1, text: '每消费200钻石', num_text: '开启次数+1', desc: '系统自动派发，无需手动领取', need_num: -1, now_num: 0, has_right: 0 },
          { id: 2, text: '每日登录活动页面', num_text: '无CP玩家开启次数+1，有CP玩家开启次数+2', desc: '', need_num: -1, now_num: 0, has_right: 0 },
          { id: 3, text: '5位好友为我助力', num_text: '开启次数+1', desc: '', need_num: 5, now_num: 0, has_right: 0 },
          { id: 4, text: '每日使用5次唇齿相依', num_text: '开启次数+1', desc: '', need_num: 5, now_num: 0, has_right: 0 },
          { id: 5, text: '完成任意一笔钻石充值', num_text: '开启次数+1', desc: '', need_num: 1, now_num: 0, has_right: 0 }
        ], // 任务列表
        invite_red_point: false, // 邀请红点
        tot_list: [
          { id: 1, need_num: 0, award: { id: 0, type: 'tool', nums: 1, name: '十连折扣券', text: '+1', icon: 'scslzkq_120_120.png' }, has_right: 0 },
          { id: 2, need_num: 30, award: { id: 0, type: 'luck_key', nums: 3, name: '幸运钥匙', text: '+1', icon: 'xyys_120_120.png' }, has_right: 0 },
          { id: 3, need_num: 60, award: { id: 158, type: 'tool', nums: 3, name: '藏宝图', text: '+2', icon: 'cbt_120_120.png' }, has_right: 0 },
          { id: 4, need_num: 120, award: { id: 0, type: 'rune', nums: 1, name: '', text: '+5', icon: 'qyb_120_120.png' }, has_right: 0 },
          { id: 5, need_num: 200, award: { id: 159, type: 'title', nums: 1, name: '甜蜜双排', text: '+7天', icon: 'mp_tmsp' }, has_right: 0 },
          { id: 6, need_num: 380, award: { id: 6, type: 'tool', nums: 7, name: '黄金藏宝图', text: '+1', icon: 'hjcbt_120_120.png' }, has_right: 0 },
          { id: 7, need_num: 520, award: { id: 6, type: 'ring', nums: 7, name: '夏日派对', text: '+7天', icon: 'jz_bysf.svga', show_price: '20999' }, has_right: 0 }
        ], // 累计奖励列表
        tot_num: 0, // 累计开启次数
        isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
        configReceiveAwardsPopup: [],
        isShowRulesPopup: false, // 奖池说明弹窗
        configRulesPopup: 1, // 1:浮生星阵 2:祈愿池
        isShowRecordsPopup: false, // 记录弹窗
        configRecordsPopup: 1, // 1:浮生星阵 2:祈愿池
        isShowSendInvitePopup: false, // 发送邀请弹窗
        isShowReceiveInvitePopup: false // 收到邀请弹窗
      }
    },
  computed: {},
  watch: {},
  created() {
    this.getHomeDate()
  },
  mounted() {
    // this.openReceiveAwardsPopup([
    //   { id: 1, type: 'mic', text: '1111', icon: 'ts_hthx.svga', mark: '前20' }
    // ])
  },
  methods: {
    /**
     * 获取页面数据
     */
    getHomeDate() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.rare_list = res.data.rare_list
          this.consume = res.data.consume
          this.open_num = res.data.open_num
          this.title_num = res.data.title_num
          this.is_discount = res.data.is_discount
          this.coin_num = res.data.coin_num
          this.pretty_num = res.data.pretty_num
          this.task_list = res.data.task_list
          this.invite_red_point = res.data.invite_red_point
          this.tot_list = res.data.tot_list
          this.tot_num = res.data.tot_num
        } else {
          this.$toast(res.errmsg)
        }
      })
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
        this.getHomeDate()
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveAwardsPopup = false
      this.isShowRulesPopup = false
      this.isShowRecordsPopup = false
      this.isShowSendInvitePopup = false
      this.isShowReceiveInvitePopup = false
    },
    /**
     * 浮生星阵规则说明
     */
    starRulesBtnCk() {
      console.log('浮生星阵规则说明')
      this.configRulesPopup = 1
      this.isShowRulesPopup = true
    },
    /**
     * 星阵我的记录
     */
    starRecordsBtnCk() {
      console.log('星阵我的记录')
      this.configRecordsPopup = 1
      this.isShowRecordsPopup = true
    },
    /**
     * 跳转任务列表
     */
    toTaskBtnCk() {
      console.log('跳转任务列表')
      // console.log(document.getElementsByClassName('layout')[0])
      document.getElementsByClassName('layout')[0].scrollTo({
        top: document.getElementById('anchor1').offsetTop,
        behavior: 'smooth',
        block: 'start'
      })
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
      this.configRecordsPopup = 2
      this.isShowRecordsPopup = true
    },
    /**
     * 任务按钮点击
     */
    taskItemBtnCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'with_pray_rev_task', mark: item.id }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            // this.openReceiveAwardsPopup(res.data)
            this.$toast(res.errmsg)
            this.getHomeDate()
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (item.has_right == 0 && item.id == 3) {
        // console.log(3)
        this.isShowSendInvitePopup = true
      } else if (item.has_right == 0 && item.id == 5) {
        // console.log(3)
        recharge(this.hiddenFn)
      }
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起')
        // 页面被挂起
      } else {
        // 页面呼出
        this.getHomeDate()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
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
    }
  }
}
</script>
<style lang='scss' scoped>
.pageComp{
  position: relative;
  .mpShowBox{
    width: 723px;
    height: 383px;
    border-image-source: none;
    background: url('@/pages/qiXi/assets/mk5_29.png') no-repeat left top/100% 100%;
    position: relative;
    .mpDiv{
      width: 210px;
      height: 96px;
      position: absolute;
      left: 30px;
      top: 150px;
    }
  }
  .drawShowBox{
    width: 725px;
    height: 2563px;
    border-image-source: none;
    background: url('@/pages/qiXi/assets/mk5_28.png') no-repeat left top/100% 100%;
    position: relative;
    margin-top: -80px;
    padding-top: 50px;
    .starTitle{
      width: 674px;
      height: 210px;
      background: url('@/pages/qiXi/assets/mk5_3.png') no-repeat left top/100% 100%;
      margin: 0px auto 0 auto;
      position: relative;
      .starRulesBtn{
        width: 56px;
        height: 56px;
        background: url('@/pages/qiXi/assets/mk5_1.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 10px;
        top: 80px;
      }
    }
    .swipeDiv{
      width: 680px;
      height: 71px;
      background: url('@/pages/qiXi/assets/mk5_2.png') no-repeat left top/100% 100%;
      margin: -30px auto 0 auto;
      padding: 10px 0px;
    }
    .starConsumeDiv{
      padding: 10px 20px;
      background: rgba(16, 31, 132, 0.6);
      border-radius: 0px 24px 24px 0px;
      font-size: 24px;
      text-align: center;
      position: absolute;
      left: 20px;
      top: 320px;
    }
    .starLeftTimeDiv{
      padding: 0px 20px;
      background: rgba(16, 31, 132, 0.6);
      border-radius: 24px 0px 0px 24px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 20px;
      top: 320px;
      img{
        width: 32px;
        height: 33px;
        margin-left: 5px;
      }
    }
    .starRecordsBtn{
      width: 187px;
      height: 74px;
      background: url('@/pages/qiXi/assets/mk5_10.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1010px;
    }
    .starRulesText{
      margin-top: 20px;
      li{
        color: #fff;
      }
    }
    .prayTitle{
      width: 674px;
      height: 209px;
      background: url('@/pages/qiXi/assets/mk5_4.png') no-repeat left top/100% 100%;
      margin: 0px auto 0 auto;
      position: relative;
      .prayRulesBtn{
        width: 56px;
        height: 56px;
        background: url('@/pages/qiXi/assets/mk5_1.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 10px;
        top: 80px;
      }
    }
    .prayLeftDiv{
      padding: 0px 20px;
      background: rgba(16, 31, 132, 0.6);
      border-radius: 24px 0px 0px 24px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
      position: absolute;
      right: 20px;
      top: 1510px;
      img{
        width: 44px;
        height: 43px;
        margin-left: 5px;
      }
    }
    .prayRecordsBtn{
      width: 187px;
      height: 74px;
      background: url('@/pages/qiXi/assets/mk5_10.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 1980px;
    }
    .prayRulesText{
      margin-top: 20px;
      img{
        width: 44px;
        height: 43px;
      }
    }
  }
  .taskShowBox{
    .taskItem{
      width: 674px;
      height: 154px;
      background: url('@/pages/qiXi/assets/mk1_3.png') no-repeat left top/100% 100%;
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
        line-height: 40px;
      }
      .taskItem_num_text{
        font-weight: 400;
        font-size: 22px;
        color: #FFEF85;
        line-height: 40px;
      }
      .taskItem_desc{
        font-weight: 500;
        font-size: 22px;
        color: #85FEFF;
        line-height: 40px;
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
  }
  .receiveInviteBtn{
    width: 157px;
    height: 56px;
    background: url('@/pages/qiXi/assets/mk5_20.png') no-repeat left top/100% 100%;
    position: absolute;
    right: 0px;
    top: 2970px;
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
    background: url('@/pages/qiXi/assets/mk5_21.png') no-repeat left top/100% 100%;
    position: absolute;
    right: 0px;
    top: 3040px;
    z-index: 3;
  }
  .totShowBox{
    .pickedStarTimeDiv{
      width: 253px;
      height: 48px;
      background: #466BD5;
      border-radius: 24px;
      font-size: 26px;
      text-align: center;
      line-height: 48px;
      margin: 0 auto 0 auto;
    }
    .pickStarTip{
      font-size: 26px;
      color: #575FCB;
      margin: 10px auto 0px auto;
      text-align: center;
      span{
        color: #EC6BFF;
      }
    }
  }
}
</style>
