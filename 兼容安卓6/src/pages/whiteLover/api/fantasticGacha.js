import request from '../utils/request'
// 神奇扭蛋页面数据
export const getFantasticGachaData = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    }
  })
}
