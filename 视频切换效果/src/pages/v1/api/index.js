import request from '../utils/request'
// 当页数据
export const getGameWarmup = (data) => {
  return request({
    url: '/actserver/game-warmup/home',
    method: 'post',
    data: {
      ...data
    }
  })
}

// 当页抽奖
export const getLottery = () => {
  return request({
    url: '/actserver/game-warmup/lottery',
    method: 'post'
  })
}
