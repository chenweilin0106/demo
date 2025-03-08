import store from '../store'

// 判断是否是IOS
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
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
  const params = { tuid: store.state.uid }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.DDWalletViewController.postMessage(params)
  } else {
    window.external.action('/wealth')
  }
}

// 返回APP
export const quitView = (uid, access_token) => {
  if (!uid || !access_token) return
  const params = { uid, access_token }
  if (isIOS() || navigator.userAgent.indexOf('Safari') == -1) {
    window.webkit.messageHandlers.quitWebView.postMessage(params)
  } else {
    window.external.action(
      '/quitWebView?uid=' + uid + '&access_token=' + access_token
    )
  }
}

// 保存图片
export const saveImage = (imageUrl) => {
  const params = { imageUrl }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.saveImage.postMessage(params)
  } else {
    window.external.action('/saveImage=' + imageUrl)
  }
}
