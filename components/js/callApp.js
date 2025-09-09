import AppBridge from './AppBridge'

export const CallApp = {
  // 调用原生方法的封装函数
  callNative(method, params) {
    const bridge = AppBridge.getInstance()
    const func = bridge.callNative.bind(bridge)
    return func(method, params)
  },

  setStatusBarLight: (light, lightNavigationBar) => {
    return CallApp.callNative('setStatusBarLight', {
      light,
      lightNavigationBar
    })
  },

  httpBody: (data) => {
    return CallApp.callNative('httpBody', data)
  },

  back: () => {
    return CallApp.callNative('back', {})
  },
  toast: (msg) => {
    return CallApp.callNative('toast', { msg })
  },
  lottie: (url) => {
    return CallApp.callNative('lottie', { url })
  },
  /**
   * 显示客户端的四季荣冠录弹窗
   */
  showSeasonNamingDialog: () => {
    return CallApp.appRoute('dandan://season/list?hide_question=1')
  },
  /**
   * 显示用户主页
   * @param {string|number} uid
   */
  showUserHome: (uid) => {
    if (!uid || uid === '0') {
      // 如果uid为null或者0，则不做任何操作
      return Promise.reject(new Error(`uid is required: ${uid}`))
    }
    return CallApp.appRoute(`dandan://user/personal?tuid=${uid}`)
  },
  /**
   * 调用客户端的路由跳转
   * @param {string} router
   */
  appRoute: (router) => {
    return CallApp.callNative('route', { router })
  },
  /**
   * 显示错误提示
   * @param {number} type type=0 css错误，type=1 js错误
   * @param {string} message
   */
  showError: (type, message) => {
    return CallApp.callNative('showError', { type, message })
  }
}
