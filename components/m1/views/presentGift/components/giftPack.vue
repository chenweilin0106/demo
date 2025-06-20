<template>
  <OutBox title="title_3.png" size="1" class="giftPack">
    <PublicButton :disabled="[5]" :has-right="config.goods_info.status==1?4:5" class="buy position-absolute" @click="preBuy(config,'inBuy')">{{config.goods_info.status==1?`￥${config.goods_info.price}购买`:'已购买'}}</PublicButton>
    <!--恭喜获得弹框-->
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
    <!--选择支付方式弹框-->
    <ChoosePaymentPopup v-if="isShowChoosePaymentPopup" :config="configChoosePaymentPopup" @confirm="confirmPayment" @clickClose="isShowChoosePaymentPopup=false" />
  </OutBox>
</template>

<script>
import { isIOS, appPay } from '@/utils/toApp'
import { getPageData } from '@/api'
import ChoosePaymentPopup from './choosePaymentPopup.vue'
import ReceivePopup from './receivePopup.vue'
/**
 * @typedef {Object} Goods 商品信息
 * @property {Object} goods_info - APP支付方法参数
 * @property {string|number} [id] - 商品id 当商品只有一个 后端不提供id
 * @property {number} [buy_times] - 商品当前已购买次数 用于后端跨天购买校验
 */
export default {
  data() {
    return {
      money: 0, // 现金余额
      buyTimers: [], // 购买定时器数组 [{ maxPollTimer: '', judgeBuySuccessTimer: '', id: '' }]
      buyToast: Object.freeze({ success: '', overTime: '购买失败，请稍后再试' }), // 购买提示配置 success:成功 overTime:超时/失败 不需要就传空字符串
      configChoosePaymentPopup: {}, // 选择支付方式弹窗数据
      isShowChoosePaymentPopup: false, // 选择支付方式弹窗
      isShowConfirmBuyPopup: false, // 是否显示确认购买弹窗
      configConfirmBuyPopup: {}, // 确认购买弹窗配置
      isShowReceivePopup: false, // 是否显示恭喜获得弹窗
      configReceivePopup: [] // 恭喜获得弹窗配置
    }
  },
  props: ['config'],
  components: { ReceivePopup, ChoosePaymentPopup },
  methods: {
    /**
     * 购买礼包前置操作
     * @param {Goods} goods
     * @param {'inBuy'|'cashBuy'} buyType 购买类型 inBuy:内购 cashBuy:现金购买
     */
    preBuy(goods, buyType) {
      if (buyType == 'inBuy') return this.inBuy(goods)
      if (goods.has_right == 2) return this.$toast('今日购买次数不足')
      if (parseFloat(this.money) < goods.goods_info.price) return this.$toast('现金不足')
      this.configConfirmBuyPopup = goods
      this.isShowConfirmBuyPopup = true
    },
    /**
     * 现金购买
     * @param {Goods} goods
     */
    async confirmCashBuy(goods) {
      const res = await getPageData({ type: 'cash_buy', id: '' }) // 现金购买接口
      if (res.errno) return this.$toast(res.errmsg)
      if (this.isShowReceivePopup) this.isShowReceivePopup = false
      this.$nextTick(() => {
        this.configReceivePopup = res.data.awards // 需要注意接口返回数据格式
        this.isShowReceivePopup = true
      })
      this.$emit('update') // 更新数据
    },
    /**
     * 内购 前端不需要拦截支付 由校验支付接口统一校验
     * @param {Goods} goods
     */
    async inBuy(goods) {
      if (Object.values(goods.goods_info).includes('')) return this.$toast('购买失败，缺少购买信息')
      const cloneGoods = JSON.parse(JSON.stringify(goods))
      if (isIOS()) {
        const res = await this.payApi(cloneGoods)
        if (res) return
        appPay({ price: cloneGoods.goods_info.price, apple_id: cloneGoods.goods_info.apple_id, goods_type: cloneGoods.goods_info.goods_type, id: cloneGoods.goods_info.gift_id })
        this.judgeBuySuccess(cloneGoods)
      } else {
        this.configChoosePaymentPopup = cloneGoods
        this.isShowChoosePaymentPopup = true
      }
    },
    /**
     * 确认支付方式
     * @param {'wx'|'alipay'} pay_type 支付类型 wx:微信 alipay:支付宝
     * @param {Goods} goods
     */
    async confirmPayment(pay_type, goods) {
      const res = await this.payApi(goods)
      if (res) return
      appPay({ price: goods.goods_info.price, goods_type: goods.goods_info.goods_type, id: goods.goods_info.gift_id, pay_type })
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
     * @param {Goods} goods
     */
    judgeBuySuccess(goods) {
      const timerId = goods.id !== undefined ? goods.id : 'only' // 兼容商品只有一个后端不提供商品id 默认为only
      this.getBuyTimer(timerId).judgeBuySuccessTimer = setInterval(async () => {
        const res = await getPageData({ type: 'marriage_gift_buy_poll', mark: goods.id }) // 轮询校验接口
        if (!res.errno) {
          this.offBuyTimer(timerId)
          if (this.isShowReceivePopup) this.isShowReceivePopup = false
          this.$nextTick(() => {
            this.configReceivePopup = res.data // 需要注意接口返回数据格式
            this.isShowReceivePopup = true
            if (this.buyToast.success) this.$toast(this.buyToast.success)
          })
          this.$emit('update') // 更新数据
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
     * @param {Goods} goods
     * @return {0|-1} 0:可购买 -1:不可购买
     */
    async payApi(goods) {
      const res = await getPageData({ type: 'marriage_gift_bug_before', gift_id: goods.id }) // 支付校验接口
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
.giftPack{
  .buy{
    bottom: 35px;
    left: 210px;
    &.status_5{
      pointer-events: none;
    }
  }
}
</style>
