import store from '../store'

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

// 判断是否是IOS
const isIOS = () => {
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

// 打开蛋蛋部落模块
export const toHomeGame = () => {
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.homeGame.postMessage('')
  } else {
    window.external.action('dandan://home/game')
  }
}

// 钻石充值弹框（传入需要的钻石数，需要充值多少由客户端判断）
export const rechargeDialog = (carat) => {
  const params = { uid: store.getters.uid, carat }
  if (isIOS() || navigator.userAgent.indexOf('Safari') == -1) {
    window.webkit.messageHandlers.DDRechargeAlert.postMessage(params)
  } else {
    window.external.action(
      '/shortDiamond?tuid=' + store.getters.uid + '&carat=' + carat + ''
    )
  }
}
