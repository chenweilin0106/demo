// 节流
export function _throttle(fn, delay = 200) {
  let canUse = true
  // 设置一个触发开关
  return function () {
    // 如果为true，就触发技能，否则就不能触发
    if (canUse) {
      fn.apply(this, arguments)
      // 触发技能后，关闭开关
      canUse = false
      // 在delay秒后打开开关
      setTimeout(() => (canUse = true), delay)
    } else {
      // Toast('手速太快了')
    }
  }
}

export const numberLimit = (current, max) => {
  return +current >= +max ? max : current
}

/**
 * @description: 数量过长时省略
 * @param text {string|number} 传入的文本
 * @param length {number} 限制长度
 * @returns {string}
 */
export const character_omission = (text, length) => {
  if (!text && text != 0) return ''
  const Text = text.toString()
  return Text.length > length ? Text.substring(0, length) + '...' : Text
}
