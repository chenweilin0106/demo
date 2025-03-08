/**
 * @description: 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {Number} delay 节流时间
 */
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

// 监听页面呼出回调函数
export function hiddenFn(fn, visibilityChangeHandler) {
  if (document.hidden) {
    console.log('挂起')
    // 页面被挂起
  } else {
    // 页面呼出
    fn()
    // console.log('呼出')
    document.removeEventListener('visibilitychange', visibilityChangeHandler) // 移除监听
  }
}
