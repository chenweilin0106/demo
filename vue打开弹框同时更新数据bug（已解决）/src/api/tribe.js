import request from '@/utils/request'

/**
 * 获取每日奇遇排名
 * @param {number} date
 * @returns {Promise}
 */
export const getListApi = (date) => {
  return request({ url: '/actserver/horde-adventure/get-adventure-list', data: { date } })
}
