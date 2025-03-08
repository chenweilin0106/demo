import store from '../store'
import Vue from 'vue'

// 判断是否是IOS
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 钻石充值半屏
 */
export const diamondRechargePart = (caratNum) => {
  // console.log(store.state.uid)
  if (isIOS()) {
    window.webkit.messageHandlers.DDRechargeAlert.postMessage({ uid: store.state.uid, carat: caratNum })
  } else {
    window.external.action('/shortDiamond?tuid=' + store.state.uid + '&carat=' + caratNum + '')
  }
}

// 打开用户主页
export const toUserMain = (tuid) => {
  if (!tuid) return
  const params = { uid: tuid }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.DDUserInfo.postMessage(params)
  } else {
    window.external.action('/user/info?tuid=' + tuid)
  }
}

/**
 * 判断版本号大小
 * @param {String} version1
 * @param {String} version2
 * @returns {Number} 0: 相等, -1: version1 < version2, 1: version1 > version2
 */
export const compareVersions = (version1, version2) => {
  const parts1 = version1.split('.').map((part) => parseInt(part))
  const parts2 = version2.split('.').map((part) => parseInt(part))
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

// 充值跳转
export const recharge = (fn) => {
  document.addEventListener('visibilitychange', fn)
  const params = { tuid: store.getters.uid }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.DDWalletViewController.postMessage(params)
  } else {
    window.external.action('/wealth')
  }
}

// 打开符石寻宝
export const toRuneStoneTreasureHuntPanel = () => {
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    const params = { router: 'dandan://warrior/rune_stone_summon' }
    window.webkit.messageHandlers.routerJump.postMessage(params)
  } else {
    window.external.action('dandan://warrior/rune_stone_summon')
  }
}

// 打开unity技能升级
export const toMySkillPanel = (skill_id = 1) => {
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    const params = { router: 'dandan://skill/list?skill_id=' + skill_id }
    window.webkit.messageHandlers.routerJump.postMessage(params)
  } else {
    window.external.action('dandan://skill/list?skill_id=' + skill_id)
  }
}

// 跳转聊天室
export const toChatRoom = (room_id) => {
  if (!store.state.uid || !room_id) {
    Vue.prototype.$toast('当前暂无房间开启')
    return
  }
  const params = { uid: store.getters.uid, room_id }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.DDchatRoom.postMessage(params)
  } else {
    window.external.action(
      '/chatRoom?tuid=' + store.getters.uid + '&room_id=' + room_id
    )
  }
}
