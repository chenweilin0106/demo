import request from '../utils/request'
// 合成限定奖励
export const equip = (data) => {
  return request({
    url: '/actserver/template2/receive?v=' + (new Date()).getTime(),
    method: 'post',
    data: {
      ...data
    }
  })
}
