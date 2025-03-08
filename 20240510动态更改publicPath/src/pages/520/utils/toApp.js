import store from '../store'

// 判断是否是IOS
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 跳转到app的个人主页
 * @param tuid {string|number} 用户id
 */
export const toUserMain = (tuid) => {
  // console.log(tuid)
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
 * @param {string} version1
 * @param {string} version2
 * @returns {number} 0: 相等, -1: version1 < version2, 1: version1 > version2
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

/**
 * @description 卡片/图片分享
 * @param params
 * @param params.uid {string} 用户uid
 * @param params.access_token {string} token
 * @param params.shareImage {string} 分享的图片base64
 * @param params.type {number} 分享类型
 * @param params.title {string} 分享标题
 * @param params.des {string} 分享描述
 * @param params.thumbImageUrl {string} 缩略图url
 * @param params.thumbImageData {string} 缩略图base64
 * @param params.shareUrl {string} 分享的url
 */
export const commonShare = (params) => {
  const { uid, access_token, shareImage, type, title, des, thumbImageUrl, thumbImageData, shareUrl } = params
  if (isIOS() || navigator.userAgent.indexOf('Safari') == -1) {
    window.webkit.messageHandlers.commonShare.postMessage(params)
  } else {
    window.external.commonShare(
      '/commonShare?uid=' +
        uid +
        '&access_token=' +
        access_token +
        '&shareImage=' +
        shareImage +
        '&type=' +
        type +
        '&title=' +
        title +
        '&des=' +
        des +
        '&thumbImageUrl=' +
        thumbImageUrl +
        '&thumbImageData=' +
        thumbImageData +
        '&shareUrl=' +
        shareUrl
    )
  }
}

/**
 * @description 跳转爱情小屋
 * @param tuid {string} 用户uid
 */
export const jumpLoveHouse = (tuid) => {
  if (!tuid) return
  const params = { uid: tuid, vcName: 'DanDan.DDMyLoveHouseVC' }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.PushView.postMessage(params)
  } else {
    window.external.action('/love/house')
  }
}
