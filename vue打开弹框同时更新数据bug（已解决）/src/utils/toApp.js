import { getUrlData } from '@/utils/tool'

const urlData = getUrlData()

/**
 * 判断版本号大小
 * @param {string} needVersion
 * @returns {number} 0: 相等, -1: 低于所需版本, 1: 高于所需版本
 */
export const compareVersions = (needVersion) => {
  const parts1 = urlData.app_version.split('.').map((part) => parseInt(part))
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

// 判断是否是IOS
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || window.navigator.userAgent.indexOf('Safari') === -1
}

/**
 * 跳转到app的个人主页
 * @param tuid {string} 用户id
 */
export const toUserMain = () => {
  if (!urlData.uid) return
  if (isIOS()) {
    window.webkit.messageHandlers.DDUserInfo.postMessage({ uid: urlData.uid })
  } else {
    window.external.action('/user/info?tuid=' + urlData.uid)
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
 * 跳转公馆
 */
export const toWorkShop = () => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://workshop/home' })
  } else {
    window.external.action('dandan://workshop/home')
  }
}

/**
 * 跳转庭院
 */
export const toCourtyard = () => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: 'dandan://courtyard/home' })
  } else {
    window.external.action('dandan://courtyard/home')
  }
}

/**
 * 跳转博物馆
 * @param {number} tab 1: 称号 2: 奇遇 3: 勋章
 */
export const toMuseum = (tab = 1) => {
  if (isIOS()) {
    window.webkit.messageHandlers.routerJump.postMessage({ router: `dandan://museum/home?tab=${tab}` })
  } else {
    window.external.action('dandan://museum/home?tab=' + tab)
  }
}

/**
 * 钻石充值半屏
 * @param {number} caratNum 钻石数量
 */
export const diamondRechargePart = (caratNum) => {
  if (isIOS()) {
    window.webkit.messageHandlers.DDRechargeAlert.postMessage({ uid: urlData.uid, carat: caratNum })
  } else {
    window.external.action('/shortDiamond?tuid=' + urlData.uid + '&carat=' + caratNum + '')
  }
}
