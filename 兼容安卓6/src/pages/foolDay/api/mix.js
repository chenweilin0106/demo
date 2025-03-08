import request from '../utils/request'
// 合成限定奖励
export const mix = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {    
      ...data
    }
  })
}
