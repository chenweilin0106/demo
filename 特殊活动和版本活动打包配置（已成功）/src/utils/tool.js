import dayjs from 'dayjs'
// throttle function
export function throttle(fun, delay) {
  if (typeof fun !== 'function') {
    throw new TypeError('Expected a function')
  }
  let last, deferTimer
  return function (arg) {
    const that = this
    const _args = arguments
    const now = +new Date()

    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        // console.log('执行函数')
        // fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}
// 购买礼包
/**
 * @description 格式化时间戳
 * @param { number } stampTime 时间戳
 * @param { string } formatType 格式化类型
 */
export const formatStampTime = (
  stampTime = new Date().getTime(),
  formatType = 'HH:mm:ss'
) => {
  return dayjs(stampTime).format(formatType)
}
