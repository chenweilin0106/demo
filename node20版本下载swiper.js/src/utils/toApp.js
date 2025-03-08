import store from '@/store'
import Vue from 'vue'

/**
 * 判断是否为IOS设备
 */
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || window.navigator.userAgent.indexOf('Safari') === -1
}

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
 * 用于拼接Android路由和query参数
 * @param {string} baseUrl 路由
 * @param {Object} params 参数对象
 * @return {string}
 */
export const createQueryString = (baseUrl, params) => {
  let res = baseUrl + '?'
  for (const key in params) {
    if (params[key]) res += `${key}=${params[key]}&`
  }
  return res.slice(0, -1)
}

/**
 * 跳转unity符石寻宝
 */
export const toRuneStoneTreasureHuntPanel = () => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://warrior/rune_stone_summon' })
  } else {
    window.external.action('dandan://warrior/rune_stone_summon')
  }
}

/**
 * 跳转unity技能升级(已关闭此页面，不再使用)
 */
export const toMySkillPanel = (skill_id = 1) => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://skill/list?skill_id=' + skill_id })
  } else {
    window.external.action('dandan://skill/list?skill_id=' + skill_id)
  }
}

/**
 * 跳转到app的个人主页
 * @param tuid {string|number} 用户id
 */
export const toUserMain = (tuid) => {
  if (!tuid) return
  const params = { uid: tuid }
  if (isIOS()) {
    window.webkit.messageHandlers.DDUserInfo.postMessage(params)
  } else {
    window.external.action('/user/info?tuid=' + tuid)
  }
}

/**
 * 跳转充值页
 */
export const recharge = () => {
  if (isIOS()) {
    window.webkit.messageHandlers.DDWalletViewController.postMessage('')
  } else {
    window.external.action('/wealth')
  }
}

/**
 * 钻石充值半屏
 */
export const diamondRechargePart = (caratNum) => {
  if (isIOS()) {
    window.webkit.messageHandlers.DDRechargeAlert.postMessage({ uid: store.state.uid, carat: caratNum })
  } else {
    window.external.action('/shortDiamond?tuid=' + store.state.uid + '&carat=' + caratNum + '')
  }
}

/**
 * 集成分享
 */
export const commonShare = (params) => {
  if (isIOS()) {
    window.webkit.messageHandlers.commonShare.postMessage(params)
  } else {
    window.external.commonShare(createQueryString('/commonShare', params))
  }
}

/**
 * 跳转爱情小屋
 * @param tuid {string} 用户uid
 */
export const jumpLoveHouse = (tuid) => {
  if (!tuid) return Vue.prototype.$toast('缺少uid')
  if (isIOS()) {
    window.webkit.messageHandlers.PushView.postMessage({ uid: tuid, vcName: 'DanDan.DDMyLoveHouseVC' })
  } else {
    window.external.action('/love/house')
  }
}

/**
 * 跳转到app的聊天室
 * @param room_id {string|number} 房间id
 */
export const toChatRoom = (room_id) => {
  if (!store.state.uid || !room_id) return Vue.prototype.$toast('当前暂无房间开启')
  const params = { uid: store.state.uid, room_id }
  if (isIOS()) {
    window.webkit.messageHandlers.DDchatRoom.postMessage(params)
  } else {
    window.external.action('/chatRoom?tuid=' + store.state.uid + '&room_id=' + room_id)
  }
}

/**
 * 活动页退出APP
 */
export const quitView = () => {
  if (isIOS()) {
    window.webkit.messageHandlers.quitWebView.postMessage({ uid: store.state.uid, access_token: store.state.access_token })
  } else {
    window.external.action('/quitWebView?uid=' + store.state.uid + '&access_token=' + store.state.access_token
    )
  }
}

/**
 * url跳转(通过app)
 */
export const urlRouterWithApp = (router) => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router })
  } else {
    window.external.dispatch(router)
  }
}

window.onload = function () {
  window.webViewDidAppear = function () {
    console.log('webViewDidAppear')
    // Toast('webViewDidAppear')
    // location.replace(location.href)
  }
}

/**
 * @description App支付
 * @param {Object} data
 * @param {Number | String} data.price 价格
 * @param {Number | String} data.id 商品ID
 * @param {wx | alipay} data.pay_type 支付类型
 * @param {Number | String} data.apple_id 苹果内购ID
 * @param {String} data.goods_type 商品类型
 */
export const appPay = (data) => {
  for (const key in data) {
    if (data[key] == null || data[key] == undefined) return console.log(`缺少${data[key]}`)
  }
  console.log('支付参数', data)
  if (isIOS()) {
    console.log('进入IOS支付方法')
    const { price, id, apple_id, goods_type } = data
    const params = { price, goods_type, goods_id: id, apple_id }
    window.webkit.messageHandlers.DDGiftBag.postMessage(params)
  } else {
    console.log('进入Android支付方法')
    data.price = data.price * 100
    const { price, id, pay_type, goods_type } = data
    window.external.action('/pay?price=' + price + '&goods_type=' + goods_type + '&goods_id=' + id + '&pay_type=' + pay_type)
  }
}
