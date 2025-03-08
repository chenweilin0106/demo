// 判断是否是IOS
const isIOS = () => {
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
