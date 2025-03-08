import request from '../utils/request'

/* 进入活动页 */
export const getPageData = (data) => {
  return request({
    url: '/actserver/newer-gift/home',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 监听支付结果
export const pollFn = (data) => {
  return request({
    url: '/actserver/newer-gift/poll',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 购买礼包
export const buyGift = (data) => {
  return request({
    url: '/actserver/newer-gift/buy',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}

// 预计金币卡收益
export const cardInfo = (data) => {
  return request({
    url: '/actserver/newer-gift/card-info',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}
