<template>
  <div class='drawPage'>
    <OutBox class="flyBox">
      <div class="swipeDiv">
        <TextSwipe :swipeList="carouse"></TextSwipe>
      </div>
      <div class="drawBg">
        <div class="drawRulesBtn" @click="drawRulesBtnCk"></div>
        <div class="leftDiamondDiv">
          <span>剩余钻石：{{masonry}}</span>
          <div class="addDiamondBtn" @click="addDiamondBtnCk"></div>
        </div>
      </div>
      <div class="darwBtns">
        <div :class="['drawOneBtn', `status${flyOneStatus}`]" @click="drawBtnCk(1, flyOneStatus)">
          <div class="priceDiv">{{flyOneStatus==1?49:flyOneStatus==2?0:null}}<img :src="IconPath('zs_27_20.png')"/></div>
        </div>
        <div class="drawTenBtn" @click="drawBtnCk(10, flyTenStatus)">
          <div class="priceDiv">
            <span v-if="flyTenStatus == 1">450</span>
            <span v-else>
              <i>450</i>
              {{flyTenStatus==2?270:flyTenStatus==3?405:flyTenStatus==4?382:flyTenStatus==5?360:flyTenStatus==6?360:null}}
            </span>
            <img :src="IconPath('zs_27_20.png')"/>
          </div>
          <div :class="['disBg', `status${flyTenStatus}`]"></div>
        </div>
      </div>
      <div class="awardsMoveArea">
        <div class="awardsMoveTip"></div>
        <div class="marqueeArea">
          <Marquee :list="marqueeData" />
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>花费49钻石可飞行1次，每天可免费飞行1次；花费</li>
          <li>450钻石可使飞行10次，活动首次6折</li>
          <li><span></span>每次飞行会前进100~300km，并收获神秘奖励</li>
          <li><span></span>该模块消费钻石计入【玉兔送礼】-累计消费有礼，</li>
          <li>每日前10笔有效消费计入【月饼工坊】-消费获得</li>
          <li>制作次数</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="taskBox" :title="'title_8.png'">
      <div class="taskTip">累计里程达到指定国度可领取对应奖励</div>
      <div class="myMileDiv">我的里程<img :src="IconPath('lc_48_28.png')"/>:&ensp;{{user_mileages}}</div>
      <StepProgress :tot_num="user_mileages" :tot_list="place_checkin_info" @openReceiveAwardsPopup="openReceiveAwardsPopup" @previewImgCk="previewImgCk" @backpackFull="backpackFull"></StepProgress>
      <div class="cloudBg"></div>
      <div class="taskArea">
        <div class="taskItem" v-for="(item) in mileage_tasks" :key="item.task_id">
          <div class="taskItemText1"><span v-html="item.name_desc"></span><span v-if="item.task_id!=1" class="lightText">&ensp;({{item.finish}}/{{item.max}})</span></div>
          <div class="taskItemText2"><img v-if="item.task_id!=1" :src="IconPath('lc_48_28.png')"/><span v-html="item.text"></span></div>
          <div :class="['taskItemBtn',`status${item.has_right}`]" @click="taskItemCk(item)">{{item.has_right==0?item.task_id==2?'去完成':'未完成':item.has_right==2?'已领取':item.has_right==1?'领取':null}}</div>
        </div>
      </div>
    </OutBox>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <SailingComPopup v-if="isShowSailingComPopup" :config="configSailingComPopup" @drawApi="drawApi" @clickClose="clickClose"></SailingComPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <BackpackFull v-if="isShowBackpackFull" :typeBackpackFull="typeBackpackFull" @clickClose="clickClose"></BackpackFull>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import { toChatRoom, compareVersions, recharge, diamondRechargePart } from '@/utils/toApp.js'
import TextSwipe from './components/textSwipe.vue'
import Marquee from '@/pages/midAutumn/components/marquee.vue'
import StepProgress from './components/stepProgress.vue'
import RulesPopup from './components/rulesPopup.vue'
import PreviewPopup from './components/previewPopup.vue'
import SailingComPopup from './components/sailingComPopup.vue'

import ReceiveAwardsPopup from './components/receivePopup.vue'
import BackpackFull from './components/backpackFull.vue'

export default {
  name: 'drawVue',
  components: {
    TextSwipe,
    Marquee,
    StepProgress,
    ReceiveAwardsPopup,
    RulesPopup,
    PreviewPopup,
    SailingComPopup,
    BackpackFull
  },
  data() {
    return {
      room_id: 0, // 聊天室id
      carouse: [], // 轮播
      masonry: 0, // 剩余钻石
      flyOneStatus: 1, // 抽1次奖状态 1:49钻 2:免费
      flyTenStatus: 1, // 抽10次奖状态 1:450钻 2:首次6折 270钻 3:9折 405钻 4:8.5折 382钻 5:8折 360钻 6:永久8折 360钻
      marqueeData: [
        { icon: 'ljs_120_120.png', text: '1~20', name: '绿晶石', type: 'tool' },
        { icon: 'yb_120_120.png', text: '2万~5万', name: '元宝', type: 'tool' },
        { icon: 'zjs_120_120.png', text: '+3', name: '紫晶石', type: 'tool' },
        { icon: 'fsjc_120_120.png', text: '+10', name: '符石精粹', type: 'tool' },
        { icon: 'cbt_120_120.png', text: '+1', name: '藏宝图', type: 'tool' },
        { icon: 'lhq_120_120.png', text: '+1', name: '靓号券', type: 'tool' },
        { icon: 'qdry_120_120.png', text: '+3天', name: '公屏气泡', type: 'tool' }
      ], // 奖励走马灯列表
      user_mileages: 0, // 我的里程
      place_checkin_info: [
        { id: 1, mile: 6800, name: '云之国', icon: 'mk5_7.png', awards1: [{ id: 11, type: 'luck_key', text: '+1', icon: 'xyys_120_120.png', has_right: 0 }], awards2: [{ id: 12, type: 'tool', text: '飞行10次9折', icon: 'dcjz_120_120.png', has_right: 0 }] },
        { id: 2, mile: 18000, name: '星之国', icon: 'mk5_8.png', awards1: [{ id: 21, type: 'mic', text: '头饰+7天', icon: 'ts_yycg.svga', has_right: 0 }], awards2: [{ id: 22, type: 'tool', text: '飞行10次8.5折', icon: 'dcbdwz_120_120.png', has_right: 0 }] },
        { id: 3, mile: 46000, name: '光之国', icon: 'mk5_9.png', awards1: [{ id: 31, type: 'tool', text: '+1', icon: 'sjfs_120_120.png', has_right: 0 }], awards2: [{ id: 32, type: 'tool', text: '飞行10次8折', icon: 'dcbz_120_120.png', has_right: 0 }] },
        { id: 4, mile: 71600, name: '月之国', icon: 'mk5_10.png', awards1: [{ id: 41, type: 'title', text: '+5天', icon: 'mp_yxwxl', has_right: 0 }, { id: 42, type: 'tool', text: '+10万', icon: 'dynl_120_120.png', has_right: 0 }], awards2: [{ id: 43, type: 'tool', text: '飞行10次永久8折', icon: 'yjbz_120_120.png', has_right: 0 }] }
      ], // 累计奖励列表
      mileage_tasks: [
        { task_id: 1, name: '每日登录活动页面：', name_desc: '每日<i>登录</i>活动页面：', icon: '', text: '<i>非会员</i>里程+50KM，<i>银卡会员</i>里程+100KM \n <i>金卡会员</i>里程+150KM，<i>黑卡会员</i>里程+200KM', nums: 5, finish: 1, max: 1, is_show: 0, has_right: 1 },
        { task_id: 2, name: '每日在聊天室累计在线10分钟', name_desc: '每日在聊天室累计在线<i>10分钟</i>', icon: '', text: '里程+50KM', nums: 5, finish: 0, max: 10, is_show: 1, has_right: 0 },
        { task_id: 3, name: '每日使用5次唇齿相依', name_desc: '每日使用<i>5次</i>唇齿相依', icon: '', text: '里程+50KM', nums: 5, finish: 0, max: 5, is_show: 1, has_right: 0 },
        { task_id: 4, name: '每日给5位玩家赠送礼物', name_desc: '每日给<i>5位</i>玩家赠送礼物', icon: '', text: '里程+50KM', nums: 5, finish: 0, max: 5, is_show: 1, has_right: 0 }
      ], // 任务列表

      isShowRulesPopup: false, // 规则弹窗
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowSailingComPopup: false, // 抽奖二次确认弹窗
      configSailingComPopup: {
        drawNum: 1,
        drawType: 0,
        isTodayNoTip: false
      },
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      isShowBackpackFull: false, // 背包已满弹窗
      typeBackpackFull: 1
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getHomeDate()
    this.writeLocalStorage()
    // setTimeout(() => {
    //   this.openReceiveAwardsPopup([
    //     { id: 1, type: 'mic', icon: 'ts_yycg.svga', text: '+11' },
    //     { id: 2, type: 'title', icon: 'mp_tmsp', text: '+11' }
    //   ], true)
    // }, 3000)
  },
  mounted() {},
  methods: {
    /**
     * 获取页面数据
     */
    getHomeDate() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.room_id = res.data.room_id
          this.masonry = res.data.masonry
          this.carouse = res.data.carouse
          this.flyOneStatus = res.data.one_status
          this.flyTenStatus = res.data.ten_status
          this.place_checkin_info = res.data.place_checkin_info
          this.mileage_tasks = res.data.mileage_tasks
          this.user_mileages = res.data.user_mileages
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
      this.isShowPreviewPopup = false
      this.isShowBackpackFull = false
      this.isShowSailingComPopup = false
    },
    /**
     * 规则弹窗
     */
    drawRulesBtnCk() {
      console.log('规则弹窗')
      this.isShowRulesPopup = true
    },
    /**
     * 点击跳转充值
     */
    addDiamondBtnCk() {
      recharge(this.hiddenFn)
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
     * 埋入进入页面日期和是否今日提示
     */
    writeLocalStorage() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      if (JSON.stringify(formattedTime) != localStorage.getItem('sailDate')) {
        localStorage.setItem('isTodayNoTip', 0)
        localStorage.setItem('sailDate', JSON.stringify(formattedTime))
      }
    },
    /**
     * 判断是否是今日
     */
    judgeSecondDay() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      if (JSON.stringify(formattedTime) == localStorage.getItem('sailDate')) {
        return true
      }
      this.$toast('页面信息已变化，请刷新页面')
      setTimeout(() => {
        // 强制刷新
        window.location.reload()
      })
      return false
    },
    /**
     * 抽奖
     * @param {Number} num 抽奖次数 1:抽1次 10:抽10次
     * @param {Number} type 抽奖类型/免费/折扣
     */
    drawBtnCk(num, type) {
      if (this.judgeSecondDay()) {
        console.log('抽奖', num, type)
        this.configSailingComPopup = {
          drawNum: num,
          drawType: type,
          isTodayNoTip: localStorage.getItem('isTodayNoTip') || 0
        }
        if (this.configSailingComPopup.isTodayNoTip == 1 || (num == 1 && type == 2)) {
          this.drawApi(num, type)
        } else {
          this.isShowSailingComPopup = true
        }
      }
    },
    /**
     * 抽奖api
     */
    drawApi(num, type) {
      console.log(num, type)
      // if (num == 1 && type == 1 && this.masonry < 49) {
      //   diamondRechargePart(49)
      // } else if (num == 10 && type == 1 && this.masonry < 450) {
      //   diamondRechargePart(450)
      // } else if (num == 10 && type == 2 && this.masonry < 270) {
      //   diamondRechargePart(270)
      // } else if (num == 10 && type == 3 && this.masonry < 405) {
      //   diamondRechargePart(405)
      // } else if (num == 10 && type == 4 && this.masonry < 382) {
      //   diamondRechargePart(382)
      // } else if (num == 10 && type == 5 && this.masonry < 360) {
      //   diamondRechargePart(360)
      // } else if (num == 10 && type == 6 && this.masonry < 360) {
      //   diamondRechargePart(360)
      // } else {
        getPageData({ type: 'travel_forward', mark: { action_type: num, status_code: type } }).then((res) => {
          if (res.errno == 0) {
            console.log(res)
            let msg = res.data.awards
            msg.push({
              type: 'miles',
              icon: 'lc_120_120.png',
              text: `里程+${res.data.award_mileages}km`
            })
            this.openReceiveAwardsPopup(msg)
          } else if (res.errno == 3) {
            if (num == 1 && type == 1) {
              diamondRechargePart(49)
            } else if (num == 10 && type == 1) {
              diamondRechargePart(450)
            } else if (num == 10 && type == 2) {
              diamondRechargePart(270)
            } else if (num == 10 && type == 3) {
              diamondRechargePart(405)
            } else if (num == 10 && type == 4) {
              diamondRechargePart(382)
            } else if (num == 10 && type == 5) {
              diamondRechargePart(360)
            } else if (num == 10 && type == 6) {
              diamondRechargePart(360)
            }
          } else {
            this.$toast(res.errmsg)
          }
        })
      // }
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.previewImg) {
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
     * 任务领取
     */
    taskItemCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'travel_task_award', mark: item.task_id }).then((res) => {
          if (res.errno == 0) {
            this.$toast(res.errmsg)
            this.getHomeDate()
          } else if (res.errno == -5 || res.errno == -6) {
            this.backpackFull(res.errno)
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else if (item.has_right == 0 && item.task_id == 2) {
        toChatRoom(this.room_id)
      }
    },
    /**
     * 符石背包已满弹框处理
     * @param {Number} errno -5: 符石背包已满 -6: 符石背包已满，请升级到最新版本分解符石
     */
    backpackFull(errno) {
      const app_version = this.$store.state.app_version
      const flag = compareVersions(app_version, '5.7.8')
      if (flag == -1) {
        return this.$toast('你的符石背包已满，请升级到最新版本分解符石')
      }
      this.openBackpackFullPopup(errno == -5 ? 1 : 2)
    },
    /**
     * 打开背包已满弹窗
     */
    openBackpackFullPopup(type) {
      console.log('背包已满弹窗')
      this.clickClose()
      setTimeout(() => {
        this.typeBackpackFull = type
        this.isShowBackpackFull = true
        this.getPageData()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.drawPage{
  .flyBox{
    .swipeDiv{
      width: 713px;
      height: 71px;
      background: url('@/pages/midAutumn/assets/mk5_1.png') no-repeat left top/100% 100%;
      margin: -30px auto 0 auto;
      padding: 10px 0px;
    }
    .drawBg{
      width: 672px;
      height: 370px;
      background: url('@/pages/midAutumn/assets/mk5_2.png') no-repeat left top/100% 100%;
      margin: 10px auto 0 auto;
      position: relative;
      .drawRulesBtn{
        width: 56px;
        height: 56px;
        background: url('@/pages/midAutumn/assets/mk2_2.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0px;
        top: 0px;
      }
      .leftDiamondDiv{
        font-weight: 500;
        font-size: 24px;
        background: #B55023;
        border-radius: 24px;
        padding: 8px 61px 8px 25px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        .addDiamondBtn{
          width: 36px;
          height: 36px;
          background: url('@/pages/midAutumn/assets/mk5_3.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .darwBtns{
      display: flex;
      justify-content: center;
      margin: 20px auto 0 auto;
      .drawOneBtn{
        width: 304px;
        height: 111px;
        margin: 0 20px;
        position: relative;
        &.status1{
          background: url('@/pages/midAutumn/assets/mk5_5.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/midAutumn/assets/mk5_4.png') no-repeat left top/100% 100%;
        }
      }
      .drawTenBtn{
        width: 304px;
        height: 111px;
        background: url('@/pages/midAutumn/assets/mk5_6.png') no-repeat left top/100% 100%;
        margin: 0 20px;
        position: relative;
        .disBg{
          width: 239px;
          height: 89px;
          pointer-events: none;
          position: absolute;
          top: -60px;
          right: -10px;
          &.status2{
            background: url('@/pages/midAutumn/assets/mk5_15.png') no-repeat left top/100% 100%;
          }
          &.status3{
            background: url('@/pages/midAutumn/assets/mk5_16.png') no-repeat left top/100% 100%;
          }
          &.status4{
            background: url('@/pages/midAutumn/assets/mk5_17.png') no-repeat left top/100% 100%;
          }
          &.status5{
            background: url('@/pages/midAutumn/assets/mk5_18.png') no-repeat left top/100% 100%;
          }
          &.status6{
            background: url('@/pages/midAutumn/assets/mk5_19.png') no-repeat left top/100% 100%;
          }
        }
      }
      .priceDiv{
        font-weight: bold;
        font-size: 22px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 22px;
        img{
          width: 27px;
          height: 20px;
          margin: 0 5px;
        }
        i{
          color: #fff;
          text-decoration: line-through;
          text-decoration-color: #E54725;
          margin-right: 10px;
        }
      }
    }
    .awardsMoveArea{
      width: 686px;
      height: 262px;
      background: #FFEABD;
      margin: 10px auto 10px auto;
      padding-top: 12px;
      .awardsMoveTip{
        width: 560px;
        height: 33px;
        background: url('@/pages/midAutumn/assets/mk4_8.png') no-repeat left top/100% 100%;
        margin: 0px auto 0 auto;
      }
      .marqueeArea{
        height: 210px;
      }
    }
  }
  .taskBox{
    .taskTip{
      font-weight: bold;
      font-size: 28px;
      color: #A94214;
      margin: 0 auto;
      text-align: center;
    }
    .myMileDiv{
      font-weight: 500;
      font-size: 28px;
      color: #FFFFFF;
      margin: 10px auto;
      background: #C94A32;
      border-radius: 24px;
      width: fit-content;
      padding: 5px 45px;
      img{
        width: 48px;
        height: 28px;
        margin: 0 5px;
      }
    }
    .cloudBg{
      width: 686px;
      height: 166px;
      background: url('@/pages/midAutumn/assets/mk5_20.png') no-repeat left top/100% 100%;
      margin: -170px auto 0 auto;
    }
    .taskArea{
      .taskItem{
        width: 660px;
        height: 137px;
        background: linear-gradient(90deg, #D65C32, #FFCD61);
        border-radius: 20px;
        border: 3px solid #F59C42;
        margin: 0 auto 20px auto;
        position: relative;
        .taskItemText1{
          font-weight: 400;
          font-size: 28px;
          color: #FFFFFF;
          position: absolute;
          left: 20px;
          top: 34px;
          transform: translateY(-50%);
          .lightText{
            color: #FFEE7A;
          }
        }
        .taskItemText2{
          font-weight: 400;
          font-size: 22px;
          color: #FFFFFF;
          background: #B7412A;
          border-radius: 24px;
          padding: 8px 15px;
          white-space: pre-wrap;
          position: absolute;
          left: 20px;
          bottom: 40px;
          transform: translateY(50%);
          img{
            width: 48px*0.8;
            height: 28px*0.8;
            margin: 0 5px;
          }
        }
        .taskItemBtn{
          width: 120px;
          height: 60px;
          border-radius: 30px;
          border: 2px solid #FFFFFF;
          font-weight: 400;
          font-size: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          &.status0{
            color: #4D7DDD;
            background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
          }
          &.status1{
            color: #A9792C;
            background: linear-gradient(0deg, #FFF5B0, #FFFFFF);
          }
          &.status2{
            color: #FFF;
            background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
          }
        }
      }
    }
  }
}
</style>
