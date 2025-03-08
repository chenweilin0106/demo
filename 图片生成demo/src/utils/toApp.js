// import store from '../store'

// // 充值跳转
// export const recharge = fn => {
//   document.addEventListener('visibilitychange', fn)
//   const params = { tuid: store.getters.uid }
//   if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
//     window.webkit.messageHandlers.DDWalletViewController.postMessage(params)
//   } else {
//     window.external.action('/wealth')
//   }
// }

// 判断是否是IOS
const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 保存图片
export const saveImage = imageUrl => {
  const params = { imageUrl }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.saveImage.postMessage(params)
  } else {
    window.external.action('/saveImage=' + imageUrl)
  }
}
