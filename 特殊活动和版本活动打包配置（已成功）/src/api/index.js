import request from '../utils/request'
// 主页数据
export const getPageData = (data) => {
  return request({
    url: '/actserver/love-house/home',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

export const buyGift = (data) => {
  return request({
    url: '/actserver/love-house/buy-gift',
    method: 'post',
    data: { ...data }
  })
}

// 立即装扮接口 type：装扮种类 id：道具id
// 如果装扮失败，去对应后台查看是否有该装扮，再查看id是否正确
export const nowEquip = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}
// 领取任务奖励
export const revTaskReward = (data) => {
  return request({
    url: '/actserver/love-house/rev-task-reward',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 兑换
export const exchange = (data) => {
  return request({
    url: '/actserver/love-house/exchange',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 领取奖励
export const drawDownRewards = (data) => {
  return request({
    url: '/actserver/love-house/rev-love-award',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}
