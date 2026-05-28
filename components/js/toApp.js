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
 * 判断版本号大小
 *
 * @param {string} needVersion '5.9.6'
 * @returns {0 | -1 | 1} 0: 相等, -1: 小于需要版本, 1: 大于需要版本
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
 *
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
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://warrior/rune_stone_summon' })
    } else {
      window.external.action('dandan://warrior/rune_stone_summon')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转unity技能升级(已关闭此页面，不再使用)
 */
// export const toMySkillPanel = (skill_id = 1) => {
//   if (isIOS()) {
//     window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://skill/list?skill_id=' + skill_id })
//   } else {
//     window.external.action('dandan://skill/list?skill_id=' + skill_id)
//   }
// }

/**
 * 跳转到app的个人主页
 *
 * @param {string | number} tuid 用户id
 */
export const toUserMain = (tuid) => {
  if (!Number(tuid)) return console.log('无效tuid', tuid)
  const params = { uid: tuid }
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.DDUserInfo.postMessage(params)
    } else {
      window.external.action('/user/info?tuid=' + tuid)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转到app的会员店（5.8.6）
 */
export const toVipShop = () => {
  if (compareVersions('5.8.6') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.PushView.postMessage({ vcName: 'DanDan.DDVipShopVC' })
  } else {
      window.external.dispatch('dandan://vip/shop/activity')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转到会员中心（5.4.4）
 *
 * @param {-1 | 0 | 1 | 2} vipStatus Android参数 会员状态 -1: 未开通 0: 银卡 1: 金卡 2: 黑卡
 */
export const toVip = (vipStatus) => {
  if (compareVersions('5.4.4') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.vip_activity.postMessage('')
    } else {
      window.external.action('/vip?index=' + vipStatus)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转充值页
 *
 * @param {Function} fn 回调函数
 */
export const recharge = (fn) => {
  if (fn && typeof fn === 'function') document.addEventListener('visibilitychange', fn)
  try {
    const params = { tuid: store.state.uid }
    if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
      window.webkit.messageHandlers.DDWalletViewController.postMessage(params)
    } else {
      window.external.action('/wealth')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 钻石充值半屏
 *
 * @param {number} caratNum 需要的钻石数量
 * @param {Function} callBack 回调函数
 * 示例：diamondRechargePart(100, this.getPageData)
 */
export const diamondRechargePart = (caratNum, callBack) => {
  if (callBack && typeof callBack === 'function') window.jsBridge = (res) => { if (JSON.parse(res).name == 'refreshUserResource') callBack() }
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.DDRechargeAlert.postMessage({ uid: store.state.uid, carat: caratNum })
    } else {
      window.external.action('/shortDiamond?tuid=' + store.state.uid + '&carat=' + caratNum + '')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 集成分享（5.8.0）
 *
 * @param {Object} params
 * @param {string | number} params.uid 用户uid
 * @param {string} params.access_token 用户token
 * @param {string[]} [params.platforms=[]] 分享平台列表（604） []-全部平台 '1'-微信好友 '2'-朋友圈 '3'-QQ好友 '4'-QQ空间
 * @param {string} params.title 卡片分享标题
 * @param {string} params.desc 卡片分享描述 android
 * @param {string} params.des 卡片分享描述 ios
 * @param {string} params.shareUrl 链接分享必传 url 如果使用路由地址，如#/，需要转义成 %23%2F 但是ios不支持这种地址 所以要进行机型判断 ios不需要转移 安卓需要
 * @param {string} params.shareImage 图片 base64（传入后，分享面板拉起时会显示这张图片；如果是1-图片分享那么就会分享张图，如果是2-链接分享那就只有分享面板展示的作用；如果传入的是undefined，分享面板上不会展示，但是会显示保存图片按钮）
 * @param {string} params.thumbImageUrl 卡片分享右侧缩略图 url（QQ分享）
 * @param {string} params.thumbImageData 卡片分享右侧缩略图 base64（微信分享）
 * @param {string} params.type 分享类型 1-图片分享 2-卡片分享
 */
export const commonShare = (params) => {
  if (compareVersions('5.8.0') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.commonShare.postMessage(params)
    } else {
      window.external.commonShare(createQueryString('/commonShare', params))
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转爱情小屋
 *
 * @param {string | number} tuid 用户uid
 */
export const jumpLoveHouse = (tuid) => {
  if (!Number(tuid)) return Vue.prototype.$toast('缺少uid')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.PushView.postMessage({ uid: tuid, vcName: 'DanDan.DDMyLoveHouseVC' })
    } else {
      window.external.action('/love/house')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转到app的聊天室
 *
 * @param {string | number} room_id 房间id
 */
export const toChatRoom = (room_id) => {
  if (!Number(room_id)) return Vue.prototype.$toast('当前暂无房间开启')
  const params = { uid: store.state.uid, room_id }
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.DDchatRoom.postMessage(params)
    } else {
      window.external.action('/chatRoom?tuid=' + store.state.uid + '&room_id=' + room_id)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 活动页退出APP
 */
export const quitView = () => {
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.quitWebView.postMessage({ uid: store.state.uid, access_token: store.state.access_token })
    } else {
      window.external.action('/quitWebView?uid=' + store.state.uid + '&access_token=' + store.state.access_token)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * url跳转(通过app)
 *
 * @param {string} router 路由
 * @example urlRouterWithApp(`dandan-${window.location.origin}/vue/normal/friendsBeCash/index.html?show_full=0&uid=${this.$store.state.uid}&access_token=${this.$store.state.access_token}#/invite?a=1`)
 * 尾部的?a=1是因为客户端并不会判断是否有问号，手动拼接防止路由错误
 * show_full 0-非全屏 1-全屏
 */
export const urlRouterWithApp = (router) => {
  if (compareVersions('5.9.6') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router })
    } else {
      window.external.dispatch(router)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

window.onload = function () {
  window.webViewDidAppear = function () {
    console.log('webViewDidAppear')
    // Vue.prototype.$toast('webViewDidAppear')
    // location.replace(location.href)
  }
}

/**
 * App支付
 *
 * @param {Object} data
 * @param {number | string} data.price 价格
 * @param {number | string} data.id 商品ID
 * @param {'wx' | 'alipay'} data.pay_type 支付类型
 * @param {number | string} data.apple_id 苹果内购ID
 * @param {string} data.goods_type 商品类型
 */
export const appPay = (data) => {
  for (const key in data) {
    if (data[key] == null || data[key] == undefined) return console.log(`缺少${data[key]}`)
  }
  console.log('支付参数', data)
  try {
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
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转甜蜜邂逅（6.0.0）
 */
export const toSweetMeet = () => {
  if (compareVersions('6.0.0') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://sweet/meet' })
    } else {
      window.external.action('dandan://sweet/meet')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转app首页的推荐页面（6.0.2）
 */
export const toRedpackRecommend = () => {
  if (compareVersions('6.0.2') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://home/page?tab=0' })
    } else {
      window.external.action('dandan://home/page?tab=0')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转app首页的现金红包页面(现金红包列表页)
 */
export const toRedpackCash = () => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://index/red_pack' })
  } else {
    window.external.action('dandan://index/red_pack')
  }
}

/**
 * 获取剪贴板文本（5.9.2）
 */
export const pasteWindow = () => {
  if (compareVersions('5.9.2') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.getCopyString.postMessage('')
    } else {
      window.external.action('/getCopyString')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转表白墙（5.9.2）
 */
export const toConfessionWall = (fn) => {
  if (compareVersions('5.9.2') == -1) return Vue.prototype.$toast('请更新至最新版本')
  document.addEventListener('visibilitychange', fn)
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://confession/wall' })
  } else {
      window.external.action('dandan://confession/wall')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转私聊界面
 *
 * @param {string | number} tuid 用户uid
 */
export const toPrivateChat = (tuid) => {
  if (!Number(tuid)) return console.log('无效tuid', tuid)
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://im/list?tuid=' + tuid })
    } else {
      window.external.action('dandan://im/list?tuid=' + tuid)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转APP技能升级（6.0.6）
 */
export const toSkillUpgrade = () => {
  if (compareVersions('6.0.6') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://skill/upgrade' })
    } else {
      window.external.action('dandan://skill/upgrade')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转蛋蛋日常（6.0.8）
 *
 * @param {0 | 1 | 2} index 0-每日任务 1-周挑战 2-签到
 */
export const toDanDanDaily = (index) => {
  if (compareVersions('6.0.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://daily?index=' + index })
  } else {
      window.external.action('dandan://daily?index=' + index)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转家族语音房 若没有 跳转家族招募列表（6.0.8）
 */
export const toFamilyVoiceRoom = () => {
  if (compareVersions('6.0.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://family/self_room' })
    } else {
      window.external.action('dandan://family/self_room')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转押镖 若没有 跳转家族招募列表（6.0.8）
 */
export const toFamilyEscort = () => {
  if (compareVersions('6.0.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://escort/out' })
    } else {
      window.external.action('dandan://escort/out')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 打开蛋蛋宝箱弹框（6.0.8）
 */
export const toDanDanBox = () => {
  if (compareVersions('6.0.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://box/out' })
    } else {
      window.external.action('dandan://box/out')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 打开聊天室红包奖励（6.0.8）
 */
export const toGeTin = () => {
  if (compareVersions('6.0.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://getin/chatroom' })
    } else {
      window.external.action('dandan://getin/chatroom')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转庭院（5.9.4）
 */
export const toCourtyard = () => {
  if (compareVersions('5.9.4') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://courtyard/home' })
    } else {
      window.external.action('dandan://courtyard/home')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转家族广场（5.6.2）
 */
export const toFamilyList = () => {
  if (compareVersions('5.6.2') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://family/list' })
    } else {
      window.external.dispatch('dandan://family/list')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转充值页面（6.0.8）和recharge方法一致
 */
export const toWealthPurchase = () => {
  if (compareVersions('6.0.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://wealth/purchase' })
    } else {
      window.external.dispatch('dandan://wealth/purchase')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转现金提现页面（6.1.0）
 */
export const toWealthWithdraw = () => {
  if (compareVersions('6.1.0') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://wealth/withdraw' })
    } else {
      window.external.dispatch('dandan://wealth/withdraw')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转家族主页（5.5.8）
 */
export const toFamilyHome = (family_id) => {
  if (!Number(family_id)) return console.log('无效family_id')
  if (compareVersions('5.5.8') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://family/home?family_id=' + family_id })
    } else {
      window.external.dispatch('dandan://family/home?family_id=' + family_id)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转博物馆（5.9.4）
 * @param {number | string} [tab = 3] 选项卡 1-? 2-? 3-勋章墙
 */
export const toMuseum = (tab = 3) => {
  if (compareVersions('5.9.4') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://museum/home?tab=' + tab })
    } else {
      window.external.dispatch('dandan://museum/home?tab=' + tab)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转好友列表（无需版本判断）
 */
export const toFriendsList = () => {
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://message/friends' })
    } else {
      window.external.dispatch('dandan://message/friends')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转APP绑定手机号
 */
export const toBindPhone = () => {
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.DDManagerPhoneVC.postMessage('')
    } else {
      window.external.action('/bind/phone')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 封禁当前账户（622）
 *
 * @param {string} text 封禁提示文案 必传
 */
export const banAccount = (text) => {
  if (compareVersions('6.2.2') == -1) return Vue.prototype.$toast('请更新至最新版本')
  if (!text) return console.log('无效封禁提示文案', text)
  const params = { text }
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.banAccount.postMessage(params)
    } else {
      window.external.banAccount(text)
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转活力卡页面
 */
export const toVitalityHome = () => {
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://vitality/home' })
    } else {
      window.external.dispatch('dandan://vitality/home')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}

/**
 * 跳转家族秘境（6.2.2）
 */
export const toFamilySecret = () => {
  if (compareVersions('6.2.2') == -1) return Vue.prototype.$toast('请更新至最新版本')
  try {
    if (isIOS()) {
      window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://family/secret_realm' })
    } else {
      window.external.dispatch('dandan://family/secret_realm')
    }
  } catch (error) {
    console.log('环境错误', error)
  }
}