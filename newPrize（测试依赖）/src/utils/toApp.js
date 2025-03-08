// 判断是否是IOS
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 返回APP
export const quitView = (uid, access_token) => {
  const params = { uid, access_token }
  if (isIOS() || navigator.userAgent.indexOf('Safari') == -1) {
    window.webkit.messageHandlers.quitWebView.postMessage(params)
  } else {
    window.external.action(
      '/quitWebView?uid=' + uid + '&access_token=' + access_token
    )
  }
}

// Android支付方法（window.external.action不识别模板字符串）
export const payAFun = (data) => {
  const { price, id, pay_type, uid, access_token } = data
  const total_amount = price * 100
  window.external.action(
    '/pay?uid=' +
    uid +
    '&access_token=' +
    access_token +
    '&pay_type=' +
    pay_type +
    '&total_amount=' +
    total_amount +
    '&goods_type=hot_gift_active&goods_id=' +
    id +
    ''
  )
}

// IOS支付方法
export const payIFun = (data) => {
  const { price, uid, access_token } = data
  const product_type = 1 // 商品类型（新增字段），同一个额度，不同活动定义不同类型值 (未知参数)
  if (price != 6) {
    // 价格 6 每日限购
    const params = {
      uid,
      access_token,
      apple_id: 'new_active_' + price,
      product_type
    }
    window.webkit.messageHandlers.DDBuy.postMessage(params)
  } else {
    const params6 = {
      uid,
      access_token,
      apple_id: 'daily_1'
    }
    window.webkit.messageHandlers.DDGiftBag.postMessage(params6)
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
