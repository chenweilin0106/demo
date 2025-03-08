import request from '@/utils/request'

/**
 * 主页数据
 * @param {'m1' | 'm2'} mark
 * @returns {Promise}
 */
export const getPageData = (mark) => {
  return request({ url: '/actserver/horde-adventure/home', data: { mark } })
}

/**
 * 装扮接口(头饰，座驾，称号，主页特效，私聊气泡，公屏气泡，铭牌，声波)
 * @param data
 * @param {string} data.type 装扮种类
 * @param {string | number} data.id 道具id（字段名问后端）
 * @returns {Promise} 装扮失败可能是后台没有该装扮，需要后端上传；或者id不正确
 */
export const nowEquip = (data) => {
  return request({ url: '/h5/equip', data: { ...data } })
}
