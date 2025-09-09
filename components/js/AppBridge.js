import { guid } from '@/utils/tool'
import { isIOS } from '@/utils/toApp'

/**
 * 获取类型
 * @returns {'Array' | 'Object' | 'String' | 'Number' | 'Boolean' | 'Function' | 'Null' | 'Undefined'}
 */
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1) // 结果首字符大写
}

/**
 * 创建一个对象的副本，忽略指定的属性
 * @param {Object} object 源对象
 * @param {...(string|string[])} [paths] 要忽略的属性路径，可以是字符串数组或多个字符串参数
 * @returns {Object} 返回新对象
 */
function omit(object, ...paths) {
  if (object == null) {
    return {}
  }
  // 扁平化路径数组 (处理paths可能是数组的情况)
  const props = Array.isArray(paths[0]) ? paths[0] : paths
  // 创建排除集合
  const excludeSet = {}
  props.forEach(prop => {
    excludeSet[prop] = true
  })
  // 创建结果对象
  const result = {}
  // 遍历源对象的所有可枚举属性
  Object.keys(object).forEach(key => {
    // 如果该属性不在排除集合中，则复制到结果对象
    if (!excludeSet[key]) {
      result[key] = object[key]
    }
  })
  return result
}

export default class AppBridge {
  static instance // 存储唯一实例

  constructor() {
    this.__callbacks = {} // 初始化回调存储对象
    this.initBridgeCallback()
  }

  static getInstance() {
    if (!AppBridge.instance) {
      AppBridge.instance = new AppBridge()
    }
    return AppBridge.instance
  }

  initBridgeCallback() {
    // 保存旧的回调函数到 oldCallback 变量中
    const oldCallback = window.ddCallWeb
    // 重新定义 window.callBack 方法，用于处理原生应用的回调数据
    window.ddCallWeb = (callbackData) => {
      const data = JSON.parse(callbackData)
      // 如果存在旧的回调函数，则调用旧的回调函数
      if (getType(oldCallback) === 'Function') {
        oldCallback(data)
      }
      // 获取原生应用的回调信息，包括数据和回调 ID
      console.info('native callback', data, data.callbackId)
      const { callbackId } = data
      const callback = this.__callbacks[callbackId]
      if (callback) {
        // 如果回调数据中的 code 为 0，则表示执行成功，调用 resolve 方法处理成功的结果
        if (data.code === 0) {
          callback.resolve(data.data)
        } else {
          // 否则，表示执行失败，构造一个错误对象并调用 reject 方法处理错误信息
          const error = new Error(data.msg)
          error.response = data
          callback.reject(error)
        }
        // 删除已经处理过的回调函数
        this.__callbacks = omit(this.__callbacks, callbackId)
      }
    }
  }

  // 定义一个名为 callNative 的方法，用于在 JavaScript 中调用原生方法
  callNative(method, params) {
    console.log('callNative:', method, JSON.stringify(params))
    return new Promise((resolve, reject) => {
      // 生成一个唯一的回调 ID
      const id = guid()
      // 将当前的回调函数保存到 __callbacks 对象中，以 callbackId 作为键
      this.__callbacks[id] = {
        resolve,
        reject,
        method
      }
      // 构造通信数据，包括要调用的方法、参数和 callbackId
      const data = {
        method,
        params: params === null ? '' : JSON.stringify(params),
        callbackId: id
      }
      const dataStr = JSON.stringify(data)
      console.log('isIOS', isIOS())
      console.log('getType(window?.webkit?.messageHandlers?.ddCallNative?.postMessage)', getType(window?.webkit?.messageHandlers?.ddCallNative?.postMessage))
      console.log('getType(window?.dandan?.ddCallNative)', getType(window?.dandan?.ddCallNative))
      console.log(process.env.NODE_ENV === 'production')
      console.log('window.webkit.messageHandlers.DDUserInfo.postMessage(params)', getType(window?.webkit?.messageHandlers?.DDUserInfo?.postMessage))
      // 根据当前环境判断是 iOS 还是 Android，并调用相应平台的原生方法
      if (isIOS() && getType(window?.webkit?.messageHandlers?.ddCallNative?.postMessage) === 'Function') {
        // 如果是 iOS 平台，则调用 iOS 的原生方法
        window.webkit.messageHandlers.ddCallNative.postMessage(dataStr)
      } else if (getType(window?.dandan?.ddCallNative) === 'Function') {
        // 如果是 Android 平台，则调用 Android 的原生方法
        window.dandan.ddCallNative(dataStr)
      } else {
        // 如果不是 iOS 或 Android 平台，则抛出错误
        if (process.env.NODE_ENV === 'production') {
          // 如果是生产环境，则抛出错误
          reject(new Error('请在蛋蛋APP中使用'))
        } else {
          console.error(`请在蛋蛋APP中使用 ${method}()`)
        }
      }
    })
  }
}
