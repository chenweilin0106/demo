import request from '../utils/request'
// 当页数据
export const equipNow = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}
