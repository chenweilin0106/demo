import request from '../../utils/request'
// 主页接口
export const titleBackHome = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}
// 获取返场称号列表
export const titleList = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 兑换返场称号
export const exchangeTitle = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 抽奖（一次，10次，100次）
export const draw = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 兑换绿晶石
export const exchangeLjs = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}
// 领取收集奖励
export const receiveCollect = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}
