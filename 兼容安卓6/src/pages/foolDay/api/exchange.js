import request from '../utils/request'
// 兑换声波道具接口
export const exchangeSound = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    }
  })
}
// 合成神秘声波接口
export const compositeSound = () => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      type: 'devil_merge'
    }
  })
}
// 声波弹框---立即装扮
// 立即装扮接口
export const nowEquip = (data) => {
  return request({
    url: '/h5/equip',
    method: 'post',
    data: {
      ...data
    }
  })
}
