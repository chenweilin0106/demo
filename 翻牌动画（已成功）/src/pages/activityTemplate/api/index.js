import request from '../utils/request'
// 当页数据
export const getPageData = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    },
    dataType: 'json'
  })
}
