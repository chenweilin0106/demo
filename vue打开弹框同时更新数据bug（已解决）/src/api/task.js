import request from '@/utils/request'

/**
 * 领取技能加成
 * @returns {Promise}
 */
export const receiveAdditionApi = () => {
  return request({ url: '/actserver/horde-adventure/rev-skill-add' })
}

/**
 * 购买礼包
 * @param {number} gift_id
 * @returns {Promise}
 */
export const buyGiftApi = (gift_id) => {
  return request({ url: '/actserver/horde-adventure/buy-gift', data: { gift_id } })
}

/**
 * 领取更新礼包
 * @returns {Promise}
 */
export const receiveUpdateApi = () => {
  return request({ url: '/actserver/horde-adventure/rev-up-gift' })
}

/**
 * 抽奖
 * @param {number} num
 * @returns {Promise}
 */
export const lotteryApi = (num) => {
  return request({ url: '/actserver/horde-adventure/lottery', data: { num } })
}

/**
 * 领取每日任务
 * @param {number} task_id
 * @returns {Promise}
 */
export const receiveDayTaskApi = (task_id) => {
  return request({ url: '/actserver/horde-adventure/rev-day-task', data: { task_id } })
}

/**
 * 领取累计奖励
 * @param {number} task_id
 * @returns {Promise}
 */
export const receiveTotalTaskApi = (task_id) => {
  return request({ url: '/actserver/horde-adventure/rev-tot-task', data: { task_id } })
}
