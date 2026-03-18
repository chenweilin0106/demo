import { isIOS } from '@/unit/toApp'

/**
 * 高亮显示文本
 * @param {string} text - 需要处理的文本内容
 * @param {Object} options - 配置选项
 * @param {RegExp|string} [options.pattern=/#([^#]+)#/g] - 匹配模式，默认匹配#包裹的内容
 * @param {string} [options.tagName='span'] - 包裹的HTML元素名称
 * @param {string} [options.className='highlight'] - 添加的CSS类名
 * @param {Object} [options.attributes={}] - 添加的额外HTML属性
 * @returns {string} 格式化后的文本
 */
export function highlightText(text, options = {}) {
  // 参数校验
  if (!text) return ''
  // 设置默认值
  const {
    pattern = /#([^#]+)#/g,
    tagName = 'span',
    className = 'highlight',
    attributes = {}
  } = options
  // 构建HTML属性字符串
  let attributesStr = className ? ` class="${className}"` : ''
  // 添加其他属性
  Object.entries(attributes).forEach(([key, value]) => {
    attributesStr += ` ${key}="${value}"`
  })
  // 执行替换
  const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, 'g')
  return text.replace(regex, (match, content) => {
    // 如果匹配内容为空，返回原始匹配
    if (!content.trim()) return match
    return `<${tagName}${attributesStr}>${content}</${tagName}>`
  })
}

/**
 * 数字限制
 *
 * @param {number} current 当前值
 * @param {number} max 最大值
 * @returns {number}
 */
export function numberLimit(current, max) {
  return Math.min(current, max)
}

/**
 * 获取当前年月日
 *
 * @return {string}
 */
export function getNowFormatDate() {
  const date = new Date()
  const year = date.getFullYear() // 获取完整的年份(4位)
  let month = date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
  let strDate = date.getDate() // 获取当前日(1-31)
  if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
  return `${year}${month}${strDate}`
}

/**
 * 滚动页面到顶部/底部/固定距离
 *
 * @param {string|number} position - 滚动到的位置。可以是 'top'、'bottom'、固定距离。
 * @param {boolean} [smooth=false] - 是否需要平滑滚动。
 */
export function scrollToHeight(position, smooth = false) {
  const scrollOptions = { top: 0, behavior: smooth ? 'smooth' : 'auto' }
  const isIOSRes = isIOS()
  let top

  if (position === 'top') {
    top = 0
  } else if (position === 'bottom') {
    top = isIOSRes ? document.querySelector('#app').scrollHeight : document.documentElement.scrollHeight
  } else {
    top = parseInt(position, 10) + (isIOSRes ? document.querySelector('#app').scrollTop : document.documentElement.scrollTop)
  }

  scrollOptions.top = top

  if (isIOSRes) {
    document.querySelector('#app').scrollTo(scrollOptions)
  } else {
    window.scrollTo(scrollOptions)
  }
}

/**
 * 在指定的时间执行回调函数
 *
 * @param {{targetHour?: number, targetMinute?: number, targetSecond?: number, callback?: Function}} options - 参数对象
 * @param {number} [options.targetHour=0] - 要执行回调的目标小时（0-23），默认为0
 * @param {number} [options.targetMinute=0] - 要执行回调的目标分钟（0-59），默认为0
 * @param {number} [options.targetSecond=1] - 要执行回调的目标秒（0-59），默认为1
 * @param {Function} [options.callback=() => {}] - 在目标时间执行的回调函数，默认() => {}
 */
export function executeAtTime({ targetHour = 0, targetMinute = 0, targetSecond = 1, callback = () => { } }) {
  const now = new Date()
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, targetSecond)
  if (targetTime - now < 0) targetTime.setDate(targetTime.getDate() + 1) // 如果目标时间已经过去，则将目标时间设置为第二天的同一时间
  const diff = targetTime - now
  let timer = setTimeout(() => { callback(); clearTimeout(timer) }, diff) // 设置定时器
  this.$once('hook:beforeDestroy', () => { clearTimeout(timer); timer = null }) // 在组件销毁时清除定时器
}

/**
 * 解析URL地址，返回包含URL各部分信息的对象
 * @param {string} url 需要解析的URL地址
 * @returns {{
 *  href: string,      // 完整URL，如 http://ddxx.com/vue/normal/friendsBeCash/index.html?uid=82347659#/share
 *  protocol: string,  // URL协议，如 http:、https:
 *  host: string,      // 主机名(域名+端口)，如 ddxx.com:8080，不带端口时就是域名
 *  hostname: string,  // 域名，如 ddxx.com
 *  port: string,      // 端口号，如 8080，未指定时为空字符串
 *  pathname: string,  // 路径，如 /vue/normal/friendsBeCash/index.html
 *  pathSegments: string[], // 路径段数组，如 ['vue', 'normal', 'friendsBeCash', 'index.html']
 *  search: string,    // 查询字符串(带?)，如 ?uid=82347659
 *  searchParams: Record<string, string>, // 查询参数对象，如 { uid: '82347659' }
 *  hash: string,      // 哈希值(带#)，如 #/share
 *  hashPath: string   // 哈希路径(不带#)，如 /share
 * }} URL解析结果对象
 */
export function parseUrl(url) {
  // 创建一个URL对象
  const urlObj = new URL(url)

  // 解析查询参数
  const searchParams = {}
  urlObj.searchParams.forEach((value, key) => {
    searchParams[key] = value
  })

  // 提取路径部分
  const pathSegments = urlObj.pathname.split('/').filter(segment => segment !== '')

  // 返回包含URL各部分信息的对象
  return {
    href: urlObj.href,
    protocol: urlObj.protocol,
    host: urlObj.host,
    hostname: urlObj.hostname,
    port: urlObj.port || '',
    pathname: urlObj.pathname,
    pathSegments,
    search: urlObj.search,
    searchParams,
    hash: urlObj.hash,
    hashPath: urlObj.hash.substring(1)
  }
}

/**
 * 将元素滚动到容器的中心位置
 * @param {Element} element 需要滚动的元素
 * @param {Element} container 容器元素
 * @param {'h' | 'v'} direction 滚动方向，'h'表示横向，'v'表示纵向，默认为'h'
 * @param {'auto' | 'smooth'} behavior 滚动行为，'auto'|'smooth'，默认'smooth'
 */
export function scrollCenter(element, container, direction = 'h', behavior = 'smooth') {
  if (!element || !container) return console.log('scrollCenter: 请传入element和container')

  const isHorizontal = direction === 'h'
  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  const elementCenter = isHorizontal ? (elementRect.left + elementRect.right) / 2 : (elementRect.top + elementRect.bottom) / 2
  const containerCenter = isHorizontal ? (containerRect.left + containerRect.right) / 2 : (containerRect.top + containerRect.bottom) / 2

  const delta = elementCenter - containerCenter
  const currentScroll = isHorizontal ? container.scrollLeft : container.scrollTop
  let scrollPosition = currentScroll + delta

  // 防止出现负值或超出最大滚动范围
  const maxScroll = isHorizontal ? container.scrollWidth - container.clientWidth : container.scrollHeight - container.clientHeight
  if (Number.isFinite(maxScroll) && maxScroll > 0) {
    scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll))
  } else {
    scrollPosition = Math.max(0, scrollPosition)
  }

  container.scrollTo({
    [isHorizontal ? 'left' : 'top']: scrollPosition,
    behavior
  })
}

/**
 * 判断元素是否可滚动
 * @param {HTMLElement} element - 需要检查的DOM元素
 * @param {string} direction - 滚动方向，可选值: 'vertical'(垂直), 'horizontal'(水平), 'both'(两个方向)
 * @returns {boolean} 如果元素在指定方向可滚动，返回true，否则返回false
 */
export function isScrollable(element, direction = 'vertical') {
  if (!element) return false

  // 获取元素的滚动高度/宽度和客户区高度/宽度
  const hasVerticalScroll = element.scrollHeight > element.clientHeight
  const hasHorizontalScroll = element.scrollWidth > element.clientWidth

  // 检查元素的overflow样式
  const style = window.getComputedStyle(element)
  const verticalScrollable =
    ['auto', 'scroll'].includes(style.overflowY) && hasVerticalScroll
  const horizontalScrollable =
    ['auto', 'scroll'].includes(style.overflowX) && hasHorizontalScroll

  // 根据指定方向返回结果
  switch (direction.toLowerCase()) {
    case 'vertical':
      return verticalScrollable
    case 'horizontal':
      return horizontalScrollable
    case 'both':
      return verticalScrollable || horizontalScrollable
    default:
      return false
  }
}

/**
 * 将px转换为vw
 * @param {number} px - 需要转换的px值
 * @param {number} baseWidth - 基准宽度，默认为750
 * @param {number} fixed - 保留的小数位数，默认为2
 * @returns {string} 转换后的vw值
 */
export function pxToVw({ px, baseWidth = 750, fixed = 2 }) {
  return (px / baseWidth * 100).toFixed(fixed) + 'vw'
}

/**
 * 获取类型
 * @returns {'Array' | 'Object' | 'String' | 'Number' | 'Boolean' | 'Function' | 'Null' | 'Undefined' } type 类型
 */
export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 把对象转为formData，支持嵌套结构
 * @param obj 要转换的对象
 * @param formData 可选的已存在FormData实例
 * @param parentKey 用于递归时的父级键名
 * @returns FormData实例
 */
export function objToFormData(obj, formData, parentKey) {
  const form = formData || new FormData()

  // 如果值为空，直接返回表单
  if (obj === null || obj === undefined) {
    return form
  }

  // 如果已经是FormData实例，直接返回
  if (obj instanceof FormData) {
    return obj
  }

  // 处理对象类型（非null）
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // 处理数组
      obj.forEach((item, index) => {
        const key = parentKey ? `${parentKey}[]` : `${index}`

        if (item === null || item === undefined) {
          form.append(key, '')
        } else if (typeof item === 'object' && !(item instanceof File) && !(item instanceof Blob) && !(item instanceof Date)) {
          this.objToFormData(item, form, key)
        } else {
          form.append(key, item instanceof Date ? item.toISOString() : String(item))
        }
      })
    } else if (obj instanceof File || obj instanceof Blob || obj instanceof Date) {
      // 处理File、Blob或Date
      const key = parentKey || 'file'
      form.append(key, obj instanceof Date ? obj.toISOString() : obj)
    } else {
      // 处理普通对象
      Object.keys(obj).forEach((key) => {
        const value = obj[key]
        const newKey = parentKey ? `${parentKey}[${key}]` : key

        if (value === null || value === undefined) {
          form.append(newKey, '')
        } else if (typeof value === 'object') {
          if (value instanceof File || value instanceof Blob) {
            form.append(newKey, value)
          } else if (value instanceof Date) {
            form.append(newKey, value.toISOString())
          } else if (Array.isArray(value)) {
            // 数组项处理
            value.forEach((item) => {
              const arrayKey = `${newKey}[]`

              if (item === null || item === undefined) {
                form.append(arrayKey, '')
              } else if (typeof item === 'object' && !(item instanceof File) && !(item instanceof Blob) && !(item instanceof Date)) {
                this.objToFormData(item, form, arrayKey)
              } else {
                form.append(arrayKey, item instanceof Date ? item.toISOString() : String(item))
              }
            })
          } else {
            // 递归处理嵌套对象
            this.objToFormData(value, form, newKey)
          }
        } else {
          // 基本类型直接添加
          form.append(newKey, String(value))
        }
      })
    }
  } else {
    // 处理基本类型
    const key = parentKey || 'value'
    form.append(key, String(obj))
  }

  // 防止递归层级过深导致栈溢出
  try {
    JSON.stringify(obj)
  } catch (e) {
    console.warn('objToFormData: 检测到可能的循环引用', e)
  }

  return form
}

/**
 * 预加载图片（用于减少切换背景图时的闪动）。
 *
 * - Promise 永远 resolve：单张失败/超时只会记录，不会 reject（预加载不应影响业务流程）。
 * - resolve 的结果是创建出来的 Image 实例数组；调用方可选择保留引用（例如挂到 this 上）以提高 iOS 下不被回收的概率。
 *
 * @param {string[]} urls 图片 url 数组（通常来自静态 import/require 的构建产物 url）
 * @param {Object} [options]
 * @param {boolean} [options.decode=true] 是否在 onload 后尽量等待 img.decode()（不支持时自动跳过）
 * @param {number} [options.timeoutMs=15000] 单张图片加载超时（毫秒），<=0 表示不设超时
 * @param {(payload: {url: string, error: Error}) => void} [options.onError] 单张图片失败/超时回调（不提供则内部 console.log）
 * @returns {Promise<HTMLImageElement[]>} 图片 Image 实例数组
 *
 * @example
 * // 预加载 + 失败记录 + keepAlive（避免 iOS 下解码结果更易被回收导致切换闪动）
 * const arr = ['tab_1.png', 'tab_2.png', 'tab_3.png', 'tab_4.png', 'tab_5.png', 'tab_6.png']
 * const urls = arr.map(item => require(`@/pages/springFestival/assets/${item}`))
 * this._tabBgPreloadKeepAlive = await this.preloadImages(urls, { decode: true, timeoutMs: 15000, onError: ({ url, error }) => console.log('[preloadImages] error:', url, error)})
 */
export function preloadImages(urls, options = {}) {
  const urlList = Array.isArray(urls) ? urls.filter(Boolean) : []
  const decode = options.decode !== false
  const timeoutMs = Number.isFinite(options.timeoutMs) ? Number(options.timeoutMs) : 15000
  const onError = typeof options.onError === 'function' ? options.onError : null

  const images = []
  const tasks = urlList.map(url => {
    return new Promise(resolve => {
      const img = new Image()
      images.push(img)
      let settled = false

      let timer = null
      const cleanup = () => {
        img.onload = null
        img.onerror = null
        if (timer) clearTimeout(timer)
      }

      const reportError = (error) => {
        if (onError) return onError({ url, error })
        console.log('[preloadImages] error:', url, error)
      }

      const done = async () => {
        if (settled) return
        settled = true
        try {
          if (decode && typeof img.decode === 'function') {
            await img.decode()
          }
        } catch (e) {}
        cleanup()
        resolve()
      }

      img.onload = () => done()
      img.onerror = () => {
        cleanup()
        reportError(new Error(`preload failed: ${url}`))
        done()
      }

      if (timeoutMs > 0) {
        timer = setTimeout(() => {
          cleanup()
          reportError(new Error(`preload timeout: ${url}`))
          done()
        }, timeoutMs)
      }

      img.decoding = 'async'
      img.src = url
      if (img.complete) done()
    })
  })

  return Promise.all(tasks).then(() => images)
}
