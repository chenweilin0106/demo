// 提取表情符号正则的主体模式
// eslint-disable-next-line no-misleading-character-class
const emojiPattern = String.raw`\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?)*`
// eslint-disable-next-line no-misleading-character-class
const unicodeRegex = new RegExp(emojiPattern, 'g'); // 用于分割字符串
// eslint-disable-next-line no-misleading-character-class
const emojiRegex = new RegExp(`^(${emojiPattern})$`); // 用于检测是否为表情符号

/**
 * 检测字符是否为表情符号
 * @param {string} substring 要检测的字符
 * @return {boolean} 如果是表情符号则返回true
 */
function isEmoji(substring) {
  // 检查是否是单个普通ASCII字符（不是表情）
  if (substring.length === 1 && substring.charCodeAt(0) < 127 && substring.charCodeAt(0) > 31) return false
  // 检查是否为中文字符（CJK统一汉字、CJK兼容汉字等）
  if (substring.length === 1) {
    const code = substring.charCodeAt(0)
    // 中文字符范围
    if ((code >= 0x4E00 && code <= 0x9FFF) || // CJK统一汉字
      (code >= 0x3400 && code <= 0x4DBF) || // CJK扩展A
      (code >= 0x20000 && code <= 0x2A6DF) || // CJK扩展B
      (code >= 0x2A700 && code <= 0x2B73F) || // CJK扩展C
      (code >= 0x2B740 && code <= 0x2B81F) || // CJK扩展D
      (code >= 0x2B820 && code <= 0x2CEAF) || // CJK扩展E
      (code >= 0xF900 && code <= 0xFAFF) || // CJK兼容汉字
      (code >= 0x3300 && code <= 0x33FF) || // CJK兼容符号
      (code >= 0xFE30 && code <= 0xFE4F) || // CJK兼容形式
      (code >= 0xFF00 && code <= 0xFFEF)) { // 全角ASCII、全角标点
      return false // 这是中文字符，不是表情
    }
  } else if (substring.length === 2) {
    // 一些常见的表情符号码点范围检查 - 这比正则更可靠
    const code = (substring.charCodeAt(0) << 16) + substring.charCodeAt(1)
    // Emoji表情的主要码点范围
    const isEmoji =
      (code >= 0x1F600 && code <= 0x1F64F) || // 表情符号
      (code >= 0x1F300 && code <= 0x1F5FF) || // 各种符号
      (code >= 0x1F680 && code <= 0x1F6FF) || // 交通和地图符号
      (code >= 0x1F700 && code <= 0x1F77F) || // 炼金术符号
      (code >= 0x1F780 && code <= 0x1F7FF) || // 几何形状
      (code >= 0x1F800 && code <= 0x1F8FF) || // 箭头
      (code >= 0x1F900 && code <= 0x1F9FF) || // 补充符号和象形文字
      (code >= 0x1FA00 && code <= 0x1FA6F) || // 象棋符号
      (code >= 0x1FA70 && code <= 0x1FAFF) // 符号和象形文字扩展A
    if (isEmoji) return true
  }
  return emojiRegex.test(substring) && substring.length > 1 // substring.length > 1能过滤大部分表情符号
}

// console.log('isEmoji', isEmoji('你好'))

/**
 * 计算文本长度
 * 
 * @param {Object} config 配置对象
 * @param {string} config.content 内容
 * @param {number} [config.emojiLength=2] 表情符号的长度权重，默认为2
 * @param {number} [config.normalCharLength=1] 字符的长度权重，默认为1
 * @returns {number} 文本长度
 */
function textLength({ content, emojiLength = 2, normalCharLength = 1 }) {
  const str = String(content)
  if (!str.length) return 0
  const charArray = segmentText({ text: str })
  let length = 0
  for (let i = 0; i < charArray.length; i++) {
    const char = charArray[i]
    if (isEmoji(char)) {
      length += emojiLength
      console.log('emoji', char, emojiLength)
    } else {
      length += normalCharLength
      console.log('normalChar', char, normalCharLength)
    }
  }
  return length
}

/**
 * 文本长度限制
 *
 * @param {string} content 内容
 * @param {number} num 最大位数
 * @returns {string}
 */
function textLengthLimit(content, num) {
  let str = String(content)
  const charArray = segmentText({ text: str })
  return charArray.length > num ? charArray.slice(0, num).join('') + '...' : charArray.join('')
}

/**
 * 分割字符串为字符数组
 * 
 * @param {string} text 要分割的文本
 * @param {string} [lang='zh'] 语言标识 常用：'zh'(中文),'en'(英文)
 * @param {'grapheme' | 'word' | 'sentence'} [granularity='grapheme'] 分割粒度，可选值：'grapheme'(字符),'word'(单词),'sentence'(句子)
 * @returns {string[]} 分割后的字符数组
 */
function segmentText({ text, lang = 'zh', granularity = 'grapheme' }) {
  const str = String(text)
  // return str.match(unicodeRegex) || []
  /**
   * 当Intl.Segmenter不可用时的降级分割方法
   * 
   * @param {string} str 要分割的文本
   * @returns {string[]} 分割后的字符数组
   */
  function fallbackSegmentation(str) {
    return str.match(unicodeRegex) || []
  }
  // 检查浏览器是否支持Intl.Segmenter
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    try {
      const segmenter = new Intl.Segmenter(lang, { granularity })
      const segments = segmenter.segment(str)
      return Array.from(segments).map(s => s.segment)
    } catch (error) {
      console.warn('Intl.Segmenter使用失败:', error)
      // 降级处理
      return fallbackSegmentation(str)
    }
  } else {
    console.warn('当前环境不支持Intl.Segmenter，使用降级方案')
    // 降级处理
    return fallbackSegmentation(str)
  }
}