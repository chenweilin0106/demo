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
 * 滚动页面到顶部/底部/指定dom对象的getBoundingClientRect().top
 *
 * @param {string|number} position - 滚动到的位置。可以是 'top'、'bottom' 或指定dom对象的getBoundingClientRect().top。
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
 * @param {Object} options - 参数对象
 * @param {number} [options.targetHour=0] - 要执行回调的目标小时（0-23），默认为0
 * @param {number} [options.targetMinute=0] - 要执行回调的目标分钟（0-59），默认为0
 * @param {number} [options.targetSecond=1] - 要执行回调的目标秒（0-59），默认为1
 * @param {Function} [options.callback=() => {}] - 在目标时间执行的回调函数，必传
 */
export function executeAtTime({ targetHour = 0, targetMinute = 0, targetSecond = 1, callback = () => { } }) {
  const now = new Date()
  let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, targetSecond)
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
  const offsetPosition = element[direction === 'h' ? 'offsetLeft' : 'offsetTop']
  const centerPosition = container[direction === 'h' ? 'offsetWidth' : 'offsetHeight'] / 2
  const scrollPosition = offsetPosition - centerPosition + (element[direction === 'h' ? 'offsetWidth' : 'offsetHeight'] / 2)
  container.scrollTo({
    [direction === 'h' ? 'left' : 'top']: scrollPosition,
    behavior
  })
}
