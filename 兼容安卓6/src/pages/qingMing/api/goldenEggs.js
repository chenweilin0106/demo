import request from '../utils/request'
// 当页数据
export const getGoldenEggsData = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    }
  })
}
