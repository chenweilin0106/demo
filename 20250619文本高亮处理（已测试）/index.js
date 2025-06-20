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
