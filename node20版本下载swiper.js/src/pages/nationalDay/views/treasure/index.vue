<template>
  <div class='treasurePage'>
    <OutBox class="drawBox">
      <div class="swipeDiv">
        <TextSwipe :swipeList="carouse"></TextSwipe>
      </div>
      <div class="awardsArea">
        <div :class="['turntableBg', `level${nowLevel}`]">
          <div :class="['turntableAwardsItem', item.is_trea?'treaSp':null, `level${nowLevel}`]" v-for="(item) in layer_list[nowLevel].award_list" :key="item.id" @click="previewImgCk(item)">
            <div :class="['tai_icon', item.type=='world_msg_skins'?'wmsSp':null]">
              <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
            </div>
            <div :class="['tai_text', item.text.length>=5?'smallSp':null, item.is_trea?'treaSp':null]">{{item.text}}</div>
            <div class="tai_preview" v-if="item.previewImg"></div>
            <div class="tai_newMark" v-if="item.is_new">新</div>
            <div class="tai_priceMark" v-if="item.price">
              {{item.price}}
              <img :src="IconPath('zs_27_20.png')" />
            </div>
            <div class="tai_treaTip" v-if="item.is_trea&&nowLevel<Object.keys(layer_list).length">抽到获得双倍奖励并开启下层</div>
            <div :class="['tai_treaTip', 'smallSp']" v-else-if="item.is_trea&&nowLevel==Object.keys(layer_list).length">抽到获得双倍奖励</div>
            <div class="tai_havenCover" v-show="item.status==2"></div>
            <div class="tai_activeCover" v-show="item.isActive"></div>
          </div>
          <div class="noPoolTip" v-if="nowLevel > curr_layer"></div>
        </div>
        <div class="floorArea">
          <div :class="['floorItem', nowLevel==index?'activeSp':null]" v-for="(item,index) in layer_list" :key="index" @click="changeLevel(index)">{{index}}层</div>
        </div>
      </div>
      <div class="leftDrawTimesDiv">
        <span>拥有的寻宝币<img :src="IconPath('xbb_40_40.png')"/>:&ensp;{{ticket_nums}}</span>
        <div class="addDrawTimesBtn" @click="addDrawTimesBtnCk"></div>
      </div>
      <div class="drawBtnArea">
        <div class="drawBtns" v-if="layer_list[nowLevel].award_list.some(item => item.status==1)">
          <div :class="['drawOneBtn', nowLevel==3?'tenSp':null, nowLevel>curr_layer?'noActiveSp':null]" @click="drawBtnCk(1)">
            <span v-if="free_status">每日首次免费</span>
            <span v-else>消耗<img :src="IconPath('xbb_40_40.png')"/>x1</span>
          </div>
          <div :class="['drawTenBtn', nowLevel>curr_layer?'noActiveSp':null]" v-if="nowLevel==3" @click="drawBtnCk(10)">
            <span>消耗<img :src="IconPath('xbb_40_40.png')"/>x10</span>
          </div>
        </div>
        <div :class="['drawTip',nowLevel<curr_layer?'showSp':null]"></div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span><i>每充值20元</i>可获得1枚寻宝币<img :src="IconPath('xbb_40_40.png')"/>，<i>每日首次寻宝免</i></li>
          <li><i>费，每日奖池重置</i></li>
          <li><span></span>每层设有秘宝奖励，抽到秘宝<i>可获得双倍奖励</i>，在</li>
          <li>1、2层抽到秘宝<i>可解锁下一层</i>，第3层<i>奖励可重复</i></li>
          <li><i>获得</i></li>
        </ul>
      </div>
      <div class="rulesBtn" @click="rulesBtnCk"></div>
      <div class="recordsBtn" @click="recordBtnCk"></div>
      <div class="rechargeNumsDiv">已充值:&ensp;{{recharges}}</div>
      <div :class="['buffBtn', buffStayus==2?'activeSp':null]" @click="buffBtnCk">
        <div class="buffText" v-if="buffStayus==2">{{buffLeating}}</div>
      </div>
    </OutBox>
    <OutBox class="progressBox" :title="'title_6.png'">
      <div class="resetTipBg"></div>
      <div class="progressTip">累计消耗寻宝币达到即可领取奖励</div>
      <div class="allUseCoinsDiv"><span>我消耗的寻宝币<img :src="IconPath('xbb_40_40.png')"/>:&ensp;{{spend_nums}}</span></div>
      <StepProgress :tot_num="spend_nums" :tot_list="tot_awards" :select_date="select_date" @judgeSecondDay="judgeSecondDay" @previewImgCk="previewImgCk" @openReceiveAwardsPopup="openReceiveAwardsPopup" @backpackFull="backpackFull"></StepProgress>
      <div class="rb_dateDiv" @click.stop="isShowDateList=!isShowDateList">
        <div v-for="(item, index) in day_list" :key="index + item">
          <span v-if="select_date==index">{{item}}</span>
        </div>
        <div :class="['rb_dateListsIcon', `status${isShowDateList}`]"></div>
      </div>
      <div class="rb_dateListDiv" v-if="isShowDateList">
        <div v-for="(item, index) in day_list" :key="index + item">
          <div class="rb_dateListItem" v-if="select_date!=index" @click.stop="dateCk(index)">
            <span>{{item}}</span>
          </div>
        </div>
      </div>
    </OutBox>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <SailingComPopup v-if="isShowSailingComPopup" :config="configSailingComPopup" @drawApi="drawApi" @clickClose="clickClose"></SailingComPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" :receiveText="receiveText" @clickClose="clickClose"></ReceiveAwardsPopup>
    <BackpackFull v-if="isShowBackpackFull" :typeBackpackFull="typeBackpackFull" @clickClose="clickClose"></BackpackFull>
    <BuffPopup v-if="isShowBuffPopup" :buffStayus="buffStayus" :buffLeating="buffLeating" :buffCard="buffCard" @changeBuffCard="changeBuffCard" @changeBuffStayus="changeBuffStayus" @clickClose="clickClose"></BuffPopup>
    <RechargeTipPopup v-if="isShowRechargeTipPopup" @addDrawTimesBtnCk="addDrawTimesBtnCk" @clickClose="clickClose"></RechargeTipPopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import { compareVersions, recharge } from '@/utils/toApp.js'
import TextSwipe from './components/textSwipe.vue'
import StepProgress from './components/stepProgress.vue'
import RulesPopup from './components/rulesPopup.vue'
import PreviewPopup from '../draw/components/previewPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import SailingComPopup from './components/sailingComPopup.vue'
import ReceiveAwardsPopup from './components/receivePopup.vue'
import BackpackFull from './components/backpackFull.vue'
import BuffPopup from './components/buffPopup.vue'
import RechargeTipPopup from './components/rechargeTipPopup.vue'

export default {
  name: 'treasureVue',
  components: {
    TextSwipe,
    StepProgress,
    ReceiveAwardsPopup,
    RulesPopup,
    PreviewPopup,
    RecordsPopup,
    SailingComPopup,
    BackpackFull,
    BuffPopup,
    RechargeTipPopup
  },
  data() {
    return {
      carouse: [], // 轮播
      curr_layer: 1, // 奖池等级
      nowLevel: 1, // 当前所选等级
      layer_list: {
        1: {
          award_list: [
            { id: 11, type: 'tool', icon: 'yb_120_120.png', text: '+1万', status: 1 },
            { id: 12, type: 'tool', icon: 'kxt_120_120.png', text: '+1', status: 1 },
            { id: 13, type: 'tool', icon: 'fsjc_120_120.png', text: '+30', status: 1 },
            { id: 14, type: 'tool', icon: 'ljs_120_120.png', text: '+8', status: 1 },
            { id: 15, type: 'voice', icon: 'sb_shzj', text: '+1天', is_trea: true, is_new: true, status: 1 }
          ]
        },
        2: {
          award_list: [
            { id: 21, type: 'tool', icon: 'fsjc_120_120.png', text: '+70', status: 1 },
            { id: 22, type: 'tool', icon: 'lhq_120_120.png', text: '+1', status: 1 },
            { id: 23, type: 'tool', icon: 'sjlb_120_120.png', text: '+2', status: 1 },
            { id: 24, type: 'tool', icon: 'ljs_120_120.png', text: '+12', status: 1 },
            { id: 25, type: 'tool', icon: 'zjs_120_120.png', text: '+2', status: 1 },
            { id: 26, type: 'tool', icon: 'cbt_120_120.png', text: '+1', is_trea: true, status: 1 }
          ]
        },
        3: {
          award_list: [
            { id: 31, type: 'tool', icon: 'fsjc_120_120.png', text: '+80', status: 1 },
            { id: 32, type: 'world_msg_skins', icon: 'xrpd_120_120.png', text: '+1', previewImg: 'tk_37.png', previewTip1: '夏日派对·世界消息皮肤', status: 1 },
            { id: 33, type: 'tool', icon: 'yb_120_120.png', text: '+2万', status: 1 },
            { id: 34, type: 'tool', icon: 'wndc_120_120.png', text: '+1', price: 99, status: 1 },
            { id: 35, type: 'mic', icon: 'ts_zjwb.svga', text: '+1天', status: 1 },
            { id: 36, type: 'tool', icon: 'cbt_120_120.png', text: '+1', status: 1 },
            { id: 37, type: 'tool', icon: 'zjs_120_120.png', text: '+3', status: 1 },
            { id: 38, type: 'car', icon: 'tmay_120_120.png', text: '+1', is_trea: true, previewImg: 'tk_40.png', previewTip1: '甜蜜遨游·双人座驾', status: 1 }
          ]
        }
      }, // 奖励列表
      ticket_nums: 0, // 寻宝币数量
      free_status: true, // 是否首次免费
      recharges: 0, // 已充值金额
      poList: [], // 寻宝奖励结果存储
      rollTime: undefined, // 轮盘计时器
      nowRewardIndex: 0, // 当前第几
      isWheeling: false, // 轮盘是否在转动中
      buffStayus: 1, // buff状态 1:没有buff 2: buff中 3: buff结束
      buffLeating: '', // 剩余buff时间
      buffLeaveTimer: null, // buff定时器
      buffCard: {}, // buff卡 sort位置 type A:好运卡 B:翻倍卡 C:增幅卡 D:加速卡
      spend_nums: 0, // 累计消耗寻宝币
      tot_awards: [
        { awardId: 3, id: 2, type: 'tool', icon: 'ljs_120_120.png', nums: 80, name: '绿晶石', text: '+80', need: 3, has_right: 0 },
        { awardId: 7, id: 0, type: 'luck_key', icon: 'xyys_120_120.png', nums: 1, name: '钥匙', text: '+1', need: 7, has_right: 0 },
        { awardId: 15, id: 171, type: 'tool', icon: 'sjlb_120_120.png', nums: 3, name: '世界喇叭', text: '+3', need: 15, has_right: 0 },
        { awardId: 24, id: 158, type: 'tool', icon: 'cbt_120_120.png', nums: 5, name: '藏宝图', text: '+5', need: 24, has_right: 0 },
        { awardId: 36, id: 0, type: 'rune', icon: 'sjfs_120_120.png', nums: 1, name: '卓越符石礼包', text: '+1', need: 36, has_right: 0 },
        { awardId: 54, id: 177, type: 'pst_privilege', icon: 'xyxy_120_120.png', nums: 1, name: '星语心愿', text: '+3天', price: 1314, previewImg: 'tk_38.png', previewTip1: '星语心愿·双人礼物赠送权', need: 54, has_right: 0 },
        { awardId: 72, id: 5150, type: 'title', icon: 'mp_tmsp', nums: 5, name: '甜蜜双排', text: '+5天', need: 72, has_right: 0 }
      ], // 累计奖励列表
      day_list: {
        20241001: '10月01日',
        20241002: '10月02日',
        20241003: '10月03日',
        20241004: '10月04日',
        20241005: '10月05日',
        20241006: '10月06日',
        20241007: '10月07日'
      }, // 日期列表
      select_date: 20241001, // 激活的日期
      isShowDateList: false, // 是否展示日期列表

      isShowRulesPopup: false, // 规则弹窗
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowRecordsPopup: false, // 抽奖记录弹窗
      isShowSailingComPopup: false, // 抽奖二次确认弹窗
      configSailingComPopup: {
        drawNum: 1,
        drawType: 0,
        isTodayNoTip: false
      },
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      receiveText: null,
      isShowBackpackFull: false, // 背包已满弹窗
      typeBackpackFull: 1,
      isShowBuffPopup: false, // buff弹窗
      isShowRechargeTipPopup: false // 充值提示弹窗
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getHomeDate(true, true)
    this.writeLocalStorage()
    // setTimeout(() => {
      // this.receiveText = '恭喜解锁下一层！奖励更加丰厚！\n触发【翻倍卡】buff，返还寻宝币+20'
    //   this.openReceiveAwardsPopup([
    //     { id: 1, type: 'mic', icon: 'ts_yycg.svga', text: '+11' },
    //     { id: 2, type: 'title', icon: 'mp_tmsp', text: '+11' }
    //   ], true)
    // }, 3000)
  },
  mounted() {
    // if (this.buffStayus == 1) {
    //   this.isShowBuffPopup = true
    // } else if (this.buffStayus == 2) {
      // this.startBuffCountdown(600)
    // }
  },
  beforeDestroy() {
    // 页面切换时关闭定时器
    clearTimeout(this.buffLeaveTimer)
  },
  methods: {
    /**
     * 获取页面数据
     */
    getHomeDate(isUpdateNowLevel, isFirst = false) {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.carouse = res.data.carousel
          this.ticket_nums = Number(res.data.ticket_nums)
          this.recharges = res.data.recharges
          this.spend_nums = res.data.spend_nums
          this.layer_list = res.data.layer_list
          this.layer_list[this.nowLevel].award_list.forEach((e) => {
            if (this.nowRewardIndex == (Number(e.awardId) - Number(this.nowLevel == 1 ? 0 : this.nowLevel == 2 ? 5 : this.nowLevel == 3 ? 11 : null))) {
              this.$set(e, 'isActive', true)
            } else {
              this.$set(e, 'isActive', false)
            }
          })
          this.curr_layer = res.data.curr_layer
          if (isUpdateNowLevel) {
            this.nowLevel = res.data.curr_layer
          }
          this.free_status = res.data.free_status
          this.tot_awards = res.data.tot_awards
          this.day_list = res.data.day_list
          this.select_date = res.data.select_date

          this.buffStayus = res.data.buff_info.status
          if (this.buffStayus == 1 && isFirst) {
            this.isShowBuffPopup = true
          }
          if (this.buffStayus == 2) {
            this.startBuffCountdown(res.data.buff_info.countdown)
          } else {
            this.buffLeating = ''
          }
          this.buffCard = res.data.buff_info.card
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceiveAwardsPopup(msg, isUpdate = true) {
      console.log('获奖弹窗')
      // this.clickClose()
      setTimeout(() => {
        this.configReceiveAwardsPopup = msg
        this.isShowReceiveAwardsPopup = true
        if (isUpdate) {
          this.getHomeDate()
        } else {
          this.dateCk(this.select_date)
        }
      })
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowReceiveAwardsPopup = false
      this.receiveText = null
      this.isShowRulesPopup = false
      this.isShowPreviewPopup = false
      this.isShowRecordsPopup = false
      this.isShowExchangeCountPopup = false
      this.configExchangeCountPopup = {}
      this.isShowBackpackFull = false
      this.isShowSailingComPopup = false
      this.isShowBuffPopup = false
      this.isShowRechargeTipPopup = false
    },
    /**
     * buff倒计时
     */
    startBuffCountdown(seconds) {
      // console.log(seconds)
      if (seconds >= 0) {
        let hours = Math.floor((seconds) / 60 / 60)
        let minutes = Math.floor((seconds - hours * 60 * 60) / 60)
        let remainingSeconds = seconds % 60
        // 自动补0
        const leadingDigit = (num, len = 2, sep = '0') => `${Array(len + 1).join(sep)}${num}`.slice(-len)
        // 更新倒计时元素的内容
        if (hours > 0) {
          this.buffLeating = `${leadingDigit(hours)}:${leadingDigit(minutes)}:${leadingDigit(remainingSeconds)}`
        } else {
          this.buffLeating = `${leadingDigit(minutes)}:${leadingDigit(remainingSeconds)}`
        }
        // 每秒调用自身，直到倒计时完成或者手动停止
        clearTimeout(this.buffLeaveTimer)
        this.buffLeaveTimer = setTimeout(this.startBuffCountdown, 1000, --seconds)
      } else {
        console.log('倒计时结束')
        this.getHomeDate()
      }
    },
    /**
     * 规则弹窗
     */
    rulesBtnCk() {
      console.log('规则弹窗')
      this.isShowRulesPopup = true
    },
    /**
     * 我的记录
     */
    recordBtnCk() {
      console.log('我的记录')
      this.isShowRecordsPopup = true
    },
    /**
     * buff按钮
     */
    buffBtnCk() {
      console.log('buff按钮')
      this.isShowBuffPopup = true
    },
    /**
     * 改变buff卡
     */
    changeBuffCard(sort, type, countdown) {
      this.buffCard = { sort, type }
      this.startBuffCountdown(countdown)
    },
    /**
     * 改变buff状态
     */
    changeBuffStayus(type) {
      this.buffStayus = type
      if (type == 4) {
        setTimeout(() => {
          this.getHomeDate()
          // this.startBuffCountdown(600)
          // this.buffStayus = 2
        }, 2000)
      }
    },
    /**
     * 切换奖池
     */
    changeLevel(index) {
      this.nowLevel = Number(index)
      this.nowRewardIndex = 0
    },
    /**
     * 点击跳转充值
     */
    addDrawTimesBtnCk() {
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
     */
    drawBtnCk(num) {
      if (this.judgeSecondDay()) {
        // this.dealSort([{ icon: 'yb_120_120.png', sort: 2 }])
        if (this.nowLevel <= this.curr_layer && !this.isWheeling) {
          if ((this.free_status && num == 1) || this.ticket_nums >= num) {
            console.log('抽奖', num)
            this.drawApi(num)
          } else {
            this.isShowRechargeTipPopup = true
          }
        }
      }
    },
    /**
     * 抽奖api
     */
    drawApi(num) {
      let type = num == 1 ? (this.free_status ? 1 : 2) : 3
      getPageData({ type: 'sh_treasure_lottery', mark: { layer: this.nowLevel, action_type: type } }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          let msg = res.data.awards
          this.receiveText = res.data.trea_text ? `${res.data.trea_text}\n${res.data.buff_txt}` : `${res.data.buff_txt}`
          // this.openReceiveAwardsPopup(msg)
          this.dealSort(msg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 处理抽奖结果
     */
    dealSort(dealData) {
      let times
      times = (Number(dealData[0].awardId) - Number(this.nowLevel == 1 ? 0 : this.nowLevel == 2 ? 5 : this.nowLevel == 3 ? 11 : null)) - this.nowRewardIndex + this.layer_list[this.nowLevel].award_list.length * 2
      // console.log(times)
      this.poList = dealData
      this.wheelDisc(times, this.nowRewardIndex)
    },
    /**
     * 转动轮盘
     * @times 总转动次数
     * @nowTime 从第几个开始转动/当前第几
     * @sum 计算切换总次数(控制轮盘动画渐慢效果) 默认0
     * @speed 转动时间间隔 默认7ms
     */
    wheelDisc(times, nowTime, sum = 0, speed = 10) {
      this.isWheeling = true
      nowTime++ // 转动次数加1
      sum++ // 已转动次数加1
      // 判断time是否大于8
      nowTime = nowTime > this.layer_list[this.nowLevel].award_list.length ? 1 : nowTime
      this.layer_list[this.nowLevel].award_list.forEach((e) => {
        // e.isActive = false
        this.$set(e, 'isActive', false)
      })
      clearTimeout(this.rollTime)
      // 控制当前闪烁的奖励
      this.layer_list[this.nowLevel].award_list[nowTime - 1].isActive = true
      this.rollTime = setTimeout(() => {
        window.requestAnimationFrame(() => {
          this.wheelDisc(times, nowTime, sum, speed)
        }) // 进行递归动画 这段代码的作用是启动一个动画帧，以便在浏览器中渲染动画效果。动画帧是通过调用requestAnimationFrame()方法实现的，它允许你在动画帧中执行代码，而不是直接设置元素的样式。这样可以确保在渲染过程中不会出现跳帧的情况，从而实现毫秒级的渲染效果。
      }, speed * sum)
      if (sum === times) {
        clearTimeout(this.rollTime) // 清除定时器
        this.nowRewardIndex = nowTime // 定位当前位置
        setTimeout(() => {
          this.isWheeling = false
          this.openReceiveAwardsPopup(this.poList)
        }, 500) // 延迟一秒后再可抽奖(节流),展示奖励弹窗
        console.log('恭喜你抽中了', nowTime)
        return 0
      }
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.previewImg) {
        this.configPreviewPopup = {
          type: item.type,
          img: item.previewImg,
          tip1: item.previewTip1
          // tip2: item.previewTip2
        }
        this.isShowPreviewPopup = true
      }
    },
    /**
     * 日期点击
     */
    dateCk(index) {
      // this.select_date = index
      // console.log(item)
      getPageData({ type: 'sh_treasure_daily', mark: index }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.tot_awards = res.data.tot_awards
          this.day_list = res.data.day_list
          this.select_date = res.data.select_date
          this.spend_nums = res.data.spend_nums
          this.isShowDateList = false
        } else {
          this.$toast(res.errmsg)
        }
      })
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
.treasurePage{
  .drawBox{
    .swipeDiv{
      width: 712px;
      height: 71px;
      background: url('@/pages/nationalDay/assets/mk5_3.png') no-repeat left top/100% 100%;
      margin: 0 auto;
    }
    .awardsArea{
      width: 100%;
      height: 660px;
      position: relative;
      .turntableBg{
        width: 663px;
        height: 652px;
        position: absolute;
        left: 0;
        top: 0;
        &.level1{
          background: url('@/pages/nationalDay/assets/mk5_6.png') no-repeat left top/100% 100%;
        }
        &.level2{
          background: url('@/pages/nationalDay/assets/mk5_7.png') no-repeat left top/100% 100%;
        }
        &.level3{
          background: url('@/pages/nationalDay/assets/mk5_8.png') no-repeat left top/100% 100%;
        }
        .turntableAwardsItem{
          width: 126px;
          height: 126px;
          background: rgba(234, 77, 35, 0.60);
          border-radius: 50%;
          position: absolute;
          z-index: 1;
          &::before{
            content: '';
            width: 110px;
            height: 110px;
            background: #FFFFFF;
            border: 4px solid rgba(255, 211, 115, 1);
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
          }
          &.treaSp{
            &::before{
              content: '';
              background: rgba(181, 80, 35, 1);
              box-shadow: inset 0px 0px 10px 0px rgba(255, 211, 115, 1);
            }
          }
          &.level1{
            &:nth-of-type(1) {
              left: 50%;
              transform: translateX(-50%);
              top: 56px;
            }
            &:nth-of-type(2) {
              right: 70px;
              top: 194px;
            }
            &:nth-of-type(3) {
              right: 138px;
              top: 430px;
            }
            &:nth-of-type(4) {
              left: 138px;
              top: 430px;
            }
            &:nth-of-type(5) {
              left: 70px;
              top: 194px;
            }
          }
          &.level2{
            &:nth-of-type(1) {
              left: 50%;
              transform: translateX(-50%);
              top: 56px;
            }
            &:nth-of-type(2) {
              right: 90px;
              top: 160px;
            }
            &:nth-of-type(3) {
              right: 90px;
              top: 366px;
            }
            &:nth-of-type(4) {
              left: 50%;
              transform: translateX(-50%);
              top: 466px;
            }
            &:nth-of-type(5) {
              left: 90px;
              top: 366px;
            }
            &:nth-of-type(6) {
              left: 90px;
              top: 160px;
            }
          }
          &.level3{
            &:nth-of-type(1) {
              left: 50%;
              transform: translateX(-50%);
              top: 56px;
            }
            &:nth-of-type(2) {
              right: 120px;
              top: 112px;
            }
            &:nth-of-type(3) {
              right: 56px;
              top: 256px;
            }
            &:nth-of-type(4) {
              right: 112px;
              top: 406px;
            }
            &:nth-of-type(5) {
              left: 50%;
              transform: translateX(-50%);
              top: 466px;
            }
            &:nth-of-type(6) {
              left: 112px;
              top: 406px;
            }
            &:nth-of-type(7) {
              left: 56px;
              top: 256px;
            }
            &:nth-of-type(8) {
              left: 120px;
              top: 112px;
            }
          }
          .tai_icon{
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            z-index: 3;
            &.wmsSp{
              width: 80px;
              height: 80px;
              top: 10px;
            }
          }
          .tai_text{
            width: 100px;
            height: 32px;
            background: url('@/pages/nationalDay/assets/mk5_28.png') no-repeat left top/100% 100%;
            font-weight: 500;
            font-size: 20px;
            color: #FFFFFF;
            line-height: 58px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 7px;
            z-index: 4;
            &.smallSp{
              font-size: 16px;
            }
            &.treaSp{
              color: #A94214;
              background: url('@/pages/nationalDay/assets/mk5_27.png') no-repeat left top/100% 100%;
            }
          }
          .tai_preview{
            width: 118px;
            height: 26px;
            background: url('@/pages/nationalDay/assets/mk5_20.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 62px;
            z-index: 5;
          }
          .tai_newMark{
            background: linear-gradient(-52deg, #FF7B47, #F13A16);
            border-radius: 19px 19px 0px 19px;
            padding: 5px 10px 5px 10px;
            font-weight: 500;
            font-size: 22px;
            color: #FFFFFF;
            position: absolute;
            left: -10px;
            top: -10px;
            z-index: 6;
          }
          .tai_priceMark{
            background: linear-gradient(-90deg, #75B9FF, #FF84F8);
            border-radius: 17px;
            font-size: 20px;
            color: #FFFFFF;
            padding: 2px 5px 2px 10px;
            position: absolute;
            right: 0;
            top: -10px;
            z-index: 2;
            img{
              width: 27px;
              height: 20px;
              vertical-align: middle;
            }
          }
          .tai_treaTip{
            width: 224px;
            height: 87px;
            background: url('@/pages/nationalDay/assets/mk5_9.png') no-repeat left top/100% 100%;
            padding: 12px 14px 0px 14px;
            white-space: pre-wrap;
            text-align: center;
            font-weight: 500;
            font-size: 22px;
            color: #FFFFFF;
            line-height: 26px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 130px;
            z-index: 7;
            &.smallSp{
              height: 68px;
              background: url('@/pages/nationalDay/assets/mk5_9_1.png') no-repeat left top/100% 100%;
            }
          }
          .tai_havenCover{
            width: 118px;
            height: 118px;
            background: url('@/pages/nationalDay/assets/mk5_10.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 8;
          }
          .tai_activeCover{
            width: 142px;
            height: 142px;
            background: url('@/pages/nationalDay/assets/mk5_23.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 9;
          }
        }
        .noPoolTip{
          width: 109px;
          height: 54px;
          background: url('@/pages/nationalDay/assets/mk5_18.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 300px;
        }
      }
      .floorArea{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: -10px;
        bottom: 40px;
        .floorItem{
          width: 135px;
          height: 136px;
          background: url('@/pages/nationalDay/assets/mk5_12.png') no-repeat left top/100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 500;
          font-size: 26px;
          color: #AF6C2A;
          padding-right: 5px;
          position: relative;
          &.activeSp{
            background: url('@/pages/nationalDay/assets/mk5_11.png') no-repeat left top/100% 100%;
            color: #FFF39F;
          }
          &:not(:last-child):after{
            content: '';
            width: 24px;
            height: 23px;
            background: url('@/pages/nationalDay/assets/mk5_13.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -10px;
          }
        }
      }
    }
    .leftDrawTimesDiv{
      font-weight: 500;
      font-size: 24px;
      line-height: 40px;
      background: #B55023;
      border-radius: 50px;
      padding: 4px 61px 4px 25px;
      margin: -10px auto 0 auto;
      width: fit-content;
      position: relative;
      span{
        vertical-align: middle;
      }
      img{
        width: 40px;
        height: 40px;
        margin: 0 2px;
      }
      .addDrawTimesBtn{
        width: 50px;
        height: 50px;
        background: url('@/pages/nationalDay/assets/mk5_14.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .drawBtnArea{
      width: 100%;
      height: 220px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .drawBtns{
        display: flex;
        justify-content: center;
        align-items: center;
        .drawOneBtn{
          width: 324px;
          height: 136px;
          background: url('@/pages/nationalDay/assets/mk5_15.png') no-repeat left top/100% 100%;
          font-weight: 400;
          font-size: 24px;
          color: #FFF68F;
          padding: 76px 0px 0 10px;
          text-align: center;
          img{
            width: 34px;
            height: 34px;
            margin: 0 2px;
          }
          &.tenSp{
            background: url('@/pages/nationalDay/assets/mk5_16.png') no-repeat left top/100% 100%;
          }
          &.noActiveSp{
            opacity: 0.6;
          }
        }
        .drawTenBtn{
          width: 324px;
          height: 136px;
          background: url('@/pages/nationalDay/assets/mk5_17.png') no-repeat left top/100% 100%;
          font-weight: 400;
          font-size: 24px;
          color: #FFF68F;
          padding: 76px 0px 0 10px;
          text-align: center;
          img{
            width: 34px;
            height: 34px;
            margin: 0 2px;
          }
          &.noActiveSp{
            opacity: 0.6;
          }
        }
      }
      .drawTip{
        width: 539px;
        height: 84px;
        &.showSp{
          background: url('@/pages/nationalDay/assets/mk5_19.png') no-repeat left top/100% 100%;
        }
      }
    }
    .rulesBtn{
      width: 60px;
      height: 139px;
      background: url('@/pages/nationalDay/assets/mk5_1.png') no-repeat left top/100% 100%;
      position: absolute;
      left: -20px;
      top: 100px;
    }
    .recordsBtn{
      width: 60px;
      height: 139px;
      background: url('@/pages/nationalDay/assets/mk5_2.png') no-repeat left top/100% 100%;
      position: absolute;
      left: -20px;
      top: 260px;
      z-index: 1;
    }
    .rechargeNumsDiv{
      background: #B55023;
      border-radius: 0px 19px 19px 0px;
      padding: 4px 20px 4px 10px;
      font-weight: 400;
      font-size: 24px;
      color: #FFFFFF;
      position: absolute;
      left: 40px;
      top: 190px;
      z-index: 1;
    }
    .buffBtn{
      width: 185px;
      height: 184px;
      background: url('@/pages/nationalDay/assets/mk5_4.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 10px;
      top: 170px;
      z-index: 1;
      &.activeSp{
        background: url('@/pages/nationalDay/assets/mk5_5.png') no-repeat left top/100% 100%;
      }
      .buffText{
        font-weight: bold;
        font-size: 24px;
        color: #F23109;
        line-height: 23px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -12px;
      }
    }
  }
  .progressBox{
    .resetTipBg{
      width: 193px;
      height: 94px;
      background: url('@/pages/nationalDay/assets/mk5_24.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 120px;
      top: -90px;
      z-index: 2;
    }
    .progressTip{
      font-weight: 500;
      font-size: 26px;
      color: #AA4213;
      text-align: center;
    }
    .allUseCoinsDiv{
      font-weight: 500;
      font-size: 28px;
      line-height: 40px;
      color: #FFFFFF;
      margin: 10px auto;
      background: #B55023;
      border-radius: 24px;
      width: fit-content;
      padding: 5px 25px;
      span{
        vertical-align: middle;
      }
      img{
        width: 40px;
        height: 40px;
        margin: 0 2px;
      }
    }
    .rb_dateDiv{
      width: 165px;
      height: 51px;
      background: linear-gradient(-90deg, #4288DF, #4AC0B7);
      border-radius: 0px 26px 26px 0px;
      padding-right: 20px;
      font-weight: bold;
      font-size: 26px;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0px;
      top: 150px;
      z-index: 5;
      .rb_dateListsIcon{
        width: 24px;
        height: 15px;
        position: absolute;
        right: 10px;
        top: 40%;
        transform: translateY(-50%);
        &.statusfalse{
          top: 50%;
          background: url('@/pages/nationalDay/assets/mk5_25.png') no-repeat left top/100% 100%;
        }
        &.statustrue{
          background: url('@/pages/nationalDay/assets/mk5_26.png') no-repeat left top/100% 100%;
        }
      }
    }
    .rb_dateListDiv{
      width: 150px;
      background: #fff;
      border: #4AC0B7 solid 10px;
      border-radius: 0px 0px 20px 20px;
      position: absolute;
      left: 4px;
      top: 190px;
      z-index: 4;
      .rb_dateListItem{
        width: 120px;
        height: 50px;
        margin: 0 auto;
        border-bottom: #CAE5E3 solid 1px;
        text-align: center;
        font-weight: bold;
        line-height: 50px;
        font-size: 26px;
        color: #3A81B8;
      }
    }
  }
}
</style>
