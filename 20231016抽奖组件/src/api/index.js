import request from '../utils/request'

// 进入活动页
export const getPageData = (data) => {
  return request({
    url: '/actserver/halloween/home',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 领取任务奖励
export const getTaskReward = (data) => {
  return request({
    url: '/actserver/halloween/rev-task-award',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 兑换糖果奖励
export const sweetsExchange = (data) => {
  return request({
    url: '/actserver/halloween/rev-candy-award',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 开启神奇宝箱
export const openMagicBox = (data) => {
  return request({
    url: '/actserver/halloween/open-box',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 南瓜兑换称号
export const pumpkinExchange = (data) => {
  return request({
    url: '/actserver/halloween/exchange-title',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 立即装扮
export const nowEquip = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}
