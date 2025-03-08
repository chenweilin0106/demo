import store from '../store'
// 充值跳转
export const recharge = () => {
  const params = { tuid: store.getters.uid }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    if (iosPutAction('/DDRechargeViewController')) {
      iosPutAction('/DDRechargeViewController') // app  version=2.0
    } else {
      window.webkit.messageHandlers.DDWalletViewController.postMessage(params) // app version=3.0
    }
  } else {
    window.external.action('/wealth')
  }
}

const iosPutAction = (actionType, args) => {
  // console.log('actionType', actionType)
  // console.log('args', args)
  //   // H5调用ios功能
  //   // 需要App跳转的时候action_type参数需要加"/"
  //   // args数组结构，额外参数放这里, 例如：
  //   // var params = {'room_id':3,"uid":20013};
  //   // iosPutAction("/DDchatRoom",JSON.stringify(params));
}

// 判断是否是IOS
const isIOS = () => {
  const u = window.navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 打开婚姻页面
export const marriageF = (tuid) => {
  const params = { uid: tuid }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.DDMarriageMainViewController.postMessage(
      params
    )
  }
  window.external.action('/marriage?tuid=' + tuid)
}

// 打开用户主页
export const toUserMain = (tuid) => {
  if (!tuid) return
  const params = { uid: tuid }
  if (isIOS() || window.navigator.userAgent.indexOf('Safari') === -1) {
    window.webkit.messageHandlers.DDUserInfo.postMessage(params)
  }

  window.external.action('/user/info?tuid=' + tuid)
}
