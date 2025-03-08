<template>
  <div class="storeCompo">
    <OutBox class="stockBox" :bottom="false">
      <div class="stockText">{{stockUpdateLefting}}<span>后更新全服库存</span></div>
      <div class="stockArea">
        <div class="stockItem" v-for="(item) in inventory_list" :key="item.id">
          <div class="iconImg">
            <PublicImg :imgName="item.award.icon" :imgType="item.award.type"></PublicImg>
          </div>
          <div class="stockItemText">{{item.award.text}}</div>
          <div :class="['priceMark', `status${item.price_type}`]">
            <span>{{item.show_price}}</span>
            <img class="ybMark" v-if="item.price_type == 'gamegold'" :src="IconPath('yb_43_27.png')" />
            <img class="zsMark" v-if="item.price_type == 'masonry'" :src="IconPath('zs_27_20.png')" />
          </div>
          <div :class="['stockItemNum', item.reset_num==0?'noNum':null]">库存:&ensp;{{item.reset_num}}</div>
        </div>
      </div>
    </OutBox>
    <div class="rulesDiv" @click="rulesDivCk"></div>
    <div class="updateNowDiv" @click="updateNowDivCk"></div>
    <OutBox class="storeBox">
      <div class="textSwipeArea">
        <TextSwipe :swipeList="swipeList"></TextSwipe>
      </div>
      <div class="coinArea">
        <div class="coinItem" v-for="(item,index) in property" :key="index">
          <div :class="['coinIcon', `icon${index}`]"></div>
          <div class="coinText">{{index=='masonry'?item:formatNumber(item)}}</div>
          <div class="toRecharge" v-if="index=='masonry'" @click="toRechargeCk"></div>
        </div>
      </div>
      <div class="turnCardArea">
        <TurnCard :gift_list="gift_list" :stockUpdateLefting="stockUpdateLefting" @buyFn="buyFn" @getHomePage="getHomePage" @openTaskPopup="openTaskPopup" @openReceiveAwardsPopup="openReceiveAwardsPopup"></TurnCard>
      </div>
      <div class="axialArea">
        <div class="dollDiv">
          <div class="dollDiscourse">
            <PublicImg :imgName="`yqkh_ddsh0${mascot_status}.svga`" :loop="1"></PublicImg>
          </div>
        </div>
        <div class="recordBtn" @click="recordBtnCk"></div>
        <div :class="['refreshBtn', refresh_num==200?'status2':refresh_price==0?'status0':'status1']" @click="refreshBtnCk">
          <div class="refreshPrice" v-if="refresh_num<200&&refresh_price>0">{{refresh_price}}</div>
          <div class="refreshNum">今日已刷新：{{refresh_num}}</div>
        </div>
      </div>
      <div class="rules-text-border">
        <ul>
          <li><span></span>玩家翻开卡片可显示随机商品和随机折扣后价格，</li>
          <li>每次翻出的商品仅能购买1次</li>
          <li><span></span>每日可免费刷新三次全部商品列表，后续第4-20</li>
          <li>次刷新需<i>消费29钻</i>，第21-50次需<i>消费59钻</i>，第</li>
          <li>51次-200次需<i>消费99钻，200次为每日刷新上限</i>。</li>
          <li>刷新后将损失当前未购买商品的购买机会，请选择</li>
          <li>合适的刷新时机！</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="totalBox" :title="'title_4.png'">
      <div class="allGetCoinsDiv">累计消耗钻石:&ensp;{{tot_consume}}</div>
      <StepProgress :tot_num="tot_consume" :tot_list="tot_consume_list" @openReceiveAwardsPopup="openReceiveAwardsPopup"></StepProgress>
    </OutBox>

    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <RefreshPopup v-if="isShowRefreshPopup" :refresh_price="refresh_price" :gift_list="gift_list" @refreshfn="refreshfn" @clickClose="clickClose"></RefreshPopup>
    <BuyPopup v-if="isShowBuyPopup" :configBuyPopup="configBuyPopup" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></BuyPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
    <TaskPopup v-if="isShowTaskPopup" :config="configTaskPopup" @toRechargeCk="toRechargeCk" @clickClose="clickClose"></TaskPopup>
  </div>
</template>

<script>
import { getPageData } from '@/api/index.js'
import TextSwipe from './components/textSwipe.vue'
import TurnCard from './components/turnCard.vue'
import StepProgress from './components/stepProgress.vue'
import RulesPopup from './components/rulesPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import { recharge, diamondRechargePart } from '@/utils/toApp'
import RefreshPopup from './components/refreshPopup.vue'
import BuyPopup from './components/buyPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'
import TaskPopup from './components/taskPopup.vue'

export default {
  name: 'discountStore',
  props: [],
  components: {
    TextSwipe,
    TurnCard,
    StepProgress,
    RulesPopup,
    RecordsPopup,
    RefreshPopup,
    BuyPopup,
    ReceiveAwardsPopup,
    TaskPopup
  },
  data() {
    return {
      stockUpdateLefting: '',
      stockUpdateTimer: undefined,
      inventory_list: [], // 库存列表
      swipeList: [], // 文字轮播
      property: {
        gamegold: 0,
        masonry: 0
      }, // 货币
      gift_list: [
        { id: 1, is_flip: false },
        { id: 2, is_flip: false },
        { id: 3, is_flip: false },
        { id: 4, is_flip: false },
        { id: 5, is_flip: false },
        { id: 6, is_flip: false }
      ],
      mascot_status: 1, // 吉祥物状态
      refresh_price: 0, // 刷新钻石所需数量
      refresh_num: 0, // 刷新次数
      tot_consume: 0, // 累计消耗寻宝币
      tot_consume_list: [
        { id: 1, need_num: 300, award: { id: 2, type: 'tool', nums: 1, name: '绿晶石', icon: 'ljs_120_120.png', text: '+1' }, has_right: 0 },
        { id: 2, need_num: 900, award: { id: 157, type: 'pst_privilege', nums: 5, name: '拍立得', icon: 'pld_120_120.png', text: '+5天', show_price: 99 }, has_right: 0 },
        { id: 3, need_num: 3000, award: { id: 0, type: 'luck_key', nums: 1, name: '钥匙', icon: 'xyys_120_120.png', text: '+1' }, has_right: 0 },
        { id: 4, need_num: 8000, award: { id: 53, type: 'costume', nums: 7, name: '欢乐牧场', icon: 'hlmc_120_120.png', text: '+7天' }, has_right: 0 },
        { id: 5, need_num: 15000, award: { id: 0, type: 'pretty_card', nums: 20, name: '靓号券', icon: 'lhq_120_120.png', text: '+20' }, has_right: 0 },
        { id: 6, need_num: 23000, award: { id: 118, type: 'pst_privilege', nums: 5, name: '星河相遇', icon: 'xhxy_120_120.png', text: '+5天', show_price: 2888 }, has_right: 0 },
        { id: 7, need_num: 35000, award: { id: 15, type: 'ring', nums: 1, name: '挚爱一生', icon: 'jz_zays.svga', text: '+1', show_price: 15999 }, has_right: 0 },
        { id: 8, need_num: 52000, award: { id: 159, type: 'tool', nums: 1, name: '黄金藏宝图', icon: 'hjcbt_120_120.png', text: '+1' }, has_right: 0 }
      ], // 累计奖励列表
      isShowRulesPopup: false, // 规则说明弹窗
      isShowRecordsPopup: false, // 购买记录弹窗
      isShowRefreshPopup: false, // 刷新弹窗
      isShowBuyPopup: false, // 购买弹窗
      configBuyPopup: {},
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: [],
      isShowTaskPopup: false, // 任务详情弹窗
      configTaskPopup: 0
    }
  },
  created() {
    this.writeLocalStorage()
    this.getHomePage()
    // this.stockUpdateCountdown(10000)
  },
  mounted() {
    // this.openReceiveAwardsPopup([
    //   { id: 1, type: 'mic', icon: 'ts_yycg.svga', text: '+11' },
    //   { id: 2, type: 'title', icon: 'mp_tmsp', text: '+11', is_rebate: true }
    // ], true)
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取页面信息
     */
    getHomePage() {
      getPageData({ type: 'tab', mark: 'm4' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          if (res.data.inventory_refresh_time >= 0) {
            this.stockUpdateCountdown(res.data.inventory_refresh_time)
          }
          this.inventory_list = res.data.inventory_list

          this.swipeList = res.data.discount_list
          this.property = res.data.property
          this.gift_list = res.data.gift_list
          this.mascot_status = res.data.mascot_status
          this.refresh_price = res.data.refresh_price
          this.refresh_num = res.data.refresh_num
          this.tot_consume = res.data.tot_consume
          this.tot_consume_list = res.data.tot_consume_list
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 更新吉祥物状态
     */
    // mascotStatusUpdate(status) {
    //   this.mascot_status = status
    // },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowRulesPopup = false
      this.isShowRecordsPopup = false
      this.isShowRefreshPopup = false
      this.isShowBuyPopup = false
      this.isShowReceiveAwardsPopup = false
      this.isShowTaskPopup = false
    },
    /**
     * 库存刷新倒计时
     */
    stockUpdateCountdown(seconds) {
      if (seconds >= 0) {
        let hours = Math.floor(seconds / 60 / 60)
        let minutes = Math.floor((seconds - hours * 60 * 60) / 60)
        let remainingSeconds = seconds % 60
        // 自动补0
        const leadingDigit = (num, len = 2, sep = '0') => `${Array(len + 1).join(sep)}${num}`.slice(-len)
        // 更新倒计时元素的内容
        this.stockUpdateLefting = leadingDigit(hours) + ':' + leadingDigit(minutes) + ':' + leadingDigit(remainingSeconds)
        // 每秒调用自身，直到倒计时完成或者手动停止
        clearTimeout(this.stockUpdateTimer)
        this.stockUpdateTimer = setTimeout(this.stockUpdateCountdown, 1000, --seconds)
      } else {
        console.log('倒计时结束')
        this.getHomePage()
      }
    },
    /**
     * 超过万保留两位小数
     */
    formatNumber(num) {
      // console.log(Math.floor(Number(num) / 100))
      if (Number(num) >= 10000) {
        return (Math.floor(Number(num) / 100) / 100).toFixed(2) + '万'
      }
      return Number(num)
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
     * 点击规则说明弹窗
     */
    rulesDivCk() {
      console.log('规则说明弹窗')
      this.isShowRulesPopup = true
    },
    /**
     * 立即刷新
     */
    updateNowDivCk() {
      console.log('立即刷新')
      this.getHomePage()
    },
    /**
     * 跳转充值页面
     */
    toRechargeCk() {
      console.log('跳转充值页面')
      recharge(this.hiddenFn())
    },
    // 监听页面呼出回调函数（监听充值完成返回活动页面并刷新）
    hiddenFn() {
      if (document.hidden) {
        // console.log('挂起');
        // 页面被挂起
      } else {
        // 页面呼出
        this.getHomePage()
        document.removeEventListener('visibilitychange', this.hiddenFn)
      }
    },
    /**
     * 执行购买前获得代金券信息
     */
    buyFn(item) {
      console.log(item)
      getPageData({ type: 'carnival_trader_buy_details', mark: item.id }).then((res) => {
        if (res.errno == 0) {
          this.configBuyPopup = res.data
          this.isShowBuyPopup = true
        } else if (res.errno == -3) {
          this.$toast(res.errmsg)
          console.log('跳转充值半屏')
          diamondRechargePart(item.price)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 点击购买记录弹窗
     */
    recordBtnCk() {
      console.log('购买记录弹窗')
      this.isShowRecordsPopup = true
    },
    /**
     * 点击刷新
     */
    refreshBtnCk() {
      let isRefreshJudeg = false
      for (let it of this.gift_list) {
        // console.log(it.is_flip)
        if (it.is_flip) {
          isRefreshJudeg = true
          break
        }
      }
      if (isRefreshJudeg) {
        console.log(this.refresh_price)
        if (this.refresh_num < 200) {
          if (this.refresh_price == 0) {
            if (this.judgeSecondDay()) {
              this.isShowRefreshPopup = true
            }
          } else {
            // 判断弹窗类型
            let popupType = 'A'
            for (let it of this.gift_list) {
              if (it.task_id != 0) {
                popupType = 'B'
                break
              }
            }
            if (this.refresh_price > localStorage.getItem('lastRefreshPrice')) {
              localStorage.setItem('isTodayTipA', false)
              localStorage.setItem('isTodayTipB', false)
              this.isShowRefreshPopup = true
            } else {
              if (localStorage.getItem(`isTodayTip${popupType}`) == 'true') {
                this.refreshfn()
              } else {
                this.isShowRefreshPopup = true
              }
            }
          }
        }
      } else {
        this.$toast('当前卡片未开启，无需刷新')
      }
    },
    /**
     * 埋入进此页面日期
     */
    writeLocalStorage() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      if (JSON.stringify(formattedTime) != localStorage.getItem('enterDate')) {
        localStorage.setItem('isTodayTipA', false)
        localStorage.setItem('isTodayTipB', false)
        localStorage.setItem('lastRefreshPrice', 0)
        localStorage.setItem('enterDate', JSON.stringify(formattedTime))
      }
    },
    /**
     * 判断是否是今日
     */
    judgeSecondDay() {
      let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false }
      let formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date()).replace(/[^0-9]/g, '')
      // console.log(JSON.stringify(formattedTime))
      // console.log(localStorage.getItem('enterDate'))
      if (JSON.stringify(formattedTime) == localStorage.getItem('enterDate')) {
        return true
      }
      this.$toast('页面信息已变化，请刷新页面')
      setTimeout(() => {
        localStorage.setItem('isTodayTipA', false)
        localStorage.setItem('isTodayTipB', false)
        localStorage.setItem('lastRefreshPrice', 0)
        // 强制刷新
        window.location.reload()
      })
      return false
    },
    /**
     * 执行刷新
     */
    refreshfn() {
      getPageData({ type: 'carnival_trader_refresh' }).then((res) => {
        if (res.errno == 0) {
          localStorage.setItem('lastRefreshPrice', this.refresh_price)
          this.clickClose()
          this.getHomePage()
        } else if (res.errno == -3) {
          this.$toast(res.errmsg)
          console.log('跳转充值半屏')
          diamondRechargePart(25)
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 打开任务弹窗
     */
    openTaskPopup(task_id) {
      this.isShowTaskPopup = true
      this.configTaskPopup = task_id
    }
  }
}
</script>

<style scoped lang="scss">
.storeCompo{
  position: relative;
  .stockBox{
    margin-bottom: 40px;
    .stockText{
      font-weight: 800;
      font-size: 32px;
      color: #F45A14;
      margin: 0 auto;
      text-align: center;
      span{
        color: #AA4213;
      }
    }
    .stockArea{
      width: 650px;
      background: #FFE6AF;
      border-radius: 30px;
      margin: 20px auto 0 auto;
      padding: 0px 0 10px 0;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .stockItem{
        width: 128px;
        height: 128px;
        margin: 30px 14px 40px 14px;
        clear: both;
        background: #FEFAEF;
        border-radius: 12px;
        border: 4px solid #FFC05C;
        position: relative;
        .iconImg{
          width: 100px;
          height: 100px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -5px;
        }
        .stockItemText{
          width: 120px;
          height: 33px;
          background: #C94A32;
          border-radius: 0px 0px 12px 12px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -2px;
          font-size: 24px;
          color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .priceMark{
          border-radius: 14px;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          padding: 2px 6px 2px 12px;
          position: absolute;
          right: -20px;
          top: 0;
          transform: translateY(-50%);
          &.statusmasonry{
            background: linear-gradient(-90deg, #75B9FF, #FF84F8);
          }
          &.statusgamegold{
            background: #EB6224;
          }
          span{
            vertical-align: middle;
          }
          .ybMark{
            width: 43px*0.8;
            height: 27px*0.8;
            margin: 0 2px;
          }
          .zsMark{
            width: 27px;
            height: 20px;
            margin: 0 2px;
          }
        }
        .stockItemNum{
          font-weight: bold;
          font-size: 24px;
          color: #B24E02;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -40px;
          &.noNum{
            color: #BBA679;
          }
        }
      }
    }
  }
  .rulesDiv{
    width: 61px;
    height: 142px;
    background: url('@/pages/celebration/assets/mk4_3.png') no-repeat left top/100% 100%;
    position: absolute;
    right: 0px;
    top: 40px;
  }
  .updateNowDiv{
    width: 61px;
    height: 179px;
    background: url('@/pages/celebration/assets/mk4_4.png') no-repeat left top/100% 100%;
    position: absolute;
    right: 0px;
    top: 240px;
  }
  .storeBox{
    overflow: hidden; // 解决翻牌显示闪烁bug!!
    position: relative;
    width: 718px;
    height: 1682px;
    background: url('@/pages/celebration/assets/mk4_14.png') no-repeat left top/100% 100%;
    border: none;
    border-radius: 0;
    .textSwipeArea{
      width: 750px;
      height: 71px;
      background: url('@/pages/celebration/assets/mk4_5.png') no-repeat left top/100% 100%;
      margin-top: 10px;
      padding: 0 30px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .coinArea{
      margin: 30px auto 20px auto;
      padding: 0 100px;
      display: flex;
      justify-content: space-between;
      .coinItem{
        display: flex;
        background: #613513;
        border-radius: 24px;
        min-width: 190px;
        height: 45px;
        // padding: 5px 60px 5px 60px;
        padding: 0 0 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &:nth-of-type(2){
          padding: 0 15px 0 0px;
        }
        .coinIcon{
          width: 46px;
          height: 46px;
          vertical-align: middle;
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          &.icongamegold{
            background: url('@/pages/celebration/assets/mk4_7.png') no-repeat left top/100% 100%;
          }
          &.iconmasonry{
            background: url('@/pages/celebration/assets/mk4_8.png') no-repeat left top/100% 100%;
          }
        }
        .coinText{
          font-weight: 400;
          font-size: 24px;
          color: #FFFFFF;
        }
        .toRecharge{
          width: 36px;
          height: 36px;
          background: url('@/pages/celebration/assets/mk5_9.png') no-repeat left top/100% 100%;
          position: absolute;
          right: 2px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .turnCardArea{
      height: 610px;
      padding: 0 20px;
    }
    .axialArea{
      height: 310px;
      margin-top: 130px;
      position: relative;
      .dollDiv{
        width: 298px;
        height: 258px;
        background: url('@/pages/celebration/assets/mk4_6.png') no-repeat left top/100% 100%;
        position: absolute;
        left: 4px;
        bottom: 0;
        .dollDiscourse{
          width: 248px;
          height: 106px;
          position: absolute;
          right: -160px;
          top: -20px;
        }
      }
      .recordBtn{
        width: 141px;
        height: 60px;
        background: url('@/pages/celebration/assets/mk4_13.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 0px;
        top: 20px;
      }
      .refreshBtn{
        width: 345px;
        height: 139px;
        position: absolute;
        right: 40px;
        top: 150px;
        &.status0{
          background: url('@/pages/celebration/assets/mk4_38.png') no-repeat left top/100% 100%;
        }
        &.status1{
          background: url('@/pages/celebration/assets/mk4_39.png') no-repeat left top/100% 100%;
        }
        &.status2{
          background: url('@/pages/celebration/assets/mk4_40.png') no-repeat left top/100% 100%;
        }
        .refreshPrice{
          font-weight: bold;
          font-size: 32px;
          color: #FFF191;
          position: absolute;
          right: 214px;
          top: 52%;
          transform: translateY(-50%);
        }
        .refreshNum{
          font-weight: 500;
          font-size: 24px;
          color: #FFE87D;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
        }
      }
    }
    .rules-text-border{
      margin-top: 60px;
    }
  }
  .totalBox{
    .allGetCoinsDiv{
      font-weight: 500;
      font-size: 28px;
      color: #FFFFFF;
      margin: 10px auto;
      background: #B55023;
      border-radius: 24px;
      width: fit-content;
      padding: 5px 45px;
    }
  }
}
</style>
