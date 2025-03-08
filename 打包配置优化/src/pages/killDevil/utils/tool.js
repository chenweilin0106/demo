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
      // console.log('last && now < last + delay')
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        // console.log('执行函数')
        // fun.apply(that, _args)
      }, delay)
    } else {
      // console.log(fun)
      // console.log('last && now >= last + delay')
      last = now
      fun.apply(that, _args)
    }
  }
}
