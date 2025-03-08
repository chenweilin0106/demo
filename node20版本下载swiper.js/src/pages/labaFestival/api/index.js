import request from '../utils/request'
// 主页数据
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

// 立即装扮接口 type：装扮种类 id：道具id
// 如果装扮失败，去对应后台查看是否有该装扮，再查看id是否正确
export const nowEquip = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}
