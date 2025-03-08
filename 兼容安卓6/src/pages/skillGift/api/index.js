import request from '../utils/request'
// 请求页面数据
export const getPageData = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    }
  })
}
