import request from '@/utils/request'

/**
 * 获取用户信息（注意 request.js 中的 uid 覆盖）
 *
 * @param {string | number} [uid] 用户id
 * @returns {Promise} 用户信息
 * @example
 * {
 *   user_id: "20011", uid
 *   username: "用户名",
 *   profile_image: "头像地址",
 *   gender: "0" "0"-男 "1"-女
 *   server_id: "服务器id" 1-倾国倾城 2-情深意长 3-天下无双 4-江山如画
 *   server_name: "服务器名称"
 *   code: "靓号"
 *   pretty_type: "靓号类型" 1-经典/名流 2-典藏 3-至尊 4-吉日 5-情缘
 * }
 */
export const userInfo = (uid) => {
  return request({ url: '/h5/user-info', data: { uid } })
}

/**
 * 装扮接口(头饰，座驾，称号，主页特效，私聊气泡，公屏气泡，铭牌，声波)
 * @param data
 * @param {string} data.type 装扮种类
 * @param {string | number} data.id 道具id（字段名问后端）
 * @returns {Promise} 装扮失败可能是后台没有该装扮，需要后端上传；或者id不正确
 */

export const nowEquip = (data) => {
  let url = '/h5/equip'
  if (data.type == 'world_msg_skins') url = '/api/v5/h5/equip'
  return request({ url, data: { ...data } })
}

/**
 * 获取用户资产信息
 */
export const propertyInfo = () => {
  return request({ url: '/actserver/template2/receive', data: { type: 'comm_user_property' } })
}
