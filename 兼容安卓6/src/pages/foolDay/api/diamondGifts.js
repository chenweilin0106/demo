import request from '../utils/request'
// 当页数据
export const getDiamondGiftsData = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    }
  })
}
