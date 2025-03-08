import request from '../utils/request'
// 主页数据
export const getPageData = () => {
  return request({
    url: '/actserver/red-scarf/home',
    method: 'post'
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
