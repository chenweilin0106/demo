import request from '@/utils/request'

/**
 * 周常数据请求（url，method一致，只需要更改参数）
 * @param data
 * @returns {Promise}
 */
export const getPageData = (data) => {
  return request({ url: '/actserver/template2/receive', data: { ...data }, dataType: 'json' })
}
/**
 * 装扮接口(头饰，座驾，称号，主页特效，私聊气泡，公屏气泡，铭牌，声波)
 * @param data
 * @param {string} data.type 装扮种类
 * @param {string|number} data.id 道具id（字段名可能是别的，tool_id || id || goods_id，具体问后端）
 * @returns {Promise} 装扮失败可能是后台没有该装扮，需要后端上传；或者id不正确
 */
export const nowEquip = (data) => {
  return request({ url: '/h5/equip', data: { ...data } })
}
