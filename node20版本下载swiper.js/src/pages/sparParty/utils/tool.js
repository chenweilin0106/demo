// 节流
export function _throttle(fn, delay = 1000) {
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
