// 判断是否是IOS
export const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 判断版本号大小
 * @param {String} current_version
 * @param {String} need_version
 * @returns {Number} 0: 相等, -1: current_version < need_version, 1: current_version > need_version
 */
export const compareVersions = (current_version, need_version) => {
  console.log('🚀 - compareVersions - need_version:', need_version)
  console.log('🚀 - compareVersions - current_version:', current_version)
  const parts1 = current_version.split('.').map((part) => parseInt(part))
  const parts2 = need_version.split('.').map((part) => parseInt(part))
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

// Android支付方法（window.external.action不识别模板字符串）
export const payAFun = (data) => {
  console.log('进入Android支付方法')
  for (const key in data) {
    if (data[key] == null || data[key] == undefined) {
      return console.log(`Android支付，缺少${data[key]}，退出支付`)
    }
  }
  data.price = data.price * 100
  const { price, id, pay_type } = data
  console.log('🚀 - payAFun - data:', data)
  window.external.action(
    '/pay?price=' +
      price +
      '&goods_type=newer' +
      '&goods_id=' +
      id +
      '&pay_type=' +
      pay_type
  )
}

// IOS支付方法
export const payIFun = (data) => {
  console.log('进入IOS支付方法')
  for (const key in data) {
    if (data[key] == null || data[key] == undefined) {
      return console.log(`IOS支付，缺少${data[key]}，退出支付`)
    }
  }
  const { price, id, apple_id } = data
  const params = {
    price,
    goods_type: 'newer',
    goods_id: id,
    pay_type: 3,
    apple_id
  }
  console.log('🚀 - payIFun - params:', params)
  window.webkit.messageHandlers.DDGiftBag.postMessage(params)
}
