<template>
  <div class="storeCompo">
    <div class="viewExDiv">
      <div class="viewExBtn" @click="viewExBtnCk(2)"></div>
    </div>
    <div class="textSwipeArea">
      <TextSwipe :swipeList="swipeList"></TextSwipe>
    </div>
    <div class="rulesDiv" @click="rulesDivCk"></div>
    <div class="coinArea">
      <div class="coinItem" v-for="(item,index) in property" :key="index">
        <div :class="['coinIcon', `icon${index}`]"></div>
        <div class="coinText">{{index=='masonry'?item:formatNumber(item)}}</div>
        <div class="toRecharge" v-if="index=='masonry'" @click="toRechargeCk"></div>
      </div>
    </div>
    <div class="turnCardArea">
      <TurnCard :gift_list="gift_list" @buyFn="buyFn" @getPageData="getPageData"></TurnCard>
    </div>
    <div class="axialArea">
      <div class="dollDiv">
        <div class="dollDiscourse">
          <PublicImg :imgName="`yqkh_ddsh0${mascot_status}.svga`" :loop="1"></PublicImg>
        </div>
      </div>
      <div class="recordBtn" @click="recordBtnCk"></div>
      <div :class="['refreshBtn', refresh_price==0?'status0':'status1']" @click="refreshBtnCk"></div>
    </div>
    <div class="rules-text-border">
      <ul>
        <li><span></span>玩家翻开卡片可显示随机商品和随机折扣后价格，</li>
        <li>每次翻出的商品仅能购买1次</li>
        <li><span></span>每天可免费刷新一次全部购买列表，花费25钻石可</li>
        <li>进行额外刷新</li>
        <li><span></span>刷新后将损失当前未购买商品的购买机会，请选择</li>
        <li>合适的刷新时机！</li>
      </ul>
    </div>
    <RulesPopup v-if="isShowRulesPopup" @clickClose="clickClose"></RulesPopup>
    <RecordsPopup v-if="isShowRecordsPopup" @clickClose="clickClose"></RecordsPopup>
    <RefreshPopup v-if="isShowRefreshPopup" :refresh_price="refresh_price" @refreshfn="refreshfn" @clickClose="clickClose"></RefreshPopup>
    <BuyPopup v-if="isShowBuyPopup" :configBuyPopup="configBuyPopup" @openReceiveAwardsPopup="openReceiveAwardsPopup" @clickClose="clickClose"></BuyPopup>
    <ReceiveAwardsPopup v-if="isShowReceiveAwardsPopup" :config="configReceiveAwardsPopup" @clickClose="clickClose"></ReceiveAwardsPopup>
  </div>
</template>

<script>
import { getPageData } from '@/pages/618/api/index.js'
import TextSwipe from './components/textSwipe.vue'
import TurnCard from './components/turnCard.vue'
import RulesPopup from './components/rulesPopup.vue'
import RecordsPopup from './components/recordsPopup.vue'
import { recharge, diamondRechargePart } from '@/pages/618/utils/toApp'
import RefreshPopup from './components/refreshPopup.vue'
import BuyPopup from './components/buyPopup.vue'
import ReceiveAwardsPopup from './components/receiveAwardsPopup.vue'

export default {
  name: 'discountStore',
  props: [],
  components: {
    TextSwipe,
    TurnCard,
    RulesPopup,
    RecordsPopup,
    RefreshPopup,
    BuyPopup,
    ReceiveAwardsPopup
  },
  data() {
    return {
      swipeList: [], // 文字轮播
      property: {
        points: 0,
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
      isShowRulesPopup: false, // 规则说明弹窗
      isShowRecordsPopup: false, // 购买记录弹窗
      isShowRefreshPopup: false, // 刷新弹窗
      isShowBuyPopup: false, // 购买弹窗
      configBuyPopup: {},
      isShowReceiveAwardsPopup: false, // 恭喜获得弹窗
      configReceiveAwardsPopup: []
    }
  },
  created() {
    this.writeLocalStorage()
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取页面信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.swipeList = res.data.discount_list
          this.property = res.data.property
          this.gift_list = res.data.gift_list
          this.mascot_status = res.data.mascot_status
          this.refresh_price = res.data.refresh_price
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
     * 切换页面
     */
    viewExBtnCk(type) {
      this.$emit('viewShowExchange', type)
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowRulesPopup = false
      this.isShowRecordsPopup = false
      this.isShowRefreshPopup = false
      this.isShowBuyPopup = false
      this.isShowReceiveAwardsPopup = false
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
        this.getPageData()
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
        this.getPageData()
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
        if (this.refresh_price == 0) {
          if (this.judgeSecondDay()) {
            this.isShowRefreshPopup = true
          }
        } else {
          if (localStorage.getItem('isTodayTip') == 'true') {
            this.refreshfn()
          } else {
            this.isShowRefreshPopup = true
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
        localStorage.setItem('isTodayTip', false)
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
        localStorage.setItem('isTodayTip', false)
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
          this.clickClose()
          this.getPageData()
        } else if (res.errno == -3) {
          this.$toast(res.errmsg)
          console.log('跳转充值半屏')
          diamondRechargePart(25)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.storeCompo{
  width: 738px;
  height: 1699px;
  background: url('@/pages/618/assets/mk5_3.png') no-repeat left top/100% 100%;
  margin: 0 auto 0px auto;
  padding: 110px 0 0 0;
  position: relative;
  .viewExDiv{
    width: 509px;
    height: 79px;
    background: url('@/pages/618/assets/mk5_1.png') no-repeat left top/100% 100%;
    margin: 0 auto 0px auto;
    .viewExBtn{
      width: 250px;
      height: 79px;
      float: right;
    }
  }
  .textSwipeArea{
    width: 750px;
    height: 71px;
    background: url('@/pages/618/assets/mk5_5.png') no-repeat left top/100% 100%;
    margin: 30px auto 0px auto;
    padding: 0 100px 0 20px;
  }
  .rulesDiv{
    width: 80px;
    height: 99px;
    background: url('@/pages/618/assets/mk5_4.png') no-repeat left top/100% 100%;
    position: absolute;
    right: 20px;
    top: 200px;
  }
  .coinArea{
    margin: 30px auto 60px auto;
    padding: 0 40px 0 60px;
    display: flex;
    justify-content: space-between;
    .coinItem{
      display: flex;
      background: #613513;
      border-radius: 24px;
      width: 190px;
      height: 45px;
      // padding: 5px 60px 5px 60px;
      padding: 0 0 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &:nth-of-type(3){
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
        &.iconpoints{
          background: url('@/pages/618/assets/mk5_6.png') no-repeat left top/100% 100%;
        }
        &.icongamegold{
          background: url('@/pages/618/assets/mk5_7.png') no-repeat left top/100% 100%;
        }
        &.iconmasonry{
          background: url('@/pages/618/assets/mk5_8.png') no-repeat left top/100% 100%;
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
        background: url('@/pages/618/assets/mk5_9.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .turnCardArea{
    height: 610px;
    padding: 0 40px;
  }
  .axialArea{
    height: 310px;
    position: relative;
    .dollDiv{
      width: 298px;
      height: 258px;
      background: url('@/pages/618/assets/mk5_3_2.png') no-repeat left top/100% 100%;
      position: absolute;
      left: -10px;
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
      background: url('@/pages/618/assets/mk5_13.png') no-repeat left top/100% 100%;
      position: absolute;
      right: 20px;
      top: 36px;
    }
    .refreshBtn{
      width: 345px;
      height: 139px;
      position: absolute;
      right: 40px;
      top: 140px;
      &.status0{
        background: url('@/pages/618/assets/mk5_15.png') no-repeat left top/100% 100%;
      }
      &.status1{
        background: url('@/pages/618/assets/mk5_16.png') no-repeat left top/100% 100%;
      }
    }
  }
  .rules-text-border{
    margin-top: 40px;
  }
}
</style>
