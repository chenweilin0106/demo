/**
 * 节流函数
 *
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 节流时间
 */
export function _throttle(fn, delay = 1000) {
  let canUse = true
  // 设置一个触发开关
  return function () {
    // 如果为true，就触发技能，否则就不能触发
    if (canUse) {
      fn.apply(this, arguments)
      // 触发技能后，关闭开关
      canUse = false
      // 在delay秒后打开开关
      setTimeout(() => (canUse = true), delay)
    } else {
      // Toast('手速太快了')
    }
  }
}

/**
 * 文本长度限制
 *
 * @param {string|number} content 内容
 * @param {number} num 最大位数
 * @returns {string}
 */
export const textLengthLimit = (content, num) => {
  let str = String(content)
  // eslint-disable-next-line no-misleading-character-class
  const reUnicode = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?)*/g
  const charArray = str.match(reUnicode) || []
  return charArray.length > num ? charArray.slice(0, num).join('') + '...' : charArray.join('')
}

/**
 * 监听img报错
 */
export function imgError(event) {
  event.currentTarget.src =
    'data:image/png;base64,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'
  event.currentTarget.style.width = 'auto'
  return true
}

/**
 * 监听头像报错
 *
 * @param {Event} event 头像报错事件
 */
export function imgAtError(event) {
  event.currentTarget.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAYAAAAd+o5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3QkM5NkJBODc3QjExRUVCODZFQURGMUQwQUExRDU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3QkM5NkJCODc3QjExRUVCODZFQURGMUQwQUExRDU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjdCQzk2Qjg4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjdCQzk2Qjk4NzdCMTFFRUI4NkVBREYxRDBBQTFENTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5CLI/XAAALaElEQVR42uxd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'
}

/**
 * 获取url参数
 * @returns {Object}
 */
export function getUrlData() {
  return window.location.search
    .slice(1)
    .split('&')
    .reduce((pre, cur) => {
      pre[cur.split('=')[0]] = cur.split('=')[1]
      return pre
    }, {})
}

/**
 * 存入localStorage
 *
 * @param {string} key 键
 * @param {Any} value 值
 */
export function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从localStorage读取数据
 *
 * @param {string} key 键
 * @return {Any} 返回对应的值
 */
export function getStorage(key) {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

/**
 * 展示text字段
 * {
 *'type'=>'mic', //类型
 *'id'=>80, //id
 *'nums'=>7, //数量
 *'unit'=>'天', //单位
 *'name'=>'火树银花', //名字
 *'icon'=>'ts_hsyh', //图片
 *},
 */
export function toShowText(item) {
  let typeNameList = {
    ring: '戒指',
    mic: '头饰',
    car: '座驾',
    voice: '声波',
    title: '称号',
    pst_privilege: '赠送权'
  }
  // console.log('item', item)
  if (item.nums <= 0) {
    if (item.type == 'title') {
      return '永久称号'
    } else if (item.type == 'mic') {
      return '永久头饰'
    } else if (item.type == 'voice') {
      return item.name
    }
  } else {
    switch (item.type) {
      case 'new_present_book_name':
        return `点亮次数+${item.nums}`
      case 'property':
        return `+${formatNumber(item.nums)}`
      case 'rune':
        return `${item.name}+${item.nums}${item.unit ? item.unit : ''}`
      default:
        return typeNameList[item.type] ? `${typeNameList[item.type]}+${item.nums}${item.unit ? item.unit : ''}` : `+${item.nums}${item.unit ? item.unit : ''}`
    }
  }
}

/**
 * 超过万最多保留digit位小数
 */
export function formatNumber(num, digit = 2) {
  if (Number(num) >= 10000) {
    let formattedNum = (Math.floor(Number(num) / 100) / 100).toFixed(digit)
    return parseFloat(formattedNum) + '万'
  }
  let formattedNum = Number(num).toFixed(digit)
  return parseFloat(formattedNum)
}

/**
 * 生成唯一标识
 */
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const string = (Math.random() * 16) | 0
      const v = c == 'x' ? string : (string & 0x3) | 0x8
      return v.toString(16)
    }
  )
}
