import store from '../store'
import { Toast } from 'vant'
import { hiddenFn } from '@/utils/tool'

/**
 * @description 判断版本号大小
 * @param {String} needVersion
 * @returns {Number} 0: 相等, -1: 小于需要版本, 1: 大于需要版本
 */
export const compareVersions = (needVersion) => {
  const parts1 = store.state.app_version.split('.').map((part) => parseInt(part))
  const parts2 = needVersion.split('.').map((part) => parseInt(part))
  const maxLength = Math.max(parts1.length, parts2.length)
  for (let i = 0; i < maxLength; i++) {
    const num1 = parts1[i] || 0
    const num2 = parts2[i] || 0
    if (num1 < num2) {
      return -1
    } else if (num1 > num2) {
      return 1
    }
  }
  return 0
}
/**
 * @description 是否是iOS设备
 * @returns {boolean}
 */
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || window.navigator.userAgent.indexOf('Safari') === -1
}
/**
 * @description 跳转到app的充值页面
 * @param {Function} fn
 */
export const recharge = (fn) => {
  if (typeof fn !== 'function') return console.log('缺少监听页面显隐函数')
  const visibilityChangeHandler = () => hiddenFn(fn, visibilityChangeHandler)
  document.addEventListener('visibilitychange', visibilityChangeHandler)
  if (isIOS()) {
    if (!store.state.uid) return console.log('IOS:缺少uid')
    const params = { tuid: store.state.uid }
    window.webkit.messageHandlers.DDWalletViewController.postMessage(params)
  } else {
    window.external.action('/wealth')
  }
}
/**
 * @description 跳转到用户主页
 * @param {String | Number} tuid
 */
export const toUserMain = (tuid) => {
  if (!tuid) return console.log('缺少参数')
  const params = { uid: tuid }
  if (isIOS()) {
    window.webkit.messageHandlers.DDUserInfo.postMessage(params)
  } else {
    window.external.action('/user/info?tuid=' + tuid)
  }
}
/**
 * @description 跳转到app的聊天室
 * @param {String | Number} room_id
 */
export const toChatRoom = (room_id) => {
  if (!store.state.uid || !room_id) return console.log('缺少参数')
  const params = { uid: store.state.uid, room_id }
  if (isIOS()) {
    window.webkit.messageHandlers.DDchatRoom.postMessage(params)
  } else {
    window.external.action('/chatNormalRoom?tuid=' + store.state.uid + '&room_id=' + room_id)
  }
}
/**
 * @description 跳转到会员中心
 * @param {-1 | 0 | 1 | 2} vipStatus Android参数 会员状态 -1: 未开通 0: 银卡 1: 金卡 2: 黑卡
 */
export const toVip = (vipStatus) => {
  if (isIOS()) {
    window.webkit.messageHandlers.vip_activity.postMessage('')
  } else {
    if (vipStatus == undefined) return console.log('Android：缺少vipStatus')
    window.external.action('/vip?index=' + vipStatus)
  }
}

/**
 * @description 跳转到app的会员店（5.8.6及以上）
 */
export const toVipShop = () => {
  if (compareVersions('5.8.6') == -1) return Toast('请更新至最新版本')
  if (isIOS()) {
    window.webkit.messageHandlers.PushView.postMessage({ vcName: 'DanDan.DDVipShopVC' })
  } else {
    window.external.dispatch('dandan://vip/shop/activity')
  }
}
/**
 * @description App支付（5.0.7及以上）
 * @param {Object} data
 * @param {Number | String} data.price 价格
 * @param {Number | String} data.id 商品ID
 * @param {Number | String} data.pay_type 支付类型
 * @param {Number | String} data.apple_id 苹果内购ID
 */
export const appPay = (data) => {
  for (const key in data) {
    if (data[key] == null || data[key] == undefined) return console.log(`缺少${data[key]}`)
  }
  console.log('支付参数', data)
  if (isIOS()) {
    console.log('进入IOS支付方法')
    const { price, id, apple_id } = data
    const params = { price, goods_type: 'newer', goods_id: id, pay_type: 3, apple_id }
    window.webkit.messageHandlers.DDGiftBag.postMessage(params)
  } else {
    console.log('进入Android支付方法')
    data.price = data.price * 100
    const { price, id, pay_type } = data
    window.external.action('/pay?price=' + price + '&goods_type=newer' + '&goods_id=' + id + '&pay_type=' + pay_type)
  }
}
