<template>
  <div class='drawPage'>
    <OutBox class="travelBox">
      <div :class="['topBg', `status${scene}`]">
        <div :class="['topPlaceBg', `status${scene}`]"></div>
        <div class="swipeDiv">
          <TextSwipe :swipeList="carouse"></TextSwipe>
        </div>
        <div class="usedMasonryDiv">消费钻石<img :src="IconPath('zs_27_20.png')"/>:&ensp;{{consume_masonry}}</div>
        <div class="leftTravelTimesDiv">剩余游历次数:&ensp;{{travel_num}}</div>
        <div class="serverTravelProgressDiv">
          <div class="serverTravelText" v-html="`全服游历\n5000次`"></div>
          <div class="timesProgress">
            <div :class="['timesProgressPer',all_server_travel_num<5000?'noRadius':null]" :style="`height: ${all_server_travel_num/50}%;`"></div>
            <div class="scaleBg"></div>
            <div class="lightingBg" v-if="is_double_time"></div>
          </div>
        </div>
        <div :class="['vehicleDiv', is_double_time?'doubleBg':null]">
          <div class="doubleTipBg" v-if="is_double_time">
            <div class="travelDoubleLeftingDiv">{{travelDoubleLefting}}</div>
          </div>
        </div>
        <div class="rulesBtn" @click="rulesBtnCk"></div>
        <div class="recordBtn" @click="recordBtnCk"></div>
        <div class="darwBtns">
          <div :class="['drawOneBtn', `status${is_free_status}`]" @click="drawBtnCk(1, is_free_status)"></div>
          <div :class="['drawTenBtn', `status${ten_discount_status}`]" @click="drawBtnCk(10, ten_discount_status)"></div>
          <div :class="['drawFiftyBtn', `status${fifty_discount_status}`]" @click="drawBtnCk(50, fifty_discount_status)"></div>
        </div>
      </div>
      <div class="rewardsArea">
        <div class="rewardsLeftCoverBg"></div>
        <div class="rewardsRightCoverBg"></div>
        <div class="awardsMoveTip"></div>
        <div class="marqueeArea">
          <Marquee :list="marqueeData" />
        </div>
        <div class="rules-text-border">
          <ul>
            <li><span></span>玩家每消费150钻石可获得1次游历次数，每日可免</li>
            <li>费游历1次</li>
            <li><span></span>每当<i>全服游历5000次</i>后，将激活纪念币双倍时刻，</li>
            <li><span></span>为期10分钟，期间获得纪念币为普通模式的<i>2倍</i>，</li>
            <li>并且还有机会获得<i>开放已结束景点</i>的纪念币</li>
          </ul>
        </div>
      </div>
    </OutBox>
    <OutBox class="scenicSpotBox" :title="'title_4.png'">
      <div class="allGetCoinsDiv">累计获得纪念币:&ensp;{{tot_coin_num}}</div>
      <StepProgress :tot_num="tot_coin_num" :tot_list="tot_list" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
      <div class="coinsBg">
        <div class="coinItemBg" v-for="(num,index) in jnb_list" :key="index">
          <div :class="['conItemIcon', `status${index}`, num==0?'noCoin':null]"></div>
          <div :class="['coinItemNumMark', num>0?'havenSp':null]">{{num}}</div>
          <div class="coinItemName">{{index=='1'?'桃源深处纪念币':index=='2'?'绿水青山纪念币':index=='3'?'异域风情纪念币':null}}</div>
        </div>
      </div>
    </OutBox>
    <OutBox class="marketBox" :title="'title_5.png'">
      <div class="marketTip">不同的店铺提供不同的奖励哦~</div>
      <div class="marketsItem" v-for="(item,index) in goods_list" :key="index">
        <div :class="['boothIt', it.price_type.length==3?'bigger':null]" v-for="(it) in item" :key="it.id">
          <div class="boothItAward" @click="previewImgCk(it.award)">
            <div class="boothItAward_icon">
              <PublicImg :imgName="it.award.icon" :imgType="it.award.type"></PublicImg>
            </div>
            <div class="boothItAward_text">{{it.award.text}}</div>
            <div class="boothItAward_price" v-if="it.award.show_price">{{it.award.show_price}}<img :src="IconPath('zs_27_20.png')" /></div>
            <div class="boothItAward_newMark" v-if="it.award.is_new">新</div>
            <div class="boothItAward_preview" v-if="it.award.preview_img"></div>
          </div>
          <div class="boothItText">{{it.limit==-1?'不限购':`限购:${it.now_num}/${it.limit}`}}</div>
          <div :class="['boothItBtn', it.price_type.length==3?'bigger':null, it.has_right!=1?'noEx':null]" @click="exchangeBtnCk(it)">
            <template v-if="it.has_right==1">
              <div v-for="(iit, ii) in it.price_type" :key="ii">
                <span>{{iit.price}}</span>
                <img :src="IconPath(`${iit.id==1?'tysc':iit.id==2?'lsqs':iit.id==3?'yyfq':null}jnb_60_60.png`)" />
              </div>
            </template>
            <template v-else>
              <span>已兑完</span>
            </template>
          </div>
        </div>
      </div>
    </OutBox>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <PreviewPopup v-if="isShowPreviewPopup" :config="configPreviewPopup" @clickClose="clickClose"></PreviewPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <ExchangeCountPopup v-if="isShowExchangeCountPopup" :config="configExchangeCountPopup" :coinsList="jnb_list" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></ExchangeCountPopup>
    <SailingComPopup v-if="isShowSailingComPopup" :config="configSailingComPopup" @drawApi="drawApi" @clickClose="clickClose"></SailingComPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <BackpackFull v-if="isShowBackpackFull" :typeBackpackFull="typeBackpackFull" @clickClose="clickClose"></BackpackFull>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'
import { compareVersions, recharge } from '@/utils/toApp.js'
import TextSwipe from './components/textSwipe.vue'
import Marquee from '@/pages/nationalDay/components/marquee.vue'
import StepProgress from './components/stepProgress.vue'
import RulesPopup from './components/rulesPopup.vue'
import PreviewPopup from './components/previewPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import ExchangeCountPopup from './components/exchangeCountPopup.vue'
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
    RecordsPopup,
    ExchangeCountPopup,
    SailingComPopup,
    BackpackFull
  },
  data() {
    return {
      scene: 1, // 游历状态 1:桃源深处 2:绿水青山 3:异域风情
      is_double_time: false, // 是否为双倍状态
      travelDoubleLefting: '00:00', // 剩余双倍时间
      travelDoubleLeftingTimer: null, // 剩余双倍时间定时器
      carouse: [], // 轮播
      consume_masonry: 0, // 已消费钻石
      travel_num: 0, // 剩余游历次数
      all_server_travel_num: 0, // 全服游历次数
      is_free_status: 1, // 抽1次奖状态 1:正常 2:免费
      ten_discount_status: 1, // 抽10次奖状态 1:正常 2:5折
      fifty_discount_status: 1, // 抽50次奖状态 1:正常 2:6折
      marqueeData: [
        { icon: 'ljs_120_120.png', text: '1~20', name: '绿晶石', type: 'tool' },
        { icon: 'zjs_120_120.png', text: '+1', name: '紫晶石', type: 'tool' },
        { icon: 'cbt_120_120.png', text: '+1', name: '藏宝图', type: 'tool' },
        { icon: 'tyscjnb_120_120.png', text: '1~2', name: '纪念币', type: 'tool' },
        { icon: 'lsqsjnb_120_120.png', text: '1~2', name: '纪念币', type: 'tool' },
        { icon: 'yyfqjnb_120_120.png', text: '1~2', name: '纪念币', type: 'tool' },
        { icon: 'byg_120_120.png', text: '+1', name: '戒指', type: 'ring', price: '99' },
        { icon: 'xmyl_120_120.png', text: '+1天', name: '公屏气泡', type: 'chat_bubble_pub' },
        { icon: 'hdfclwsjzsq_120_120.png', text: '+1天', name: '随机赠送权', type: 'tool' },
        { icon: 'jz_wqyz.svga', text: '+1', name: '戒指', type: 'ring', price: '9999' },
        { icon: 'sjjndj_120_120.png', text: '+1', name: '随机技能道具', type: 'tool' }
      ], // 奖励走马灯列表
      tot_coin_num: 0, // 累计获得纪念币
      tot_list: [
        { id: 1, need_num: 0, icon: 'mk5_7.png', award: { id: 1, type: 'tool', text: '+1', icon: 'scslwzq_120_120.png' }, has_right: 0 },
        { id: 2, need_num: 3, icon: 'mk5_8.png', award: { id: 2, type: 'tool', text: '+15', icon: 'zjs_120_120.png' }, has_right: 0 },
        { id: 3, need_num: 8, icon: 'mk5_9.png', award: { id: 3, type: 'tool', text: '+3', icon: 'sjlb_120_120.png' }, has_right: 0 },
        { id: 4, need_num: 20, icon: 'mk5_10.png', award: { id: 4, type: 'tool', text: '+1', icon: 'scwsllzq_120_120.png' }, has_right: 0 },
        { id: 5, need_num: 40, icon: 'mk5_10.png', award: { id: 5, type: 'tool', text: '+300', icon: 'fsjc_120_120.png' }, has_right: 0 },
        { id: 6, need_num: 70, icon: 'mk5_10.png', award: { id: 6, type: 'tool', text: '+10', icon: 'cbt_120_120.png' }, has_right: 0 },
        { id: 7, need_num: 120, icon: 'mk5_10.png', award: { id: 7, type: 'tool', text: '+15', icon: 'cbt_120_120.png' }, has_right: 0 },
        { id: 8, need_num: 250, icon: 'mk5_10.png', award: { id: 8, type: 'tool', text: '+1', icon: 'hjcbt_120_120.png' }, has_right: 0 }
      ], // 累计奖励列表
      jnb_list: {
        1: 0, // 桃源深处
        2: 0, // 绿水青山
        3: 0 // 异域风情
      }, // 纪念币列表
      goods_list: {
        1: [
          { id: 11, award: { id: 1, type: 'tool', text: '+1', icon: 'hjcbt_120_120.png' }, limit: 5, now_num: 0, price_type: [{ id: 1, price: 35 }, { id: 2, price: 35 }, { id: 3, price: 35 }], has_right: 1 },
          { id: 12, award: { id: 1, type: 'ring', text: '戒指+1', icon: 'jz_ydss.svga', show_price: '20999' }, limit: 3, now_num: 0, price_type: [{ id: 1, price: 80 }, { id: 2, price: 80 }, { id: 3, price: 80 }], has_right: 1 }
        ],
        2: [
          { id: 21, award: { id: 1, type: 'ring', text: '戒指+1', icon: 'ryjz_120_120.png', show_price: '520' }, limit: 30, now_num: 0, price_type: [{ id: 1, price: 8 }], has_right: 1 },
          { id: 22, award: { id: 1, type: 'pst_privilege', text: '赠送权+3天', icon: 'fhym_120_120.png', show_price: '1888' }, limit: -1, now_num: 0, price_type: [{ id: 1, price: 20 }], has_right: 1 },
          { id: 23, award: { id: 1, type: 'ring', text: '戒指+1', icon: 'jz_jlc.svga', show_price: '5200', is_new: true }, limit: -1, now_num: 0, price_type: [{ id: 1, price: 70 }], has_right: 1 }
        ],
        3: [
          { id: 31, award: { id: 1, type: 'CP_card', text: 'CP资料卡+3天', icon: 'wrmm_120_120.png', preview_img: 'cp_card_wrmm.svga' }, limit: -1, now_num: 0, price_type: [{ id: 2, price: 8 }], has_right: 1 },
          { id: 32, award: { id: 1, type: 'chat_bubble', text: '私聊气泡+7天', icon: 'qp_yybf' }, limit: -1, now_num: 0, price_type: [{ id: 2, price: 30 }], has_right: 1 },
          { id: 33, award: { id: 1, type: 'tool', text: '+5', icon: 'lhq_120_120.png' }, limit: 10, now_num: 0, price_type: [{ id: 2, price: 50 }], has_right: 1 }
        ],
        4: [
          { id: 41, award: { id: 1, type: 'tool', text: '+60', icon: 'fsjc_120_120.png' }, limit: -1, now_num: 0, price_type: [{ id: 3, price: 3 }], has_right: 1 },
          { id: 42, award: { id: 1, type: 'tool', text: '+50', icon: 'ljs_120_120.png' }, limit: 30, now_num: 0, price_type: [{ id: 3, price: 25 }], has_right: 1 },
          { id: 43, award: { id: 1, type: 'tool', text: '+10', icon: 'cbt_120_120.png' }, limit: 30, now_num: 0, price_type: [{ id: 3, price: 35 }], has_right: 1 }
        ]
      }, // 集市列表

      isShowRulesPopup: false, // 规则弹窗
      isShowPreviewPopup: false, // 预览弹窗
      configPreviewPopup: {},
      isShowRecordsPopup: false, // 抽奖记录弹窗
      isShowExchangeCountPopup: false, // 兑换(计算数量)弹窗
      configExchangeCountPopup: {},
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
    // this.startphysicalCountdown(600)
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
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.scene = res.data.scene
          this.consume_masonry = res.data.consume_masonry
          this.travel_num = res.data.travel_num
          this.all_server_travel_num = res.data.all_server_travel_num
          this.is_double_time = res.data.is_double_time
          if (this.is_double_time && res.data.reset_double_time > 0) {
            this.startphysicalCountdown(res.data.reset_double_time)
          }
          this.is_free_status = res.data.is_free_status
          this.ten_discount_status = res.data.ten_discount_status
          this.fifty_discount_status = res.data.fifty_discount_status
          this.carouse = res.data.rare_list
          this.tot_coin_num = res.data.tot_coin_num
          this.tot_list = res.data.tot_list
          this.jnb_list = res.data.jnb_list
          this.goods_list = res.data.goods_list
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
      this.isShowRecordsPopup = false
      this.isShowExchangeCountPopup = false
      this.configExchangeCountPopup = {}
      this.isShowBackpackFull = false
      this.isShowSailingComPopup = false
    },
    /**
     * 双倍状态倒计时
     */
    startphysicalCountdown(seconds) {
      if (seconds >= 0) {
        let minutes = Math.floor((seconds) / 60)
        let remainingSeconds = seconds % 60
        // 自动补0
        const leadingDigit = (num, len = 2, sep = '0') => `${Array(len + 1).join(sep)}${num}`.slice(-len)
        // 更新倒计时元素的内容
        this.travelDoubleLefting = `${leadingDigit(minutes)}:${leadingDigit(remainingSeconds)}`
        // 每秒调用自身，直到倒计时完成或者手动停止
        clearTimeout(this.travelDoubleLeftingTimer)
        this.travelDoubleLeftingTimer = setTimeout(this.startphysicalCountdown, 1000, --seconds)
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
     * @param {Number} num 抽奖次数 1:抽1次 10:抽10次 50:抽50次
     * @param {Number} type 抽奖类型/免费/折扣
     */
    drawBtnCk(num, type) {
      if (this.judgeSecondDay()) {
        console.log('抽奖', num, type)
        // if (this.travel_num >= num || (type == 2 && num == 1)) {
          this.drawApi(num, type)
        // } else {
          // this.$toast('剩余游历次数不足')
        // }
        // this.configSailingComPopup = {
        //   drawNum: num,
        //   drawType: type,
        //   isTodayNoTip: localStorage.getItem('isTodayNoTip') || 0
        // }
        // if (this.configSailingComPopup.isTodayNoTip == 1) {
        //   this.drawApi(num, type)
        // } else {
        //   this.isShowSailingComPopup = true
        // }
      }
    },
    /**
     * 抽奖api
     */
    drawApi(num, type) {
      console.log(num, type)
      getPageData({ type: 'travel_rl_lottery', mark: { num, use_tool: type, is_double: this.is_double_time ? 2 : 1 } }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          let msg = res.data
          this.openReceiveAwardsPopup(msg)
        } else {
          this.$toast(res.errmsg)
          this.getHomeDate()
        }
      })
    },
    /**
     * 点击预览
     */
    previewImgCk(item) {
      if (item.preview_img && item.type == 'CP_card') {
        this.configPreviewPopup = {
          type: item.type,
          img: item.preview_img,
          tip1: '温柔弥漫·CP资料卡'
          // tip2: item.previewTipe2
        }
        this.isShowPreviewPopup = true
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk(item) {
      if (item.has_right == 1) {
        console.log(item)
        // console.log(this.jnb_list)
        for (let it of item.price_type) {
          if (this.jnb_list[it.id] < it.price) {
            return this.$toast('指定纪念币不足')
          }
        }
        console.log('兑换')
        this.isShowExchangeCountPopup = true
        this.configExchangeCountPopup = item
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
  .travelBox{
    width: 750px;
    border-image-source: none;
    margin-top: 40px;
    padding: 0;
    position: relative;
    .topBg{
      width: 750px;
      height: 1120px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      &.status1{
        background: url('@/pages/nationalDay/assets/mk4_5.png') no-repeat left bottom/100%;
      }
      &.status2{
        background: url('@/pages/nationalDay/assets/mk4_6.png') no-repeat left bottom/100%;
      }
      &.status3{
        background: url('@/pages/nationalDay/assets/mk4_7.png') no-repeat left bottom/100%;
      }
      .topPlaceBg{
        width: 720px;
        height: 250px;
        margin: 0 auto 0 auto;
        &.status1{
          background: url('@/pages/nationalDay/assets/mk4_1.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/nationalDay/assets/mk4_2.png') no-repeat left top/100% 100%;
        }
        &.status3{
          background: url('@/pages/nationalDay/assets/mk4_3.png') no-repeat left top/100% 100%;
        }
      }
      .swipeDiv{
        width: 750px;
        height: 71px;
        background: url('@/pages/nationalDay/assets/mk4_4.png') no-repeat left top/100% 100%;
        margin: 0 auto;
      }
      .usedMasonryDiv{
        background: rgba(147, 57, 17, 0.7);
        border-radius: 0px 24px 24px 0px;
        padding: 8px 20px 5px 40px;
        font-weight: 500;
        font-size: 24px;
        position: absolute;
        top: 340px;
        img{
          width: 27px;
          height: 20px;
          margin: 0 5px;
        }
      }
      .leftTravelTimesDiv{
        background: rgba(147, 57, 17, 0.7);
        border-radius: 24px 0px 0px 24px;
        padding: 8px 40px 5px 20px;
        font-weight: 500;
        font-size: 24px;
        position: absolute;
        right: 0;
        top: 340px;
      }
      .serverTravelProgressDiv{
        width: 94px;
        height: 94px;
        background: rgba(147, 57, 17, 0.7);
        border-radius: 50%;
        position: absolute;
        left: 40px;
        top: 700px;
        .serverTravelText{
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          line-height: 23px;
          white-space: pre-wrap;
          text-align: center;
          margin-top: 36px;
        }
        .timesProgress{
          width: 32px;
          height: 250px;
          background: #C9C4C2;
          border-radius: 12px;
          border: 4px solid #FFFFFF;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 70px;
          .timesProgressPer{
            width: 24px;
            height: 242px;
            background: linear-gradient(90deg, #FFB22D, #E75A29);
            border-radius: 12px;
            position: absolute;
            bottom: 0;
            &.noRadius{
              border-radius: 0px 0px 12px 12px;
            }
          }
          .scaleBg{
            width: 94px;
            height: 189px;
            background: url('@/pages/nationalDay/assets/mk4_30.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
          .lightingBg{
            width: 110px;
            height: 366px;
            background: url('@/pages/nationalDay/assets/mk4_25.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            top: 66%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .vehicleDiv{
        width: 375px;
        height: 577px;
        background: url('@/pages/nationalDay/assets/mk4_8.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 330px;
        z-index: -1;
        &.doubleBg{
          background: url('@/pages/nationalDay/assets/mk4_9.png') no-repeat left top/100% 100%;
        }
        .doubleTipBg{
          width: 750px;
          height: 607px;
          background: url('@/pages/nationalDay/assets/mk4_26.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0px;
          .travelDoubleLeftingDiv{
            font-weight: 800;
            font-size: 28px;
            color: #F24711;
            line-height: 40px;
            text-shadow: 3px 0 #fff,-3px 0 #fff,0 3px #fff,0 -3px #fff,3px 3px #fff,-3px -3px #fff,3px -3px #fff,-3px 3px #fff;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 110px;
          }
        }
      }
      .rulesBtn{
        width: 56px;
        height: 56px;
        background: url('@/pages/nationalDay/assets/mk2_2.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 20px;
        top: 400px;
      }
      .recordBtn{
        width: 165px;
        height: 78px;
        background: url('@/pages/nationalDay/assets/mk4_27.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 300px;
      }
      .darwBtns{
        display: flex;
        justify-content: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 160px;
        .drawOneBtn{
          width: 245px;
          height: 115px;
          position: relative;
          &.status1{
            background: url('@/pages/nationalDay/assets/mk4_10.png') no-repeat left top/100% 100%;
          }
          &.status2{
            background: url('@/pages/nationalDay/assets/mk4_10_1.png') no-repeat left top/100% 100%;
          }
        }
        .drawTenBtn{
          width: 245px;
          height: 115px;
          position: relative;
          &.status1{
            background: url('@/pages/nationalDay/assets/mk4_11.png') no-repeat left top/100% 100%;
          }
          &.status2{
            background: url('@/pages/nationalDay/assets/mk4_11_1.png') no-repeat left top/100% 100%;
          }
        }
        .drawFiftyBtn{
          width: 245px;
          height: 115px;
          position: relative;
          &.status1{
            background: url('@/pages/nationalDay/assets/mk4_12.png') no-repeat left top/100% 100%;
          }
          &.status2{
            background: url('@/pages/nationalDay/assets/mk4_12_1.png') no-repeat left top/100% 100%;
          }
        }
      }
    }
    .rewardsArea{
      width: 750px;
      height: 532px;
      background: rgba(252, 238, 194, 0.7);
      margin: -140px auto 0 auto;
      padding: 20px 0 0 0;
      position: relative;
      z-index: 2;
      .rewardsLeftCoverBg{
        width: 46px;
        height: 204px;
        background: url('@/pages/nationalDay/assets/mk4_14.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 0;
        top: 50px;
        z-index: 2;
      }
      .rewardsRightCoverBg{
        width: 46px;
        height: 204px;
        background: url('@/pages/nationalDay/assets/mk4_15.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0;
        top: 50px;
        z-index: 2;
      }
      .awardsMoveTip{
        width: 560px;
        height: 33px;
        background: url('@/pages/nationalDay/assets/mk4_13.png') no-repeat left top/100% 100%;
        margin: 0px auto 0 auto;
      }
      .marqueeArea{
        height: 210px;
      }
    }
  }
  .scenicSpotBox{
    .allGetCoinsDiv{
      font-weight: 500;
      font-size: 28px;
      color: #FFFFFF;
      margin: 10px auto;
      background: #C94A32;
      border-radius: 24px;
      width: fit-content;
      padding: 5px 45px;
    }
    .coinsBg{
      width: 656px;
      height: 274px;
      background: url('@/pages/nationalDay/assets/mk4_21.png') no-repeat left top/100% 100%;
      margin: 0px auto 20px auto;
      padding: 20px 40px 0 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .coinItemBg{
        width: 110px;
        height: 110px;
        background: linear-gradient(0deg, #F7B143, #B6603A);
        border-radius: 20px;
        border: 4px solid #F9CA5B;
        margin: 0 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .conItemIcon{
          width: 100px;
          height: 100px;
          &.status1{
            background: url('@/pages/nationalDay/assets/tyscjnb_120_120.png') no-repeat left top/100% 100%;
          }
          &.status2{
            background: url('@/pages/nationalDay/assets/lsqsjnb_120_120.png') no-repeat left top/100% 100%;
          }
          &.status3{
            background: url('@/pages/nationalDay/assets/yyfqjnb_120_120.png') no-repeat left top/100% 100%;
          }
          &.noCoin{
            opacity: 0.6;
          }
        }
        .coinItemNumMark{
          background: #ACACAC;
          border-radius: 16px;
          padding: 2px 20px;
          font-weight: bold;
          font-size: 24px;
          color: #FFFFFF;
          position: absolute;
          right: 0;
          top: 0;
          transform: translate(30%, -50%);
          &.havenSp{
            background: #60AFB9;
          }
        }
        .coinItemName{
          font-weight: bold;
          font-size: 24px;
          color: #972A04;
          line-height: 36px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -50px;
        }
      }
    }
  }
  .marketBox{
    width: 750px;
    height: 1767px;
    border-image-source: none;
    background: url('@/pages/nationalDay/assets/mk4_22.png') no-repeat left top/100% 100%;
    padding-top: 96px;
    position: relative;
    .marketTip{
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      line-height: 40px;
      text-align: center;
      margin: 0px auto 0 auto;
    }
    .marketsItem{
      width: 100%;
      height: 310px;
      margin: 80px auto 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .boothIt{
        width: 208px;
        height: 282px;
        background: url('@/pages/nationalDay/assets/mk4_24.png') no-repeat left top/100% 100%;
        margin: 0 5px;
        position: relative;
        &.bigger{
          width: 263px;
          height: 282px;
          background: url('@/pages/nationalDay/assets/mk4_23.png') no-repeat left top/100% 100%;
        }
        .boothItAward{
          width: 128px;
          height: 128px;
          background: linear-gradient(0deg, #FFE896, #DE9240);
          border-radius: 20px;
          border: 4px solid #F8D57F;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 40px;
          z-index: 1;
          .boothItAward_icon{
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0px;
            z-index: -1;
          }
          .boothItAward_text{
            width: 120px;
            height: 32px;
            background: #994E26;
            border-radius: 0px 0px 20px 20px;
            font-weight: 500;
            font-size: 18px;
            color: #FFE179;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            bottom: 0;
          }
          .boothItAward_price{
            background: linear-gradient(-90deg, #75B9FF, #FF84F8);
            border-radius: 17px;
            font-weight: 500;
            font-size: 20px;
            color: #FFFFFF;
            padding: 5px 0px 5px 10px;
            position: absolute;
            right: -10px;
            top: -16px;
            img{
              width: 27px;
              height: 20px;
              margin: 0 5px;
            }
          }
          .boothItAward_newMark{
            background: linear-gradient(-52deg, #FF7B47, #F13A16);
            border-radius: 19px 19px 0px 19px;
            padding: 5px 10px 5px 10px;
            font-weight: 500;
            font-size: 22px;
            color: #FFFFFF;
            position: absolute;
            left: -10px;
            top: -14px;
          }
          .boothItAward_preview{
            width: 120px;
            height: 26px;
            background: url('@/pages/nationalDay/assets/mk4_29.png') no-repeat left top/100% 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 32px;
          }
        }
        .boothItText{
          font-weight: 500;
          font-size: 20px;
          color: #A94214;
          line-height: 40px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 170px;
        }
        .boothItBtn{
          background: linear-gradient(0deg, #369EA7, #8CE7BB);
          border-radius: 27px;
          border: 2px solid #FFFFFF;
          // padding: 4px 10px;
          width: 120px;
          height: 50px;
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 30px;
          &.bigger{
            width: 220px;
          }
          &.noEx{
            background: linear-gradient(0deg, #9D9D9D, #E7E7E7);
            border-radius: 27px;
            border: 2px solid #FFFFFF;
            font-weight: 500;
            font-size: 24px;
            color: #FFFFFF;
          }
          span{
            vertical-align: middle;
          }
          img{
            width: 35px;
            height: 35px;
            margin: 0 2px 0 0;
          }
        }
      }
    }
  }
}
</style>
