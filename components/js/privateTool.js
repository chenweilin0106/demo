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
 * 高亮显示昵称 (兼容旧版本)
 * @param {string} message 消息内容
 * @returns {string} 格式化后的消息
 */
export function formatMessage(message) {
  return highlightText(message, { className: 'light' })
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
 * 高亮显示昵称
 * @param {string} message 消息内容
 * @returns {string} 格式化后的消息
 */
export function formatMessage(message) {
  const regex = /#([^#]+)#/g
  return message.replace(regex, '<span class="light">$1</span>')
}