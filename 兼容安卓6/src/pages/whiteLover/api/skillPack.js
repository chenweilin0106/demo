import request from '../utils/request'
// 技能礼包页面数据
export const getSkillPackData = (data) => {
  return request({
    url: '/actserver/template2/receive',
    method: 'post',
    data: {
      ...data
    }
  })
}
