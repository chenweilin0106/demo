<template>
  <div class="buy">
    <GiftPopup v-if="isShowGiftPopup" :config="configGiftPopup" @clickClose="isShowGiftPopup=false" @preBuy="preBuy" />
    <ConfirmBuyPopup v-if="isShowConfirmBuyPopup" :config="configConfirmBuyPopup" @confirm="confirmCashBuy" @clickClose="isShowConfirmBuyPopup=false" />
    <ChoosePaymentPopup v-if="isShowChoosePaymentPopup" :config="configChoosePaymentPopup" @confirm="confirmPayment" @clickClose="isShowChoosePaymentPopup=false" />
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
  </div>
</template>

<script>
import { appPay, isIOS } from '@/utils/toApp'
import ChoosePaymentPopup from './choosePaymentPopup.vue'
import ConfirmBuyPopup from './confirmBuyPopup.vue'
import ReceivePopup from './receivePopup.vue'
import GiftPopup from './giftPopup.vue'

// <Buy ref="buy" :config="configBuy" @update="getPageData" />
// configBuy: {
//   money: 0, // app内部现金
//   goods: {} // 商品信息
//   cashApi: (goods) => getPageData({ type: 'magic_closet_money_buy', mark: goods.gift_id }), // 现金购买接口
//   inApi: (goods) => getPageData({ type: 'magic_closet_bug_before', mark: goods.gift_id }), // 内购接口
//   inPollApi: (goods) => getPageData({ type: 'magic_closet_buy_poll', mark: goods.gift_id }), // 内购轮询接口
// }

// this.configBuy.money = this.money // 现金购买必要参数
// this.configBuy.goods = object // 商品信息必要参数
// 内购
// this.$refs.buy.preBuy('in')
// 现金购买
// this.$refs.buy.confirmCashBuy()
// 现金购买 带有确认购买弹框
// this.$refs.buy.preBuy('cash')
// 礼包弹框-内购/现金购买
// this.$refs.buy.openGiftPopup()
export default {
  name: 'buyVue',
  props: {
    config: {
      type: Object,
      default: () => {
        return { money: 0, cashApi: '', inApi: '', inPollApi: '', goods: { apple_id: '', goods_type: '', gift_id: '', price: '', status: '' } }
      }
    }
  },
  components: { GiftPopup, ChoosePaymentPopup, ConfirmBuyPopup, ReceivePopup },
  data() {
    return {
      buyTimers: [], // 购买定时器数组 [{ maxPollTimer: '', judgeBuySuccessTimer: '', id: '' }]
      buyToast: Object.freeze({ success: '成功购买', overTime: '请稍后再试' }), // todo 购买提示配置 success:成功 overTime:超时/失败 不需要就传空字符串
      isShowGiftPopup: false, // 礼包信息弹框
      configGiftPopup: {},
      configChoosePaymentPopup: {}, // 选择支付方式弹窗数据
      isShowChoosePaymentPopup: false, // 选择支付方式弹窗
      isShowConfirmBuyPopup: false, // 是否显示确认购买弹窗
      configConfirmBuyPopup: {}, // 确认购买弹窗配置
      isShowReceivePopup: false, // 是否显示恭喜获得弹窗
      configReceivePopup: [] // 恭喜获得配置
    }
  },
  methods: {
    openGiftPopup() {
      this.$nextTick(() => {
        this.configGiftPopup = this.config.goods
        this.isShowGiftPopup = true
      })
    },
    /**
     * 打开恭喜获得弹窗
     */
    openReceivePopup(arr, isUpdate = true) {
      if (this.isShowReceivePopup) this.isShowReceivePopup = false
      this.$nextTick(() => {
        this.configReceivePopup = arr
        this.isShowReceivePopup = true
        if (isUpdate) this.$emit('update')
      })
    },
    /**
     * 购买礼包前置操作
     * @param {'in'|'cash'} buyType 购买类型 in:内购 cash:现金购买
     */
    preBuy(buyType) {
      if (buyType == 'in') return this.inBuy()
      if (this.config.goods.status != 1) return this.$toast('已售空') // todo 购买状态字段更新
      if (parseFloat(this.config.money) < this.config.goods.price) return this.$toast('现金不足')
      this.$nextTick(() => {
        this.configConfirmBuyPopup = this.config.goods
        this.isShowConfirmBuyPopup = true
      })
    },
    /**
     * 现金购买
     */
    async confirmCashBuy() {
      if (!this.config.cashApi) return this.$toast('现金购买接口不存在')
      const res = await this.config.cashApi(this.config.goods) // todo 现金购买接口
      if (res.errno) return this.$toast(res.errmsg)
      this.openReceivePopup(res.data.awards)
    },
    /**
     * 内购 前端不需要拦截支付 由校验支付接口统一校验
     */
    async inBuy() {
      if (Object.values(this.config.goods).includes('')) return this.$toast('购买失败，缺少购买信息')
      const cloneGoods = JSON.parse(JSON.stringify(this.config.goods))
      if (isIOS()) {
        const res = await this.payApi(cloneGoods)
        if (res) return
        try {
          appPay({ price: cloneGoods.price, apple_id: cloneGoods.apple_id, goods_type: cloneGoods.goods_type, id: cloneGoods.gift_id })
        } catch (e) {
          console.log('请确认运行环境')
          console.log(e)
        }
        this.judgeBuySuccess(cloneGoods)
      } else {
        this.$nextTick(() => {
          this.configChoosePaymentPopup = cloneGoods
          this.isShowChoosePaymentPopup = true
        })
      }
    },
    /**
     * 确认支付方式
     * @param {'wx'|'alipay'} pay_type 支付类型 wx:微信 alipay:支付宝
     * @param {Object} goods 商品信息
     */
    async confirmPayment(pay_type, goods) {
      const res = await this.payApi(goods)
      if (res) return
      try {
        appPay({ price: goods.price, goods_type: goods.goods_type, id: goods.gift_id, pay_type })
      } catch (e) {
        console.log('请确认运行环境')
        console.log(e)
      }
      this.judgeBuySuccess(goods)
    },
    /**
     * 创建/获取购买定时器
     * @param {string|number} id 商品id 当商品只有一个时 可以自己定义传入
     * @return {Object} resTimer 定时器对象
     * @return {number|string} resTimer.id 商品id 用于区分定时器对象
     * @return {number} resTimer.maxPollTimer 最大轮询次数定时器
     * @return {number} resTimer.judgeBuySuccessTimer 判断购买成功定时器
     */
    getBuyTimer(id) {
      let resTimer = this.buyTimers.find((item) => item.id == id)
      if (resTimer) return resTimer
      resTimer = { maxPollTimer: null, judgeBuySuccessTimer: null, id }
      this.buyTimers.push(resTimer)
      return resTimer
    },
    /**
     * 关闭并清除购买定时器 用于购买成功或者购买失败后清除定时器对象
     * @param {string|number} id 商品id 当商品只有一个时 可以自己定义传入
     */
    offBuyTimer(id) {
      this.clearJudgeBuySuccessTimer(id)
      this.clearMaxPollTimer(id)
      this.buyTimers = this.buyTimers.filter((item) => item.id != id)
    },
    /**
     * 判断购买成功 轮询
     * @param {Object} goods 商品信息
     */
    judgeBuySuccess(goods) {
      if (!this.config.inPollApi) return this.$toast('内购轮询接口不存在')
      const timerId = goods.gift_id || 'only' // 兼容商品只有一个后端不提供商品id 默认为only
      this.getBuyTimer(timerId).judgeBuySuccessTimer = setInterval(async () => {
        const res = await this.config.inPollApi(goods) // todo 轮询校验接口
        if (!res.errno) {
          this.offBuyTimer(timerId)
          this.openReceivePopup(res.data)
          if (this.buyToast.success) this.$toast(this.buyToast.success)
        }
      }, 1000)
      this.getBuyTimer(timerId).maxPollTimer = setTimeout(() => {
        if (this.buyToast.overTime) this.$toast(this.buyToast.overTime)
        this.offBuyTimer(timerId)
      }, 120000)
    },
    /**
     * 清除最大轮询次数定时器
     * @param {string|number} id 定时器id 具体看getBuyTimer
     */
    clearMaxPollTimer(id) {
      const res = this.getBuyTimer(id)
      if (!res) return
      clearTimeout(res.maxPollTimer)
      res.maxPollTimer = null
    },
    /**
     * 清除判断购买成功定时器
     * @param {string|number} id 定时器id 具体看getBuyTimer
     */
    clearJudgeBuySuccessTimer(id) {
      const res = this.getBuyTimer(id)
      if (!res) return
      clearInterval(res.judgeBuySuccessTimer)
      res.judgeBuySuccessTimer = null
    },
    /**
     * 内购校验接口
     * @param {Object} goods 商品信息
     * @return {0|-1} 0:可购买 -1:不可购买
     */
    async payApi(goods) {
      if (!this.config.inApi) {
        this.$toast('内购接口不存在')
        return -1
      }
      const res = await this.config.inApi(goods) // todo 支付校验接口
      if (!res.errno) return 0
      this.$toast(res.errmsg)
      return -1
    },
    /**
     * 过滤参数 将source中对应params的参数过滤出来
     * @param {Object} params
     * @param {Object} source
     * @return {Object}
     */
    filterParams(params, source) {
      if (Object.keys(params).length === 0) return {}
      return Object.keys(params).reduce((acc, key) => {
        acc[key] = source.hasOwnProperty(key) ? source[key] : params[key]
        return acc
      }, {})
    }
  },
  beforeDestroy() {
    if (this.buyTimers.length) this.buyTimers.forEach((item) => this.offBuyTimer(item.id))
  }
}
</script>

<style lang="scss" scoped>
</style>
